import { useState, useEffect } from 'react';
import { AppVersion } from '@/types';
import GlassCard from './GlassCard';

interface VersionConfigProps {
  appId: string;
  versions: AppVersion[];
  onSave: (version: AppVersion) => void;
  onUpdate: (version: AppVersion) => void;
  onDelete: (id: string) => void;
}

export default function VersionConfig({ appId, versions, onSave, onUpdate, onDelete }: VersionConfigProps) {
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
            {editingId ? '编辑版本' : '添加新版本'}
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">版本号</label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="input-glass"
              placeholder="例如: 1.0.0"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">下载地址 (URL)</label>
            <input
              type="url"
              value={downloadUrl}
              onChange={(e) => setDownloadUrl(e.target.value)}
              className="input-glass"
              placeholder="https://example.com/app.apk"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">更新日志</label>
            <textarea
              value={changelog}
              onChange={(e) => setChangelog(e.target.value)}
              className="input-glass min-h-[120px] resize-none"
              placeholder="输入更新日志..."
            />
          </div>

          <div className="flex gap-3">
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn-secondary flex-1">
                取消
              </button>
            )}
            <button type="submit" className="btn-primary flex-1">
              {editingId ? '保存' : '添加'}
            </button>
          </div>
        </form>
      </GlassCard>

      {versions.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">版本历史</h3>
          {versions.map((v) => (
            <GlassCard key={v.id}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">v{v.version}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(v)} className="text-sm text-gray-600 hover:text-black">
                      编辑
                    </button>
                    <button onClick={() => onDelete(v.id)} className="text-sm text-red-600 hover:text-red-800">
                      删除
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
                  {new Date(v.createdAt).toLocaleString('zh-CN')}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
