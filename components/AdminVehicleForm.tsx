"use client";

import { useState, useEffect } from "react";
import { VehicleProps } from "@types";
import { createVehicle, updateVehicle } from "@utils/vehicles";
import CustomButton from "./CustomButton";
import Image from "next/image";

interface AdminVehicleFormProps {
    vehicle?: VehicleProps | null;
    onClose: () => void;
}

/**
 * Formulaire d'administration CAYENNEFIT - Design luxueux inspiré de Dior
 * @param vehicle - Véhicule à modifier (null pour création)
 * @param onClose - Callback pour fermer le formulaire
 */
const AdminVehicleForm = ({ vehicle, onClose }: AdminVehicleFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]); // Images existantes du véhicule
    const [deletedExistingImages, setDeletedExistingImages] = useState<string[]>([]); // Images existantes supprimées
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: new Date().getFullYear(),
        price: 0,
        city_mpg: 0,
        highway_mpg: 0,
        fuel_type: "Essence",
        transmission: "Automatique",
        drive: "FWD",
        color: "",
        mileage: 0,
        description: "",
        isAvailable: true
    });

    // Pré-remplir le formulaire si on modifie un véhicule existant
    useEffect(() => {
        if (vehicle) {
            setFormData({
                make: vehicle.make,
                model: vehicle.model,
                year: vehicle.year,
                price: vehicle.price,
                city_mpg: vehicle.city_mpg,
                highway_mpg: vehicle.highway_mpg,
                fuel_type: vehicle.fuel_type,
                transmission: vehicle.transmission,
                drive: vehicle.drive,
                color: vehicle.color,
                mileage: vehicle.mileage,
                description: vehicle.description,
                isAvailable: vehicle.isAvailable
            });
            // Charger les images existantes pour l'aperçu
            setExistingImages(vehicle.images || []);
            setPreviewImages(vehicle.images || []);
            // Réinitialiser les états liés aux images
            setSelectedImages([]);
            setDeletedExistingImages([]);
        } else {
            // Réinitialiser complètement pour un nouveau véhicule
            setExistingImages([]);
            setPreviewImages([]);
            setSelectedImages([]);
            setDeletedExistingImages([]);
        }
    }, [vehicle]);

    /**
     * Nettoie les URLs des aperçus créés avec createObjectURL pour éviter les fuites mémoire
     */
    const cleanupPreviewUrls = () => {
        previewImages.forEach((url) => {
            if (url.startsWith('blob:')) {
                URL.revokeObjectURL(url);
            }
        });
    };

    /**
     * Gestion des changements dans les champs du formulaire
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : 
                    type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                    value
        }));
    };

    /**
     * Gestion de l'upload d'images améliorée avec nettoyage approprié
     */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        
        // Limiter à 10 images maximum
        const maxImages = 10;
        const currentImagesCount = existingImages.length - deletedExistingImages.length;
        const availableSlots = maxImages - currentImagesCount;
        const limitedFiles = files.slice(0, availableSlots);
        
        // Vérifier la taille des fichiers (5MB max par image)
        const maxSize = 5 * 1024 * 1024; // 5MB
        const validFiles = limitedFiles.filter(file => {
            if (file.size > maxSize) {
                setError(`L'image ${file.name} est trop volumineuse (max 5MB)`);
                return false;
            }
            return true;
        });

        if (validFiles.length !== limitedFiles.length) {
            setTimeout(() => setError(null), 3000); // Effacer l'erreur après 3 secondes
        }

        // Nettoyer les anciennes URLs d'aperçu des nouvelles images
        selectedImages.forEach((_, index) => {
            const previewIndex = existingImages.length - deletedExistingImages.length + index;
            if (previewIndex < previewImages.length && previewImages[previewIndex].startsWith('blob:')) {
                URL.revokeObjectURL(previewImages[previewIndex]);
            }
        });

        setSelectedImages(validFiles);

        // Créer des aperçus des nouvelles images
        const newPreviews = validFiles.map(file => URL.createObjectURL(file));
        
        // Combiner images existantes (non supprimées) avec les nouvelles
        const remainingExistingImages = existingImages.filter(img => !deletedExistingImages.includes(img));
        setPreviewImages([...remainingExistingImages, ...newPreviews]);

        if (limitedFiles.length > availableSlots) {
            setError(`Seulement ${availableSlots} images supplémentaires autorisées (max ${maxImages} total)`);
            setTimeout(() => setError(null), 3000);
        }
    };

    /**
     * Supprimer une image des aperçus avec gestion appropriée des images existantes vs nouvelles
     */
    const removeImage = (index: number) => {
        const remainingExistingCount = existingImages.length - deletedExistingImages.length;
        
        if (index < remainingExistingCount) {
            // C'est une image existante - la marquer comme supprimée
            const imageToDelete = previewImages[index];
            setDeletedExistingImages(prev => [...prev, imageToDelete]);
        } else {
            // C'est une nouvelle image - la supprimer des fichiers sélectionnés
            const newImageIndex = index - remainingExistingCount;
            setSelectedImages(prev => prev.filter((_, i) => i !== newImageIndex));
            
            // Nettoyer l'URL d'aperçu
            if (previewImages[index].startsWith('blob:')) {
                URL.revokeObjectURL(previewImages[index]);
            }
        }
        
        // Mettre à jour les aperçus
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    /**
     * Supprimer toutes les images
     */
    const removeAllImages = () => {
        // Marquer toutes les images existantes comme supprimées
        setDeletedExistingImages([...existingImages]);
        
        // Nettoyer les URLs d'aperçu des nouvelles images
        selectedImages.forEach((_, index) => {
            const previewIndex = existingImages.length - deletedExistingImages.length + index;
            if (previewIndex < previewImages.length && previewImages[previewIndex].startsWith('blob:')) {
                URL.revokeObjectURL(previewImages[previewIndex]);
            }
        });
        
        // Vider les nouvelles images
        setSelectedImages([]);
        setPreviewImages([]);
        
        // Réinitialiser l'input file
        const fileInput = document.getElementById('vehicle-images') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    /**
     * Convertir les images en base64 pour le stockage local
     */
    const processImages = async (files: File[]): Promise<string[]> => {
        const promises = files.map(file => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        });
        return Promise.all(promises);
    };

    /**
     * Soumission du formulaire avec gestion correcte des images
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Validation basique
            if (!formData.make || !formData.model || !formData.color) {
                throw new Error("Veuillez remplir tous les champs obligatoires.");
            }

            if (formData.price <= 0) {
                throw new Error("Le prix doit être supérieur à 0.");
            }

            if (formData.year < 1990 || formData.year > new Date().getFullYear() + 1) {
                throw new Error("L'année doit être comprise entre 1990 et " + (new Date().getFullYear() + 1));
            }

            // Traiter les images de manière correcte
            let finalImages: string[] = [];
            
            // 1. Garder les images existantes qui n'ont pas été supprimées
            const remainingExistingImages = existingImages.filter(img => !deletedExistingImages.includes(img));
            finalImages = [...remainingExistingImages];
            
            // 2. Ajouter les nouvelles images uploadées
            if (selectedImages.length > 0) {
                const newImages = await processImages(selectedImages);
                finalImages = [...finalImages, ...newImages];
            }
            
            // 3. S'assurer qu'il y a au moins une image
            if (finalImages.length === 0) {
                finalImages = ["/pattern.png"]; // Image par défaut
            }

            // Préparer les données pour la sauvegarde
            const vehicleData = {
                ...formData,
                images: finalImages
            };

            console.log('AdminForm: Images finales à sauvegarder:', finalImages.length);
            console.log('AdminForm: Images existantes conservées:', remainingExistingImages.length);
            console.log('AdminForm: Nouvelles images ajoutées:', selectedImages.length);
            console.log('AdminForm: Images existantes supprimées:', deletedExistingImages.length);

            if (vehicle) {
                // Modification d'un véhicule existant
                await updateVehicle(vehicle.id, vehicleData);
                setSuccess("Véhicule modifié avec succès !");
            } else {
                // Création d'un nouveau véhicule
                await createVehicle(vehicleData);
                setSuccess("Véhicule créé avec succès !");
            }

            // Nettoyer les URLs d'aperçu avant de fermer
            cleanupPreviewUrls();

            // Fermer le formulaire après un délai
            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            setError(error instanceof Error ? error.message : 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Nettoyage lors de la fermeture du composant
     */
    useEffect(() => {
        return () => {
            cleanupPreviewUrls();
        };
    }, []);

    const isEditing = !!vehicle;

    return (
        <div className="fixed inset-0 z-[10000] overflow-y-auto bg-gray-900/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {isEditing ? '✏️ Modifier le véhicule' : '➕ Nouveau véhicule'}
                        </h2>
                        <button
                            onClick={() => {
                                cleanupPreviewUrls();
                                onClose();
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Messages de statut */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex">
                                <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex">
                                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <p className="text-green-700 text-sm">{success}</p>
                            </div>
                        </div>
                    )}

                    {/* Section images améliorée avec meilleure gestion */}
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-light text-gray-900 tracking-wide">📸 GALERIE PHOTOGRAPHIQUE</h3>
                            <span className="text-sm text-gray-600 font-light">
                                {previewImages.length}/10 images
                            </span>
                        </div>
                        
                        {/* Bouton d'ajout d'images visible */}
                        <div className="mb-6">
                            <div className="flex items-center gap-4">
                                <label 
                                    htmlFor="vehicle-images" 
                                    className="flex items-center gap-3 bg-gray-800 hover:bg-black border border-gray-700 hover:border-gray-600 rounded-lg px-6 py-4 cursor-pointer transition-all duration-300 group"
                                >
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-white font-light tracking-wide">AJOUTER DES IMAGES</div>
                                        <div className="text-xs text-gray-300 font-light">JPG, PNG, WebP (Max 5MB)</div>
                                    </div>
                                </label>
                                
                                {previewImages.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={removeAllImages}
                                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-light tracking-wide text-sm transition-colors duration-300"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        SUPPRIMER TOUTES
                                    </button>
                                )}
                            </div>
                            
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                                id="vehicle-images"
                            />
                        </div>

                        {/* Aperçu des images avec gestion améliorée */}
                        {previewImages.length > 0 && (
                            <div>
                                <h4 className="text-sm font-light text-gray-700 tracking-wide mb-4">
                                    APERÇU : {previewImages.length} image{previewImages.length > 1 ? 's' : ''}
                                    {isEditing && (
                                        <span className="ml-2 text-xs text-blue-600">
                                            ({existingImages.length - deletedExistingImages.length} existante{(existingImages.length - deletedExistingImages.length) > 1 ? 's' : ''}, {selectedImages.length} nouvelle{selectedImages.length > 1 ? 's' : ''})
                                        </span>
                                    )}
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
                                    {previewImages.map((preview, index) => {
                                        const remainingExistingCount = existingImages.length - deletedExistingImages.length;
                                        const isExistingImage = index < remainingExistingCount;
                                        
                                        return (
                                            <div key={`${preview}-${index}`} className="relative group">
                                                <div className="aspect-square rounded-lg overflow-hidden border border-gray-300 hover:border-gray-400 transition-all duration-300">
                                                    <Image
                                                        src={preview}
                                                        alt={`Aperçu ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                                                    title={isExistingImage ? "Supprimer cette image existante" : "Supprimer cette nouvelle image"}
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                    </svg>
                                                </button>
                                                <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-light">
                                                    #{index + 1} {isExistingImage ? '(existante)' : '(nouvelle)'}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    
                                    {/* Bouton d'ajout supplémentaire si moins de 10 images */}
                                    {previewImages.length < 10 && (
                                        <label 
                                            htmlFor="vehicle-images"
                                            className="aspect-square border-2 border-dashed border-gray-400 hover:border-gray-500 rounded-lg flex items-center justify-center cursor-pointer group transition-all duration-300 bg-gray-100 hover:bg-gray-200"
                                        >
                                            <div className="text-center">
                                                <div className="w-8 h-8 bg-gray-600 group-hover:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-600 text-xs font-light">AJOUTER</span>
                                            </div>
                                        </label>
                                    )}
                                </div>
                                {previewImages.length >= 10 && (
                                    <p className="text-sm text-yellow-600 font-light mt-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        Limite de 10 images atteinte
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Zone de drag & drop quand aucune image */}
                        {previewImages.length === 0 && (
                            <div className="border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg p-8 text-center group transition-all duration-300 bg-gray-100 hover:bg-gray-200">
                                <div className="w-16 h-16 bg-gray-200 group-hover:bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <p className="text-gray-700 font-light text-sm mb-2">
                                    Utilisez le bouton ci-dessus ou glissez-déposez vos images ici
                                </p>
                                <p className="text-gray-600 font-light text-xs">
                                    JPG, PNG ou WebP jusqu'à 5MB par image
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Informations générales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Marque *
                            </label>
                            <input
                                type="text"
                                name="make"
                                value={formData.make}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                placeholder="Porsche"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Modèle *
                            </label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                placeholder="Cayenne"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Année *
                            </label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                min="1990"
                                max={new Date().getFullYear() + 1}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Prix (€) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                min="0"
                                step="100"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                placeholder="25000"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Couleur *
                            </label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                placeholder="Noir, Rouge, Blanc..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kilométrage (km)
                            </label>
                            <input
                                type="number"
                                name="mileage"
                                value={formData.mileage}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                placeholder="50000"
                            />
                        </div>
                    </div>

                    {/* Caractéristiques techniques */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">⚙️ Caractéristiques techniques</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Carburant
                                </label>
                                <select
                                    name="fuel_type"
                                    value={formData.fuel_type}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                >
                                    <option value="Essence">Essence</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Hybride">Hybride</option>
                                    <option value="Électrique">Électrique</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Transmission
                                </label>
                                <select
                                    name="transmission"
                                    value={formData.transmission}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                >
                                    <option value="Automatique">Automatique</option>
                                    <option value="Manuelle">Manuelle</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Traction
                                </label>
                                <select
                                    name="drive"
                                    value={formData.drive}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                >
                                    <option value="FWD">Traction avant (FWD)</option>
                                    <option value="RWD">Propulsion arrière (RWD)</option>
                                    <option value="AWD">Intégrale (AWD)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Consommation ville (L/100km)
                                </label>
                                <input
                                    type="number"
                                    name="city_mpg"
                                    value={formData.city_mpg}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.1"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                    placeholder="8.5"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Consommation autoroute (L/100km)
                                </label>
                                <input
                                    type="number"
                                    name="highway_mpg"
                                    value={formData.highway_mpg}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.1"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                    placeholder="6.2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">📝 Description</h3>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                            placeholder="Décrivez le véhicule, son état, ses équipements..."
                        />
                    </div>

                    {/* Disponibilité */}
                    <div className="border-t pt-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isAvailable"
                                checked={formData.isAvailable}
                                onChange={handleInputChange}
                                className="rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">
                                ✅ Véhicule disponible à la vente
                            </span>
                        </label>
                    </div>

                    {/* Boutons */}
                    <div className="border-t pt-6 flex justify-end space-x-4">
                        <CustomButton
                            title="❌ Annuler"
                            containerStyles="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            handleClick={onClose}
                            isDisabled={isLoading}
                        />
                        <CustomButton
                            title={isLoading ? "⏳ Sauvegarde..." : (isEditing ? "✅ Valider les modifications" : "➕ Créer le véhicule")}
                            btnType="submit"
                            isDisabled={isLoading}
                            containerStyles="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminVehicleForm; 