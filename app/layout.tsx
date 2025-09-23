import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ogun Carpentry - Master Craftsmen of Wood & Metal",
  description:
    "Professional carpentry services combining traditional craftsmanship with modern techniques. From custom woodwork to metal fabrication, we build with the strength of Ogun.",
  keywords: "carpentry, woodworking, custom furniture, metal work, craftsmanship, Ogun, traditional techniques, custom millwork",
  authors: [{ name: "Ogun Carpentry" }],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
