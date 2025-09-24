import {getRequestConfig} from 'next-intl/server'

export default getRequestConfig(async ({locale}) => {
  // Validate locale - ensure it's one of our supported languages
  const validLocale = locale && ['en', 'es'].includes(locale) ? locale : 'en'

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  }
})