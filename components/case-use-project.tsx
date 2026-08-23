"use client"
import React, { useState, useEffect } from 'react';
import { CaseStudyData } from '@/components/editorial-case-study';

export default function CaseUseProject({ data, t }: { data: CaseStudyData, t: any }) {
  const images = data.screenshots && data.screenshots.length > 0 ? data.screenshots : [data.screenshotUrl];
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
    setTouchEnd(null); // Resetear end en un nuevo toque
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
    <>
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
      <link href="https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b/css/bungee-pro.webflow.shared.1f8392690.css" rel="stylesheet" type="text/css" />


      <div className="page-wrapper">
        <div className="main-wrapper">
          <section className="project-details">
            <div className="container">
              <div className="project-details-content-wrapper">
                
                <div className="project-details-info-wrapper">
                  <h1 style={{ color: '#000', fontSize: '4rem', lineHeight: '1' }}>{data.title}</h1>
                  <div className="project-details-info-block">
                    <div className="project-short-description-block">
                      <div className="paragraph-l-regular">
                        {data.descriptionParagraphs[0]}
                      </div>
                    </div>
                    <div className="project-info-items-block">
                      <div className="project-info-item">
                        <div className="paragraph-s-regular text-color-secondary">{t.location}</div>
                        <div className="paragraph-m-regular">{data.location}</div>
                      </div>
                      <div className="project-info-item">
                        <div className="paragraph-s-regular text-color-secondary">{t.features}</div>
                        <div className="paragraph-m-regular">{data.features.map(f => f.title).join(', ')}</div>
                      </div>
                      <div className="project-info-item">
                        <div className="paragraph-s-regular text-color-secondary">{t.liveProject}</div>
                        <a href={data.websiteUrl} className="project-link-button w-inline-block" target="_blank" rel="noopener noreferrer">
                          <div>{t.preview}</div>
                          <img loading="lazy" src="https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b/6904ca7a4abbe56dfff89525_plus-icon.svg" alt="Plus icon" className="project-link-button-icon" />
                          <div className="project-link-button-bottom-line"></div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="project-details-content-block">
                  
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

                        <div className="group relative overflow-hidden w-full bg-white flex items-center justify-center rounded-xl border border-black/10 shadow-2xl transition-all duration-700 hover:shadow-3xl" style={{ maxWidth: '900px' }}>
                          {images.map((imgSrc, idx) => (
                            <img 
                              key={idx}
                              loading={idx === 0 ? "eager" : "lazy"}
                              src={imgSrc} 
                              alt={`${data.title} screenshot ${idx + 1}`} 
                              className={`${idx === 0 ? 'relative' : 'absolute inset-0'} block w-full h-auto opacity-100 transition-opacity duration-700 ease-in-out ${
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
                          <div key={idx} className="snap-center shrink-0 w-[85vw] flex flex-col rounded-xl overflow-hidden border border-black/10 shadow-xl bg-white">
                            {/* Image Content */}
                            <img 
                              loading={idx === 0 ? "eager" : "lazy"}
                              src={imgSrc} 
                              alt={`${data.title} screenshot ${idx + 1}`} 
                              className="block w-full h-auto object-cover" 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="project-main-description-wrapper !mt-4 md:!mt-6">
                    {data.descriptionParagraphs[1] && (
                      <div className="heading-style-h5">
                        {data.descriptionParagraphs[1]}
                      </div>
                    )}
                    <div className="project-main-description-block">
                      {data.descriptionParagraphs.slice(2).map((paragraph, idx) => (
                        <p key={idx} className="paragraph-l-regular">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
