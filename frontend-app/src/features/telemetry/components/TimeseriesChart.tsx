import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTimeseries } from '../hooks'

const metrics = ['temperature', 'power', 'humidity']

export function TimeseriesChart({ assetId }: { assetId: string }) {
  const [metric, setMetric] = useState('temperature')
  const { data, isLoading } = useTimeseries(assetId, metric)

  return (
    <div className="rounded-xl border border-white/5 bg-[#0A1220]/70 p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-[#E4EDFB]">Last hour trend</h3>
        <select className="rounded-md border border-white/10 bg-[#152338] px-2 py-1 font-mono text-[9px] text-[#7A90AA]" value={metric} onChange={(event) => setMetric(event.target.value)}>
          {metrics.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      {isLoading ? <div className="h-32 text-[11px] text-[#3D5368]">Loading chart…</div> : null}
      {data ? (
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
