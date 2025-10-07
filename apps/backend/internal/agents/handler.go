package agents

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/Vighnesh-V-H/speedai/internal/kafka"
	"github.com/Vighnesh-V-H/speedai/internal/logger"
	"github.com/gin-gonic/gin"
	"github.com/twmb/franz-go/pkg/kgo"
	"go.uber.org/zap"
	"google.golang.org/genai"
)

type Handler struct {
	db *db.DB
}

type ResearchRequest struct {
	Topic string `json:"topic" binding:"required"`
}

func (h *Handler) ResearchAgent(c *gin.Context) {
	logger.Info("ResearchAgent handler started", zap.String("remote_addr", c.ClientIP()))

	var req ResearchRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Warn("Invalid request payload",
			zap.Error(err),
			zap.String("remote_addr", c.ClientIP()))
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": "Topic is required"})
		return
	}

	logger.Info("Research request received",
		zap.String("topic", req.Topic),
		zap.String("remote_addr", c.ClientIP()))

	prompt := fmt.Sprintf(`You are a highly skilled research assistant. Your purpose is to provide a clear, neutral, and well-structured summary of the following topic.
1. Start with a concise, one-sentence definition or overview of the topic.
2. Follow with 3-5 key points presented as a bulleted list.
3. Conclude with a brief statement on the topic's significance or real-world impact.
Maintain a formal and objective tone. Do not use slang, personal opinions, or speculative language. Ensure the output is clean and easy to read.

TOPIC: "%s"`, req.Topic)

	ctx := c.Request.Context()

	logger.Debug("Initializing Gemini client")
	client, err := genai.NewClient(ctx, nil)
	if err != nil {
		logger.Error("Failed to initialize Gemini client",
			zap.Error(err),
			zap.String("error-code", "111"),
			zap.String("topic", req.Topic))
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "Gemini client initialization failed", "error-code": 111})
		return
	}

	kafkaClient := kafka.Init()
	if kafkaClient == nil {
		logger.Error("Failed to initialize Kafka client", zap.String("error-code", "112"), zap.String("topic", req.Topic))
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "Kafka client initialization failed", "error-code": 112})
		return
	}


	stream := client.Models.GenerateContentStream(ctx, "gemini-2.5-flash", genai.Text(prompt), nil)

	type streamEvent struct {
		chunk string
		err   error
		done  bool
	}

	events := make(chan streamEvent)

 
	kafkaCtx, kafkaCancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer kafkaCancel()

	go func() {
		defer close(events)
		logger.Debug("Starting stream processing goroutine", zap.String("topic", req.Topic))

		var encounteredError bool
		chunkCount := 0

		stream(func(resp *genai.GenerateContentResponse, err error) bool {
			if ctx.Err() != nil {
				encounteredError = true
				logger.Error("Context error during streaming",
					zap.Error(ctx.Err()),
					zap.String("topic", req.Topic),
					zap.Int("chunks_processed", chunkCount))
				events <- streamEvent{err: ctx.Err(), done: true}
				return false
			}

			

			if err != nil {
				encounteredError = true
				logger.Error("Streaming error from Gemini",
					zap.Error(err),
					zap.String("topic", req.Topic),
					zap.Int("chunks_processed", chunkCount))
				events <- streamEvent{err: err, done: true}
				return false
			}

			var builder strings.Builder
			for _, candidate := range resp.Candidates {
				if candidate.Content == nil {
					continue
				}
				for _, part := range candidate.Content.Parts {
					if part.Text != "" {
						builder.WriteString(part.Text)
					}
				}
			}

			if builder.Len() > 0 {
				chunk := builder.String()
				chunkCount++

				logger.Debug("Received content chunk",
					zap.String("topic", req.Topic),
					zap.Int("chunk_number", chunkCount),
					zap.Int("chunk_size", len(chunk)))

				events <- streamEvent{chunk: chunk}

			
				outputBytes, err := json.Marshal(map[string]string{"topic": req.Topic, "chunk": chunk})
				if err != nil {
					logger.Error("Failed to marshal Kafka message",
						zap.Error(err),
						zap.String("error-code", "113"),
						zap.String("topic", req.Topic),
						zap.Int("chunk_number", chunkCount))
					return true
				}

				record := &kgo.Record{Topic: "research-facts", Value: outputBytes}
				
				kafkaClient.Produce(kafkaCtx, record, func(r *kgo.Record, err error) {
					if err != nil {
						
						if err == context.Canceled || err == context.DeadlineExceeded {
							logger.Warn("Kafka produce cancelled or timed out",
								zap.Error(err),
								zap.String("kafka_topic", "research-facts"),
								zap.String("research_topic", req.Topic),
								zap.Int("chunk_number", chunkCount))
						} else {
							logger.Error("Failed to produce message to Kafka",
								zap.Error(err),
								zap.String("error-code", "114"),
								zap.String("kafka_topic", "research-facts"),
								zap.String("research_topic", req.Topic),
								zap.Int("chunk_number", chunkCount))
						}
					} else {
						logger.Debug("Message produced to Kafka successfully",
							zap.String("kafka_topic", "research-facts"))
					}
				})
			}

			return true
		})

		if !encounteredError {
			logger.Info("Stream processing completed successfully",
				zap.String("topic", req.Topic),
				zap.Int("total_chunks", chunkCount))
			
			logger.Debug("Flushing Kafka client", zap.String("topic", req.Topic))
			if err := kafkaClient.Flush(kafkaCtx); err != nil {
				logger.Error("Failed to flush Kafka client",
					zap.Error(err),
					zap.String("error-code", "115"),
					zap.String("topic", req.Topic))
			} else {
				logger.Debug("Kafka client flushed successfully", zap.String("topic", req.Topic))
			}
			
			events <- streamEvent{done: true}
		}
	}()

	c.Writer.Header().Set("Content-Type", "text/event-stream")
	c.Writer.Header().Set("Cache-Control", "no-cache")
	c.Writer.Header().Set("Connection", "keep-alive")
	c.Status(http.StatusOK)

	logger.Debug("Starting SSE stream to client", zap.String("topic", req.Topic))

	done := false
	eventsSent := 0

	c.Stream(func(w io.Writer) bool {
		if done {
			logger.Info("SSE stream completed",
				zap.String("topic", req.Topic),
				zap.Int("events_sent", eventsSent))
			return false
		}

		select {
		case event, ok := <-events:
			if !ok {
				done = true
				logger.Warn("Events channel closed unexpectedly", zap.String("topic", req.Topic))
				return false
			}

			if event.err != nil {
				done = true
				logger.Error("Error event received",
					zap.Error(event.err),
					zap.String("topic", req.Topic),
					zap.Int("events_sent", eventsSent))
				c.SSEvent("error", gin.H{"message": event.err.Error()})
				return false
			}

			if event.done {
				done = true
				logger.Info("Done event received",
					zap.String("topic", req.Topic),
					zap.Int("events_sent", eventsSent))
				c.SSEvent("done", gin.H{"success": true})
				return false
			}

			if event.chunk != "" {
				eventsSent++
				c.SSEvent("message", gin.H{"text": event.chunk})
				return true
			}

			return false
		case <-ctx.Done():
			done = true
			logger.Warn("Client disconnected",
				zap.Error(ctx.Err()),
				zap.String("topic", req.Topic),
				zap.Int("events_sent", eventsSent))
			c.SSEvent("error", gin.H{"message": ctx.Err().Error()})
			return false
		}
	})
}

func (h *Handler) RecommendAgent(c *gin.Context) {
	logger.Info("RecommendAgent handler called", zap.String("remote_addr", c.ClientIP()))

	
	c.JSON(http.StatusNotImplemented, gin.H{"success": false, "error": "Not implemented yet"})
}