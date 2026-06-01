import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { LatestMetric } from '../../core-types'
import { useTimeseries } from '../hooks'

export function TimeseriesChart({ assetId, metrics }: { assetId: string; metrics: LatestMetric[] }) {
  const keys = metrics.map((item) => item.metricKey)
  const [metric, setMetric] = useState('')
  const active = metric || keys[0] || ''
  const { data, isLoading, isError, refetch } = useTimeseries(assetId, active)

  if (!keys.length) return <div className="rounded-xl border border-white/5 bg-[#0A1220]/70 p-3 text-[11px] text-[#3D5368]">No metric to chart</div>

  return (
    <div className="rounded-xl border border-white/5 bg-[#0A1220]/70 p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-[#E4EDFB]">Last hour trend</h3>
        <select className="rounded-md border border-white/10 bg-[#152338] px-2 py-1 font-mono text-[9px] text-[#7A90AA]" value={active} onChange={(event) => setMetric(event.target.value)}>
          {metrics.map((item) => <option key={item.metricKey} value={item.metricKey}>{item.name}</option>)}
        </select>
      </div>
      {isLoading ? <div className="h-32 text-[11px] text-[#3D5368]">Loading chart…</div> : null}
      {isError ? <button className="h-32 text-left text-[11px] text-[#FF3D5A]" onClick={() => void refetch()}>Chart failed. Retry</button> : null}
      {data && !data.points.length ? <div className="h-32 text-[11px] text-[#3D5368]">No points in range</div> : null}
      {data && data.points.length ? (
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.points} margin={{ left: -24, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} stroke="#3D5368" fontSize={9} />
              <YAxis stroke="#3D5368" fontSize={9} />
              <Tooltip contentStyle={{ background: '#060B12', border: '1px solid rgba(255,255,255,0.1)', color: '#E4EDFB', borderRadius: 8 }} />
              <Line type="monotone" dataKey="value" stroke="#00D4FF" strokeWidth={1.8} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </div>
  )
}
