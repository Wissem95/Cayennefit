'use client';

import React, { useState } from 'react';
import AppointmentButton from './AppointmentButton';
import AppointmentModal from './AppointmentModal';

// Interface pour les props du système de rendez-vous
interface AppointmentSystemProps {
  /** Variante du style du bouton */
  variant?: 'primary' | 'secondary' | 'minimal' | 'luxury';
  /** Taille du bouton */
  size?: 'sm' | 'md' | 'lg';
  /** Texte personnalisé du bouton */
  text?: string;
  /** Classe CSS supplémentaire pour le bouton */
  className?: string;
  /** Afficher l'icône sur le bouton */
  showIcon?: boolean;
  /** Informations du véhicule concerné (optionnel) */
  vehicleInfo?: {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    images: string[];
  };
}

/**
 * Composant système complet de rendez-vous
 * Combine le bouton et le modal pour une utilisation simple
 */
const AppointmentSystem: React.FC<AppointmentSystemProps> = ({
  variant = 'primary',
  size = 'md',
  text,
  className,
  showIcon = true,
  vehicleInfo,
}) => {
  
  // État pour contrôler l'ouverture/fermeture du modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour ouvrir le modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Bouton déclencheur */}
      <AppointmentButton
        onClick={handleOpenModal}
        variant={variant}
        size={size}
        text={text}
        className={className}
        showIcon={showIcon}
        vehicleInfo={vehicleInfo}
      />

      {/* Modal de rendez-vous */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        vehicleInfo={vehicleInfo}
      />
    </>
  );
};

export default AppointmentSystem; 