import { useTranslation } from 'react-i18next';
import GlassCard from '@/components/GlassCard';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
const PIE_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

const userGrowthData = [
  { day: 'Mon', users: 12 }, { day: 'Tue', users: 18 },
  { day: 'Wed', users: 25 }, { day: 'Thu', users: 30 },
  { day: 'Fri', users: 38 }, { day: 'Sat', users: 42 },
  { day: 'Sun', users: 50 },
];

const hourlyCallsData = [
  { hour: '00', today: 23, yesterday: 18 },
  { hour: '03', today: 15, yesterday: 12 },
  { hour: '06', today: 45, yesterday: 38 },
  { hour: '09', today: 128, yesterday: 105 },
  { hour: '12', today: 210, yesterday: 187 },
  { hour: '15', today: 175, yesterday: 160 },
  { hour: '18', today: 98, yesterday: 85 },
  { hour: '21', today: 56, yesterday: 42 },
];

const callTypeData = [
  { name: 'JavaScript', value: 340 },
  { name: 'PHP', value: 220 },
  { name: 'Python', value: 180 },
  { name: 'cURL', value: 120 },
  { name: 'Other', value: 40 },
];

const revenueData = [
  { hour: '00', amount: 2.5 }, { hour: '03', amount: 1.8 },
  { hour: '06', amount: 5.2 }, { hour: '09', amount: 18.6 },
  { hour: '12', amount: 32.4 }, { hour: '15', amount: 28.9 },
  { hour: '18', amount: 12.3 }, { hour: '21', amount: 7.5 },
];

const glassTooltipStyle = {
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.6)',
  fontSize: 12,
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
};

export default function AdminCallOverviewPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-24 px-4 md:px-8">
      <div className="fixed top-10 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t('admin_call_overview')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* 1. User Growth */}
          <GlassCard className="p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-4">{t('user_growth')}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="gradUser" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={glassTooltipStyle} />
                <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2.5} fill="url(#gradUser)" dot={{ r: 3, fill: '#fff', stroke: '#6366f1', strokeWidth: 2 }} activeDot={{ r: 5, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* 2. Today's Calls */}
          <GlassCard className="p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-4">{t('today_calls')}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={hourlyCallsData}>
                <defs>
                  <linearGradient id="gradCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={glassTooltipStyle} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#6b7280' }} />
                <Line type="monotone" dataKey="today" name={t('today')} stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: '#6366f1' }} />
                <Line type="monotone" dataKey="yesterday" name={t('yesterday')} stroke="#d1d5db" strokeWidth={2} strokeDasharray="5 5" dot={false} activeDot={{ r: 4, fill: '#d1d5db' }} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* 3. Call Type Distribution */}
          <GlassCard className="p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-4">{t('call_type_distribution')}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <defs>
                  {PIE_COLORS.map((color, i) => (
                    <linearGradient key={i} id={`gradPie${i}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.85} />
                      <stop offset="100%" stopColor={color} stopOpacity={1} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie data={callTypeData} cx="50%" cy="50%" innerRadius={48} outerRadius={88} paddingAngle={4} dataKey="value">
                  {callTypeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#gradPie${index})`} stroke="rgba(255,255,255,0.4)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={glassTooltipStyle} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#6b7280' }} />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* 4. Today's Revenue */}
          <GlassCard className="p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-4">{t('today_revenue')} (USD)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData}>
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={glassTooltipStyle} formatter={(v: number) => [`$${v.toFixed(2)}`, t('today_revenue')]} />
                <Bar dataKey="amount" fill="url(#gradRevenue)" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}