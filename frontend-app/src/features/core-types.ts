export type AssetStatus = 'active' | 'inactive' | 'maintenance' | 'alarm' | 'online' | 'warning' | 'error'
export type AssetCategory = string | { code?: string; name?: string }

export type FacilityTreeResponse = { sites: FacilitySite[] }
export type FacilitySite = { id: string; name: string; buildings: FacilityBuilding[] }
export type FacilityBuilding = { id: string; name: string; floors: FacilityFloor[] }
export type FacilityFloor = { id: string; name: string; halls: FacilityHall[] }
export type FacilityHall = { id: string; name: string; zones: FacilityZone[] }
export type FacilityZone = { id: string; name: string; rows: FacilityRow[] }
export type FacilityRow = { id: string; name: string; rackPositions: RackPosition[] }
export type RackPosition = { id: string; code: string; label: string }

export type ScenesResponse = { items: SceneSummary[]; nextCursor: string | null }
export type SceneSummary = { id: string; name: string; siteId: string; status?: 'active' | 'draft' | 'archived'; isDefault?: boolean; lodStrategy?: string; createdAt?: string; updatedAt?: string }
export type SceneManifest = { id: string; name: string; units: 'meters'; origin: [number, number, number]; bounds: { min: [number, number, number]; max: [number, number, number] }; assets: SceneAssetNode[] }
export type SceneAssetNode = { assetId: string; meshId?: string; label: string; position: [number, number, number]; rotation?: [number, number, number]; scale?: [number, number, number]; category: AssetCategory; status: AssetStatus }

export type AssetsResponse = { items: AssetSummary[]; nextCursor: string | null }
export type AssetSummary = { id: string; assetTag: string; name: string; category: AssetCategory; status: AssetStatus; location: { siteId?: string | null; rackPositionId?: string | null; path?: string; site?: unknown; building?: unknown; floor?: unknown; hall?: unknown; zone?: unknown; row?: unknown; rackPosition?: unknown } }
export type AssetDetail = AssetSummary & { model?: string; manufacturer?: string; serialNumber?: string; serialNo?: string; locationPath?: string[]; geometry?: { sceneId?: string; meshId?: string; position?: [number, number, number] }; attributes?: Record<string, unknown>; latestMetrics?: LatestMetric[]; openAlarms?: AlarmSummary[] }

export type LatestMetricsResponse = { assetId: string; items: LatestMetric[] }
export type LatestMetric = { metricKey: string; name: string; unit: string; value: number; quality: number; timestamp: string }
export type TimeseriesResponse = { assetId: string; metricKey: string; unit: string; from: string; to: string; interval: string | null; points: TimeseriesPoint[] }
export type TimeseriesPoint = { timestamp: string; value: number; quality: number }

export type AlarmsResponse = { items: AlarmSummary[]; nextCursor: string | null }
export type AlarmSummary = { id: string; raisedAt: string; severity: 'info' | 'warning' | 'critical'; state: 'new' | 'acknowledged' | 'resolved'; title: string; message: string; currentValue: number | null; thresholdValue: number | null; asset?: { id: string; assetTag: string; name: string; category: AssetCategory }; assetId?: string; assetName?: string; locationPath?: string[] }
export type AlarmDetail = AlarmSummary & { rule?: { id: string; code: string; name: string }; forecastValue: number | null; forecastHorizonMin: number | null; ackedBy: string | null; ackedAt: string | null; assignedTo: string | null; assignedAt: string | null; resolvedAt: string | null; resolutionNote: string | null; location: string | null; nearestCamera: null | { id: string; name: string; streamUrl?: string }; sop: null | { id: string; title: string; steps: string[] }; attributes: Record<string, unknown>; timeline: AlarmTimelineEvent[] }
export type AlarmTimelineEvent = { id: string; type: string; message: string; timestamp: string; actorName?: string }

