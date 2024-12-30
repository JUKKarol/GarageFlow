import { create } from 'zustand';

interface User {
  userId: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber?: string;
  roles: string[];
}

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
  // We can safely access localStorage only in the client
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
      },
      clearToken: () => {
        set((state) => ({ token: null, isAuthenticated: false }));
        localStorage.removeItem('token');
      },
      setUser: (user) => {
        set((state) => ({ user }));
        localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
      },
      clearUser: () => {
        set((state) => ({ user: null }));
        localStorage.removeItem('user'); // Remove user from localStorage
      },
      logout: () => {
        set((state) => ({ token: null, isAuthenticated: false, user: null }));
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Remove both token and user on logout
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
