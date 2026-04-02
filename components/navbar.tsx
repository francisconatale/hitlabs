"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import siteConfig from '@/config/site.json'
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { TranslationDict, Locale } from "@/lib/i18n"

interface NavbarProps {
  navT: TranslationDict['navbar']
  commonT: TranslationDict['common']
  currentLocale: Locale
}

export function Navbar({ navT, commonT, currentLocale }: NavbarProps) {

  const navLinks = [
    { href: "/", label: navT.home },
    { href: "/products", label: navT.product },
    { href: "/referrals", label: navT.referidos },
  ]

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-md border-b border-border py-2"
        : "bg-transparent py-4"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 lg:px-20">
        {/* Logo — display font */}
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-tighter text-primary hover:opacity-80 transition-opacity"
        >
          {siteConfig.name.toUpperCase()}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-all hover:text-primary hover:tracking-[0.25em]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-6 md:flex">
          <LanguageSwitcher currentLocale={currentLocale} />
          <Button
            variant="ghost"
            size="sm"
            className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-transparent"
          >
            {commonT.signIn}
          </Button>
          <Button
            size="sm"
            className="border border-primary bg-transparent hover:bg-primary hover:text-primary-foreground text-primary text-[10px] font-bold uppercase tracking-widest h-9 px-6 transition-all duration-300"
          >
            {commonT.getStarted}
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] border-b border-border bg-background/98 backdrop-blur-xl md:hidden overflow-hidden animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-6 px-8 py-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-6 pt-6 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Language</span>
                <LanguageSwitcher currentLocale={currentLocale} />
              </div>
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 uppercase text-xs font-bold tracking-widest py-6">
                  {commonT.signIn}
                </Button>
                <Button className="w-full bg-primary text-primary-foreground uppercase text-xs font-bold tracking-widest py-6">
                  {commonT.getStarted}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
