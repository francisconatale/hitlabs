"use client"

import React, { useState } from "react"
import { ArrowRight, CheckCircle2, LayoutTemplate, LayoutGrid, Monitor, SquareMenu } from "lucide-react"

const mockData = {
  title: "Kioskito",
  services: ["Punto de Venta", "Gestión de Stock", "Reportes Financieros", "Soporte Offline"],
  location: "Córdoba, Argentina",
  descriptionParagraphs: [
    "Gestiona tu negocio sin complicaciones. Kioskito es un sistema integral de Punto de Venta y gestión administrativa diseñado para comercios.",
  ],
  logoUrl: "https://kioskito-web.vercel.app/kioskito-original.png",
  screenshotUrl: "https://kioskito-web.vercel.app/landing/landing_1.png"
}

export default function DesignLabPage() {
  const [variant, setVariant] = useState<1 | 2 | 3 | 4>(1)

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Lab Controls */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border p-4 flex flex-wrap gap-4 justify-center items-center shadow-sm">
        <span className="text-sm font-semibold text-muted-foreground mr-4 uppercase tracking-wider">Design Lab</span>
        <button 
          onClick={() => setVariant(1)} 
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${variant === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <LayoutTemplate className="w-4 h-4" /> V1: Hero 100%
        </button>
        <button 
          onClick={() => setVariant(2)} 
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${variant === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <LayoutGrid className="w-4 h-4" /> V2: Split 20/80
        </button>
        <button 
          onClick={() => setVariant(3)} 
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${variant === 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <Monitor className="w-4 h-4" /> V3: Browser Mockup
        </button>
        <button 
          onClick={() => setVariant(4)} 
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${variant === 4 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          <SquareMenu className="w-4 h-4" /> V4: Bento Grid
        </button>
      </div>

      {/* Render Component Variants */}
      <div className="mt-16">
        <VariantRenderer variant={variant} data={mockData} />
      </div>
    </div>
  )
}

function VariantRenderer({ variant, data }: { variant: number, data: typeof mockData }) {
  return (
    <section className="pt-8 pb-16 px-4 sm:px-6 relative z-10 w-full overflow-hidden">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl">
        
        {/* Project Intro Grid (Common for most variants) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.2fr_2fr] gap-8 lg:gap-12 mb-16 relative">
          <div className="flex flex-col">
            {variant === 3 ? (
               <img src={data.logoUrl} alt="Logo" className="w-32 h-32 object-contain mb-4" />
            ) : (
              <div className="inline-flex items-center gap-2 text-primary font-medium mb-4 uppercase tracking-[0.2em] text-xs sm:text-sm">
                <ArrowRight className="w-4 h-4" />
                <span>Case Study</span>
              </div>
            )}
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground text-balance">
              {variant === 3 ? "Sistema POS" : data.title}
            </h2>
          </div>

          <div className="flex flex-col pt-4 lg:pt-[3.5rem]">
            <div className="mb-8">
              <h3 className="text-xs font-semibold mb-4 uppercase tracking-[0.15em] text-primary">Features</h3>
              <ul className="text-sm text-muted-foreground space-y-3">
                {data.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-3 uppercase tracking-[0.15em] text-primary">Location</h3>
              <p className="text-sm text-muted-foreground font-medium">{data.location}</p>
            </div>
          </div>

          <div className="pt-4 lg:pt-[3.5rem]">
            <h3 className="text-xs font-semibold mb-4 uppercase tracking-[0.15em] text-primary">Overview</h3>
            <div className="text-base leading-relaxed text-muted-foreground max-w-[460px] space-y-5">
              {data.descriptionParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Variants */}
        <div className="relative mt-8">
           <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
           
           {variant === 1 && (
             <div className="w-full relative group">
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-card rounded-2xl border border-border shadow-2xl p-4 z-20 flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:-rotate-3">
                   <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="w-full bg-card overflow-hidden rounded-2xl border border-border shadow-xl">
                   <img src={data.screenshotUrl} alt="Screenshot" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
             </div>
           )}

           {variant === 2 && (
             <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-full lg:w-[20%] flex flex-col group">
                  <div className="aspect-square w-full mb-3 bg-card overflow-hidden rounded-2xl border border-border flex items-center justify-center p-8 shadow-sm">
                      <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="w-full lg:w-[80%] group">
                  <div className="w-full bg-card overflow-hidden rounded-2xl border border-border shadow-xl">
                       <img src={data.screenshotUrl} alt="Screenshot" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
             </div>
           )}

           {variant === 3 && (
             <div className="w-full group">
                <div className="w-full bg-card rounded-xl border border-border shadow-2xl overflow-hidden">
                   {/* Browser Mockup Header */}
                   <div className="h-10 bg-muted border-b border-border flex items-center px-4 gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400/80" />
                     <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                     <div className="w-3 h-3 rounded-full bg-green-400/80" />
                   </div>
                   <img src={data.screenshotUrl} alt="Screenshot" className="w-full h-auto object-cover" />
                </div>
             </div>
           )}

           {variant === 4 && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 group">
                  <div className="w-full h-full bg-card overflow-hidden rounded-2xl border border-border shadow-xl">
                       <img src={data.screenshotUrl} alt="Screenshot" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
                <div className="md:col-span-1 flex flex-col gap-6">
                  <div className="bg-card aspect-square rounded-2xl border border-border flex items-center justify-center p-12 shadow-sm group">
                     <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain transition-transform group-hover:scale-110" />
                  </div>
                  <div className="bg-card flex-1 rounded-2xl border border-border flex flex-col items-center justify-center p-8 text-center shadow-sm">
                     <h4 className="text-5xl font-bold text-primary mb-2">10k+</h4>
                     <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Transacciones Diarias</p>
                  </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </section>
  )
}
