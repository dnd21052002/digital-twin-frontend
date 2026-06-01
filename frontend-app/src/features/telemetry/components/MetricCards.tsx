import type { LatestMetric } from '../../core-types'

const metricColor: Record<LatestMetric['status'], string> = {
  normal: '#00E5A0',
  warning: '#FFB020',
  critical: '#FF3D5A',
  unknown: '#7A90AA',
}

export function MetricCards({ metrics }: { metrics: LatestMetric[] }) {
  if (!metrics.length) return <div className="text-[11px] text-[#3D5368]">No latest metrics</div>

  return (
    <div className="grid grid-cols-3 gap-2">
      {metrics.map((metric) => (
        <div key={metric.key} className="rounded-lg bg-[#152338] p-2.5">
          <p className="text-[9px] uppercase tracking-[0.08em] text-[#3D5368]">{metric.label}</p>
          <p className="mt-1 font-mono text-[15px] font-bold leading-none" style={{ color: metricColor[metric.status] }}>{metric.value}{metric.unit}</p>
        </div>
      ))}
    </div>
  )
}
