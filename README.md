# Fullstack User Management App

A full-stack CRUD application for managing users, built with Vue 3 (Quasar Framework) on the frontend and Node.js (Express) on the backend, with PostgreSQL as the database. Fully containerized with Docker.

## Tech Stack

**Frontend**
- Vue 3 with Composition API
- Quasar Framework (v2)
- Pinia (state management)
- Axios (HTTP client)
- Tailwind CSS
- Vue Router

**Backend**
- Node.js with Express 5
- PostgreSQL 16 (via `pg` driver)
- Nodemon (dev hot-reload)

**Infrastructure**
- Docker & Docker Compose
- Multi-service architecture (frontend, backend, postgres)

## Features

- Add, edit, and delete users
- User fields: Name, Age, Description
- Real-time form validation
- Toast notifications for actions
- Responsive design with dark mode support
- Auto-creates database table on startup

## Project Structure

```
fullstak-vue-node-user-app/
├── frontend/               # Vue 3 + Quasar SPA
│   ├── src/
│   │   ├── pages/          # UserPage.vue (main UI)
│   │   ├── stores/         # Pinia store (userStore.js)
│   │   ├── boot/           # Axios setup
│   │   ├── constants/      # API endpoints
│   │   ├── router/         # Vue Router config
│   │   └── css/            # Styles (SCSS + Tailwind)
│   ├── Dockerfile
│   └── Dockerfile.dev
├── backend/                # Node.js + Express API
│   ├── index.js            # API routes & DB init
│   ├── Dockerfile
│   └── Dockerfile.dev
├── compose/                # Docker Compose service configs
│   ├── postgres.yml
│   ├── backend.yml
│   └── frontend.yml
└── docker-compose.yml      # Main compose file
```

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose

### Run the App

```bash
docker compose up --build
```

This starts all three services:

| Service    | URL                    |
|------------|------------------------|
| Frontend   | http://localhost:9000  |
| Backend    | http://localhost:3000  |
| PostgreSQL | localhost:5432         |

### Stop the App

```bash
docker compose down
```

### Reset Database

To clear all data and start fresh:

```bash
docker compose down
rm -rf userdata/
docker compose up
```

## API Endpoints

| Method | Endpoint          | Description       |
|--------|-------------------|-------------------|
| GET    | `/api/users`      | Get all users     |
| GET    | `/api/users/:id`  | Get user by ID    |
| POST   | `/api/users`      | Create a new user |
| PUT    | `/api/users/:id`  | Update a user     |
| DELETE | `/api/users/:id`  | Delete a user     |

### Example Request

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "age": 25, "description": "A new user"}'
```

## Environment Variables

Configured via `.env` file or Docker Compose defaults:

| Variable          | Default        | Description          |
|-------------------|----------------|----------------------|
| POSTGRES_USER     | postgres       | Database user        |
| POSTGRES_PASSWORD | postgres       | Database password    |
| POSTGRES_DB       | fullstackapp   | Database name        |
| POSTGRES_PORT     | 5432           | Database port        |
| BACKEND_PORT      | 3000           | Backend server port  |
| FRONTEND_PORT     | 9000           | Frontend dev port    |

## Author

Ravi Prajapati - [prajapati.ravi2023@gmail.com](mailto:prajapati.ravi2023@gmail.com)
