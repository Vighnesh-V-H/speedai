
# SpeedAI Backend

Go-based backend for SpeedAI providing authentication, agent orchestration, writing-style services, and WebSocket messaging.

## Project Structure

- `apps/backend/cmd/speedai`: Application entrypoint.
- `apps/backend/internal/auth`: Authentication service and handlers.
- `apps/backend/internal/agents`: Agent service and Kafka consumer.
- `apps/backend/internal/write`: Writing-style service, handler, migrations.
- `apps/backend/internal/router`: HTTP route registration.
- `apps/backend/internal/server`: HTTP server bootstrap.
- `apps/backend/internal/cache`: Ristretto cache wrapper.
- `apps/backend/internal/db`: Database connection and migrations.

## Prerequisites

- Go 1.22+
- PostgreSQL
- Kafka broker (for agent consumer)
- Node.js (for Turborepo apps if needed)
- `goose` migrations CLI (optional)
- `.env` or environment variables

## Environment Variables

| Variable        | Description                              | Default       |
| --------------- | ---------------------------------------- | ------------- |
| `DATABASE_URL`  | PostgreSQL connection string             | (required)    |
| `PORT`          | HTTP port                                | `8080`        |
| `ENVIRONMENT`   | `development` \| `production`            | `development` |
| `KAFKA_BROKERS` | Kafka broker list for agent consumer     | (required)    |

Load variables with `.env` or OS-level configuration.

## Database

Extend with integration tests targeting PostgreSQL and Kafka as needed.```go test ./...```powershellAdd standard Go tests within package directories:## Testing- Ensure graceful shutdown signals are handled via `context.WithCancel`.- Use Turborepo tooling for frontend packages in `apps`.- Add migrations under `apps/backend/internal/db/migrations`.- Update services under `apps/backend/internal`.## Development Notes`agents.NewConsumer` subscribes to topics like `research-facts`. Consumer goroutine starts with application and respects shutdown context.## Kafka ConsumerStructured logging through `zap` with per-environment configuration. Logs stored under the configured directory via `logger.EnsureLogDirectory()`.## Logging- Caches styles via Ristretto under key `writing_style:<user_id>`.- Fetches JSON style from `writing_style` table, inserts default `{}` when missing.- Reads `user_id` from POST body.## Writing Style Service| WS     | `/ws` paths   | `internal/websocket`   | Live updates                               || ...    | Agent routes  | `agents` package       | Agent management                           || ...    | Auth routes   | `auth` package         | OAuth flows                                || POST   | `/api/write`  | `write.Handler.Write`  | Accepts `{ "user_id": "..." }`, caches JSON || ------ | ------------- | ---------------------- | ------------------------------------------ || Method | Path          | Handler                | Notes                                      |## HTTP RoutesServer initializes logging, loads environment, connects to PostgreSQL, starts Kafka consumer, and exposes HTTP/WS routes.```go run ./cmd/speedaicd apps/backend```powershell## Running the BackendKey tables include `writing_style` with JSONB payloads linked to users.```goose -dir apps/backend/internal/db/migrations postgres "$env:DATABASE_URL" up```powershellApply migrations with goose:
Apply migrations with goose:

```powershell
goose -dir apps/backend/internal/db/migrations postgres "$env:DATABASE_URL" up
```

Key tables include `writing_style` with JSONB payloads linked to users.

## Running the Backend

```powershell
cd apps/backend
go run ./cmd/speedai
```

Server initializes logging, loads environment, connects to PostgreSQL, starts Kafka consumer, and exposes HTTP/WS routes.

## HTTP Routes

| Method | Path          | Handler                | Notes                                      |
| ------ | ------------- | ---------------------- | ------------------------------------------ |
| POST   | `/api/write`  | `write.Handler.Write`  | Accepts `{ "user_id": "..." }`, caches JSON |
| ...    | Auth routes   | `auth` package         | OAuth flows                                |
| ...    | Agent routes  | `agents` package       | Agent management                           |
| WS     | `/ws` paths   | `internal/websocket`   | Live updates                               |

## Writing Style Service

- Reads `user_id` from POST body.
- Fetches JSON style from `writing_style` table, inserts default `{}` when missing.
- Caches styles via Ristretto under key `writing_style:<user_id>`.

## Logging

Structured logging through `zap` with per-environment configuration. Logs stored under the configured directory via `logger.EnsureLogDirectory()`.

## Kafka Consumer

`agents.NewConsumer` subscribes to topics like `research-facts`. Consumer goroutine starts with application and respects shutdown context.

## Development Notes

- Update services under `apps/backend/internal`.
- Add migrations under `apps/backend/internal/db/migrations`.
- Use Turborepo tooling for frontend packages in `apps`.
- Ensure graceful shutdown signals are handled via `context.WithCancel`.

## Testing

Add standard Go tests within package directories:

```powershell
go test ./...
```

Extend with integration tests targeting PostgreSQL and Kafka as needed.
