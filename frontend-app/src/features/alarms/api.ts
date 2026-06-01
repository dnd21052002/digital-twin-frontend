import { env } from '../../config/env'
import { apiClient } from '../../lib/api-client'
import { mockGetAlarmDetail, mockGetAlarms } from '../../mocks/mock-api'
import type { AlarmDetail, AlarmsResponse } from '../core-types'

export function getAlarms() {
  if (env.useMockCore) return mockGetAlarms()
  return apiClient<AlarmsResponse>('/alarms?status=open')
}

export function getAlarmDetail(alarmId: string) {
  if (env.useMockCore) return mockGetAlarmDetail(alarmId)
  return apiClient<AlarmDetail>(`/alarms/${alarmId}`)
}
