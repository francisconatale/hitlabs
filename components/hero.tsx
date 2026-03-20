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
      {/* Background glow layers */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(138,43,226,0.15)] blur-[180px]" />
      <div className="absolute top-1/3 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(100,80,200,0.1)] blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-[rgba(180,160,255,0.08)] blur-[100px]" />

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 glow-text">
          {heroT.headlineMain} <br />
          <span className="bg-gradient-to-r from-[#b4a0ff] via-[#8a64ff] to-[#c4b0ff] bg-clip-text text-transparent">
            {heroT.headlineAccent}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-[#a090c0] sm:text-lg lg:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          {heroT.subheadline}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Button size="lg" className="group h-12 px-8 text-base font-medium transition-all hover:scale-[1.02] w-full sm:w-auto glow-box bg-[#8a64ff] hover:bg-[#9a74ff] text-white border-0">
            {heroT.ctaPrimary}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium transition-all hover:scale-[1.02] w-full sm:w-auto border-[#2a1a40] hover:border-[#b4a0ff]/50 hover:bg-[#1a1625] text-[#b4a0ff] glow-border-hover">
            <Play className="mr-2 h-4 w-4 fill-current" />
            {heroT.ctaSecondary}
          </Button>
        </div>

        <div className="mt-16 sm:mt-24 animate-in fade-in duration-1000 delay-700">
          <p className="text-xs font-medium uppercase tracking-widest text-[#8070a0] sm:text-sm">
            {heroT.trustedBy}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-60 sm:gap-12">
            <div className="text-xl font-bold sm:text-xl text-[#6050a0] glow-text-subtle">STARTUPS QUE ARRANCAN</div>
            <div className="text-xl font-bold sm:text-xl text-[#6050a0] glow-text-subtle">NEGOCIOS QUE ESCALAN</div>
            <div className="text-xl font-bold sm:text-xl text-[#6050a0] glow-text-subtle">EQUIPOS QUE SE ORDENAN</div>
            <div className="text-xl font-bold sm:text-xl text-[#6050a0] glow-text-subtle">IDEAS QUE NECESITAN FORMA</div>
          </div>
        </div>
      </div>
    </section>
  )
}
