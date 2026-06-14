import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import GlassCard from '@/components/GlassCard';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import { useLangStore } from '@/stores/langStore';
import { t } from '@/i18n/translations';
import { getUsers } from '@/utils/storage';
import { User } from '@/types';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, checkAuth } = useAuthStore();
  const { apps, loadApps, removeApp } = useAppStore();
  const { lang } = useLangStore();
  const i18n = t(lang);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    checkAuth();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (currentUser?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    loadApps();
    setUsers(getUsers());
  }, [isAuthenticated, currentUser, navigate, checkAuth, loadApps]);

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteApp = (id: string) => {
    if (confirm(i18n.admin.deleteConfirm)) {
      removeApp(id);
    }
  };

  if (!isAuthenticated || currentUser?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <Navbar />

      <div className="pt-28 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{i18n.admin.title}</h1>
          <p className="text-gray-500 mt-1">{i18n.admin.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <GlassCard>
            <div>
              <p className="text-sm text-gray-500">{i18n.admin.totalUsers}</p>
              <p className="text-3xl font-bold mt-1">{users.length}</p>
            </div>
          </GlassCard>

          <GlassCard>
            <div>
              <p className="text-sm text-gray-500">{i18n.admin.totalApps}</p>
              <p className="text-3xl font-bold mt-1">{apps.length}</p>
            </div>
          </GlassCard>

          <GlassCard>
            <div>
              <p className="text-sm text-gray-500">{i18n.admin.activeUsers}</p>
              <p className="text-3xl font-bold mt-1">{users.filter(u => u.role === 'user').length}</p>
            </div>
          </GlassCard>
        </div>

        {/* Users Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{i18n.admin.userManagement}</h2>
          <GlassCard hover={false}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold">{i18n.admin.username}</th>
                    <th className="text-left py-3 px-4 font-semibold">{i18n.admin.role}</th>
                    <th className="text-left py-3 px-4 font-semibold">{i18n.admin.createdAt}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">{user.username}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          user.role === 'admin'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role === 'admin' ? i18n.admin.admin : i18n.admin.user}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-TW')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* Apps Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{i18n.admin.appManagement}</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glass max-w-xs"
              placeholder={i18n.admin.search}
            />
          </div>

          {filteredApps.length > 0 ? (
            <GlassCard hover={false}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold">{i18n.admin.appName}</th>
                      <th className="text-left py-3 px-4 font-semibold">UID</th>
                      <th className="text-left py-3 px-4 font-semibold">{i18n.admin.owner}</th>
                      <th className="text-left py-3 px-4 font-semibold">{i18n.admin.createdAt}</th>
                      <th className="text-left py-3 px-4 font-semibold">{i18n.admin.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApps.map((app) => {
                      const owner = users.find(u => u.id === app.userId);
                      return (
                        <tr key={app.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium">{app.name}</td>
                          <td className="py-3 px-4 text-xs font-mono text-gray-500">
                            {app.id}
                          </td>
                          <td className="py-3 px-4">{owner?.username || i18n.admin.unknown}</td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {new Date(app.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-TW')}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleDeleteApp(app.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              {i18n.admin.delete}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          ) : (
            <GlassCard hover={false} className="text-center py-12">
              <p className="text-gray-500">
                {searchTerm ? i18n.admin.noMatch : i18n.admin.noApps}
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
