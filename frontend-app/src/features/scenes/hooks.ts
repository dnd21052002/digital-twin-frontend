import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useViewerStore } from '../../stores/viewer-store'
import { getAssets } from '../assets/api'
import { getSceneManifest, getScenes } from './api'
import type { SceneManifest } from '../core-types'

export function useScenes() {
  const query = useQuery({ queryKey: ['scenes'], queryFn: getScenes, staleTime: 300_000 })
  const selectedSceneId = useViewerStore((state) => state.selectedSceneId)
  const setSelectedSceneId = useViewerStore((state) => state.setSelectedSceneId)

  useEffect(() => {
    if (!selectedSceneId && query.data?.items[0]) setSelectedSceneId(query.data.items[0].id)
    if (!selectedSceneId && query.data?.items.length === 0) setSelectedSceneId('asset-shell')
  }, [query.data, selectedSceneId, setSelectedSceneId])

  return query
}

export function useSceneManifest(sceneId: string | null) {
  return useQuery({
    queryKey: ['sceneManifest', sceneId],
    queryFn: async (): Promise<SceneManifest> => {
      const manifest = sceneId === 'asset-shell' ? null : await getSceneManifest(sceneId!)
      if (manifest?.assets.length) return manifest
      const assets = await getAssets()
      return {
        id: sceneId ?? 'asset-shell',
        name: manifest?.name ?? 'Asset Shell',
        units: 'meters',
        origin: [0, 0, 0],
        bounds: { min: [-8, 0, -8], max: [8, 3, 8] },
        assets: assets.items.slice(0, 50).map((asset, index) => ({
          assetId: asset.id,
          label: asset.assetTag,
          position: [(index % 10) - 4.5, 0, Math.floor(index / 10) * 1.6 - 3],
          scale: [0.8, 1.8, 0.9],
          category: asset.category,
          status: asset.status,
        })),
      }
    },
    enabled: Boolean(sceneId),
    staleTime: 300_000,
  })
}
