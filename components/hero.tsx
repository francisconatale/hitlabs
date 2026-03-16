"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { TranslationDict } from "@/lib/i18n"

interface HeroProps {
  heroT: TranslationDict['hero']
}

export function Hero({ heroT }: HeroProps) {

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:py-32">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          {heroT.headlineMain} <br />
          <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            {heroT.headlineAccent}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg lg:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          {heroT.subheadline}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Button size="lg" className="group h-12 px-8 text-base font-medium transition-transform hover:scale-[1.02] w-full sm:w-auto">
            {heroT.ctaPrimary}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium transition-transform hover:scale-[1.02] w-full sm:w-auto">
            <Play className="mr-2 h-4 w-4 fill-current" />
            {heroT.ctaSecondary}
          </Button>
        </div>

        <div className="mt-16 sm:mt-24 animate-in fade-in duration-1000 delay-700">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm">
            {heroT.trustedBy}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale sm:gap-12">
            <div className="text-xl font-bold sm:text-2xl">ACME</div>
            <div className="text-xl font-bold sm:text-2xl">GLOBEX</div>
            <div className="text-xl font-bold sm:text-2xl">SOYLENT</div>
            <div className="text-xl font-bold sm:text-2xl">INITECH</div>
          </div>
        </div>
      </div>
    </section>
  )
}
