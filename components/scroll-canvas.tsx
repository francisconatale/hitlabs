"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { TranslationDict } from "@/lib/i18n"

interface ScrollCanvasProps {
  scrollT: TranslationDict['scrollCanvas']
}

export function ScrollCanvas({ scrollT }: ScrollCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)
  const tickingRef = useRef(false)

  const updateCanvas = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    // Clear canvas — cream paper background
    ctx.fillStyle = "#f0ede6"
    ctx.fillRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2
    const maxRadius = Math.min(width, height) * 0.35
    const radius = maxRadius * (0.3 + progress * 0.7)

    // Glow effect — deep blue-violet
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5)
    gradient.addColorStop(0, "rgba(30, 79, 216, 0.12)")
    gradient.addColorStop(0.5, "rgba(30, 79, 216, 0.04)")
    gradient.addColorStop(1, "transparent")
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2)
    ctx.fill()

    // Main ring — primary blue-violet
    ctx.strokeStyle = "rgba(30, 79, 216, 0.7)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2 * progress)
    ctx.stroke()

    // Secondary rings
    ctx.strokeStyle = "rgba(30, 79, 216, 0.2)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = "rgba(30, 79, 216, 0.1)"
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2)
    ctx.stroke()

    // Rotating lines
    const numLines = 8
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2 + progress * Math.PI * 2
      const lineLength = radius * 0.3
      const startRadius = radius * 0.8

      ctx.strokeStyle = `rgba(30, 79, 216, ${0.1 + (i / numLines) * 0.25})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(
        centerX + Math.cos(angle) * startRadius,
        centerY + Math.sin(angle) * startRadius
      )
      ctx.lineTo(
        centerX + Math.cos(angle) * (startRadius + lineLength),
        centerY + Math.sin(angle) * (startRadius + lineLength)
      )
      ctx.stroke()
    }

    // Center dot
    ctx.fillStyle = "rgba(30, 79, 216, 0.8)"
    ctx.beginPath()
    ctx.arc(centerX, centerY, 4, 0, Math.PI * 2)
    ctx.fill()

    // Floating particles
    const numParticles = 20
    for (let i = 0; i < numParticles; i++) {
      const particleProgress = (progress + i / numParticles) % 1
      const angle = (i / numParticles) * Math.PI * 2
      const distance = radius * (0.5 + particleProgress * 0.8)
      const size = 2 * (1 - particleProgress)
      const opacity = 0.4 * (1 - particleProgress)

      ctx.fillStyle = `rgba(30, 79, 216, ${opacity})`
      ctx.beginPath()
      ctx.arc(
        centerX + Math.cos(angle) * distance,
        centerY + Math.sin(angle) * distance,
        size,
        0,
        Math.PI * 2
      )
      ctx.fill()
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      updateCanvas(ctx, rect.width, rect.height, progress)
    }

    const handleScroll = () => {
      if (tickingRef.current) return

      tickingRef.current = true
      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        const scrollHeight = container.offsetHeight - window.innerHeight
        const scrolled = -rect.top
        const newProgress = Math.max(0, Math.min(1, scrolled / scrollHeight))

        setProgress(newProgress)

        const canvasRect = canvas.getBoundingClientRect()
        updateCanvas(ctx, canvasRect.width, canvasRect.height, newProgress)

        tickingRef.current = false
      })
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [progress, updateCanvas])

  const sections = [
    { threshold: 0, word: scrollT.build },
    { threshold: 0.33, word: scrollT.scale },
    { threshold: 0.66, word: scrollT.launch },
  ]

  const currentSection = sections.reduce((acc, section) =>
    progress >= section.threshold ? section : acc
    , sections[0])

  return (
    <section ref={containerRef} className="relative h-[200vh] sm:h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6">
          <p className="mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
            {scrollT.badge}
          </p>
          <h2
            key={currentSection.word}
            className="font-[family-name:var(--font-display)] text-center text-5xl tracking-tight sm:text-7xl md:text-8xl lg:text-9xl text-primary animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {currentSection.word}
          </h2>
          <p
            className="mt-4 sm:mt-6 max-w-xs sm:max-w-md text-center text-base sm:text-lg text-muted-foreground leading-relaxed transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - progress * 10) }}
          >
            {scrollT.scroll}
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {sections.map((section, i) => (
            <div
              key={i}
              className={`h-px w-8 transition-all duration-300 ${progress >= section.threshold ? "bg-primary" : "bg-border"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
