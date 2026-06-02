import { env } from '../../config/env'
import { apiClient } from '../../lib/api-client'
import { mockGetSceneManifest, mockGetScenes } from '../../mocks/mock-api'
import type { SceneManifest, ScenesResponse } from '../core-types'

type BackendSceneManifest = SceneManifest | {
  scene?: { id: string; name: string }
  meshes?: unknown[]
  textures?: unknown[]
}

function normalizeManifest(payload: BackendSceneManifest): SceneManifest {
  if ('assets' in payload && Array.isArray(payload.assets)) return payload
  const scene = 'scene' in payload ? payload.scene : undefined
  return {
    id: scene?.id ?? 'scene',
    name: scene?.name ?? 'Scene',
    units: 'meters',
    origin: [0, 0, 0],
    bounds: { min: [-8, 0, -8], max: [8, 3, 8] },
    assets: [],
  }
}

export function getScenes() {
  if (env.useMockCore) return mockGetScenes()
  return apiClient<ScenesResponse>('/scenes')
}

export async function getSceneManifest(sceneId: string) {
  if (env.useMockCore) return mockGetSceneManifest(sceneId)
  const manifest = await apiClient<BackendSceneManifest>(`/scenes/${sceneId}/manifest`)
  return normalizeManifest(manifest)
}
