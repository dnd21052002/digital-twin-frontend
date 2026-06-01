import { Text } from '@react-three/drei'
import type { SceneAssetNode } from '../../core-types'
import { useViewerStore } from '../../../stores/viewer-store'

const statusColor: Record<SceneAssetNode['status'], string> = {
  active: '#22c55e',
  inactive: '#64748b',
  maintenance: '#f59e0b',
  alarm: '#ef4444',
}

export function AssetMesh({ node }: { node: SceneAssetNode }) {
  const selectedAssetId = useViewerStore((state) => state.selectedAssetId)
  const setSelectedAssetId = useViewerStore((state) => state.setSelectedAssetId)
  const selected = selectedAssetId === node.assetId

  return (
    <group position={node.position} rotation={node.rotation}>
      <mesh scale={node.scale ?? [1, 1, 1]} onClick={(event) => { event.stopPropagation(); setSelectedAssetId(node.assetId) }}>
        <boxGeometry />
        <meshStandardMaterial color={statusColor[node.status]} emissive={selected ? '#38bdf8' : '#000000'} emissiveIntensity={selected ? 0.55 : 0} roughness={0.45} />
      </mesh>
      {selected ? (
        <mesh scale={(node.scale ?? [1, 1, 1]).map((value) => value + 0.08) as [number, number, number]}>
          <boxGeometry />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.8} />
        </mesh>
      ) : null}
      <Text position={[0, ((node.scale?.[1] ?? 1) / 2) + 0.35, 0]} fontSize={0.25} color="#e2e8f0" anchorX="center" anchorY="middle">
        {node.label}
      </Text>
    </group>
  )
}
