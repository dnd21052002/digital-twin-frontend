import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useViewerStore } from '../../stores/viewer-store'
import { getSceneManifest, getScenes } from './api'

export function useScenes() {
  const query = useQuery({ queryKey: ['scenes'], queryFn: getScenes, staleTime: 300_000 })
  const selectedSceneId = useViewerStore((state) => state.selectedSceneId)
  const setSelectedSceneId = useViewerStore((state) => state.setSelectedSceneId)

  useEffect(() => {
    if (!selectedSceneId && query.data?.items[0]) setSelectedSceneId(query.data.items[0].id)
  }, [query.data, selectedSceneId, setSelectedSceneId])

  return query
}

export function useSceneManifest(sceneId: string | null) {
  return useQuery({
    queryKey: ['sceneManifest', sceneId],
    queryFn: () => getSceneManifest(sceneId!),
    enabled: Boolean(sceneId),
    staleTime: 300_000,
  })
}
