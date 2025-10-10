package router

import (
	ws "github.com/Vighnesh-V-H/speedai/internal/websocket"
	"github.com/gin-gonic/gin"
)

func SetupWsRoutes(router *gin.Engine, wsHandler *ws.Handler) {
	router.GET("/api/ws", wsHandler.Ws )
}