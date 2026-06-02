import { useViewerStore } from '../../../stores/viewer-store'
import { useScenes } from '../hooks'

export function SceneSelector() {
  const { data, isLoading } = useScenes()
  const selectedSceneId = useViewerStore((state) => state.selectedSceneId)
  const setSelectedSceneId = useViewerStore((state) => state.setSelectedSceneId)

  if (isLoading) return <div className="text-sm text-slate-400">Loading scenes…</div>

  return (
    <select
      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
      value={selectedSceneId ?? ''}
      onChange={(event) => setSelectedSceneId(event.target.value)}
    >
      {data?.items.length ? data.items.map((scene) => <option key={scene.id} value={scene.id}>{scene.name}</option>) : <option value="asset-shell">Asset Shell</option>}
    </select>
  )
}
