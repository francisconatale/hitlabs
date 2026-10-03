"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface ProjectCarouselProps {
  images: string[];
  title: string;
}

export function ProjectCarousel({ images, title }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  // Lógica para deslizar con el dedo en móviles
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  return (
    <div className="w-full">
      {/* DESKTOP PRESENTATION (Fading Carousel with Arrows) */}
      <div className="hidden md:flex flex-col items-center gap-6" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="flex items-center justify-between w-full gap-6">
          
          {images.length > 1 && (
            <button 
              onClick={prevImage}
              className="shrink-0 bg-white hover:bg-gray-50 text-black p-3 rounded-full shadow-sm border border-black/10 transition-all duration-300 hover:scale-110"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}

          <div 
            className="group relative overflow-hidden w-full bg-white flex items-center justify-center rounded-xl border border-black/10 shadow-2xl transition-all duration-700 hover:shadow-3xl aspect-video z-[45]" 
            style={{ maxWidth: '900px' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((imgSrc, idx) => (
              <Image
                key={idx}
                priority={idx === 0}
                src={imgSrc} 
                alt={`${title} screenshot ${idx + 1}`} 
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className={`object-cover opacity-100 transition-opacity duration-700 ease-in-out ${
                  idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`} 
              />
            ))}
          </div>

          {images.length > 1 && (
            <button 
              onClick={nextImage}
              className="shrink-0 bg-white hover:bg-gray-50 text-black p-3 rounded-full shadow-sm border border-black/10 transition-all duration-300 hover:scale-110"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-3 justify-center mt-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-primary scale-125' : 'bg-black/20 hover:bg-black/40'}`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* MOBILE PRESENTATION (Native Horizontal Scroll with Peek) */}
      <div className="md:hidden flex flex-col w-[100vw] relative left-1/2 -ml-[50vw] !pb-0 !pt-2">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 !pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {images.map((imgSrc, idx) => (
            <div key={idx} className="snap-center shrink-0 w-[85vw] aspect-video relative flex flex-col rounded-xl overflow-hidden border border-black/10 shadow-xl bg-white z-[45]">
              {/* Image Content */}
              <Image 
                priority={idx === 0}
                src={imgSrc} 
                alt={`${title} screenshot ${idx + 1}`} 
                fill
                sizes="85vw"
                className="object-cover" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
