import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import GlassCard from '@/components/GlassCard';
import { Package, Users } from 'lucide-react';

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const { users } = useAuthStore();
  const { apps, init, getAllApps } = useAppStore();

  useEffect(() => {
    init();
  }, [init]);

  const allApps = getAllApps();
  const totalUsers = users.length;
  const totalApps = allApps.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-24 px-4 md:px-8">
      <div className="fixed top-10 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t('admin_dashboard')}</h1>

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
      </div>
    </div>
  );
}