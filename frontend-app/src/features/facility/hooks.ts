import { useQuery } from '@tanstack/react-query'
import { getFacilityTree } from './api'

export function useFacilityTree() {
  return useQuery({ queryKey: ['facilityTree'], queryFn: getFacilityTree, staleTime: 300_000 })
}
