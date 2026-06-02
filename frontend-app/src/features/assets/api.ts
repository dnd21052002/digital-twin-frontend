import { env } from '../../config/env'
import { apiClient } from '../../lib/api-client'
import { mockGetAssetDetail, mockGetAssets } from '../../mocks/mock-api'
import type { AssetDetail, AssetsResponse } from '../core-types'

export function getAssets() {
  if (env.useMockCore) return mockGetAssets()
  return apiClient<AssetsResponse>('/assets?limit=50')
}

export function getAssetDetail(assetId: string) {
  if (env.useMockCore) return mockGetAssetDetail(assetId)
  return apiClient<AssetDetail>(`/assets/${assetId}`)
}
