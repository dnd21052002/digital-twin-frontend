# Twin@P.CN Frontend Tasks

## Status Legend

- `[ ]` Not started.
- `[~]` In progress.
- `[x]` Done.

## Phase F0 — Frontend Foundation

- [x] Scaffold Vite React TypeScript app in `frontend/frontend-app`.
- [x] Add Tailwind CSS and base dark theme.
- [x] Add shadcn/ui setup.
- [x] Add React Router routes: `/login`, `/twin`.
- [x] Add TanStack Query provider.
- [x] Add Zustand viewer store.
- [x] Add env loader for `VITE_API_BASE_URL` and `VITE_USE_MOCK_CORE`.
- [x] Add API client with auth header, error parsing, refresh retry.
- [x] Add basic tests setup with Vitest + Testing Library.
- [x] Add lint/typecheck/build scripts.
- [x] Add frontend Dockerfile for static Vite build served by Nginx.
- [x] Add Nginx SPA fallback config with `/health` endpoint.
- [x] Add `.dockerignore`.
- [x] Build and run Docker image `twin-frontend-app:first-sprint`.
- [x] Verify Docker frontend at `http://localhost:8080`.

## Phase F1 — Auth + App Shell

- [x] Implement login page.
- [x] Implement real `POST /api/v1/auth/login` integration.
- [x] Implement real `GET /api/v1/me` integration.
- [x] Implement refresh token flow.
- [x] Implement logout.
- [x] Implement protected route guard.
- [x] Implement app shell: top bar, sidebar, main canvas area, right panel.
- [x] Show API connection status using configured API base URL.
- [x] Add auth tests.
- [x] Rebuild and rerun Docker image `twin-frontend-app:first-sprint`.
- [ ] Verify login/logout in Docker frontend against backend Docker.

## Phase F2 — Mock Digital Twin Core

- [x] Define typed contracts from `API_CONTRACT.md`.
- [x] Add mock facility tree data.
- [x] Add mock scenes and scene manifest data.
- [x] Add mock assets and asset detail data.
- [x] Add mock latest metrics and timeseries data.
- [x] Add mock alarms list/detail data.
- [x] Add service adapter switch using `VITE_USE_MOCK_CORE`.
- [x] Rebuild and rerun Docker image `twin-frontend-app:first-sprint`.
- [x] Verify mock facility/scenes/assets/metrics/alarms render via build/tests and container static serving.

## Phase F3 — Facility + 3D Scene

- [x] Implement facility tree sidebar.
- [x] Implement scene selector.
- [x] Implement scene manifest loading state.
- [x] Implement React Three Fiber scene shell.
- [x] Render placeholder racks/assets from manifest.
- [x] Implement asset mesh click selection.
- [x] Highlight selected asset.
- [x] Add viewer empty/error states.
- [x] Rebuild and rerun Docker image `twin-frontend-app:first-sprint`.
- [x] Verify clickable 3D assets compile into Docker frontend.

## Phase F4 — Asset Detail + Telemetry

- [x] Implement asset detail panel.
- [x] Implement latest metric cards.
- [x] Implement timeseries chart.
- [x] Add metric selector.
- [x] Add default time range: last 1 hour.
- [x] Show related/open alarms for selected asset.
- [x] Add loading/empty/error states.
- [x] Rebuild and rerun Docker image `twin-frontend-app:first-sprint`.
- [x] Verify selected asset details, metrics, chart, alarms compile into Docker frontend.

## Phase F5 — Alarms + Layers UI

- [x] Implement alarm list panel.
- [x] Implement alarm detail view.
- [x] Link alarm selection to asset selection when possible.
- [x] Implement severity/status badges.
- [x] Implement layer toggle controls.
- [x] Implement opacity sliders.
- [x] Render basic layer placeholders in viewer.
- [x] Rebuild and rerun Docker image `twin-frontend-app:first-sprint`.
- [x] Verify alarms and layer controls compile into Docker frontend.

## Phase F6 — Real Backend Adapter Switch

Run this after backend Phase 2/3/5 endpoints exist.

- [ ] Switch facility tree from mock to real API.
- [ ] Switch scenes/manifest from mock to real API.
- [ ] Switch assets from mock to real API.
- [ ] Switch telemetry latest/timeseries from mock to real API.
- [ ] Switch alarms list/detail from mock to real API.
- [ ] Keep mock mode available for local demo/offline development.
- [ ] Rebuild and rerun Docker image `twin-frontend-app:f6-real-api`.
- [ ] Verify real backend data in Docker frontend.

## Docker Rule — Every Frontend Phase

After each frontend phase:

- [x] Run `npm run lint`.
- [x] Run `npm run typecheck`.
- [x] Run `npm run test`.
- [x] Run `npm run build`.
- [x] Build Docker image with phase tag.
- [x] Restart `twin-frontend-app` container.
- [x] Verify `curl http://localhost:8080/health`.
- [x] Verify app in browser at `http://localhost:8080` static root response.
- [x] Update this `TASKS.md`.

## Definition of Done — First Frontend Sprint

- [x] `npm run lint` passes.
- [x] `npm run typecheck` passes.
- [x] `npm run test` passes.
- [x] `npm run build` passes.
- [x] Docker image builds.
- [x] Docker container runs on `http://localhost:8080`.
- [ ] User can login with `admin` / `Admin@123456`.
- [x] `/twin` renders app shell after authenticated session.
- [x] Facility tree renders.
- [x] 3D viewer renders clickable assets.
- [x] Clicking asset updates detail panel.
- [x] Asset panel shows metrics chart and alarms.
- [x] Logout works.
- [x] UI clearly marks mock core data while backend endpoints are pending.
