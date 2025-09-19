import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import { SITE_NAME } from '@/lib/constants'
import { Providers } from '@/components/Providers'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const poppins = Poppins({ 
  subsets: ['latin'], 
  variable: '--font-display',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: `${SITE_NAME} — AI-Powered Creative Studio`,
  description: 'Xerironx Studio democratizes AI creativity — enabling anyone, anywhere, to build, design, and innovate with multi-modal AI. Generate text, code, images, and websites from a single platform.',
  keywords: 'AI studio, code generation, image creation, website builder, multi-modal AI, creative platform, Xerironx',
  authors: [{ name: SITE_NAME }],
  openGraph: {
    title: `${SITE_NAME} — AI-Powered Creative Studio`,
    description: 'Democratize AI creativity with text, code, image, and website generation in one platform',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — AI-Powered Creative Studio`,
    description: 'Democratize AI creativity with text, code, image, and website generation in one platform',
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
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="min-h-screen font-sans antialiased bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        <Script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js" type="module" strategy="afterInteractive" />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
