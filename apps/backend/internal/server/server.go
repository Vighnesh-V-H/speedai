package server

import (
	"context"
	"net/http"
	"os"
	"time"

	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/Vighnesh-V-H/speedai/internal/logger"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Server struct {
    Router *gin.Engine
    db     *db.DB
    server *http.Server
}

func New(database *db.DB) *Server {
    logger.Debug("Creating new server instance")
    
    router := gin.Default()
    
    frontendURL := os.Getenv("FRONTEND_URL")
    if frontendURL == "" {
        frontendURL = "http://localhost:3000"
        logger.Debug("FRONTEND_URL not set, using default", zap.String("url", frontendURL))
    }
    
    logger.Info("Configuring CORS middleware", zap.String("allowed_origin", frontendURL))
    
    router.Use(func(c *gin.Context) {
        c.Header("Access-Control-Allow-Origin", frontendURL)
        c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        c.Header("Access-Control-Allow-Credentials", "true")
        
        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        
        c.Next()
    })

    router.Use(func(c *gin.Context) {
        start := time.Now()
        path := c.Request.URL.Path
        query := c.Request.URL.RawQuery

        c.Next()

        logger.Info("HTTP Request",
            zap.String("method", c.Request.Method),
            zap.String("path", path),
            zap.String("query", query),
            zap.Int("status", c.Writer.Status()),
            zap.Duration("latency", time.Since(start)),
            zap.String("client_ip", c.ClientIP()),
            zap.String("user_agent", c.Request.UserAgent()))
    })

    logger.Info("Server instance created successfully")

    return &Server{
        Router: router,
        db:  database,
    }
}

func (s *Server) Start(addr string) error {
    logger.Info("Configuring HTTP server",
        zap.String("address", addr),
        zap.Duration("read_timeout", 15*time.Second),
        zap.Duration("write_timeout", 15*time.Second),
        zap.Duration("idle_timeout", 60*time.Second))

    s.server = &http.Server{
        Addr:         addr,
        Handler:      s.Router,
        ReadTimeout:  15 * time.Second,
        WriteTimeout: 15 * time.Second,
        IdleTimeout:  60 * time.Second,
    }
    
    logger.Info("Starting HTTP server", zap.String("address", addr))
    err := s.server.ListenAndServe()
    if err != nil && err != http.ErrServerClosed {
        logger.Error("Server failed to start", zap.Error(err), zap.String("error-code", "124"))
    }
    return err
}

func (s *Server) Shutdown(ctx context.Context) error {
    logger.Info("Shutting down server gracefully")
    
    err := s.server.Shutdown(ctx)
    if err != nil {
        logger.Error("Error during server shutdown", zap.Error(err), zap.String("error-code", "125"))
    } else {
        logger.Info("Server shutdown completed successfully")
    }
    return err
}