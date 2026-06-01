import { useFacilityTree } from '../hooks'

export function FacilityTree({ compact = false }: { compact?: boolean }) {
  const { data, isLoading, isError, refetch } = useFacilityTree()

  if (isLoading) return <div className="text-[10px] text-[#7A90AA]">Loading facility…</div>
  if (isError) return <button className="text-[10px] text-[#FF3D5A]" onClick={() => void refetch()}>Facility failed. Retry</button>
  if (!data?.sites.length) return <div className="text-[10px] text-[#3D5368]">No facility data</div>

  return (
    <div className={compact ? 'space-y-2 text-[10px]' : 'space-y-3 text-sm'}>
      {data.sites.map((site) => (
        <div key={site.id}>
          <p className="font-semibold text-[#E4EDFB]">{site.name}</p>
          {site.buildings.map((building) =>
            building.floors.map((floor) =>
              floor.halls.map((hall) =>
                hall.zones.map((zone) =>
                  zone.rows.map((row) => (
                    <div key={row.id} className="mt-2 rounded-lg border border-white/5 bg-[#0A1220]/80 p-2">
                      <p className="text-[#7A90AA]">{building.name} / {floor.name} / {hall.name}</p>
                      <p className="text-[9px] text-[#3D5368]">{zone.name} / {row.name}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {row.rackPositions.map((rack) => (
                          <span key={rack.id} className="rounded bg-[#152338] px-2 py-0.5 font-mono text-[9px] text-[#7A90AA]">{rack.code}</span>
                        ))}
                      </div>
                    </div>
                  )),
                ),
              ),
            ),
          )}
        </div>
      ))}
    </div>
  )
}
