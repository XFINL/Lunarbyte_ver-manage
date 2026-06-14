import { create } from 'zustand';
import { App, AppVersion } from '@/types';
import {
  getApps,
  addApp as storageAddApp,
  updateApp as storageUpdateApp,
  deleteApp as storageDeleteApp,
  getVersionsByAppId,
  addVersion as storageAddVersion,
  updateVersion as storageUpdateVersion,
  deleteVersion as storageDeleteVersion,
} from '@/utils/storage';

interface AppState {
  apps: App[];
  loadApps: () => void;
  createApp: (app: App) => void;
  updateApp: (app: App) => void;
  removeApp: (id: string) => void;
  getVersions: (appId: string) => AppVersion[];
  createVersion: (version: AppVersion) => void;
  updateVersion: (version: AppVersion) => void;
  removeVersion: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  apps: [],
  loadApps: () => {
    const apps = getApps();
    set({ apps });
  },
  createApp: (app: App) => {
    storageAddApp(app);
    set({ apps: getApps() });
  },
  updateApp: (app: App) => {
    storageUpdateApp(app);
    set({ apps: getApps() });
  },
  removeApp: (id: string) => {
    storageDeleteApp(id);
    set({ apps: getApps() });
  },
  getVersions: (appId: string) => {
    return getVersionsByAppId(appId);
  },
  createVersion: (version: AppVersion) => {
    storageAddVersion(version);
  },
  updateVersion: (version: AppVersion) => {
    storageUpdateVersion(version);
  },
  removeVersion: (id: string) => {
    storageDeleteVersion(id);
  },
}));
