import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import GlassCard from '@/components/GlassCard';
import GlassModal from '@/components/GlassModal';
import { Gift, Check, Mail } from 'lucide-react';

interface UserOption {
  id: string;
  email: string;
}

const packages = [
  { calls: 1000, price: '$9.99' },
  { calls: 5000, price: '$39.99' },
  { calls: 10000, price: '$69.99' },
  { calls: 50000, price: '$299.99' },
];

export default function AdminDataPackagesPage() {
  const { t } = useTranslation();
  const { users } = useAuthStore();
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    useAuthStore.getState().init();
  }, []);

  const userOptions: UserOption[] = users.filter((u) => u.role !== 'admin');

  const selectedUser = userOptions.find((u) => u.id === selectedUserId);

  const handleAssign = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowConfirm(false);
      setSelectedUserId('');
      setSelectedPackage(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-24 px-4 md:px-8">
      <div className="fixed top-10 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t('admin_data_packages')}</h1>

        {/* Select User */}
        <GlassCard className="p-6 mb-6">
          <label className="block text-xs font-medium text-gray-600 mb-2">{t('select_user')}</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all appearance-none"
          >
            <option value="">-- {t('select_user')} --</option>
            {userOptions.map((u) => (
              <option key={u.id} value={u.id}>{u.email} ({u.id})</option>
            ))}
          </select>
        </GlassCard>

        {/* Package Grid */}
        {selectedUserId && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {packages.map((pkg) => (
              <GlassCard
                key={pkg.calls}
                className={`p-5 cursor-pointer transition-all ${
                  selectedPackage === pkg.calls ? 'ring-2 ring-black' : ''
                }`}
                onClick={() => setSelectedPackage(pkg.calls)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{pkg.calls.toLocaleString()} {t('add_calls')}</h3>
                    <p className="text-sm text-gray-500 mt-1">{pkg.price}</p>
                  </div>
                  <Gift size={24} className="text-gray-400" />
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Assign Button */}
        {selectedPackage && selectedUserId && (
          <div className="mt-6 text-right">
            <button
              onClick={() => setShowConfirm(true)}
              className="px-6 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
            >
              {t('assign_package')}
            </button>
          </div>
        )}
      </div>

      {/* Confirm / Success Modal */}
      <GlassModal open={showConfirm} onClose={() => !success ? setShowConfirm(false) : undefined} title={success ? t('calls_added') : t('assign_package')}>
        {success ? (
          <div className="text-center py-4">
            <Check size={48} className="mx-auto text-green-500 mb-3" />
            <p className="text-sm text-gray-900 font-medium mb-1">{t('calls_added')}</p>
            <p className="text-xs text-gray-500">{selectedUser?.email}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <Mail size={18} className="text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedUser?.email}</p>
                <p className="text-xs text-gray-500">{selectedPackage?.toLocaleString()} {t('add_calls')}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors">{t('cancel')}</button>
              <button onClick={handleAssign} className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all">{t('assign_package')}</button>
            </div>
          </div>
        )}
      </GlassModal>
    </div>
  );
}