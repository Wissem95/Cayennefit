"use client";

import React from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/LanguageContext';

const Expertise: React.FC = () => {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.1);
  const { elementRef: titleRef, isVisible: titleVisible } = useStaggeredAnimation(200);
  const { elementRef: gridRef, isVisible: gridVisible } = useStaggeredAnimation(400);
  const { t } = useTranslation();

  const expertiseItems = [
    {
      icon: "🔍",
      title: t('expertise.cards.technical.title'),
      description: t('expertise.cards.technical.description')
    },
    {
      icon: "📋",
      title: t('expertise.cards.history.title'),
      description: t('expertise.cards.history.description')
    },
    {
      icon: "⚙️",
      title: t('expertise.cards.maintenance.title'),
      description: t('expertise.cards.maintenance.description')
    },
    {
      icon: "🛡️",
      title: t('expertise.cards.warranty.title'),
      description: t('expertise.cards.warranty.description')
    },
    {
      icon: "💎",
      title: t('expertise.cards.selection.title'),
      description: t('expertise.cards.selection.description')
    },
    {
      icon: "🚗",
      title: t('expertise.cards.delivery.title'),
      description: t('expertise.cards.delivery.description')
    }
  ];

  return (
    <section 
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="expertise" 
      className={`relative py-20 lg:py-32 bg-white section-fade-in ${sectionVisible ? 'visible' : ''}`}
    >
      {/* Décoration géométrique */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-px h-32 bg-gradient-to-b from-gray-300 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-px h-32 bg-gradient-to-t from-gray-300 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 slide-up ${titleVisible ? 'animate' : ''}`}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gray-50 rounded-full border border-gray-200 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 tracking-wider uppercase">{t('expertise.subtitle')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight mb-4 sm:mb-6">
            {t('expertise.title')}
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed mb-2 sm:mb-4">
            {t('expertise.description')}
          </p>
          
          <p className="text-base sm:text-lg text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            {t('expertise.strategy')}
          </p>
        </div>

        {/* Grille d'expertise */}
        <div 
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 slide-up ${gridVisible ? 'animate' : ''}`}
        >
          {expertiseItems.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
            >
              {/* Badge numéroté */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-6 sm:w-8 h-6 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200/50">
                <span className="text-xs font-medium text-gray-500">{String(index + 1).padStart(2, '0')}</span>
              </div>

              {/* Icône */}
              <div className="mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200/50 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl sm:text-2xl" role="img" aria-label={item.title}>{item.icon}</span>
                </div>
              </div>

              {/* Contenu */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 tracking-wide">
                  {item.title}
                </h3>
                {/* Petit texte explicatif pour la carte "ASSISTANCE A DISTANCE" */}
                {index === 1 && (
                  <p className="text-xs text-gray-500 leading-tight -mt-2">
                    Téléchargez notre brochure et découvrez nos forfaits
                  </p>
                )}
                <div className="flex items-start gap-3">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light flex-1">
                    {item.description}
                  </p>
                  {/* Logos pour la carte "ASSISTANCE A DISTANCE" (index 1) */}
                  {index === 1 && (
                    <div className="flex flex-shrink-0 gap-2">
                      {/* Logo PDF pour télécharger */}
                      <button
                        onClick={() => {
                          // Fonction pour télécharger le PDF des forfaits assistance
                          const link = document.createElement('a');
                          link.href = '/documents/Nosoffresassistanceadistance.pdf';
                          link.download = 'Nosoffresassistanceadistance.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25 z-10"
                        title="Télécharger les forfaits assistance à distance (PDF)"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                          <path d="M12,11L16,15H13V19H11V15H8L12,11Z" />
                        </svg>
                      </button>
                      {/* Logo WhatsApp */}
                      <button
                        onClick={() => window.open('https://api.whatsapp.com/send?phone=33785189051', '_blank')}
                        className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/25 z-10"
                        title="Contacter via WhatsApp"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787z"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Effet de survol */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="w-full max-w-4xl mx-auto flex flex-col xl:flex-row items-center gap-6 bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200/50">
            <div className="flex-1 text-center xl:text-left">
              <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-2">
                {t('expertise.contactExperts')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-light">
                {t('expertise.contactDescription')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row xl:flex-row items-center justify-center gap-3 w-full xl:w-auto">
              <button 
                onClick={() => {
                  // Fonction pour télécharger le PDF des forfaits assistance
                  const link = document.createElement('a');
                  link.href = '/documents/Nosoffresassistanceadistance.pdf';
                  link.download = 'Nosoffresassistanceadistance.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="group w-full sm:w-auto px-3 sm:px-4 lg:px-5 py-3 sm:py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/25 hover:-translate-y-0.5 min-w-0"
              >
                <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <span className="truncate">{t('expertise.assistanceButton')}</span>
                  <svg className="w-4 h-4 flex-shrink-0 group-hover:translate-y-[-2px] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
              </button>
              <button 
                onClick={() => window.open('https://api.whatsapp.com/send?phone=33785189051', '_blank')}
                className="group w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/25 hover:-translate-y-0.5 min-w-0"
              >
                <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <span className="truncate">{t('expertise.contactButton')}</span>
                  <svg className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;