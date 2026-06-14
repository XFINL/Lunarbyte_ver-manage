import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import GlassCard from '@/components/GlassCard';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            热更新 API
            <br />
            快速平台
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            为 App 开发者提供统一的热更新配置管理平台，简化版本发布流程
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login" className="btn-primary text-base px-8 py-4">
              立即开始
            </Link>
            <a href="#features" className="btn-secondary text-base px-8 py-4">
              了解更多
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            核心功能
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                  <i className="iconfont icon-api text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold">热更新 API</h3>
                <p className="text-gray-600">
                  标准化的 API 接口，快速集成热更新功能，支持多平台应用
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                  <i className="iconfont icon-version text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold">版本管理</h3>
                <p className="text-gray-600">
                  灵活的版本配置，支持版本号、下载地址、更新日志管理
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                  <i className="iconfont icon-multi-app text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold">多应用支持</h3>
                <p className="text-gray-600">
                  一个账号管理多个应用，独立配置，互不干扰
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          <p>HotUpdate API Platform - 热更新快速平台</p>
        </div>
      </footer>
    </div>
  );
}
