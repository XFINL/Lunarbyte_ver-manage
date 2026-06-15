import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore, type AppItem } from '@/stores/appStore';
import GlassCard from '@/components/GlassCard';
import GlassModal from '@/components/GlassModal';
import { Plus, Trash2, ChevronRight, Package, Link, FileText } from 'lucide-react';
import { getNameError, getNameMaxLength } from '@/lib/utils';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { apps, init, createApp, deleteApp, addVersion } = useAppStore();

  const [showCreate, setShowCreate] = useState(false);
  const [appName, setAppName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [showVersion, setShowVersion] = useState(false);
  const [verNumber, setVerNumber] = useState('');
  const [verUrl, setVerUrl] = useState('');
  const [verLog, setVerLog] = useState('');

  useEffect(() => {
    init();
  }, [init]);

  const myApps = apps.filter((a) => a.userId === user?.id);

  const handleCreate = () => {
    if (!appName.trim() || !user) return;
    const err = getNameError(appName);
    if (err) { setNameError(err); return; }
    createApp(appName.trim(), user.id);
    setAppName('');
    setNameError(null);
    setShowCreate(false);
  };

  const handleAddVersion = () => {
    if (!selectedApp || !verNumber.trim() || !verUrl.trim()) return;
    addVersion(selectedApp.id, verNumber.trim(), verUrl.trim(), verLog.trim());
    setVerNumber('');
    setVerUrl('');
    setVerLog('');
    setShowVersion(false);
    setSelectedApp(
      useAppStore.getState().apps.find((a) => a.id === selectedApp.id) || null
    );
  };

  const openVersionManager = (app: AppItem) => {
    setSelectedApp(app);
    setShowVersion(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-24 px-4 md:px-8">
      {/* Decorative blurs */}
      <div className="fixed top-10 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('my_apps')}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all duration-200"
          >
            <Plus size={18} />
            {t('create_app')}
          </button>
        </div>

        {/* App List */}
        {myApps.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <Package size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-sm">{t('no_apps')}</p>
          </GlassCard>
        ) : (
          <div className="grid gap-4">
            {myApps.map((app) => (
              <GlassCard key={app.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {app.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      {app.uid}
                    </p>
                    {app.versions.length > 0 && (
                      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Package size={12} />
                          {t('latest_version')}: {app.versions[0].version}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    <button
                      onClick={() => openVersionManager(app)}
                      className="p-2 rounded-xl hover:bg-black/5 transition-colors text-gray-500"
                      title={t('view_details')}
                    >
                      <ChevronRight size={18} />
                    </button>
                    <button
                      onClick={() => deleteApp(app.id)}
                      className="p-2 rounded-xl hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                      title={t('delete')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Create App Modal */}
      <GlassModal open={showCreate} onClose={() => setShowCreate(false)} title={t('create_app')}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              {t('app_name')}
            </label>
            <input
              type="text"
              value={appName}
              onChange={(e) => {
                const v = e.target.value;
                const maxLen = getNameMaxLength(v);
                if (v.length <= maxLen) {
                  setAppName(v);
                  setNameError(null);
                }
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
              placeholder={t('app_name_placeholder')}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            {nameError && <p className="text-xs text-red-500">{nameError}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
            >
              {t('create')}
            </button>
          </div>
        </div>
      </GlassModal>

      {/* Version Manager Modal */}
      <GlassModal
        open={showVersion}
        onClose={() => { setShowVersion(false); setSelectedApp(null); }}
        title={selectedApp?.name || ''}
      >
        <div className="space-y-4">
          {/* Version List */}
          {selectedApp && selectedApp.versions.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedApp.versions.map((v) => (
                <div
                  key={v.id}
                  className="p-3 rounded-xl bg-white/40 border border-white/30"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Package size={14} />
                    {v.version}
                  </div>
                  {v.downloadUrl && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                      <Link size={12} />
                      <span className="truncate">{v.downloadUrl}</span>
                    </div>
                  )}
                  {v.changelog && (
                    <div className="flex items-start gap-1.5 text-xs text-gray-500 mt-1">
                      <FileText size={12} className="mt-0.5 shrink-0" />
                      <span>{v.changelog}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add Version Form */}
          <div className="border-t border-white/30 pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('add_version')}</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {t('version')}
                </label>
                <input
                  type="text"
                  value={verNumber}
                  onChange={(e) => setVerNumber(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                  placeholder="1.0.0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {t('download_url')}
                </label>
                <input
                  type="url"
                  value={verUrl}
                  onChange={(e) => setVerUrl(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {t('changelog')}
                </label>
                <textarea
                  value={verLog}
                  onChange={(e) => setVerLog(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all resize-none"
                  placeholder="Bug fixes and improvements..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => { setShowVersion(false); setSelectedApp(null); }}
              className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {t('back')}
            </button>
            <button
              onClick={handleAddVersion}
              className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
            >
              {t('add_version')}
            </button>
          </div>
        </div>
      </GlassModal>
    </div>
  );
}