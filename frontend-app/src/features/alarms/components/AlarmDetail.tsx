import { useViewerStore } from '../../../stores/viewer-store'
import { useAlarmDetail } from '../hooks'
import { SeverityBadge } from './SeverityBadge'

export function AlarmDetail() {
  const selectedAlarmId = useViewerStore((state) => state.selectedAlarmId)
  const { data } = useAlarmDetail(selectedAlarmId)

  if (!selectedAlarmId || !data) return null

  return (
    <section className="rounded-xl border border-white/5 bg-[#0A1220]/70 p-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[11px] font-bold text-[#E4EDFB]">Alarm detail</h3>
        <SeverityBadge severity={data.severity} />
      </div>
      <p className="mt-2 text-[11px] text-[#E4EDFB]">{data.title}</p>
      <p className="mt-1 text-[10px] text-[#3D5368]">{data.message}</p>
      <div className="mt-2 flex flex-wrap gap-2 font-mono text-[9px] text-[#7A90AA]">
        <span>state: {data.state}</span>
        {data.currentValue != null ? <span>current: {data.currentValue}</span> : null}
        {data.thresholdValue != null ? <span>threshold: {data.thresholdValue}</span> : null}
        {data.rule ? <span>rule: {data.rule.code}</span> : null}
      </div>
      <ol className="mt-3 space-y-2 border-l border-white/5 pl-3">
        {data.timeline.map((event) => (
          <li key={event.id} className="text-[10px] text-[#7A90AA]">
            <span className="font-semibold text-[#E4EDFB]">{event.type}</span> — {event.message}
          </li>
        ))}
      </ol>
    </section>
  )
}
