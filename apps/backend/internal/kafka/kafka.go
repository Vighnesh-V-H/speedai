package kafka

import (
	"log"

	"github.com/twmb/franz-go/pkg/kgo"
)

var client *kgo.Client 

func Init() *kgo.Client  {

	if client!=nil{
		return client
	}

    var err error
    client, err = kgo.NewClient(
        kgo.SeedBrokers("localhost:9092"),
    )
    if err != nil {
        log.Fatalf("failed to create kafka client: %v", err)
    }
	return client
}
