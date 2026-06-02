import type {
  AlarmDetail,
  AlarmSummary,
  AssetDetail,
  AssetSummary,
  FacilityTreeResponse,
  LatestMetric,
  SceneManifest,
  SceneSummary,
  TimeseriesPoint,
} from '../features/core-types'

const baseTime = '2026-06-01T08:00:00Z'

export const facilityTree: FacilityTreeResponse = {
  sites: [
    {
      id: 'site-1',
      name: 'HCM DC-1',
      buildings: [
        {
          id: 'bld-1',
          name: 'Building A',
          floors: [
            {
              id: 'flr-1',
              name: 'Floor 1',
              halls: [
                {
                  id: 'hall-1',
                  name: 'Hall 1',
                  zones: [
                    {
                      id: 'zone-1',
                      name: 'Zone A',
                      rows: [
                        {
                          id: 'row-1',
                          name: 'Row 01',
                          rackPositions: [
                            { id: 'rack-1', code: 'R01', label: 'Rack 01' },
                            { id: 'rack-2', code: 'R02', label: 'Rack 02' },
                            { id: 'rack-3', code: 'R03', label: 'Rack 03' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const scenes: SceneSummary[] = [{ id: 'scene-1', name: 'Hall 1 Overview', siteId: 'site-1', status: 'active' }]

export const sceneManifest: SceneManifest = {
  id: 'scene-1',
  name: 'Hall 1 Overview',
  units: 'meters',
  origin: [0, 0, 0],
  bounds: { min: [-5, 0, -5], max: [5, 3, 5] },
  assets: [
    { assetId: 'asset-1', label: 'RACK-01', position: [-2, 1, 0], category: 'rack', status: 'active' },
    { assetId: 'asset-2', label: 'RACK-02', position: [0, 1, 0], category: 'rack', status: 'alarm' },
    { assetId: 'asset-3', label: 'RACK-03', position: [2, 1, 0], category: 'rack', status: 'maintenance' },
  ],
}

export const assets: AssetSummary[] = [
  { id: 'asset-1', assetTag: 'RACK-01', name: 'Rack 01', category: 'rack', status: 'active', location: { siteId: 'site-1', rackPositionId: 'rack-1', path: 'HCM DC-1 / Building A / Floor 1 / Hall 1 / Zone A / Row 01' } },
  { id: 'asset-2', assetTag: 'RACK-02', name: 'Rack 02', category: 'rack', status: 'alarm', location: { siteId: 'site-1', rackPositionId: 'rack-2', path: 'HCM DC-1 / Building A / Floor 1 / Hall 1 / Zone A / Row 01' } },
  { id: 'asset-3', assetTag: 'RACK-03', name: 'Rack 03', category: 'rack', status: 'maintenance', location: { siteId: 'site-1', rackPositionId: 'rack-3', path: 'HCM DC-1 / Building A / Floor 1 / Hall 1 / Zone A / Row 01' } },
]

function metricsFor(assetId: string): LatestMetric[] {
  const hot = assetId === 'asset-2'
  return [
    { metricKey: 'temperature', name: 'Temperature', unit: '°C', value: hot ? 38.4 : 24.6, quality: hot ? 2 : 0, timestamp: baseTime },
    { metricKey: 'power', name: 'Power', unit: 'kW', value: hot ? 8.2 : 5.1, quality: hot ? 1 : 0, timestamp: baseTime },
    { metricKey: 'humidity', name: 'Humidity', unit: '%', value: 46, quality: 0, timestamp: baseTime },
  ]
}

const assetDetails: Record<string, AssetDetail> = {
  'asset-1': { ...assets[0], model: 'APC NetShelter', manufacturer: 'APC', serialNumber: 'SN-0001', locationPath: ['HCM DC-1', 'Building A', 'Floor 1', 'Hall 1', 'Zone A', 'Row 01'], geometry: { sceneId: 'scene-1', position: [-2, 1, 0] }, latestMetrics: metricsFor('asset-1'), openAlarms: [] },
  'asset-2': { ...assets[1], model: 'APC NetShelter', manufacturer: 'APC', serialNumber: 'SN-0002', locationPath: ['HCM DC-1', 'Building A', 'Floor 1', 'Hall 1', 'Zone A', 'Row 01'], geometry: { sceneId: 'scene-1', position: [0, 1, 0] }, latestMetrics: metricsFor('asset-2'), openAlarms: [] },
  'asset-3': { ...assets[2], model: 'APC NetShelter', manufacturer: 'APC', serialNumber: 'SN-0003', locationPath: ['HCM DC-1', 'Building A', 'Floor 1', 'Hall 1', 'Zone A', 'Row 01'], geometry: { sceneId: 'scene-1', position: [2, 1, 0] }, latestMetrics: metricsFor('asset-3'), openAlarms: [] },
}

export function getAssetDetailFixture(assetId: string): AssetDetail | undefined {
  return assetDetails[assetId]
}

export function getLatestMetricsFixture(assetId: string): LatestMetric[] {
  return metricsFor(assetId)
}

export function getTimeseriesFixture(assetId: string, metric: string): TimeseriesPoint[] {
  const base = metric === 'temperature' ? 24 : metric === 'power' ? 5 : 45
  const points: TimeseriesPoint[] = []
  const start = new Date(baseTime).getTime()
  for (let i = 0; i < 12; i += 1) {
    const ts = new Date(start + i * 5 * 60_000).toISOString()
    const wave = Math.sin(i / 2) * (metric === 'temperature' ? 1.5 : 0.6)
    points.push({ timestamp: ts, value: Number((base + wave + (assetId === 'asset-2' ? 6 : 0)).toFixed(2)), quality: 0 })
  }
  return points
}

export const alarms: AlarmSummary[] = [
  { id: 'alarm-1', raisedAt: baseTime, severity: 'critical', state: 'new', title: 'High temperature', message: 'Rack 02 inlet temperature above threshold', currentValue: 38.4, thresholdValue: 32, asset: { id: 'asset-2', assetTag: 'RACK-02', name: 'Rack 02', category: 'rack' } },
  { id: 'alarm-2', raisedAt: baseTime, severity: 'warning', state: 'acknowledged', title: 'Power draw elevated', message: 'Rack 02 power above warning level', currentValue: 8.2, thresholdValue: 7.5, asset: { id: 'asset-2', assetTag: 'RACK-02', name: 'Rack 02', category: 'rack' } },
]

const alarmDetails: Record<string, AlarmDetail> = {
  'alarm-1': { ...alarms[0], rule: { id: 'rule-1', code: 'TEMP_HIGH', name: 'Inlet temperature high' }, forecastValue: null, forecastHorizonMin: null, ackedBy: null, ackedAt: null, assignedTo: null, assignedAt: null, resolvedAt: null, resolutionNote: null, location: 'Hall 1 / Row 01 / Rack 02', nearestCamera: null, sop: null, attributes: {}, timeline: [{ id: 'tl-1', type: 'raised', message: 'Alarm raised', timestamp: baseTime }] },
  'alarm-2': { ...alarms[1], rule: { id: 'rule-2', code: 'POWER_WARN', name: 'Power draw warning' }, forecastValue: null, forecastHorizonMin: null, ackedBy: 'admin', ackedAt: baseTime, assignedTo: null, assignedAt: null, resolvedAt: null, resolutionNote: null, location: 'Hall 1 / Row 01 / Rack 02', nearestCamera: null, sop: null, attributes: {}, timeline: [{ id: 'tl-2', type: 'raised', message: 'Alarm raised', timestamp: baseTime }, { id: 'tl-3', type: 'acknowledged', message: 'Acknowledged by admin', timestamp: baseTime, actorName: 'admin' }] },
}

export function getAlarmDetailFixture(alarmId: string): AlarmDetail | undefined {
  return alarmDetails[alarmId]
}
