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
    { href: "/products", label: navT.product },
    { href: "#features", label: navT.features },
    { href: "#pricing", label: navT.pricing },
  ]

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-lg border-b border-border"
        : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          {siteConfig.name.toUpperCase()}<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher currentLocale={currentLocale} />
          <Button variant="ghost" size="sm">
            {commonT.signIn}
          </Button>
          <Button size="sm">{commonT.getStarted}</Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
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
        <div className="border-t border-border bg-background/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Language</span>
                <LanguageSwitcher currentLocale={currentLocale} />
              </div>
              <Button variant="ghost" size="sm">
                {commonT.signIn}
              </Button>
              <Button size="sm">{commonT.getStarted}</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
