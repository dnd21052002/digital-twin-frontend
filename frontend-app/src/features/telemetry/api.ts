import { env } from '../../config/env'
import { apiClient } from '../../lib/api-client'
import { mockGetLatestMetrics, mockGetTimeseries } from '../../mocks/mock-api'
import type { LatestMetricsResponse, TimeseriesResponse } from '../core-types'

export function getLatestMetrics(assetId: string) {
  if (env.useMockCore) return mockGetLatestMetrics(assetId)
  return apiClient<LatestMetricsResponse>(`/assets/${assetId}/metrics/latest`)
}

export function getTimeseries(assetId: string, metric: string, from: string, to: string, interval = '5m') {
  if (env.useMockCore) return mockGetTimeseries(assetId, metric)
  const params = new URLSearchParams({ metric, from, to, interval })
  return apiClient<TimeseriesResponse>(`/assets/${assetId}/metrics/timeseries?${params}`)
}
