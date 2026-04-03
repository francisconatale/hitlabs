"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { TranslationDict } from "@/lib/i18n"
import siteConfig from "@/config/site.json"

interface FinalCTAProps {
  finalT: TranslationDict['finalCta']
}

export function FinalCTA({ finalT }: FinalCTAProps) {
  const siteName = siteConfig.name.toUpperCase()

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-20 md:py-32 overflow-hidden border-t border-border">
      {/* Background large text watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="font-[family-name:var(--font-display)] text-[25vw] text-primary/5 tracking-tighter whitespace-nowrap uppercase">
          {siteName}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[10px] tracking-[0.3em] text-primary/60 uppercase mb-6">— JOIN THE NETWORK</div>
          <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-primary tracking-tighter leading-none px-4">
            {finalT.headline}
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-sm md:text-base text-muted-foreground leading-relaxed tracking-wide px-4">
            {finalT.subheadline}
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link href="/contact">
            <Button
              size="lg"
              className="border-2 border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary text-xs font-bold uppercase tracking-widest px-12 py-7 h-auto transition-all"
            >
              {finalT.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-4">
            {finalT.noCreditCard}
          </p>
        </motion.div>

        {/* Script accent signature signature site-style */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="font-[family-name:var(--font-script)] text-3xl md:text-4xl lg:text-5xl text-primary/40 italic block grayscale opacity-60">
            {siteName.toLowerCase()}
          </span>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-primary/20" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-primary/20" />
    </section>
  )
}
