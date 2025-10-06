package kafka

import (
	"os"

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
		brokers = "localhost:9092"
		logger.Warn("KAFKA_BROKERS not set, using default", zap.String("default", brokers))
	}

	var err error
	client, err = kgo.NewClient(
		kgo.SeedBrokers(brokers),
	)
	if err != nil {
		logger.Fatal("Failed to create Kafka client",
			zap.Error(err),
			zap.String("brokers", brokers))
		return nil
	}

	logger.Info("Kafka client created successfully", zap.String("brokers", brokers))
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
