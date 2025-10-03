package router

import (
	"github.com/Vighnesh-V-H/speedai/internal/auth"
	"github.com/gin-gonic/gin"
)

func SetupAuthRoutes(router *gin.Engine, authHandler *auth.Handler) {
	authGroup := router.Group("/api/auth")
	{
		authGroup.GET("/signin/google", authHandler.GoogleLogin)
		authGroup.GET("/google/callback", authHandler.GoogleCallback)
		authGroup.POST("/signout", authHandler.SignOut)
		authGroup.GET("/me", authHandler.GetCurrentUser)
	}
}