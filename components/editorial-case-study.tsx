import React from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export interface CaseStudyData {
  title: string;
  services: string[];
  location: string;
  descriptionParagraphs: string[];
  logoUrl: string;
  screenshotUrl: string;
}

interface EditorialCaseStudyProps {
  data: CaseStudyData;
}

export function EditorialCaseStudy({ data }: EditorialCaseStudyProps) {
  return (
    <section className="w-full relative border-b border-border overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-32 bg-background">
      
      {/* ── Background Technical Grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-foreground" />
      </div>
      
      <div className="px-6 md:px-[54px] w-full max-w-7xl mx-auto relative z-10">
        
        {/* Project Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Columna principal - Título */}
          <div className="lg:col-span-12 flex flex-col mb-8">
            <div className="inline-flex items-center gap-2 text-primary font-bold mb-6 uppercase tracking-[0.2em] text-xs">
              <ArrowRight className="w-4 h-4" />
              <span>Case Study</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-[110px] tracking-tighter uppercase text-foreground leading-none">
              {data.title}
            </h2>
          </div>

          {/* Columna izquierda - Meta */}
          <div className="lg:col-span-4 flex flex-col gap-12 pt-8 border-t border-border">
            <div>
              <h3 className="text-[11px] font-bold mb-6 uppercase tracking-[0.2em] text-muted-foreground">Features</h3>
              <ul className="text-sm font-medium space-y-4">
                {data.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-4 text-foreground uppercase tracking-wider text-xs">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-[11px] font-bold mb-4 uppercase tracking-[0.2em] text-muted-foreground">Location</h3>
              <p className="text-sm text-foreground uppercase tracking-widest font-bold">{data.location}</p>
            </div>
          </div>

          {/* Columna derecha - Overview */}
          <div className="lg:col-span-8 lg:pl-12 pt-8 border-t border-border">
            <h3 className="text-[11px] font-bold mb-6 uppercase tracking-[0.2em] text-muted-foreground">Overview</h3>
            <div className="text-lg md:text-xl leading-relaxed text-foreground max-w-3xl space-y-8 font-medium">
              {data.descriptionParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          
          {/* Background Glow for Images */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

          {/* Imagen Izquierda (aprox 35%) */}
          <div className="lg:col-span-4 flex flex-col group">
            <div className="aspect-square w-full bg-card/30 border border-border flex items-center justify-center p-16 transition-colors duration-500 hover:bg-primary/5">
                <img 
                  src={data.logoUrl} 
                  alt={`${data.title} Logo`} 
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
            </div>
          </div>

          {/* Imagen Derecha (aprox 65%) */}
          <div className="lg:col-span-8 group">
            <div className="w-full h-full min-h-[400px] bg-card/30 border border-border flex items-center justify-center p-6 lg:p-12 transition-colors duration-500 hover:bg-primary/5 relative overflow-hidden">
                 <img 
                   src={data.screenshotUrl} 
                   alt={`${data.title} Screenshot`} 
                   className="w-full h-auto max-h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl" 
                 />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
