package cache

import "sync"

type Cache struct {
	data sync.Map
}

var Global = &Cache{}

func (c *Cache) Set(key , value string){
	c.data.Store(key , value)
}

func (c *Cache) Get(key string) (string, bool) {
    val, ok := c.data.Load(key)
    if !ok { return "", false }
    return val.(string), true
}