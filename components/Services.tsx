"use client";

import React from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.1);
  const { elementRef: titleRef, isVisible: titleVisible } = useStaggeredAnimation(200);
  const { elementRef: gridRef, isVisible: gridVisible } = useStaggeredAnimation(400);
  const { t } = useTranslation();

  return (
    <section 
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="services" 
      className={`relative py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white section-fade-in ${sectionVisible ? 'visible' : ''}`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 slide-up ${titleVisible ? 'animate' : ''}`}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 tracking-wider uppercase">{t('services.ourServices')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight mb-4 sm:mb-6">
            {t('navigation.services')}
          </h2>
          
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
        </div>

        {/* Grille de services */}
        <div 
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 slide-up ${gridVisible ? 'animate' : ''}`}
        >
          {/* Service 1 - Achat de pièces détachées */}
          <div className="group relative bg-gradient-to-br from-white to-gray-50/80 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-200/50 hover:border-gray-300/50 transition-all duration-700 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2">
            {/* Badge de service - visible seulement sur desktop */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10">
              <span className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-100/90 backdrop-blur-sm text-emerald-800 rounded-full text-xs sm:text-sm font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                {t('services.mainService')}
              </span>
            </div>
            
            {/* Contenu */}
            <div className="relative p-6 sm:p-8 lg:p-12 min-h-[300px] sm:min-h-[400px] flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-wide mb-4 sm:mb-6 group-hover:text-emerald-700 transition-colors duration-500">
                  {t('services.spareParts')}
                </h3>
                
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-light">
                  <p>
                    <span className="font-medium text-gray-800">{t('services.stockDescription')}</span> {t('services.stockDetails')}
                  </p>
                  
                  <p>
                    {t('services.allGenerations')}
                  </p>
                  
                  <p>
                    <span className="font-medium text-emerald-700">{t('services.qualityGuarantee')}</span> {t('services.guaranteeDetails')}
                  </p>
                </div>
              </div>

              {/* Liste des catégories principales */}
              <div className="mt-6 sm:mt-8">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {[t('services.mainCategories.engine'), t('services.mainCategories.electronic'), t('services.mainCategories.body'), t('services.mainCategories.interior')].map((category, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span className="font-medium">{category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Effet de survol */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl sm:rounded-2xl lg:rounded-3xl"></div>
            </div>
          </div>

          {/* Service 2 - Services business */}
          <div className="space-y-6 sm:space-y-8">
            {/* Rachat immédiat */}
            <div className="group relative bg-gradient-to-br from-white to-blue-50/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-200/25 hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  </div>

                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {t('services.immediateRepurchase')}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                    {t('services.immediateRepurchaseDescription')}
                  </p>
                </div>
                      </div>
                  </div>

            {/* Dépôt-vente */}
            <div className="group relative bg-gradient-to-br from-white to-purple-50/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200/50 hover:border-purple-300/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-200/25 hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                    {t('services.specializedConsignment')}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                    {t('services.specializedConsignmentDescription')}
                  </p>
                </div>
              </div>
            </div>

            {/* Expertise & Conseil */}
            <div className="group relative bg-gradient-to-br from-white to-amber-50/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200/50 hover:border-amber-300/50 transition-all duration-500 hover:shadow-lg hover:shadow-amber-200/25 hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 sm:w-8 h-6 sm:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
                    {t('services.expertiseAdvice')}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                    {t('services.expertiseAdviceDescription')}
                  </p>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 