export type AssetStatus = 'active' | 'inactive' | 'maintenance' | 'alarm'

export type FacilityTreeResponse = { sites: FacilitySite[] }
export type FacilitySite = { id: string; name: string; buildings: FacilityBuilding[] }
export type FacilityBuilding = { id: string; name: string; floors: FacilityFloor[] }
export type FacilityFloor = { id: string; name: string; halls: FacilityHall[] }
export type FacilityHall = { id: string; name: string; zones: FacilityZone[] }
export type FacilityZone = { id: string; name: string; rows: FacilityRow[] }
export type FacilityRow = { id: string; name: string; rackPositions: RackPosition[] }
export type RackPosition = { id: string; code: string; label: string }

export type ScenesResponse = { items: SceneSummary[]; nextCursor: string | null }
export type SceneSummary = { id: string; name: string; siteId: string; status: 'active' | 'draft' | 'archived' }
export type SceneManifest = {
  id: string
  name: string
  units: 'meters'
  origin: [number, number, number]
  bounds: { min: [number, number, number]; max: [number, number, number] }
  assets: SceneAssetNode[]
}
export type SceneAssetNode = {
  assetId: string
  meshId?: string
  label: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  category: string
  status: AssetStatus
}

export type AssetsResponse = { items: AssetSummary[]; nextCursor: string | null }
export type AssetSummary = {
  id: string
  assetTag: string
  name: string
  category: string
  status: AssetStatus
  location: { siteId: string; rackPositionId?: string; path?: string }
}
export type AssetDetail = AssetSummary & {
  model?: string
  manufacturer?: string
  serialNumber?: string
  locationPath: string[]
  geometry?: { sceneId: string; meshId?: string; position: [number, number, number] }
  latestMetrics: LatestMetric[]
  openAlarms: AlarmSummary[]
}

export type LatestMetricsResponse = { assetId: string; metrics: LatestMetric[] }
export type LatestMetric = {
  key: string
  label: string
  value: number
  unit: string
  status: 'normal' | 'warning' | 'critical' | 'unknown'
  timestamp: string
}
export type TimeseriesResponse = { assetId: string; metric: string; unit: string; points: TimeseriesPoint[] }
export type TimeseriesPoint = { timestamp: string; value: number }

export type AlarmsResponse = { items: AlarmSummary[]; nextCursor: string | null }
export type AlarmSummary = {
  id: string
  title: string
  severity: 'info' | 'warning' | 'critical'
  status: 'open' | 'acknowledged' | 'resolved'
  assetId?: string
  assetName?: string
  locationPath?: string[]
  createdAt: string
}
export type AlarmDetail = AlarmSummary & {
  description?: string
  timeline: AlarmTimelineEvent[]
  recommendedSop?: { id: string; title: string; steps: string[] }
  nearestCameras?: { id: string; name: string; streamUrl?: string }[]
}
export type AlarmTimelineEvent = { id: string; type: string; message: string; timestamp: string; actorName?: string }
