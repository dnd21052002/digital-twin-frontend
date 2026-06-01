import { useQuery } from '@tanstack/react-query'
import { getAssetDetail, getAssets } from './api'

export function useAssets() {
  return useQuery({ queryKey: ['assets', {}], queryFn: getAssets, staleTime: 60_000 })
}

export function useAssetDetail(assetId: string | null) {
  return useQuery({
    queryKey: ['asset', assetId],
    queryFn: () => getAssetDetail(assetId!),
    enabled: Boolean(assetId),
  })
}
