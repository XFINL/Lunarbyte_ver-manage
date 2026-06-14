import { useState } from 'react';
import GlassCard from './GlassCard';

interface CreateAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

export default function CreateAppModal({ isOpen, onClose, onSubmit }: CreateAppModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim(), description.trim());
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <GlassCard hover={false} className="w-full max-w-md mx-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">创建新应用</h2>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">应用名称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-glass"
              placeholder="输入应用名称"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">应用描述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-glass min-h-[100px] resize-none"
              placeholder="输入应用描述（可选）"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              取消
            </button>
            <button type="submit" className="btn-primary flex-1">
              创建
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
