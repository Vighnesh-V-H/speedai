package kafka

import (
	"context"
	"os"
	"time"

	"github.com/Vighnesh-V-H/speedai/internal/logger"
	"github.com/twmb/franz-go/pkg/kgo"
	"go.uber.org/zap"
)

var client *kgo.Client

func Init() *kgo.Client {
	if client != nil {
		logger.Debug("Returning existing Kafka client")
		return client
	}

	logger.Info("Initializing new Kafka client")

	brokers := os.Getenv("KAFKA_BROKERS")
	if brokers == "" {
		brokers = "localhost:29092"
		logger.Warn("KAFKA_BROKERS not set, using default", zap.String("default", brokers))
	}

	var err error
	client, err = kgo.NewClient(
		kgo.SeedBrokers(brokers),
		kgo.AllowAutoTopicCreation(),
		kgo.RequestTimeoutOverhead(10*time.Second),
		kgo.ConnIdleTimeout(60*time.Second),
	)
	if err != nil {
		logger.Fatal("Failed to create Kafka client",
			zap.Error(err),
			zap.String("error-code", "122"),
			zap.String("brokers", brokers))
		return nil
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	logger.Debug("Testing Kafka connection...")
	if err := client.Ping(ctx); err != nil {
		logger.Error("Failed to ping Kafka broker - connection test failed",
			zap.Error(err),
			zap.String("error-code", "123"),
			zap.String("brokers", brokers))
		logger.Warn("Kafka client created but connection is unhealthy")
	} else {
		logger.Info("Kafka client created and connection verified", zap.String("brokers", brokers))
	}

	return client
}

func Close() {
	if client != nil {
		logger.Info("Closing Kafka client")
		client.Close()
		client = nil
		logger.Debug("Kafka client closed")
	}
}
