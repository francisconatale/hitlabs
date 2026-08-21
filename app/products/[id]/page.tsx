import { Navbar } from "@/components/navbar"
import { EditorialCaseStudy, CaseStudyData } from "@/components/editorial-case-study"
import { SiteFooter } from "@/components/site-footer"
import { getServerLocale } from "@/lib/i18n-server"
import { getTranslation } from "@/lib/i18n"
import { notFound } from "next/navigation"

// Mock database
const productsData: Record<string, CaseStudyData> = {
  "kioskito": {
    title: "Kioskito",
    services: ["Backend", "Frontend", "Branding"],
    location: "Córdoba, Argentina",
    descriptionParagraphs: [
      "Gestiona tu negocio sin complicaciones. Kioskito es un sistema integral de Punto de Venta y gestión administrativa diseñado para comercios. Administrá ventas y productos en un entorno claro y amigable.",
      "Kioskito nace para resolver problemas de manera simple, rápida y confiable, transformando el desorden en crecimiento, un negocio a la vez."
    ],
    logoUrl: "https://kioskito-web.vercel.app/kioskito-original.png",
    screenshotUrl: "https://kioskito-web.vercel.app/landing/landing_1.png"
  },
  "inner-echo": {
    title: "Inner Echo",
    services: ["Brand Strategy", "Verbal Identity", "Visual System Design", "Cultural Positioning"],
    location: "Rotterdam, Netherlands",
    descriptionParagraphs: [
      "Inner Echo reimagines brand creation as a process of internal listening—where values, contradictions, and untold narratives shape a resonant identity.",
      "The work blurs the boundary between clarity and suggestion, leaving room for brands to grow into their future selves."
    ],
    logoUrl: "https://images.unsplash.com/photo-1558304970-abd589baebe5?auto=format&fit=crop&q=80&w=800",
    screenshotUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const locale = await getServerLocale()
    const t = getTranslation(locale)
    
    const resolvedParams = await params
    const data = productsData[resolvedParams.id]
    
    if (!data) {
      notFound()
    }

    return (
        <main className="min-h-screen bg-background pt-16">
            <Navbar navT={t.navbar} commonT={t.common} currentLocale={locale} />
            <EditorialCaseStudy data={data} />
            
        </main>
    )
}
