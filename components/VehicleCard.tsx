"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VehicleCardProps } from "@types";
import CustomButton from "./CustomButton";
import { useTranslation } from "../contexts/LanguageContext";
import AppointmentSystem from './AppointmentSystem';

/**
 * Composant VehicleCard CAYENNEFIT - Design luxueux inspiré de Dior
 * @param vehicle - Données du véhicule d'exception
 * @param isAdmin - Mode administrateur (affiche boutons edit/delete)
 * @param onEdit - Callback pour éditer le véhicule
 * @param onDelete - Callback pour supprimer le véhicule
 * @param onMarkAsSold - Callback pour marquer le véhicule comme vendu
 */
const VehicleCard = ({ vehicle, isAdmin = false, onEdit, onDelete, onMarkAsSold }: VehicleCardProps) => {
    const { t } = useTranslation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Formatage du prix en euros
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

    // Navigation entre les images
    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === vehicle.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? vehicle.images.length - 1 : prev - 1
        );
    };

    return (
        <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-500 flex flex-col h-full">
            {/* Badge de statut de disponibilité */}
            <div className={`absolute top-4 left-4 z-20 px-4 py-2 rounded-lg text-sm font-medium tracking-wider shadow-lg ${
                vehicle.isAvailable 
                    ? 'bg-green-600 text-white border-2 border-green-500' 
                    : 'bg-red-600 text-white border-2 border-red-500'
            }`}>
                {vehicle.isAvailable ? t('vehicle.available') : t('vehicle.sold')}
            </div>

            {/* Prix élégant */}
            <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg border border-gray-200 shadow-lg">
                <span className="text-lg font-light tracking-wide">{formatPrice(vehicle.price)}</span>
            </div>

            {/* Carrousel d'images élégant */}
            <div className="relative h-64 lg:h-72 overflow-hidden flex-shrink-0">
                {vehicle.images && vehicle.images.length > 0 ? (
                    <>
                        <Image
                            src={vehicle.images[currentImageIndex]}
                            alt={`${vehicle.make} ${vehicle.model}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        
                        {/* Navigation entre images si plusieurs disponibles */}
                        {vehicle.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 text-white"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 text-white"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                
                                {/* Indicateurs de pagination */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {vehicle.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/60'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                        <div className="text-center">
                            <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm font-light">{t('vehicle.imageUnavailable')}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Contenu de la carte */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Titre du véhicule avec hauteur fixe */}
                <div className="mb-4 min-h-[4rem] flex flex-col justify-start">
                    <h3 className="text-xl font-light text-gray-900 tracking-wide leading-tight">
                        {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-gray-600 text-sm font-light mt-1">
                        {vehicle.year} • {vehicle.color}
                    </p>
                </div>

                {/* Caractéristiques techniques en grille */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <Image src='/steering-wheel.svg' width={20} height={20} alt='transmission' className="mx-auto mb-2 opacity-60" />
                        <p className="text-xs font-light text-gray-500 uppercase tracking-wider">
                            {t('vehicle.transmission')}
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                            {vehicle.transmission}
                        </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <Image src="/speedometer.svg" width={20} height={20} alt="kilométrage" className="mx-auto mb-2 opacity-60" />
                        <p className="text-xs font-light text-gray-500 uppercase tracking-wider">
                            {t('vehicle.mileage')}
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                            {formatMileage(vehicle.mileage)}
                        </p>
                    </div>
                </div>

                {/* Actions selon le mode - poussé vers le bas */}
                <div className="mt-auto">
                    {isAdmin ? (
                        <div className="grid grid-cols-1 gap-3">
                            <CustomButton
                                title={t('admin.edit')}
                                containerStyles="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 font-light tracking-wider text-sm transition-all duration-300"
                                handleClick={() => onEdit && onEdit(vehicle.id)}
                            />
                            
                            {vehicle.isAvailable && (
                                <CustomButton
                                    title={t('admin.markAsSold')}
                                    containerStyles="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 font-light tracking-wider text-sm transition-all duration-300"
                                    handleClick={() => onMarkAsSold && onMarkAsSold(vehicle.id)}
                                />
                            )}
                            
                            <CustomButton
                                title={t('admin.delete')}
                                containerStyles="w-full bg-gray-900 hover:bg-black text-white py-2 px-4 font-light tracking-wider text-sm transition-all duration-300"
                                handleClick={() => onDelete && onDelete(vehicle.id)}
                            />
                        </div>
                    ) : (
                        <div className="space-y-3">
                        <Link
                            href={`/vehicule/${vehicle.id}`}
                            className="block w-full bg-gray-900 hover:bg-black text-white py-3 px-4 font-light tracking-wider text-sm transition-all duration-300 text-center rounded"
                        >
                            VOIR DÉTAILS
                        </Link>
                            {/* Bouton de rendez-vous avec le véhicule pré-sélectionné */}
                            <AppointmentSystem 
                                 variant="secondary"
                                 size="sm"
                                 text="RENDEZ-VOUS"
                                 className="w-full bg-white hover:bg-gray-50 text-gray-900 py-2 px-4 font-light tracking-wider text-sm transition-all duration-300 text-center rounded border border-gray-300"
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default VehicleCard; 