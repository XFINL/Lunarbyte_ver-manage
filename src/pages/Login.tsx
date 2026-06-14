import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import GlassCard from '@/components/GlassCard';
import { useAuthStore } from '@/stores/authStore';
import { useLangStore } from '@/stores/langStore';
import { t } from '@/i18n/translations';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { lang } = useLangStore();
  const i18n = t(lang);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError(i18n.login.errorEmpty);
      return;
    }

    const success = login(username, password);
    if (success) {
      const user = useAuthStore.getState().currentUser;
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(i18n.login.errorInvalid);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <Navbar />

      <GlassCard hover={false} className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">{i18n.login.title}</h1>
            <p className="text-sm text-gray-500">
              {i18n.login.hint}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{i18n.login.username}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-glass"
              placeholder={i18n.login.usernamePlaceholder}
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{i18n.login.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass"
              placeholder={i18n.login.passwordPlaceholder}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            {i18n.login.submit}
          </button>
        </form>
      </GlassCard>
    </div>
  );
}
