import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AppCard from '@/components/AppCard';
import CreateAppModal from '@/components/CreateAppModal';
import GlassCard from '@/components/GlassCard';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import { generateUID } from '@/utils/uidGenerator';
import { App } from '@/types';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, checkAuth } = useAuthStore();
  const { apps, loadApps, createApp, updateApp, removeApp } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    checkAuth();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (currentUser?.role === 'admin') {
      navigate('/admin');
      return;
    }
    loadApps();
  }, [isAuthenticated, currentUser, navigate, checkAuth, loadApps]);

  const userApps = apps.filter((app) => app.userId === currentUser?.id);
  const filteredApps = userApps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateApp = (name: string, description: string) => {
    const newApp: App = {
      id: generateUID(),
      name,
      description,
      userId: currentUser!.id,
      createdAt: new Date().toISOString(),
    };
    createApp(newApp);
  };

  const handleEditApp = (app: App) => {
    const newName = prompt('输入新的应用名称:', app.name);
    if (newName && newName.trim()) {
      updateApp({ ...app, name: newName.trim() });
    }
  };

  const handleDeleteApp = (id: string) => {
    if (confirm('确定要删除这个应用吗？所有版本配置将被清除。')) {
      removeApp(id);
    }
  };

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <Navbar />

      <div className="pt-28 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">我的应用</h1>
            <p className="text-gray-500 mt-1">管理你的应用热更新配置</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            创建应用
          </button>
        </div>

        {userApps.length > 0 && (
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glass max-w-md"
              placeholder="搜索应用..."
            />
          </div>
        )}

        {filteredApps.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onEdit={handleEditApp}
                onDelete={handleDeleteApp}
              />
            ))}
          </div>
        ) : (
          <GlassCard hover={false} className="text-center py-16">
            <i className="iconfont icon-empty text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 mb-6">
              {searchTerm ? '没有找到匹配的应用' : '还没有创建应用'}
            </p>
            {!searchTerm && (
              <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                创建第一个应用
              </button>
            )}
          </GlassCard>
        )}
      </div>

      <CreateAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateApp}
      />
    </div>
  );
}
