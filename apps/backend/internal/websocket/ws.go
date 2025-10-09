package websocket

import "github.com/Vighnesh-V-H/speedai/internal/cache"

func Ws() {
	cache := cache.Cache()
	cache.Get("research-topic")
}
