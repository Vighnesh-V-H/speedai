package cache

import (
	"github.com/Vighnesh-V-H/speedai/internal/logger"
	"github.com/dgraph-io/ristretto/v2"
	"go.uber.org/zap"
)

func Cache() *ristretto.Cache[string , string] {
	cache, err := ristretto.NewCache(&ristretto.Config[string, string]{
		NumCounters: 1e7,    
		MaxCost:     1 << 15, 
		BufferItems: 64,      
	})
	if err != nil {
		logger.Error("error initializing the cache" , zap.Int("error-code" , 128))
	}
    return cache
}