package router

import (
	ws "github.com/Vighnesh-V-H/speedai/internal/websocket"
	"github.com/gin-gonic/gin"
)

func SetupWsRoutes(router *gin.Engine, wsHandler *ws.Handler) {
	apiGroup := router.Group("/api")
	{
		apiGroup.GET("/ws", wsHandler.Ws)
	}
}