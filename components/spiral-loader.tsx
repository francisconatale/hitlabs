'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLoader } from '@/components/loader-provider';
import gsap from 'gsap';

interface SpiralLoaderProps {
  /** Callback al finalizar la animación */
  onComplete?: () => void;
  /** Clase opcional para el contenedor */
  className?: string;
}

export function SpiralLoader({ onComplete, className = '' }: SpiralLoaderProps) {
  const pathname = usePathname();
  const { hasLoaded, markAsLoaded } = useLoader();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo se ejecuta en el Home ('/') y si no cargó previamente en la sesión
    if (pathname !== '/' || hasLoaded) return;

    const container = containerRef.current;
    const path = pathRef.current;
    const logo = logoRef.current;
    if (!container || !path || !logo) return;

    // Bloquear scroll mientras el loader esté activo
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const noTouchScroll = (e: TouchEvent) => e.preventDefault();
    window.addEventListener('touchmove', noTouchScroll, { passive: false });

    const unlockScroll = () => {
      document.body.style.overflow = originalOverflow || '';
      window.removeEventListener('touchmove', noTouchScroll);
    };

    const ctx = gsap.context(() => {
      const L = path.getTotalLength();

      // 1. Estado inicial:
      // Fondo gris (bg-background) con el logo visible en el centro
      gsap.set(container, {
        display: 'flex',
        backgroundColor: 'var(--background)',
        pointerEvents: 'all',
      });
      gsap.set(logo, { autoAlpha: 1 });

      // 2. El SVG original de la espiral arranca fuera de pantalla con stroke-width 600
      gsap.set(path, {
        strokeDasharray: `${L} ${L}`,
        strokeDashoffset: L,
        attr: { 'stroke-width': 600 },
        opacity: 1,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          unlockScroll();
          markAsLoaded();
          gsap.set(container, { display: 'none' });
          if (onComplete) onComplete();
        },
      });

      tl
        // Pequeña pausa inicial donde se aprecia el logo sobre el fondo gris
        .to({}, { duration: 0.3 })

        // 1. Viene la espiral SVG original, se enrolla, pasa por encima y TAPA el logo
        .to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        })

        // 2. Una vez que la espiral tapó toda la pantalla, liberamos el fondo y ocultamos el logo
        .set(container, {
          backgroundColor: 'transparent',
          pointerEvents: 'none',
        })
        .set(logo, { autoAlpha: 0 })

        // 3. La espiral se desenrolla (un-coils) de arriba hacia abajo y se acomoda la página
        .to(path, {
          strokeDashoffset: -L,
          duration: 1.35,
          ease: 'power3.inOut',
        })
        // Adelgaza el trazo a 420px exactamente como el original de Flau
        .to(
          path,
          {
            attr: { 'stroke-width': 420 },
            duration: 0.85,
            ease: 'power2.in',
          },
          '<+=0.25'
        );
    }, containerRef);

    return () => {
      unlockScroll();
      ctx.revert();
    };
  }, [onComplete, pathname, hasLoaded, markAsLoaded]);

  // Si no estamos en Home o ya cargó en esta sesión, no renderizar
  if (pathname !== '/' || hasLoaded) return null;

  return (
    <div
      id="hitlabs-spiral-loader"
      ref={containerRef}
      className={`fixed inset-0 z-[9999] overflow-hidden bg-background text-primary pointer-events-auto flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Script síncrono para eliminar el elemento ANTES del primer renderizado si ya cargó en sesión */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('hitlabs_initial_loader_shown')==='true'){var el=document.getElementById('hitlabs-spiral-loader');if(el)el.style.display='none';}}catch(e){}`,
        }}
      />

      {/* Logo de Hitlabs sobre el fondo gris (z-10) */}
      <div
        ref={logoRef}
        className="relative z-10 flex items-center justify-center w-52 md:w-64 max-w-[65vw]"
      >
        <Image
          src="/hitlabs.png"
          alt="Hitlabs"
          width={260}
          height={130}
          priority
          className="w-full h-auto object-contain"
        />
      </div>

      {/* SVG con el trazo original de Flau (z-20) que viene, lo tapa y luego se desenrolla */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute -inset-[5%] w-[110%] h-[110%] z-20 pointer-events-none"
      >
        <path
          ref={pathRef}
          d="M 450 -300 C 1300 -200 1250 380 700 370 C 150 360 120 60 420 80 C 950 110 1150 640 600 660 C 50 680 20 380 320 400 C 900 440 1200 1000 700 1050 C 200 1100 -150 900 200 1300"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0"
          style={{ opacity: 0 }}
        />
      </svg>
    </div>
  );
}

export default SpiralLoader;
