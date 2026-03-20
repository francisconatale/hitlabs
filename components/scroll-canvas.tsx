"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
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
    // Clear canvas with dark background
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2

    // Main circle that scales with progress
    const maxRadius = Math.min(width, height) * 0.35
    const radius = maxRadius * (0.3 + progress * 0.7)

    // Outer atmospheric glow - large diffuse purple/blue
    const outerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2.5)
    outerGlow.addColorStop(0, "rgba(138, 43, 226, 0.15)")
    outerGlow.addColorStop(0.3, "rgba(75, 0, 130, 0.1)")
    outerGlow.addColorStop(0.6, "rgba(30, 0, 80, 0.05)")
    outerGlow.addColorStop(1, "transparent")
    ctx.fillStyle = outerGlow
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 2.5, 0, Math.PI * 2)
    ctx.fill()

    // Inner intense glow - neon blue/purple core
    const innerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.2)
    innerGlow.addColorStop(0, "rgba(180, 160, 255, 0.25)")
    innerGlow.addColorStop(0.4, "rgba(138, 43, 226, 0.15)")
    innerGlow.addColorStop(0.7, "rgba(75, 0, 180, 0.08)")
    innerGlow.addColorStop(1, "transparent")
    ctx.fillStyle = innerGlow
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2)
    ctx.fill()

    // Bloom effect layers
    ctx.shadowColor = "rgba(138, 100, 255, 0.8)"
    ctx.shadowBlur = 30

    // Main glowing ring with bloom
    ctx.strokeStyle = "rgba(180, 160, 255, 0.9)"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2 * progress)
    ctx.stroke()

    // Secondary neon ring
    ctx.shadowBlur = 20
    ctx.shadowColor = "rgba(138, 43, 226, 0.6)"
    ctx.strokeStyle = "rgba(138, 100, 255, 0.5)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2)
    ctx.stroke()

    // Outer ethereal ring
    ctx.shadowBlur = 15
    ctx.strokeStyle = "rgba(100, 80, 200, 0.3)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 1.4, 0, Math.PI * 2)
    ctx.stroke()

    // Reset shadow for lines
    ctx.shadowBlur = 10
    ctx.shadowColor = "rgba(180, 160, 255, 0.5)"

    // Rotating luminous lines
    const numLines = 12
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2 + progress * Math.PI * 2
      const lineLength = radius * 0.35
      const startRadius = radius * 0.75

      const lineOpacity = 0.3 + (Math.sin(progress * Math.PI * 4 + i) * 0.2) + (i / numLines) * 0.3
      ctx.strokeStyle = `rgba(180, 160, 255, ${lineOpacity})`
      ctx.lineWidth = 1.5
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

    // Glowing center core
    ctx.shadowBlur = 25
    ctx.shadowColor = "rgba(200, 180, 255, 1)"
    const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 8)
    coreGradient.addColorStop(0, "rgba(255, 255, 255, 1)")
    coreGradient.addColorStop(0.3, "rgba(200, 180, 255, 0.9)")
    coreGradient.addColorStop(1, "rgba(138, 43, 226, 0)")
    ctx.fillStyle = coreGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
    ctx.fill()

    // Floating luminous particles
    ctx.shadowBlur = 8
    const numParticles = 30
    for (let i = 0; i < numParticles; i++) {
      const particleProgress = (progress + i / numParticles) % 1
      const angle = (i / numParticles) * Math.PI * 2 + progress * 0.5
      const distance = radius * (0.4 + particleProgress * 1.2)
      const size = 3 * (1 - particleProgress * 0.7)
      const opacity = 0.7 * (1 - particleProgress)

      ctx.shadowColor = `rgba(180, 160, 255, ${opacity})`
      ctx.fillStyle = `rgba(180, 160, 255, ${opacity})`
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

    // Additional sparkle particles
    ctx.shadowBlur = 4
    for (let i = 0; i < 15; i++) {
      const sparkleAngle = (i / 15) * Math.PI * 2 + progress * Math.PI * 3
      const sparkleDistance = radius * (0.9 + Math.sin(progress * Math.PI * 2 + i) * 0.3)
      const sparkleSize = 1.5 + Math.sin(progress * Math.PI * 4 + i * 2) * 0.5
      const sparkleOpacity = 0.4 + Math.sin(progress * Math.PI * 6 + i) * 0.3

      ctx.shadowColor = `rgba(220, 200, 255, ${sparkleOpacity})`
      ctx.fillStyle = `rgba(220, 200, 255, ${sparkleOpacity})`
      ctx.beginPath()
      ctx.arc(
        centerX + Math.cos(sparkleAngle) * sparkleDistance,
        centerY + Math.sin(sparkleAngle) * sparkleDistance,
        sparkleSize,
        0,
        Math.PI * 2
      )
      ctx.fill()
    }

    // Reset shadow
    ctx.shadowBlur = 0
    ctx.shadowColor = "transparent"
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
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

  // Get current section based on progress
  const sections = [
    { threshold: 0, word: scrollT.build },
    { threshold: 0.33, word: scrollT.scale },
    { threshold: 0.66, word: scrollT.launch },
  ]

  const currentSection = sections.reduce((acc, section) =>
    progress >= section.threshold ? section : acc
    , sections[0])

  return (
    <section ref={containerRef} className="relative h-[200vh] sm:h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
        />

        {/* Content overlay */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6">
          <p className="mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#b4a0ff]">
            {scrollT.badge}
          </p>
          <h2
            key={currentSection.word}
            className="text-center text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl animate-in fade-in slide-in-from-bottom-2 duration-300 text-white"
            style={{
              textShadow: '0 0 40px rgba(138, 100, 255, 0.5), 0 0 80px rgba(138, 43, 226, 0.3)'
            }}
          >
            {currentSection.word}
          </h2>
          <p
            className="mt-4 sm:mt-6 max-w-xs sm:max-w-md text-center text-base sm:text-lg text-[#a090c0] leading-relaxed transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - progress * 10) }}
          >
            {scrollT.scroll}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {sections.map((section, i) => (
            <div
              key={i}
              className={`h-1 w-8 rounded-full transition-all duration-300 ${progress >= section.threshold 
                ? "bg-[#b4a0ff] shadow-[0_0_10px_rgba(180,160,255,0.5)]" 
                : "bg-[#2a1a40]"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
