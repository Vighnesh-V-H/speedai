package db

import (
	"context"
	"fmt"

	"github.com/Vighnesh-V-H/speedai/internal/logger"
	"github.com/jackc/pgx/v5/pgxpool"
	"go.uber.org/zap"
)

type DB struct {
    Pool *pgxpool.Pool
}

func New(databaseURL string) (*DB, error) {
    logger.Debug("Creating database connection pool")
    
    pool, err := pgxpool.New(context.Background(), databaseURL)
    if err != nil {
        logger.Error("Failed to create database pool", zap.Error(err))
        return nil, fmt.Errorf("unable to connect to database: %w", err)
    }

    logger.Debug("Pinging database to verify connection")
    if err := pool.Ping(context.Background()); err != nil {
        logger.Error("Failed to ping database", zap.Error(err))
        return nil, fmt.Errorf("unable to ping database: %w", err)
    }

    logger.Info("Database connection pool created successfully",
        zap.Int("max_conns", int(pool.Config().MaxConns)))

    return &DB{Pool: pool}, nil
}

func (db *DB) Close() {
    logger.Info("Closing database connection pool")
    db.Pool.Close()
    logger.Debug("Database connection pool closed")
}