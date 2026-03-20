"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { TranslationDict } from "@/lib/i18n"

interface HeroProps {
  heroT: TranslationDict['hero']
}

export function Hero({ heroT }: HeroProps) {
  return (
    <section className="relative min-h-screen px-6 md:px-12 lg:px-20 pt-24 pb-12 overflow-hidden bg-background">
      {/* Top editorial labels */}
      <div className="flex justify-between items-start text-[10px] md:text-xs tracking-widest text-primary uppercase">
        <span>—PLUG 2026</span>
        <div className="text-center hidden md:block opacity-40">
          <p className="text-[9px] leading-tight italic normal-case">
            Creative Digital Studio
          </p>
        </div>
        <span>—SOFTWARE HOUSE</span>
      </div>

      {/* Pill button + Year */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <motion.div
          className="border border-primary px-4 py-1.5 text-[10px] tracking-[0.2em] text-primary uppercase cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {heroT.ctaSecondary}
        </motion.div>
        <div className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-primary/10 select-none">
          2026
        </div>
      </div>

      {/* Main image with title overlay */}
      <div className="relative mt-8 max-w-2xl mx-auto z-10">
        {/* Duotone visual placeholder */}
        <motion.div
          className="relative aspect-[4/3] bg-primary/20 overflow-hidden border border-primary/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0 mix-blend-multiply opacity-80"
            style={{
              background: 'linear-gradient(135deg, oklch(0.45 0.2 250) 0%, oklch(0.55 0.18 250) 100%)'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-4/5 h-4/5 border border-primary flex items-center justify-center">
              <span className="font-[family-name:var(--font-display)] text-8xl md:text-9xl tracking-tighter text-primary">★</span>
            </div>
          </div>
        </motion.div>

        {/* ACCENT Headline — Overlapping */}
        <motion.h1
          className="font-[family-name:var(--font-display)] text-[15vw] sm:text-[12vw] md:text-[11vw] lg:text-[10vw] text-primary absolute -bottom-6 md:-bottom-10 lg:-bottom-14 left-0 right-0 text-center tracking-tighter leading-none select-none z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroT.headlineAccent}
        </motion.h1>
      </div>

      {/* Hero content area below image */}
      <div className="relative mt-24 md:mt-32 lg:mt-40 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        {/* Left: Script + Subheadline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="font-[family-name:var(--font-script)] text-3xl md:text-4xl lg:text-5xl text-primary/80 lowercase italic block mb-6">
            {heroT.headlineMain}
          </span>
          <p className="max-w-sm text-sm md:text-base text-muted-foreground leading-relaxed tracking-wide">
            {heroT.subheadline}
          </p>
        </motion.div>

        {/* Right: CTA & Metrics label */}
        <motion.div
          className="flex flex-col items-start md:items-end gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-right hidden md:block">
            <span className="text-[10px] tracking-widest text-muted-foreground uppercase mb-2 block">Project 1217 / Visual</span>
            <div className="flex gap-1 justify-end text-primary text-lg">
              <span>*</span><span>*</span><span>*</span><span>*</span>
            </div>
          </div>

          <Button
            size="lg"
            className="border-2 border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary text-xs font-bold uppercase tracking-widest px-10 py-6 h-auto transition-all duration-300"
          >
            {heroT.ctaPrimary}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute left-4 bottom-1/4 opacity-5 pointer-events-none select-none hidden lg:block">
        <span className="font-[family-name:var(--font-display)] text-[25vw] leading-none text-primary">PHASE</span>
      </div>
    </section>
  )
}
