import { App } from '@/types';
import GlassCard from './GlassCard';
import { useNavigate } from 'react-router-dom';
import { useLangStore } from '@/stores/langStore';
import { t } from '@/i18n/translations';

interface AppCardProps {
  app: App;
  onEdit?: (app: App) => void;
  onDelete?: (id: string) => void;
}

export default function AppCard({ app, onEdit, onDelete }: AppCardProps) {
  const navigate = useNavigate();
  const { lang } = useLangStore();
  const i18n = t(lang);

  return (
    <GlassCard className="cursor-pointer">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{app.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{app.description || i18n.appConfig.noDesc}</p>
          </div>
        </div>

        <div className="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-2 rounded-lg">
          UID: {app.id}
        </div>

        <div className="text-xs text-gray-400">
          {new Date(app.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-TW')}
        </div>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => navigate(`/dashboard/app/${app.id}`)}
            className="btn-primary text-xs px-4 py-2 flex-1"
          >
            {i18n.dashboard.configVersion}
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(app)}
              className="btn-secondary text-xs px-4 py-2"
            >
              {i18n.dashboard.edit}
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(app.id)}
              className="btn-secondary text-xs px-4 py-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              {i18n.dashboard.delete}
            </button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
