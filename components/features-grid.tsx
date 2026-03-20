"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Globe, BarChart3 } from "lucide-react"
import { TranslationDict } from "@/lib/i18n"

interface FeaturesGridProps {
  featuresT: TranslationDict['features']
}

export function FeaturesGrid({ featuresT }: FeaturesGridProps) {

  const features = [
    {
      icon: Zap,
      title: featuresT.items.fast.title,
      description: featuresT.items.fast.description,
      num: "01"
    },
    {
      icon: Shield,
      title: featuresT.items.security.title,
      description: featuresT.items.security.description,
      num: "02"
    },
    {
      icon: Globe,
      title: featuresT.items.global.title,
      description: featuresT.items.global.description,
      num: "03"
    },
    {
      icon: BarChart3,
      title: featuresT.items.analytics.title,
      description: featuresT.items.analytics.description,
      num: "04"
    },
  ]

  return (
    <section id="features" className="relative px-6 md:px-12 lg:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background large text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-[family-name:var(--font-display)] text-[20vw] text-primary/5 tracking-tighter whitespace-nowrap">
          PLUG
        </span>
      </div>

      {/* Section label */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs tracking-widest text-primary uppercase">{featuresT.badge}</span>
          <div className="w-24 h-px bg-primary/30" />
        </div>

        <motion.h2
          className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl text-primary tracking-tight leading-none mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {featuresT.headline}
        </motion.h2>

        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group border border-border bg-card p-6 transition-all hover:border-primary/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <span className="font-[family-name:var(--font-display)] text-4xl text-primary/15">{feature.num}</span>
              <div className="mt-3 mb-3 inline-flex h-10 w-10 items-center justify-center border border-primary/20 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl tracking-wide text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/10" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/10" />
    </section>
  )
}
