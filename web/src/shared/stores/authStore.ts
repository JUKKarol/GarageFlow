import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setToken: (token) => {
        set(() => ({ 
          token, 
          isAuthenticated: true 
        }));
      },
      clearToken: () => {
        set(() => ({ 
          token: null, 
          isAuthenticated: false 
        }));
      },
      setUser: (user) => {
        set(() => ({ user }));
      },
      clearUser: () => {
        set(() => ({ user: null }));
      },
      logout: () => {
        set(() => ({ 
          token: null, 
          isAuthenticated: false, 
          user: null 
        }));

        document.cookie = 'token=; path=/; max-age=0; SameSite=Strict';
        document.cookie = 'userRoles=; path=/; max-age=0; SameSite=Strict';

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);

export default useAuthStore;