import { useQuery } from '@tanstack/react-query'
import { getAlarmDetail, getAlarms } from './api'

export function useAlarms() {
  return useQuery({ queryKey: ['alarms', { status: 'open' }], queryFn: getAlarms })
}

export function useAlarmDetail(alarmId: string | null) {
  return useQuery({
    queryKey: ['alarm', alarmId],
    queryFn: () => getAlarmDetail(alarmId!),
    enabled: Boolean(alarmId),
  })
}
