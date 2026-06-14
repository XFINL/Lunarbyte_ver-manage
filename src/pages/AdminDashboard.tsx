import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import GlassCard from '@/components/GlassCard';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import { getUsers } from '@/utils/storage';
import { User } from '@/types';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, checkAuth } = useAuthStore();
  const { apps, loadApps, removeApp } = useAppStore();
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
    if (confirm('确定要删除这个应用吗？')) {
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
          <h1 className="text-3xl font-bold">管理员控制台</h1>
          <p className="text-gray-500 mt-1">系统概览与管理</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <GlassCard>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <i className="iconfont icon-users text-white text-2xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">用户总数</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <i className="iconfont icon-apps text-white text-2xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">应用总数</p>
                <p className="text-3xl font-bold">{apps.length}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <i className="iconfont icon-active text-white text-2xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">活跃用户</p>
                <p className="text-3xl font-bold">{users.filter(u => u.role === 'user').length}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Users Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">用户管理</h2>
          <GlassCard hover={false}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold">用户名</th>
                    <th className="text-left py-3 px-4 font-semibold">角色</th>
                    <th className="text-left py-3 px-4 font-semibold">创建时间</th>
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
                          {user.role === 'admin' ? '管理员' : '用户'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString('zh-CN')}
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
            <h2 className="text-2xl font-bold">应用管理</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glass max-w-xs"
              placeholder="搜索应用..."
            />
          </div>

          {filteredApps.length > 0 ? (
            <GlassCard hover={false}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold">应用名称</th>
                      <th className="text-left py-3 px-4 font-semibold">UID</th>
                      <th className="text-left py-3 px-4 font-semibold">所有者</th>
                      <th className="text-left py-3 px-4 font-semibold">创建时间</th>
                      <th className="text-left py-3 px-4 font-semibold">操作</th>
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
                          <td className="py-3 px-4">{owner?.username || '未知'}</td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {new Date(app.createdAt).toLocaleDateString('zh-CN')}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleDeleteApp(app.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              删除
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
                {searchTerm ? '没有找到匹配的应用' : '暂无应用'}
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
