import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import { useApiKeyStore } from '@/stores/apiKeyStore';
import GlassCard from '@/components/GlassCard';
import GlassModal from '@/components/GlassModal';
import { Key, Copy, Trash2, Check } from 'lucide-react';

export default function ApiPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { apps, init: initApps } = useAppStore();
  const { init: initKeys, createKey, deleteKey, getUserKeys, getUserKeyCount } = useApiKeyStore();

  const [showCreate, setShowCreate] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [selectedAppId, setSelectedAppId] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    initApps();
    initKeys();
  }, [initApps, initKeys]);

  const myApps = apps.filter((a) => a.userId === user?.id);
  const myKeys = getUserKeys(user?.id || '');
  const keyCount = getUserKeyCount(user?.id || '');
  const atLimit = keyCount >= 20;

  const handleCreate = () => {
    setError('');
    if (!keyName.trim() || !selectedAppId || !user) return;
    if (atLimit) {
      setError(t('key_limit'));
      return;
    }
    const newKey = createKey(keyName.trim(), selectedAppId, user.id);
    if (newKey) {
      setGeneratedKey(newKey.key);
      setKeyName('');
      setSelectedAppId('');
    }
  };

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getAppByUid = (appId: string) => apps.find((a) => a.id === appId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-24 px-4 md:px-8">
      <div className="fixed top-10 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('api')}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {keyCount} / 20 {t('key_limit')}
            </p>
          </div>
          <button
            onClick={() => {
              setError('');
              setGeneratedKey(null);
              setShowCreate(true);
            }}
            disabled={atLimit}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200"
          >
            <Key size={18} />
            {t('create_api_key')}
          </button>
        </div>

        {/* Key List */}
        {myKeys.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <Key size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-sm">{t('no_keys')}</p>
          </GlassCard>
        ) : (
          <div className="grid gap-4">
            {myKeys.map((apiKey) => {
              const app = getAppByUid(apiKey.appId);
              return (
                <GlassCard key={apiKey.id} className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {apiKey.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {app ? `${app.name} (${app.uid})` : apiKey.appId}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <code className="text-xs text-gray-500 bg-gray-100/50 px-2 py-1 rounded font-mono truncate max-w-[200px]">
                          {apiKey.key}
                        </code>
                        <button
                          onClick={() => handleCopy(apiKey.key, apiKey.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                        >
                          {copiedId === apiKey.id ? (
                            <Check size={14} className="text-green-500" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(apiKey.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteKey(apiKey.id)}
                      className="p-2 rounded-xl hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500 ml-3"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Key Modal */}
      <GlassModal open={showCreate} onClose={() => setShowCreate(false)} title={t('create_api_key')}>
        {generatedKey ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <p className="text-sm font-medium text-green-800 mb-2">{t('key_generated')}</p>
              <code className="block text-xs text-green-700 bg-green-100/50 px-3 py-2 rounded font-mono break-all">
                {generatedKey}
              </code>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedKey);
                setGeneratedKey(null);
                setShowCreate(false);
              }}
              className="w-full py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
            >
              {t('copy')} & {t('back')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                {t('key_name')}
              </label>
              <input
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                placeholder={t('key_name_placeholder')}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                {t('select_app')}
              </label>
              <select
                value={selectedAppId}
                onChange={(e) => setSelectedAppId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all appearance-none"
              >
                <option value="">{t('select_app_placeholder')}</option>
                {myApps.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.name} ({app.uid})
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            {atLimit && (
              <p className="text-xs text-amber-600">{t('key_limit')}</p>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleCreate}
                disabled={atLimit || !keyName.trim() || !selectedAppId}
                className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition-all"
              >
                {t('generate_key')}
              </button>
            </div>
          </div>
        )}
      </GlassModal>
    </div>
  );
}