"use client";

import { useState, useEffect } from "react";
import { VehicleProps } from "@types";
import { CustomButton } from "@components";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout, extendSession } from "@lib/auth"; // Import des fonctions d'auth

/**
 * Page d'historique des véhicules CAYENNEFIT
 * Affichage complet de tous les véhicules avec leurs statuts
 */
export default function HistoriquePage() {
    const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'available' | 'sold'>('all');
    const [sortBy, setSortBy] = useState<'date' | 'price' | 'brand'>('date');
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

    // Chargement des données (seulement si authentifié)
    useEffect(() => {
        if (!isCheckingAuth && isAuthenticated()) {
            loadData();
        }
    }, [isCheckingAuth]);

    /**
     * Déconnexion de l'administrateur
     */
    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    /**
     * Charge tous les véhicules depuis l'API
     */
    const loadData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/vehicles');
            if (response.ok) {
                const data = await response.json();
                setVehicles(data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Filtre et trie les véhicules
     */
    const getFilteredVehicles = () => {
        let filtered = vehicles;

        // Appliquer le filtre
        switch (filter) {
            case 'available':
                filtered = vehicles.filter(v => v.isAvailable);
                break;
            case 'sold':
                filtered = vehicles.filter(v => !v.isAvailable);
                break;
            default:
                filtered = vehicles;
        }

        // Appliquer le tri
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price':
                    return b.price - a.price;
                case 'brand':
                    return a.make.localeCompare(b.make);
                case 'date':
                default:
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            }
        });
    };

    /**
     * Formate une date pour l'affichage
     */
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    /**
     * Remettre un véhicule en vente
     */
    const handleRestoreVehicle = async (vehicleId: string) => {
        try {
            const response = await fetch(`/api/vehicles/${vehicleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    isAvailable: true,
                    soldAt: null
                }),
            });

            if (response.ok) {
                await loadData(); // Recharger les données
            }
        } catch (error) {
            console.error('Erreur lors de la restauration:', error);
        }
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
                    <p className="text-gray-500 font-light mt-2">Chargement de l'historique...</p>
                </div>
            </div>
        );
    }

    const filteredVehicles = getFilteredVehicles();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header avec navigation et déconnexion */}
            <div className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-8">
                        <div className="mb-6 lg:mb-0">
                            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-wide">
                                HISTORIQUE DES VÉHICULES
                            </h1>
                            <p className="text-gray-600 font-light mt-3 max-w-md">
                                Archive complète de votre collection automobile d'exception
                            </p>
                        </div>
                        
                        {/* Navigation avec retour admin et déconnexion */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => router.push('/admin')}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 font-light tracking-wider text-sm transition-all duration-300 cursor-pointer relative z-[9999] rounded shadow-lg flex items-center gap-2"
                                style={{ position: 'relative', zIndex: 9999 }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                </svg>
                                RETOUR ADMIN
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

            {/* Statistiques rapides */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                        <div className="text-center">
                            <div className="text-3xl font-light text-gray-900">{vehicles.length}</div>
                            <p className="text-sm font-light text-gray-500 tracking-wider uppercase">Total</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                        <div className="text-center">
                            <div className="text-3xl font-light text-green-600">{vehicles.filter(v => v.isAvailable).length}</div>
                            <p className="text-sm font-light text-gray-500 tracking-wider uppercase">Disponibles</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                        <div className="text-center">
                            <div className="text-3xl font-light text-red-600">{vehicles.filter(v => !v.isAvailable).length}</div>
                            <p className="text-sm font-light text-gray-500 tracking-wider uppercase">Vendus</p>
                        </div>
                    </div>
                </div>

                {/* Filtres et tri */}
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 mb-8">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm font-light text-gray-600 mr-2">Filtrer:</span>
                            {[
                                { key: 'all', label: 'Tous' },
                                { key: 'available', label: 'Disponibles' },
                                { key: 'sold', label: 'Vendus' }
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key as any)}
                                    className={`px-4 py-2 rounded text-sm font-light tracking-wider transition-all duration-300 ${
                                        filter === key
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-light text-gray-600">Trier par:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="px-4 py-2 border border-gray-300 rounded text-sm font-light focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="date">Date</option>
                                <option value="price">Prix</option>
                                <option value="brand">Marque</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table des véhicules */}
                <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 font-light text-gray-900 tracking-wider uppercase text-sm">Véhicule</th>
                                    <th className="text-left py-4 px-6 font-light text-gray-900 tracking-wider uppercase text-sm">Prix</th>
                                    <th className="text-left py-4 px-6 font-light text-gray-900 tracking-wider uppercase text-sm">Statut</th>
                                    <th className="text-left py-4 px-6 font-light text-gray-900 tracking-wider uppercase text-sm">Dernière MAJ</th>
                                    <th className="text-left py-4 px-6 font-light text-gray-900 tracking-wider uppercase text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredVehicles.map((vehicle) => (
                                    <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <div className="w-16 h-12 bg-gray-200 rounded mr-4 overflow-hidden">
                                                    <img
                                                        src={vehicle.images[0] || '/pattern.png'}
                                                        alt={`${vehicle.make} ${vehicle.model}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {vehicle.make} {vehicle.model}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {vehicle.year} • {vehicle.color} • {vehicle.mileage?.toLocaleString()} km
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-lg font-light text-gray-900">
                                                {vehicle.price.toLocaleString('fr-FR')} €
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium tracking-wider shadow-md ${
                                                vehicle.isAvailable
                                                    ? 'bg-green-600 text-white border-2 border-green-500'
                                                    : 'bg-red-600 text-white border-2 border-red-500'
                                            }`}>
                                                {vehicle.isAvailable ? 'DISPONIBLE' : 'VENDU'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            {formatDate(vehicle.updatedAt)}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex gap-2">
                                                {!vehicle.isAvailable && (
                                                    <button
                                                        onClick={() => handleRestoreVehicle(vehicle.id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-light tracking-wider transition-all duration-300"
                                                    >
                                                        RESTAURER
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => router.push(`/admin/vehicles/${vehicle.id}`)}
                                                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-light tracking-wider transition-all duration-300"
                                                >
                                                    DÉTAILS
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {filteredVehicles.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4 opacity-20">🔍</div>
                            <h3 className="text-xl font-light text-gray-900 mb-2">Aucun véhicule trouvé</h3>
                            <p className="text-gray-500 font-light">Modifiez vos filtres pour voir plus de résultats</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 