import { create } from 'zustand';
import { Employees } from '@/shared/types';
import { getUserData } from '@/modules/users/services/userService';
import useAuthStore from '@/shared/stores/authStore';

interface EmployeeStoreState {
  employees: Employees[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
}

const useEmployeeStore = create<EmployeeStoreState>((set) => ({
  employees: [],
  loading: false,
  error: null,

  fetchEmployees: async () => {
    const token = useAuthStore.getState().token;
    
    if (!token) {
      set({ error: 'No authentication token', loading: false });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await getUserData(token);
      
      // Filter employees to only include Admin and Employee roles
      const filteredEmployees = response.items.filter((user: Employees) => 
        user.roles.some(role => ['Admin', 'Employee'].includes(role))
      );

      set({ 
        employees: filteredEmployees, 
        loading: false 
      });
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      set({ 
        error: 'Failed to fetch employees', 
        loading: false 
      });
    }
  }
}));

export default useEmployeeStore;