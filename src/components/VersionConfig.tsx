import { useState, useEffect } from 'react';
import { AppVersion } from '@/types';
import GlassCard from './GlassCard';
import { useLangStore } from '@/stores/langStore';
import { t } from '@/i18n/translations';

interface VersionConfigProps {
  appId: string;
  versions: AppVersion[];
  onSave: (version: AppVersion) => void;
  onUpdate: (version: AppVersion) => void;
  onDelete: (id: string) => void;
}

export default function VersionConfig({ appId, versions, onSave, onUpdate, onDelete }: VersionConfigProps) {
  const { lang } = useLangStore();
  const i18n = t(lang);
  const [version, setVersion] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [changelog, setChangelog] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (editingId) {
      const v = versions.find(v => v.id === editingId);
      if (v) {
        setVersion(v.version);
        setDownloadUrl(v.downloadUrl);
        setChangelog(v.changelog);
      }
    } else {
      setVersion('');
      setDownloadUrl('');
      setChangelog('');
    }
  }, [editingId, versions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!version.trim() || !downloadUrl.trim()) return;

    if (editingId) {
      onUpdate({
        id: editingId,
        appId,
        version: version.trim(),
        downloadUrl: downloadUrl.trim(),
        changelog: changelog.trim(),
        createdAt: new Date().toISOString(),
      });
    } else {
      onSave({
        id: `v_${Date.now()}`,
        appId,
        version: version.trim(),
        downloadUrl: downloadUrl.trim(),
        changelog: changelog.trim(),
        createdAt: new Date().toISOString(),
      });
    }

    setVersion('');
    setDownloadUrl('');
    setChangelog('');
    setEditingId(null);
  };

  const handleEdit = (v: AppVersion) => {
    setEditingId(v.id);
  };

  const handleCancel = () => {
    setEditingId(null);
    setVersion('');
    setDownloadUrl('');
    setChangelog('');
  };

  return (
    <div className="flex flex-col gap-6">
      <GlassCard hover={false}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">
            {editingId ? i18n.appConfig.editVersion : i18n.appConfig.addVersion}
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{i18n.appConfig.version}</label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="input-glass"
              placeholder={i18n.appConfig.versionPlaceholder}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{i18n.appConfig.downloadUrl}</label>
            <input
              type="url"
              value={downloadUrl}
              onChange={(e) => setDownloadUrl(e.target.value)}
              className="input-glass"
              placeholder={i18n.appConfig.urlPlaceholder}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{i18n.appConfig.changelog}</label>
            <textarea
              value={changelog}
              onChange={(e) => setChangelog(e.target.value)}
              className="input-glass min-h-[120px] resize-none"
              placeholder={i18n.appConfig.changelogPlaceholder}
            />
          </div>

          <div className="flex gap-3">
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn-secondary flex-1">
                {i18n.appConfig.cancel}
              </button>
            )}
            <button type="submit" className="btn-primary flex-1">
              {editingId ? i18n.appConfig.save : i18n.appConfig.add}
            </button>
          </div>
        </form>
      </GlassCard>

      {versions.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">{i18n.appConfig.versionHistory}</h3>
          {versions.map((v) => (
            <GlassCard key={v.id}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">v{v.version}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(v)} className="text-sm text-gray-600 hover:text-black">
                      {i18n.dashboard.edit}
                    </button>
                    <button onClick={() => onDelete(v.id)} className="text-sm text-red-600 hover:text-red-800">
                      {i18n.dashboard.delete}
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500 break-all">
                  {v.downloadUrl}
                </div>
                {v.changelog && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {v.changelog}
                  </div>
                )}
                <div className="text-xs text-gray-400">
                  {new Date(v.createdAt).toLocaleString(lang === 'en' ? 'en-US' : 'zh-TW')}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
