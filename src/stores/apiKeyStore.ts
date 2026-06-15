import { create } from 'zustand';

export interface ApiKey {
  id: string;
  name: string;
  appId: string;
  key: string;
  userId: string;
  createdAt: string;
}

interface ApiKeyState {
  keys: ApiKey[];
  init: () => void;
  createKey: (name: string, appId: string, userId: string) => ApiKey | null;
  deleteKey: (id: string) => void;
  getUserKeys: (userId: string) => ApiKey[];
  getUserKeyCount: (userId: string) => number;
}

const STORAGE_KEY = 'hotupdate_apikeys';
const MAX_KEYS = 20;

function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'hk_';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const useApiKeyStore = create<ApiKeyState>((set, get) => ({
  keys: [],
  init: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      set({ keys: JSON.parse(stored) });
    }
  },
  createKey: (name: string, appId: string, userId: string) => {
    const userKeys = get().keys.filter((k) => k.userId === userId);
    if (userKeys.length >= MAX_KEYS) return null;
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name,
      appId,
      key: generateApiKey(),
      userId,
      createdAt: new Date().toISOString(),
    };
    const updated = [...get().keys, newKey];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ keys: updated });
    return newKey;
  },
  deleteKey: (id: string) => {
    const updated = get().keys.filter((k) => k.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ keys: updated });
  },
  getUserKeys: (userId: string) => get().keys.filter((k) => k.userId === userId),
  getUserKeyCount: (userId: string) => get().keys.filter((k) => k.userId === userId).length,
}));