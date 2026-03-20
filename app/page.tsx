import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ScrollCanvas } from "@/components/scroll-canvas"
import { FeaturesGrid } from "@/components/features-grid"
import { SocialProof } from "@/components/social-proof"
import { FinalCTA } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"
import { getServerLocale } from "@/lib/i18n-server"
import { getTranslation } from "@/lib/i18n"

export default async function HomePage() {
  const locale = await getServerLocale()
  const t = getTranslation(locale)

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar navT={t.navbar} commonT={t.common} currentLocale={locale} />
      <Hero heroT={t.hero} />
      <ScrollCanvas scrollT={t.scrollCanvas} />
      <FeaturesGrid featuresT={t.features} />
      <SocialProof socialT={t.socialProof} />
      <FinalCTA finalT={t.finalCta} />
      <SiteFooter commonT={t.common} />
    </main>
  )
}
