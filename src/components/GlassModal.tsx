import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface GlassModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function GlassModal({ open, onClose, title, children }: GlassModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/30 bg-white/60 backdrop-blur-2xl shadow-2xl p-6 animate-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-black/5 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}