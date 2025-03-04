import { create } from 'zustand';
import { RepairDetails } from '../types';

interface SearchRepair {
    createdAt: string;
    updatedAt: string;
    startedAt: string;
    finishedAt: string;
    plannedStartAt: string;
    plannedFinishAt: string;
    description: string;
    repiarDetails: RepairDetails[]
}


interface RepairsState {
    repairs: SearchRepair[];
    loading: boolean;
    error: boolean;
    setRepairs: (repairs: SearchRepair[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: boolean) => void;
    clearRepairs: () => void;
    getRepairsByDate: () => SearchRepair[];
  }

  export const useRepairsStore = create<RepairsState>((set, get) => ({
    repairs: [],
    loading: false,
    error: false,
    setRepairs: (repairs) => set({ repairs }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    clearRepairs: () => set({ repairs: [] }),
    getRepairsByDate: () => {
      return [...get().repairs].sort(
        (a, b) => new Date(b.plannedStartAt).getTime() - new Date(a.plannedStartAt).getTime()
      );
    },
  }));