package auth

import (
	"net/http"
	"os"
	"time"

	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/markbates/goth/gothic"
)


type Handler struct {
	db *db.DB
}

func (h *Handler) GoogleLogin(c *gin.Context) {
	q := c.Request.URL.Query()
	q.Add("provider", "google")
	c.Request.URL.RawQuery = q.Encode()

	gothic.BeginAuthHandler(c.Writer, c.Request)
}


func (h *Handler) GoogleCallback(c *gin.Context) {
    q := c.Request.URL.Query()
    q.Add("provider", "google")
    c.Request.URL.RawQuery = q.Encode()

    gothUser, err := gothic.CompleteUserAuth(c.Writer, c.Request)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    ctx := c.Request.Context()

    tx, err := h.db.Pool.Begin(ctx)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
        return
    }
    defer tx.Rollback(ctx)

    var userID string
    err = tx.QueryRow(ctx, "SELECT id FROM users WHERE email = $1", gothUser.Email).Scan(&userID)

    now := time.Now()
    emailVerified := now

    if err != nil { 
        userID = uuid.New().String()
        _, err = tx.Exec(ctx, `
            INSERT INTO users (id, email, email_verified, name, image, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, userID, gothUser.Email, &emailVerified, gothUser.Name, gothUser.AvatarURL, now, now)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
            return
        }
    } else { 
        _, err = tx.Exec(ctx, `
            UPDATE users SET name = $1, image = $2, email_verified = $3, updated_at = $4
            WHERE id = $5
        `, gothUser.Name, gothUser.AvatarURL, &emailVerified, now, userID)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
            return
        }
    }

    var expiresAt *int64
    if !gothUser.ExpiresAt.IsZero() {
        exp := gothUser.ExpiresAt.Unix()
        expiresAt = &exp
    }
    _, err = tx.Exec(ctx, `
        INSERT INTO account (user_id, provider_id, provider_type, provider_account_id, refresh_token, access_token, expires_at, token_type, scope, id_token, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (provider_id, provider_account_id) 
        DO UPDATE SET 
            refresh_token = EXCLUDED.refresh_token,
            access_token = EXCLUDED.access_token,
            expires_at = EXCLUDED.expires_at,
            updated_at = EXCLUDED.updated_at
    `, userID, "google", "oauth", gothUser.UserID, gothUser.RefreshToken, gothUser.AccessToken, expiresAt, "Bearer", "email profile", gothUser.IDToken, now, now)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save account"})
        return
    }

    sessionID, err := GenerateSecureToken(32) 
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate session"})
        return
    }

   
    sessionExpiresAt := now.Add(30 * 24 * time.Hour)
    _, err = tx.Exec(ctx, `
        INSERT INTO session (id, user_id, expires_at, ip_address, user_agent, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, sessionID, userID, sessionExpiresAt, c.ClientIP(), c.Request.UserAgent(), now, now)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create session"})
        return
    }

    
    if err := tx.Commit(ctx); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
        return
    }

secure := os.Getenv("ENV") == "production" 
    c.SetCookie("session_token", sessionID, int(30*24*time.Hour.Seconds()), "/", "", secure, true)
    cookie := &http.Cookie{
    Name:     "session_token",
    Value:    sessionID,
    Path:     "/",
    MaxAge:   int(30*24*time.Hour.Seconds()),
    Secure:   secure,
    HttpOnly: true,
    SameSite: http.SameSiteStrictMode,
}
    http.SetCookie(c.Writer, cookie)

    frontendURL := os.Getenv("FRONTEND_URL")
    if frontendURL == "" {
        frontendURL = "http://localhost:3000"
    }
    c.Redirect(http.StatusTemporaryRedirect, frontendURL+"/dashboard")
}

func (h *Handler) SignOut(c *gin.Context) {
    sessionToken, err := c.Cookie("session_token")
    if err != nil {
        c.JSON(http.StatusOK, gin.H{"message": "No active session"})
        return
    }

    ctx := c.Request.Context()
    _, err = h.db.Pool.Exec(ctx, "DELETE FROM session WHERE id = $1", sessionToken)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to sign out"})
        return
    }

    c.SetCookie("session_token", "", -1, "/", "", false, true) // Expire cookie
    c.JSON(http.StatusOK, gin.H{"message": "Signed out successfully"})
}

func (h *Handler) GetSession(c *gin.Context) {
    sessionToken, err := c.Cookie("session_token")
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Session token not found"})
        return
    }

    ctx := c.Request.Context()

    var id, name, email, image string

    err = h.db.Pool.QueryRow(ctx, `
        SELECT u.id, u.name, u.email, u.image
        FROM users u
        JOIN session s ON s.user_id = u.id
        WHERE s.id = $1
        LIMIT 1
    `, sessionToken).Scan(&id, &name, &email, &image)

    if err != nil {
        if err.Error() == "no rows in result set" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Session not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Query failed"})
        }
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "user": gin.H{
            "id":    id,
            "name":  name,
            "email": email,
            "image": image,
        },
    })
}

