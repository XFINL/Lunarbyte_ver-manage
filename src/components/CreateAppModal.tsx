import { useState } from 'react';
import GlassCard from './GlassCard';
import { useLangStore } from '@/stores/langStore';
import { t } from '@/i18n/translations';

interface CreateAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

export default function CreateAppModal({ isOpen, onClose, onSubmit }: CreateAppModalProps) {
  const { lang } = useLangStore();
  const i18n = t(lang);
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
          <h2 className="text-xl font-bold">{i18n.createApp.title}</h2>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{i18n.createApp.name}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-glass"
              placeholder={i18n.createApp.namePlaceholder}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{i18n.createApp.desc}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-glass min-h-[100px] resize-none"
              placeholder={i18n.createApp.descPlaceholder}
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              {i18n.createApp.cancel}
            </button>
            <button type="submit" className="btn-primary flex-1">
              {i18n.createApp.submit}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
