'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowLeft, Play, RotateCcw, Sparkles } from 'lucide-react';

type VariantKey = 'liquid-curtain' | 'column-slats' | 'logo-journey' | 'circular-iris';

interface VariantInfo {
  id: VariantKey;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const VARIANTS: VariantInfo[] = [
  {
    id: 'liquid-curtain',
    num: '01',
    title: 'Liquid Curved Curtain',
    subtitle: 'Cortina líquida con arrastre elástico',
    description: 'La cortina azul sube con una curva inferior orgánica (arco SVG dinámico) que se estira y aplana con inercia física.',
    tags: ['Estilo Locomotive', 'Ultra Fluido', 'Recomendado'],
  },
  {
    id: 'column-slats',
    num: '02',
    title: 'Multi-Column Slats',
    subtitle: 'Persianas verticales en cascada',
    description: 'La pantalla se divide en 5 columnas arquitectónicas que se deslizan hacia arriba con un micro-stagger progresivo.',
    tags: ['Arquitectónico', 'Moderno', 'Editorial'],
  },
  {
    id: 'logo-journey',
    num: '03',
    title: 'Logo Journey to Navbar',
    subtitle: 'Transición cinemática continua',
    description: 'El logo blanco viaja desde el centro de la pantalla hasta su posición exacta en la barra de navegación mientras el hero aparece.',
    tags: ['Sin Telón Raro', 'Continuidad Total', 'Minimalista'],
  },
  {
    id: 'circular-iris',
    num: '04',
    title: 'Circular Iris Reveal',
    subtitle: 'Máscara concéntrica desde el centro',
    description: 'Una apertura circular nace desde el centro exacto del logo y se expande en pantalla completa con aceleración exponencial.',
    tags: ['Geométrico', 'Dinámico', 'Enfocado'],
  },
];

export default function DesignLabPage() {
  const [activeVariant, setActiveVariant] = useState<VariantKey>('liquid-curtain');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  // Referencias para las animaciones
  const liquidContainerRef = useRef<HTMLDivElement>(null);
  const liquidCurveRef = useRef<SVGPathElement>(null);
  const liquidLogoRef = useRef<HTMLDivElement>(null);

  const slatsContainerRef = useRef<HTMLDivElement>(null);
  const slatsRefs = useRef<HTMLDivElement[]>([]);
  const slatsLogoRef = useRef<HTMLDivElement>(null);

  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const journeyLogoRef = useRef<HTMLDivElement>(null);

  const irisContainerRef = useRef<HTMLDivElement>(null);
  const irisLogoRef = useRef<HTMLDivElement>(null);

  // Ejecutor de variantes
  const runVariant = (variantId: VariantKey) => {
    setIsPlaying(true);
    const speed = 1 / speedMultiplier;

    // Resetear todos los contenedores primero
    [liquidContainerRef, slatsContainerRef, journeyContainerRef, irisContainerRef].forEach(ref => {
      if (ref.current) gsap.set(ref.current, { display: 'none' });
    });

    if (variantId === 'liquid-curtain') {
      const container = liquidContainerRef.current;
      const curve = liquidCurveRef.current;
      const logo = liquidLogoRef.current;
      if (!container || !curve || !logo) return;

      gsap.set(container, { display: 'flex', yPercent: 0 });
      gsap.set(logo, { autoAlpha: 0, scale: 0.9, y: 15 });
      // Curva plana inicial
      curve.setAttribute('d', 'M 0 100 Q 50 100 100 100 L 100 0 L 0 0 Z');

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { display: 'none' });
          setIsPlaying(false);
        },
      });

      tl
        // 1. Logo fade in
        .to(logo, { autoAlpha: 1, scale: 1, y: 0, duration: 0.45 * speed, ease: 'power3.out' })
        .to({}, { duration: 0.3 * speed })
        .to(logo, { autoAlpha: 0, y: -20, duration: 0.35 * speed, ease: 'power2.in' })
        // 2. Subida con curva estirada
        .to(container, {
          yPercent: -100,
          duration: 0.95 * speed,
          ease: 'power4.inOut',
        }, '-=0.1')
        // Deformación del arco líquido durante la subida
        .to(curve, {
          attr: { d: 'M 0 100 Q 50 20 100 100 L 100 0 L 0 0 Z' },
          duration: 0.45 * speed,
          ease: 'power2.in',
        }, '<')
        .to(curve, {
          attr: { d: 'M 0 100 Q 50 100 100 100 L 100 0 L 0 0 Z' },
          duration: 0.5 * speed,
          ease: 'power3.out',
        }, '>');
    } else if (variantId === 'column-slats') {
      const container = slatsContainerRef.current;
      const slats = slatsRefs.current;
      const logo = slatsLogoRef.current;
      if (!container || !logo) return;

      gsap.set(container, { display: 'block' });
      gsap.set(slats, { yPercent: 0 });
      gsap.set(logo, { autoAlpha: 0, scale: 0.88 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { display: 'none' });
          setIsPlaying(false);
        },
      });

      tl
        .to(logo, { autoAlpha: 1, scale: 1, duration: 0.45 * speed, ease: 'power3.out' })
        .to({}, { duration: 0.3 * speed })
        .to(logo, { autoAlpha: 0, scale: 0.95, duration: 0.3 * speed, ease: 'power2.in' })
        // 5 columnas se disparan hacia arriba en cascada
        .to(slats, {
          yPercent: -100,
          duration: 0.85 * speed,
          stagger: 0.06 * speed,
          ease: 'power4.inOut',
        }, '-=0.1');
    } else if (variantId === 'logo-journey') {
      const container = journeyContainerRef.current;
      const logo = journeyLogoRef.current;
      if (!container || !logo) return;

      gsap.set(container, { display: 'flex', opacity: 1 });
      gsap.set(logo, {
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        scale: 1.25,
        autoAlpha: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { display: 'none' });
          setIsPlaying(false);
        },
      });

      tl
        // Logo aparece en el centro
        .to(logo, { autoAlpha: 1, scale: 1, duration: 0.45 * speed, ease: 'power2.out' })
        .to({}, { duration: 0.3 * speed })
        // El logo viaja a la posición superior (Navbar)
        .to(logo, {
          top: '2.5rem',
          scale: 0.65,
          duration: 0.95 * speed,
          ease: 'expo.inOut',
        })
        // El fondo azul se desvanece suavemente
        .to(container, {
          opacity: 0,
          duration: 0.7 * speed,
          ease: 'power3.out',
        }, '<+=0.25');
    } else if (variantId === 'circular-iris') {
      const container = irisContainerRef.current;
      const logo = irisLogoRef.current;
      if (!container || !logo) return;

      gsap.set(container, {
        display: 'flex',
        clipPath: 'circle(150% at 50% 50%)',
      });
      gsap.set(logo, { autoAlpha: 0, scale: 0.9 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { display: 'none' });
          setIsPlaying(false);
        },
      });

      tl
        .to(logo, { autoAlpha: 1, scale: 1, duration: 0.4 * speed, ease: 'power3.out' })
        .to({}, { duration: 0.25 * speed })
        .to(logo, { autoAlpha: 0, scale: 1.1, duration: 0.3 * speed, ease: 'power2.in' })
        // La máscara circular se abre hacia afuera (o se retira)
        .to(container, {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 0.95 * speed,
          ease: 'expo.inOut',
        }, '-=0.1');
    }
  };

  // Reproducir variante seleccionada al cambiar de tab
  useEffect(() => {
    runVariant(activeVariant);
  }, [activeVariant]);

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20 selection:text-primary">

      {/* ─── OVERLAYS DE ANIMACIÓN ────────────────────────────────────────── */}

      {/* 1. LIQUID CURTAIN */}
      <div
        ref={liquidContainerRef}
        className="fixed inset-0 z-[9999] pointer-events-none hidden flex-col bg-primary text-primary-foreground"
      >
        <div className="flex-1 flex items-center justify-center relative z-20">
          <div ref={liquidLogoRef} className="w-52 md:w-64">
            <Image src="/hitlabs-white.png" alt="Hitlabs" width={260} height={130} priority className="w-full h-auto object-contain drop-shadow-md" />
          </div>
        </div>
        {/* Curva SVG inferior */}
        <div className="w-full h-24 md:h-32 text-primary overflow-visible">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current">
            <path ref={liquidCurveRef} d="M 0 100 Q 50 100 100 100 L 100 0 L 0 0 Z" />
          </svg>
        </div>
      </div>

      {/* 2. MULTI-COLUMN SLATS */}
      <div
        ref={slatsContainerRef}
        className="fixed inset-0 z-[9999] pointer-events-none hidden"
      >
        <div className="absolute inset-0 grid grid-cols-5 h-full w-full">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              ref={(el) => { if (el) slatsRefs.current[i] = el; }}
              className="h-full w-full bg-primary"
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div ref={slatsLogoRef} className="w-52 md:w-64">
            <Image src="/hitlabs-white.png" alt="Hitlabs" width={260} height={130} priority className="w-full h-auto object-contain drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* 3. LOGO JOURNEY */}
      <div
        ref={journeyContainerRef}
        className="fixed inset-0 z-[9999] pointer-events-none hidden bg-primary"
      >
        <div ref={journeyLogoRef} className="fixed z-30 w-52 md:w-64">
          <Image src="/hitlabs-white.png" alt="Hitlabs" width={260} height={130} priority className="w-full h-auto object-contain drop-shadow-md" />
        </div>
      </div>

      {/* 4. CIRCULAR IRIS */}
      <div
        ref={irisContainerRef}
        className="fixed inset-0 z-[9999] pointer-events-none hidden bg-primary flex items-center justify-center"
      >
        <div ref={irisLogoRef} className="w-52 md:w-64 relative z-10">
          <Image src="/hitlabs-white.png" alt="Hitlabs" width={260} height={130} priority className="w-full h-auto object-contain drop-shadow-md" />
        </div>
      </div>

      {/* ─── DESIGN LAB TOOLBAR SUPERIOR ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a Home
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5 font-bold text-sm tracking-tight">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>HITLABS DESIGN LAB</span>
            </div>
          </div>

          {/* Selector de variantes */}
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVariant(v.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeVariant === v.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="opacity-60 mr-1.5">{v.num}</span>
                {v.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Controles de reproducción */}
          <div className="flex items-center gap-2">
            <select
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
              className="text-xs bg-muted px-2.5 py-1.5 rounded-md font-medium border border-border text-foreground focus:outline-none"
            >
              <option value={0.5}>0.5x (Lento)</option>
              <option value={1}>1.0x (Normal)</option>
              <option value={1.3}>1.3x (Rápido)</option>
            </select>

            <button
              onClick={() => runVariant(activeVariant)}
              disabled={isPlaying}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-md shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay
            </button>
          </div>
        </div>
      </header>

      {/* ─── TARJETA INFORMATIVA DE LA VARIANTE ACTIVA ───────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        {(() => {
          const current = VARIANTS.find(v => v.id === activeVariant)!;
          return (
            <div className="bg-card border border-border rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                    VARIANTE {current.num}
                  </span>
                  <span className="text-xs text-muted-foreground">• {current.subtitle}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-1">{current.title}</h1>
                <p className="text-sm text-muted-foreground max-w-2xl">{current.description}</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {current.tags.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-muted font-medium text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      {/* ─── SIMULACIÓN DE CONTENIDO REAL DE HITLABS (PARA VER LA REVELACIÓN) ─ */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="border border-border rounded-2xl overflow-hidden bg-background shadow-lg">
          {/* Header simulado */}
          <div className="p-6 md:p-8 flex items-center justify-between border-b border-border bg-background">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">HITLABS PREVIEW</span>
            <div className="w-32 md:w-40">
              <Image src="/hitlabs.png" alt="Hitlabs" width={160} height={80} className="w-full h-auto object-contain" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">LIVE ENVIRONMENT</span>
          </div>

          {/* Hero simulado */}
          <div className="p-8 md:p-16 text-center max-w-4xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              AGENCIA DIGITAL & SOFTWARE
            </span>
            <h2 className="text-4xl md:text-7xl font-extrabold uppercase tracking-tighter text-foreground leading-[0.95] mb-6">
              CREAMOS PRODUCTOS QUE IMPACTAN
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Observa cómo cada variante descubre este contenido: sin saltos bruscos, con aceleración prémium y adaptado a los colores oficiales.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => runVariant(activeVariant)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm shadow hover:opacity-90 transition-opacity"
              >
                <Play className="w-4 h-4 fill-current" /> Probar Animación de Entrada
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
