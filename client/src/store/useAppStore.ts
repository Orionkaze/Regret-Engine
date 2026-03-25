import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';

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
  user: User | null;
  session: Session | null;
  setDecision: (text: string) => void;
  setMode: (mode: SimulationMode) => void;
  setSimulationResult: (result: any) => void;
  clearResult: () => void;
  setAuth: (user: User | null, session: Session | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  decision: '',
  mode: 'savage',
  simulationResult: null,
  user: null,
  session: null,
  setDecision: (text) => set({ decision: text }),
  setMode: (mode) => set({ mode }),
  setSimulationResult: (result) => set({ simulationResult: result }),
  clearResult: () => set({ simulationResult: null, decision: '' }),
  setAuth: (user, session) => set({ user, session }),
}));
