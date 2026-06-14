import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  users: (User & { password: string })[];
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
  init: () => void;
}

const defaultUsers: (User & { password: string })[] = [
  { id: 'admin-001', email: 'admin@hotupdate.com', password: 'admin123', role: 'admin' },
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoggedIn: false,
  users: [],
  init: () => {
    const stored = localStorage.getItem('hotupdate_users');
    const users = stored ? JSON.parse(stored) : defaultUsers;
    if (!stored) {
      localStorage.setItem('hotupdate_users', JSON.stringify(defaultUsers));
    }
    const currentUser = localStorage.getItem('hotupdate_current_user');
    if (currentUser) {
      set({ user: JSON.parse(currentUser), isLoggedIn: true, users });
    } else {
      set({ users });
    }
  },
  login: (email: string, password: string) => {
    const { users } = get();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...safeUser } = user;
      localStorage.setItem('hotupdate_current_user', JSON.stringify(safeUser));
      set({ user: safeUser, isLoggedIn: true });
      return true;
    }
    return false;
  },
  register: (email: string, password: string) => {
    const { users } = get();
    if (users.find((u) => u.email === email)) return false;
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      role: 'user' as const,
    };
    const updated = [...users, newUser];
    localStorage.setItem('hotupdate_users', JSON.stringify(updated));
    const { password: _, ...safeUser } = newUser;
    localStorage.setItem('hotupdate_current_user', JSON.stringify(safeUser));
    set({ user: safeUser, isLoggedIn: true, users: updated });
    return true;
  },
  logout: () => {
    localStorage.removeItem('hotupdate_current_user');
    set({ user: null, isLoggedIn: false });
  },
}));