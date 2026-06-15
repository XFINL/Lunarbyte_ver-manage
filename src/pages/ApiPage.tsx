import { useTranslation } from 'react-i18next';
import GlassCard from '@/components/GlassCard';
import { Code } from 'lucide-react';

export default function ApiPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-24 px-4 md:px-8">
      <div className="fixed top-10 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('api')}</h1>
        <p className="text-sm text-gray-500 mb-8">API documentation and integration guide.</p>

        <GlassCard className="p-12 text-center">
          <Code size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-sm">API documentation coming soon.</p>
        </GlassCard>
      </div>
    </div>
  );
}