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
     */
    const loadData = async () => {
        setIsLoading(true);
        try {
            const [vehiclesResponse, statsResponse] = await Promise.all([
                fetch('/api/vehicles?includeAll=true'), // Récupérer TOUS les véhicules pour l'admin
                fetch('/api/vehicles/stats')
            ]);

            if (vehiclesResponse.ok && statsResponse.ok) {
                const vehiclesData = await vehiclesResponse.json();
                const statsData = await statsResponse.json();
                
                console.log('Admin: Tous les véhicules récupérés:', vehiclesData.length)
                console.log('Admin: Véhicules disponibles:', vehiclesData.filter((v: VehicleProps) => v.isAvailable).length)
                console.log('Admin: Véhicules vendus:', vehiclesData.filter((v: VehicleProps) => !v.isAvailable).length)
                
                // Filtrer seulement les véhicules disponibles pour l'affichage admin principal
                const availableVehicles = vehiclesData.filter((v: VehicleProps) => v.isAvailable);
                setVehicles(availableVehicles);
                setStats(statsData);
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
     * Marque un véhicule comme vendu
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
                await loadData(); // Recharger les données
            } else {
                const errorData = await response.json().catch(() => ({}))
                console.error(`Admin: Erreur HTTP ${response.status}:`, errorData)
            }
        } catch (error) {
            console.error('Admin: Erreur lors du marquage comme vendu:', error);
        }
    };

    /**
     * Confirme et supprime un véhicule
     */
    const handleDeleteVehicle = async (vehicleId: string) => {
        if (deleteConfirm === vehicleId) {
            try {
                const response = await fetch(`/api/vehicles/${vehicleId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    await loadData(); // Recharger les données
                    setDeleteConfirm(null);
                }
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
            }
        } else {
            setDeleteConfirm(vehicleId);
        }
    };

    /**
     * Ferme le formulaire et recharge les données
     */
    const handleFormClose = async () => {
        setShowForm(false);
        setEditingVehicle(null);
        await loadData();
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
            {/* Header avec déconnexion */}
            <div className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-8">
                        <div className="mb-6 lg:mb-0">
                            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-wide">
                                ADMINISTRATION PRIVILÉGIÉE
                            </h1>
                            <p className="text-gray-600 font-light mt-3 max-w-md">
                                Gestion d'exception pour une collection automobile d'élite
                            </p>
                        </div>
                        
                        {/* Navigation avec historique et déconnexion */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleShowHistory}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 font-light tracking-wider text-sm transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer relative z-[9999] rounded flex items-center gap-2"
                                style={{ position: 'relative', zIndex: 9999 }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                HISTORIQUE
                            </button>
                            
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-light tracking-wider text-sm transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer relative z-[9999] rounded flex items-center gap-2"
                                style={{ position: 'relative', zIndex: 9999 }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                                DÉCONNEXION
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistiques élégantes */}
            {stats && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">
                        VUE D'ENSEMBLE
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🏎️</span>
                                </div>
                                <p className="text-sm font-light text-gray-500 tracking-wider uppercase">Collection</p>
                                <p className="text-3xl font-light text-gray-900 mt-2">{stats.totalVehicles}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">✨</span>
                                </div>
                                <p className="text-sm font-light text-gray-500 tracking-wider uppercase">Disponibles</p>
                                <p className="text-3xl font-light text-green-600 mt-2">{stats.availableVehicles}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">💎</span>
                                </div>
                                <p className="text-sm font-light text-gray-500 tracking-wider uppercase">Prix Moyen</p>
                                <p className="text-3xl font-light text-yellow-600 mt-2">{stats.averagePrice.toLocaleString('fr-FR')}€</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎯</span>
                                </div>
                                <p className="text-sm font-light text-gray-500 tracking-wider uppercase">Vendus</p>
                                <p className="text-3xl font-light text-red-600 mt-2">{stats.soldVehicles}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Collection de véhicules disponibles uniquement */}
            <div id="vehicle-collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-light text-gray-900 tracking-wide">
                                VÉHICULES DISPONIBLES
                            </h2>
                            <p className="text-gray-500 font-light mt-1">
                                {vehicles.length} véhicule{vehicles.length > 1 ? 's' : ''} en vente
                            </p>
                        </div>
                        <CustomButton
                            title="AJOUTER UN VÉHICULE"
                            containerStyles="bg-gray-800 hover:bg-black text-white px-6 py-3 font-light tracking-wider text-sm transition-all duration-300 mt-4 lg:mt-0"
                            handleClick={handleCreateVehicle}
                        />
                    </div>
                    
                    {vehicles.length === 0 ? (
                        <div className="bg-white rounded-xl p-16 text-center shadow-lg border border-gray-100">
                            <div className="text-8xl mb-8 opacity-20">🏎️</div>
                            <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">
                                AUCUN VÉHICULE DISPONIBLE
                            </h3>
                            <p className="text-gray-600 font-light mb-8 max-w-md mx-auto leading-relaxed">
                                Commencez votre collection d'exception en ajoutant votre premier véhicule.
                                Chaque détail compte dans l'art de l'automobile.
                            </p>
                            <CustomButton
                                title="DÉBUTER LA COLLECTION"
                                containerStyles="bg-black hover:bg-gray-800 text-white px-10 py-4 font-light tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl"
                                handleClick={handleCreateVehicle}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {vehicles.map((vehicle) => (
                                <div key={vehicle.id} className="relative">
                                    {deleteConfirm === vehicle.id && (
                                        <div className="absolute inset-0 bg-black/90 z-10 rounded-xl flex items-center justify-center">
                                            <div className="text-center text-white p-8">
                                                <div className="text-5xl mb-6">⚠️</div>
                                                <h4 className="text-xl font-light mb-4 tracking-wide">
                                                    CONFIRMER LA SUPPRESSION
                                                </h4>
                                                <p className="text-sm font-light mb-8 opacity-80 max-w-xs mx-auto leading-relaxed">
                                                    Cette action supprimera définitivement ce véhicule de votre collection
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                    <button
                                                        onClick={() => handleDeleteVehicle(vehicle.id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-light tracking-wider text-sm transition-all duration-300"
                                                    >
                                                        SUPPRIMER
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirm(null)}
                                                        className="bg-white hover:bg-gray-100 text-black px-6 py-3 font-light tracking-wider text-sm transition-all duration-300"
                                                    >
                                                        ANNULER
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="h-full">
                                        <VehicleCard
                                            vehicle={vehicle}
                                            isAdmin={true}
                                            onEdit={handleEditVehicle}
                                            onDelete={handleDeleteVehicle}
                                            onMarkAsSold={handleMarkAsSold}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Formulaire de création/modification */}
            {showForm && (
                <AdminVehicleForm
                    vehicle={editingVehicle}
                    onClose={handleFormClose}
                />
            )}
        </div>
    );
} 