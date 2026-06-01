import type { AlarmDetail, AlarmSummary, AssetDetail, AssetSummary, FacilityTreeResponse, SceneManifest, SceneSummary, TimeseriesPoint } from '../features/core-types'

const now = new Date('2026-06-01T08:00:00Z')

export const facilityTree: FacilityTreeResponse = {
  sites: [
    {
      id: 'site-pcn-01',
      name: 'P.CN Data Center',
      buildings: [
        {
          id: 'bld-a',
          name: 'Building A',
          floors: [
            {
              id: 'fl-1',
              name: 'Floor 1',
              halls: [
                {
                  id: 'hall-a',
                  name: 'Hall A',
                  zones: [
                    {
                      id: 'zone-a1',
                      name: 'Zone A1',
                      rows: [
                        {
                          id: 'row-a',
                          name: 'Row A',
                          rackPositions: [
                            { id: 'rack-a01', code: 'A01', label: 'Rack A01' },
                            { id: 'rack-a02', code: 'A02', label: 'Rack A02' },
                            { id: 'rack-a03', code: 'A03', label: 'Rack A03' },
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

export const scenes: SceneSummary[] = [{ id: 'scene-hall-a', name: 'Hall A Digital Twin', siteId: 'site-pcn-01', status: 'active' }]

export const assets: AssetSummary[] = [
  { id: 'asset-ups-01', assetTag: 'UPS-A01', name: 'UPS Module A01', category: 'power', status: 'active', location: { siteId: 'site-pcn-01', rackPositionId: 'rack-a01', path: 'P.CN / A / Hall A / Row A / A01' } },
  { id: 'asset-rack-02', assetTag: 'RACK-A02', name: 'Compute Rack A02', category: 'rack', status: 'alarm', location: { siteId: 'site-pcn-01', rackPositionId: 'rack-a02', path: 'P.CN / A / Hall A / Row A / A02' } },
  { id: 'asset-crac-01', assetTag: 'CRAC-A01', name: 'Cooling Unit A01', category: 'cooling', status: 'maintenance', location: { siteId: 'site-pcn-01', path: 'P.CN / A / Hall A / North Wall' } },
  { id: 'asset-rack-03', assetTag: 'RACK-A03', name: 'Storage Rack A03', category: 'rack', status: 'active', location: { siteId: 'site-pcn-01', rackPositionId: 'rack-a03', path: 'P.CN / A / Hall A / Row A / A03' } },
]

export const sceneManifest: SceneManifest = {
  id: 'scene-hall-a',
  name: 'Hall A Digital Twin',
  units: 'meters',
  origin: [0, 0, 0],
  bounds: { min: [-8, 0, -6], max: [8, 4, 6] },
  assets: [
    { assetId: 'asset-ups-01', label: 'UPS-A01', position: [-4, 1, -1], scale: [1.2, 2, 1], category: 'power', status: 'active' },
    { assetId: 'asset-rack-02', label: 'RACK-A02', position: [0, 1.4, 0], scale: [1.1, 2.8, 1.1], category: 'rack', status: 'alarm' },
    { assetId: 'asset-crac-01', label: 'CRAC-A01', position: [4, 1, -1.5], scale: [1.6, 2, 1.2], category: 'cooling', status: 'maintenance' },
    { assetId: 'asset-rack-03', label: 'RACK-A03', position: [0, 1.4, 3], scale: [1.1, 2.8, 1.1], category: 'rack', status: 'active' },
  ],
}

export const alarms: AlarmSummary[] = [
  { id: 'alarm-temp-a02', title: 'Rack A02 inlet temperature critical', severity: 'critical', status: 'open', assetId: 'asset-rack-02', assetName: 'Compute Rack A02', locationPath: ['P.CN', 'Building A', 'Hall A', 'Rack A02'], createdAt: '2026-06-01T07:43:00Z' },
  { id: 'alarm-crac-maint', title: 'Cooling unit maintenance window active', severity: 'warning', status: 'acknowledged', assetId: 'asset-crac-01', assetName: 'Cooling Unit A01', locationPath: ['P.CN', 'Building A', 'Hall A'], createdAt: '2026-06-01T06:30:00Z' },
]

function metricSet(assetId: string): AssetDetail['latestMetrics'] {
  const critical = assetId === 'asset-rack-02'
  return [
    { key: 'temperature', label: 'Temperature', value: critical ? 39.7 : 24.2, unit: '°C', status: critical ? 'critical' : 'normal', timestamp: now.toISOString() },
    { key: 'power', label: 'Power', value: critical ? 8.7 : 4.1, unit: 'kW', status: critical ? 'warning' : 'normal', timestamp: now.toISOString() },
    { key: 'humidity', label: 'Humidity', value: 48, unit: '%', status: 'normal', timestamp: now.toISOString() },
  ]
}

export function getAssetDetailFixture(assetId: string): AssetDetail | undefined {
  const asset = assets.find((item) => item.id === assetId)
  if (!asset) return undefined
  return {
    ...asset,
    model: asset.category === 'rack' ? '42U High Density Rack' : 'Industrial Module',
    manufacturer: 'Twin Mock Systems',
    serialNumber: `SN-${asset.assetTag}-2026`,
    locationPath: asset.location.path?.split(' / ') ?? ['P.CN'],
    geometry: { sceneId: 'scene-hall-a', position: sceneManifest.assets.find((node) => node.assetId === assetId)?.position ?? [0, 0, 0] },
    latestMetrics: metricSet(assetId),
    openAlarms: alarms.filter((alarm) => alarm.assetId === assetId && alarm.status === 'open'),
  }
}

export function getTimeseriesFixture(assetId: string, metric: string): TimeseriesPoint[] {
  const baseByMetric = metric === 'power' ? 6 : metric === 'humidity' ? 45 : 23
  const base = assetId === 'asset-rack-02' && metric === 'temperature' ? 35 : baseByMetric
  return Array.from({ length: 12 }, (_, index) => ({
    timestamp: new Date(now.getTime() - (11 - index) * 5 * 60_000).toISOString(),
    value: Number((base + Math.sin(index / 2) * 2 + index * 0.15).toFixed(1)),
  }))
}

export function getAlarmDetailFixture(alarmId: string): AlarmDetail | undefined {
  const alarm = alarms.find((item) => item.id === alarmId)
  if (!alarm) return undefined
  return {
    ...alarm,
    description: 'Mock alarm detail from frontend fixture until alarm backend endpoints land.',
    timeline: [
      { id: `${alarmId}-1`, type: 'created', message: 'Alarm created by telemetry threshold rule', timestamp: alarm.createdAt },
      { id: `${alarmId}-2`, type: 'notified', message: 'Operator notification sent', timestamp: '2026-06-01T07:44:00Z', actorName: 'Twin Monitor' },
    ],
    recommendedSop: { id: 'sop-temp', title: 'Check rack thermal condition', steps: ['Inspect inlet temperature', 'Verify CRAC airflow', 'Reduce workload if critical persists'] },
  }
}
