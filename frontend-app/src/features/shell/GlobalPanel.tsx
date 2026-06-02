import { AlertTriangle, Activity, X } from 'lucide-react'
import { useViewerStore } from '../../stores/viewer-store'
import { AlarmDetail } from '../alarms/components/AlarmDetail'
import { AlarmList } from '../alarms/components/AlarmList'
import { useAlarms } from '../alarms/hooks'
import { useLatestMetrics } from '../telemetry/hooks'
import { MetricCards } from '../telemetry/components/MetricCards'
import { TimeseriesChart } from '../telemetry/components/TimeseriesChart'

export function GlobalPanel() {
  const activePanel = useViewerStore((state) => state.activePanel)
  const setActivePanel = useViewerStore((state) => state.setActivePanel)
  const selectedAssetId = useViewerStore((state) => state.selectedAssetId)
  const alarmsQuery = useAlarms()
  const metricsQuery = useLatestMetrics(selectedAssetId)

  if (activePanel !== 'alarms' && activePanel !== 'monitoring') return null

  return (
    <aside className="absolute bottom-16 right-3 top-3 z-30 flex w-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#060B12]/95 shadow-[0_24px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          {activePanel === 'alarms' ? <AlertTriangle size={16} className="text-[#FF3D5A]" /> : <Activity size={16} className="text-[#00D4FF]" />}
          <div>
            <h2 className="text-sm font-bold text-[#E4EDFB]">{activePanel === 'alarms' ? 'Alarm Center' : 'Telemetry Center'}</h2>
            <p className="text-[10px] text-[#3D5368]">{activePanel === 'alarms' ? 'Global alarm list + detail' : 'Selected asset metrics + trend'}</p>
          </div>
        </div>
        <button className="grid h-7 w-7 place-items-center rounded text-[#7A90AA] hover:bg-[#152338] hover:text-[#E4EDFB]" onClick={() => setActivePanel('engine')} type="button" aria-label="Close panel">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-3.5">
        {activePanel === 'alarms' ? (
          <>
            {alarmsQuery.isLoading ? <div className="text-[11px] text-[#7A90AA]">Loading alarms…</div> : null}
            {alarmsQuery.isError ? <button className="text-left text-[11px] text-[#FF3D5A]" onClick={() => void alarmsQuery.refetch()}>Alarms failed. Retry</button> : null}
            {alarmsQuery.data ? <AlarmList alarms={alarmsQuery.data.items} /> : null}
            <AlarmDetail />
          </>
        ) : null}

        {activePanel === 'monitoring' ? (
          selectedAssetId ? (
            <>
              {metricsQuery.isLoading ? <div className="text-[11px] text-[#7A90AA]">Loading telemetry…</div> : null}
              {metricsQuery.isError ? <button className="text-left text-[11px] text-[#FF3D5A]" onClick={() => void metricsQuery.refetch()}>Telemetry failed. Retry</button> : null}
              <MetricCards metrics={metricsQuery.data?.items ?? []} />
              <TimeseriesChart assetId={selectedAssetId} metrics={metricsQuery.data?.items ?? []} />
            </>
          ) : (
            <div className="rounded-xl border border-white/5 bg-[#0A1220]/70 p-4 text-[11px] leading-6 text-[#7A90AA]">
              Select an asset in the 3D scene to view latest telemetry and trend chart.
            </div>
          )
        ) : null}
      </div>
    </aside>
  )
}
