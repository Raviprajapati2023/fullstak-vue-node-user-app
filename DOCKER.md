# Docker Setup

## Architecture

```
full-stack-app/
├── docker-compose.yml          # Main entry point - includes all services + defines network & volumes
├── compose/
│   ├── postgres.yml            # Database service
│   ├── backend.yml             # Express API service
│   └── frontend.yml            # Quasar (Vue 3) dev server
├── .env                        # Environment variables (not committed to git)
├── backend/
│   ├── Dockerfile              # Production image (node + npm ci)
│   ├── Dockerfile.dev          # Dev image (node + nodemon for hot reload)
│   └── .dockerignore
└── frontend/
    ├── Dockerfile              # Production image (multi-stage: build + nginx)
    ├── Dockerfile.dev          # Dev image (quasar dev server with hot reload)
    └── .dockerignore
```

## Network

All services run on a single **bridge network** called `app-network`. This allows containers to communicate using service names as hostnames:

| Service    | Hostname inside network | Exposed port |
|------------|------------------------|--------------|
| PostgreSQL | `postgres`             | 5432         |
| Backend    | `backend`              | 3000         |
| Frontend   | `frontend`             | 9000         |

For example, the backend connects to the database using `PGHOST=postgres` (the service name), not `localhost`.

## Volumes

| Volume | Purpose |
|--------|---------|
| `pgdata` (named) | Persists PostgreSQL data across container restarts. Managed by Docker, not stored in the project directory. |
| `./backend:/app` | Bind mount for live code reload in dev |
| `./frontend:/app` | Bind mount for live code reload in dev |
| `/app/node_modules` (anonymous) | Prevents host `node_modules` from overriding container's installed dependencies |

## Environment Variables

All configurable values are in `.env` at the project root. Docker Compose reads this automatically.

| Variable | Default | Used By |
|----------|---------|---------|
| `POSTGRES_USER` | postgres | postgres, backend |
| `POSTGRES_PASSWORD` | postgres | postgres, backend |
| `POSTGRES_DB` | fullstackapp | postgres, backend |
| `POSTGRES_PORT` | 5432 | postgres |
| `BACKEND_PORT` | 3000 | backend |
| `FRONTEND_PORT` | 9000 | frontend |

## Commands

### Start all services (dev)
```bash
docker compose up --build
```

### Start a specific service
```bash
docker compose up backend
```

### Stop all services
```bash
docker compose down
```

### Stop and remove volumes (reset database)
```bash
docker compose down -v
```

### Rebuild a single service
```bash
docker compose build backend
docker compose up backend
```

### View logs
```bash
docker compose logs -f backend
```

## Service Details

### PostgreSQL
- Image: `postgres:16-alpine`
- Data stored in a **named volume** (`pgdata`) so it persists across `docker compose down` but won't clutter the project directory
- Has a **healthcheck** — backend waits for it to be ready before starting

### Backend (Express + pg)
- **Dev** (`Dockerfile.dev`): Uses `nodemon` for auto-restart on file changes. Source code is bind-mounted.
- **Production** (`Dockerfile`): Uses `npm ci --only=production` for a lean image and runs `node index.js` directly.
- Connects to PostgreSQL via the `app-network` using hostname `postgres`

### Frontend (Quasar / Vue 3)
- **Dev** (`Dockerfile.dev`): Runs `quasar dev` with hot module replacement. Uses polling (`CHOKIDAR_USEPOLLING`, `WATCHPACK_POLLING`) for WSL2 file-watching compatibility.
- **Production** (`Dockerfile`): Multi-stage build — builds with `quasar build`, then serves static files with `nginx:stable-alpine`.
- `stdin_open: true` and `tty: true` keep the Quasar dev server running properly in Docker

## Service-Based Compose Files

The `docker-compose.yml` uses the `include` directive to split each service into its own file under `compose/`. This keeps each service's config isolated and easy to manage independently. Docker Compose merges them all together at runtime.

The main `docker-compose.yml` only defines:
- **includes** — which service files to load
- **networks** — the shared `app-network`
- **volumes** — the shared `pgdata` named volume
