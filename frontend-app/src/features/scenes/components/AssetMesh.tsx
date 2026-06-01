import { Text } from '@react-three/drei'
import type { SceneAssetNode } from '../../core-types'
import { useViewerStore } from '../../../stores/viewer-store'

const statusColor: Record<SceneAssetNode['status'], string> = {
  active: '#22c55e',
  online: '#22c55e',
  inactive: '#64748b',
  maintenance: '#f59e0b',
  warning: '#f59e0b',
  alarm: '#ef4444',
  error: '#ef4444',
}

function shortLabel(label: string) {
  const parts = label.split('-')
  return parts.length > 3 ? parts.slice(-3).join('-') : label
}

function isServer(node: SceneAssetNode) {
  const category = typeof node.category === 'string' ? node.category : node.category.code ?? node.category.name ?? ''
  return /server|srv/i.test(category) || /-SRV-/i.test(node.label)
}

export function AssetMesh({ node }: { node: SceneAssetNode }) {
  const selectedAssetId = useViewerStore((state) => state.selectedAssetId)
  const setSelectedAssetId = useViewerStore((state) => state.setSelectedAssetId)
  const selected = selectedAssetId === node.assetId
  const color = statusColor[node.status]
  const server = isServer(node)

  return (
    <group position={node.position} rotation={node.rotation} onClick={(event) => { event.stopPropagation(); setSelectedAssetId(node.assetId) }}>
      <mesh position={[0, 0.02, 0]} scale={[0.92, 0.06, 0.92]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#050a12" metalness={0.35} roughness={0.55} />
      </mesh>

      <mesh position={[0, 0.98, 0]} scale={node.scale ?? [0.82, 1.86, 0.88]} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="#111827" metalness={0.55} roughness={0.34} emissive={selected ? '#0ea5e9' : '#000000'} emissiveIntensity={selected ? 0.28 : 0} />
      </mesh>

      <mesh position={[0, 0.98, -0.46]} scale={[0.7, 1.62, 0.035]}>
        <boxGeometry />
        <meshStandardMaterial color="#020617" metalness={0.25} roughness={0.4} />
      </mesh>

      {Array.from({ length: server ? 7 : 4 }).map((_, index) => (
        <mesh key={index} position={[0, 0.34 + index * 0.22, -0.505]} scale={[0.62, 0.055, 0.018]}>
          <boxGeometry />
          <meshStandardMaterial color={index % 3 === 0 ? color : '#1f2937'} emissive={index % 3 === 0 ? color : '#000000'} emissiveIntensity={index % 3 === 0 ? 0.45 : 0} />
        </mesh>
      ))}

      <mesh position={[-0.36, 1.92, 0]} scale={[0.05, 0.12, 0.96]}>
        <boxGeometry />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0.36, 1.92, 0]} scale={[0.05, 0.12, 0.96]}>
        <boxGeometry />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
      </mesh>

      {selected ? (
        <mesh position={[0, 0.98, 0]} scale={[1.02, 2.04, 1.04]}>
          <boxGeometry />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.8} />
        </mesh>
      ) : null}

      <Text position={[0, 2.25, 0]} fontSize={0.16} color="#e2e8f0" anchorX="center" anchorY="middle" maxWidth={1.5}>
        {shortLabel(node.label)}
      </Text>
    </group>
  )
}
