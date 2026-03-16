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
    <main className="min-h-screen bg-background">
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
