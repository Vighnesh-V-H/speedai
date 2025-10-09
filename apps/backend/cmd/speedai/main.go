package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/Vighnesh-V-H/speedai/internal/agents"
	"github.com/Vighnesh-V-H/speedai/internal/auth"
	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/Vighnesh-V-H/speedai/internal/logger"
	"github.com/Vighnesh-V-H/speedai/internal/router"
	"github.com/Vighnesh-V-H/speedai/internal/server"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

func main() {
    // Ensure logs directory exists
    if err := logger.EnsureLogDirectory(); err != nil {
        log.Fatal("Failed to create logs directory:", err)
    }

    // Initialize logger
    environment := os.Getenv("ENVIRONMENT")
    if environment == "" {
        environment = "development"
    }

    if err := logger.Init(environment); err != nil {
        log.Fatal("Failed to initialize logger:", err)
    }
    defer logger.Sync()

    logger.Info("Application starting",
        zap.String("environment", environment),
        zap.String("version", "1.0.0"))

    // Load environment variables
    if err := godotenv.Load(); err != nil {
        logger.Warn("No .env file found", zap.Error(err))
    } else {
        logger.Info("Environment variables loaded successfully")
    }
  
    // Initialize database
    databaseURL := os.Getenv("DATABASE_URL")
    logger.Info("Connecting to database...")
    database, err := db.New(databaseURL)
    if err != nil {
        logger.Fatal("Failed to connect to database", zap.Error(err))
    }
    defer database.Close()
    logger.Info("Database connection established successfully")

    // Initialize services
    logger.Info("Initializing services...")
    authService := auth.NewService(database)
    agentService := agents.NewService(database)
    authHandler := auth.NewHandler(authService)
    agentHandler := agents.NewHandler(agentService)
    logger.Info("Services initialized successfully")

 
    logger.Info("Initializing Kafka consumer...")
    topics := []string{"research-facts"} 
    consumer, err := agents.NewConsumer(database, topics)
    if err != nil {
        logger.Fatal("Failed to initialize Kafka consumer", zap.Error(err))
    }
    

    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()
    
    go func() {
        logger.Info("Starting Kafka consumer goroutine")
        consumer.Run(ctx)
    }()
    logger.Info("Kafka consumer started successfully")


    logger.Info("Setting up authentication providers...")
    auth.SetupGoth()
    logger.Info("Authentication providers configured")

    srv := server.New(database)
    
   
    logger.Info("Setting up routes...")
    router.SetupAuthRoutes(srv.Router, authHandler)
    router.SetupAgentRoutes(srv.Router, agentHandler)
    logger.Info("Routes configured successfully")

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    
    sigChan := make(chan os.Signal, 1)
    signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
    

    go func() {
        logger.Info("Server starting", zap.String("port", port))
        if err := srv.Start(":" + port); err != nil {
            logger.Fatal("Server failed to start", zap.Error(err), zap.String("port", port))
        }
    }()
    
    <-sigChan
    logger.Info("Received shutdown signal, gracefully shutting down...")
    

    cancel()
    
    
    shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer shutdownCancel()
    
    if err := srv.Shutdown(shutdownCtx); err != nil {
        logger.Error("Server shutdown failed", zap.Error(err))
    }
    
    logger.Info("Application shutdown complete")
}