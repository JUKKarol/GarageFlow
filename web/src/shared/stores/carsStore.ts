import { create } from 'zustand';
import { Car } from '../types';

interface CarState {
    cars: Car[];
    car: Car | null;
    editedItem: Car | null;
    pagesCount: number;
    itemsCount: number;
    setEditedItem: (item: Car | null) => void;
    setCars: (cars: Car[]) => void;
    setCar: (car: Car) => void;
    addCar: (car: Car) => void;
    removeCar: (carId: string) => void;
}

const useCarStore = create<CarState>((set) => {
    return {
        cars: [],
        car: null,
        editedItem: null,
        pagesCount: 0,
        itemsCount: 0,
        setEditedItem: (item) => set({ editedItem: item }),
        setCars: (cars) => set({ cars }),
        setCar: (car) => set({ car }),
        addCar: (car) => set((state) => ({ cars: [...state.cars, car] })),
        removeCar: (carId) =>
        set((state) => ({
            cars: state.cars.filter((car) => car.id !== carId),
        })),
    };
});

export default useCarStore;