"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react"

export function ReferidosContent({ t }: { t: any }) {
  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* ── Hero Section ── */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-32 pb-20 overflow-hidden border-b border-border">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] -z-10">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-primary" />
          <div className="absolute left-2/4 top-0 bottom-0 w-px bg-primary" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-primary" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col gap-12 mt-10">
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-widest text-primary uppercase border border-primary/20 px-3 py-1">
              {t.hero.badge}
            </span>
            <div className="w-24 h-px bg-primary/20" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary tracking-tighter leading-[0.9] uppercase uppercase">
              {t.hero.headline}
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
              {t.hero.mainBenefit}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
             <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-transparent hover:text-primary border-2 border-primary text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-6 rounded-none transition-all duration-300"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary/20 hover:border-primary text-primary bg-transparent text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-6 rounded-none transition-all duration-300"
            >
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 border-b border-border bg-card/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] tracking-widest text-primary/60 uppercase mb-4">— {t.howItWorks.badge}</div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl text-primary tracking-tight uppercase mb-16">
            {t.howItWorks.headline}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.howItWorks.steps.map((step: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group border border-border bg-background p-8 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 font-[family-name:var(--font-display)] text-8xl text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none">
                  {step.num}
                </div>
                <div className="mb-8 inline-flex h-10 w-10 items-center justify-center border border-primary/20 text-primary">
                  <span className="font-[family-name:var(--font-display)] text-lg">{step.num}</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commissions Table & Payment ── */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Earnings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[10px] tracking-widest text-primary/60 uppercase mb-4">— {t.earnings.badge}</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl text-primary tracking-tight uppercase mb-8">
              {t.earnings.headline}
            </h2>

            <div className="border border-border bg-card/5 overflow-hidden">
              <div className="grid grid-cols-3 border-b border-border bg-primary/5 px-6 py-4">
                {t.earnings.tableHeaders.map((header: string, i: number) => (
                  <div key={i} className={`text-[10px] font-bold tracking-widest text-primary/80 uppercase ${i === 2 ? 'text-right' : ''}`}>
                    {header}
                  </div>
                ))}
              </div>
              {t.earnings.rows.map((row: any, i: number) => (
                <div key={i} className="grid grid-cols-3 px-6 py-5 border-b border-border/50 hover:bg-card/20 transition-colors">
                  <div className="text-sm text-primary font-medium">{row.type}</div>
                  <div className="text-sm text-muted-foreground">{row.action}</div>
                  <div className="text-right text-lg font-[family-name:var(--font-display)] text-primary">{row.commission}</div>
                </div>
              ))}
              <div className="px-6 py-4 bg-primary/5 text-xs text-muted-foreground">
                {t.earnings.footnote}
              </div>
            </div>
          </motion.div>

          {/* Payment When? */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="text-[10px] tracking-widest text-primary/60 uppercase mb-4">— {t.payment.badge}</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl text-primary tracking-tight uppercase mb-8">
              {t.payment.headline}
            </h2>

            <div className="flex-1 flex flex-col justify-center border border-border p-8 bg-card/5">
              <ul className="space-y-6">
                {t.payment.conditions.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5 opacity-70" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-primary/10 text-xs tracking-wide text-primary/80 uppercase font-medium">
                {t.payment.footnote}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Key Condition & Example & Who Can Join ── */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Who can join */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-primary/20 bg-background p-8"
          >
            <div className="text-[10px] tracking-widest text-primary/60 uppercase mb-4">— {t.whoCanJoin.badge}</div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-primary mb-6 uppercase">
              {t.whoCanJoin.headline}
            </h3>
            <ul className="space-y-3">
              {t.whoCanJoin.items.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <ChevronRight className="h-3 w-3 text-primary/50" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-primary/20 bg-background p-8"
          >
            <div className="text-[10px] tracking-widest text-primary/60 uppercase mb-4">— {t.example.badge}</div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-primary mb-6 uppercase">
              {t.example.headline}
            </h3>
            
            <div className="border border-border p-4 mb-4">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-muted-foreground uppercase text-[10px] tracking-wider">{t.example.saleLabel}</span>
                <span className="font-[family-name:var(--font-display)] text-xl text-primary">{t.example.saleAmount}</span>
              </div>
              <div className="h-px bg-border my-3 w-full" />
              {t.example.commissions.map((c: any, i: number) => (
                <div key={i} className="flex justify-between items-center text-sm py-1">
                  <span className="text-primary/70">{c.label}</span>
                  <span className="text-primary font-bold">{c.amount}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground/80 leading-relaxed uppercase">
              {t.example.installmentsNote}
            </p>
          </motion.div>

           {/* Key Condition */}
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-2 border-primary bg-primary text-primary-foreground p-8 flex flex-col"
          >
            <div className="text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2 opacity-80">
              <AlertCircle className="h-4 w-4" />
              {t.keyCondition.badge}
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-3xl mb-4 uppercase leading-tight hover:italic transition-all">
              {t.keyCondition.headline}
            </h3>
            <p className="text-sm opacity-80 mt-auto leading-relaxed">
              {t.keyCondition.description}
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 lg:py-32 text-center">
         <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto border border-primary/20 bg-background p-12 md:p-20 relative overflow-hidden group"
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-tr-full -z-10 group-hover:scale-150 transition-transform duration-700" />
            
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl text-primary tracking-tight uppercase mb-12">
              {t.finalCta.headline}
            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-transparent hover:text-primary border-2 border-primary text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-6 rounded-none transition-all duration-300"
              >
                {t.finalCta.ctaPrimary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 hover:border-primary text-primary bg-transparent text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-6 rounded-none transition-all duration-300"
              >
                {t.finalCta.ctaSecondary}
              </Button>
            </div>
         </motion.div>

         <div className="mt-16">
            <a href="/refferals.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors underline underline-offset-4 decoration-border">
              {t.legalLink}
            </a>
         </div>
      </section>

    </div>
  )
}
