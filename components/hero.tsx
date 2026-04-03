"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { TranslationDict } from "@/lib/i18n"
import siteConfig from "@/config/site.json"

interface HeroProps {
  heroT: TranslationDict['hero']
}

export function Hero({ heroT }: HeroProps) {
  const siteName = siteConfig.name.toUpperCase()

  return (
    <section className="relative px-6 md:px-12 lg:px-20 pt-32 pb-20 bg-background overflow-hidden">
      {/* ── Editorial Grid Header ── */}
      <div className="max-w-7xl mx-auto flex justify-between items-center border-b border-primary/5 pb-8 mb-12">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.3em] text-primary/40 uppercase">Project / Stage 01</span>
          <motion.div
            className="border border-primary/20 px-4 py-1 text-[9px] font-bold tracking-[0.2em] text-primary/60 uppercase cursor-pointer hover:border-primary hover:text-primary transition-all w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {heroT.ctaSecondary}
          </motion.div>
        </div>

        <div className="hidden lg:flex flex-col items-center gap-1 opacity-20">
          <span className="text-[10px] tracking-widest text-primary uppercase">Coordinates — 34.6037° S, 58.3816° W</span>
          <div className="w-40 h-px bg-primary/30" />
        </div>

        <div className="text-right flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.3em] text-primary/40 uppercase">— DIGITAL STUDIO</span>
          <span className="text-[9px] font-mono text-primary/20">EST. 2026</span>
        </div>
      </div>

      {/* ── Symmetrical Central Statement ── */}
      <div className="max-w-4xl mx-auto relative group">
        {/* The Box */}
        <motion.div
          className="relative w-full aspect-[21/9] bg-primary overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Internal Grid Lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white" />
            <div className="absolute left-2/4 top-0 bottom-0 w-px bg-white" />
            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tighter leading-none text-center drop-shadow-lg">
              HIGH IMPACT TECHNOLOGY
            </h1>
          </div>

          {/* Corner Elements */}
          <div className="absolute top-4 left-4 text-[8px] text-white/30 tracking-widest">H.I.T. SYSTEM</div>
          <div className="absolute bottom-4 right-4 text-[8px] text-white/30 tracking-widest">VER 1.5.0</div>
        </motion.div>

        {/* The Watermark — Perfectly aligned to the width of the box */}
        <motion.div
          className="mt-4 text-center select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span
            className="font-[family-name:var(--font-display)] text-primary/5 tracking-tighter leading-none block uppercase"
            style={{ fontSize: 'clamp(4rem, 16vw, 15rem)' }}
          >
            {siteName}
          </span>
        </motion.div>
      </div>

      {/* ── Symmetrical Bottom Messaging ── */}
      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center text-center lg:text-left">
        {/* Left: Script sign */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-primary/40 italic lowercase">
            {heroT.headlineMain}
          </span>
        </motion.div>

        {/* Center: Main Headline */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-primary tracking-tight leading-tight uppercase">
            {heroT.headlineAccent}
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto lg:mx-0">
            {heroT.subheadline}
          </p>
        </motion.div>

        {/* Right: CTA Button */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-transparent hover:text-primary border-2 border-primary text-[11px] font-bold uppercase tracking-[0.2em] px-12 py-7 h-auto transition-all duration-500 rounded-none"
            >
              {heroT.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Grid Lines Overlay (Background) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] -z-10">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-primary" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-primary" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-primary" />
        <div className="absolute top-1/4 left-0 right-0 h-px bg-primary" />
        <div className="absolute top-2/4 left-0 right-0 h-px bg-primary" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-primary" />
      </div>
    </section>
  )
}
