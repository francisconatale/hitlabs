import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { TranslationDict } from "@/lib/i18n"

interface ProductsSectionProps {
  productsT: TranslationDict['products']
  commonT: TranslationDict['common']
}

export function ProductsSection({ productsT, commonT }: ProductsSectionProps) {

  const products = [
    {
      id: "customSoftware",
      name: productsT.items.customSoftware.name,
      tagline: productsT.items.customSoftware.tagline,
      description: productsT.items.customSoftware.description,
      features: productsT.items.customSoftware.features,
      image: "/home/francisco/.gemini/antigravity/brain/8ca42233-7f3e-4301-9450-44c5d24d5c97/custom_software_showcase_1773627137694.png",
      accent: "bg-[#8a64ff]",
    },
    {
      id: "managementSystem",
      name: productsT.items.managementSystem.name,
      tagline: productsT.items.managementSystem.tagline,
      description: productsT.items.managementSystem.description,
      features: productsT.items.managementSystem.features,
      image: "/home/francisco/.gemini/antigravity/brain/8ca42233-7f3e-4301-9450-44c5d24d5c97/management_system_dashboard_1773627154294.png",
      accent: "bg-[#b4a0ff]",
    },
    {
      id: "deliveryModule",
      name: productsT.items.deliveryModule.name,
      tagline: productsT.items.deliveryModule.tagline,
      description: productsT.items.deliveryModule.description,
      features: productsT.items.deliveryModule.features,
      image: "/home/francisco/.gemini/antigravity/brain/8ca42233-7f3e-4301-9450-44c5d24d5c97/delivery_app_mockup_1773627175789.png",
      accent: "bg-[#9a74ff]",
    },
  ]

  return (
    <section id="product" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
          <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary">
            {productsT.badge}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            {productsT.headline}
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Image Container */}
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
                  {product.tagline}
                </p>
                <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {product.name}
                </h3>
                <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Features list */}
                <ul className="mb-8 space-y-3 mt-auto">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${product.accent}`}>
                        <Check className="h-2.5 w-2.5 text-background" />
                      </div>
                      <span className="text-xs sm:text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="group w-full">
                  {commonT.learnMore}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
