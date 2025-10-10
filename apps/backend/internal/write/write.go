package write

import (
	"context"
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/Vighnesh-V-H/speedai/internal/cache"
	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/Vighnesh-V-H/speedai/internal/logger"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Handler struct {
	db *db.DB
}

type WriteRequest struct {
	UserID string `json:"user_id" binding:"required"`
}

func (h *Handler) Write(c *gin.Context) {
	var req WriteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": "user_id is required"})
		return
	}

	userID := req.UserID
	cacheKey := "writing_style:" + userID
	cacheInstance := cache.Cache()

	if value, found := cacheInstance.Get(cacheKey); found {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"cached":  true,
			"style":   json.RawMessage(value),
		})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var styleJSON string
	query := `SELECT style FROM writing_style WHERE user_id = $1`
	err := h.db.Pool.QueryRow(ctx, query, userID).Scan(&styleJSON)

	if err != nil {
		if err == sql.ErrNoRows {
			styleJSON = "{}"
			insertQuery := `INSERT INTO writing_style (user_id, style) VALUES ($1, $2)
			                ON CONFLICT (user_id) DO NOTHING`
			_, insertErr := h.db.Pool.Exec(ctx, insertQuery, userID, styleJSON)
			if insertErr != nil {
				logger.Warn("failed to insert default writing style", zap.Error(insertErr))
			}
		} else {
			logger.Error("failed to fetch writing style", zap.Error(err))
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": "internal server error"})
			return
		}
	}

	ok := cacheInstance.Set(cacheKey, styleJSON, 1)
	if !ok {
		logger.Warn("failed to set cache", zap.String("user_id", userID))
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"cached":  false,
		"style":   json.RawMessage(styleJSON),
	})
}
