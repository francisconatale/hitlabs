import Link from "next/link"
import Image from "next/image"
import siteConfig from '@/config/site.json'
import { TranslationDict } from "@/lib/i18n"

interface SiteFooterProps {
  commonT: TranslationDict['common']
}

const socialLinks = [
  { href: "https://instagram.com/hit_labs", label: "IG" },
  { href: "https://linkedin.com/company/hitslabs", label: "LI" },
]

export function SiteFooter({ commonT }: SiteFooterProps) {
  return (
    <footer className="relative overflow-hidden px-6 md:px-12 lg:px-20 py-12 md:pb-32 border-t border-border mt-12">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
        >
          <Image 
            src="/hitlabs.png" 
            alt="Hitlabs" 
            width={120} 
            height={60} 
            className="w-24 md:w-32 h-auto object-contain"
          />
        </Link>

        <div className="flex gap-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm tracking-widest text-muted-foreground hover:text-primary transition-colors uppercase font-medium"
            >
              {social.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6 text-[10px] md:text-xs tracking-widest text-muted-foreground uppercase">
          <Link href="#" className="hover:text-foreground transition-colors">
            {commonT.privacy}
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            {commonT.terms}
          </Link>
        </div>
      </div>

      {/* Large decorative text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="font-[family-name:var(--font-display)] text-[10vw] text-primary/5 tracking-tighter whitespace-nowrap block translate-y-[20%] text-center">
          {siteConfig.name.toUpperCase()} • SOFTWARE • STUDIO
        </span>
      </div>
    </footer>
  )
}
