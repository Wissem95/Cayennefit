'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { XMarkIcon, CalendarDaysIcon, UserIcon, EnvelopeIcon, PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from 'date-fns/locale';

// Interface pour les données du formulaire
interface AppointmentFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  appointmentDate: Date;
  serviceType: string;
  message?: string;
}

// Interface pour les props du modal
interface AppointmentModalProps {
  /** État d'ouverture du modal */
  isOpen: boolean;
  /** Fonction de fermeture du modal */
  onClose: () => void;
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
 * Modal principal pour la prise de rendez-vous
 * Design luxueux avec calendrier intégré et formulaire complet
 */
const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  vehicleInfo,
}) => {
  
  // État local pour le loading et les erreurs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Configuration du formulaire avec React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm<AppointmentFormData>({
    mode: 'onChange',
    defaultValues: {
      appointmentDate: new Date(),
      serviceType: vehicleInfo ? 'test_drive' : 'meeting',
    }
  });

  // Surveiller la date sélectionnée pour le DatePicker
  const selectedDate = watch('appointmentDate');

  // Types de services disponibles
  const serviceTypes = [
    { value: 'test_drive', label: '🚗 Essai du véhicule', icon: '🚗' },
    { value: 'inspection', label: '🔍 Inspection technique', icon: '🔍' },
    { value: 'meeting', label: '🤝 Rendez-vous commercial', icon: '🤝' },
    { value: 'other', label: '📋 Autre demande', icon: '📋' }
  ];

  // Réinitialiser le formulaire à l'ouverture
  useEffect(() => {
    if (isOpen) {
      reset({
        appointmentDate: new Date(),
        serviceType: vehicleInfo ? 'test_drive' : 'meeting',
      });
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  }, [isOpen, reset, vehicleInfo]);

  // Fonction de soumission du formulaire
  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        ...data,
        vehicleId: vehicleInfo?.id || null,
        appointmentDate: data.appointmentDate.toISOString(),
      };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la soumission');
      }

      // Succès - afficher le message de confirmation
      setSubmitSuccess(true);
      
      // Fermer le modal après 2 secondes
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 2000);

    } catch (error) {
      console.error('Erreur soumission RDV:', error);
      setSubmitError(error instanceof Error ? error.message : 'Erreur inconnue');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour filtrer les dates disponibles (pas les dimanches ni les jours passés)
  const isDateAvailable = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Pas de dimanches (0) ni de dates passées
    return date >= today && date.getDay() !== 0;
  };

  // Heures disponibles
  const availableHours = [
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' },
    { value: '11:00', label: '11:00' },
    { value: '14:00', label: '14:00' },
    { value: '15:00', label: '15:00' },
    { value: '16:00', label: '16:00' },
    { value: '17:00', label: '17:00' },
  ];

  // Gestionnaire de fermeture du modal
  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[10000]" onClose={handleClose}>
        {/* Overlay avec blur */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Conteneur centré du modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                
                {/* En-tête du modal */}
                <motion.div 
                  className="bg-gradient-to-r from-gray-900 to-black px-6 py-8 text-white"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CalendarDaysIcon className="h-10 w-10" />
                      <div className="text-left">
                        <Dialog.Title className="text-2xl font-light tracking-wide">
                          PRENDRE RENDEZ-VOUS
                        </Dialog.Title>
                        <p className="text-gray-300 mt-1 font-light">
                          Réservez votre créneau en quelques clics
                        </p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      className="rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      onClick={handleClose}
                      disabled={isSubmitting}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Info véhicule si présente */}
                  {vehicleInfo && (
                    <motion.div 
                      className="mt-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          src={vehicleInfo.images[0]} 
                          alt={`${vehicleInfo.make} ${vehicleInfo.model}`}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="text-left">
                          <h3 className="font-light text-lg tracking-wide">
                            {vehicleInfo.make} {vehicleInfo.model} {vehicleInfo.year}
                          </h3>
                          <p className="text-gray-300 font-light">
                            {vehicleInfo.price.toLocaleString()} €
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Contenu du formulaire */}
                <div className="px-6 py-8">
                  
                  {/* Message de succès */}
                  {submitSuccess && (
                    <motion.div 
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            ✅ Demande envoyée avec succès ! Nous vous recontacterons rapidement.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Message d'erreur */}
                  {submitError && (
                    <motion.div 
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-red-800">
                            ❌ {submitError}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Formulaire */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Informations personnelles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Nom */}
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <UserIcon className="w-4 h-4 mr-2" />
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          {...register('clientName', { 
                            required: 'Le nom est requis',
                            minLength: { value: 2, message: 'Minimum 2 caractères' }
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.clientName 
                              ? 'border-red-300 focus:ring-red-500' 
                              : 'border-gray-300 focus:ring-blue-500'
                          }`}
                          placeholder="Jean Dupont"
                        />
                        {errors.clientName && (
                          <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <EnvelopeIcon className="w-4 h-4 mr-2" />
                          Email *
                        </label>
                        <input
                          type="email"
                          {...register('clientEmail', { 
                            required: 'L\'email est requis',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email invalide'
                            }
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.clientEmail 
                              ? 'border-red-300 focus:ring-red-500' 
                              : 'border-gray-300 focus:ring-blue-500'
                          }`}
                          placeholder="jean.dupont@email.com"
                        />
                        {errors.clientEmail && (
                          <p className="mt-1 text-sm text-red-600">{errors.clientEmail.message}</p>
                        )}
                      </div>

                      {/* Téléphone */}
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <PhoneIcon className="w-4 h-4 mr-2" />
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          {...register('clientPhone', { 
                            required: 'Le téléphone est requis'
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.clientPhone 
                              ? 'border-red-300 focus:ring-red-500' 
                              : 'border-gray-300 focus:ring-blue-500'
                          }`}
                          placeholder="06 12 34 56 78"
                        />
                        {errors.clientPhone && (
                          <p className="mt-1 text-sm text-red-600">{errors.clientPhone.message}</p>
                        )}
                      </div>

                      {/* Type de service */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type de service *
                        </label>
                        <select
                          {...register('serviceType', { required: 'Sélectionnez un service' })}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.serviceType 
                              ? 'border-red-300 focus:ring-red-500' 
                              : 'border-gray-300 focus:ring-blue-500'
                          }`}
                        >
                          {serviceTypes.map((service) => (
                            <option key={service.value} value={service.value}>
                              {service.label}
                            </option>
                          ))}
                        </select>
                        {errors.serviceType && (
                          <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Date et heure */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date et heure souhaitées *
                      </label>
                      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[100px] flex items-center justify-center">
                        <div className="w-full">
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setValue('appointmentDate', date as Date)}
                            filterDate={isDateAvailable}
                            showTimeSelect
                            timeIntervals={60}
                            minTime={new Date(new Date().setHours(9, 0))}
                            maxTime={new Date(new Date().setHours(17, 0))}
                            dateFormat="EEEE dd MMMM yyyy 'à' HH:mm"
                            locale={fr}
                            className="w-full text-center text-base font-medium bg-transparent border-none outline-none py-2"
                            placeholderText="Sélectionnez une date et heure"
                            calendarClassName="custom-calendar"
                            popperClassName="custom-popper"
                          />
                        </div>
                      </div>
                      <style jsx global>{`
                        .custom-calendar {
                          font-size: 16px !important;
                          border-radius: 12px !important;
                          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
                          border: 1px solid #e2e8f0 !important;
                        }
                        .custom-calendar .react-datepicker__header {
                          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%) !important;
                          border-bottom: none !important;
                          border-radius: 12px 12px 0 0 !important;
                          padding: 16px !important;
                        }
                        .custom-calendar .react-datepicker__current-month {
                          color: white !important;
                          font-size: 18px !important;
                          font-weight: 600 !important;
                        }
                        .custom-calendar .react-datepicker__day-name {
                          color: white !important;
                          font-weight: 500 !important;
                          width: 40px !important;
                          line-height: 40px !important;
                        }
                        .custom-calendar .react-datepicker__day {
                          width: 40px !important;
                          line-height: 40px !important;
                          margin: 2px !important;
                          border-radius: 8px !important;
                          font-size: 14px !important;
                        }
                        .custom-calendar .react-datepicker__day:hover {
                          background-color: #ebf8ff !important;
                          color: #2b6cb0 !important;
                        }
                        .custom-calendar .react-datepicker__day--selected {
                          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%) !important;
                          color: white !important;
                        }
                        .custom-calendar .react-datepicker__time-container {
                          border-left: 1px solid #e2e8f0 !important;
                        }
                        .custom-calendar .react-datepicker__time-list-item {
                          padding: 8px 16px !important;
                          font-size: 14px !important;
                        }
                        .custom-calendar .react-datepicker__time-list-item:hover {
                          background-color: #ebf8ff !important;
                        }
                        .custom-calendar .react-datepicker__time-list-item--selected {
                          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%) !important;
                          color: white !important;
                        }
                        .custom-popper {
                          z-index: 10001 !important;
                        }
                        
                        /* Correction pour l'affichage complet de la date */
                        .react-datepicker__input-container {
                          width: 100% !important;
                        }
                        .react-datepicker__input-container input {
                          width: 100% !important;
                          text-align: center !important;
                          font-size: 16px !important;
                          line-height: 1.6 !important;
                          padding: 12px 8px !important;
                          white-space: nowrap !important;
                          overflow: visible !important;
                          min-width: 350px !important;
                          background: transparent !important;
                          border: none !important;
                          outline: none !important;
                        }
                      `}</style>
                    </div>

                    {/* Message optionnel */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                        Message (optionnel)
                      </label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                        placeholder="Précisions sur votre demande, questions particulières..."
                      />
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                      <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50 font-light tracking-wide"
                      >
                        ANNULER
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        className="flex-1 px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center font-light tracking-wide"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            ENVOI EN COURS...
                          </>
                        ) : (
                          '📅 ENVOYER MA DEMANDE'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AppointmentModal; 