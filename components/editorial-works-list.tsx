"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  services: string
  year: string
  href: string
  images: string[]
}

interface EditorialWorksListProps {
  title?: string
  subtitle?: string
  projects: Project[]
  viewAllHref?: string
  viewAllText?: string
}

export function EditorialWorksList({
  title = "Selected Work",
  subtitle = "Software & Solutions",
  projects,
  viewAllText,
}: EditorialWorksListProps) {
  return (
    <div className="w-full bg-[#f8f9fa] text-[#111]">
      <div className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-8 mb-24">
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-[70px] tracking-tighter uppercase leading-none">
            {title}
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest opacity-50 mt-4 md:mt-0 mb-2">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
          {projects.map((p) => (
            <div key={p.id} className="flex flex-col">
              <div className="flex flex-col justify-between items-start mb-6">
                <div className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-3">
                  {p.year} — {p.subtitle}
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl tracking-tighter uppercase leading-[0.9] opacity-90">
                  {p.title}
                </h2>
              </div>

              {/* Premium Screenshot */}
              <motion.div 
                className="w-full aspect-square bg-[#ececec] overflow-hidden flex items-center justify-center relative shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
              >
                 <img src={p.images[0]} alt={p.title} className="w-1/2 h-1/2 object-contain mix-blend-multiply transition-transform hover:scale-110 duration-700" />
              </motion.div>

              <div className="mt-8 flex flex-col justify-between items-start border-t border-black/10 pt-6 gap-6">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80 flex flex-wrap gap-x-4 gap-y-2">
                  {p.services.split(' • ').map(s => <div key={s}>{s}</div>)}
                </div>
                <Link href={p.href} className="text-[10px] uppercase tracking-widest border-b border-black hover:opacity-50 transition-opacity flex items-center gap-2">
                  {viewAllText || "Explore Case Study"} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
