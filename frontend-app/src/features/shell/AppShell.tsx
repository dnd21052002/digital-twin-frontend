import { Activity, BellRing, Clock3, Cuboid, Layers3, Shield } from 'lucide-react'
import { AssetDetailPanel } from '../assets/components/AssetDetailPanel'
import { FacilityTree } from '../facility/components/FacilityTree'
import { LayerControls } from '../layers/components/LayerControls'
import { SceneSelector } from '../scenes/components/SceneSelector'
import { SceneViewer } from '../scenes/components/SceneViewer'
import { TopBar } from './TopBar'

const dock = [
  { label: '3D Engine', icon: Cuboid, active: true },
  { label: 'X-Ray Layers', icon: Layers3 },
  { label: 'Monitoring', icon: Activity },
  { label: 'Alarms', icon: BellRing, alert: '3', tone: 'alarm' },
  { label: 'Time Machine', icon: Clock3, tone: 'sim' },
  { label: 'Integration', icon: Shield },
]

export function AppShell() {
  return (
    <div className="min-h-screen bg-[#060B12] text-[#E4EDFB]">
      <TopBar />
      <main className="fixed bottom-14 left-0 right-0 top-12 overflow-hidden bg-[#060B12]">
        <SceneViewer />
        <AssetDetailPanel />
        <div className="pointer-events-auto absolute right-3.5 top-3 flex w-[210px] flex-col gap-2">
          <div className="rounded-lg border border-white/10 bg-[#060B12]/90 p-1 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-1">
              <button className="rounded-md bg-[#00D4FF]/10 px-3 py-1.5 text-[10px] font-semibold text-[#00D4FF]">Fly</button>
              <button className="rounded-md px-3 py-1.5 text-[10px] font-semibold text-[#3D5368] hover:bg-[#152338]">Walk</button>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#060B12]/90 backdrop-blur-xl">
            <div className="border-b border-white/5 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[#3D5368]">Scene</div>
            <div className="p-2"><SceneSelector /></div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#060B12]/90 backdrop-blur-xl">
            <div className="border-b border-white/5 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[#3D5368]">Layers</div>
            <div className="p-2"><LayerControls compact /></div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#060B12]/90 backdrop-blur-xl">
            <div className="border-b border-white/5 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[#3D5368]">Facility</div>
            <div className="max-h-52 overflow-y-auto p-2"><FacilityTree compact /></div>
          </div>
        </div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-center gap-1 border-t border-white/5 bg-[#060B12]/95 backdrop-blur-xl">
        {dock.map((item, index) => {
          const Icon = item.icon
          const activeClass = item.active ? 'border-[#00D4FF]/20 bg-[#00D4FF]/10 text-[#00D4FF]' : item.tone === 'alarm' ? 'text-[#FF3D5A]' : item.tone === 'sim' ? 'text-[#A855F7]' : 'text-[#3D5368] hover:border-white/5 hover:bg-[#152338] hover:text-[#7A90AA]'
          return (
            <div className="contents" key={item.label}>
              {index === 1 ? <div className="mx-1 h-8 w-px bg-white/5" /> : null}
              <button className={`relative flex min-w-[72px] flex-col items-center gap-0.5 rounded-lg border border-transparent px-4 py-1.5 transition ${activeClass}`} type="button">
                <Icon size={18} />
                <span className="text-[9px] font-semibold uppercase tracking-[0.04em]">{item.label}</span>
                {item.alert ? <span className="absolute right-2 top-0.5 rounded-full bg-[#FF3D5A] px-1.5 text-[7px] font-bold text-white">{item.alert}</span> : null}
              </button>
            </div>
          )
        })}
      </nav>
    </div>
  )
}
