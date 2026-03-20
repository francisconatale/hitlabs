"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { TranslationDict } from "@/lib/i18n"

interface FinalCTAProps {
  finalT: TranslationDict['finalCta']
}

export function FinalCTA({ finalT }: FinalCTAProps) {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-20 md:py-32 overflow-hidden">
      {/* Background large text watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-[family-name:var(--font-display)] text-[20vw] text-primary/5 tracking-tighter whitespace-nowrap">
          PLUG
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
          <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary tracking-tight leading-none">
            {finalT.headline}
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            {finalT.subheadline}
          </p>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            className="border-2 border-primary bg-transparent hover:bg-primary hover:text-primary-foreground text-primary text-xs font-bold uppercase tracking-widest px-8 py-4 h-auto transition-colors duration-300"
          >
            {finalT.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="mt-6 text-xs text-muted-foreground uppercase tracking-widest">
            {finalT.noCreditCard}
          </p>
        </motion.div>

        {/* Script accent */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="font-[family-name:var(--font-script)] text-3xl md:text-4xl text-primary/60 italic">
            where ideas take form
          </span>
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/10" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/10" />
    </section>
  )
}
