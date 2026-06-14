import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useLangStore } from '@/stores/langStore';
import { useIsMobile } from '@/hooks/useIsMobile';
import { t, Lang } from '@/i18n/translations';

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuthStore();
  const { lang, setLang } = useLangStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const i18n = t(lang);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLangToggle = () => {
    const newLang: Lang = lang === 'en' ? 'zh-TW' : 'en';
    setLang(newLang);
  };

  const isActive = (path: string) => location.pathname === path;

  // Determine where "Me" links to
  const meLink = isAuthenticated
    ? currentUser?.role === 'admin'
      ? '/admin'
      : '/dashboard'
    : '/login';

  const navContent = (
    <>
      <Link to="/" className="text-sm font-medium tracking-wide">
        HotUpdate
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          to="/"
          className={`text-sm transition-opacity ${
            isActive('/') ? 'opacity-100' : 'opacity-60 hover:opacity-100'
          }`}
        >
          {i18n.nav.home}
        </Link>
        <Link
          to={meLink}
          className={`text-sm transition-opacity ${
            isActive(meLink) ? 'opacity-100' : 'opacity-60 hover:opacity-100'
          }`}
        >
          {i18n.nav.me}
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLangToggle}
          className="text-xs font-mono opacity-60 hover:opacity-100 transition-opacity"
        >
          {lang === 'en' ? '繁中' : 'EN'}
        </button>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="text-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            {i18n.nav.logout}
          </button>
        ) : (
          <Link
            to="/login"
            className="text-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            {i18n.nav.login}
          </Link>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 glass-nav rounded-2xl shadow-lg">
        <div className="flex items-center justify-around py-3 px-4">
          {navContent}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-6 left-6 right-6 z-50 glass-nav rounded-2xl shadow-lg">
      <div className="flex items-center justify-between py-4 px-8">
        {navContent}
      </div>
    </div>
  );
}
