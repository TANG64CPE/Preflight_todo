# Preflight Todo - Full Stack Application

A complete full-stack Todo application built with React, Vite, Express, Drizzle ORM, and PostgreSQL.

## Repository Structure

```text
Preflight_todo/
├── pf-db/          # Database migrations, Drizzle schemas, & Postgres initialization
├── pf-backend/     # Express.js REST API with Drizzle ORM
├── pf-frontend/    # React frontend powered by Vite & Pico CSS
├── docker-compose.yml # Full-stack Docker container orchestration
├── pnpm-workspace.yaml # PNPM monorepo workspace configuration
├── package.json    # Monorepo root scripts & dependencies
└── .env.example    # Centralized environment variables template
```

---

## Tech Stack

- **Frontend**: React 19, Vite, Pico CSS, Axios, Dayjs
- **Backend**: Node.js, Express 5, Drizzle ORM, Helmet, Morgan, CORS
- **Database**: PostgreSQL 18 (Alpine), Drizzle Kit
- **Orchestration**: PNPM Workspaces, Docker Compose

---

## Quick Start

### 1. Environment Setup

Copy `.env.example` to `.env` in the root directory:

```bash
cp .env.example .env
```

Also copy environment files into sub-repositories for local node scripts if needed:
- `pf-db/.env`
- `pf-backend/.env`

---

### Option A: Local Development (PNPM + Docker DB)

1. **Install all workspace dependencies:**
   ```bash
   pnpm install
   ```

2. **Start PostgreSQL database container:**
   ```bash
   pnpm dev:db
   ```

3. **Run database migrations:**
   ```bash
   pnpm db:push
   ```

4. **Start Backend & Frontend dev servers concurrently:**
   ```bash
   pnpm dev
   ```

- Frontend: [http://localhost:5173](http://localhost:5173) (Vite proxies `/api` to backend at `http://localhost:3001`)
- Backend API: [http://localhost:3001](http://localhost:3001)

---

### Option B: Full Stack with Docker Compose

To build and launch all 3 services (`db`, `backend`, `frontend`) in isolated containers:

```bash
pnpm docker:up
# or: docker compose up -d --build
```

- Frontend Web App: [http://localhost:6002](http://localhost:6002)
- Backend API: [http://localhost:3001](http://localhost:3001)
- Database: `localhost:5432`

To stop all services:
```bash
pnpm docker:down
# or: docker compose down
```

---

## Workspace Commands Reference

| Command | Description |
|---|---|
| `pnpm dev` | Run backend & frontend dev servers concurrently |
| `pnpm dev:db` | Start only the Postgres DB container |
| `pnpm db:generate` | Generate Drizzle migration files |
| `pnpm db:push` | Push schema changes directly to DB |
| `pnpm db:migrate` | Apply pending Drizzle database migrations |
| `pnpm db:prototype` | Run Drizzle test/prototype script |
| `pnpm build` | Build all projects (`pf-db`, `pf-backend`, `pf-frontend`) |
| `pnpm docker:up` | Build & run the entire full stack via Docker Compose |
| `pnpm docker:down` | Shut down all Docker containers |
