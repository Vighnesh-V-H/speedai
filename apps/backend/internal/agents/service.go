package agents

import (
	"github.com/Vighnesh-V-H/speedai/internal/db"
)

type Service struct {
	db *db.DB
}

func NewService(database *db.DB) *Service {
	return &Service{
		db: database,
	}
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		db: service.db,
	}
}