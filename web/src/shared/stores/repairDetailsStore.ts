import { create } from 'zustand';
import { RepairDetails } from '../types';

interface RepairDetailsState {
    repairDetails: RepairDetails[];
    singleRepairDetail: RepairDetails | null;
    setRepairDetails: (repairDetails: RepairDetails[]) => void;
    addRepairDetail: (repairDetail: RepairDetails) => void;
    removeRepairDetail: (id: string) => void;
    setSingleRepairDetail: (repairDetail: RepairDetails | null) => void;
}

export const useRepairDetailsStore = create<RepairDetailsState>((set) => ({
    repairDetails: [],
    singleRepairDetail: null,
    setRepairDetails: (repairDetails) => set({ repairDetails }),
    addRepairDetail: (repairDetail) => set((state) => ({
        repairDetails: [...state.repairDetails, repairDetail]
    })),
    removeRepairDetail: (id) => set((state) => ({
        repairDetails: state.repairDetails.filter((r) => r.id !== id)
    })),
    setSingleRepairDetail: (repairDetail) => set({ singleRepairDetail: repairDetail })
}));