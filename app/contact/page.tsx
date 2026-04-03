import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { getServerLocale } from "@/lib/i18n-server"
import { getTranslation } from "@/lib/i18n"
import { ContactForm } from "@/components/contact-form"
import * as motion from "framer-motion/client"

export default async function ContactPage() {
    const locale = await getServerLocale()
    const t = getTranslation(locale)
    const contactT = t.contact

    return (
        <main className="min-h-screen bg-background pt-16">
            <Navbar navT={t.navbar} commonT={t.common} currentLocale={locale} />
            
            <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 overflow-hidden">
                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none -z-10">
                    <span className="font-[family-name:var(--font-display)] text-[25vw] text-primary/5 tracking-tighter whitespace-nowrap uppercase">
                        CONTACT
                    </span>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                        {/* Info Column */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="text-[10px] tracking-[0.3em] text-primary/60 uppercase mb-6">— LET'S COLLABORATE</div>
                            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl text-primary tracking-tighter leading-none mb-8">
                                {contactT.headline}
                            </h1>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-md tracking-wide">
                                {contactT.subheadline}
                            </p>
                            
                            <div className="mt-12 space-y-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] tracking-[0.3em] text-primary/40 uppercase">Email</span>
                                    <a href="mailto:hola@hitlabs.dev" className="text-xl font-medium hover:text-primary transition-colors">hola@hitlabs.dev</a>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] tracking-[0.3em] text-primary/40 uppercase">Location</span>
                                    <span className="text-xl font-medium">Remote — Worldwide</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form Column using Client Component */}
                        <ContactForm contactT={contactT} />
                    </div>
                </div>
            </section>

            <SiteFooter commonT={t.common} />
        </main>
    )
}
