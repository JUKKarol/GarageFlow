import { create } from 'zustand';
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

const useAuthStore = create<AuthState>((set) => {

  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    const initialToken = storedToken ? storedToken : null;
    const initialUser = storedUser ? JSON.parse(storedUser) : null;

    return {
      token: initialToken,
      user: initialUser,
      isAuthenticated: !!initialToken,  // If token exists, set as authenticated
      setToken: (token) => {
        set((state) => ({ token, isAuthenticated: true }));
        localStorage.setItem('token', token);
        document.cookie = `token=${token}; path=/; max-age=3600`;
      },
      clearToken: () => {
        set((state) => ({ token: null, isAuthenticated: false }));
        localStorage.removeItem('token');
      },
      setUser: (user) => {
        set((state) => ({ user }));
        localStorage.setItem('user', JSON.stringify(user)); 
        document.cookie = `userRoles=${JSON.stringify(user.roles)}; path=/; max-age=3600`;
      },
      clearUser: () => {
        set((state) => ({ user: null }));
        localStorage.removeItem('user'); 
      },
      logout: () => {
        set((state) => ({ token: null, isAuthenticated: false, user: null }));
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 

        document.cookie = "token=; path=/; max-age=0";
        document.cookie = "userRoles=; path=/; max-age=0";

        window.location.href = '/login';
      },
    };
  }

  // If the code is executed on the server, return an empty state
  return {
    token: null,
    user: null,
    isAuthenticated: false,
    setToken: () => {},
    clearToken: () => {},
    setUser: () => {},
    clearUser: () => {},
    logout: () => {},
  };
});

export default useAuthStore;
