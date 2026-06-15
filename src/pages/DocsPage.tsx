import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import GlassCard from '@/components/GlassCard';
import { ArrowLeft, Copy, Check, Code } from 'lucide-react';
import { useState } from 'react';

export default function DocsPage() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState('');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  const baseUrl = 'https://api.hotupdate.example.com/v1';

  const curlExample = `curl -X GET "${baseUrl}/check-update" \\
  -H "Authorization: Bearer hk_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "app_uid": "26AbCd06EfGh14IjKl09MnOp30QrSt",
    "version": "1.0.0"
  }'`;

  const responseExample = `{
  "code": 0,
  "message": "success",
  "data": {
    "has_update": true,
    "latest_version": "1.1.0",
    "download_url": "https://cdn.example.com/releases/v1.1.0.zip",
    "changelog": "- Fixed crash on startup\\n- Improved performance",
    "size": 15728640,
    "force_update": false
  }
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-24 px-4 md:px-8">
      <div className="fixed top-10 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft size={16} />
          {t('back')}
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('docs')}</h1>
        <p className="text-sm text-gray-500 mb-10">{t('tutorial_intro')}</p>

        {/* Tutorial Steps */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('api_tutorial')}</h2>
          <div className="space-y-4">
            {['step1', 'step2', 'step3', 'step4'].map((step, i) => (
              <GlassCard key={step} className="p-5">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {t(`${step}_title`)}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {t(`${step}_desc`)}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* API Endpoints */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('api_endpoints')}</h2>

          <GlassCard className="p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-0.5 rounded-lg bg-green-100 text-green-700 text-xs font-bold uppercase font-mono">
                GET
              </span>
              <code className="text-sm font-mono text-gray-900">{baseUrl}/check-update</code>
            </div>
            <p className="text-sm text-gray-500 mb-6">{t('endpoint_desc_check')}</p>

            {/* Headers */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">{t('headers')}</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/30">
                      <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t('params')}</th>
                      <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t('type')}</th>
                      <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t('required')}</th>
                      <th className="text-left py-2 text-xs font-medium text-gray-500">{t('description')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/20">
                      <td className="py-2.5 pr-4 font-mono text-gray-900">Authorization</td>
                      <td className="py-2.5 pr-4 text-gray-500">string</td>
                      <td className="py-2.5 pr-4">
                        <span className="text-amber-600 text-xs font-medium">{t('required')}</span>
                      </td>
                      <td className="py-2.5 text-gray-500">Bearer hk_YOUR_API_KEY</td>
                    </tr>
                    <tr className="border-b border-white/20">
                      <td className="py-2.5 pr-4 font-mono text-gray-900">Content-Type</td>
                      <td className="py-2.5 pr-4 text-gray-500">string</td>
                      <td className="py-2.5 pr-4">
                        <span className="text-amber-600 text-xs font-medium">{t('required')}</span>
                      </td>
                      <td className="py-2.5 text-gray-500">application/json</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Body Parameters */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">{t('params')} (Body)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/30">
                      <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t('params')}</th>
                      <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t('type')}</th>
                      <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t('required')}</th>
                      <th className="text-left py-2 text-xs font-medium text-gray-500">{t('description')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/20">
                      <td className="py-2.5 pr-4 font-mono text-gray-900">app_uid</td>
                      <td className="py-2.5 pr-4 text-gray-500">string</td>
                      <td className="py-2.5 pr-4">
                        <span className="text-amber-600 text-xs font-medium">{t('required')}</span>
                      </td>
                      <td className="py-2.5 text-gray-500">{t('param_app_uid')}</td>
                    </tr>
                    <tr className="border-b border-white/20">
                      <td className="py-2.5 pr-4 font-mono text-gray-900">version</td>
                      <td className="py-2.5 pr-4 text-gray-500">string</td>
                      <td className="py-2.5 pr-4">
                        <span className="text-amber-600 text-xs font-medium">{t('required')}</span>
                      </td>
                      <td className="py-2.5 text-gray-500">{t('param_version')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Response */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">{t('response')}</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/30">
                      <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t('params')}</th>
                      <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t('type')}</th>
                      <th className="text-left py-2 text-xs font-medium text-gray-500">{t('description')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/20">
                      <td className="py-2.5 pr-4 font-mono text-gray-900">data.has_update</td>
                      <td className="py-2.5 pr-4 text-gray-500">boolean</td>
                      <td className="py-2.5 text-gray-500">{t('res_has_update')}</td>
                    </tr>
                    <tr className="border-b border-white/20">
                      <td className="py-2.5 pr-4 font-mono text-gray-900">data.latest_version</td>
                      <td className="py-2.5 pr-4 text-gray-500">string</td>
                      <td className="py-2.5 text-gray-500">{t('res_latest_version')}</td>
                    </tr>
                    <tr className="border-b border-white/20">
                      <td className="py-2.5 pr-4 font-mono text-gray-900">data.download_url</td>
                      <td className="py-2.5 pr-4 text-gray-500">string</td>
                      <td className="py-2.5 text-gray-500">{t('res_download_url')}</td>
                    </tr>
                    <tr className="border-b border-white/20">
                      <td className="py-2.5 pr-4 font-mono text-gray-900">data.changelog</td>
                      <td className="py-2.5 pr-4 text-gray-500">string</td>
                      <td className="py-2.5 text-gray-500">{t('res_changelog')}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-gray-900">data.size</td>
                      <td className="py-2.5 pr-4 text-gray-500">number</td>
                      <td className="py-2.5 text-gray-500">Package size in bytes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </GlassCard>

          {/* Example Request */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Code size={16} />
              {t('example_request')}
            </h3>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 text-xs p-5 rounded-2xl overflow-x-auto leading-relaxed">
                {curlExample}
              </pre>
              <button
                onClick={() => handleCopy(curlExample)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-gray-400 hover:text-white"
              >
                {copied === curlExample ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Example Response */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Code size={16} />
              {t('example_response')}
            </h3>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 text-xs p-5 rounded-2xl overflow-x-auto leading-relaxed">
                {responseExample}
              </pre>
              <button
                onClick={() => handleCopy(responseExample)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-gray-400 hover:text-white"
              >
                {copied === responseExample ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}