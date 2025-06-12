"use client";

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Fonction pour une navigation fluide vers les sections
  const handleSmoothScroll = (targetId: string) => {
    // Redirection spéciale vers WhatsApp pour les liens de contact
    if (targetId === "#contact") {
      window.open('https://api.whatsapp.com/send?phone=6583245152', '_blank');
      return;
    }
    
    // Comportement normal pour les autres liens
    const element = document.getElementById(targetId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    services: [
      { name: t('footer.spareParts'), href: "#services" },
      { name: t('footer.expertiseVehicle'), href: "#expertise" },
      { name: t('footer.consignment'), href: "#services" }
    ],
    company: [
      { name: t('navigation.home'), href: "#about" },
      { name: t('footer.expertise'), href: "#expertise" },
      { name: t('footer.contact'), href: "#contact" },
      { name: t('footer.news'), href: "#news" }
    ],
    support: [
      { name: t('footer.helpCenter'), href: "#help" },
      { name: t('footer.warranties'), href: "#warranty" },
      { name: t('footer.financing'), href: "#financing" },
      { name: t('footer.delivery'), href: "#delivery" }
    ]
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.017 0C8.396 0 7.932.013 6.714.06 5.499.107 4.677.252 3.963.472a5.962 5.962 0 0 0-2.197 1.294A5.979 5.979 0 0 0 .472 3.963C.252 4.677.107 5.5.06 6.714.013 7.932 0 8.396 0 12.017c0 3.624.013 4.09.06 5.303.047 1.216.192 2.039.412 2.753a5.98 5.98 0 0 0 1.294 2.197A5.996 5.996 0 0 0 3.963 23.528c.714.22 1.537.365 2.753.412 1.218.047 1.682.06 5.303.06 3.624 0 4.09-.013 5.303-.06 1.216-.047 2.039-.192 2.753-.412a5.89 5.89 0 0 0 2.197-1.294 5.958 5.958 0 0 0 1.294-2.197c.22-.714.365-1.537.412-2.753.047-1.218.06-1.682.06-5.303 0-3.624-.013-4.09-.06-5.303-.047-1.216-.192-2.039-.412-2.753a5.89 5.89 0 0 0-1.294-2.197A5.958 5.958 0 0 0 20.753.472c-.714-.22-1.537-.365-2.753-.412C16.782.013 16.318 0 12.017 0zm0 2.17c3.556 0 3.971.01 5.375.058 1.296.059 2.001.27 2.47.448.621.242 1.065.531 1.532.998.467.467.756.911.998 1.532.178.469.389 1.174.448 2.47.048 1.404.058 1.819.058 5.375 0 3.556-.01 3.971-.058 5.375-.059 1.296-.27 2.001-.448 2.47-.242.621-.531 1.065-.998 1.532a4.127 4.127 0 0 1-1.532.998c-.469.178-1.174.389-2.47.448-1.404.048-1.819.058-5.375.058-3.556 0-3.971-.01-5.375-.058-1.296-.059-2.001-.27-2.47-.448a4.127 4.127 0 0 1-1.532-.998 4.127 4.127 0 0 1-.998-1.532c-.178-.469-.389-1.174-.448-2.47C2.18 15.988 2.17 15.573 2.17 12.017c0-3.556.01-3.971.058-5.375.059-1.296.27-2.001.448-2.47.242-.621.531-1.065.998-1.532a4.127 4.127 0 0 1 1.532-.998c.469-.178 1.174-.389 2.47-.448C8.046 2.18 8.461 2.17 12.017 2.17z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <footer id="contact" className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200/30">
      {/* Conteneur principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section principale - Branding + Liens */}
        <div className="py-6 md:py-10">
          {/* Mobile: Version verticale compacte */}
          <div className="block md:hidden">
            {/* Header mobile - CAYENNEFIT centré */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-light text-gray-900 tracking-[0.15em] mb-2">
                {t('footer.title')}
              </h3>
              <p className="text-sm text-gray-600 font-light px-4 leading-relaxed">
                {t('footer.subtitle')}
              </p>
            </div>

            {/* Contact rapide mobile - ligne compacte */}
            <div className="bg-gray-50/50 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                <span className="text-xs font-light">contact@cayennefit.fr</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-light">+33 1 XX XX XX XX</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                <span className="text-xs font-light text-center">14 bis rue du Bouchain<br/>59124 Escaudain</span>
              </div>
            </div>

            {/* Navigation mobile - Accordéon style */}
            <div className="space-y-4">
              {/* Services */}
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="text-gray-900 font-medium text-sm tracking-wide uppercase mb-3 text-center">
                  {t('footer.servicesTitle')}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {footerLinks.services.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleSmoothScroll(link.href)}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs font-light text-center py-1"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Entreprise + Support en ligne */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="text-gray-900 font-medium text-sm tracking-wide uppercase mb-3 text-center">
                    {t('footer.companyTitle')}
                  </h4>
                  <div className="space-y-2">
                    {footerLinks.company.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => handleSmoothScroll(link.href)}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs font-light block w-full text-center flex items-center justify-center gap-2"
                      >
                        {link.name}
                        {link.href === "#contact" && (
                          <Image
                            src="/images/whatsapp.svg"
                            alt="WhatsApp"
                            width={16}
                            height={16}
                            className="inline-block"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="text-gray-900 font-medium text-sm tracking-wide uppercase mb-3 text-center">
                    {t('footer.supportTitle')}
                  </h4>
                  <div className="space-y-2">
                    {footerLinks.support.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => handleSmoothScroll(link.href)}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs font-light block w-full text-center"
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Version horizontale élégante */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Branding et description */}
              <div className="lg:col-span-4 space-y-4">
                <div>
                  <h3 className="text-2xl font-light text-gray-900 tracking-[0.2em] mb-3">
                    {t('footer.title')}
                  </h3>
                  <p className="text-base text-gray-600 font-light leading-relaxed max-w-md">
                    {t('footer.subtitle')}
                  </p>
                </div>

                {/* Contact rapide */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                    <span className="font-light text-sm">contact@cayennefit.fr</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="font-light text-sm">+33 1 XX XX XX XX</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                    <span className="font-light text-sm">14 bis rue du Bouchain<br/>59124 Escaudain</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className="font-light text-sm">{t('footer.schedule')}</span>
                  </div>
                </div>
              </div>

              {/* Liens de navigation */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-3 gap-8">
                  
                  {/* Services */}
                  <div>
                    <h4 className="text-gray-900 font-semibold text-sm tracking-wider uppercase mb-6">
                      {t('footer.servicesTitle')}
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.services.map((link) => (
                        <li key={link.name}>
                          <button
                            onClick={() => handleSmoothScroll(link.href)}
                            className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-light hover:font-normal hover:translate-x-1 transform"
                          >
                            {link.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Entreprise */}
                  <div>
                    <h4 className="text-gray-900 font-semibold text-sm tracking-wider uppercase mb-6">
                      {t('footer.companyTitle')}
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.company.map((link) => (
                        <li key={link.name}>
                          <button
                            onClick={() => handleSmoothScroll(link.href)}
                            className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-light hover:font-normal hover:translate-x-1 transform flex items-center gap-2"
                          >
                            {link.name}
                            {link.href === "#contact" && (
                              <Image
                                src="/images/whatsapp.svg"
                                alt="WhatsApp"
                                width={18}
                                height={18}
                                className="inline-block"
                              />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Support */}
                  <div>
                    <h4 className="text-gray-900 font-semibold text-sm tracking-wider uppercase mb-6">
                      {t('footer.supportTitle')}
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.support.map((link) => (
                        <li key={link.name}>
                          <button
                            onClick={() => handleSmoothScroll(link.href)}
                            className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-light hover:font-normal hover:translate-x-1 transform"
                          >
                            {link.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Description cachée sur desktop */}
                <div className="mt-8 pt-6 border-t border-gray-200/50">
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {t('footer.subtitle')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section copyright - Même design sur tous écrans */}
        <div className="border-t border-gray-200/30 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            {/* Copyright */}
            <p className="text-gray-600 font-light text-xs text-center md:text-left">
              © {currentYear} CAYENNEFIT. {t('footer.rights')}
            </p>
            
            {/* Liens légaux */}
            <div className="flex flex-wrap justify-center md:justify-end gap-3 text-xs">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
                {t('footer.legalNotice')}
              </a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
                {t('footer.privacy')}
              </a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
