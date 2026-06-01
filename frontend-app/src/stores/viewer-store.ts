import { create } from 'zustand'

type ViewerState = {
  selectedSceneId: string | null
  selectedAssetId: string | null
  selectedAlarmId: string | null
  activeLayers: Record<string, boolean>
  layerOpacity: Record<string, number>
  setSelectedSceneId: (sceneId: string | null) => void
  setSelectedAssetId: (assetId: string | null) => void
  setSelectedAlarmId: (alarmId: string | null) => void
  setLayerVisible: (layerType: string, visible: boolean) => void
  setLayerOpacity: (layerType: string, opacity: number) => void
}

export const useViewerStore = create<ViewerState>((set) => ({
  selectedSceneId: null,
  selectedAssetId: null,
  selectedAlarmId: null,
  activeLayers: { xray: false, thermal: false, airflow: false, power: false },
  layerOpacity: { xray: 0.4, thermal: 0.5, airflow: 0.35, power: 0.5 },
  setSelectedSceneId: (selectedSceneId) => set({ selectedSceneId }),
  setSelectedAssetId: (selectedAssetId) => set({ selectedAssetId }),
  setSelectedAlarmId: (selectedAlarmId) => set({ selectedAlarmId }),
  setLayerVisible: (layerType, visible) =>
    set((state) => ({ activeLayers: { ...state.activeLayers, [layerType]: visible } })),
  setLayerOpacity: (layerType, opacity) =>
    set((state) => ({ layerOpacity: { ...state.layerOpacity, [layerType]: opacity } })),
}))
