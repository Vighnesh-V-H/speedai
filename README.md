# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)

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
