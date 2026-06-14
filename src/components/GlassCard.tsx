import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({ children, className, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border border-white/30',
        'bg-white/40 backdrop-blur-xl',
        'shadow-lg shadow-black/5',
        'transition-all duration-300',
        'hover:bg-white/50 hover:shadow-xl hover:shadow-black/10',
        className
      )}
    >
      {children}
    </div>
  );
}