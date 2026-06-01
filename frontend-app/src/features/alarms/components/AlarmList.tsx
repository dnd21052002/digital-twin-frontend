import { useViewerStore } from '../../../stores/viewer-store'
import type { AlarmSummary } from '../../core-types'
import { SeverityBadge } from './SeverityBadge'

export function AlarmList({ alarms }: { alarms: AlarmSummary[] }) {
  const setSelectedAlarmId = useViewerStore((state) => state.setSelectedAlarmId)
  const setSelectedAssetId = useViewerStore((state) => state.setSelectedAssetId)

  if (!alarms.length) return <div className="text-[11px] text-[#3D5368]">No related alarms</div>

  return (
    <div className="space-y-2">
      {alarms.map((alarm) => (
        <button
          key={alarm.id}
          className="w-full rounded-xl border border-white/5 bg-[#0F1B2E] p-2.5 text-left transition hover:border-white/10"
          onClick={() => { setSelectedAlarmId(alarm.id); if (alarm.assetId) setSelectedAssetId(alarm.assetId) }}
          type="button"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-semibold text-[#E4EDFB]">{alarm.title}</p>
            <SeverityBadge severity={alarm.severity} />
          </div>
          <p className="mt-1 font-mono text-[9px] text-[#3D5368]">{alarm.status} · {new Date(alarm.createdAt).toLocaleString()}</p>
        </button>
      ))}
    </div>
  )
}
