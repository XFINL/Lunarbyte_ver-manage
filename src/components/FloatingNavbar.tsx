import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function FloatingNavbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuthStore();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const isHome = location.pathname === '/';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  return (
    <nav
      className={cn(
        'fixed z-50 flex items-center justify-between px-6 py-3',
        'rounded-2xl shadow-lg shadow-black/10',
        'bg-white/70 backdrop-blur-xl border border-white/50',
        'transition-all duration-300',
        'top-3 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-lg',
        'max-md:top-auto max-md:bottom-3 max-md:w-[calc(100%-1.5rem)]'
      )}
    >
      <Link
        to="/"
        className={cn(
          'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
          isHome
            ? 'bg-black text-white'
            : 'text-gray-700 hover:bg-gray-100'
        )}
      >
        Home
      </Link>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className={cn(
              'px-3 py-2 rounded-xl text-sm font-medium',
              'transition-all duration-200 text-gray-700 hover:bg-gray-100'
            )}
          >
            Lang
          </button>
          {showLangMenu && (
            <div className="absolute right-0 bottom-full mb-1 bg-white/90 backdrop-blur-xl rounded-xl border border-white/50 shadow-lg overflow-hidden">
              {i18n.language === 'zh-TW' ? (
                <button
                  onClick={() => changeLanguage('en')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                >
                  English
                </button>
              ) : (
                <button
                  onClick={() => changeLanguage('zh-TW')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                >
                  繁體中文
                </button>
              )}
            </div>
          )}
        </div>
        {isLoggedIn && (
          <button
            onClick={logout}
            className="px-3 py-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            {t('logout')}
          </button>
        )}
      </div>
    </nav>
  );
}