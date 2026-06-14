import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import GlassCard from '@/components/GlassCard';
import { Package, Users, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const { t } = useTranslation();
  const { users } = useAuthStore();
  const { apps, init, deleteApp, getAllApps } = useAppStore();

  useEffect(() => {
    init();
  }, [init]);

  const allApps = getAllApps();
  const totalUsers = users.length;
  const totalApps = allApps.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-24 px-4 md:px-8">
      {/* Decorative blurs */}
      <div className="fixed top-10 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t('admin_panel')}</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100/50 flex items-center justify-center">
                <Users size={22} className="text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                <p className="text-sm text-gray-500">{t('total_users')}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100/50 flex items-center justify-center">
                <Package size={22} className="text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{totalApps}</p>
                <p className="text-sm text-gray-500">{t('total_apps')}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* User Management */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('user_management')}</h2>
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/30">
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('email')}
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('role')}
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('created_at')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-white/20 last:border-0">
                      <td className="px-5 py-3 text-sm text-gray-900">{u.email}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          u.role === 'admin'
                            ? 'bg-purple-100/50 text-purple-700'
                            : 'bg-gray-100/50 text-gray-600'
                        }`}>
                          {u.role === 'admin' ? t('admin') : t('user')}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-500">-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* App Management */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('app_management')}</h2>
          {allApps.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <Package size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">{t('no_apps')}</p>
            </GlassCard>
          ) : (
            <GlassCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/30">
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('app_name')}
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('app_uid')}
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('latest_version')}
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allApps.map((app) => (
                      <tr key={app.id} className="border-b border-white/20 last:border-0">
                        <td className="px-5 py-3 text-sm font-medium text-gray-900">{app.name}</td>
                        <td className="px-5 py-3 text-xs font-mono text-gray-500">{app.uid}</td>
                        <td className="px-5 py-3 text-sm text-gray-500">
                          {app.versions[0]?.version || '-'}
                        </td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => deleteApp(app.id)}
                            className="p-2 rounded-xl hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                            title={t('delete')}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}