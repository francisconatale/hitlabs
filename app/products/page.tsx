import { Navbar } from "@/components/navbar"
import { ProductsSection } from "@/components/products-section"
import { SiteFooter } from "@/components/site-footer"
import { getServerLocale } from "@/lib/i18n-server"
import { getTranslation } from "@/lib/i18n"

export default async function ProductsPage() {
    const locale = await getServerLocale()
    const t = getTranslation(locale)

    return (
        <main className="min-h-screen bg-background pt-16">
            <Navbar navT={t.navbar} commonT={t.common} currentLocale={locale} />
            <div className="py-12">
                <ProductsSection productsT={t.products} commonT={t.common} />
            </div>
            <SiteFooter commonT={t.common} />
        </main>
    )
}
