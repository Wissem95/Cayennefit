'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CogIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

interface CookieConsentProps {
  className?: string;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ className = '' }) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Toujours true, non modifiable
    analytics: false,
    marketing: false,
    personalization: false,
  });

  // Vérifier si le consentement a déjà été donné
  useEffect(() => {
    const consent = localStorage.getItem('cayennefit_cookie_consent');
    if (!consent) {
      // Délai pour une meilleure UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Traductions
  const translations = {
    fr: {
      title: 'Gestion des Cookies',
      description: 'Nous utilisons des cookies, y compris des cookies tiers, à des fins de fonctionnement, d\'analyses statistiques, de personnalisation de votre expérience, afin de vous proposer des contenus ciblés adaptés à vos centres d\'intérêts et analyser la performance de nos campagnes publicitaires.',
      customizeText: 'Vous pouvez accepter ces cookies en cliquant sur « Accepter tout » ou cliquer sur « Personnaliser mes choix » pour gérer vos préférences.',
      modifyText: 'Vous pouvez à tout moment modifier vos préférences en bas de page du site cayennefit.io.',
      learnMoreText: 'Pour en savoir plus sur les catégories de cookies ainsi que sur les émetteurs de cookie sur notre site, consultez ici notre notice dédiée à la gestion des cookies.',
      acceptAll: 'Accepter tout',
      rejectAll: 'Refuser tout',
      customize: 'Personnaliser mes choix',
      save: 'Enregistrer mes préférences',
      close: 'Fermer',
      categories: {
        necessary: {
          title: 'Cookies Nécessaires',
          description: 'Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.',
        },
        analytics: {
          title: 'Cookies Analytiques',
          description: 'Ces cookies nous aident à analyser le trafic et améliorer votre expérience.',
        },
        marketing: {
          title: 'Cookies Marketing',
          description: 'Ces cookies permettent d\'afficher des publicités personnalisées.',
        },
        personalization: {
          title: 'Cookies de Personnalisation',
          description: 'Ces cookies permettent de personnaliser votre expérience sur le site.',
        },
      },
    },
    en: {
      title: 'Cookie Management',
      description: 'We use cookies, including third party cookies, for operational purposes, statistical analyses, to personalize your experience, provide you with targeted content tailored to your interests and to analyze the performance of our advertising campaigns.',
      customizeText: 'You can accept these cookies by clicking on "Accept all", or refuse them on "Reject All" or clicking on "Personalize my choices" to manage your preferences.',
      modifyText: 'You can change your preferences at any time at the bottom of cayennefit.io website.',
      learnMoreText: 'For further information about cookie management, please see dedicated section on the Cayennefit.io site of your country of residence.',
      acceptAll: 'Accept All',
      rejectAll: 'Reject All',
      customize: 'Personalize my choices',
      save: 'Save my preferences',
      close: 'Close',
      categories: {
        necessary: {
          title: 'Necessary Cookies',
          description: 'These cookies are essential for the website to function and cannot be disabled.',
        },
        analytics: {
          title: 'Analytics Cookies',
          description: 'These cookies help us analyze traffic and improve your experience.',
        },
        marketing: {
          title: 'Marketing Cookies',
          description: 'These cookies allow us to display personalized advertisements.',
        },
        personalization: {
          title: 'Personalization Cookies',
          description: 'These cookies allow us to personalize your experience on the site.',
        },
      },
    },
  };

  const t = translations[language];

  // Sauvegarder les préférences et fermer la popup
  const savePreferences = (prefs: CookiePreferences) => {
    const consentData = {
      preferences: prefs,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('cayennefit_cookie_consent', JSON.stringify(consentData));
    setIsVisible(false);
    
    // Ici vous pouvez ajouter la logique pour activer/désactiver les cookies
    // Par exemple, Google Analytics, Facebook Pixel, etc.
    console.log('Cookie preferences saved:', prefs);
  };

  // Accepter tous les cookies
  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
    };
    savePreferences(allAccepted);
  };

  // Refuser tous les cookies (sauf nécessaires)
  const rejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
    };
    savePreferences(onlyNecessary);
  };

  // Mettre à jour une préférence
  const updatePreference = (category: keyof CookiePreferences, value: boolean) => {
    if (category === 'necessary') return; // Ne peut pas être modifié
    
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-50 flex items-end lg:items-center justify-center p-4 bg-black/50 backdrop-blur-sm ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`
            w-full max-w-4xl max-h-[90vh] overflow-y-auto
            bg-white rounded-t-2xl lg:rounded-2xl shadow-2xl
            ${showDetails ? 'h-auto' : ''}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-blue/10 rounded-full flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6 text-primary-blue" />
              </div>
              <h2 id="cookie-consent-title" className="text-xl lg:text-2xl font-bold text-gray-900">
                {t.title}
              </h2>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label={t.close}
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description principale */}
            <div className="mb-6">
              <p className="text-gray-700 text-sm lg:text-base leading-relaxed mb-4">
                {t.description}
              </p>
              <p className="text-gray-700 text-sm lg:text-base leading-relaxed mb-4">
                {t.customizeText}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                {t.modifyText}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                <span>{t.learnMoreText.split('consultez ici')[0]}</span>
                <a
                  href="/politique-de-cookies"
                  className="text-primary-blue hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === 'fr' ? 'consultez ici notre notice dédiée' : 'please see dedicated section'}
                </a>
                <span>{language === 'fr' ? ' à la gestion des cookies.' : '.'}</span>
              </p>
            </div>

            {/* Options détaillées */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 border-t pt-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Catégories de cookies
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Cookies Nécessaires */}
                    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {t.categories.necessary.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t.categories.necessary.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={true}
                            disabled={true}
                            className="sr-only"
                          />
                          <div className="w-12 h-6 bg-primary-blue rounded-full flex items-center">
                            <div className="w-5 h-5 bg-white rounded-full shadow-md transform translate-x-6 transition-transform duration-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cookies Analytiques */}
                    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {t.categories.analytics.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t.categories.analytics.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => updatePreference('analytics', !preferences.analytics)}
                          className="relative focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 rounded-full"
                        >
                          <div className={`w-12 h-6 rounded-full flex items-center transition-colors duration-200 ${
                            preferences.analytics ? 'bg-primary-blue' : 'bg-gray-300'
                          }`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                              preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                            }`}></div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Cookies Marketing */}
                    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {t.categories.marketing.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t.categories.marketing.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => updatePreference('marketing', !preferences.marketing)}
                          className="relative focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 rounded-full"
                        >
                          <div className={`w-12 h-6 rounded-full flex items-center transition-colors duration-200 ${
                            preferences.marketing ? 'bg-primary-blue' : 'bg-gray-300'
                          }`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                              preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                            }`}></div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Cookies Personnalisation */}
                    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {t.categories.personalization.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t.categories.personalization.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => updatePreference('personalization', !preferences.personalization)}
                          className="relative focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 rounded-full"
                        >
                          <div className={`w-12 h-6 rounded-full flex items-center transition-colors duration-200 ${
                            preferences.personalization ? 'bg-primary-blue' : 'bg-gray-300'
                          }`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                              preferences.personalization ? 'translate-x-6' : 'translate-x-1'
                            }`}></div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Boutons d'action */}
            <div className="space-y-3 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:space-x-4">
              <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                {/* Bouton Accepter tout */}
                <button
                  onClick={acceptAll}
                  className="px-6 py-3 bg-primary-blue text-white font-semibold rounded-lg hover:bg-primary-blue/90 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 transition-colors duration-200"
                >
                  {t.acceptAll}
                </button>

                {/* Bouton Refuser tout */}
                <button
                  onClick={rejectAll}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors duration-200"
                >
                  {t.rejectAll}
                </button>
              </div>

              <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                {/* Bouton Personnaliser */}
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center justify-center px-6 py-3 bg-secondary-orange text-white font-semibold rounded-lg hover:bg-secondary-orange/90 focus:outline-none focus:ring-2 focus:ring-secondary-orange focus:ring-offset-2 transition-colors duration-200"
                >
                  <CogIcon className="w-5 h-5 mr-2" />
                  {t.customize}
                </button>

                {/* Bouton Enregistrer (visible seulement en mode détaillé) */}
                {showDetails && (
                  <button
                    onClick={() => savePreferences(preferences)}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    {t.save}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent; 