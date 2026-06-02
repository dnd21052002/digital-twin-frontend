import { useQuery } from '@tanstack/react-query'
import { getAlarmDetail, getAlarms } from './api'

export function useAlarms(assetId?: string | null) {
  return useQuery({ queryKey: ['alarms', { assetId: assetId ?? null, limit: 50 }], queryFn: () => getAlarms({ assetId: assetId ?? undefined, limit: 50 }) })
}

export function useAlarmDetail(alarmId: string | null) {
  return useQuery({
    queryKey: ['alarm', alarmId],
    queryFn: () => getAlarmDetail(alarmId!),
    enabled: Boolean(alarmId),
  })
}
