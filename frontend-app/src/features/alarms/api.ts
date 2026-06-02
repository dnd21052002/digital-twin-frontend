import { env } from '../../config/env'
import { apiClient } from '../../lib/api-client'
import { mockGetAlarmDetail, mockGetAlarms } from '../../mocks/mock-api'
import type { AlarmDetail, AlarmsResponse } from '../core-types'

type AlarmFilters = {
  assetId?: string
  limit?: number
}

export function getAlarms(filters: AlarmFilters = {}) {
  if (env.useMockCore) return mockGetAlarms(filters.assetId)
  const params = new URLSearchParams()
  params.set('limit', String(filters.limit ?? 50))
  if (filters.assetId) params.set('assetId', filters.assetId)
  return apiClient<AlarmsResponse>(`/alarms?${params}`)
}

export function getAlarmDetail(alarmId: string) {
  if (env.useMockCore) return mockGetAlarmDetail(alarmId)
  return apiClient<AlarmDetail>(`/alarms/${alarmId}`)
}
