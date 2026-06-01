# Twin@P.CN Frontend Architecture

## Architecture Overview

```text
Browser
  |
  v
React App
  |-- Auth Route Guard
  |-- App Shell
  |-- 3D Viewer
  |-- Facility/Layer Sidebar
  |-- Asset Detail Panel
  |-- Telemetry Charts
  |-- Alarm Panel
  |
  | hooks/useQuery
  v
API Services
  |-- Real backend client
  |-- Mock adapter for pending APIs
  |
  v
Backend REST API /api/v1
```

## Folder Structure

Recommended app root:

```text
frontend-app/
  src/
    app/
      App.tsx
      router.tsx
      providers.tsx
    config/
      env.ts
    lib/
      api-client.ts
      api-error.ts
      auth-storage.ts
      cn.ts
    features/
      auth/
        api.ts
        components/
        hooks.ts
        types.ts
      shell/
        AppShell.tsx
        TopBar.tsx
        Sidebar.tsx
      facility/
        api.ts
        hooks.ts
        types.ts
        FacilityTree.tsx
      scenes/
        api.ts
        hooks.ts
        types.ts
        SceneViewer.tsx
        SceneCanvas.tsx
        AssetMesh.tsx
      assets/
        api.ts
        hooks.ts
        types.ts
        AssetDetailPanel.tsx
        AssetSearch.tsx
      telemetry/
        api.ts
        hooks.ts
        types.ts
        MetricCards.tsx
        TimeseriesChart.tsx
      alarms/
        api.ts
        hooks.ts
        types.ts
        AlarmList.tsx
        AlarmDetail.tsx
      layers/
        store.ts
        LayerControls.tsx
    mocks/
      data.ts
      mock-api.ts
    stores/
      viewer-store.ts
    test/
      setup.ts
```

## Route Map

```text
/login                 public login screen
/                      protected app shell, redirect to /twin
/twin                  default Digital Twin workspace
/twin/scenes/:sceneId  selected scene later
/twin/assets/:assetId  selected asset deep link later
```

First sprint can keep one protected route `/twin` and store selected scene/asset in state. Add deep links after API stabilizes.

## Data Flow

### App boot

1. Read access token from storage wrapper.
2. If token exists, call `GET /api/v1/me`.
3. If valid, render app shell.
4. If invalid, clear tokens and redirect `/login`.
5. Load facility tree, scenes, default scene manifest, visible assets.
6. User clicks asset in 3D viewer/list.
7. Load asset detail, metrics latest, metrics timeseries, related/open alarms.

### Auth flow

```text
Login form
  -> POST /auth/login
  -> save accessToken + refreshToken
  -> query /me
  -> navigate /twin
```

Access token goes in:

```text
Authorization: Bearer <accessToken>
```

Refresh behavior:

- On `401 unauthorized`, call `POST /auth/refresh` once.
- If refresh succeeds, retry original request.
- If refresh fails, clear session and redirect `/login`.

## State Boundaries

### Server state: TanStack Query

Use for:

- current user
- facility tree
- scenes
- scene manifest
- assets
- selected asset detail
- metrics
- alarms

### Client/viewer state: Zustand

Use for:

- selected scene ID
- selected asset ID
- active layer IDs
- layer opacity
- camera mode
- mock/real adapter flag if needed

Suggested store shape:

```ts
type ViewerState = {
  selectedSceneId: string | null;
  selectedAssetId: string | null;
  activeLayers: Record<string, boolean>;
  layerOpacity: Record<string, number>;
  setSelectedSceneId: (sceneId: string | null) => void;
  setSelectedAssetId: (assetId: string | null) => void;
  setLayerVisible: (layerType: string, visible: boolean) => void;
  setLayerOpacity: (layerType: string, opacity: number) => void;
};
```

## Component Layout

```text
<AppProviders>
  <RouterProvider>
    /login -> <LoginPage />
    /twin  -> <ProtectedRoute>
                <AppShell>
                  <Sidebar>
                    <FacilityTree />
                    <LayerControls />
                  </Sidebar>
                  <SceneViewer />
                  <RightPanel>
                    <AssetDetailPanel />
                    <TelemetryPanel />
                    <AlarmPanel />
                  </RightPanel>
                </AppShell>
              </ProtectedRoute>
```

## 3D Viewer First Sprint

Build useful shell before real mesh pipeline:

- floor/grid
- orbit controls
- lighting
- placeholder racks/assets as clickable boxes
- color by status/severity
- selected asset highlight
- empty state if no scene/assets

Do not block on real GLTF/mesh assets. Scene manifest adapter can map manifest nodes to placeholder boxes until backend returns real geometry metadata.

## Error Handling

Backend error shape:

```json
{
  "error": {
    "code": "validation_failed",
    "message": "from must be before to",
    "details": {}
  }
}
```

Frontend rules:

- Parse error into `ApiError`.
- Display `message` to user.
- Use `code` for conditional behavior.
- Never show raw stack traces.
- For `unauthorized`, trigger refresh/logout path.
- For connection/network failure, show API offline banner.

## Mock Strategy

Pending backend APIs need mock services with exact contract types.

Mock mode must support:

- login via real backend if backend running.
- facility/scenes/assets/telemetry/alarms from fixtures until backend implements them.
- easy switch per service from mock to real.

Recommended env:

```text
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_USE_MOCK_CORE=true
```

`VITE_USE_MOCK_CORE=true` means auth can still be real, but core Digital Twin data comes from fixtures.

## Testing Strategy

Unit/component tests:

- login form validation and submit
- API error parsing
- auth guard redirects
- asset selection updates panel
- metric chart renders empty/loading/data states
- alarm severity badge rendering

E2E later:

- login
- load twin workspace
- select asset
- see metrics/alarms
- logout

## Performance Notes

- Keep 3D objects memoized.
- Do not re-render whole canvas on panel state changes.
- Use query cache `staleTime` for static catalogs/scenes.
- Use polling only for selected asset metrics if realtime absent.
- Cap chart sample counts; backend will downsample later.
