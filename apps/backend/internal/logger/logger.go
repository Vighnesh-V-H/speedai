package logger

import (
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var Log *zap.Logger

// Init initializes the global logger with environment-specific configuration
func Init(environment string) error {
	var config zap.Config

	if environment == "production" {
		// Production: JSON formatted logs
		config = zap.NewProductionConfig()
		config.EncoderConfig.TimeKey = "timestamp"
		config.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
		config.EncoderConfig.MessageKey = "message"
		config.EncoderConfig.LevelKey = "level"
		config.EncoderConfig.CallerKey = "caller"
	} else {
		// Development: Console formatted logs with colors
		config = zap.NewDevelopmentConfig()
		config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
		config.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	}

	// Output to both stdout and file
	config.OutputPaths = []string{"stdout", "logs/app.log"}
	config.ErrorOutputPaths = []string{"stderr", "logs/error.log"}

	logger, err := config.Build(
		zap.AddCallerSkip(1), // Skip one level to show actual caller
		zap.AddStacktrace(zapcore.ErrorLevel), // Add stacktrace for errors and above
	)
	if err != nil {
		return err
	}

	Log = logger
	return nil
}

// Sync flushes any buffered log entries
// Should be called before application exits
func Sync() {
	if Log != nil {
		_ = Log.Sync()
	}
}


func Info(msg string, fields ...zap.Field) {
	Log.Info(msg, fields...)
}

// Error logs an error message
func Error(msg string, fields ...zap.Field) {
	Log.Error(msg, fields...)
}

// Warn logs a warning message
func Warn(msg string, fields ...zap.Field) {
	Log.Warn(msg, fields...)
}

// Debug logs a debug message
func Debug(msg string, fields ...zap.Field) {
	Log.Debug(msg, fields...)
}

// Fatal logs a fatal message and exits the application
func Fatal(msg string, fields ...zap.Field) {
	Log.Fatal(msg, fields...)
}

// Panic logs a panic message and panics
func Panic(msg string, fields ...zap.Field) {
	Log.Panic(msg, fields...)
}

// With creates a child logger with the given fields
func With(fields ...zap.Field) *zap.Logger {
	return Log.With(fields...)
}

// EnsureLogDirectory creates the logs directory if it doesn't exist
func EnsureLogDirectory() error {
	logDir := "logs"
	if _, err := os.Stat(logDir); os.IsNotExist(err) {
		if err := os.MkdirAll(logDir, 0755); err != nil {
			return err
		}
	}
	return nil
}
