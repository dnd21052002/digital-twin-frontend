# Twin@P.CN Frontend Project

## Purpose

Build web frontend for data-center Digital Twin: secure login, 3D facility/asset viewer, asset detail panel, telemetry charts, alarm list/detail, layer controls, and operator workflows.

Frontend team can run in parallel with backend team. Backend Phase 1 is available now; Phase 2/3/5 first-sprint APIs are planned but not complete yet.

## Product Goal

First usable frontend sprint must prove this operator journey:

```text
Login -> load facility/scene context -> view 3D scene shell -> click/select asset -> see metrics + alarms
```

## Current Backend Status

Available now:

- `GET /api/v1/health`
- `GET /api/v1/health/db`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/me`
- Swagger/OpenAPI: `GET /api/docs`

Pending first-sprint backend APIs:

- `GET /api/v1/facility/tree`
- `GET /api/v1/assets`
- `GET /api/v1/assets/{assetId}`
- `GET /api/v1/scenes`
- `GET /api/v1/scenes/{sceneId}/manifest`
- `GET /api/v1/assets/{assetId}/metrics/latest`
- `GET /api/v1/assets/{assetId}/metrics/timeseries`
- `GET /api/v1/alarms`
- `GET /api/v1/alarms/{alarmId}`

Frontend must use typed mock adapters for pending APIs, then switch adapters to real API calls when backend endpoints land.

## Local Runtime

Backend API:

```text
http://localhost:3000/api/v1
```

Swagger:

```text
http://localhost:3000/api/docs
```

Default local admin:

```text
username: admin
email: admin@example.com
password: Admin@123456
```

## Recommended Frontend Stack

Use:

```text
Vite + React + TypeScript + React Router + TanStack Query + Zustand + Tailwind + shadcn/ui + React Three Fiber + Recharts
```

Why:

- React ecosystem fits dashboard + 3D viewer.
- TypeScript keeps API contracts stable while backend evolves.
- TanStack Query handles auth-aware API cache, retries, loading states.
- Zustand handles viewer/layer UI state without heavy Redux setup.
- React Three Fiber supports Three.js scene orchestration in React.
- Recharts is enough for first telemetry charts.
- shadcn/ui gives professional dashboard primitives fast.

## UX Principles

- Operator-first: show status, alarms, asset metrics above decoration.
- 3D is primary context; side panels provide details.
- Every async state has loading, empty, error, retry UI.
- App must work with backend unavailable by showing clear connection status.
- Mock mode must be explicit in UI/dev config.
- Never store password, refresh token, or access token in logs.

## Main Screens

1. Login
   - Email/username + password.
   - Shows API/server error using backend error `code` + `message`.

2. App Shell
   - Top bar: project name, connection status, user menu/logout.
   - Left sidebar: facility tree, scene selector, layer toggles.
   - Center: 3D viewer canvas.
   - Right panel: selected asset detail.
   - Bottom/side drawer: alarm list and telemetry charts.

3. Asset Detail
   - Identity: tag, name, category, status.
   - Location path.
   - Latest metrics.
   - Timeseries chart.
   - Related alarms.

4. Alarm Detail
   - Severity/status.
   - Affected asset/location.
   - Timeline.
   - SOP/CCTV placeholders until backend APIs land.

## Documentation Map

- `TECHSTACK.md` — frontend stack decision.
- `ARCHITECTURE.md` — app structure and state/data flow.
- `API_CONTRACT.md` — backend endpoint contracts frontend consumes.
- `FEATURES.md` — first sprint feature scope and later roadmap.
- `TASKS.md` — implementation checklist for frontend terminal.
- `ENV.md` — local env variables and run config.
- `CONVENTIONS.md` — naming, code style, UI/data conventions.
- `PROMPT.md` — professional prompt for second terminal/agent.
