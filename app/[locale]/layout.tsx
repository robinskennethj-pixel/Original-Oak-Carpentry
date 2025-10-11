export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Simple locale handling without next-intl to avoid Jest worker issues
  const validLocale = locale === 'es' ? 'es' : 'en';

  // Basic messages for fallback
  const messages = {
    hero: {
      title: validLocale === 'es' ? 'Carpintería Oak Original' : 'Original Oak Carpentry',
      subtitle: validLocale === 'es' ? 'Servicios profesionales de carpintería' : 'Professional carpentry services',
      cta: validLocale === 'es' ? 'Obtener Cotización' : 'Get Quote'
    },
    about: {
      title: validLocale === 'es' ? 'Acerca de Carpintería Oak Original' : 'About Original Oak Carpentry',
      description: validLocale === 'es'
        ? 'En Carpintería Oak Original, honramos la tradición eterna de la artesanía mientras abrazamos la innovación moderna. Nuestro nombre refleja nuestro compromiso de construir con la fuerza y durabilidad del roble, creando piezas que resisten la prueba del tiempo con precisión y propósito.'
        : 'At Original Oak Carpentry, we honor the timeless tradition of craftsmanship while embracing modern innovation. Our name reflects our commitment to building with the strength and durability of oak, creating pieces that stand the test of time with precision and purpose.'
    }
  };

  return (
    <html lang={validLocale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {validLocale === 'es' ? 'Carpintería Oak Original - Servicios Profesionales' : 'Original Oak Carpentry - Professional Services'}
        </title>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }} />
        {/* Meta Pixel / Facebook Pixel */}
        <script dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `
        }} />
        <noscript>
          <img height="1" width="1" style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body>
        <div className="min-h-screen bg-white" data-locale={validLocale}>
          {children}
        </div>
      </body>
    </html>
  );
}