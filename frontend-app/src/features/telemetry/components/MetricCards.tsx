import type { LatestMetric } from '../../core-types'

function qualityColor(quality: number) {
  if (quality === 0) return '#00E5A0'
  if (quality === 1) return '#FFB020'
  return '#7A90AA'
}

export function MetricCards({ metrics }: { metrics: LatestMetric[] }) {
  if (!metrics.length) return <div className="text-[11px] text-[#3D5368]">No latest metrics</div>

  return (
    <div className="grid grid-cols-3 gap-2">
      {metrics.map((metric) => (
        <div key={metric.metricKey} className="rounded-lg bg-[#152338] p-2.5">
          <p className="text-[9px] uppercase tracking-[0.08em] text-[#3D5368]">{metric.name}</p>
          <p className="mt-1 font-mono text-[15px] font-bold leading-none" style={{ color: qualityColor(metric.quality) }}>{metric.value}{metric.unit}</p>
        </div>
      ))}
    </div>
  )
}
