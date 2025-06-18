"use client";

import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Fonction pour une navigation fluide vers les sections
  const handleSmoothScroll = (targetId: string) => {
    // Redirection spéciale vers WhatsApp pour les liens de contact
    if (targetId === "#contact") {
      window.open('https://api.whatsapp.com/send?phone=33785189051', '_blank');
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
      { name: t('footer.contact'), href: "#contact" }
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
    <footer id="contact" className="relative bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200/50">
      {/* Conteneur principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section principale */}
        <div className="py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Section Branding - Élégante et luxueuse */}
            <div className="lg:col-span-5 space-y-6">
              {/* Logo et titre */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-[0.3em] leading-tight mb-3">
                    CAYENNEFIT
                  </h2>
                  <div className="w-20 h-px bg-gradient-to-r from-gray-300 to-gray-400 mb-4"></div>
                  <p className="text-gray-600 font-light leading-relaxed text-base max-w-md">
                    {t('footer.subtitle')}
                  </p>
                </div>
              </div>

              {/* Informations de contact - Design luxueux */}
              <div className="space-y-4">
                <h3 className="text-gray-900 font-medium text-sm tracking-wider uppercase">
                  Informations de contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all duration-300">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-light group-hover:text-gray-900 transition-colors">
                      contact@cayennefit.fr
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all duration-300">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-light group-hover:text-gray-900 transition-colors">
                      07 85 18 90 51
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:shadow-md transition-all duration-300">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-gray-700 font-light group-hover:text-gray-900 transition-colors">
                      <div>14 bis rue du Bouchain</div>
                      <div>59124 Escaudain</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all duration-300">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-light group-hover:text-gray-900 transition-colors">
                      {t('footer.schedule')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Navigation et Carte - Optimisée */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                
                {/* Services */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg tracking-wide mb-2">
                      {t('footer.servicesTitle')}
                    </h3>
                    <div className="w-12 h-px bg-gradient-to-r from-gray-300 to-gray-400 mb-4"></div>
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <li key={link.name}>
                        <button
                          onClick={() => handleSmoothScroll(link.href)}
                          className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-base font-light hover:font-normal hover:translate-x-1 transform flex items-center gap-3 group"
                        >
                          <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-500 transition-colors"></div>
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Entreprise */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg tracking-wide mb-2">
                      {t('footer.companyTitle')}
                    </h3>
                    <div className="w-12 h-px bg-gradient-to-r from-gray-300 to-gray-400 mb-4"></div>
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <button
                          onClick={() => handleSmoothScroll(link.href)}
                          className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-base font-light hover:font-normal hover:translate-x-1 transform flex items-center gap-3 group"
                        >
                          <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-500 transition-colors"></div>
                          <span className="flex items-center gap-2">
                            {link.name}
                            {link.href === "#contact" && (
                              <svg 
                                className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                              </svg>
                            )}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section Carte - Design compact à droite */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg tracking-wide mb-2">
                      Notre emplacement
                    </h3>
                    <div className="w-12 h-px bg-gradient-to-r from-gray-300 to-gray-400 mb-4"></div>
                  </div>
                  <div className="relative group">
                    {/* Conteneur de la carte avec bordure élégante */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      {/* Carte Google Maps intégrée */}
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.123456789!2d3.344444!3d50.335833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2f8a1b2c3d4e5%3A0x1234567890abcdef!2s14%20bis%20Rue%20du%20Bouchain%2C%2059124%20Escaudain%2C%20France!5e0!3m2!1sfr!2sfr!4v1735123456789!5m2!1sfr!2sfr"
                        width="100%"
                        height="180"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-44 object-cover"
                        title="Localisation Cayennefit - 14 bis rue du Bouchain, 59124 Escaudain"
                      />
                      
                      {/* Overlay avec informations au survol */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                            <p className="text-gray-900 font-medium text-xs">
                              14 bis rue du Bouchain
                            </p>
                            <p className="text-gray-600 text-xs">
                              59124 Escaudain
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bouton pour ouvrir dans Google Maps */}
                    <div className="mt-2">
                      <a
                        href="https://www.google.com/maps/dir//14+bis+Rue+du+Bouchain,+59124+Escaudain,+France"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200 group/link"
                      >
                        <svg className="w-3 h-3 text-blue-500 group-hover/link:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="font-light group-hover/link:font-normal transition-all">
                          Ouvrir dans Google Maps
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              
            
            </div>
          </div>
        </div>

        {/* Section copyright - Design élégant */}
        <div className="border-t border-gray-200/50 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <p className="text-gray-600 font-light text-sm">
                © {currentYear} CAYENNEFIT. {t('footer.rights')}
              </p>
            </div>
            
            {/* Liens légaux */}
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-sm">
              <a href="/conditions-generales" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 font-light hover:underline">
                {t('footer.terms')}
              </a>
              <a href="/politique-de-protection-des-donnees" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 font-light hover:underline">
                {t('footer.privacy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
