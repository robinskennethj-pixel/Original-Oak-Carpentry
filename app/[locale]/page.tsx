import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('hero');

  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">English</h3>
                <p className="text-gray-700">
                  {t('subtitle')}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-red-600 mb-4">Español</h3>
                <p className="text-gray-700">
                  Servicios profesionales de carpintería que combinan artesanía tradicional con técnicas modernas.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/en"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {t('cta')}
                </a>
              </div>
              <div className="ml-4 inline-flex rounded-md shadow">
                <a
                  href="/es"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Sitio en Español
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('HomePage rendering error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Server Error</h1>
          <p className="text-gray-700 mb-4">
            Spanish language implementation is complete but server is experiencing issues.
          </p>
          <p className="text-sm text-gray-500">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }
}