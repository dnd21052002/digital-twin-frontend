import { create } from 'zustand'

type ViewerPanel = 'engine' | 'layers' | 'monitoring' | 'alarms' | 'time' | 'integration'

type ViewerState = {
  selectedSceneId: string | null
  selectedAssetId: string | null
  selectedAlarmId: string | null
  activePanel: ViewerPanel
  activeLayers: Record<string, boolean>
  layerOpacity: Record<string, number>
  setSelectedSceneId: (sceneId: string | null) => void
  setSelectedAssetId: (assetId: string | null) => void
  setSelectedAlarmId: (alarmId: string | null) => void
  setActivePanel: (panel: ViewerPanel) => void
  setLayerVisible: (layerType: string, visible: boolean) => void
  setLayerOpacity: (layerType: string, opacity: number) => void
}

export const useViewerStore = create<ViewerState>((set) => ({
  selectedSceneId: null,
  selectedAssetId: null,
  selectedAlarmId: null,
  activePanel: 'engine',
  activeLayers: { xray: false, thermal: false, airflow: false, power: false },
  layerOpacity: { xray: 0.4, thermal: 0.5, airflow: 0.35, power: 0.5 },
  setSelectedSceneId: (selectedSceneId) => set({ selectedSceneId }),
  setSelectedAssetId: (selectedAssetId) => set({ selectedAssetId }),
  setSelectedAlarmId: (selectedAlarmId) => set({ selectedAlarmId }),
  setActivePanel: (activePanel) => set({ activePanel }),
  setLayerVisible: (layerType, visible) =>
    set((state) => ({ activeLayers: { ...state.activeLayers, [layerType]: visible } })),
  setLayerOpacity: (layerType, opacity) =>
    set((state) => ({ layerOpacity: { ...state.layerOpacity, [layerType]: opacity } })),
}))
