import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import GlassCard from '@/components/GlassCard';
import GlassModal from '@/components/GlassModal';
import { Package, Users, Trash2, Edit, Search } from 'lucide-react';

export default function AdminUsersPage() {
  const { t } = useTranslation();
  const { users, init } = useAuthStore();
  const { apps } = useAppStore();
  const [editUser, setEditUser] = useState<(typeof users)[0] | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    useAuthStore.getState().init();
    useAppStore.getState().init();
  }, []);

  const getAppCount = (userId: string) => apps.filter((a) => a.userId === userId).length;

  const filteredUsers = users.filter(
    (u) => u.email.toLowerCase().includes(searchQuery.toLowerCase()) && u.role !== 'admin'
  );

  const handleEdit = (u: (typeof users)[0]) => {
    setEditUser(u);
    setEditEmail(u.email);
  };

  const handleSaveEdit = () => {
    if (!editUser || !editEmail.trim()) return;
    const updated = users.map((u) =>
      u.id === editUser.id ? { ...u, email: editEmail.trim() } : u
    );
    localStorage.setItem('hotupdate_users', JSON.stringify(updated));
    useAuthStore.setState({ users: updated as any });
    setEditUser(null);
  };

  const handleDelete = (id: string) => {
    const updated = users.filter((u) => u.id !== id);
    localStorage.setItem('hotupdate_users', JSON.stringify(updated));
    useAuthStore.setState({ users: updated as any });
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-24 px-4 md:px-8">
      <div className="fixed top-10 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t('admin_users')}</h1>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 w-48"
              placeholder="Search..."
            />
          </div>
        </div>

        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/30">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{t('user_id')}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{t('email')}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{t('role')}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{t('user_apps')}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-sm text-gray-500">{t('no_apps')}</td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b border-white/20 last:border-0">
                      <td className="px-5 py-3 text-xs font-mono text-gray-500">{u.id}</td>
                      <td className="px-5 py-3 text-sm text-gray-900">{u.email}</td>
                      <td className="px-5 py-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100/50 text-gray-600">{t('user')}</span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-900 font-medium">{getAppCount(u.id)}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleEdit(u)} className="p-2 rounded-xl hover:bg-blue-50 transition-colors text-gray-400 hover:text-blue-500">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => setDeleteConfirm(u.id)} className="p-2 rounded-xl hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* Edit Modal */}
      <GlassModal open={!!editUser} onClose={() => setEditUser(null)} title={t('edit_user')}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{t('user_id')}</label>
            <p className="text-xs font-mono text-gray-500 bg-gray-50 px-3 py-2 rounded-xl">{editUser?.id}</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{t('email')}</label>
            <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setEditUser(null)} className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors">{t('cancel')}</button>
            <button onClick={handleSaveEdit} className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all">{t('save')}</button>
          </div>
        </div>
      </GlassModal>

      {/* Delete Confirm Modal */}
      <GlassModal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title={t('confirm_delete')}>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">{t('confirm_delete')}</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors">{t('cancel')}</button>
            <button onClick={() => handleDelete(deleteConfirm!)} className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-all">{t('delete')}</button>
          </div>
        </div>
      </GlassModal>
    </div>
  );
}