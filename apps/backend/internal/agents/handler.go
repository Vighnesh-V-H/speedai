package agents

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/Vighnesh-V-H/speedai/internal/kafka"
	"github.com/gin-gonic/gin"
	"github.com/twmb/franz-go/pkg/kgo"
	"google.golang.org/genai"
)

type Handler struct {
	db *db.DB
}

type ResearchRequest struct {
	Topic string `json:"topic" binding:"required"`
}

func (h *Handler) ResearchAgent(c *gin.Context) {
	var req ResearchRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": "Topic is required"})
		return
	}

	prompt := fmt.Sprintf(`You are a highly skilled research assistant. Your purpose is to provide a clear, neutral, and well-structured summary of the following topic.
1. Start with a concise, one-sentence definition or overview of the topic.
2. Follow with 3-5 key points presented as a bulleted list.
3. Conclude with a brief statement on the topic's significance or real-world impact.
Maintain a formal and objective tone. Do not use slang, personal opinions, or speculative language. Ensure the output is clean and easy to read.

TOPIC: "%s"`, req.Topic)

	ctx := c.Request.Context()
	client, err := genai.NewClient(ctx, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "Failed to initialize Gemini client"})
		return
	}
	

	stream := client.Models.GenerateContentStream(ctx, "gemini-2.5-flash", genai.Text(prompt), nil)

	type streamEvent struct {
		chunk string
		err   error
		done  bool
	}

	events := make(chan streamEvent)

	go func() {
		defer close(events)

		var encounteredError bool

		stream(func(resp *genai.GenerateContentResponse, err error) bool {
			if ctx.Err() != nil {
				encounteredError = true
				events <- streamEvent{err: ctx.Err(), done: true}
				return false
			}

			if err != nil {
				encounteredError = true
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
				events <- streamEvent{chunk: builder.String()}
				outputBytes, _ := json.Marshal(map[string]string{"topic": req.Topic, "chunk": chunk})
				record := &kgo.Record{Topic: "research-facts", Value: outputBytes}
				kafkaClient := kafka.Init()
				kafkaClient.Produce(ctx, record, func(r *kgo.Record, err error) { 
        				if err != nil { }
   				 })
			}

		
			return true
		})

		if !encounteredError {
			events <- streamEvent{done: true}
		}
	}()

	c.Writer.Header().Set("Content-Type", "text/event-stream")
	c.Writer.Header().Set("Cache-Control", "no-cache")
	c.Writer.Header().Set("Connection", "keep-alive")
	c.Status(http.StatusOK)

	done := false

	c.Stream(func(w io.Writer) bool {
		if done {
			return false
		}

		select {
		case event, ok := <-events:
			if !ok {
				done = true
				return false
			}

			if event.err != nil {
				done = true
				c.SSEvent("error", gin.H{"message": event.err.Error()})
				return false
			}

			if event.done {
				done = true
				c.SSEvent("done", gin.H{"success": true})
				return false
			}

			if event.chunk != "" {
				c.SSEvent("message", gin.H{"text": event.chunk})
				return true
			}

			return false
		case <-ctx.Done():
			done = true
			c.SSEvent("error", gin.H{"message": ctx.Err().Error()})
			return false
		}
	})
}

func (h *Handler) RecommendAgent(c *gin.Context){

}