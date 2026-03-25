import { create } from 'zustand';

// Temporary types until we import from shared types
export type SimulationMode = 'savage' | 'motivational' | 'reality';

export interface Timeline {
  day1: string;
  week1: string;
  month1: string;
  year1: string;
}

interface AppState {
  decision: string;
  mode: SimulationMode;
  simulationResult: any | null;
  setDecision: (text: string) => void;
  setMode: (mode: SimulationMode) => void;
  setSimulationResult: (result: any) => void;
  clearResult: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  decision: '',
  mode: 'savage',
  simulationResult: null,
  setDecision: (text) => set({ decision: text }),
  setMode: (mode) => set({ mode }),
  setSimulationResult: (result) => set({ simulationResult: result }),
  clearResult: () => set({ simulationResult: null, decision: '' }),
}));
