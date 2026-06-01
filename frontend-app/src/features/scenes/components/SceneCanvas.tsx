import { Grid, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { PCFShadowMap } from 'three'
import type { SceneManifest } from '../../core-types'
import { AssetMesh } from './AssetMesh'

export function SceneCanvas({ manifest }: { manifest: SceneManifest }) {
  return (
    <Canvas camera={{ position: [7, 6, 8], fov: 45 }} shadows={{ type: PCFShadowMap }}>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <Grid args={[20, 20]} cellColor="#1e293b" sectionColor="#334155" position={[0, 0, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[18, 14]} />
        <meshStandardMaterial color="#0f172a" transparent opacity={0.65} />
      </mesh>
      {manifest.assets.map((node) => <AssetMesh key={node.assetId} node={node} />)}
      <OrbitControls makeDefault enablePan enableZoom enableRotate />
    </Canvas>
  )
}
