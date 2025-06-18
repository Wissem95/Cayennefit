'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { XMarkIcon, CalendarDaysIcon, UserIcon, EnvelopeIcon, PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from 'date-fns/locale';
import PhoneInput from './PhoneInput';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';

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
  const { t } = useLanguage();
  
  // État local pour le loading et les erreurs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // État pour le numéro de téléphone
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  
  // États pour la gestion des créneaux disponibles
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // Configuration du formulaire avec React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
    setError,
    clearErrors
  } = useForm<AppointmentFormData>({
    mode: 'onChange',
    defaultValues: {
      appointmentDate: new Date(),
      serviceType: vehicleInfo ? 'test_drive' : 'meeting',
    }
  });

  // Surveiller la date sélectionnée pour le DatePicker
  const selectedDate = watch('appointmentDate');

  // Fonction pour charger les créneaux disponibles
  const fetchAvailableTimeSlots = async (date: Date) => {
    if (!date) return;
    
    setLoadingAvailability(true);
    try {
      const dateString = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
      const response = await fetch(`/api/appointments/availability?date=${dateString}`);
      
      if (response.ok) {
        const data = await response.json();
        setAvailableTimeSlots(data.data.availableTimeSlots);
      } else {
        console.error('Erreur lors du chargement des créneaux disponibles');
        // En cas d'erreur, utiliser tous les créneaux par défaut
        setAvailableTimeSlots(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']);
      }
    } catch (error) {
      console.error('Erreur fetch availability:', error);
      // En cas d'erreur, utiliser tous les créneaux par défaut
      setAvailableTimeSlots(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']);
    } finally {
      setLoadingAvailability(false);
    }
  };

  // Charger les créneaux disponibles quand la date change
  useEffect(() => {
    if (selectedDate && isOpen) {
      fetchAvailableTimeSlots(selectedDate);
    }
  }, [selectedDate, isOpen]);

  // Types de services disponibles
  const meetingTypeOptions = [
    { value: 'meeting', label: '🤝 Rendez-vous commercial', icon: '🤝' },
    { value: 'visit', label: '🚗 Visite & Essai', icon: '🚗' },
    { value: 'expertise', label: '🔧 Expertise technique', icon: '🔧' },
    { value: 'negotiation', label: '💰 Négociation prix', icon: '💰' },
  ];

  // Réinitialiser le formulaire à l'ouverture
  useEffect(() => {
    if (isOpen) {
      reset({
        appointmentDate: new Date(),
        serviceType: vehicleInfo ? 'test_drive' : 'meeting',
      });
      setPhoneNumber('');
      setSubmitError(null);
      setSubmitSuccess(false);
      clearErrors();
    }
  }, [isOpen, reset, vehicleInfo, clearErrors]);

  // Fonction de soumission du formulaire
  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Validation du numéro de téléphone
    if (!phoneNumber) {
      setError('clientPhone', { message: 'Le numéro de téléphone est requis' });
      setIsSubmitting(false);
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setError('clientPhone', { message: 'Le numéro de téléphone n\'est pas valide' });
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...data,
        clientPhone: phoneNumber, // Utiliser le numéro formaté
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

  // Fonction pour filtrer les heures disponibles dans le DatePicker
  const filterAvailableTimes = (time: Date): boolean => {
    const timeString = time.toTimeString().slice(0, 5); // Format HH:MM
    return availableTimeSlots.includes(timeString);
  };

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
          <div className="flex min-h-full items-center justify-center p-2 sm:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl mx-2 sm:mx-0 transform overflow-visible rounded-2xl bg-white shadow-2xl transition-all">
                
                {/* En-tête du modal */}
                <motion.div 
                  className="bg-gradient-to-r from-gray-900 to-black px-4 sm:px-6 py-6 sm:py-8 text-white"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <CalendarDaysIcon className="h-8 w-8 sm:h-10 sm:w-10" />
                                              <div className="text-left">
                          <Dialog.Title className="text-lg sm:text-2xl font-light tracking-wide">
                            {t('appointment.bookAppointment')}
                          </Dialog.Title>
                          <p className="text-gray-300 mt-1 font-light text-sm sm:text-base">
                            {t('appointment.bookAppointmentSubtitle')}
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
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden">
                          <Image 
                            src={vehicleInfo.images[0]} 
                            alt={`${vehicleInfo.make} ${vehicleInfo.model}`}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
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
                <div className="px-4 sm:px-6 py-6 sm:py-8">
                  
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
                            ✅ {t('appointment.bookingSuccess')}
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
                          {t('appointment.clientName')} *
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
                          {t('appointment.clientEmail')} *
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

                      {/* Téléphone International */}
                      <div>
                        <PhoneInput
                          value={phoneNumber}
                          onChange={(value) => {
                            setPhoneNumber(value || '');
                            if (value && isValidPhoneNumber(value)) {
                              clearErrors('clientPhone');
                            }
                          }}
                          error={errors.clientPhone?.message}
                          placeholder="Numéro de téléphone"
                          required={true}
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Type de service */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('appointment.serviceType')} *
                        </label>
                        <select
                          {...register('serviceType', { required: 'Sélectionnez un service' })}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.serviceType 
                              ? 'border-red-300 focus:ring-red-500' 
                              : 'border-gray-300 focus:ring-blue-500'
                          }`}
                        >
                          {meetingTypeOptions.map((service) => (
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
                        {t('appointment.appointmentDate')} *
                      </label>
                      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[100px] flex items-center justify-center">
                        <div className="w-full">
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setValue('appointmentDate', date as Date)}
                            filterDate={isDateAvailable}
                            filterTime={filterAvailableTimes}
                            showTimeSelect
                            timeIntervals={60}
                            minTime={new Date(new Date().setHours(9, 0))}
                            maxTime={new Date(new Date().setHours(17, 0))}
                            dateFormat="EEEE dd MMMM yyyy 'à' HH:mm"
                            locale={fr}
                            className="w-full text-center text-base font-medium bg-transparent border-none outline-none py-2"
                            placeholderText={loadingAvailability ? "Chargement des créneaux..." : "Sélectionnez une date et heure"}
                            calendarClassName="custom-calendar"
                            popperClassName="custom-popper"
                            disabled={loadingAvailability}
                          />
                        </div>
                      </div>
                      
                      {/* Indicateur des créneaux disponibles */}
                      {selectedDate && availableTimeSlots.length > 0 && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-800">
                              ✅ {t('appointment.availableSlots')} {selectedDate.toLocaleDateString('fr-FR')}
                            </span>
                            <span className="text-xs text-blue-600">
                              {availableTimeSlots.length}/7 créneaux libres
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {availableTimeSlots.map((slot) => (
                              <span 
                                key={slot}
                                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full border border-green-300"
                              >
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Message si aucun créneau disponible */}
                      {selectedDate && availableTimeSlots.length === 0 && !loadingAvailability && (
                        <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-red-800">
                              ❌ {t('appointment.noSlotsAvailable')} {selectedDate.toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <p className="text-xs text-red-600 mt-1">
                            {t('appointment.chooseAnotherDate')}
                          </p>
                        </div>
                      )}
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
                        {t('appointment.message')}
                      </label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                        placeholder={t('appointment.messagePlaceholder')}
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
                        {t('appointment.cancel')}
                      </button>
                      
                                                      <button
                                    type="submit"
                                    disabled={isSubmitting || !isValid}
                                    className="
                                        w-full py-4 px-8 
                                        bg-gradient-to-r from-red-600 to-red-700 
                                        text-white font-bold text-lg
                                        rounded-xl border-2 border-red-500
                                        hover:from-red-700 hover:to-red-800 
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        transition-all duration-300
                                        shadow-lg hover:shadow-xl
                                        transform hover:scale-[1.02]
                                    "
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>{t('appointment.processing')}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <span>📅</span>
                                            <span>{t('appointment.bookAppointment')}</span>
                                        </div>
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