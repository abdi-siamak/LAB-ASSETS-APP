# Lab Assets

A tiny full‑stack demo: **React (Vite)** front end, **Express + Mongoose** API, **MongoDB** database. Includes **ESM**, **Jest/Supertest** integration tests, **Docker Compose**, and **GitHub Actions** CI/CD.

## Tech Stack

* React 18 + Vite
* Node.js 20+, Express 4, Mongoose 8
* MongoDB 7
* Jest 29 + Supertest
* Docker & docker compose
* GitHub Actions (lint, test, build)

## Quick Start (Local)

```bash
# 1) Start MongoDB (choose one)
# Docker
docker run -d --name mongo -p 27017:27017 mongo:7
# OR Local service (brew/apt) or Atlas URI

# 2) API
cd server
cp .env.example .env  # or create .env (see below)
npm ci
npm run dev           # http://localhost:4000

# 3) Client
cd ../client
npm ci
npm run dev           # http://localhost:5173
```

## Environment

**server/.env**

```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/labassets
CORS_ORIGIN=*
```

**client/.env**

```
VITE_API_URL=http://localhost:4000/api
```

## API (REST)

* `GET /api/health` → `{ ok: true }`
* `GET /api/assets?q=&page=&limit=`
* `GET /api/assets/:id`
* `POST /api/assets` (JSON body)
* `PATCH /api/assets/:id`
* `DELETE /api/assets/:id`

## Tests

```bash
cd server
npm test  # ESM + Jest + Supertest (uses real Mongo on 27017)
```

## Docker Compose

```bash
# from repo root
docker compose up --build
# Client:  http://localhost:5173
# API:     http://localhost:4000/api
# Mongo:   localhost:27017 (volume persisted)
```

## Project Structure

```
lab-assets-app/
  client/   # React (Vite)
  server/   # Express (ESM), routes/models/middleware
  .github/workflows/ci.yml  # tests + build
```

## CI/CD

GitHub Actions runs: **lint → test (server) → build (client)** on push/pull requests to `main`. Coverage is uploaded as an artifact.

**CD:** Pushing a tag `v*.*.*` triggers a workflow that builds & pushes Docker images for `server` and `client` to GitHub Container Registry (GHCR). Example: `git tag v1.0.0 && git push --tags`.

## License

MIT
