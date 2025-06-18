'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

// Interface pour les props du bouton
interface AppointmentButtonProps {
  /** Fonction appelée lors du clic sur le bouton */
  onClick: () => void;
  /** Variante du style du bouton */
  variant?: 'primary' | 'secondary' | 'minimal' | 'luxury';
  /** Taille du bouton */
  size?: 'sm' | 'md' | 'lg';
  /** Texte personnalisé du bouton */
  text?: string;
  /** Désactiver le bouton */
  disabled?: boolean;
  /** Classe CSS supplémentaire */
  className?: string;
  /** Afficher l'icône */
  showIcon?: boolean;
  /** Véhicule concerné (pour le contexte) */
  vehicleInfo?: {
    make: string;
    model: string;
    year: number;
  };
}

/**
 * Composant bouton pour déclencher l'ouverture du modal de rendez-vous
 * Support complet du système de langue et de différents styles
 */
const AppointmentButton: React.FC<AppointmentButtonProps> = ({
  onClick,
  variant = 'primary',
  size = 'md',
  text,
  disabled = false,
  className = '',
  showIcon = true,
  vehicleInfo,
}) => {
  const { t } = useLanguage();

  // Classes de base communes à toutes les variantes
  const baseClasses = `
    inline-flex items-center justify-center font-semibold transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-opacity-50 transform hover:scale-105
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    border border-transparent rounded-lg shadow-lg hover:shadow-xl
  `;

  // Classes spécifiques selon la taille
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  };

  // Classes spécifiques selon la variante
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-purple-600 text-white
      hover:from-blue-700 hover:to-purple-700
      focus:ring-blue-500 shadow-blue-500/25
    `,
    secondary: `
      bg-gradient-to-r from-gray-700 to-gray-900 text-white
      hover:from-gray-800 hover:to-black
      focus:ring-gray-500 shadow-gray-500/25
    `,
    minimal: `
      bg-white text-gray-800 border-gray-300
      hover:bg-gray-50 hover:border-gray-400
      focus:ring-gray-500 shadow-gray-200/50
    `,
    luxury: `
      bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white
      hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700
      focus:ring-amber-500 shadow-amber-500/30
      border-amber-400/20
    `,
  };

  // Texte personnalisé selon le contexte véhicule
  const getDisplayText = () => {
    // Utiliser le texte fourni en priorité, sinon texte par défaut
    return text || t('appointment.button');
  };

  // Gestionnaire de clic avec feedback haptique (si disponible)
  const handleClick = () => {
    // Feedback haptique sur mobile (si supporté)
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    // Appeler la fonction onClick parent
    onClick();
  };

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
      aria-label={
        vehicleInfo 
          ? t('appointment.appointmentFor') + ` ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}`
          : t('appointment.appointmentGeneral')
      }
      title={
        vehicleInfo 
          ? t('appointment.appointmentFor') + ` ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}`
          : t('appointment.appointmentGeneral')
      }
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Icône calendrier */}
      {showIcon && (
        <CalendarDaysIcon 
          className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} 
          aria-hidden="true"
        />
      )}
      
      {/* Texte du bouton */}
      <span className="flex items-center justify-center gap-2">
        <span className="font-medium tracking-wide">
          {getDisplayText()}
        </span>
      </span>
      
      {/* Animation de pulsation pour attirer l'attention */}
      {variant === 'luxury' && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/20 to-amber-600/20 animate-pulse pointer-events-none" />
      )}
    </motion.button>
  );
};

export default AppointmentButton; 