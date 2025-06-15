"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { VehicleProps } from "@types";
import { useTranslation } from "../../../contexts/LanguageContext";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import AppointmentSystem from '../../../components/AppointmentSystem';

/**
 * Page de détails du véhicule CAYENNEFIT
 * Design épuré et cohérent avec l'identité du site
 */
export default function VehicleDetailsPage() {
    const { t } = useTranslation();
    const params = useParams();
    const vehicleId = params.id as string;
    
    const [vehicle, setVehicle] = useState<VehicleProps | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Charger les données du véhicule
    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await fetch(`/api/vehicles/${vehicleId}`);
                if (response.ok) {
                    const vehicleData = await response.json();
                    setVehicle(vehicleData);
                } else {
                    setError(t('details.vehicleNotFound'));
                }
            } catch (error) {
                setError(t('common.error'));
                console.error('Erreur:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (vehicleId) {
            fetchVehicle();
        }
    }, [vehicleId, t]);

    // Formatage du prix
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    // Formatage du kilométrage
    const formatMileage = (mileage: number) => {
        return new Intl.NumberFormat('fr-FR').format(mileage) + ' km';
    };

    // Navigation images
    const nextImage = () => {
        if (vehicle && vehicle.images.length > 0) {
            setCurrentImageIndex((prev) => 
                prev === vehicle.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (vehicle && vehicle.images.length > 0) {
            setCurrentImageIndex((prev) => 
                prev === 0 ? vehicle.images.length - 1 : prev - 1
            );
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-xl font-light text-gray-700 tracking-wide">CAYENNEFIT</h3>
                    <p className="text-gray-500 font-light mt-2">{t('common.loading')}</p>
                </div>
            </div>
        );
    }

    if (error || !vehicle) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-2xl font-light text-gray-900 mb-4">{t('details.vehicleNotFound')}</h3>
                    <Link href="/" className="text-black hover:underline font-light tracking-wide">
                        {t('details.backToCollection')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header épuré CAYENNEFIT */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo CAYENNEFIT */}
                        <Link href="/" className="text-black font-light text-2xl tracking-[0.3em] hover:text-gray-700 transition-colors">
                            CAYENNEFIT
                        </Link>
                        
                        {/* Bouton retour */}
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-gray-600 hover:text-black font-light tracking-wide transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>{t('details.backToCollection')}</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Titre du véhicule */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-wide mb-2">
                        {vehicle.make} {vehicle.model} 
                    </h1>
                    
                </div>

                {/* Layout principal - Image + Infos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Image principale du véhicule - 2/3 de l'espace */}
                    <div className="lg:col-span-2">
                        <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-[4/3]">
                            {vehicle.images && vehicle.images.length > 0 ? (
                                <>
                                    <Image
                                        src={vehicle.images[currentImageIndex]}
                                        alt={`${vehicle.make} ${vehicle.model}`}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    
                                    {/* Navigation des images */}
                                    {vehicle.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <span>{t('vehicle.imageUnavailable')}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Panneau d'informations - 1/3 de l'espace */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        {/* Prix principal */}
                        <div className="mb-6 text-center">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-sm font-light text-gray-600 mb-2 uppercase tracking-wider">{t('details.salePrice')}</h3>
                                <p className="text-3xl font-light text-gray-900 mb-4">
                                    {formatPrice(vehicle.price)}
                                </p>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => window.open('https://api.whatsapp.com/send?phone=6583245152', '_blank')}
                                            className="flex-1 bg-gray-900 text-white py-3 px-4 rounded font-light tracking-wide hover:bg-gray-800 transition-colors"
                                        >
                                            NOUS CONTACTER
                                        </button>
                                    </div>

                                    {/* Bouton de rendez-vous pour ce véhicule spécifique */}
                                    <AppointmentSystem 
                                        variant="secondary"
                                        size="md"
                                        text="RENDEZ-VOUS"
                                        className="w-full bg-white hover:bg-gray-50 text-gray-900 py-3 px-4 rounded font-light tracking-wide transition-colors border border-gray-300"
                                        vehicleInfo={{
                                            id: vehicle.id,
                                            make: vehicle.make,
                                            model: vehicle.model,
                                            year: vehicle.year,
                                            price: vehicle.price,
                                            images: vehicle.images
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Spécifications */}
                        <div className="border-t pt-6">
                            <h4 className="font-medium text-gray-900 mb-4">{t('details.specifications')}</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t('vehicle.year')}</span>
                                    <span className="text-gray-900 font-medium">{vehicle.year}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t('vehicle.fuel')}</span>
                                    <span className="text-gray-900 font-medium">{vehicle.fuel_type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t('vehicle.transmission')}</span>
                                    <span className="text-gray-900 font-medium">{vehicle.transmission}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t('vehicle.mileage')}</span>
                                    <span className="text-gray-900 font-medium">{formatMileage(vehicle.mileage)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t('vehicle.color')}</span>
                                    <span className="text-gray-900 font-medium">{vehicle.color}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Galerie d'images */}
                {vehicle.images && vehicle.images.length > 1 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
                            {t('details.gallery')}
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {vehicle.images.map((image, index) => (
                                <div 
                                    key={index}
                                    className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                                        index === currentImageIndex ? 'ring-2 ring-black' : 'hover:opacity-80'
                                    }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                >
                                    <Image
                                        src={image}
                                        alt={`${vehicle.make} ${vehicle.model} - Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Section description */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
                            {t('details.description')}
                        </h2>
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed">
                                {vehicle.description || t('vehicle.noDescriptionAvailable')}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
                            {t('details.features')}
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-700">
                                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                                {t('details.optimalPerformance')}
                            </div>
                            <div className="flex items-center text-gray-700">
                                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                                {t('details.elegantDesign')}
                            </div>
                            <div className="flex items-center text-gray-700">
                                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                                {t('details.exceptionalComfort')}
                            </div>
                            <div className="flex items-center text-gray-700">
                                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                                {t('details.securitySystems')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 font-light tracking-wider text-sm transition-all duration-300 text-center rounded"
                    >
                        ← RETOUR À LA COLLECTION
                    </Link>
                    <div className="flex gap-2 items-center">
                        <button 
                            onClick={() => window.open('https://api.whatsapp.com/send?phone=6583245152', '_blank')}
                            className="bg-gray-900 hover:bg-black text-white px-8 py-3 font-light tracking-wider text-sm transition-all duration-300 rounded"
                        >
                            NOUS CONTACTER
                        </button>
                        
                        <AppointmentSystem 
                            variant="secondary"
                            size="md"
                            text="RENDEZ-VOUS"
                            className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 font-light tracking-wider text-sm transition-all duration-300 border border-gray-300 rounded"
                            vehicleInfo={{
                                id: vehicle.id,
                                make: vehicle.make,
                                model: vehicle.model,
                                year: vehicle.year,
                                price: vehicle.price,
                                images: vehicle.images
                            }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
} 