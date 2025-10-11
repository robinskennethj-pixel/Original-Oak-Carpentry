import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Original Oak Carpentry - Master Craftsmen of Wood",
  description:
    "Professional carpentry services combining traditional craftsmanship with modern techniques. From custom woodwork to precision finishes, we build with the strength and durability of oak.",
  keywords: "carpentry, woodworking, custom furniture, oak carpentry, traditional techniques, custom millwork, finish carpentry",
  authors: [{ name: "Original Oak Carpentry" }],
  creator: "Original Oak Carpentry",
  publisher: "Original Oak Carpentry",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://originaloakcarpentry.com"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/ORIGINAL OAK CARPENTRY LOGO.png",
    apple: "/ORIGINAL OAK CARPENTRY LOGO.png",
  },
  openGraph: {
    title: "Original Oak Carpentry - Master Craftsmen of Wood",
    description: "Professional carpentry services combining traditional craftsmanship with modern techniques.",
    url: "https://originaloakcarpentry.com",
    siteName: "Original Oak Carpentry",
    images: [
      {
        url: "/original-oak-carpentry-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Original Oak Carpentry - Master Craftsmen",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Original Oak Carpentry - Master Craftsmen of Wood",
    description: "Professional carpentry services combining traditional craftsmanship with modern techniques.",
    images: ["/original-oak-carpentry-og-image.jpg"],
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
