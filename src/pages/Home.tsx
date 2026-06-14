import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useLangStore } from '@/stores/langStore';
import { t } from '@/i18n/translations';

export default function Home() {
  const { lang } = useLangStore();
  const i18n = t(lang);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section - Swiss Modernist */}
      <section className="pt-40 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light leading-none tracking-tight">
                {i18n.home.heroTitle}
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight mt-4 tracking-tight text-gray-400">
                {i18n.home.heroSubtitle}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 mt-16">
            <div className="col-span-12 md:col-span-5 md:col-start-1">
              <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300">
                {i18n.home.heroDesc}
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-8 flex md:justify-end items-start">
              <Link
                to="/login"
                className="inline-block px-10 py-4 bg-white text-black text-sm font-medium tracking-wide hover:bg-gray-200 transition-colors"
              >
                {i18n.home.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Swiss Grid */}
      <section className="py-32 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-medium tracking-widest text-gray-500 uppercase">
              {i18n.home.features}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <div className="border-t border-white pt-8">
              <span className="text-xs font-mono text-gray-500">01</span>
              <h3 className="text-2xl md:text-3xl font-light mt-4 mb-6 tracking-tight">
                {i18n.home.feature1Title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-gray-400">
                {i18n.home.feature1Desc}
              </p>
            </div>

            <div className="border-t border-white pt-8">
              <span className="text-xs font-mono text-gray-500">02</span>
              <h3 className="text-2xl md:text-3xl font-light mt-4 mb-6 tracking-tight">
                {i18n.home.feature2Title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-gray-400">
                {i18n.home.feature2Desc}
              </p>
            </div>

            <div className="border-t border-white pt-8">
              <span className="text-xs font-mono text-gray-500">03</span>
              <h3 className="text-2xl md:text-3xl font-light mt-4 mb-6 tracking-tight">
                {i18n.home.feature3Title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-gray-400">
                {i18n.home.feature3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-light tracking-widest text-gray-500">
            {i18n.home.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}
