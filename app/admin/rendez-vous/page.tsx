'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

// Interface pour un rendez-vous
interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  appointmentDate: string;
  serviceType: string;
  message?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'RESCHEDULED';
  createdAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
  completedAt?: string;
  adminNotes?: string;
  vehicle?: {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    images: string[];
  };
}

// Interface pour la pagination
interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

/**
 * Page d'administration des rendez-vous
 * Interface complète pour gérer tous les rendez-vous
 */
const AdminAppointmentsPage: React.FC = () => {
  
  // États locaux
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  
  // États pour les filtres
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // États pour le modal d'action avec message
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'confirm' | 'cancel' | null>(null);
  const [actionMessage, setActionMessage] = useState('');

  // Charger les rendez-vous
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(statusFilter !== 'all' && { status: statusFilter }),
      });

      const response = await fetch(`/api/appointments?${params}`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement');
      }

      const data = await response.json();
      setAppointments(data.data);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, statusFilter]);

  // Charger les données au montage et quand les filtres changent
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Fonction pour ouvrir le modal d'action avec message
  const openActionModal = (appointment: Appointment, action: 'confirm' | 'cancel') => {
    setSelectedAppointment(appointment);
    setActionType(action);
    setActionMessage('');
    setShowActionModal(true);
  };

  // Fonction pour gérer les actions sur les rendez-vous
  const handleAppointmentAction = async (appointmentId: string, action: string, adminMessage?: string) => {
    try {
      setActionLoading(appointmentId);
      
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, adminMessage }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'action');
      }

      // Recharger les données
      await fetchAppointments();
      setSelectedAppointment(null);
      setShowModal(false);
      setShowActionModal(false);
      setActionMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur action');
    } finally {
      setActionLoading(null);
    }
  };

  // Fonction pour confirmer l'action avec message
  const confirmActionWithMessage = () => {
    if (selectedAppointment && actionType) {
      handleAppointmentAction(selectedAppointment.id, actionType, actionMessage);
    }
  };

  // Fonction pour supprimer un rendez-vous
  const handleDeleteAppointment = async (appointmentId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      return;
    }

    try {
      setActionLoading(appointmentId);
      
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      await fetchAppointments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur suppression');
    } finally {
      setActionLoading(null);
    }
  };

  // Fonction pour obtenir le style du badge de statut
  const getStatusBadge = (status: string) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      CONFIRMED: 'bg-green-100 text-green-800 border-green-300',
      CANCELLED: 'bg-red-100 text-red-800 border-red-300',
      COMPLETED: 'bg-blue-100 text-blue-800 border-blue-300',
      RESCHEDULED: 'bg-purple-100 text-purple-800 border-purple-300',
    };

    const labels = {
      PENDING: '⏳ En attente',
      CONFIRMED: '✅ Confirmé',
      CANCELLED: '❌ Annulé',
      COMPLETED: '🏁 Terminé',
      RESCHEDULED: '📅 Reporté',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  // Fonction pour obtenir le label du type de service
  const getServiceTypeLabel = (serviceType: string) => {
    const labels = {
      test_drive: '🚗 Essai du véhicule',
      inspection: '🔍 Inspection technique',
      meeting: '🤝 Rendez-vous commercial',
      other: '📋 Autre demande'
    };
    return labels[serviceType as keyof typeof labels] || serviceType;
  };

  // Filtrer les rendez-vous selon le terme de recherche
  const filteredAppointments = appointments.filter(appointment =>
    appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.clientPhone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <motion.div 
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                <CalendarDaysIcon className="h-6 w-6 lg:h-8 lg:w-8 mr-2 lg:mr-3 text-blue-600" />
                Gestion des Rendez-vous
              </h1>
              <p className="text-gray-600 mt-1 lg:mt-2 text-sm lg:text-base">
                Gérez toutes les demandes de rendez-vous de vos clients
              </p>
            </div>
            
            {/* Statistiques rapides */}
            <div className="flex space-x-3 lg:space-x-4">
              <div className="bg-white rounded-lg px-3 py-2 lg:px-4 lg:py-2 shadow-sm border flex-1 lg:flex-none">
                <div className="text-xl lg:text-2xl font-bold text-blue-600">{pagination.total}</div>
                <div className="text-xs lg:text-sm text-gray-500">Total</div>
              </div>
              <div className="bg-white rounded-lg px-3 py-2 lg:px-4 lg:py-2 shadow-sm border flex-1 lg:flex-none">
                <div className="text-xl lg:text-2xl font-bold text-yellow-600">
                  {appointments.filter(a => a.status === 'PENDING').length}
                </div>
                <div className="text-xs lg:text-sm text-gray-500">En attente</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filtres et recherche */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 mb-6 lg:mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
            
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filtre par statut */}
            <div className="lg:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 lg:px-4 py-2.5 lg:py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmés</option>
                <option value="cancelled">Annulés</option>
                <option value="completed">Terminés</option>
                <option value="rescheduled">Reportés</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Message d'erreur */}
        {error && (
          <motion.div 
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center">
              <XCircleIcon className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Liste des rendez-vous */}
        {!loading && (
          <motion.div 
            className="bg-white rounded-lg shadow-sm border overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <CalendarDaysIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun rendez-vous trouvé
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Aucun rendez-vous ne correspond à votre recherche.' : 'Aucun rendez-vous pour le moment.'}
                </p>
              </div>
            ) : (
              <>
                {/* Version Desktop - Tableau */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date/Heure
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Véhicule
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        
                        {/* Client */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="flex items-center">
                              <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <div className="text-sm font-medium text-gray-900">
                                {appointment.clientName}
                              </div>
                            </div>
                            <div className="flex items-center mt-1">
                              <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-500">
                                {appointment.clientEmail}
                              </div>
                            </div>
                            <div className="flex items-center mt-1">
                              <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-500">
                                {appointment.clientPhone}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Date/Heure */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(appointment.appointmentDate).toLocaleDateString('fr-FR', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(appointment.appointmentDate).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </td>

                        {/* Service */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {getServiceTypeLabel(appointment.serviceType)}
                          </div>
                          {appointment.message && (
                            <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                              💬 {appointment.message}
                            </div>
                          )}
                        </td>

                        {/* Véhicule */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {appointment.vehicle ? (
                            <div className="flex items-center">
                              <img 
                                src={appointment.vehicle.images[0]} 
                                alt="Véhicule"
                                className="h-10 w-14 object-cover rounded mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {appointment.vehicle.make} {appointment.vehicle.model}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {appointment.vehicle.year} • {appointment.vehicle.price.toLocaleString()} €
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500 italic">RDV général</span>
                          )}
                        </td>

                        {/* Statut */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(appointment.status)}
                          <div className="text-xs text-gray-500 mt-1">
                            Créé le {new Date(appointment.createdAt).toLocaleDateString('fr-FR')}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            
                            {/* Voir détails */}
                            <button
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setShowModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                              title="Voir détails"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>

                            {/* Actions selon le statut */}
                            {appointment.status === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => openActionModal(appointment, 'confirm')}
                                  disabled={actionLoading === appointment.id}
                                  className="text-green-600 hover:text-green-900 p-1 rounded disabled:opacity-50 transition-colors"
                                  title="Confirmer avec message personnalisé"
                                >
                                  <CheckCircleIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => openActionModal(appointment, 'cancel')}
                                  disabled={actionLoading === appointment.id}
                                  className="text-red-600 hover:text-red-900 p-1 rounded disabled:opacity-50 transition-colors"
                                  title="Annuler avec message personnalisé"
                                >
                                  <XCircleIcon className="h-4 w-4" />
                                </button>
                              </>
                            )}

                            {appointment.status === 'CONFIRMED' && (
                              <button
                                onClick={() => handleAppointmentAction(appointment.id, 'complete')}
                                disabled={actionLoading === appointment.id}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded disabled:opacity-50 transition-colors"
                                title="Marquer comme terminé"
                              >
                                <ClockIcon className="h-4 w-4" />
                              </button>
                            )}

                            {/* Restaurer (pour les rendez-vous annulés ou terminés) */}
                            {(appointment.status === 'CANCELLED' || appointment.status === 'COMPLETED') && (
                              <button
                                onClick={() => handleAppointmentAction(appointment.id, 'restore')}
                                disabled={actionLoading === appointment.id}
                                className="text-orange-600 hover:text-orange-900 p-1 rounded disabled:opacity-50 transition-colors"
                                title="Restaurer en attente"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                              </button>
                            )}

                            {/* Supprimer */}
                            <button
                              onClick={() => handleDeleteAppointment(appointment.id)}
                              disabled={actionLoading === appointment.id}
                              className="text-red-600 hover:text-red-900 p-1 rounded disabled:opacity-50 transition-colors"
                              title="Supprimer définitivement"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                          
                          {/* Indicateur de loading pour les actions */}
                          {actionLoading === appointment.id && (
                            <div className="mt-1">
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

                {/* Version Mobile - Cartes */}
                <div className="lg:hidden space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <motion.div
                      key={appointment.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* En-tête de la carte */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <h3 className="text-sm font-medium text-gray-900">
                              {appointment.clientName}
                            </h3>
                          </div>
                          <div className="text-xs text-gray-500">
                            {appointment.clientEmail}
                          </div>
                        </div>
                        <div className="ml-2">
                          {getStatusBadge(appointment.status)}
                        </div>
                      </div>

                      {/* Informations principales */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm">
                          <CalendarDaysIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-900">
                            {new Date(appointment.appointmentDate).toLocaleDateString('fr-FR', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                            })} à {new Date(appointment.appointmentDate).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-900">
                            {getServiceTypeLabel(appointment.serviceType)}
                          </span>
                        </div>

                        {appointment.clientPhone && (
                          <div className="flex items-center text-sm">
                            <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-900">
                              {appointment.clientPhone}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Véhicule */}
                      {appointment.vehicle && (
                        <div className="flex items-center p-2 bg-gray-50 rounded-lg mb-3">
                          <img 
                            src={appointment.vehicle.images[0]} 
                            alt="Véhicule"
                            className="h-8 w-12 object-cover rounded mr-3"
                          />
                          <div className="flex-1">
                            <div className="text-xs font-medium text-gray-900">
                              {appointment.vehicle.make} {appointment.vehicle.model}
                            </div>
                            <div className="text-xs text-gray-500">
                              {appointment.vehicle.year} • {appointment.vehicle.price.toLocaleString()} €
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Message */}
                      {appointment.message && (
                        <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded mb-3">
                          💬 {appointment.message.length > 60 ? 
                            `${appointment.message.substring(0, 60)}...` : 
                            appointment.message
                          }
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex space-x-2">
                          {/* Voir détails */}
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir détails"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>

                          {/* Actions selon le statut */}
                          {appointment.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => openActionModal(appointment, 'confirm')}
                                disabled={actionLoading === appointment.id}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg disabled:opacity-50 transition-colors"
                                title="Confirmer"
                              >
                                <CheckCircleIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => openActionModal(appointment, 'cancel')}
                                disabled={actionLoading === appointment.id}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 transition-colors"
                                title="Annuler"
                              >
                                <XCircleIcon className="h-4 w-4" />
                              </button>
                            </>
                          )}

                          {appointment.status === 'CONFIRMED' && (
                            <button
                              onClick={() => handleAppointmentAction(appointment.id, 'complete')}
                              disabled={actionLoading === appointment.id}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 transition-colors"
                              title="Marquer terminé"
                            >
                              <ClockIcon className="h-4 w-4" />
                            </button>
                          )}

                          {/* Supprimer */}
                          <button
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            disabled={actionLoading === appointment.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 transition-colors"
                            title="Supprimer"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Indicateur de loading */}
                        {actionLoading === appointment.id && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="bg-white px-4 py-3 border-t border-gray-200 lg:px-6">
                {/* Version Mobile */}
                <div className="flex items-center justify-between lg:hidden">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    ← Précédent
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">
                      Page {pagination.page} sur {pagination.pages}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                    disabled={pagination.page === pagination.pages}
                    className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Suivant →
                  </button>
                </div>

                {/* Version Desktop */}
                <div className="hidden lg:flex lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Affichage de <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span> à{' '}
                      <span className="font-medium">
                        {Math.min(pagination.page * pagination.limit, pagination.total)}
                      </span> sur{' '}
                      <span className="font-medium">{pagination.total}</span> résultats
                    </p>
                  </div>
                  <div>
                                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        {Array.from({ length: Math.min(pagination.pages, 7) }, (_, i) => {
                          let page: number;
                          if (pagination.pages <= 7) {
                            page = i + 1;
                          } else if (pagination.page <= 4) {
                            page = i + 1;
                          } else if (pagination.page >= pagination.pages - 3) {
                            page = pagination.pages - 6 + i;
                          } else {
                            page = pagination.page - 3 + i;
                          }
                          return (
                            <button
                              key={page}
                              onClick={() => setPagination(prev => ({ ...prev, page }))}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                                page === pagination.page
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Modal détails du rendez-vous */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 lg:p-4 z-50">
          <motion.div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto mx-2 lg:mx-0"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="p-4 lg:p-6">
              <div className="flex justify-between items-center mb-4 lg:mb-6">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                  📅 Détails du rendez-vous
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <XCircleIcon className="h-5 w-5 lg:h-6 lg:w-6" />
                </button>
              </div>

              <div className="space-y-4 lg:space-y-6">
                {/* Informations client */}
                <div className="bg-gray-50 rounded-lg p-3 lg:p-4">
                  <h4 className="font-medium text-gray-900 mb-2 lg:mb-3 text-sm lg:text-base">👤 Informations Client</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <label className="text-xs lg:text-sm font-medium text-gray-700">Nom</label>
                      <p className="text-xs lg:text-sm text-gray-900">{selectedAppointment.clientName}</p>
                    </div>
                    <div>
                      <label className="text-xs lg:text-sm font-medium text-gray-700">Email</label>
                      <p className="text-xs lg:text-sm text-gray-900 break-all">{selectedAppointment.clientEmail}</p>
                    </div>
                    <div>
                      <label className="text-xs lg:text-sm font-medium text-gray-700">Téléphone</label>
                      <p className="text-xs lg:text-sm text-gray-900">{selectedAppointment.clientPhone}</p>
                    </div>
                    <div>
                      <label className="text-xs lg:text-sm font-medium text-gray-700">Statut</label>
                      <div className="mt-1">{getStatusBadge(selectedAppointment.status)}</div>
                    </div>
                  </div>
                </div>

                {/* Détails du rendez-vous */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">📅 Détails du Rendez-vous</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Date et heure</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedAppointment.appointmentDate).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Type de service</label>
                      <p className="text-sm text-gray-900">{getServiceTypeLabel(selectedAppointment.serviceType)}</p>
                    </div>
                  </div>
                  
                  {selectedAppointment.message && (
                    <div className="mt-4">
                      <label className="text-sm font-medium text-gray-700">Message du client</label>
                      <p className="text-sm text-gray-900 bg-white rounded p-3 mt-1">
                        {selectedAppointment.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* Véhicule concerné */}
                {selectedAppointment.vehicle && (
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">🚗 Véhicule Concerné</h4>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={selectedAppointment.vehicle.images[0]} 
                        alt="Véhicule"
                        className="h-20 w-28 object-cover rounded-lg"
                      />
                      <div>
                        <h5 className="font-medium text-gray-900">
                          {selectedAppointment.vehicle.make} {selectedAppointment.vehicle.model} {selectedAppointment.vehicle.year}
                        </h5>
                        <p className="text-lg font-semibold text-amber-600">
                          {selectedAppointment.vehicle.price.toLocaleString()} €
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Historique */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">📋 Historique</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Créé le :</span>
                      <span className="text-gray-900">
                        {new Date(selectedAppointment.createdAt).toLocaleDateString('fr-FR')} à{' '}
                        {new Date(selectedAppointment.createdAt).toLocaleTimeString('fr-FR')}
                      </span>
                    </div>
                    
                    {selectedAppointment.confirmedAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Confirmé le :</span>
                        <span className="text-green-600">
                          {new Date(selectedAppointment.confirmedAt).toLocaleDateString('fr-FR')} à{' '}
                          {new Date(selectedAppointment.confirmedAt).toLocaleTimeString('fr-FR')}
                        </span>
                      </div>
                    )}
                    
                    {selectedAppointment.cancelledAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annulé le :</span>
                        <span className="text-red-600">
                          {new Date(selectedAppointment.cancelledAt).toLocaleDateString('fr-FR')} à{' '}
                          {new Date(selectedAppointment.cancelledAt).toLocaleTimeString('fr-FR')}
                        </span>
                      </div>
                    )}
                    
                    {selectedAppointment.completedAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Terminé le :</span>
                        <span className="text-blue-600">
                          {new Date(selectedAppointment.completedAt).toLocaleDateString('fr-FR')} à{' '}
                          {new Date(selectedAppointment.completedAt).toLocaleTimeString('fr-FR')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions rapides */}
                {selectedAppointment.status === 'PENDING' && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        openActionModal(selectedAppointment, 'confirm');
                      }}
                      disabled={actionLoading === selectedAppointment.id}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                      ✅ Confirmer avec message
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        openActionModal(selectedAppointment, 'cancel');
                      }}
                      disabled={actionLoading === selectedAppointment.id}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      ❌ Annuler avec message
                    </button>
                  </div>
                )}

                {selectedAppointment.status === 'CONFIRMED' && (
                  <button
                    onClick={() => handleAppointmentAction(selectedAppointment.id, 'complete')}
                    disabled={actionLoading === selectedAppointment.id}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    🏁 Marquer comme terminé
                  </button>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal d'action avec message personnalisé */}
      {showActionModal && selectedAppointment && actionType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 lg:p-4 z-50">
          <motion.div 
            className="bg-white rounded-lg max-w-md w-full mx-2 lg:mx-0"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="p-4 lg:p-6">
              <div className="flex items-center mb-4">
                {actionType === 'confirm' ? (
                  <CheckCircleIcon className="h-8 w-8 text-green-600 mr-3" />
                ) : (
                  <XCircleIcon className="h-8 w-8 text-red-600 mr-3" />
                )}
                <h3 className="text-xl font-semibold text-gray-900">
                  {actionType === 'confirm' ? 'Confirmer le rendez-vous' : 'Annuler le rendez-vous'}
                </h3>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 mb-2">
                  <strong>Client :</strong> {selectedAppointment.clientName}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Date :</strong> {new Date(selectedAppointment.appointmentDate).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message personnalisé (optionnel)
                </label>
                <textarea
                  value={actionMessage}
                  onChange={(e) => setActionMessage(e.target.value)}
                  placeholder={
                    actionType === 'confirm' 
                      ? "Ex: Nous avons hâte de vous rencontrer ! N'hésitez pas à nous contacter si vous avez des questions."
                      : "Ex: Nous nous excusons pour ce contretemps. N'hésitez pas à reprendre contact pour reprogrammer."
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Ce message sera ajouté à l'email envoyé au client
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowActionModal(false);
                    setActionMessage('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmActionWithMessage}
                  disabled={actionLoading === selectedAppointment.id}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 ${
                    actionType === 'confirm' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {actionLoading === selectedAppointment.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Traitement...
                    </div>
                  ) : (
                    actionType === 'confirm' ? '✅ Confirmer' : '❌ Annuler'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointmentsPage; 