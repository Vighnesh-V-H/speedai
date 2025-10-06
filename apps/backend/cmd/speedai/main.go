package main

import (
	"log"
	"os"

	"github.com/Vighnesh-V-H/speedai/internal/agents"
	"github.com/Vighnesh-V-H/speedai/internal/auth"
	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/Vighnesh-V-H/speedai/internal/router"
	"github.com/Vighnesh-V-H/speedai/internal/server"
	"github.com/joho/godotenv"
)

func main() {
   
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }
  
    
    database, err := db.New(os.Getenv("DATABASE_URL"))
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }
    defer database.Close()

  
    authService := auth.NewService(database)
    agentService := agents.NewService(database)
    authHandler := auth.NewHandler(authService)
    agentHandler := agents.NewHandler(agentService)

  
    auth.SetupGoth()

    srv := server.New(database)
    
   
    router.SetupAuthRoutes(srv.Router, authHandler)
    router.SetupAgentRoutes(srv.Router, agentHandler)

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    
    log.Printf("Server starting on :%s", port)
    if err := srv.Start(":" + port); err != nil {
        log.Fatal("Server failed to start:", err)
    }
}