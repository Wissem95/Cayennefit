'use client';
import React from 'react';
import { CogIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';

interface CookiePreferencesManagerProps {
  className?: string;
}

/**
 * Composant pour rouvrir les préférences de cookies depuis n'importe où
 * (typiquement utilisé dans le footer)
 */
const CookiePreferencesManager: React.FC<CookiePreferencesManagerProps> = ({ className = '' }) => {
  const { language } = useLanguage();

  // Traductions
  const translations = {
    fr: {
      manage: 'Gérer les cookies',
      title: 'Préférences de cookies',
    },
    en: {
      manage: 'Manage cookies',
      title: 'Cookie preferences',
    },
  };

  const t = translations[language];

  // Réinitialiser le consentement pour rouvrir la popup
  const handleManageCookies = () => {
    localStorage.removeItem('cayennefit_cookie_consent');
    // Recharger la page pour faire réapparaître la popup
    window.location.reload();
  };

  return (
    <button
      onClick={handleManageCookies}
      className={`inline-flex items-center text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200 ${className}`}
      title={t.title}
    >
      <CogIcon className="w-4 h-4 mr-1" />
      {t.manage}
    </button>
  );
};

export default CookiePreferencesManager; 