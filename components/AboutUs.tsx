"use client";

import React from 'react';
import Image from 'next/image';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/LanguageContext';

const AboutUs: React.FC = () => {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.1);
  const { elementRef: titleRef, isVisible: titleVisible } = useStaggeredAnimation(200);
  const { elementRef: contentRef, isVisible: contentVisible } = useStaggeredAnimation(400);
  const { elementRef: imageRef, isVisible: imageVisible } = useStaggeredAnimation(600);
  const { t } = useTranslation();

  return (
    <section 
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="about" 
      className={`relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white overflow-hidden section-fade-in ${sectionVisible ? 'visible' : ''}`}
    >
      {/* Décoration d'arrière-plan */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gray-100/50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-200/40 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 slide-up ${titleVisible ? 'animate' : ''}`}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 tracking-wider uppercase">{t('aboutUs.subtitle')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight mb-4 sm:mb-6">
            {t('aboutUs.title')}
          </h2>
          
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
        </div>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Texte */}
          <div 
            ref={contentRef as React.RefObject<HTMLDivElement>}
            className={`space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 slide-up ${contentVisible ? 'animate' : ''}`}
          >
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-base sm:text-lg text-gray-700 font-light leading-relaxed">
                {t('aboutUs.passion')} <span className="font-medium text-gray-900">{t('aboutUs.cayenne')}</span>{t('aboutUs.specialty')}
              </p>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t('aboutUs.stock')}
              </p>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t('aboutUs.service')}
              </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-200/50">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-1 sm:mb-2">500+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium tracking-wider uppercase">{t('aboutUs.stat1')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-1 sm:mb-2">10</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium tracking-wider uppercase">{t('aboutUs.stat2')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-1 sm:mb-2">10K+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium tracking-wider uppercase">{t('aboutUs.stat3')}</div>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div 
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className={`relative order-1 lg:order-2 slide-up ${imageVisible ? 'animate' : ''}`}
          >
            <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              
              {/* Image du Porsche Cayenne */}
              <Image
                src="/videos/slider.jpg"
                alt="Porsche Cayenne d'exception"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay sans texte pour un look plus propre */}
            </div>

            
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 