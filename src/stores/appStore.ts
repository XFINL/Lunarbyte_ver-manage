import { create } from 'zustand';
import { generateUID } from '@/utils/uid';

export interface AppVersion {
  id: string;
  version: string;
  downloadUrl: string;
  changelog: string;
  createdAt: string;
}

export interface AppItem {
  id: string;
  uid: string;
  name: string;
  userId: string;
  createdAt: string;
  versions: AppVersion[];
}

interface AppState {
  apps: AppItem[];
  init: () => void;
  createApp: (name: string, userId: string) => AppItem;
  deleteApp: (id: string) => void;
  addVersion: (appId: string, version: string, downloadUrl: string, changelog: string) => void;
  getUserApps: (userId: string) => AppItem[];
  getAllApps: () => AppItem[];
}

const STORAGE_KEY = 'hotupdate_apps';

export const useAppStore = create<AppState>((set, get) => ({
  apps: [],
  init: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      set({ apps: JSON.parse(stored) });
    }
  },
  createApp: (name: string, userId: string) => {
    const now = new Date();
    const uid = generateUID(now);
    const newApp: AppItem = {
      id: `app-${Date.now()}`,
      uid,
      name,
      userId,
      createdAt: now.toISOString(),
      versions: [],
    };
    const updated = [...get().apps, newApp];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ apps: updated });
    return newApp;
  },
  deleteApp: (id: string) => {
    const updated = get().apps.filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ apps: updated });
  },
  addVersion: (appId: string, version: string, downloadUrl: string, changelog: string) => {
    const newVersion: AppVersion = {
      id: `ver-${Date.now()}`,
      version,
      downloadUrl,
      changelog,
      createdAt: new Date().toISOString(),
    };
    const updated = get().apps.map((a) =>
      a.id === appId ? { ...a, versions: [newVersion, ...a.versions] } : a
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ apps: updated });
  },
  getUserApps: (userId: string) => get().apps.filter((a) => a.userId === userId),
  getAllApps: () => get().apps,
}));