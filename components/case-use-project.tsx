import React from 'react';
import { CaseStudyData } from '@/components/editorial-case-study';
import { ProjectCarousel } from '@/components/project-carousel';

export default function CaseUseProject({ data, t }: { data: CaseStudyData, t: any }) {
  const images = data.screenshots && data.screenshots.length > 0 ? data.screenshots : [data.screenshotUrl];

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
                  
                  <ProjectCarousel images={images} title={data.title} />

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
