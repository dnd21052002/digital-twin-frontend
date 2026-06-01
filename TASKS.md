# Twin@P.CN Frontend Tasks

## Status Legend

- `[ ]` Not started.
- `[~]` In progress.
- `[x]` Done.

## Phase F0 — Frontend Foundation

- [ ] Scaffold Vite React TypeScript app in `frontend/frontend-app`.
- [ ] Add Tailwind CSS and base dark theme.
- [ ] Add shadcn/ui setup.
- [ ] Add React Router routes: `/login`, `/twin`.
- [ ] Add TanStack Query provider.
- [ ] Add Zustand viewer store.
- [ ] Add env loader for `VITE_API_BASE_URL` and `VITE_USE_MOCK_CORE`.
- [ ] Add API client with auth header, error parsing, refresh retry.
- [ ] Add basic tests setup with Vitest + Testing Library.
- [ ] Add lint/typecheck/build scripts.
- [ ] Add frontend Dockerfile for static Vite build served by Nginx.
- [ ] Add Nginx SPA fallback config with `/health` endpoint.
- [ ] Add `.dockerignore`.
- [ ] Build and run Docker image `twin-frontend-app:f0-foundation`.
- [ ] Verify Docker frontend at `http://localhost:8080`.

## Phase F1 — Auth + App Shell

- [ ] Implement login page.
- [ ] Implement real `POST /api/v1/auth/login` integration.
- [ ] Implement real `GET /api/v1/me` integration.
- [ ] Implement refresh token flow.
- [ ] Implement logout.
- [ ] Implement protected route guard.
- [ ] Implement app shell: top bar, sidebar, main canvas area, right panel.
- [ ] Show API connection status using health endpoint.
- [ ] Add auth tests.
- [ ] Rebuild and rerun Docker image `twin-frontend-app:f1-auth-shell`.
- [ ] Verify login/logout in Docker frontend against backend Docker.

## Phase F2 — Mock Digital Twin Core

- [ ] Define typed contracts from `API_CONTRACT.md`.
- [ ] Add mock facility tree data.
- [ ] Add mock scenes and scene manifest data.
- [ ] Add mock assets and asset detail data.
- [ ] Add mock latest metrics and timeseries data.
- [ ] Add mock alarms list/detail data.
- [ ] Add service adapter switch using `VITE_USE_MOCK_CORE`.
- [ ] Rebuild and rerun Docker image `twin-frontend-app:f2-mock-core`.
- [ ] Verify mock facility/scenes/assets/metrics/alarms render in Docker frontend.

## Phase F3 — Facility + 3D Scene

- [ ] Implement facility tree sidebar.
- [ ] Implement scene selector.
- [ ] Implement scene manifest loading state.
- [ ] Implement React Three Fiber scene shell.
- [ ] Render placeholder racks/assets from manifest.
- [ ] Implement asset mesh click selection.
- [ ] Highlight selected asset.
- [ ] Add viewer empty/error states.
- [ ] Rebuild and rerun Docker image `twin-frontend-app:f3-scene`.
- [ ] Verify clickable 3D assets in Docker frontend.

## Phase F4 — Asset Detail + Telemetry

- [ ] Implement asset detail panel.
- [ ] Implement latest metric cards.
- [ ] Implement timeseries chart.
- [ ] Add metric selector.
- [ ] Add default time range: last 1 hour.
- [ ] Show related/open alarms for selected asset.
- [ ] Add loading/empty/error states.
- [ ] Rebuild and rerun Docker image `twin-frontend-app:f4-asset-telemetry`.
- [ ] Verify selected asset details, metrics, chart, alarms in Docker frontend.

## Phase F5 — Alarms + Layers UI

- [ ] Implement alarm list panel.
- [ ] Implement alarm detail view.
- [ ] Link alarm selection to asset selection when possible.
- [ ] Implement severity/status badges.
- [ ] Implement layer toggle controls.
- [ ] Implement opacity sliders.
- [ ] Render basic layer placeholders in viewer.
- [ ] Rebuild and rerun Docker image `twin-frontend-app:f5-alarms-layers`.
- [ ] Verify alarms and layer controls in Docker frontend.

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

- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run test`.
- [ ] Run `npm run build`.
- [ ] Build Docker image with phase tag.
- [ ] Restart `twin-frontend-app` container.
- [ ] Verify `curl http://localhost:8080/health`.
- [ ] Verify app in browser at `http://localhost:8080`.
- [ ] Update this `TASKS.md`.

## Definition of Done — First Frontend Sprint

- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run test` passes.
- [ ] `npm run build` passes.
- [ ] Docker image builds.
- [ ] Docker container runs on `http://localhost:8080`.
- [ ] User can login with `admin` / `Admin@123456`.
- [ ] `/twin` renders app shell.
- [ ] Facility tree renders.
- [ ] 3D viewer renders clickable assets.
- [ ] Clicking asset updates detail panel.
- [ ] Asset panel shows metrics chart and alarms.
- [ ] Logout works.
- [ ] UI clearly marks mock core data while backend endpoints are pending.
