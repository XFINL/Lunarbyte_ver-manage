export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface App {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: string;
}

export interface AppVersion {
  id: string;
  appId: string;
  version: string;
  downloadUrl: string;
  changelog: string;
  createdAt: string;
}
