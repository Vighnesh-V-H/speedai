package router

import (
	"github.com/Vighnesh-V-H/speedai/internal/agents"
	"github.com/gin-gonic/gin"
)

func SetupAgentRoutes(router *gin.Engine, agentHandler *agents.Handler) {
	authGroup := router.Group("/api/agents")
	{
		authGroup.POST("/research", agentHandler.ResearchAgent)
	}
}