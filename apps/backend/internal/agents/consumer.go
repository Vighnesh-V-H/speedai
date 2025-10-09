package agents

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/Vighnesh-V-H/speedai/internal/cache"
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

	
	client := kafka.InitConsumer("speedai-research-consumers", topics)
	if client == nil {
		logger.Error("Failed to initialize Kafka client for consumer", zap.Int("error-code", 122))
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

	defer func() {
		logger.Info("Closing Kafka consumer client")
		c.client.Close()
	}()
	
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
						logger.Error("Failed to unmarshal Kafka message", zap.Error(err), zap.Int("error-code", 127))
						continue
					}

					logger.Info("Consumed message",
						zap.String("topic", record.Topic),
						zap.String("key", string(record.Key)),
						zap.Any("value", msg),
					)
 
				
					cache := cache.Cache()
					cache.Set(record.Topic, msg.Chunk, 1<<15)
					cache.Close()
				}

				if err := c.client.CommitRecords(ctx, p.Records...); err != nil {
					logger.Error("Failed to commit offsets", zap.Error(err), zap.Int("error-code", 129))
				} else {
					logger.Debug("Successfully committed offsets",
						zap.String("topic", p.Topic),
						zap.Int32("partition", p.Partition),
						zap.Int("records", len(p.Records)))
				}
			})
		}
	}
}
