"use client";

import { useState, useEffect } from "react";
import { VehicleProps } from "@types";
import { VehicleCard, CustomButton, AdminVehicleForm } from "@components";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout, extendSession } from "@lib/auth"; // Import des fonctions d'auth

/**
 * Panel d'administration CAYENNEFIT - Design luxueux inspiré de Dior
 * Gestion complète des véhicules d'exception
 */
export default function AdminPanel() {
    const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<VehicleProps | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); // État d'authentification
    const router = useRouter();

    // Vérification de l'authentification au chargement
    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isAuthenticated();
            if (!authenticated) {
                // Redirection vers la page de connexion si pas authentifié
                router.push('/admin/login');
                return;
            }
            
            // Prolonger la session si authentifié
            extendSession();
            setIsCheckingAuth(false);
        };
        
        checkAuth();
    }, [router]);

    // Chargement initial des données (seulement si authentifié)
    useEffect(() => {
        if (!isCheckingAuth && isAuthenticated()) {
            loadData();
        }
    }, [isCheckingAuth]);

    /**
     * Charge les véhicules et statistiques depuis les API routes
     * @param forceReload - Force le rechargement en ajoutant un timestamp pour éviter le cache
     */
    const loadData = async (forceReload: boolean = false) => {
        setIsLoading(true);
        try {
            // Ajouter un timestamp pour éviter le cache si nécessaire
            const timestamp = forceReload ? `?t=${Date.now()}` : '';
            
            const [vehiclesResponse, statsResponse] = await Promise.all([
                fetch(`/api/vehicles${timestamp}`, {
                    cache: forceReload ? 'no-store' : 'default'
                }), // Récupérer tous les véhicules  
                fetch(`/api/vehicles/stats${timestamp}`, {
                    cache: forceReload ? 'no-store' : 'default'
                })
            ]);

            if (vehiclesResponse.ok && statsResponse.ok) {
                const vehiclesData = await vehiclesResponse.json();
                const statsData = await statsResponse.json();
                
                console.log('Admin: Tous les véhicules récupérés:', vehiclesData.length)
                console.log('Admin: Véhicules disponibles:', vehiclesData.filter((v: VehicleProps) => v.isAvailable).length)
                console.log('Admin: Véhicules vendus:', vehiclesData.filter((v: VehicleProps) => !v.isAvailable).length)
                console.log('Admin: Statistiques reçues:', statsData)
                
                // Filtrer seulement les véhicules disponibles pour l'affichage admin principal
                const availableVehicles = vehiclesData.filter((v: VehicleProps) => v.isAvailable);
                setVehicles(availableVehicles);
                setStats(statsData);
            } else {
                console.error('Admin: Erreur lors du chargement - vehicles:', vehiclesResponse.status, 'stats:', statsResponse.status)
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Déconnexion de l'administrateur
     */
    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    /**
     * Ouvre le formulaire pour créer un nouveau véhicule
     */
    const handleCreateVehicle = () => {
        setEditingVehicle(null);
        setShowForm(true);
    };

    /**
     * Ouvre le formulaire pour modifier un véhicule existant
     */
    const handleEditVehicle = (vehicleId: string) => {
        const vehicle = vehicles.find(v => v.id === vehicleId);
        if (vehicle) {
            setEditingVehicle(vehicle);
            setShowForm(true);
        }
    };

    /**
     * Marque un véhicule comme vendu avec refresh amélioré
     */
    const handleMarkAsSold = async (vehicleId: string) => {
        try {
            console.log(`Admin: Marquage du véhicule ${vehicleId} comme vendu`)
            
            const response = await fetch(`/api/vehicles/${vehicleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    isAvailable: false,
                    soldAt: new Date().toISOString()
                }),
            });

            if (response.ok) {
                console.log(`Admin: Véhicule ${vehicleId} marqué comme vendu avec succès`)
                console.log('Admin: Rechargement forcé des données...')
                
                // Mettre à jour immédiatement l'état local pour un feedback instantané
                setVehicles(prev => prev.filter(v => v.id !== vehicleId));
                
                // Puis recharger complètement avec force reload
                await loadData(true);
                console.log('Admin: Données rechargées après marquage comme vendu')
            } else {
                const errorData = await response.json().catch(() => ({}))
                console.error(`Admin: Erreur HTTP ${response.status}:`, errorData)
            }
        } catch (error) {
            console.error('Admin: Erreur lors du marquage comme vendu:', error);
            // En cas d'erreur, recharger les données pour être sûr
            await loadData(true);
        }
    };

    /**
     * Confirme et supprime un véhicule avec gestion d'erreurs améliorée
     */
    const handleDeleteVehicle = async (vehicleId: string) => {
        if (deleteConfirm === vehicleId) {
            try {
                console.log(`Admin: Suppression du véhicule ${vehicleId}`)
                
                const response = await fetch(`/api/vehicles/${vehicleId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log(`Admin: Véhicule ${vehicleId} supprimé avec succès`)
                    
                    // Mettre à jour immédiatement l'état local
                    setVehicles(prev => prev.filter(v => v.id !== vehicleId));
                    setDeleteConfirm(null);
                    
                    // Puis recharger avec force reload
                    await loadData(true);
                } else {
                    const errorData = await response.json().catch(() => ({}))
                    console.error(`Admin: Erreur lors de la suppression HTTP ${response.status}:`, errorData)
                }
            } catch (error) {
                console.error('Admin: Erreur lors de la suppression:', error);
                // En cas d'erreur, recharger les données
                await loadData(true);
            } finally {
                setDeleteConfirm(null);
            }
        } else {
            setDeleteConfirm(vehicleId);
        }
    };

    /**
     * Ferme le formulaire et recharge les données avec force reload
     */
    const handleFormClose = async () => {
        console.log('Admin: Fermeture du formulaire et rechargement des données...')
        setShowForm(false);
        setEditingVehicle(null);
        
        // Force reload pour s'assurer d'avoir les dernières données
        await loadData(true);
        console.log('Admin: Données rechargées après fermeture du formulaire')
    };

    /**
     * Navigue vers la page d'historique des véhicules
     */
    const handleShowHistory = () => {
        router.push('/admin/historique');
    };

    // Chargement de l'authentification
    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-xl font-light text-gray-700 tracking-wide">CAYENNEFIT</h3>
                    <p className="text-gray-500 font-light mt-2">Vérification des autorisations...</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-xl font-light text-gray-700 tracking-wide">CAYENNEFIT</h3>
                    <p className="text-gray-500 font-light mt-2">Chargement de l'administration...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header Admin */}
            <div className="bg-white border-b border-gray-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-light text-gray-900 tracking-wide mb-1 sm:mb-2">
                                PANEL D'ADMINISTRATION
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 font-light">
                                GESTION DES VEHICULES CAYENNEFIT
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                            <button
                                onClick={handleShowHistory}
                                className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Historique
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full sm:w-auto px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Statistiques - Layout mobile/desktop */}
            {stats && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200/50 shadow-sm">
                            <div className="text-2xl sm:text-3xl font-light text-emerald-600 mb-1">
                                {stats.availableVehicles || 0}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium tracking-wider uppercase mb-2">
                                Véhicules disponibles
                            </div>
                            <div className="text-xs text-gray-500 font-light">
                                Prêts à être vendus
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200/50 shadow-sm">
                            <div className="text-2xl sm:text-3xl font-light text-orange-600 mb-1">
                                {stats.soldVehicles || 0}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium tracking-wider uppercase mb-2">
                                Véhicules vendus
                            </div>
                            <div className="text-xs text-gray-500 font-light">
                                Transactions réalisées
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200/50 shadow-sm">
                            <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-1">
                                {stats.totalVehicles || 0}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium tracking-wider uppercase mb-2">
                                Total catalogue
                            </div>
                            <div className="text-xs text-gray-500 font-light">
                                Tous véhicules confondus
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200/50 shadow-sm col-span-2 sm:col-span-2 lg:col-span-1">
                            <div className="text-2xl sm:text-3xl font-light text-purple-600 mb-1">
                                {stats.availableValue ? (stats.availableValue / 1000000).toFixed(1) + 'M' : '0'}€
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium tracking-wider uppercase mb-2">
                                Valeur du stock
                            </div>
                            <div className="text-xs text-gray-500 font-light">
                                Véhicules disponibles uniquement
                            </div>
                        </div>
                </div>
            )}

                {/* Actions principales */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 shadow-sm mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-1 sm:mb-2">
                                Gestion des véhicules
                            </h2>
                            <p className="text-sm text-gray-600 font-light">
                                Ajoutez, modifiez ou gérez vos véhicules d'exception
                            </p>
                        </div>
                        <button
                            onClick={handleCreateVehicle}
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white rounded-lg font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/25 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="hidden sm:inline">Ajouter un véhicule</span>
                            <span className="sm:hidden">Ajouter</span>
                        </button>
                    </div>
                    </div>
                    
                {/* Liste des véhicules - Layout responsive */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200/50 animate-pulse">
                                <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                                </div>
                                            </div>
                        ))}
                    </div>
                ) : vehicles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {vehicles.map((vehicle) => (
                            <div key={vehicle.id} className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                {/* Image du véhicule */}
                                <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                                    {vehicle.images && vehicle.images.length > 0 ? (
                                        <img 
                                            src={vehicle.images[0]}
                                            alt={`${vehicle.make} ${vehicle.model}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    
                                    {/* Badge statut */}
                                    <div className="absolute top-3 left-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            vehicle.isAvailable
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {vehicle.isAvailable ? 'Disponible' : 'Vendu'}
                                        </span>
                                    </div>
                                </div>

                                {/* Contenu de la carte */}
                                <div className="p-4 sm:p-6">
                                    <div className="mb-3 sm:mb-4">
                                        <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1 truncate">
                                            {vehicle.make} {vehicle.model}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {vehicle.year} • {vehicle.mileage?.toLocaleString()} km
                                        </p>
                                        <p className="text-lg sm:text-xl font-semibold text-gray-900">
                                            {vehicle.price?.toLocaleString()} €
                                        </p>
                                    </div>

                                    {/* Actions - Layout mobile adapté */}
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                        <button
                                            onClick={() => handleEditVehicle(vehicle.id)}
                                            className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span className="sm:hidden">Modifier</span>
                                            <span className="hidden sm:inline">Modifier</span>
                                        </button>
                                        
                                        {vehicle.isAvailable && (
                                            <button
                                                onClick={() => handleMarkAsSold(vehicle.id)}
                                                className="flex-1 px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="sm:hidden">Vendu</span>
                                                <span className="hidden sm:inline">Marquer vendu</span>
                                            </button>
                                        )}
                                        
                                        <button
                                            onClick={() => handleDeleteVehicle(vehicle.id)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                                                deleteConfirm === vehicle.id
                                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                                    : 'bg-red-50 hover:bg-red-100 text-red-700'
                                            }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span className="sm:hidden">
                                                {deleteConfirm === vehicle.id ? 'Confirmer' : 'Suppr.'}
                                            </span>
                                            <span className="hidden sm:inline">
                                                {deleteConfirm === vehicle.id ? 'Confirmer' : 'Supprimer'}
                                            </span>
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                ) : (
                    <div className="text-center py-12 sm:py-16">
                        <div className="max-w-md mx-auto">
                            <svg className="w-16 h-16 sm:w-24 sm:h-24 text-gray-300 mx-auto mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM7 12l3-3 3 3 4-4" />
                            </svg>
                            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 sm:mb-4">
                                Aucun véhicule trouvé
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                                Commencez par ajouter votre premier véhicule d'exception
                            </p>
                            <button
                                onClick={handleCreateVehicle}
                                className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors duration-200"
                            >
                                Ajouter un véhicule
                            </button>
                </div>
            </div>
                )}

                {/* Formulaire modal - Responsive */}
            {showForm && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
                        <div className="min-h-full flex items-start sm:items-center justify-center">
                            <div className="w-full max-w-4xl bg-white rounded-xl sm:rounded-2xl shadow-2xl">
                <AdminVehicleForm
                    vehicle={editingVehicle}
                    onClose={handleFormClose}
                />
                            </div>
                        </div>
                    </div>
            )}
            </div>
        </div>
    );
} 