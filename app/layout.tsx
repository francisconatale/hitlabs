import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LanguageProvider } from '@/components/language-provider'
import { dictionaries, defaultLocale } from '@/lib/i18n'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-display'
});

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans'
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: '--font-script'
});

export const metadata: Metadata = {
  title: `Plug | ${dictionaries[defaultLocale].layout.titleSuffix}`,
  description: dictionaries[defaultLocale].layout.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={defaultLocale}>
      <body className={`${bebasNeue.variable} ${inter.variable} ${caveat.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
