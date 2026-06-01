# Twin@P.CN Frontend Features

## First Sprint Scope

Goal:

```text
Frontend can login, load 3D scene context, click asset, see metrics and alarms.
```

## Feature Checklist

### 1. Auth

- Login page with username/email + password.
- Persist session safely through reload.
- Fetch current user via `/me`.
- Protected app route.
- Logout clears session.
- Refresh token flow on expired access token.
- Display backend validation/auth errors.

### 2. App Shell

- Top navigation bar.
- API connection status.
- User menu/logout.
- Left sidebar for facility tree and layers.
- Center 3D viewer.
- Right inspector panel.
- Alarm/telemetry section.
- Responsive desktop-first layout.

### 3. Facility + Scene Context

- Load facility tree from mock/API.
- Load scene list from mock/API.
- Select default scene.
- Load scene manifest from mock/API.
- Render placeholder 3D scene from manifest.

### 4. 3D Viewer

- Grid/floor/lights/camera controls.
- Render racks/assets as placeholder meshes.
- Color asset meshes by status.
- Click asset mesh to select.
- Highlight selected asset.
- Empty/loading/error states.

### 5. Asset Detail

- Show selected asset tag/name/category/status.
- Show facility location path.
- Show latest metrics cards.
- Show timeseries chart.
- Show related/open alarms.

### 6. Telemetry

- Latest metric cards: temperature, power, humidity/utilization if available.
- Timeseries chart with metric selector.
- Required time range defaults: last 1 hour.
- Mock data until backend telemetry endpoints land.

### 7. Alarms

- Alarm list with severity/status.
- Filter by open/critical locally first.
- Selecting alarm shows detail panel.
- Link alarm to asset selection when assetId exists.

### 8. Layers

First sprint UI only:

- X-Ray toggle.
- Thermal toggle.
- Airflow toggle.
- Power path toggle.
- Opacity slider.

Layer visuals can be placeholders until backend layer APIs land.

## Out of Scope for First Sprint

- Real GLTF/mesh pipeline.
- Realtime WebSocket/SSE.
- Alarm acknowledge/assign/resolve actions.
- CCTV live video playback.
- SOP execution workflow.
- Simulation/time-machine UI.
- Capacity placement recommendation UI.
- Admin user/role management.

## Later Roadmap

### Sprint 2

- Real backend Phase 2 APIs.
- Scene manifest real adapter.
- Asset list/search.
- Viewpoints.
- Rack details.

### Sprint 3

- Real telemetry APIs.
- Layer data APIs.
- Polling/realtime telemetry.
- Chart downsampling controls.

### Sprint 4

- Alarm list/detail real APIs.
- Alarm lifecycle actions.
- CCTV/SOP panels.
- Notification UI.

### Sprint 5+

- History playback.
- RCA case timeline.
- Simulation scenarios/runs/results.
- Capacity dashboard and placement recommendations.

## UX Acceptance Criteria

First sprint demo passes if:

1. User can login with local admin credentials.
2. App shell opens after auth.
3. Facility tree and scene selector render mock/API data.
4. 3D viewer renders multiple clickable assets.
5. Clicking asset updates selected asset panel.
6. Panel shows asset details, latest metrics, chart, related alarms.
7. Logout returns user to login.
8. Backend offline/auth errors show clear UI state.
