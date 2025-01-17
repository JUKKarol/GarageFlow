import { create } from 'zustand';
import { Model } from '../types';


interface ModelState {
  models: Model[];
  brandId: string | null;
  brandName: string | null;
  editedItem: Model | null;
  pagesCount: number;
  itemsCount: number;
  setBrandId: (brandId: string) => void;
  setBrandName: (brandName: string) => void;
  setEditedItem: (item: Model | null) => void;
  setModels: (models: Model[]) => void;
  addModel: (model: Model) => void;
  removeModel: (modelId: string) => void;
}

const useModelStore = create<ModelState>((set) => {
  return {
    models: [],
    brandId: null,
    brandName: null,
    editedItem: null,
    pagesCount: 0,
    itemsCount: 0,
    setEditedItem: (item) => set({ editedItem: item }),
    setBrandId: (brandId: string) => set({ brandId: brandId }),
    setBrandName: (brandName: string) => set({ brandName: brandName }),
    setModels: (models) => set({ models }),
    addModel: (model) => set((state) => ({ models: [...state.models, model] })),
    removeModel: (modelId) =>
      set((state) => ({
        models: state.models.filter((model) => model.id !== modelId),
      })),
  };
});


export default useModelStore;