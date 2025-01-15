import { create } from 'zustand';
import { Model } from '../types';


interface ModelState {
  models: Model[];
  editedItem: Model | null;
  pagesCount: number;
  itemsCount: number;
  setEditedItem: (item: Model | null) => void;
  setModels: (models: Model[]) => void;
  addModel: (model: Model) => void;
  removeModel: (modelId: string) => void;
}

const useModelStore = create<ModelState>((set) => {
  return {
    models: [],
    editedItem: null,
    pagesCount: 0,
    itemsCount: 0,
    setEditedItem: (item) => set({ editedItem: item }),
    setModels: (models) => set({ models }),
    addModel: (model) => set((state) => ({ models: [...state.models, model] })),
    removeModel: (modelId) =>
      set((state) => ({
        models: state.models.filter((model) => model.id !== modelId),
      })),
  };
});


export default useModelStore;