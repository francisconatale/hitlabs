"use client"
import React, { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

export interface CaseStudyFeature {
  title: string;
  description: string;
}

export interface CaseStudyData {
  title: string;
  features: CaseStudyFeature[];
  location: string;
  descriptionParagraphs: string[];
  logoUrl: string;
  screenshotUrl: string;
  screenshots?: string[];
  websiteUrl?: string;
}

interface EditorialCaseStudyProps {
  data: CaseStudyData;
}

export function EditorialCaseStudy({ data }: EditorialCaseStudyProps) {
  // Use logo and screenshot as our gallery images
  const images = [data.logoUrl, data.screenshotUrl]
  
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length)
    }, 3000) // Change every 3 seconds
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative w-full border-b border-border py-24 md:py-32 px-6 md:px-[54px] lg:px-20 bg-background text-foreground overflow-hidden">
      
      {/* Textura de papel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Background Technical Grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-foreground" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: Title & Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 lg:mb-32">
          
          {/* Title Area */}
          <div className="lg:col-span-7 flex flex-col z-10">
            <h2
              className="font-bold uppercase tracking-tighter text-primary"
              style={{
                fontSize: "clamp(42px, 6.5vw, 96px)",
                lineHeight: 0.9,
              }}
            >
              {data.title}
            </h2>
            <div className="mt-8 text-lg md:text-xl text-muted-foreground font-medium max-w-lg leading-relaxed mb-10">
              {data.descriptionParagraphs[0]}
            </div>
            
            {data.websiteUrl && (
              <div>
                <a
                  href={data.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full sm:w-auto justify-center items-center gap-4 bg-primary text-primary-foreground px-8 py-4 uppercase font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                  style={{ fontSize: 12, letterSpacing: "0.1em" }}
                >
                  Visit Website
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )}
          </div>
          
          {/* Visuals Area (Fading Images) */}
          <div className="lg:col-span-5 relative w-full aspect-video md:aspect-[4/3] bg-card/30 border border-border flex items-center justify-center p-6 transition-colors duration-500 hover:bg-primary/5 rounded-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative w-full h-full overflow-hidden">
              {images.map((imgSrc, idx) => (
                <img 
                  key={idx}
                  src={imgSrc} 
                  alt={`${data.title} preview ${idx + 1}`} 
                  className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-opacity duration-1000 ease-in-out ${
                    idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: 3-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {data.features.map((feature, index) => {
            const numberString = (index + 1).toString().padStart(2, '0')
            return (
              <div key={index} className="flex flex-col group">
                <span className="text-sm font-mono text-muted-foreground mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  [{numberString}]
                </span>
                <h3 className="text-2xl font-bold lowercase tracking-tight mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
