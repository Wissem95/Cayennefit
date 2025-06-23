"use client";

import { useState, useEffect } from "react";
import { VehicleProps } from "@types";
import { createVehicle, updateVehicle } from "@utils/vehicles";
import CustomButton from "./CustomButton";
import Image from "next/image";
import { useLanguage } from "@contexts/LanguageContext";

interface AdminVehicleFormProps {
    vehicle?: VehicleProps | null;
    onClose: () => void;
}

interface ImageItem {
    id: string;
    url: string;
    file?: File;
    isExisting: boolean;
    isDeleted: boolean;
}

/**
 * Formulaire d'administration CAYENNEFIT - Design luxueux inspiré de Dior
 * @param vehicle - Véhicule à modifier (null pour création)
 * @param onClose - Callback pour fermer le formulaire
 */
const AdminVehicleForm = ({ vehicle, onClose }: AdminVehicleFormProps) => {
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [images, setImages] = useState<ImageItem[]>([]);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
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
            
            // Charger les images existantes
            const existingImages: ImageItem[] = (vehicle.images || []).map((url, index) => ({
                id: `existing-${index}`,
                url,
                isExisting: true,
                isDeleted: false
            }));
            setImages(existingImages);
        } else {
            // Réinitialiser pour un nouveau véhicule
            setImages([]);
        }
    }, [vehicle]);

    // Nettoyer les URLs des aperçus lors du démontage du composant
    useEffect(() => {
        return () => {
            images.forEach(img => {
                if (!img.isExisting && img.url.startsWith('blob:')) {
                    URL.revokeObjectURL(img.url);
                }
            });
        };
    }, [images]);

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
     * Gestion de l'ajout d'images multiples sans effacer les précédentes
     */
    const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        
        // Limiter à 10 images maximum
        const maxImages = 10;
        const currentValidImages = images.filter(img => !img.isDeleted);
        const availableSlots = maxImages - currentValidImages.length;
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
            setTimeout(() => setError(null), 3000);
        }

        // Créer de nouveaux items d'image
        const newImageItems: ImageItem[] = validFiles.map((file, index) => ({
            id: `new-${Date.now()}-${index}`,
            url: URL.createObjectURL(file),
            file,
            isExisting: false,
            isDeleted: false
        }));

        // Ajouter aux images existantes
        setImages(prev => [...prev, ...newImageItems]);

        // Réinitialiser l'input
        e.target.value = '';

        if (limitedFiles.length > availableSlots) {
            setError(`Seulement ${availableSlots} images supplémentaires autorisées (max ${maxImages} total)`);
            setTimeout(() => setError(null), 3000);
        }
    };

    /**
     * Supprimer une image
     */
    const removeImage = (imageId: string) => {
        setImages(prev => prev.map(img => 
            img.id === imageId 
                ? { ...img, isDeleted: true }
                : img
        ));
    };

    /**
     * Restaurer une image supprimée
     */
    const restoreImage = (imageId: string) => {
        setImages(prev => prev.map(img => 
            img.id === imageId 
                ? { ...img, isDeleted: false }
                : img
        ));
    };

    /**
     * Déplacer une image vers le haut
     */
    const moveImageUp = (index: number) => {
        if (index === 0) return;
        
        setImages(prev => {
            const newImages = [...prev];
            [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
            return newImages;
        });
    };

    /**
     * Déplacer une image vers le bas
     */
    const moveImageDown = (index: number) => {
        setImages(prev => {
            if (index === prev.length - 1) return prev;
            
            const newImages = [...prev];
            [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
            return newImages;
        });
    };

    /**
     * Gestion du drag and drop
     */
    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        
        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            return;
        }

        setImages(prev => {
            const newImages = [...prev];
            const [draggedItem] = newImages.splice(draggedIndex, 1);
            newImages.splice(dropIndex, 0, draggedItem);
            return newImages;
        });
        
        setDraggedIndex(null);
    };

    /**
     * Supprimer toutes les images
     */
    const removeAllImages = () => {
        setImages(prev => prev.map(img => ({ ...img, isDeleted: true })));
        
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
            const remainingExistingImages = images.filter(img => img.isExisting && !img.isDeleted).map(img => img.url);
            
            // 2. Traiter les nouvelles images (convertir en base64)
            const newImageFiles = images.filter(img => !img.isExisting && !img.isDeleted && img.file).map(img => img.file!);
            const processedNewImages = newImageFiles.length > 0 ? await processImages(newImageFiles) : [];
            
            // 3. Combiner dans l'ordre correct (respecter l'ordre du drag & drop)
            const orderedImages: string[] = [];
            for (const img of images.filter(img => !img.isDeleted)) {
                if (img.isExisting) {
                    orderedImages.push(img.url);
                } else if (img.file) {
                    const base64 = processedNewImages.shift(); // Prendre la première image traitée
                    if (base64) orderedImages.push(base64);
                }
            }
            
            finalImages = orderedImages;
            
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
            console.log('AdminForm: Nouvelles images ajoutées:', processedNewImages.length);
            console.log('AdminForm: Images supprimées:', images.filter(img => img.isDeleted).length);

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
            images.forEach(img => {
                if (!img.isExisting && img.url.startsWith('blob:')) {
                    URL.revokeObjectURL(img.url);
                }
            });

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
                                images.forEach(img => {
                                    if (!img.isExisting && img.url.startsWith('blob:')) {
                                        URL.revokeObjectURL(img.url);
                                    }
                                });
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
                                {images.filter(img => !img.isDeleted).length}/{images.length} images
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
                                
                                {images.filter(img => !img.isDeleted).length > 0 && (
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
                                onChange={handleImageAdd}
                                className="hidden"
                                id="vehicle-images"
                            />
                        </div>

                        {/* Aperçu des images avec gestion améliorée */}
                        {images.filter(img => !img.isDeleted).length > 0 && (
                            <div>
                                <h4 className="text-sm font-light text-gray-700 tracking-wide mb-4">
                                    APERÇU : {images.filter(img => !img.isDeleted).length} image{images.filter(img => !img.isDeleted).length > 1 ? 's' : ''}
                                    {isEditing && (
                                        <span className="ml-2 text-xs text-blue-600">
                                            ({images.filter(img => img.isExisting).length} existante{(images.filter(img => img.isExisting).length) > 1 ? 's' : ''}, {images.filter(img => !img.isExisting).length} nouvelle{images.filter(img => !img.isExisting).length > 1 ? 's' : ''})
                                        </span>
                                    )}
                                </h4>
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {/* Instructions pour la réorganisation */}
                                    <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-lg">
                                        {t('form.dragToReorder')} • La première image sera l'image principale
                                    </div>
                                    
                                    {images.filter(img => !img.isDeleted).map((img, index) => {
                                        const validImages = images.filter(img => !img.isDeleted);
                                        const isFirst = index === 0;
                                        
                                        return (
                                            <div 
                                                key={img.id} 
                                                className={`relative group border rounded-lg p-3 transition-all duration-300 cursor-move ${
                                                    draggedIndex === index ? 'opacity-50 scale-95' : 'hover:shadow-md'
                                                } ${isFirst ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 hover:border-gray-400'}`}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, index)}
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleDrop(e, index)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {/* Image miniature */}
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                                        <Image
                                                            src={img.url}
                                                            alt={`Image ${index + 1}`}
                                                            width={64}
                                                            height={64}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    
                                                    {/* Informations */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-sm font-medium text-gray-900">
                                                                Image #{index + 1}
                                                            </span>
                                                            {isFirst && (
                                                                <span className="text-xs px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full font-medium">
                                                                    {t('form.isPrimary')}
                                                                </span>
                                                            )}
                                                            <span className={`text-xs px-2 py-1 rounded-full text-white font-medium ${
                                                                img.isExisting ? 'bg-blue-600' : 'bg-green-600'
                                                            }`}>
                                                                {img.isExisting ? t('form.existingImage') : t('form.newImage')}
                                                            </span>
                                                        </div>
                                                        
                                                        {/* Contrôles de réorganisation */}
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => moveImageUp(index)}
                                                                disabled={index === 0}
                                                                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                                title={t('form.moveUp')}
                                                            >
                                                                {t('form.moveUp')}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => moveImageDown(index)}
                                                                disabled={index === validImages.length - 1}
                                                                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                                title={t('form.moveDown')}
                                                            >
                                                                {t('form.moveDown')}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Bouton de suppression */}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(img.id)}
                                                        className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group-hover:opacity-100 opacity-60"
                                                        title={t('form.deleteImageTitle')}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    
                                    {/* Zone d'ajout de nouvelles images */}
                                    {images.filter(img => !img.isDeleted).length < 10 && (
                                        <label 
                                            htmlFor="vehicle-images"
                                            className="border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg p-6 text-center cursor-pointer transition-all duration-300 group hover:bg-gray-50"
                                        >
                                            <div className="flex flex-col items-center">
                                                <svg className="w-8 h-8 mb-2 text-gray-400 group-hover:text-gray-600 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800">
                                                    {t('form.addImages')}
                                                </span>
                                                <span className="text-xs text-gray-500 mt-1">
                                                    (Max {10 - images.filter(img => !img.isDeleted).length} images supplémentaires)
                                                </span>
                                            </div>
                                        </label>
                                    )}
                                </div>
                                {images.filter(img => !img.isDeleted).length >= 10 && (
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
                        {images.filter(img => !img.isDeleted).length === 0 && (
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