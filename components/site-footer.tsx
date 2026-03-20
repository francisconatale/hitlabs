"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import siteConfig from '@/config/site.json'
import { TranslationDict } from "@/lib/i18n"

interface SiteFooterProps {
  commonT: TranslationDict['common']
}

export function SiteFooter({ commonT }: SiteFooterProps) {
  return (
    <footer className="relative px-6 md:px-12 lg:px-20 py-20 border-t border-border">
      {/* Main footer content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <motion.h3
            className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-primary tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {siteConfig.name.toUpperCase()}
          </motion.h3>
          <div className="mt-8 flex items-center gap-4">
            <span className="text-xs tracking-widest text-muted-foreground uppercase">Follow us</span>
            <div className="w-8 h-px bg-border" />
          </div>
          <div className="mt-4 flex gap-6">
            {["TW", "IG", "LI", "GH"].map((social, index) => (
              <motion.a
                key={social}
                href="#"
                className="text-xs tracking-widest text-primary hover:text-muted-foreground transition-colors"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <span className="text-xs tracking-widest text-muted-foreground uppercase">Navigate</span>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/products", label: commonT.learnMore },
              { href: "#features", label: "Features" },
              { href: "#", label: commonT.contact },
            ].map((link, index) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="font-[family-name:var(--font-display)] text-xl text-primary hover:text-muted-foreground transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <span className="text-xs tracking-widest text-muted-foreground uppercase">{commonT.contact}</span>
          <div className="mt-6 space-y-4">
            <Link
              href={`tel:${siteConfig.phone}`}
              className="text-sm text-foreground block"
            >
              {siteConfig.phone}
            </Link>
          </div>
          <motion.div className="mt-8">
            <Link
              href="#"
              className="border-2 border-primary px-6 py-3 text-xs tracking-widest text-primary uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300 inline-block"
            >
              {commonT.getStarted}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <span className="text-[10px] tracking-widest text-muted-foreground uppercase">© 2026</span>
          <span className="text-[10px] tracking-widest text-muted-foreground">—</span>
          <span className="text-[10px] tracking-widest text-muted-foreground uppercase">{commonT.allRightsReserved}</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-[10px] tracking-widest text-muted-foreground uppercase hover:text-primary transition-colors">
            {commonT.privacy}
          </Link>
          <Link href="#" className="text-[10px] tracking-widest text-muted-foreground uppercase hover:text-primary transition-colors">
            {commonT.terms}
          </Link>
        </div>
      </div>

      {/* Large decorative text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <span className="font-[family-name:var(--font-display)] text-[15vw] text-primary/5 tracking-tighter whitespace-nowrap block translate-y-1/2">
          {siteConfig.name.toUpperCase()} • SOFTWARE • STUDIO •
        </span>
      </div>

      {/* Decorative spinning element */}
      <motion.div
        className="absolute right-6 md:right-12 top-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-2xl text-primary/30">✦</span>
      </motion.div>
    </footer>
  )
}
