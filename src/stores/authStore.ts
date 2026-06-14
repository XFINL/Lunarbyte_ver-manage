import { create } from 'zustand';
import { User } from '@/types';
import { getCurrentUser, setCurrentUser, getUsers } from '@/utils/storage';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  login: (username: string, password: string) => {
    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => {
    setCurrentUser(null);
    set({ currentUser: null, isAuthenticated: false });
  },
  checkAuth: () => {
    const user = getCurrentUser();
    set({ currentUser: user, isAuthenticated: !!user });
  },
}));
