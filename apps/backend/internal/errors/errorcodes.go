package errors

var ErrorCodes = map[uint8]string{

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

	111: "gemini client initialization failed",
	112: "kafka client initialization failed",
	113: "kafka message marshal failed",
	114: "kafka message produce failed",
	115: "kafka client flush failed",

	120: "database pool creation failed",
	121: "database ping failed",

	122: "kafka client creation failed",
	123: "kafka broker ping failed",

	124: "server start failed",
	125: "server shutdown failed",

	126: "kafka consumer fetch failed while running",
	127: "consumer message unmarshal failed",
	128: "ristretto cache initialization failed",
	129: "kafka consumer offset commit failed",
	131: "event sending failed",
	132: "ai model content generation failed",
}
