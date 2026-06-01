import { Server, Thermometer, Zap } from 'lucide-react'
import type { ReactNode } from 'react'
import { useViewerStore } from '../../../stores/viewer-store'
import { useSceneManifest } from '../hooks'
import { SceneCanvas } from './SceneCanvas'

export function SceneViewer() {
  const selectedSceneId = useViewerStore((state) => state.selectedSceneId)
  const activeLayers = useViewerStore((state) => state.activeLayers)
  const layerOpacity = useViewerStore((state) => state.layerOpacity)
  const { data, isLoading, isError, refetch } = useSceneManifest(selectedSceneId)

  if (!selectedSceneId) return <div className="grid h-full place-items-center text-[#3D5368]">No scene selected</div>
  if (isLoading) return <div className="grid h-full place-items-center text-[#7A90AA]">Loading scene manifest…</div>
  if (isError) return <button className="m-auto text-[#FF3D5A]" onClick={() => void refetch()}>Scene failed. Retry</button>
  if (!data?.assets.length) return <div className="grid h-full place-items-center text-[#3D5368]">Scene empty</div>

  return (
    <div className="relative h-full min-h-0 overflow-hidden bg-[#060B12]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(0,212,255,0.03),transparent_65%),radial-gradient(ellipse_40%_30%_at_20%_80%,rgba(0,229,160,0.02),transparent_50%),linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[length:100%,100%,40px_40px,40px_40px]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 border-t border-[#00D4FF]/5 bg-gradient-to-t from-[#00D4FF]/[0.02] to-transparent" />
      <SceneCanvas manifest={data} />

      <div className="pointer-events-none absolute left-3.5 top-3 flex flex-col gap-1.5">
        <Metric icon={<Server size={16} />} label="Racks Online" value="124 / 128" color="#00E5A0" />
        <Metric icon={<Zap size={16} />} label="Power Draw" value="2.5 MW" color="#FFB020" />
        <Metric icon={<Thermometer size={16} />} label="Avg Temp" value="42°C" color="#00D4FF" />
      </div>

      <div className="pointer-events-none absolute bottom-2.5 left-3.5 flex gap-3.5 font-mono text-[9px] text-[#3D5368]">
        <Status color="#00E5A0" text={`Assets ${data.assets.length}`} />
        <Status color="#FFB020" text="Alerts: 3" />
        <span>{data.name} · Active</span>
        <span>Real R3F viewport</span>
        <span>TRL 2-3 · 2026</span>
      </div>

      {Object.entries(activeLayers).some(([, active]) => active) ? (
        <div className="pointer-events-none absolute bottom-10 left-3.5 flex gap-2">
          {Object.entries(activeLayers).filter(([, active]) => active).map(([layer]) => (
            <span key={layer} className="rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/10 px-3 py-1 font-mono text-[9px] text-[#00D4FF]">
              {layer} {Math.round(layerOpacity[layer] * 100)}%
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function Metric({ icon, label, value, color }: { icon: ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="flex min-w-[140px] items-center gap-2.5 rounded-lg border border-white/10 bg-[#060B12]/90 px-3 py-2 backdrop-blur-xl">
      <div style={{ color }}>{icon}</div>
      <div>
        <div className="text-[9px] uppercase tracking-[0.1em] text-[#3D5368]">{label}</div>
        <div className="font-mono text-[15px] font-bold leading-none" style={{ color }}>{value}</div>
      </div>
    </div>
  )
}

function Status({ color, text }: { color: string; text: string }) {
  return <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />{text}</span>
}
