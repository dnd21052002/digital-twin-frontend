import { FacilityTree } from '../facility/components/FacilityTree'
import { LayerControls } from '../layers/components/LayerControls'
import { SceneSelector } from '../scenes/components/SceneSelector'

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col gap-5 overflow-y-auto border-r border-slate-800 bg-slate-900/70 p-4">
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Scene</h2>
        <SceneSelector />
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Facility</h2>
        <FacilityTree />
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Layers</h2>
        <LayerControls />
      </section>
    </aside>
  )
}
