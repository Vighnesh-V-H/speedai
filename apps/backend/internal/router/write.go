package router

import (
	"github.com/Vighnesh-V-H/speedai/internal/write"
	"github.com/gin-gonic/gin"
)

func SetupWritingRoutes(router *gin.Engine, writeHandler *write.Handler) {
	authGroup := router.Group("/api")
	{
		authGroup.POST("/write", writeHandler.Write)
	}
}