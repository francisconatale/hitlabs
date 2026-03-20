"use client"

import { motion } from "framer-motion"
import { TranslationDict } from "@/lib/i18n"

interface SocialProofProps {
  socialT: TranslationDict['socialProof']
}

export function SocialProof({ socialT }: SocialProofProps) {

  const metrics = [
    { value: "10M+", label: socialT.metrics.requests },
    { value: "99.99%", label: socialT.metrics.uptime },
    { value: "150ms", label: socialT.metrics.response },
    { value: "50K+", label: socialT.metrics.developers },
  ]

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-10 sm:py-12 lg:py-16">
      {/* Horizontal line with label */}
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs tracking-widest text-muted-foreground uppercase">Metrics</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 max-w-6xl mx-auto">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <p className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">
              {metric.value}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
