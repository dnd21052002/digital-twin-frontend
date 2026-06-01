import { beforeEach, describe, expect, it } from 'vitest'
import { useViewerStore } from './viewer-store'

describe('viewer store', () => {
  beforeEach(() => {
    useViewerStore.setState({ selectedSceneId: null, selectedAssetId: null, selectedAlarmId: null })
  })

  it('stores selected asset id', () => {
    useViewerStore.getState().setSelectedAssetId('asset-rack-02')
    expect(useViewerStore.getState().selectedAssetId).toBe('asset-rack-02')
  })
})
