package auth

import (
	"net/http"
	"os"
	"time"

	"github.com/Vighnesh-V-H/speedai/internal/db"
	"github.com/Vighnesh-V-H/speedai/internal/logger"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/markbates/goth/gothic"
	"go.uber.org/zap"
)


type Handler struct {
	db *db.DB
}

func (h *Handler) GoogleLogin(c *gin.Context) {
	logger.Info("Google login initiated", zap.String("remote_addr", c.ClientIP()))
	
	q := c.Request.URL.Query()
	q.Add("provider", "google")
	c.Request.URL.RawQuery = q.Encode()

	gothic.BeginAuthHandler(c.Writer, c.Request)
}


func (h *Handler) GoogleCallback(c *gin.Context) {
    logger.Info("Google callback received", zap.String("remote_addr", c.ClientIP()))
    
    q := c.Request.URL.Query()
    q.Add("provider", "google")
    c.Request.URL.RawQuery = q.Encode()

    gothUser, err := gothic.CompleteUserAuth(c.Writer, c.Request)
    if err != nil {
        logger.Error("Failed to complete user authentication",
            zap.Error(err),
            zap.String("error-code", "101"),
            zap.String("remote_addr", c.ClientIP()))
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Authentication failed", "error-code": 101})
        return
    }

    logger.Info("User authenticated via Google",
        zap.String("email", gothUser.Email),
        zap.String("name", gothUser.Name))

    ctx := c.Request.Context()

    tx, err := h.db.Pool.Begin(ctx)
    if err != nil {
        logger.Error("Failed to begin database transaction", zap.Error(err), zap.String("error-code", "102"))
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error", "error-code": 102})
        return
    }
    defer tx.Rollback(ctx)

    var userID string
    err = tx.QueryRow(ctx, "SELECT id FROM users WHERE email = $1", gothUser.Email).Scan(&userID)

    now := time.Now()
    emailVerified := now

    if err != nil { 
        userID = uuid.New().String()
        logger.Info("Creating new user",
            zap.String("user_id", userID),
            zap.String("email", gothUser.Email))
        
        _, err = tx.Exec(ctx, `
            INSERT INTO users (id, email, email_verified, name, image, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, userID, gothUser.Email, &emailVerified, gothUser.Name, gothUser.AvatarURL, now, now)
        if err != nil {
            logger.Error("Failed to create user in database",
                zap.Error(err),
                zap.String("error-code", "103"),
                zap.String("email", gothUser.Email))
            c.JSON(http.StatusInternalServerError, gin.H{"error": "User creation failed", "error-code": 103})
            return
        }
        logger.Info("User created successfully", zap.String("user_id", userID))
    } else { 
        logger.Info("Updating existing user",
            zap.String("user_id", userID),
            zap.String("email", gothUser.Email))
        
        _, err = tx.Exec(ctx, `
            UPDATE users SET name = $1, image = $2, email_verified = $3, updated_at = $4
            WHERE id = $5
        `, gothUser.Name, gothUser.AvatarURL, &emailVerified, now, userID)
        if err != nil {
            logger.Error("Failed to update user in database",
                zap.Error(err),
                zap.String("error-code", "104"),
                zap.String("user_id", userID))
            c.JSON(http.StatusInternalServerError, gin.H{"error": "User update failed", "error-code": 104})
            return
        }
        logger.Info("User updated successfully", zap.String("user_id", userID))
    }

    var expiresAt *int64
    if !gothUser.ExpiresAt.IsZero() {
        exp := gothUser.ExpiresAt.Unix()
        expiresAt = &exp
    }
    logger.Debug("Saving account information")
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
        logger.Error("Failed to save account information",
            zap.Error(err),
            zap.String("error-code", "105"),
            zap.String("user_id", userID))
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Account save failed", "error-code": 105})
        return
    }
    logger.Debug("Account information saved successfully")

    sessionID, err := GenerateSecureToken(32) 
    if err != nil {
        logger.Error("Failed to generate session token", zap.Error(err), zap.String("error-code", "106"))
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Session token generation failed", "error-code": 106})
        return
    }

    logger.Debug("Creating session", zap.String("session_id", sessionID))
    sessionExpiresAt := now.Add(30 * 24 * time.Hour)
    _, err = tx.Exec(ctx, `
        INSERT INTO session (id, user_id, expires_at, ip_address, user_agent, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, sessionID, userID, sessionExpiresAt, c.ClientIP(), c.Request.UserAgent(), now, now)
    if err != nil {
        logger.Error("Failed to create session",
            zap.Error(err),
            zap.String("error-code", "107"),
            zap.String("user_id", userID))
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Session creation failed", "error-code": 107})
        return
    }

    logger.Debug("Committing transaction")
    if err := tx.Commit(ctx); err != nil {
        logger.Error("Failed to commit transaction", zap.Error(err), zap.String("error-code", "108"))
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction commit failed", "error-code": 108})
        return
    }
    logger.Info("Session created successfully",
        zap.String("user_id", userID),
        zap.String("session_id", sessionID))

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
    logger.Info("Sign out initiated", zap.String("remote_addr", c.ClientIP()))
    
    sessionToken, err := c.Cookie("session_token")
    if err != nil {
        logger.Warn("No active session found during sign out", zap.String("remote_addr", c.ClientIP()))
        c.JSON(http.StatusOK, gin.H{"message": "No active session"})
        return
    }

    ctx := c.Request.Context()
    _, err = h.db.Pool.Exec(ctx, "DELETE FROM session WHERE id = $1", sessionToken)
    if err != nil {
        logger.Error("Failed to delete session from database",
            zap.Error(err),
            zap.String("error-code", "109"),
            zap.String("session_id", sessionToken))
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Session deletion failed", "error-code": 109})
        return
    }

    logger.Info("User signed out successfully", zap.String("session_id", sessionToken))
    c.SetCookie("session_token", "", -1, "/", "", false, true) // Expire cookie
    c.JSON(http.StatusOK, gin.H{"message": "Signed out successfully"})
}

func (h *Handler) GetSession(c *gin.Context) {
    logger.Debug("GetSession handler called", zap.String("remote_addr", c.ClientIP()))
    
    sessionToken, err := c.Cookie("session_token")
    if err != nil {
        logger.Warn("Session token not found in cookie", zap.String("remote_addr", c.ClientIP()))
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
            logger.Warn("Session not found in database", zap.String("session_id", sessionToken))
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Session not found"})
        } else {
            logger.Error("Failed to query user session",
                zap.Error(err),
                zap.String("error-code", "110"),
                zap.String("session_id", sessionToken))
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Session query failed", "error-code": 110})
        }
        return
    }

    logger.Info("Session retrieved successfully",
        zap.String("user_id", id),
        zap.String("email", email))

    c.JSON(http.StatusOK, gin.H{
        "user": gin.H{
            "id":    id,
            "name":  name,
            "email": email,
            "image": image,
        },
    })
}

