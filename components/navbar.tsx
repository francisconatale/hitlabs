"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import siteConfig from '@/config/site.json'
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { TranslationDict, Locale } from "@/lib/i18n"

import { usePathname } from "next/navigation"

interface NavbarProps {
  navT: TranslationDict['navbar']
  commonT: TranslationDict['common']
  currentLocale: Locale
}

export function Navbar({ navT, commonT, currentLocale }: NavbarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    // Run once on mount to check initial scroll position
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: navT.home },
    { href: "/products", label: navT.product },
    { href: "/referrals", label: navT.referidos },
    { href: "/team", label: navT.team },
  ]

  // Evita el scroll cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Header cerrado (Logo y Menu button) */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-end pointer-events-none transition-all duration-300 ${isScrolled ? "p-3 md:p-4 bg-background/50 backdrop-blur-md" : "p-6 md:p-8"}`}>
        <Link
          href="/"
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-300 ${isScrolled ? "w-24 md:w-32" : "w-32 md:w-48"}`}
        >
          <Image 
            src="/hitlabs.png" 
            alt="Hitlabs" 
            width={200} 
            height={100} 
            className="w-full h-auto object-contain"
            priority 
          />
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className={`pointer-events-auto text-foreground hover:text-primary transition-all duration-300 focus:outline-none ${isScrolled ? "p-1" : "p-2"}`}
        >
          <Menu className={`transition-all duration-300 ${isScrolled ? "w-6 h-6" : "w-8 h-8"}`} strokeWidth={1.5} />
        </button>
      </header>

      {/* Menú a pantalla completa */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-background text-foreground flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          
          {/* Textura de papel */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 z-50"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Background Glows for Hitlabs style */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

          {/* Header del Overlay */}
          <div className="p-6 md:p-8 flex items-center justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground hover:text-primary transition-colors duration-300 focus:outline-none"
            >
              <X className="w-10 h-10" strokeWidth={1.5} />
            </button>
          </div>

          {/* Contenido Central */}
          <div className="flex-1 flex flex-col justify-center items-center gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.9] transition-all duration-300 hover:scale-105 hover:text-primary ${
                    isActive ? "text-primary opacity-80" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            
            <div className="mt-12 flex items-center justify-center gap-8">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground font-medium text-sm md:text-base tracking-wide uppercase"
              >
                Contact
              </Link>
              <div className="flex items-center justify-center">
                <LanguageSwitcher currentLocale={currentLocale} />
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  )
}
