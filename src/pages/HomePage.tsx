import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export default function HomePage() {
  const { t } = useTranslation();
  const { isLoggedIn, user } = useAuthStore();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-8 items-end">
          {/* Main Title - Left */}
          <div className="md:col-span-7">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
              {t('hero_title')}
            </h1>
          </div>

          {/* Subtitle - Right aligned */}
          <div className="md:col-span-5 md:text-right">
            <p className="text-lg md:text-xl lg:text-2xl font-light tracking-wide text-white/70">
              {t('hero_subtitle')}
            </p>
          </div>

          {/* Description - Left offset */}
          <div className="md:col-span-8 md:col-start-1">
            <p className="text-base md:text-lg font-light leading-relaxed text-white/50 max-w-xl">
              {t('hero_description')}
            </p>
          </div>

          {/* CTA */}
          <div className="md:col-span-4 md:text-right">
            {isLoggedIn ? (
              <Link
                to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                className="inline-block px-8 py-3 border border-white/30 text-white text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
              >
                {t('dashboard')}
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-block px-8 py-3 border border-white/30 text-white text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
              >
                {t('cta_button')}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Feature 1 - Full width */}
            <div className="md:col-span-12">
              <div className="border-t border-white/20 pt-8">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {t('feature_1_title')}
                </h3>
                <p className="text-white/50 text-lg font-light max-w-2xl leading-relaxed">
                  {t('feature_1_desc')}
                </p>
              </div>
            </div>

            {/* Feature 2 - Right offset */}
            <div className="md:col-span-8 md:col-start-5">
              <div className="border-t border-white/20 pt-8">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {t('feature_2_title')}
                </h3>
                <p className="text-white/50 text-lg font-light max-w-xl leading-relaxed">
                  {t('feature_2_desc')}
                </p>
              </div>
            </div>

            {/* Feature 3 - Left */}
            <div className="md:col-span-6">
              <div className="border-t border-white/20 pt-8">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {t('feature_3_title')}
                </h3>
                <p className="text-white/50 text-lg font-light max-w-lg leading-relaxed">
                  {t('feature_3_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[50vh] flex items-center px-6 md:px-16 lg:px-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]">
              {t('cta_title')}
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p className="text-white/50 text-lg font-light mb-6">
              {t('cta_subtitle')}
            </p>
            <div className="flex flex-col items-end gap-4">
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="inline-block px-8 py-3 border border-white/30 text-white text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
                >
                  {t('cta_button')}
                </Link>
              )}
              <Link
                to="/docs"
                className="text-sm text-white/40 font-light tracking-wider uppercase hover:text-white/70 transition-colors"
              >
                {t('view_docs')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xs text-white/30 font-light tracking-widest uppercase">
            {t('platform_name')}
          </span>
          <span className="text-xs text-white/20 font-light">
            {t('platform_tagline')}
          </span>
        </div>
      </footer>
    </div>
  );
}