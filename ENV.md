# Twin@P.CN Frontend Environment

## Backend API

Local backend:

```text
http://localhost:3000/api/v1
```

Swagger:

```text
http://localhost:3000/api/docs
```

Health checks:

```text
GET http://localhost:3000/api/v1/health
GET http://localhost:3000/api/v1/health/db
```

## Frontend Env Vars

Create `.env.local` in frontend app root:

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_USE_MOCK_CORE=true
VITE_APP_NAME=Twin@P.CN Digital Twin
```

Meaning:

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Backend REST base URL |
| `VITE_USE_MOCK_CORE` | Use mock facility/scene/assets/metrics/alarms while backend APIs pending |
| `VITE_APP_NAME` | App title in shell/login |

## Local Credentials

Use real backend auth:

```text
identifier: admin
password: Admin@123456
```

or:

```text
identifier: admin@example.com
password: Admin@123456
```

E2E-only user if tests seed it:

```text
identifier: e2e-admin
password: Test@123456
```

## CORS

Backend local CORS includes:

```text
http://localhost:3000
http://localhost:5173
```

Run frontend dev server on Vite default:

```text
http://localhost:5173
```

Docker frontend served by Nginx should use:

```text
http://localhost:8080
```

If Docker frontend calls backend from browser, `VITE_API_BASE_URL` should still be browser-reachable:

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Do not use `host.docker.internal` in frontend browser env unless browser itself can resolve it. For Vite static builds, env is baked at build time and executed in browser.

## Commands

Expected frontend commands after scaffold:

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Mock Mode

`VITE_USE_MOCK_CORE=true`:

- Auth calls real backend.
- `/me` calls real backend.
- Facility/scene/assets/metrics/alarms use frontend fixtures.

`VITE_USE_MOCK_CORE=false`:

- All services call backend endpoints.
- Use only when backend Phase 2/3/5 endpoints exist.

## Security

- Do not commit `.env.local`.
- Do not log accessToken, refreshToken, password, Authorization header.
- Prefer in-memory access token; refresh token storage must be wrapped and easy to replace later.
- For local demo only, storing tokens in localStorage/sessionStorage is acceptable if code centralizes access in `auth-storage.ts`.

## Backend Docker Runtime

Backend app expected running at:

```text
container: twin-backend-app
port: 3000
```

If login fails, verify:

```bash
curl http://localhost:3000/api/v1/health
curl http://localhost:3000/api/v1/health/db
```

## Frontend Docker Runtime

Expected local frontend container:

```text
container: twin-frontend-app
image: twin-frontend-app:<phase>
host port: 8080
container port: 80
url: http://localhost:8080
```

Recommended Dockerfile for `frontend/frontend-app`:

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG VITE_API_BASE_URL=http://localhost:3000/api/v1
ARG VITE_USE_MOCK_CORE=true
ARG VITE_APP_NAME=Twin@P.CN Digital Twin
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_USE_MOCK_CORE=$VITE_USE_MOCK_CORE
ENV VITE_APP_NAME=$VITE_APP_NAME
RUN npm run build

FROM nginx:1.27-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Recommended `frontend/frontend-app/nginx.conf`:

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /health {
    access_log off;
    return 200 'ok';
    add_header Content-Type text/plain;
  }
}
```

Build after each frontend phase:

```bash
cd /Users/ndiepdev/Developer/twin-database/frontend/frontend-app
docker build \
  --build-arg VITE_API_BASE_URL=http://localhost:3000/api/v1 \
  --build-arg VITE_USE_MOCK_CORE=true \
  --build-arg "VITE_APP_NAME=Twin@P.CN Digital Twin" \
  -t twin-frontend-app:<phase> .
```

Run/restart after each frontend phase:

```bash
docker rm -f twin-frontend-app 2>/dev/null || true
docker run -d \
  --name twin-frontend-app \
  -p 8080:80 \
  twin-frontend-app:<phase>
```

Verify after each frontend phase:

```bash
curl http://localhost:8080/health
curl -I http://localhost:8080
```

Browser verification:

```text
http://localhost:8080
```

Phase-specific verification:

- F0: static app loads.
- F1: login/logout works against backend Docker.
- F2-F5: app shell, mock twin data, scene, assets, metrics, alarms render.
- F6: mock adapters switched to real backend endpoints where available.

## Phase Update Rule

After every frontend phase:

1. Run quality gates: lint, typecheck, test, build.
2. Build Docker image with phase tag, e.g. `twin-frontend-app:f1-auth-shell`.
3. Restart `twin-frontend-app` container.
4. Verify `http://localhost:8080/health` and app UI.
5. Update `frontend/TASKS.md` with completed phase items.
6. Report exact commands/results.
