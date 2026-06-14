import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import VersionConfig from '@/components/VersionConfig';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import { getAppById } from '@/utils/storage';
import { App, AppVersion } from '@/types';

export default function AppConfig() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, checkAuth } = useAuthStore();
  const { getVersions, createVersion, updateVersion, removeVersion } = useAppStore();
  const [app, setApp] = useState<App | null>(null);
  const [versions, setVersions] = useState<AppVersion[]>([]);

  useEffect(() => {
    checkAuth();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (id) {
      const appData = getAppById(id);
      if (appData) {
        if (currentUser?.role !== 'admin' && appData.userId !== currentUser?.id) {
          navigate('/dashboard');
          return;
        }
        setApp(appData);
        setVersions(getVersions(id));
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, isAuthenticated, currentUser, navigate, checkAuth, getVersions]);

  const handleSaveVersion = (version: AppVersion) => {
    createVersion(version);
    if (id) {
      setVersions(getVersions(id));
    }
  };

  const handleUpdateVersion = (version: AppVersion) => {
    updateVersion(version);
    if (id) {
      setVersions(getVersions(id));
    }
  };

  const handleDeleteVersion = (versionId: string) => {
    if (confirm('确定要删除这个版本吗？')) {
      removeVersion(versionId);
      if (id) {
        setVersions(getVersions(id));
      }
    }
  };

  if (!app) {
    return null;
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <Navbar />

      <div className="pt-28 px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-600 hover:text-black mb-4 flex items-center gap-1"
          >
            <i className="iconfont icon-back"></i>
            返回应用列表
          </button>

          <h1 className="text-3xl font-bold">{app.name}</h1>
          <p className="text-gray-500 mt-1">{app.description || '暂无描述'}</p>

          <div className="mt-4 text-xs font-mono bg-gray-50 px-4 py-3 rounded-xl inline-block">
            UID: {app.id}
          </div>
        </div>

        <VersionConfig
          appId={app.id}
          versions={versions}
          onSave={handleSaveVersion}
          onUpdate={handleUpdateVersion}
          onDelete={handleDeleteVersion}
        />
      </div>
    </div>
  );
}
