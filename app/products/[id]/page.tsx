import { Navbar } from "@/components/navbar"
import { CaseStudyData } from "@/components/editorial-case-study"
import CaseUseProject from "@/components/case-use-project"
import { SiteFooter } from "@/components/site-footer"
import { getServerLocale } from "@/lib/i18n-server"
import { getTranslation } from "@/lib/i18n"
import { notFound } from "next/navigation"

// Mock database
const productsData: Record<string, CaseStudyData> = {
  "kioskito": {
    title: "Kioskito",
    features: [
      {
        title: "backend robusto",
        description: "Infraestructura escalable y segura para manejar cientos de transacciones y control de stock en tiempo real."
      },
      {
        title: "frontend ágil",
        description: "Interfaz diseñada para la velocidad. Punto de venta amigable que reduce la fricción y el tiempo de cobro."
      },
      {
        title: "branding",
        description: "Identidad visual que transmite confianza y modernidad, alejándose de los sistemas de gestión tradicionales y aburridos."
      }
    ],
    location: "Córdoba, Argentina",
    descriptionParagraphs: [
      "Gestiona tu negocio sin complicaciones. Kioskito es un sistema integral de Punto de Venta y gestión administrativa diseñado para comercios. Administrá ventas y productos en un entorno claro y amigable.",
      "Kioskito nace para resolver problemas de manera simple, rápida y confiable, transformando el desorden en crecimiento, un negocio a la vez."
    ],
    logoUrl: "https://kioskito-web.vercel.app/kioskito-original.png",
    screenshotUrl: "/kioskito-landing/landing_1.png",
    screenshots: [
      "/kioskito-landing/landing_1.png",
      "/kioskito-landing/landing_2.png",
      "/kioskito-landing/landing_3.png",
      "/kioskito-landing/landing_4.png",
      "/kioskito-landing/landing_5.png"
    ],
    websiteUrl: "https://kioskito-web.vercel.app"
  },
  "agropilot": {
    title: "Agropilot",
    features: [
      {
        title: "diseño orientado a conversión",
        description: "Arquitectura de la información pensada para guiar al productor agrícola desde el problema hasta el contacto directo, maximizando la generación de leads."
      },
      {
        title: "identidad visual y UI",
        description: "Desarrollo de una interfaz limpia y moderna que transmite la alta tecnología y precisión del producto, destacando visualmente la propuesta de valor."
      },
      {
        title: "rendimiento y accesibilidad",
        description: "Implementación optimizada para tiempos de carga ultrarrápidos, asegurando una navegación fluida incluso desde dispositivos móviles en zonas rurales con conectividad limitada."
      }
    ],
    location: "Argentina",
    descriptionParagraphs: [
      "Para el lanzamiento de Agropilot, desarrollamos una presencia digital estratégica enfocada en comunicar de manera simple y directa un producto de alta complejidad tecnológica.",
      "El proyecto se centró en estructurar la información para resolver objeciones comunes del sector agrícola, acompañando esto con un diseño que inspira confianza, rendimiento técnico impecable y flujos optimizados hacia la conversión."
    ],
    logoUrl: "https://agropilot.vercel.app/logo.svg",
    screenshotUrl: "/agropilot-landing/agropilot-landing-1.png",
    screenshots: [
      "/agropilot-landing/agropilot-landing-1.png",
      "/agropilot-landing/agropilot-landing-2.png",
      "/agropilot-landing/agropilot-landing-3.png"
    ],
    websiteUrl: "https://agropilot.vercel.app"
  },
  "inner-echo": {
    title: "Inner Echo",
    features: [
      {
        title: "brand strategy",
        description: "Reimaginamos la creación de marcas como un proceso de escucha interna, conectando valores y narrativas."
      },
      {
        title: "verbal identity",
        description: "Desarrollo de un tono de voz único que permite a la marca comunicarse con claridad y sugestión."
      },
      {
        title: "visual system",
        description: "Diseño de un sistema visual flexible que deja espacio para que la marca crezca y evolucione hacia el futuro."
      }
    ],
    location: "Rotterdam, Netherlands",
    descriptionParagraphs: [
      "Inner Echo reimagines brand creation as a process of internal listening—where values, contradictions, and untold narratives shape a resonant identity.",
      "The work blurs the boundary between clarity and suggestion, leaving room for brands to grow into their future selves."
    ],
    logoUrl: "https://images.unsplash.com/photo-1558304970-abd589baebe5?auto=format&fit=crop&q=80&w=800",
    screenshotUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    websiteUrl: "https://example.com"
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
        <main className="min-h-screen bg-background relative overflow-hidden">
            <div
              className="fixed inset-0 pointer-events-none opacity-30 z-50"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
            <Navbar navT={t.navbar} commonT={t.common} currentLocale={locale} />
            <CaseUseProject data={data} t={t.caseUseProject} />
        </main>
    )
}
