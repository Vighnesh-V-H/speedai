package server

import (
	"context"
	"net/http"
	"os"
	"time"

	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/gin-gonic/gin"
)

type Server struct {
    Router *gin.Engine
    db     *db.DB
    server *http.Server
}

func New(database *db.DB) *Server {
    router := gin.Default()
    
   
    frontendURL := os.Getenv("FRONTEND_URL")
    if frontendURL == "" {
        frontendURL = "http://localhost:3000" 
    }
    
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

    return &Server{
        Router: router,
        db:     database,
    }
}

func (s *Server) Start(addr string) error {
    s.server = &http.Server{
        Addr:         addr,
        Handler:      s.Router,
        ReadTimeout:  15 * time.Second,
        WriteTimeout: 15 * time.Second,
        IdleTimeout:  60 * time.Second,
    }
    
    return s.server.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
    return s.server.Shutdown(ctx)
}