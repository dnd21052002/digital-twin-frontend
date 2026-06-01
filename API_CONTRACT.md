# Twin@P.CN Frontend API Contract

Backend base URL:

```text
http://localhost:3000/api/v1
```

Swagger:

```text
http://localhost:3000/api/docs
```

## Auth

### Login

```http
POST /api/v1/auth/login
Content-Type: application/json
```

Request:

```ts
type LoginRequest = {
  identifier: string;
  password: string;
};
```

Response:

```ts
type AuthUser = {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatarInitials: string;
  roles: string[];
  permissions: string[];
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
};
```

Local credentials:

```text
identifier: admin or admin@example.com
password: Admin@123456
```

### Me

```http
GET /api/v1/me
Authorization: Bearer <accessToken>
```

Response:

```ts
type MeResponse = AuthUser;
```

### Refresh

```http
POST /api/v1/auth/refresh
Content-Type: application/json
```

Request:

```ts
type RefreshRequest = {
  refreshToken: string;
};
```

Response shape matches login.

### Logout

```http
POST /api/v1/auth/logout
Authorization: Bearer <accessToken>
```

Response:

```ts
type LogoutResponse = {
  ok: true;
};
```

## Error Shape

```ts
type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};
```

Common codes:

```text
invalid_request
unauthorized
permission_denied
not_found
conflict
rate_limited
validation_failed
connector_unavailable
simulation_failed
internal_error
```

Frontend must branch on `error.code`, not raw HTTP text.

## First Sprint Pending API Types

These endpoints are not guaranteed available yet. Build UI against these types via mock services, then replace with real calls when backend lands.

### Facility Tree

```http
GET /api/v1/facility/tree
```

```ts
type FacilityTreeResponse = {
  sites: FacilitySite[];
};

type FacilitySite = {
  id: string;
  name: string;
  buildings: FacilityBuilding[];
};

type FacilityBuilding = {
  id: string;
  name: string;
  floors: FacilityFloor[];
};

type FacilityFloor = {
  id: string;
  name: string;
  halls: FacilityHall[];
};

type FacilityHall = {
  id: string;
  name: string;
  zones: FacilityZone[];
};

type FacilityZone = {
  id: string;
  name: string;
  rows: FacilityRow[];
};

type FacilityRow = {
  id: string;
  name: string;
  rackPositions: RackPosition[];
};

type RackPosition = {
  id: string;
  code: string;
  label: string;
};
```

### Scenes

```http
GET /api/v1/scenes
```

```ts
type ScenesResponse = {
  items: SceneSummary[];
  nextCursor: string | null;
};

type SceneSummary = {
  id: string;
  name: string;
  siteId: string;
  status: 'active' | 'draft' | 'archived';
};
```

### Scene Manifest

```http
GET /api/v1/scenes/{sceneId}/manifest
```

```ts
type SceneManifest = {
  id: string;
  name: string;
  units: 'meters';
  origin: [number, number, number];
  bounds: {
    min: [number, number, number];
    max: [number, number, number];
  };
  assets: SceneAssetNode[];
};

type SceneAssetNode = {
  assetId: string;
  meshId?: string;
  label: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  category: string;
  status: 'active' | 'inactive' | 'maintenance' | 'alarm';
};
```

### Assets List

```http
GET /api/v1/assets?q=&category=&siteId=&status=&limit=50&cursor=
```

```ts
type AssetsResponse = {
  items: AssetSummary[];
  nextCursor: string | null;
};

type AssetSummary = {
  id: string;
  assetTag: string;
  name: string;
  category: string;
  status: 'active' | 'inactive' | 'maintenance' | 'alarm';
  location: {
    siteId: string;
    rackPositionId?: string;
    path?: string;
  };
};
```

### Asset Detail

```http
GET /api/v1/assets/{assetId}
```

```ts
type AssetDetail = AssetSummary & {
  model?: string;
  manufacturer?: string;
  serialNumber?: string;
  locationPath: string[];
  geometry?: {
    sceneId: string;
    meshId?: string;
    position: [number, number, number];
  };
  latestMetrics: LatestMetric[];
  openAlarms: AlarmSummary[];
};
```

### Latest Metrics

```http
GET /api/v1/assets/{assetId}/metrics/latest
```

```ts
type LatestMetricsResponse = {
  assetId: string;
  metrics: LatestMetric[];
};

type LatestMetric = {
  key: string;
  label: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical' | 'unknown';
  timestamp: string;
};
```

### Timeseries Metrics

```http
GET /api/v1/assets/{assetId}/metrics/timeseries?metric=temperature&from=2026-06-01T00:00:00Z&to=2026-06-01T01:00:00Z&interval=1m
```

```ts
type TimeseriesResponse = {
  assetId: string;
  metric: string;
  unit: string;
  points: TimeseriesPoint[];
};

type TimeseriesPoint = {
  timestamp: string;
  value: number;
};
```

Rules:

- `from` and `to` required.
- timestamps UTC ISO-8601.
- use `interval` for chart views.

### Alarms List

```http
GET /api/v1/alarms?status=open&severity=critical&from=&to=&limit=50&cursor=
```

```ts
type AlarmsResponse = {
  items: AlarmSummary[];
  nextCursor: string | null;
};

type AlarmSummary = {
  id: string;
  title: string;
  severity: 'info' | 'warning' | 'critical';
  status: 'open' | 'acknowledged' | 'resolved';
  assetId?: string;
  assetName?: string;
  locationPath?: string[];
  createdAt: string;
};
```

### Alarm Detail

```http
GET /api/v1/alarms/{alarmId}
```

```ts
type AlarmDetail = AlarmSummary & {
  description?: string;
  timeline: AlarmTimelineEvent[];
  recommendedSop?: {
    id: string;
    title: string;
    steps: string[];
  };
  nearestCameras?: {
    id: string;
    name: string;
    streamUrl?: string;
  }[];
};

type AlarmTimelineEvent = {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  actorName?: string;
};
```

## HTTP Client Requirements

- Add `Authorization` header if access token exists.
- Parse JSON safely; handle empty response.
- Map non-2xx to `ApiError`.
- Refresh once on `401 unauthorized`; avoid infinite retry loop.
- Request timeout recommended: 10s.
- Never log tokens/passwords/raw auth headers.

## Cache Keys

Recommended TanStack Query keys:

```ts
['me']
['facilityTree']
['scenes']
['sceneManifest', sceneId]
['assets', filters]
['asset', assetId]
['assetMetricsLatest', assetId]
['assetMetricsTimeseries', assetId, metric, from, to, interval]
['alarms', filters]
['alarm', alarmId]
```
