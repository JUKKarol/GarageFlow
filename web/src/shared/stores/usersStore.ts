import { create } from 'zustand';
import { Employees } from '../types';

interface UserState {
    users: Employees[];
    user: Employees | null;
    editedItem: Employees | null;
    pagesCount: number;
    itemsCount: number;
    setEditedItem: (item: Employees | null) => void;
    setUsers: (users: Employees[]) => void;
    setUser: (user: Employees) => void;
    addUser: (user: Employees) => void;
    removeUser: (userId: string) => void;
}

const useUserStore = create<UserState>((set) => {
    return {
        users: [],
        user: null,
        editedItem: null,
        pagesCount: 0,
        itemsCount: 0,
        setEditedItem: (item) => set({ editedItem: item }),
        setUsers: (users) => set({ users }),
        setUser: (user) => set({ user }),
        addUser: (user) => set((state) => ({ users: [...state.users, user] })),
        removeUser: (userId) =>
        set((state) => ({
            users: state.users.filter((user) => user.id !== userId),
        })),
    };
});

export default useUserStore;