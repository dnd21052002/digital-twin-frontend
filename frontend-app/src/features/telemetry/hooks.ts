import { useQuery } from '@tanstack/react-query'
import { getLatestMetrics, getTimeseries } from './api'

export function useLatestMetrics(assetId: string | null) {
  return useQuery({
    queryKey: ['assetMetricsLatest', assetId],
    queryFn: () => getLatestMetrics(assetId!),
    enabled: Boolean(assetId),
  })
}

export function useTimeseries(assetId: string | null, metric: string) {
  const to = new Date()
  const from = new Date(to.getTime() - 60 * 60_000)
  return useQuery({
    queryKey: ['assetMetricsTimeseries', assetId, metric, from.toISOString(), to.toISOString(), 1000],
    queryFn: () => getTimeseries(assetId!, metric, from.toISOString(), to.toISOString(), 1000),
    enabled: Boolean(assetId) && Boolean(metric),
  })
}
