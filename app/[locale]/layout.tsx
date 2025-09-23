import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import type {Metadata} from "next"
import {GeistSans} from "geist/font/sans"
import {GeistMono} from "geist/font/mono"
import {Analytics} from "@vercel/analytics/next"
import {Suspense} from "react"
import "../globals.css"
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'
import {LanguageSwitcher} from '@/components/language-switcher'

export const metadata: Metadata = {
  title: "Ogun Carpentry - Master Craftsmen of Wood & Metal",
  description:
    "Professional carpentry services combining traditional craftsmanship with modern techniques. From custom woodwork to metal fabrication, we build with the strength of Ogun.",
  keywords: "carpentry, woodworking, custom furniture, metal work, craftsmanship, Ogun, traditional techniques, custom millwork",
  authors: [{name: "Ogun Carpentry"}],
  creator: "Ogun Carpentry",
  publisher: "Ogun Carpentry",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://oguncarpentry.com"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/ogun_carpentry_logo.webp",
    apple: "/ogun_carpentry_logo.webp",
  },
  openGraph: {
    title: "Ogun Carpentry - Master Craftsmen of Wood & Metal",
    description: "Professional carpentry services combining traditional craftsmanship with modern techniques.",
    url: "https://oguncarpentry.com",
    siteName: "Ogun Carpentry",
    images: [
      {
        url: "/ogun-carpentry-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ogun Carpentry - Master Craftsmen",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ogun Carpentry - Master Craftsmen of Wood & Metal",
    description: "Professional carpentry services combining traditional craftsmanship with modern techniques.",
    images: ["/ogun-carpentry-og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <Header />
            {children}
            <Footer />
          </Suspense>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}