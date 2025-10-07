package errors

var ErrorCodes = map[int16]string{
	// Auth errors (101-110)
	101: "auth user authentication failed",
	102: "database transaction begin failed",
	103: "user creation failed",
	104: "user update failed",
	105: "account save failed",
	106: "session token generation failed",
	107: "session creation failed",
	108: "transaction commit failed",
	109: "session deletion failed",
	110: "session query failed",

	// Agents errors (111-119)
	111: "gemini client initialization failed",
	112: "kafka client initialization failed",
	113: "kafka message marshal failed",
	114: "kafka message produce failed",
	115: "kafka client flush failed",

	// Database errors (120-121)
	120: "database pool creation failed",
	121: "database ping failed",

	// Kafka errors (122-123)
	122: "kafka client creation failed",
	123: "kafka broker ping failed",

	// Server errors (124-125)
	124: "server start failed",
	125: "server shutdown failed",
}