import { create } from 'zustand';
import { Brand } from '../types';

interface BrandState {
  brands: Brand[];
  editedItem: Brand | null;
  pagesCount: number;
  itemsCount: number;
  setEditedItem: (item: Brand | null) => void;
  setBrands: (brands: Brand[]) => void;
  addBrand: (brand: Brand) => void;
  removeBrand: (brandId: string) => void;
}

const useBrandStore = create<BrandState>((set) => {
    return {
        brands: [],
        editedItem: null,
        pagesCount: 0,
        itemsCount: 0,
        setEditedItem: (item) => set({ editedItem: item }),
        setBrands: (brands) => set({ brands }),
        addBrand: (brand) => set((state) => ({ brands: [...state.brands, brand] })),
        removeBrand: (brandId) =>
        set((state) => ({
            brands: state.brands.filter((brand) => brand.id !== brandId),
        })),
    };
});

export default useBrandStore;