import { ApiError } from '../lib/api-error'
import { alarms, assets, facilityTree, getAlarmDetailFixture, getAssetDetailFixture, getTimeseriesFixture, sceneManifest, scenes } from './data'

const delay = () => new Promise((resolve) => window.setTimeout(resolve, 120))

export async function mockGetFacilityTree() {
  await delay()
  return facilityTree
}

export async function mockGetScenes() {
  await delay()
  return { items: scenes, nextCursor: null }
}

export async function mockGetSceneManifest(sceneId: string) {
  await delay()
  if (sceneId !== sceneManifest.id) throw new ApiError('Scene not found', 'not_found', 404)
  return sceneManifest
}

export async function mockGetAssets() {
  await delay()
  return { items: assets, nextCursor: null }
}

export async function mockGetAssetDetail(assetId: string) {
  await delay()
  const asset = getAssetDetailFixture(assetId)
  if (!asset) throw new ApiError('Asset not found', 'not_found', 404)
  return asset
}

export async function mockGetLatestMetrics(assetId: string) {
  const asset = await mockGetAssetDetail(assetId)
  return { assetId, metrics: asset.latestMetrics }
}

export async function mockGetTimeseries(assetId: string, metric: string) {
  await delay()
  return { assetId, metric, unit: metric === 'temperature' ? '°C' : metric === 'power' ? 'kW' : '%', points: getTimeseriesFixture(assetId, metric) }
}

export async function mockGetAlarms() {
  await delay()
  return { items: alarms, nextCursor: null }
}

export async function mockGetAlarmDetail(alarmId: string) {
  await delay()
  const alarm = getAlarmDetailFixture(alarmId)
  if (!alarm) throw new ApiError('Alarm not found', 'not_found', 404)
  return alarm
}
