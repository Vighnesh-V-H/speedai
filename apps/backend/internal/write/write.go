package write

import (
	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	db *db.DB
}

func (h *Handler) Write(c *gin.Context){}