import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { SITE_NAME } from '@/lib/constants'
import { Providers } from '@/components/Providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: `${SITE_NAME} — AI-Powered Creative Studio`,
  description: 'Xerironx Studio democratizes AI creativity — enabling anyone, anywhere, to build, design, and innovate with multi-modal AI. Generate text, code, images, and websites from a single platform.',
  keywords: 'AI studio, code generation, image creation, website builder, multi-modal AI, creative platform, Xerironx',
  authors: [{ name: SITE_NAME }],
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/xerironx logo.png',
    },
    {
      rel: 'apple-touch-icon',
      url: '/xerironx logo.png',
    },
    {
      rel: 'shortcut icon',
      url: '/xerironx logo.png',
    }
  ],
  openGraph: {
    title: `${SITE_NAME} — AI-Powered Creative Studio`,
    description: 'Democratize AI creativity with text, code, image, and website generation in one platform',
    type: 'website',
    images: ['/xerironx logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — AI-Powered Creative Studio`,
    description: 'Democratize AI creativity with text, code, image, and website generation in one platform',
    images: ['/xerironx logo.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="min-h-screen font-sans antialiased bg-background text-text selection:bg-primary/15 selection:text-primary">
        <Script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js" type="module" strategy="afterInteractive" />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
