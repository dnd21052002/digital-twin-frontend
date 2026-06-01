import { env } from '../../config/env'
import { apiClient } from '../../lib/api-client'
import { mockGetSceneManifest, mockGetScenes } from '../../mocks/mock-api'
import type { SceneManifest, ScenesResponse } from '../core-types'

export function getScenes() {
  if (env.useMockCore) return mockGetScenes()
  return apiClient<ScenesResponse>('/scenes')
}

export function getSceneManifest(sceneId: string) {
  if (env.useMockCore) return mockGetSceneManifest(sceneId)
  return apiClient<SceneManifest>(`/scenes/${sceneId}/manifest`)
}
