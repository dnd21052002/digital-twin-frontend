# Professional Frontend Agent Prompt

Use this prompt in second terminal to build frontend in parallel.

```text
You are building the frontend for Twin@P.CN, a data-center Digital Twin web app.

Working directory:
/Users/ndiepdev/Developer/twin-database/frontend

Read these docs first, in order:
1. PROJECT.md
2. TECHSTACK.md
3. ARCHITECTURE.md
4. API_CONTRACT.md
5. FEATURES.md
6. ENV.md
7. CONVENTIONS.md
8. TASKS.md

Goal:
Implement the first frontend sprint so an operator can login, open the Digital Twin workspace, view a 3D scene shell, click/select an asset, and see asset metrics + alarms.

Important backend status:
- Backend Phase 1 is available at http://localhost:3000/api/v1.
- Auth endpoints are real and should be used:
  - POST /api/v1/auth/login
  - POST /api/v1/auth/logout
  - POST /api/v1/auth/refresh
  - GET /api/v1/me
- Swagger: http://localhost:3000/api/docs
- Default local credentials:
  - identifier: admin or admin@example.com
  - password: Admin@123456
- Core Digital Twin APIs for facility/scenes/assets/telemetry/alarms are pending. Implement typed mock adapters for these using API_CONTRACT.md. Keep the adapter switch controlled by VITE_USE_MOCK_CORE=true.

Implementation requirements:
1. Scaffold Vite + React + TypeScript app under frontend/frontend-app.
2. Use React Router, TanStack Query, Zustand, Tailwind CSS, shadcn/ui, React Three Fiber, Drei, Recharts.
3. Create .env.example, not .env.local. Document local env usage.
4. Do not log tokens/passwords/auth headers.
5. Use a centralized API client for all real backend calls.
6. Implement auth token injection and one-time refresh retry on 401.
7. Keep UI components away from raw fetch calls.
8. Use typed API contracts matching API_CONTRACT.md.
9. Build mock data/services for pending endpoints.
10. Mark mock data clearly in UI.
11. Add Docker deployment for frontend from the beginning:
    - frontend/frontend-app/Dockerfile
    - frontend/frontend-app/nginx.conf
    - frontend/frontend-app/.dockerignore
    - multi-stage build: Node build -> Nginx static serve
    - SPA fallback to index.html
    - /health endpoint returning ok
12. After every frontend phase, rebuild and rerun Docker image/container so APIs/UI stay current.
13. Update TASKS.md as work is completed.

Docker requirements:
- Container name: twin-frontend-app
- Image tag pattern: twin-frontend-app:<phase>
- Host port: 8080
- Container port: 80
- URL: http://localhost:8080
- Build args:
  - VITE_API_BASE_URL=http://localhost:3000/api/v1
  - VITE_USE_MOCK_CORE=true
  - VITE_APP_NAME=Twin@P.CN Digital Twin

Recommended Dockerfile:
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

Recommended nginx.conf:
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

Phase Docker workflow:
cd /Users/ndiepdev/Developer/twin-database/frontend/frontend-app
npm run lint
npm run typecheck
npm run test
npm run build
docker build \
  --build-arg VITE_API_BASE_URL=http://localhost:3000/api/v1 \
  --build-arg VITE_USE_MOCK_CORE=true \
  --build-arg "VITE_APP_NAME=Twin@P.CN Digital Twin" \
  -t twin-frontend-app:<phase> .
docker rm -f twin-frontend-app 2>/dev/null || true
docker run -d --name twin-frontend-app -p 8080:80 twin-frontend-app:<phase>
curl http://localhost:8080/health
curl -I http://localhost:8080

Target app shape:
- /login: login form with validation and backend error display.
- /twin: protected app shell.
- App shell includes:
  - top bar with app name, API status, user menu/logout
  - left sidebar with facility tree and layer controls
  - center React Three Fiber scene viewer
  - right panel with selected asset details, latest metrics, timeseries chart, related alarms

3D requirements:
- Use placeholder geometry, not real GLTF yet.
- Render rack/assets as boxes from scene manifest mock data.
- Color assets by status/severity.
- Clicking mesh sets selectedAssetId in Zustand store.
- Selected asset is highlighted.

Quality gates before claiming done:
- npm run lint
- npm run typecheck
- npm run test
- npm run build
- docker build succeeds
- docker container runs
- curl http://localhost:8080/health returns ok
- app opens at http://localhost:8080

If scripts are missing, add them. Do not claim completion without running the gates and reporting exact results.

Git rules:
- Work only inside /Users/ndiepdev/Developer/twin-database/frontend unless reading backend docs is necessary.
- Do not modify backend files.
- Do not commit secrets or .env.local.

Output expected:
- Running frontend app in Docker.
- Updated frontend/TASKS.md.
- Brief summary of implemented screens/components.
- Exact verification command outputs.
```

## Suggested First Command Sequence

```bash
cd /Users/ndiepdev/Developer/twin-database/frontend
ls
# read docs above
npm create vite@latest frontend-app -- --template react-ts
cd frontend-app
npm install @tanstack/react-query react-router-dom zustand zod react-hook-form @hookform/resolvers three @react-three/fiber @react-three/drei recharts clsx tailwind-merge lucide-react
npm install -D tailwindcss postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom eslint prettier
npx tailwindcss init -p
```

Then configure app, Dockerfile, Nginx, and phase verification according to docs.
