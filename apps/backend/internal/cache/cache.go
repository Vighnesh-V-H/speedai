package cache

import (
	"sync"

	"github.com/Vighnesh-V-H/speedai/internal/logger"
	"github.com/dgraph-io/ristretto/v2"
	"go.uber.org/zap"
)

var (
	cacheInstance *ristretto.Cache[string, string]
	once          sync.Once
)


func Cache() *ristretto.Cache[string, string] {
	once.Do(func() {
		var err error
		cacheInstance, err = ristretto.NewCache(&ristretto.Config[string, string]{
			NumCounters: 1e7,    
			MaxCost:     1 << 15, 
			BufferItems: 64,     
		})
		if err != nil {
			logger.Error("failed to initialize cache", zap.Error(err))
		} else {
			logger.Debug("cache initialized successfully")
		}
	})
	return cacheInstance
}
