"use client"

import Link from "next/link"
import { TranslationDict } from "@/lib/i18n"
import { ArrowRight } from "lucide-react"
import { Sticker, StickerConfig } from "@/components/sticker"
import { useRef } from "react"

interface HeroProps {
  heroT: TranslationDict['hero']
}

// Sticker configs — no more x/y percentages, positioning is CSS-driven
const kioskitoConfig: StickerConfig = { shape: 'png', pngUrl: '/kioskito.svg', w: 140, h: 140, dieCut: 3, fold: false }
const deliveryConfig: StickerConfig = { shape: 'png', pngUrl: '/kioskito_delivery.svg', w: 130, h: 130, dieCut: 3, fold: false }
const arrowConfig: StickerConfig = { shape: 'png', pngUrl: '/logo.svg', w: 140, h: 140, dieCut: 1, fold: false }
const fedeConfig: StickerConfig = { shape: 'png', pngUrl: '/fede.png', w: 160, h: 160, dieCut: 2, fold: false }
const bienhechoConfig: StickerConfig = { shape: 'png', pngUrl: '/bienhecho.svg', w: 120, h: 120, dieCut: 3, fold: false }

export function Hero({ heroT }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      className="w-full relative border-b border-border overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32"
      style={{ background: "var(--background)" }}
    >
      <div className="px-6 md:px-[54px] w-full max-w-7xl mx-auto relative z-10 pointer-events-none">
        {/* ── Main block ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end pointer-events-auto">

          {/* ── Title Group: stickers travel with the title ── */}
          <div className="lg:col-span-8 relative z-20">
            {/* Kioskito — relative to title, top-left */}
            <div className="hidden md:block" style={{ position: 'absolute', left: -135, top: -50 }}>
              <Sticker
                id="hero-kioskito"
                config={kioskitoConfig}
                rotate={-8}
              />
            </div>

            {/* Delivery — relative to title, shifted more to the left */}
            <div className="hidden md:block" style={{ position: 'absolute', right: -200, top: -40 }}>
              <Sticker
                id="hero-delivery"
                config={deliveryConfig}
                rotate={-3}
              />
            </div>

            {/* FK Fede — relative to title, top-right */}
            <div className="hidden md:block absolute z-40" style={{ position: 'absolute', right: 100, top: 50 }}>
              <Sticker
                id="hero-fede"
                config={fedeConfig}
                rotate={12}
              />
            </div>

            <h1
              className="font-bold uppercase tracking-tighter text-primary"
              style={{
                fontSize: "clamp(42px, 6.5vw, 96px)",
                lineHeight: 0.9,
              }}
            >
              {heroT.headlineMain}<br />
              {heroT.headlineAccent}
            </h1>
          </div>

          {/* ── Description Group ── */}
          <div className="lg:col-span-4 flex flex-col gap-8 relative z-30">
            <p
              className="opacity-60 leading-relaxed text-sm md:text-base max-w-sm"
              style={{ letterSpacing: "0.02em" }}
            >
              {heroT.subheadline}
            </p>

            <div>
              <Link
                href="/contact"
                className="group inline-flex w-full sm:w-auto justify-center items-center gap-4 bg-primary text-primary-foreground px-8 py-4 uppercase font-bold hover:opacity-90 transition-opacity pointer-events-auto shadow-lg shadow-primary/20"
                style={{ fontSize: 12, letterSpacing: "0.1em" }}
              >
                {heroT.ctaPrimary}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Global Decorations: relative to hero section ── */}
      <div className="pointer-events-none">
        {/* Arrow — bottom-left of hero */}
        <div className="absolute hidden md:block" style={{ left: '1%', bottom: '30%' }}>
          <Sticker
            id="hero-arrow"
            config={arrowConfig}
            rotate={5}
          />
        </div>

        {/* Bienhecho — center-right area */}
        <div className="absolute hidden md:block" style={{ right: '12%', bottom: '30%' }}>
          <Sticker
            id="hero-bienhecho"
            config={bienhechoConfig}
            rotate={5}
          />
        </div>
      </div>

      {/* ── Background Technical Grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute top-1/4 left-0 right-0 h-px bg-foreground" />
        <div className="absolute top-2/4 left-0 right-0 h-px bg-foreground" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-foreground" />
      </div>
    </section>
  )
}
