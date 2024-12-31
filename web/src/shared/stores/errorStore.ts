import { create } from 'zustand';

interface ErrorState {
    error: string | null;
    setError: (error: string) => void;
    clearError: () => void;
}

const useErrorStore = create<ErrorState>((set) => ({
    error: null,
    setError: (error) => set((state) => ({ error })),
    clearError: () => set((state) => ({ error: null })),
}));