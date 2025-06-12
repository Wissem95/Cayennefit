"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { VehicleProps } from "@types";
import { useTranslation } from "../../../contexts/LanguageContext";

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
                                            {t('details.contact')}
                                        </button>
                                        <button
                                            onClick={() => window.open('https://api.whatsapp.com/send?phone=6583245152', '_blank')}
                                            className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/25"
                                            title="Contacter via WhatsApp"
                                        >
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787z"/>
                                            </svg>
                                        </button>
                                    </div>
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
                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 font-light tracking-wider text-sm transition-all duration-300 text-center"
                    >
                        {t('details.backToCollection')}
                    </Link>
                    <div className="flex gap-2 items-center">
                        <button 
                            onClick={() => window.open('https://api.whatsapp.com/send?phone=6583245152', '_blank')}
                            className="bg-black hover:bg-gray-800 text-white px-8 py-3 font-light tracking-wider text-sm transition-all duration-300"
                        >
                            {t('details.contact')}
                        </button>
                        <button
                            onClick={() => window.open('https://api.whatsapp.com/send?phone=6583245152', '_blank')}
                            className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/25"
                            title="Contacter via WhatsApp"
                        >
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
} 