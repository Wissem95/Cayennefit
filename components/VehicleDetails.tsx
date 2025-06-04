"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { VehicleProps } from "@types";

interface VehicleDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    vehicle: VehicleProps;
}

/**
 * Composant VehicleDetails - Modal pour afficher les détails complets d'un véhicule
 * @param isOpen - État d'ouverture de la modal
 * @param closeModal - Fonction pour fermer la modal
 * @param vehicle - Données du véhicule à afficher
 */
const VehicleDetails = ({ isOpen, closeModal, vehicle }: VehicleDetailsProps) => {
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

    // Formatage de la date
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(dateString));
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-out duration-300'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='relative w-full max-w-4xl max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                                    {/* Bouton de fermeture */}
                                    <button
                                        type='button'
                                        className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                                        onClick={closeModal}
                                    >
                                        <Image
                                            src='/close.svg'
                                            alt='fermer'
                                            width={20}
                                            height={20}
                                            className='object-contain'
                                        />
                                    </button>

                                    {/* En-tête avec titre et prix */}
                                    <div className='flex-1 flex flex-col gap-3'>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className='font-semibold text-xl capitalize'>
                                                    {vehicle.make} {vehicle.model}
                                                </h2>
                                                <p className="text-gray-600">
                                                    {vehicle.year} • {vehicle.color} • {formatMileage(vehicle.mileage)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className='text-[32px] leading-[38px] font-extrabold text-primary-blue'>
                                                    {formatPrice(vehicle.price)}
                                                </p>
                                                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                    vehicle.isAvailable 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {vehicle.isAvailable ? 'Disponible' : 'Vendu'}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Galerie d'images */}
                                        <div className='flex-1 flex flex-col gap-3'>
                                            <h3 className="text-lg font-semibold">Images du véhicule</h3>
                                            {vehicle.images && vehicle.images.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {vehicle.images.map((image, index) => (
                                                        <div key={index} className='relative w-full h-48 bg-pattern bg-cover bg-center rounded-lg overflow-hidden'>
                                                            <Image
                                                                src={image}
                                                                alt={`${vehicle.make} ${vehicle.model} - Image ${index + 1}`}
                                                                fill
                                                                className='object-cover'
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                                                    Aucune image disponible
                                                </div>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="flex-1 flex flex-col gap-3">
                                            <h3 className="text-lg font-semibold">Description</h3>
                                            <p className="text-gray-700 leading-relaxed">
                                                {vehicle.description || 'Aucune description disponible.'}
                                            </p>
                                        </div>

                                        {/* Caractéristiques techniques */}
                                        <div className='flex-1 flex flex-col gap-3'>
                                            <h3 className="text-lg font-semibold">Caractéristiques techniques</h3>
                                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                                <div className='flex flex-col items-center p-4 bg-gray-50 rounded-lg'>
                                                    <Image 
                                                        src='/steering-wheel.svg' 
                                                        width={24} 
                                                        height={24} 
                                                        alt='transmission' 
                                                    />
                                                    <h4 className='text-grey font-semibold text-sm mt-2'>Transmission</h4>
                                                    <p className='text-black-100 font-bold text-sm'>
                                                        {vehicle.transmission}
                                                    </p>
                                                </div>

                                                <div className='flex flex-col items-center p-4 bg-gray-50 rounded-lg'>
                                                    <Image 
                                                        src='/tire.svg' 
                                                        width={24} 
                                                        height={24} 
                                                        alt='traction' 
                                                    />
                                                    <h4 className='text-grey font-semibold text-sm mt-2'>Traction</h4>
                                                    <p className='text-black-100 font-bold text-sm'>
                                                        {vehicle.drive}
                                                    </p>
                                                </div>

                                                <div className='flex flex-col items-center p-4 bg-gray-50 rounded-lg'>
                                                    <Image 
                                                        src='/gas.svg' 
                                                        width={24} 
                                                        height={24} 
                                                        alt='consommation' 
                                                    />
                                                    <h4 className='text-grey font-semibold text-sm mt-2'>Consommation</h4>
                                                    <p className='text-black-100 font-bold text-sm'>
                                                        {vehicle.city_mpg}L/100km
                                                    </p>
                                                </div>

                                                <div className='flex flex-col items-center p-4 bg-gray-50 rounded-lg'>
                                                    <Image 
                                                        src='/speedometer.svg' 
                                                        width={24} 
                                                        height={24} 
                                                        alt='carburant' 
                                                    />
                                                    <h4 className='text-grey font-semibold text-sm mt-2'>Carburant</h4>
                                                    <p className='text-black-100 font-bold text-sm'>
                                                        {vehicle.fuel_type}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Informations supplémentaires */}
                                        <div className='flex-1 flex flex-col gap-3'>
                                            <h3 className="text-lg font-semibold">Informations supplémentaires</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="font-semibold text-gray-600">Consommation autoroute:</span>
                                                    <span className="ml-2">{vehicle.highway_mpg}L/100km</span>
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-gray-600">Mis en vente le:</span>
                                                    <span className="ml-2">{formatDate(vehicle.createdAt)}</span>
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-gray-600">Dernière mise à jour:</span>
                                                    <span className="ml-2">{formatDate(vehicle.updatedAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default VehicleDetails; 