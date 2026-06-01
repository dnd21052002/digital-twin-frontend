import { apiClient } from '../../lib/api-client'
import { env } from '../../config/env'
import { mockGetFacilityTree } from '../../mocks/mock-api'
import type { FacilityTreeResponse } from '../core-types'

export function getFacilityTree() {
  if (env.useMockCore) return mockGetFacilityTree()
  return apiClient<FacilityTreeResponse>('/facility/tree')
}
