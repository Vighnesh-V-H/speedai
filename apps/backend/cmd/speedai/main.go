package main

import (
	"log"
	"os"

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

    // Setup authentication provider
    logger.Info("Setting up authentication providers...")
    auth.SetupGoth()
    logger.Info("Authentication providers configured")

    // Initialize server
    srv := server.New(database)
    
    // Setup routes
    logger.Info("Setting up routes...")
    router.SetupAuthRoutes(srv.Router, authHandler)
    router.SetupAgentRoutes(srv.Router, agentHandler)
    logger.Info("Routes configured successfully")

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    
    logger.Info("Server starting", zap.String("port", port))
    if err := srv.Start(":" + port); err != nil {
        logger.Fatal("Server failed to start", zap.Error(err), zap.String("port", port))
    }
}