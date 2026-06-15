import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GlassCard from '@/components/GlassCard';
import GlassModal from '@/components/GlassModal';
import { Zap } from 'lucide-react';

const TOTAL_CALLS = 10000;
const USED_CALLS = 3250;
const REMAINING = TOTAL_CALLS - USED_CALLS;
const PERCENT = Math.round((REMAINING / TOTAL_CALLS) * 100);

export default function ResourcesPage() {
  const { t } = useTranslation();
  const [showPurchase, setShowPurchase] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-24 px-4 md:px-8">
      <div className="fixed top-10 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t('resources')}</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Remaining Calls Card */}
          <GlassCard className="p-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
              {t('remaining_calls')}
            </h2>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-5xl font-bold text-gray-900 tracking-tight">
                  {REMAINING.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  / {TOTAL_CALLS.toLocaleString()} {t('total_calls')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-400">{PERCENT}%</p>
                <p className="text-xs text-gray-400">{t('remaining_calls')}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-200/50 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700"
                style={{ width: `${PERCENT}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{t('used')}: {USED_CALLS.toLocaleString()}</span>
              <span>{t('total_calls')}: {TOTAL_CALLS.toLocaleString()}</span>
            </div>
          </GlassCard>

          {/* Purchase Card */}
          <GlassCard className="p-6 flex flex-col justify-center items-center text-center">
            <Zap size={32} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('purchase_calls')}</h3>
            <p className="text-sm text-gray-500 mb-6">
              {t('remaining_calls')}: {REMAINING.toLocaleString()} / {TOTAL_CALLS.toLocaleString()}
            </p>
            <button
              onClick={() => setShowPurchase(true)}
              className="px-6 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all duration-200"
            >
              {t('purchase_calls')}
            </button>
          </GlassCard>
        </div>
      </div>

      {/* Purchase Modal */}
      <GlassModal open={showPurchase} onClose={() => setShowPurchase(false)} title={t('purchase_calls')}>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            {t('remaining_calls')}: {REMAINING.toLocaleString()} / {TOTAL_CALLS.toLocaleString()}
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { calls: 1000, price: '$9.99' },
              { calls: 5000, price: '$39.99' },
              { calls: 10000, price: '$69.99' },
              { calls: 50000, price: '$299.99' },
            ].map((plan) => (
              <button
                key={plan.calls}
                className="flex items-center justify-between p-4 rounded-xl border border-white/40 bg-white/50 hover:bg-white/70 transition-all"
              >
                <span className="text-sm font-medium text-gray-900">
                  {plan.calls.toLocaleString()} Calls
                </span>
                <span className="text-sm font-semibold text-gray-900">{plan.price}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setShowPurchase(false)}
              className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      </GlassModal>
    </div>
  );
}