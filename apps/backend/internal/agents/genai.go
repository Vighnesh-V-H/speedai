package agents

import (
	"context"
	"sync"

	"google.golang.org/genai"
)

var (
	clientOnce sync.Once
	client     *genai.Client
	initErr    error
)

func GetGenAIClient(ctx context.Context) (*genai.Client, error) {
	clientOnce.Do(func() {
		client, initErr = genai.NewClient(ctx, nil)
	})
	return client, initErr
}
