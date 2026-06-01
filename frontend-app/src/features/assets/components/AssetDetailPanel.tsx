import { X } from 'lucide-react'
import { useViewerStore } from '../../../stores/viewer-store'
import { AlarmDetail } from '../../alarms/components/AlarmDetail'
import { AlarmList } from '../../alarms/components/AlarmList'
import { MetricCards } from '../../telemetry/components/MetricCards'
import { TimeseriesChart } from '../../telemetry/components/TimeseriesChart'
import { useAssetDetail } from '../hooks'

export function AssetDetailPanel() {
  const selectedAssetId = useViewerStore((state) => state.selectedAssetId)
  const setSelectedAssetId = useViewerStore((state) => state.setSelectedAssetId)
  const { data, isLoading, isError, refetch } = useAssetDetail(selectedAssetId)
  const open = Boolean(selectedAssetId)

  return (
    <aside className={`absolute bottom-2.5 left-3.5 top-2.5 z-20 flex w-[300px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#060B12]/95 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-[120%]'}`}>
      <button className="absolute right-2.5 top-2.5 grid h-6 w-6 place-items-center rounded text-[#7A90AA] hover:bg-[#152338] hover:text-[#E4EDFB]" onClick={() => setSelectedAssetId(null)} type="button" aria-label="Close asset inspector">
        <X size={13} />
      </button>

      {!selectedAssetId ? <Empty /> : null}
      {selectedAssetId && isLoading ? <div className="p-4 text-[11px] text-[#7A90AA]">Loading asset…</div> : null}
      {selectedAssetId && isError ? <button className="m-4 text-left text-[11px] text-[#FF3D5A]" onClick={() => void refetch()}>Asset failed. Retry</button> : null}
      {data ? (
        <>
          <div className="border-b border-white/5 p-3.5">
            <div className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#3D5368]">Asset Inspector</div>
            <div className="flex items-center gap-2 pr-8 text-sm font-bold text-[#E4EDFB]">
              <span>{data.name}</span>
              <span className={`rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase ${data.status === 'alarm' ? 'border-[#FF3D5A]/20 bg-[#FF3D5A]/10 text-[#FF3D5A]' : data.status === 'maintenance' ? 'border-[#FFB020]/20 bg-[#FFB020]/10 text-[#FFB020]' : 'border-[#00E5A0]/20 bg-[#00E5A0]/10 text-[#00E5A0]'}`}>{data.status}</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-[#3D5368]">{data.locationPath.join(' › ')}</div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-3.5">
            <div className="grid grid-cols-2 gap-2">
              <Stat label="Tag" value={data.assetTag} color="#00D4FF" />
              <Stat label="Category" value={data.category} color="#00E5A0" />
              <Stat label="Model" value={data.model ?? '—'} color="#A855F7" />
              <Stat label="Serial" value={data.serialNumber ?? '—'} color="#FFB020" />
            </div>
            <MetricCards metrics={data.latestMetrics} />
            <TimeseriesChart assetId={data.id} />
            <section className="rounded-xl border border-white/5 bg-[#0A1220]/70 p-3">
              <h3 className="mb-2 text-[11px] font-bold text-[#E4EDFB]">Related alarms</h3>
              <AlarmList alarms={data.openAlarms} />
            </section>
            <AlarmDetail />
          </div>
        </>
      ) : null}
    </aside>
  )
}

function Empty() {
  return (
    <div className="grid flex-1 place-items-center p-5 text-center text-[#3D5368]">
      <div>
        <div className="mx-auto mb-3 h-10 w-10 rounded-full border border-white/5 bg-[#0F1B2E]" />
        <p className="text-[11px] leading-6">Click vào asset trong 3D viewport để xem metrics, alarms và lịch sử.</p>
      </div>
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-[#152338] p-2.5 before:absolute before:left-0 before:right-0 before:top-0 before:h-0.5" style={{ '--tw-gradient-from': color } as React.CSSProperties}>
      <div className="absolute left-0 right-0 top-0 h-0.5" style={{ background: color }} />
      <div className="text-[9px] uppercase tracking-[0.08em] text-[#3D5368]">{label}</div>
      <div className="truncate font-mono text-[13px] font-bold" style={{ color }}>{value}</div>
    </div>
  )
}
