package ws

import (
	"net/http"

	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/Vighnesh-V-H/speedai/internal/logger"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"go.uber.org/zap"
)

type Handler struct {
	db *db.DB
}

func NewHandler(database *db.DB) *Handler {
	return &Handler{db: database}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true 
	},
}

func (h *Handler) Ws(c *gin.Context) {
	logger.Info("WebSocket handler called")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		logger.Error("WebSocket upgrade failed", zap.Error(err))
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to upgrade WebSocket connection"})
		return
	}
	defer conn.Close()

	if err := conn.WriteMessage(websocket.TextMessage, []byte("Connected")); err != nil {
		logger.Error("Failed to send welcome message", zap.Error(err))
		return
	}

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				logger.Error("Unexpected WebSocket close", zap.Error(err))
			} else {
				logger.Info("WebSocket connection closed", zap.Error(err))
			}
			break
		}

		logger.Info("WebSocket message received", zap.ByteString("message", message))

		if err := conn.WriteMessage(messageType, message); err != nil {
			logger.Error("Failed to echo message", zap.Error(err))
			break
		}
	}
}