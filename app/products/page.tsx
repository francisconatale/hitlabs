import { Navbar } from "@/components/navbar"
import { EditorialWorksList, Project } from "@/components/editorial-works-list"
import { getServerLocale } from "@/lib/i18n-server"
import { getTranslation } from "@/lib/i18n"

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
    id: "hitlabs-logo",
    index: "02",
    title: "AGROPILOT",
    subtitle: "STUDIO IDENTITY",
    services: "BRANDING • DESIGN • WEB • PRODUCT",
    year: "2026",
    href: "/products/hitlabs",
    images: ["/logo.svg"]
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
        <main className="min-h-screen bg-[#f8f9fa] pt-16">
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
