import { Navbar } from "@/components/navbar"
import { EditorialWorksList, Project } from "@/components/editorial-works-list"
import { getServerLocale } from "@/lib/i18n-server"
import { getTranslation } from "@/lib/i18n"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Productos y Casos de Éxito | HITLABS',
  description: 'Conoce nuestras soluciones de software y proyectos realizados.',
}

const productsList: Project[] = [
  {
    id: "kioskito",
    index: "01",
    title: "Kioskito",
    subtitle: "POS / DELIVERY PLATFORM",
    services: "POS • DELIVERY • SOFTWARE",
    year: "2026",
    href: "/products/kioskito",
    images: ["/kioskito.svg"]
  },
  {
    id: "agropilot",
    index: "02",
    title: "AGROPILOT",
    subtitle: "PRECISION AGRICULTURE",
    services: "HARDWARE • SOFTWARE • RTK",
    year: "2026",
    href: "/products/agropilot",
    images: ["https://agropilot.vercel.app/logo.svg"]
  },
  {
    id: "fk-fede",
    index: "03",
    title: "FEDERICO KAENEL",
    subtitle: "PERSONAL BRANDING",
    services: "IDENTITY • DESIGN • WEB • PORTFOLIO",
    year: "2026",
    href: "/products/fk-fede",
    images: ["/fede.png"]
  },
  {
    id: "bienhecho",
    index: "04",
    title: "BIEN HECHO",
    subtitle: "QUALITY ASSURANCE",
    services: "BRANDING • STRATEGY • SOFTWARE",
    year: "2026",
    href: "/products/bienhecho",
    images: ["/bienhecho.svg"]
  }
]

export default async function ProductsPage() {
    const locale = await getServerLocale()
    const t = getTranslation(locale)

    return (
        <main className="min-h-screen bg-[#f8f9fa] pt-16 relative overflow-hidden">
            <div
                className="fixed inset-0 pointer-events-none opacity-30 z-50"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            <Navbar navT={t.navbar} commonT={t.common} currentLocale={locale} />
            <EditorialWorksList 
                title={t.worksList.title} 
                subtitle={t.worksList.subtitle} 
                viewAllText={t.worksList.explore}
                projects={productsList} 
            />
        </main>
    )
}
