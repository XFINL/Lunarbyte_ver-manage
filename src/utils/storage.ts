import { User, App, AppVersion } from '@/types';

const STORAGE_KEYS = {
  USERS: 'hotupdate_users',
  APPS: 'hotupdate_apps',
  VERSIONS: 'hotupdate_versions',
  CURRENT_USER: 'hotupdate_current_user',
};

// 初始化默认数据
function initializeDefaultData() {
  const users = getUsers();
  if (users.length === 0) {
    const defaultUsers: User[] = [
      {
        id: 'admin_001',
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'user_001',
        username: 'user',
        password: 'user123',
        role: 'user',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }
}

// 用户相关
export function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

// App 相关
export function getApps(): App[] {
  const data = localStorage.getItem(STORAGE_KEYS.APPS);
  return data ? JSON.parse(data) : [];
}

export function saveApps(apps: App[]) {
  localStorage.setItem(STORAGE_KEYS.APPS, JSON.stringify(apps));
}

export function getAppsByUserId(userId: string): App[] {
  const apps = getApps();
  return apps.filter(app => app.userId === userId);
}

export function getAppById(id: string): App | undefined {
  const apps = getApps();
  return apps.find(app => app.id === id);
}

export function addApp(app: App) {
  const apps = getApps();
  apps.push(app);
  saveApps(apps);
}

export function updateApp(updatedApp: App) {
  const apps = getApps();
  const index = apps.findIndex(app => app.id === updatedApp.id);
  if (index !== -1) {
    apps[index] = updatedApp;
    saveApps(apps);
  }
}

export function deleteApp(id: string) {
  const apps = getApps();
  saveApps(apps.filter(app => app.id !== id));
  // 同时删除相关版本
  const versions = getVersions();
  saveVersions(versions.filter(v => v.appId !== id));
}

// 版本相关
export function getVersions(): AppVersion[] {
  const data = localStorage.getItem(STORAGE_KEYS.VERSIONS);
  return data ? JSON.parse(data) : [];
}

export function saveVersions(versions: AppVersion[]) {
  localStorage.setItem(STORAGE_KEYS.VERSIONS, JSON.stringify(versions));
}

export function getVersionsByAppId(appId: string): AppVersion[] {
  const versions = getVersions();
  return versions.filter(v => v.appId === appId);
}

export function addVersion(version: AppVersion) {
  const versions = getVersions();
  versions.push(version);
  saveVersions(versions);
}

export function updateVersion(updatedVersion: AppVersion) {
  const versions = getVersions();
  const index = versions.findIndex(v => v.id === updatedVersion.id);
  if (index !== -1) {
    versions[index] = updatedVersion;
    saveVersions(versions);
  }
}

export function deleteVersion(id: string) {
  const versions = getVersions();
  saveVersions(versions.filter(v => v.id !== id));
}

// 初始化
initializeDefaultData();
