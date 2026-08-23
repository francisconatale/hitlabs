import type { Metadata } from 'next'
import { Bebas_Neue, Caveat, Anton, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LanguageProvider } from '@/components/language-provider'
import { dictionaries, defaultLocale } from '@/lib/i18n'

const manrope = Manrope({
  subsets: ["latin"],
  variable: '--font-manrope'
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-display'
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: '--font-script'
});

const anton = Anton({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-anton'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hitlabs.vercel.app'),
  title: `HITLABS | ${dictionaries[defaultLocale].layout.titleSuffix}`,
  description: dictionaries[defaultLocale].layout.description,
  appleWebApp: {
    title: 'HITLABS',
  },
  openGraph: {
    title: `HITLABS | ${dictionaries[defaultLocale].layout.titleSuffix}`,
    description: dictionaries[defaultLocale].layout.description,
    siteName: 'HITLABS',
    type: 'website',
    url: 'https://hitlabs.vercel.app',
    images: [
      {
        url: '/hitlabs.png',
        width: 1200,
        height: 630,
        alt: 'HITLABS',
      }
    ]
  },
  alternates: {
    canonical: 'https://hitlabs.vercel.app',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={defaultLocale}>
      <body className={`${manrope.variable} ${bebasNeue.variable} ${caveat.variable} ${anton.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'HITLABS',
              url: 'https://hitlabs.vercel.app',
              logo: 'https://hitlabs.vercel.app/hitlabs.png',
            })
          }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
