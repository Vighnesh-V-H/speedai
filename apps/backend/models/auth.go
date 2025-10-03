package models

import "time"

type User struct {
	ID            string     `json:"id"`
	Email         string     `json:"email"`
	EmailVerified *time.Time `json:"email_verified,omitempty"`
	Name          *string    `json:"name,omitempty"`
	Image         *string    `json:"image,omitempty"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
}

type Session struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	ExpiresAt time.Time `json:"expires_at"`
	IPAddress *string   `json:"ip_address,omitempty"`
	UserAgent *string   `json:"user_agent,omitempty"`
}

type Account struct {
	ID                int64     `json:"id"`
	UserID            string    `json:"user_id"`
	ProviderID        string    `json:"provider_id"`
	ProviderType      string    `json:"provider_type"`
	ProviderAccountID string    `json:"provider_account_id"`
	RefreshToken      *string   `json:"refresh_token,omitempty"`
	AccessToken       *string   `json:"access_token,omitempty"`
	ExpiresAt         *int64    `json:"expires_at,omitempty"`
	TokenType         *string   `json:"token_type,omitempty"`
	Scope             *string   `json:"scope,omitempty"`
	IDToken           *string   `json:"id_token,omitempty"`
	SessionState      *string   `json:"session_state,omitempty"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}