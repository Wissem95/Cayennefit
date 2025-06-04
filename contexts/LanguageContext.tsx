"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types pour les langues supportées
export type Language = 'fr' | 'en';

// Interface pour le contexte de langue
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

// Traductions complètes directement intégrées
const translations = {
    fr: {
        "hero": {
            "services": "SERVICES",
            "automobiles": "AUTOMOBILES",
            "vehicles": "VÉHICULES",
            "parts": "& PIÈCES DÉTACHÉES",
            "discover": "DÉCOUVRIR",
            "hoverToPlay": "Survolez pour lancer la vidéo",
            "excellence": "Excellence Automobile",
            "hoverToListen": "Survolez pour lancer la vidéo",
            "muteVideo": "Couper le son",
            "unmuteVideo": "Activer le son"
        },
        "navigation": {
            "home": "Accueil",
            "vehicles": "Véhicules",
            "admin": "Administration",
            "history": "Historique",
            "contact": "Contact"
        },
        "home": {
            "collection": "COLLECTION",
            "automobile": "AUTOMOBILE",
            "description": "Découvrez une sélection exclusive de véhicules d'exception, alliant performance, élégance et raffinement.",
            "refineSearch": "AFFINER VOTRE RECHERCHE",
            "vehiclesFound": "VÉHICULE(S) D'EXCEPTION",
            "noVehiclesFound": "AUCUN VÉHICULE TROUVÉ",
            "noVehiclesDescription": "Aucun véhicule ne correspond à vos critères de recherche. Modifiez vos filtres ou explorez notre collection complète.",
            "administration": "Administration",
            "adminDescription": "Utilisez le menu \"Administration\" pour gérer la collection"
        },
        "search": {
            "searchPlaceholder": "Rechercher une marque ou un modèle...",
            "manufacturer": "Constructeur",
            "year": "Année",
            "fuel": "Carburant", 
            "model": "Modèle",
            "minPrice": "Prix minimum",
            "maxPrice": "Prix maximum"
        },
        "vehicle": {
            "price": "€",
            "year": "Année",
            "fuel": "Carburant",
            "transmission": "Transmission",
            "mileage": "Kilométrage",
            "color": "Couleur",
            "description": "Description",
            "available": "Disponible",
            "sold": "Vendu",
            "cityConsumption": "Ville",
            "highwayConsumption": "Route",
            "drive": "Transmission",
            "images": "Images du véhicule",
            "noImageAvailable": "Aucune image disponible",
            "noDescriptionAvailable": "Aucune description disponible.",
            "specifications": "Caractéristiques techniques",
            "imageUnavailable": "IMAGE INDISPONIBLE",
            "viewDetails": "VOIR DÉTAILS",
            "configure": "CONFIGURER",
            "book": "RÉSERVER",
            "contact": "CONTACTER"
        },
        "admin": {
            "title": "PANEL ADMINISTRATEUR",
            "titlePrivileged": "ADMINISTRATION PRIVILÉGIÉE",
            "dashboard": "TABLEAU DE BORD",
            "vehicleManagement": "GESTION DES VÉHICULES",
            "newVehicle": "NOUVEAU VÉHICULE", 
            "vehicleHistory": "HISTORIQUE DE VÉHICULES",
            "statistics": "Statistiques",
            "totalVehicles": "Total véhicules",
            "availableVehicles": "Véhicules disponibles",
            "soldVehicles": "Véhicules vendus",
            "totalValue": "Valeur totale",
            "averagePrice": "Prix moyen",
            "actions": "Actions",
            "edit": "Modifier",
            "delete": "Supprimer", 
            "markAsSold": "Marquer comme vendu",
            "restore": "Restaurer",
            "filters": "Filtres",
            "all": "Tous",
            "available": "Disponibles",
            "sold": "Vendus",
            "sortBy": "Trier par",
            "date": "Date",
            "price": "Prix",
            "brand": "Marque",
            "loading": "Chargement de l'administration...",
            "managementDescription": "Gestion d'exception pour une collection automobile d'élite",
            "overview": "VUE D'ENSEMBLE",
            "collection": "Collection",
            "averagePriceLabel": "Prix Moyen",
            "soldLabel": "Vendus",
            "availableVehiclesOnly": "VÉHICULES DISPONIBLES",
            "vehiclesForSale": "véhicule(s) en vente",
            "addVehicle": "AJOUTER UN VÉHICULE",
            "noVehicleAvailable": "AUCUN VÉHICULE DISPONIBLE",
            "noVehicleDescription": "Commencez votre collection d'exception en ajoutant votre premier véhicule. Chaque détail compte dans l'art de l'automobile.",
            "startCollection": "DÉBUTER LA COLLECTION",
            "confirmDeletion": "CONFIRMER LA SUPPRESSION",
            "deletionWarning": "Cette action supprimera définitivement ce véhicule de votre collection",
            "deleteAction": "SUPPRIMER",
            "cancelAction": "ANNULER"
        },
        "form": {
            "make": "Marque",
            "model": "Modèle",
            "year": "Année",
            "price": "Prix (€)",
            "fuelType": "Type de carburant",
            "fuel": "Carburant",
            "transmission": "Transmission",
            "color": "Couleur",
            "mileage": "Kilométrage",
            "mileageKm": "Kilométrage (km)",
            "description": "Description",
            "images": "Images",
            "cityMpg": "Consommation ville (L/100km)",
            "highwayMpg": "Consommation route (L/100km)",
            "drive": "Type de transmission",
            "save": "Enregistrer",
            "cancel": "Annuler",
            "required": "Obligatoire",
            "editVehicle": "✏️ Modifier le véhicule",
            "newVehicle": "➕ Nouveau véhicule",
            "deleteAllImages": "SUPPRIMER TOUTES",
            "deleteImageTitle": "Supprimer cette image",
            "makeRequired": "Marque *",
            "modelRequired": "Modèle *",
            "yearRequired": "Année *",
            "priceRequired": "Prix (€) *",
            "colorRequired": "Couleur *",
            "descriptionLabel": "📝 Description",
            "descriptionPlaceholder": "Décrivez le véhicule, son état, ses équipements...",
            "availableForSale": "✅ Véhicule disponible à la vente",
            "cancelButton": "❌ Annuler",
            "saving": "⏳ Sauvegarde...",
            "validateChanges": "✅ Valider les modifications",
            "createVehicle": "➕ Créer le véhicule",
            "vehicleModified": "Véhicule modifié avec succès !",
            "vehicleCreated": "Véhicule créé avec succès !",
            "priceError": "Le prix doit être supérieur à 0.",
            "yearError": "L'année doit être comprise entre 1990 et"
        },
        "history": {
            "title": "HISTORIQUE DES VÉHICULES",
            "description": "Archive complète de votre collection automobile d'exception",
            "loading": "Chargement de l'historique...",
            "total": "Total",
            "availableFilter": "Disponibles",
            "soldFilter": "Vendus",
            "filters": "Filtres",
            "all": "Tous",
            "sortBy": "Trier par",
            "date": "Date",
            "price": "Prix",
            "brand": "Marque",
            "vehicleColumn": "Véhicule",
            "priceColumn": "Prix",
            "statusColumn": "Statut",
            "dateColumn": "Date",
            "actionsColumn": "Actions",
            "availableStatus": "DISPONIBLE",
            "soldStatus": "VENDU",
            "restore": "RESTAURER",
            "noVehicleFound": "Aucun véhicule trouvé"
        },
        "details": {
            "title": "DÉTAILS DU VÉHICULE",
            "backToCollection": "← RETOUR À LA COLLECTION",
            "configure": "CONFIGURER",
            "book": "RÉSERVER",
            "contact": "NOUS CONTACTER",
            "specifications": "SPÉCIFICATIONS TECHNIQUES",
            "gallery": "GALERIE D'IMAGES",
            "description": "DESCRIPTION",
            "features": "ÉQUIPEMENTS & OPTIONS",
            "financing": "FINANCEMENT",
            "warranty": "GARANTIE",
            "delivery": "LIVRAISON",
            "trade": "REPRISE",
            "insurance": "ASSURANCE",
            "maintenance": "ENTRETIEN",
            "history": "HISTORIQUE DU VÉHICULE",
            "documents": "DOCUMENTS",
            "notAvailable": "Non disponible",
            "kmUnit": "km",
            "yearUnit": "années",
            "powerUnit": "ch",
            "engineSize": "Cylindrée",
            "power": "Puissance",
            "acceleration": "0-100 km/h",
            "topSpeed": "Vitesse max",
            "consumption": "Consommation",
            "emissions": "Émissions CO2",
            "doors": "Portes",
            "seats": "Places",
            "trunk": "Coffre",
            "weight": "Poids",
            "length": "Longueur",
            "width": "Largeur",
            "height": "Hauteur",
            "wheelbase": "Empattement"
        },
        "common": {
            "loading": "Chargement...",
            "error": "Erreur",
            "success": "Succès",
            "confirm": "Confirmer",
            "delete": "Supprimer",
            "edit": "Modifier",
            "view": "Voir",
            "close": "Fermer",
            "save": "Enregistrer",
            "cancel": "Annuler",
            "next": "Suivant",
            "previous": "Précédent",
            "more": "Plus",
            "less": "Moins",
            "all": "Tous",
            "none": "Aucun",
            "yes": "Oui",
            "no": "Non",
            "euro": "€",
            "kilometer": "km",
            "year": "année",
            "month": "mois",
            "day": "jour",
            "hour": "heure",
            "minute": "minute"
        }
    },
    en: {
        "hero": {
            "services": "SERVICES",
            "automobiles": "AUTOMOTIVE",
            "vehicles": "VEHICLES",
            "parts": "& SPARE PARTS",
            "discover": "DISCOVER",
            "hoverToPlay": "Hover to play video",
            "excellence": "Automotive Excellence",
            "hoverToListen": "Hover to play video",
            "muteVideo": "Mute sound",
            "unmuteVideo": "Unmute sound"
        },
        "navigation": {
            "home": "Home",
            "vehicles": "Vehicles",
            "admin": "Administration",
            "history": "History",
            "contact": "Contact"
        },
        "home": {
            "collection": "COLLECTION",
            "automobile": "AUTOMOTIVE",
            "description": "Discover an exclusive selection of exceptional vehicles, combining performance, elegance and refinement.",
            "refineSearch": "REFINE YOUR SEARCH",
            "vehiclesFound": "EXCEPTIONAL VEHICLE(S)",
            "noVehiclesFound": "NO VEHICLES FOUND",
            "noVehiclesDescription": "No vehicles match your search criteria. Modify your filters or explore our complete collection.",
            "administration": "Administration",
            "adminDescription": "Use the \"Administration\" menu to manage the collection"
        },
        "search": {
            "searchPlaceholder": "Search for a brand or model...",
            "manufacturer": "Manufacturer",
            "year": "Year",
            "fuel": "Fuel",
            "model": "Model",
            "minPrice": "Minimum price",
            "maxPrice": "Maximum price"
        },
        "vehicle": {
            "price": "€",
            "year": "Year",
            "fuel": "Fuel",
            "transmission": "Transmission",
            "mileage": "Mileage",
            "color": "Color",
            "description": "Description",
            "available": "Available",
            "sold": "Sold",
            "cityConsumption": "City",
            "highwayConsumption": "Highway",
            "drive": "Drive",
            "images": "Vehicle images",
            "noImageAvailable": "No image available",
            "noDescriptionAvailable": "No description available.",
            "specifications": "Technical specifications",
            "imageUnavailable": "IMAGE UNAVAILABLE",
            "viewDetails": "VIEW DETAILS",
            "configure": "CONFIGURE",
            "book": "BOOK",
            "contact": "CONTACT"
        },
        "admin": {
            "title": "ADMIN PANEL",
            "titlePrivileged": "PRIVILEGED ADMINISTRATION",
            "dashboard": "DASHBOARD",
            "vehicleManagement": "VEHICLE MANAGEMENT",
            "newVehicle": "NEW VEHICLE",
            "vehicleHistory": "VEHICLE HISTORY",
            "statistics": "Statistics",
            "totalVehicles": "Total vehicles",
            "availableVehicles": "Available vehicles",
            "soldVehicles": "Sold vehicles",
            "totalValue": "Total value",
            "averagePrice": "Average price",
            "actions": "Actions",
            "edit": "Edit",
            "delete": "Delete",
            "markAsSold": "Mark as sold",
            "restore": "Restore",
            "filters": "Filters",
            "all": "All",
            "available": "Available",
            "sold": "Sold",
            "sortBy": "Sort by",
            "date": "Date",
            "price": "Price",
            "brand": "Brand",
            "loading": "Loading administration...",
            "managementDescription": "Exceptional management for an elite automotive collection",
            "overview": "OVERVIEW",
            "collection": "Collection",
            "averagePriceLabel": "Average Price",
            "soldLabel": "Sold",
            "availableVehiclesOnly": "AVAILABLE VEHICLES",
            "vehiclesForSale": "vehicle(s) for sale",
            "addVehicle": "ADD VEHICLE",
            "noVehicleAvailable": "NO VEHICLES AVAILABLE",
            "noVehicleDescription": "Start your exceptional collection by adding your first vehicle. Every detail matters in the art of automobiles.",
            "startCollection": "START COLLECTION",
            "confirmDeletion": "CONFIRM DELETION",
            "deletionWarning": "This action will permanently delete this vehicle from your collection",
            "deleteAction": "DELETE",
            "cancelAction": "CANCEL"
        },
        "form": {
            "make": "Brand",
            "model": "Model",
            "year": "Year",
            "price": "Price (€)",
            "fuelType": "Fuel type",
            "fuel": "Fuel",
            "transmission": "Transmission",
            "color": "Color",
            "mileage": "Mileage",
            "mileageKm": "Mileage (km)",
            "description": "Description",
            "images": "Images",
            "cityMpg": "City consumption (L/100km)",
            "highwayMpg": "Highway consumption (L/100km)",
            "drive": "Drive type",
            "save": "Save",
            "cancel": "Cancel",
            "required": "Required",
            "editVehicle": "✏️ Edit vehicle",
            "newVehicle": "➕ New vehicle",
            "deleteAllImages": "DELETE ALL",
            "deleteImageTitle": "Delete this image",
            "makeRequired": "Brand *",
            "modelRequired": "Model *",
            "yearRequired": "Year *",
            "priceRequired": "Price (€) *",
            "colorRequired": "Color *",
            "descriptionLabel": "📝 Description",
            "descriptionPlaceholder": "Describe the vehicle, its condition, equipment...",
            "availableForSale": "✅ Vehicle available for sale",
            "cancelButton": "❌ Cancel",
            "saving": "⏳ Saving...",
            "validateChanges": "✅ Validate changes",
            "createVehicle": "➕ Create vehicle",
            "vehicleModified": "Vehicle modified successfully!",
            "vehicleCreated": "Vehicle created successfully!",
            "priceError": "Price must be greater than 0.",
            "yearError": "Year must be between 1990 and"
        },
        "history": {
            "title": "VEHICLE HISTORY",
            "description": "Complete archive of your exceptional automotive collection",
            "loading": "Loading history...",
            "total": "Total",
            "availableFilter": "Available",
            "soldFilter": "Sold",
            "filters": "Filters",
            "all": "All",
            "sortBy": "Sort by",
            "date": "Date",
            "price": "Price",
            "brand": "Brand",
            "vehicleColumn": "Vehicle",
            "priceColumn": "Price",
            "statusColumn": "Status",
            "dateColumn": "Date",
            "actionsColumn": "Actions",
            "availableStatus": "AVAILABLE",
            "soldStatus": "SOLD",
            "restore": "RESTORE",
            "noVehicleFound": "No vehicle found"
        },
        "details": {
            "title": "VEHICLE DETAILS",
            "backToCollection": "← BACK TO COLLECTION",
            "configure": "CONFIGURE",
            "book": "BOOK",
            "contact": "CONTACT US",
            "specifications": "TECHNICAL SPECIFICATIONS",
            "gallery": "IMAGE GALLERY",
            "description": "DESCRIPTION",
            "features": "EQUIPMENT & OPTIONS",
            "financing": "FINANCING",
            "warranty": "WARRANTY",
            "delivery": "DELIVERY",
            "trade": "TRADE-IN",
            "insurance": "INSURANCE",
            "maintenance": "MAINTENANCE",
            "history": "VEHICLE HISTORY",
            "documents": "DOCUMENTS",
            "notAvailable": "Not available",
            "kmUnit": "km",
            "yearUnit": "years",
            "powerUnit": "hp",
            "engineSize": "Engine size",
            "power": "Power",
            "acceleration": "0-100 km/h",
            "topSpeed": "Top speed",
            "consumption": "Consumption",
            "emissions": "CO2 emissions",
            "doors": "Doors",
            "seats": "Seats",
            "trunk": "Trunk",
            "weight": "Weight",
            "length": "Length",
            "width": "Width",
            "height": "Height",
            "wheelbase": "Wheelbase"
        },
        "common": {
            "loading": "Loading...",
            "error": "Error",
            "success": "Success",
            "confirm": "Confirm",
            "delete": "Delete",
            "edit": "Edit",
            "view": "View",
            "close": "Close",
            "save": "Save",
            "cancel": "Cancel",
            "next": "Next",
            "previous": "Previous",
            "more": "More",
            "less": "Less",
            "all": "All",
            "none": "None",
            "yes": "Yes",
            "no": "No",
            "euro": "€",
            "kilometer": "km",
            "year": "year",
            "month": "month",
            "day": "day",
            "hour": "hour",
            "minute": "minute"
        }
    }
};

// Création du contexte avec valeur par défaut
const LanguageContext = createContext<LanguageContextType>({
    language: 'fr',
    setLanguage: () => {},
    t: (key: string) => key
});

// Provider du contexte de langue 
interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('fr');
    const [isClient, setIsClient] = useState(false);

    // Vérifier qu'on est côté client
    useEffect(() => {
        setIsClient(true);
        
        // Restaurer la langue depuis localStorage seulement côté client
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('cayennefit-language') as Language;
            if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
                setLanguage(savedLanguage);
            }
        }
    }, []);

    // Sauvegarder la langue dans localStorage seulement côté client
    useEffect(() => {
        if (isClient && typeof window !== 'undefined') {
            localStorage.setItem('cayennefit-language', language);
        }
    }, [language, isClient]);

    // Fonction de traduction avec support des clés imbriquées
    const t = (key: string): string => {
        try {
            const keys = key.split('.');
            let value: any = translations[language];
            
            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
                    // Si la clé n'existe pas, retourner la clé elle-même
                    return key;
                }
            }
            
            return typeof value === 'string' ? value : key;
        } catch (error) {
            return key;
        }
    };

    const contextValue: LanguageContextType = {
        language,
        setLanguage,
        t
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    return context;
};

// Hook spécialisé pour les traductions
export const useTranslation = () => {
    const { t } = useLanguage();
    return { t };
}; 