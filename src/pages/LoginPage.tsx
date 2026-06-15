import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    let success: boolean;
    if (isRegister) {
      success = register(email, password);
      if (!success) setError('Email already exists');
    } else {
      success = login(email, password);
      if (!success) setError('Invalid email or password');
    }

    if (success) {
      const user = useAuthStore.getState().user;
      navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Decorative blurred circles */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="rounded-3xl border border-white/40 bg-white/30 backdrop-blur-2xl shadow-2xl shadow-black/5 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {isRegister ? t('register') : t('login')}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {t('platform_name')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                {t('email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20 transition-all"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all duration-200"
            >
              {isRegister ? t('register_button') : t('login_button')}
            </button>
          </form>

          <div className="mt-5 text-center">
            <span className="text-xs text-gray-500">
              {isRegister ? t('has_account') : t('no_account')}{' '}
            </span>
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="text-xs font-medium text-black hover:underline"
            >
              {isRegister ? t('switch_to_login') : t('switch_to_register')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}