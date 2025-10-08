package agents

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/Vighnesh-V-H/speedai/internal/kafka"
	"github.com/Vighnesh-V-H/speedai/internal/logger"
	"github.com/twmb/franz-go/pkg/kgo"
	"go.uber.org/zap"
)

type Consumer struct {
	client *kgo.Client
	db     *db.DB
	topics []string
}

type ResearchMessage struct {
    Topic string `json:"topic"`
    Chunk string `json:"chunk"`
}

func NewConsumer(db *db.DB, topics []string) (*Consumer, error) {
	logger.Info("Initializing Kafka consumer", zap.Strings("topics", topics))

	client := kafka.Init()
	if client == nil {
		logger.Error("Failed to initialize Kafka client for consumer" , zap.Int("error-code" , 122))
		return nil, fmt.Errorf("failed to init kafka client")
	}

	return &Consumer{
		client: client,
		db:     db,
		topics: topics,
	}, nil
}

func (c *Consumer) Run(ctx context.Context) {
	logger.Info("Starting Kafka consumer loop", zap.Strings("topics", c.topics))


	c.client.AddConsumeTopics(c.topics...)

	
	for {
		select {
		case <-ctx.Done():
			logger.Info("Consumer context canceled, shutting down")
			return

		default:
			
			fetches := c.client.PollFetches(ctx)

			
			if errs := fetches.Errors(); len(errs) > 0 {
				for _, e := range errs {
					logger.Error("Kafka fetch error", zap.Error(e.Err), zap.String("topic", e.Topic), zap.Int("error-code", 126))
				}
				continue
			}

			
			fetches.EachPartition(func(p kgo.FetchTopicPartition) {
				for _, record := range p.Records {
				
					var msg ResearchMessage
					if err := json.Unmarshal(record.Value, &msg); err != nil {
						logger.Error("Failed to unmarshal Kafka message", zap.Error(err) , zap.Int("error-code" , 127))
						continue
					}

					logger.Info("Consumed message",
						zap.String("topic", record.Topic),
						zap.String("key", string(record.Key)),
						zap.Any("value", msg),
					)

					// TODO: process msg (save to DB, forward to websocket)
				}

				
				c.client.CommitRecords(ctx, p.Records...)
			})
		}
	}
}
