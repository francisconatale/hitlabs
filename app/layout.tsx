import type { Metadata } from 'next'
import { Bebas_Neue, Caveat, Anton } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LanguageProvider } from '@/components/language-provider'
import { dictionaries, defaultLocale } from '@/lib/i18n'

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
  title: `Hitlabs | ${dictionaries[defaultLocale].layout.titleSuffix}`,
  description: dictionaries[defaultLocale].layout.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={defaultLocale}>
      <body className={`${bebasNeue.variable} ${caveat.variable} ${anton.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
