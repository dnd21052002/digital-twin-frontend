import { useViewerStore } from '../../../stores/viewer-store'

const layers = [
  { id: 'thermal', label: 'Thermal', color: '#FF6B6B' },
  { id: 'airflow', label: 'Airflow', color: '#00D4FF' },
  { id: 'power', label: 'Power', color: '#FFB020' },
  { id: 'xray', label: 'X-Ray', color: '#CCCCCC' },
]

export function LayerControls({ compact = false }: { compact?: boolean }) {
  const activeLayers = useViewerStore((state) => state.activeLayers)
  const layerOpacity = useViewerStore((state) => state.layerOpacity)
  const setLayerVisible = useViewerStore((state) => state.setLayerVisible)
  const setLayerOpacity = useViewerStore((state) => state.setLayerOpacity)

  return (
    <div className={compact ? 'space-y-2' : 'space-y-3'}>
      {layers.map((layer) => {
        const active = activeLayers[layer.id]
        return (
          <div key={layer.id} className={compact ? 'space-y-1.5' : 'rounded-xl border border-white/5 bg-[#0F1B2E] p-3'}>
            <label className="flex items-center gap-2 text-[10px] text-[#7A90AA]">
              <span className="h-2 w-2 rounded-full" style={{ background: layer.color }} />
              <span className="flex-1">{layer.label}</span>
              <button
                aria-pressed={active}
                aria-label={`Toggle ${layer.label}`}
                className={`relative h-[15px] w-[26px] flex-shrink-0 rounded-full transition-colors duration-200 ${active ? 'bg-[#00E5A0]' : 'bg-white/10'}`}
                onClick={() => setLayerVisible(layer.id, !active)}
                type="button"
              >
                <span className={`absolute left-0.5 top-0.5 h-[11px] w-[11px] rounded-full bg-white shadow-sm transition-transform duration-200 ${active ? 'translate-x-[11px]' : 'translate-x-0'}`} />
              </button>
            </label>
            {!compact ? (
              <input
                className="w-full accent-[#00E5A0]"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={layerOpacity[layer.id]}
                onChange={(event) => setLayerOpacity(layer.id, Number(event.target.value))}
              />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
