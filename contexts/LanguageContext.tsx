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
            "services": "SERVICES PORSCHE CAYENNE",
            "automobiles": "ENTRETIEN REPARATION & ASSISTANCE À DISTANCE PORSCHE CAYENNE",
            "vehicles": "VÉHICULES D'OCCASION PORSCHE CAYENNE",
            "parts": "PIÈCES DÉTACHÉES PORSCHE CAYENNE",
            "discover": "DÉCOUVRIR",
            "hoverToPlay": "Survolez pour lancer la vidéo",
            "excellence": "LE SPECIALISTE PORSCHE CAYENNE",
            "hoverToListen": "Survolez pour lancer la vidéo",
            "muteVideo": "Couper le son",
            "unmuteVideo": "Activer le son"
        },
        "navigation": {
            "home": "Accueil",
            "about": "Qui sommes-nous",
            "expertise": "Notre expertise",
            "services": "Services",
            "vehicles": "Véhicules",
            "admin": "Administration",
            "history": "Historique",
            "contact": "Contact",
            "menu": "Menu",
            "close": "Fermer"
        },
        "home": {
            "collection": "NOS OCCASIONS DU MOMENT",
            "automobile": "",
            "description": "Découvrez une sélection exclusive de véhicules",
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
        "filters": {
            "year": "Année",
            "fuel": "Diesel",
            "gas": "Essence",
            "electricity": "Électricité"
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
            "yearError": "L'année doit être comprise entre 1990 et",
            "imageManagement": "📸 Gestion des images",
            "addImages": "➕ Ajouter des images",
            "imageOrder": "Ordre des images",
            "moveUp": "↑ Monter",
            "moveDown": "↓ Descendre", 
            "makePrimary": "🌟 Image principale",
            "isPrimary": "✨ Principale",
            "existingImage": "💾 Existante",
            "newImage": "🆕 Nouvelle",
            "dragToReorder": "🖱️ Glissez pour réorganiser"
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
            "wheelbase": "Empattement",
            "salePrice": "Prix de vente",
            "vehicleNotFound": "Véhicule non trouvé",
            "optimalPerformance": "Performance optimale et technologie avancée",
            "elegantDesign": "Design élégant et finitions premium",
            "exceptionalComfort": "Confort de conduite exceptionnel",
            "securitySystems": "Systèmes de sécurité dernière génération"
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
        },
       "aboutUs": {
            "title": "QUI SOMMES-NOUS ?",
            "subtitle": "À propos",
            "passion": "Passionnés par l'univers",
            "cayenne": "Porsche Cayenne",
            "specialty": ", nous avons fait de ce SUV d'exception notre spécialité. Depuis plusieurs années, nous nous consacrons exclusivement à la réparation, l'entretien et la valorisation de cette gamme emblématique.",
            "stock": "Nous disposons aujourd'hui de l'un des plus grands stocks de pièces détachées d'occasion au monde dédiées au Porsche Cayenne, toutes rigoureusement contrôlées et garanties. Qu'il s'agisse d'une pièce rare, d'un élément mécanique, électronique ou de carrosserie, vous trouverez chez nous la solution adaptée à vos besoins.",
            "service": "En plus de la vente de pièces, nous proposons également un service de montage complet dans nos ateliers spécialisés, avec des techniciens formés aux exigences Porsche. Notre mission : prolonger la vie de votre Cayenne, tout en vous faisant bénéficier de la qualité Porsche à prix maîtrisé.",
            "stat1": "Intervention par an",
            "stat2": "Ans d'expérience", 
            "stat3": "Pièces en stock",
            "vehicleException": "Véhicule d'exception",
            "cayenneCollection": "Porsche Cayenne Collection",
            "premium": "Premium",
            "quality": "Qualité"
        },
        "expertise": {
            "title": "EXPERTISE",
            "subtitle": "Notre savoir-faire",
            "description": "Depuis plus de 10 ans, nous avons orienté notre activité autour de l'acquisition de Porsche Cayenne , avec un objectif clair : constituer un stock considérable de pièces détachées pour répondre à toutes les demandes, même les plus spécifiques.",
            "strategy": "Cette stratégie nous permet aujourd'hui de proposer à nos clients l'une des plus larges sélections de pièces d'occasion pour Porsche Cayenne, couvrant toutes les générations et motorisations. Chaque pièce est soigneusement contrôlée et référencée dans notre base, garantissant traçabilité, fiabilité et disponibilité immédiate.",
            "contactExperts": "Besoin d'une expertise personnalisée ?",
            "contactDescription": "Contactez nos experts pour une évaluation de vos besoins",
            "assistanceButton": "Nos forfaits assistance à distance",
            "contactButton": "Nous contacter",
            "cards": {
                "technical": {
                    "title": "EXPERTISE TECHNIQUE",
                    "description": "Évaluation complète de l'état mécanique, électronique et esthétique de chaque véhicule par nos experts certifiés."
                },
                "history": {
                    "title": "ASSISTANCE À DISTANCE",
                    "description": "Accompagnement personnalisé et résolution de pannes à distance pour vos véhicules Porsche Cayenne, assurés par nos experts."
                },
                "maintenance": {
                    "title": "MAINTENANCE PREMIUM",
                    "description": "Service de maintenance préventive et corrective par des techniciens spécialisés Porsche Cayenne."
                },
                "warranty": {
                    "title": "GARANTIE QUALITÉ",
                    "description": "Garantie étendue sur tous nos véhicules d'occasion avec suivi personnalisé et assistance dédiée."
                },
                "selection": {
                    "title": "SÉLECTION EXCLUSIVE",
                    "description": "Choix de véhicules d'occasion d'exception provenant de propriétaires méticuleux."
                },
                "delivery": {
                    "title": "LIVRAISON PREMIUM",
                    "description": "Service de livraison sécurisée partout en France avec remise personnalisée et formation."
                }
            }
        },
        "services": {
            "ourServices": "Nos services",
            "mainService": "Service Principal",
            "spareParts": "VENTE DE PIÈCES DÉTACHÉES",
            "stockDescription": "Plus de 10 000 pièces Porsche Cayenne en stock.",
            "stockDetails": "",
            "allGenerations": "Toutes générations de motorisations confondues. Chaque pièce est soigneusement contrôlée et référencée.",
            "qualityGuarantee": "Garantie qualité",
            "guaranteeDetails": "sur toutes nos pièces d'occasion avec possibilité de montage dans nos ateliers spécialisés.",
            "mainCategories": {
                "engine": "Moteur & Transmission",
                "electronic": "Électronique",
                "body": "Carrosserie",
                "interior": "Intérieur"
            },
            "immediateRepurchase": "Rachat immédiat",
            "immediateRepurchaseDescription": "Nous rachetons votre Porsche Cayenne, même en panne ou accidenté. Évaluation gratuite et paiement comptant sous 24h.",
            "specializedConsignment": "Dépôt-vente spécialisé",
            "specializedConsignmentDescription": "Confiez-nous la vente de votre Cayenne. Notre expertise et notre réseau garantissent une valorisation optimale de votre véhicule.",
            "expertiseAdvice": "Expertise & Conseil",
            "expertiseAdviceDescription": "10 ans d'expérience Porsche Cayenne à votre service. Diagnostic, estimation, conseil d'achat ou de réparation.",
            "parts": {
                "title": "ACHAT DE PIÈCES DÉTACHÉES",
                "subtitle": "Pièces d'occasion",
                "description1": "Vous recherchez des pièces d'occasion pour votre Porsche Cayenne ? Vous êtes au bon endroit.",
                "description2": "Nous disposons d'un stock impressionnant de pièces détachées disponibles immédiatement, couvrant toutes les générations de Cayenne. Mécanique, électronique, carrosserie, intérieur… nous avons ce qu'il vous faut.",
                "visit": "👉 Rendez-vous directement dans notre dépôt pour découvrir les pièces disponibles, ou",
                "contact": "📩 contactez-nous via notre chat en ligne : notre équipe dédiée vous répondra rapidement pour vous guider et vérifier la disponibilité des pièces recherchées.",
                "guarantee": "Toutes nos pièces sont testées, contrôlées et garanties, afin de vous assurer une qualité optimale à prix réduit.",
                "subtitle2": "Nos produits"
            },
            "business": {
                "title": "ACHAT • REVENTE • DÉPÔT-VENTE",
                "subtitle": "Nos services",
                "description": "Vous souhaitez vendre votre Porsche Cayenne ? CayenneFit vous propose plusieurs solutions simples et efficaces :",
                "buyback": "Rachat immédiat :",
                "buybackDesc": "Nous reprenons votre Cayenne en l'état, même s'il est non roulant. Pas de contraintes, pas de frais cachés : notre équipe s'occupe de tout.",
                "consignment": "Dépôt-vente :",
                "consignmentDesc": "Confiez-nous votre véhicule, et nous nous chargeons de sa mise en valeur et de sa vente. Grâce à notre réseau solide d'acheteurs spécialisés, nous maximisons vos chances de vendre rapidement et au bon prix.",
                "looking": "Vous êtes à la recherche d'un Porsche Cayenne d'occasion ?",
                "lookingDesc": "Rendez-vous dans notre rubrique \"Occasions du moment\" pour découvrir notre sélection de véhicules disponibles. Tous nos modèles sont révisés, garantis, et prêts à prendre la route."
            }
        },
        "footer": {
            "title": "CAYENNEFIT",
            "subtitle": "Spécialiste en véhicules Porsche Cayenne d'exception. Expertise, qualité et service premium depuis plus de 10 ans.",
            "quickLinks": "Liens rapides",
            "expertise": "Notre expertise",
            "services": "Véhicules d'occasion",
            "expertiseVehicle": "Expertise véhicule",
            "spareParts": "Pièces détachées",
            "buyback": "Rachat de véhicule",
            "consignment": "Vente en dépôt",
            "contact": "Contact",
            "phone": "Téléphone",
            "email": "Email",
            "address": "Adresse",
            "schedule": "Lundi au vendredi, 9h-18h",
            "rights": "Tous droits réservés.",
            "followUs": "Suivez-nous",
            "servicesTitle": "Services",
            "companyTitle": "Entreprise",
            "supportTitle": "Support",
            "news": "Actualités",
            "helpCenter": "Centre d'aide",
            "warranties": "Garanties",
            "financing": "Financement",
            "delivery": "Livraison",
            "legalNotice": "Mentions légales",
            "privacy": "Confidentialité",
            "terms": "Conditions",
            "madeWith": "Conçu avec",
            "forPassionate": "pour les passionnés"
        }
    },
    en: {
        "hero": {
            "services": "SERVICES PORSCHE CAYENNE",
            "automobiles": "MAINTENANCE  REPAIR & REMOTE ASSISTANCE FOR PORSCHE CAYENNE",
            "vehicles": "USED VEHICLES PORSCHE CAYENNE ",
            "parts": "SPARE PARTS PORSCHE CAYENNE",
            "discover": "DISCOVER",
            "hoverToPlay": "Hover to play video",
            "excellence": "Automotive Excellence",
            "hoverToListen": "Hover to play video",
            "muteVideo": "Mute sound",
            "unmuteVideo": "Unmute sound"
        },
        "navigation": {
            "home": "Home",
            "about": "About us",
            "expertise": "Our expertise",
            "services": "Services",
            "vehicles": "Vehicles",
            "admin": "Administration",
            "history": "History",
            "contact": "Contact",
            "menu": "Menu",
            "close": "Close"
        },
        "home": {
            "collection": "OUR CURRENT OFFERS",
            "automobile": "",
            "description": "Discover an exclusive selection of exceptional vehicles",
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
        "filters": {
            "year": "Year",
            "fuel": "Diesel",
            "gas": "Gas",
            "electricity": "Electricity"
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
            "imageManagement": "📸 Image management",
            "addImages": "➕ Add images",
            "imageOrder": "Image order",
            "moveUp": "↑ Move up",
            "moveDown": "↓ Move down", 
            "makePrimary": "🌟 Set as primary",
            "isPrimary": "✨ Primary",
            "existingImage": "💾 Existing",
            "newImage": "🆕 New",
            "dragToReorder": "🖱️ Drag to reorder",
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
            "wheelbase": "Wheelbase",
            "salePrice": "Sale price",
            "vehicleNotFound": "Vehicle not found",
            "optimalPerformance": "Optimal performance and advanced technology",
            "elegantDesign": "Elegant design and premium finishes",
            "exceptionalComfort": "Exceptional driving comfort",
            "securitySystems": "Latest generation security systems"
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
        },"aboutUs": {
            "title": "WHO ARE WE?",
            "subtitle": "About us",
            "passion": "Passionate about the",
            "cayenne": "Porsche Cayenne",
            "specialty": " universe, we have made this exceptional SUV our specialty. For several years, we have been exclusively dedicated to the repair, maintenance and enhancement of this emblematic range.",
            "stock": "We now have one of the largest stocks of used spare parts in the world dedicated to the Porsche Cayenne, all rigorously controlled and guaranteed. Whether it's a rare part, a mechanical, electronic or bodywork element, you'll find the solution adapted to your needs with us.",
            "service": "In addition to selling parts, we also offer a complete assembly service in our specialized workshops, with technicians trained to Porsche requirements. Our mission: to extend the life of your Cayenne, while providing you with Porsche quality at controlled prices.",
            "stat1": "Interventions per year",
            "stat2": "Years of experience", 
            "stat3": "Parts in stock",
            "vehicleException": "Exceptional vehicle",
            "cayenneCollection": "Porsche Cayenne Collection",
            "premium": "Premium",
            "quality": "Quality"
        },
        "expertise": {
            "title": "EXPERTISE",
            "subtitle": "Our know-how",
            "description": "For more than 10 years, we have oriented our activity around the acquisition of  Porsche Cayenne, with a clear objective: to build up a considerable stock of spare parts to meet all demands, even the most specific.",
            "strategy": "This strategy now allows us to offer our customers one of the widest selections of used parts for Porsche Cayenne, covering all generations and engines. Each part is carefully checked and referenced in our database, guaranteeing traceability, reliability and immediate availability.",
            "contactExperts": "Need personalized expertise?",
            "contactDescription": "Contact our experts for an evaluation of your needs",
            "assistanceButton": "Our remote assistance packages",
            "contactButton": "Contact us",
            "cards": {
                "technical": {
                    "title": "TECHNICAL EXPERTISE",
                    "description": "Complete evaluation of the mechanical, electronic and aesthetic condition of each vehicle by our certified experts."
                },
                "history": {
                    "title": "VERIFIED HISTORY",
                    "description": "Thorough verification of vehicle history, service records and document authenticity."
                },
                "maintenance": {
                    "title": "PREMIUM MAINTENANCE",
                    "description": "Preventive and corrective maintenance service by Porsche Cayenne specialized technicians."
                },
                "warranty": {
                    "title": "QUALITY WARRANTY",
                    "description": "Extended warranty on all our used vehicles with personalized follow-up and dedicated assistance."
                },
                "selection": {
                    "title": "EXCLUSIVE SELECTION",
                    "description": "A selection of exceptional used vehicles from meticulous owners."
                },
                "delivery": {
                    "title": "PREMIUM DELIVERY",
                    "description": "Secure delivery service throughout France with personalized handover and training."
                }
            }
        },
        "services": {
            "ourServices": "Our services",
            "mainService": "Main Service",
            "spareParts": "SPARE PARTS FOR SALE",
            "stockDescription": "Over 10,000 Porsche Cayenne parts in stock.",
            "stockDetails": "",
            "allGenerations": "All generations of engines combined. Each part is carefully checked and referenced.",
            "qualityGuarantee": "Quality guarantee",
            "guaranteeDetails": "on all our used parts with possible assembly in our specialized workshops.",
            "mainCategories": {
                "engine": "Engine & Transmission",
                "electronic": "Electronic",
                "body": "Bodywork",
                "interior": "Interior"
            },
            "immediateRepurchase": "Immediate buyback",
            "immediateRepurchaseDescription": "We buy back your Porsche Cayenne, even broken or damaged. Free evaluation and cash payment within 24h.",
            "specializedConsignment": "Specialized consignment",
            "specializedConsignmentDescription": "Entrust us with the sale of your Cayenne. Our expertise and network guarantee optimal valuation of your vehicle.",
            "expertiseAdvice": "Expertise & Advice",
            "expertiseAdviceDescription": "10 years of Porsche Cayenne experience at your service. Diagnosis, estimation, purchase or repair advice.",
            "parts": {
                "title": "PURCHASE OF SPARE PARTS",
                "subtitle": "Used parts",
                "description1": "Looking for used parts for your Porsche Cayenne? You're in the right place.",
                "description2": "We have an impressive stock of spare parts available immediately, covering all generations of Cayenne. Mechanical, electronic, bodywork, interior... we have what you need.",
                "visit": "👉 Visit our warehouse directly to discover available parts, or",
                "contact": "📩 contact us via our online chat: our dedicated team will respond quickly to guide you and check the availability of the parts you're looking for.",
                "guarantee": "All our parts are tested, checked and guaranteed, to ensure optimal quality at reduced prices.",
                "subtitle2": "Our products"
            },
            "business": {
                "title": "PURCHASE • RESALE • CONSIGNMENT",
                "subtitle": "Our services",
                "description": "Do you want to sell your Porsche Cayenne? CayenneFit offers you several simple and effective solutions:",
                "buyback": "Immediate buyback:",
                "buybackDesc": "We take back your Cayenne as is, even if it's not running. No constraints, no hidden costs: our team takes care of everything.",
                "consignment": "Consignment sale:",
                "consignmentDesc": "Entrust us with your vehicle, and we take care of its enhancement and sale. Thanks to our solid network of specialized buyers, we maximize your chances of selling quickly and at the right price.",
                "looking": "Are you looking for a used Porsche Cayenne?",
                "lookingDesc": "Visit our \"Current Opportunities\" section to discover our selection of available vehicles. All our models are serviced, guaranteed, and ready to hit the road."
            }
        },
        "footer": {
            "title": "CAYENNEFIT",
            "subtitle": "Specialist in exceptional Porsche Cayenne vehicles. Expertise, quality and premium service for over 10 years.",
            "quickLinks": "Quick links",
            "expertise": "Our expertise",
            "services": "Used vehicles",
            "expertiseVehicle": "Vehicle expertise",
            "spareParts": "Spare parts",
            "buyback": "Vehicle buyback",
            "consignment": "Consignment sale",
            "contact": "Contact",
            "phone": "Phone",
            "email": "Email",
            "address": "Address",
            "schedule": "Monday to Friday, 9am-6pm",
            "rights": "All rights reserved.",
            "followUs": "Follow us",
            "servicesTitle": "Services",
            "companyTitle": "Company",
            "supportTitle": "Support",
            "news": "News",
            "helpCenter": "Help center",
            "warranties": "Warranties",
            "financing": "Financing",
            "delivery": "Delivery",
            "legalNotice": "Legal notice",
            "privacy": "Privacy",
            "terms": "Terms",
            "madeWith": "Made with",
            "forPassionate": "for enthusiasts"
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