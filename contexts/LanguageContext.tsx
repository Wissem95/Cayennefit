"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types pour les langues supportées
export type Language = 'fr' | 'en';

// Interface pour le contexte de langue
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    translations: typeof translations;
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
            "fuel": "Carburant",
            "gas": "Essence",
            "hybrid": "Hybride",
            "electricity": "Électricité",
            "diesel": "Diesel",
            "reset": "Réinitialiser",
            "resetting": "Réinitialisation..."
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
            "yearUnit": "ans",
            "powerUnit": "ch",
            "engineSize": "Cylindrée",
            "power": "Puissance",
            "acceleration": "0-100 km/h",
            "topSpeed": "Vitesse maximale",
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
            "optimalPerformance": "Performances optimales et technologie avancée",
            "elegantDesign": "Design élégant et finitions premium",
            "exceptionalComfort": "Confort de conduite exceptionnel",
            "securitySystems": "Systèmes de sécurité dernière génération"
        },
        "appointment": {
            "button": "RENDEZ-VOUS",
            "bookAppointment": "PRENDRE RENDEZ-VOUS",
            "appointmentFor": "Prendre rendez-vous pour",
            "appointmentGeneral": "Prendre rendez-vous",
            "meetingType": "🤝 Rendez-vous commercial",
            "bookAppointmentTitle": "PRENDRE RENDEZ-VOUS",
            "bookAppointmentSubtitle": "Réservez votre créneau en quelques clics",
            "bookingSuccess": "Demande envoyée avec succès ! Nous vous recontacterons rapidement.",
            "clientName": "Nom complet",
            "clientEmail": "Email",
            "serviceType": "Type de service",
            "appointmentDate": "Date et heure souhaitées",
            "availableSlots": "Créneaux disponibles pour le",
            "noSlotsAvailable": "Aucun créneau disponible pour le",
            "chooseAnotherDate": "Veuillez choisir une autre date. Tous les créneaux sont déjà confirmés.",
            "message": "Message (optionnel)",
            "messagePlaceholder": "Précisions sur votre demande, questions particulières...",
            "cancel": "ANNULER",
            "processing": "TRAITEMENT EN COURS..."
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
            "subtitle": "Spécialiste en véhicules Porsche Cayenne d'occasion. Expertise, qualité et service premium depuis plus de 10 ans.",
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
            "terms": "Conditions Générales de Vente",
            "privacy": "Politique de Protection des Données",
            "madeWith": "Conçu avec",
            "forPassionate": "pour les passionnés"
        },
        "adminHistory": {
            "title": "Historique des Rendez-vous",
            "description": "Consultez l'historique complet des rendez-vous pris via le site web",
            "noAppointments": "Aucun rendez-vous trouvé",
            "date": "Date",
            "time": "Heure",
            "client": "Client",
            "phone": "Téléphone",
            "email": "Email",
            "vehicle": "Véhicule d'intérêt",
            "message": "Message",
            "actions": "Actions",
            "status": "Statut",
            "pending": "En attente",
            "confirmed": "Confirmé",
            "cancelled": "Annulé",
            "completed": "Terminé",
            "viewDetails": "Voir détails",
            "markAsConfirmed": "Marquer comme confirmé",
            "markAsCompleted": "Marquer comme terminé",
            "markAsCancelled": "Marquer comme annulé",
            "exportData": "Exporter les données",
            "filterByStatus": "Filtrer par statut",
            "searchClient": "Rechercher un client",
            "totalAppointments": "Total des rendez-vous",
            "thisMonth": "Ce mois-ci",
            "lastUpdate": "Dernière mise à jour"
        },
        "termsConditions": {
            "title": "Conditions Générales de Vente",
            "subtitle": "Cayennefit - Véhicules d'Exception",
            "article1": {
                "title": "Dispositions Générales",
                "content1": "Les présentes Conditions Générales de Vente s'appliquent aux relations contractuelles entre <strong>CAYENNEFIT</strong>, entreprise individuelle ayant son siège social au 14 bis rue du Bouchain, 59124 Escaudain, France, ci-après dénommée \"CAYENNEFIT\" et le CLIENT, personne physique, ci-après dénommé \"CLIENT\".",
                "content2": "Les Conditions Générales sont portées à la connaissance du CLIENT avant l'exécution de toute transaction et en constituent la base. CAYENNEFIT ne peut y renoncer par avance. La prise de rendez-vous implique l'acceptation pleine et entière de ces Conditions par le CLIENT.",
                "content3": "Aucune condition particulière ne peut prévaloir sauf acceptation formelle et écrite de CAYENNEFIT contre ces Conditions Générales.",
                "content4": "Ces Conditions Générales de Vente sont conformes aux dispositions du Code de commerce et du Code de la consommation. Elles se conforment aux usages commerciaux actuels de la profession.",
                "content5": "Les prix, informations et caractéristiques figurant sur les prospectus, fiches techniques, le site web ou autres documents sont donnés à titre indicatif seulement et ne sauraient en aucun cas être considérés comme des offres fermes.",
                "content6": "En outre, CAYENNEFIT se réserve le droit, à tout moment et sans préavis, d'apporter toutes modifications ou améliorations à ses offres qu'elle juge nécessaires, sans que le CLIENT puisse prétendre à un quelconque préjudice."
            },
            "article2": {
                "title": "Objet",
                "content": "L'objet des présentes Conditions Générales de Vente est de fixer les modalités applicables à tout achat effectué par le CLIENT sur le site web de CAYENNEFIT : <strong>www.cayennefit.io</strong> (ci-après dénommé le \"SITE WEB\") ou à toute commande passée par téléphone ou e-mail."
            },
            "article3": {
                "title": "Définitions",
                "client": "<strong>CLIENT :</strong> désigne toute personne physique agissant en son nom propre, effectuant un achat par l'intermédiaire du SITE WEB ou par téléphone ou e-mail.",
                "vehicles": "<strong>VÉHICULES :</strong> désigne tous les véhicules de luxe et d'exception commercialisés par CAYENNEFIT. Sauf cas particuliers, tous les véhicules proposés sont d'occasion en excellent état.",
                "parties": "<strong>PARTIES :</strong> désigne le CLIENT et CAYENNEFIT, liés dans une relation par le présent accord.",
                "site": "<strong>SITE :</strong> désigne le site web \"www.cayennefit.io\" exploité par CAYENNEFIT."
            },
            "article4": {
                "title": "Accessibilité et Prise de Rendez-vous",
                "subtitle1": "Conditions de prise de rendez-vous",
                "content1_1": "La prise de rendez-vous se fait en remplissant un formulaire en ligne ou par contact téléphonique.",
                "content1_2": "Le CLIENT doit être majeur et avoir la capacité de contracter.",
                "content1_3": "CAYENNEFIT se réserve le droit d'accepter ou de refuser tout rendez-vous.",
                "content1_4": "Le CLIENT s'engage à fournir des données exactes et véridiques.",
                "subtitle2": "Conditions d'essai des véhicules",
                "content2_1": "Présentation d'un permis de conduire valide obligatoire.",
                "content2_2": "Justificatif d'identité et de domicile requis.",
                "content2_3": "Signature d'une décharge de responsabilité avant l'essai.",
                "content2_4": "Respect strict des consignes de sécurité et du code de la route."
            },
            "article5": {
                "title": "Données Personnelles",
                "content1": "Dans le cadre de la relation contractuelle régie par les présentes Conditions Générales, le CLIENT autorise expressément CAYENNEFIT à traiter les données personnelles de la manière décrite ci-dessous.",
                "content2": "CAYENNEFIT agit en qualité de responsable du traitement. Son siège social est situé au 14 bis rue du Bouchain, 59124 Escaudain, France. Contact : <strong>contact@cayennefit.fr</strong> ou par téléphone : <strong>+33 1 XX XX XX XX</strong>",
                "content3": "La finalité du traitement auquel consent le CLIENT est de permettre à CAYENNEFIT de satisfaire ses obligations contractuelles et d'informer le CLIENT de ses offres et nouveaux véhicules.",
                "content4": "Les données personnelles collectées dans le cadre de cet accord sont les suivantes : nom, prénom, coordonnées e-mail, postales et téléphoniques du CLIENT.",
                "content5": "Seuls le dirigeant et le service clientèle de CAYENNEFIT ont accès aux données collectées.",
                "content6": "Les données collectées sont conservées pendant toute la durée de la relation contractuelle entre le CLIENT et CAYENNEFIT, et pendant un an après la fin de cette relation.",
                "content7": "Le CLIENT est informé que les données collectées par CAYENNEFIT ne sont pas transférées en dehors de l'Union européenne.",
                "content8": "Le CLIENT dispose d'un droit d'accès, de rectification, d'effacement ou d'opposition concernant ses données personnelles. Il peut également bénéficier du droit à la portabilité de ses données."
            },
            "article6": {
                "title": "Propriété Intellectuelle",
                "content1": "Le SITE WEB est la propriété exclusive de CAYENNEFIT, qui détient donc tous les droits de propriété intellectuelle s'y rapportant. Son contenu ne peut donc être modifié, copié, distribué, reproduit, téléchargé, affiché, publié, communiqué ou vendu sous quelque forme ou par quelque moyen que ce soit.",
                "content2": "CAYENNEFIT conserve la propriété pleine et exclusive de toutes les marques, dessins déposés et droits d'auteur attachés aux contenus fournis par ou accessibles par l'intermédiaire du SITE WEB.",
                "content3": "Il est précisé que les marques des constructeurs automobiles (Porsche, Ferrari, Lamborghini, etc.) sont des marques déposées de leurs propriétaires respectifs. CAYENNEFIT n'est pas un représentant officiel de ces marques et n'agit pas en leur nom."
            },
            "article7": {
                "title": "Processus de Vente",
                "content1": "Lorsque le CLIENT souhaite acquérir un véhicule, il doit d'abord prendre rendez-vous pour une visite et un essai.",
                "content2": "Après accord sur les conditions de vente, un contrat de vente est établi précisant toutes les modalités (prix, paiement, livraison, garanties).",
                "content3": "La vente ne sera réputée définitive qu'une fois le paiement reçu par CAYENNEFIT.",
                "content4": "CAYENNEFIT se réserve le droit de refuser ou d'annuler toute vente, notamment en cas d'insolvabilité du CLIENT ou de non-paiement.",
                "content5": "Les photographies et vidéos présentées ne sont pas contractuelles. Seule l'inspection physique du véhicule fait foi."
            },
            "article8": {
                "title": "Prix",
                "content1": "Le prix des VÉHICULES sur le SITE WEB est exprimé en Euro et comprend toutes les taxes.",
                "content2": "Le prix associé à chaque VÉHICULE ne comprend pas les frais de carte grise, de livraison ou les droits de douane éventuels.",
                "content3": "Le prix indiqué dans la confirmation de commande est le prix définitif.",
                "content4": "CAYENNEFIT se réserve le droit de modifier le prix des VÉHICULES à tout moment, étant entendu que le prix figurant dans la confirmation de commande ne s'applique qu'au CLIENT."
            },
            "article9": {
                "title": "Modalités de Paiement",
                "content1": "Le prix facturé au CLIENT est le prix indiqué dans la confirmation de commande émise par CAYENNEFIT.",
                "paymentMethods": "Moyens de paiement acceptés :",
                "method1": "Virement bancaire",
                "method2": "Chèque de banque",
                "method3": "Espèces (dans la limite légale)",
                "method4": "Financement avec nos partenaires bancaires",
                "content3": "CAYENNEFIT se réserve le droit de demander un chèque de banque et/ou une preuve d'identité et/ou un justificatif de domicile lorsque des montants importants sont en jeu."
            },
            "article10": {
                "title": "Réserve de Propriété et Transfert des Risques",
                "content1": "Les VÉHICULES commandés demeurent la propriété de CAYENNEFIT jusqu'à leur livraison et paiement intégral.",
                "content2": "Tous les risques de perte ou de dommage des VÉHICULES sont transférés au CLIENT au moment où le CLIENT prend physiquement possession de ces VÉHICULES."
            },
            "article11": {
                "title": "Livraison",
                "content1": "Après confirmation de la commande et sous réserve du paiement intégral, CAYENNEFIT s'engage à livrer le VÉHICULE selon les modalités convenues au contrat.",
                "deliveryMethods": "Modalités de livraison :",
                "delivery1": "Remise sur place dans nos locaux à Escaudain",
                "delivery2": "Livraison à domicile possible (frais supplémentaires)",
                "delivery3": "Remise de tous les documents (carte grise, certificat de cession, facture)",
                "content3": "CAYENNEFIT ne sera pas responsable des retards de livraison dus à un événement de force majeure, à la faute d'un tiers, ou à une erreur du CLIENT."
            },
            "article12": {
                "title": "Droit de Rétractation",
                "content1": "Conformément à l'article L 221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contrats de vente de véhicules automobiles.",
                "content2": "Cependant, CAYENNEFIT s'engage à reprendre tout véhicule présentant un vice caché ou une non-conformité substantielle par rapport à la description contractuelle."
            },
            "article13": {
                "title": "Responsabilités",
                "content1": "CAYENNEFIT décline toute responsabilité en cas d'utilisation illicite ou d'exploitation de tout ou partie du contenu du SITE WEB.",
                "content2": "CAYENNEFIT ne pourra être tenu responsable de tout dommage de quelque nature qu'il soit, résultant de l'utilisation du véhicule après livraison, sauf en cas de vice caché avéré.",
                "content3": "CAYENNEFIT garantit la conformité de ses VÉHICULES avec les spécifications décrites et ne saurait être responsable de toute utilisation contraire à ces spécifications.",
                "content4": "Le CLIENT assume toute responsabilité autre que celle de conformité des VÉHICULES avec les spécifications, et notamment concernant l'adéquation des VÉHICULES à ses besoins et l'utilisation des VÉHICULES."
            },
            "article14": {
                "title": "Garantie Légale",
                "content1": "Tous les VÉHICULES fournis par CAYENNEFIT sont couverts par la garantie légale relative aux vices cachés prévue par les articles 1641 et suivants du Code civil, valable pendant vingt-quatre (24) mois à compter de la découverte du vice caché.",
                "content2": "En cas d'application de la garantie des vices cachés, le CLIENT aura le choix entre la résolution de la vente ou la réduction du prix de vente conformément à l'article 1644 du Code civil.",
                "content3": "En cas de non-conformité d'un VÉHICULE vendu, le CLIENT bénéficie de la garantie légale de conformité prévue aux articles L. 211-4 et suivants du Code de la consommation."
            },
            "article15": {
                "title": "Modification et Résiliation",
                "content1": "Ces Conditions Générales prennent effet à compter de leur publication sur le SITE WEB et demeurent en vigueur jusqu'à modification partielle ou totale par CAYENNEFIT.",
                "content2": "CAYENNEFIT se réserve le droit de modifier ces conditions à tout moment. Les nouvelles conditions sont mises à disposition par un e-mail envoyé à tous les CLIENTS."
            },
            "article16": {
                "title": "Litiges",
                "content1": "Ces Conditions Générales sont régies par le droit français.",
                "content2": "En cas de litiges pouvant survenir concernant la validité, l'interprétation, l'exécution ou la non-exécution des présentes Conditions Générales, les Parties s'efforceront de parvenir à une solution amiable.",
                "content3": "Le CLIENT peut consulter la liste des médiateurs de la consommation via le lien suivant :",
                "mediationLink": "http://www.economie.gouv.fr/mediation-conso/saisir-mediateur",
                "content4": "Plateforme européenne de résolution des litiges :",
                "disputeLink": "https://webgate.ec.europa.eu/odr/main/?event=main.home.show&lng=FR",
                "content5": "Tout litige entre les Parties découlant de l'interprétation ou de l'exécution des présentes Conditions Générales sera porté devant les tribunaux compétents."
            },
            "contact": {
                "title": "Contact",
                "description": "Pour toute question relative aux présentes conditions générales de vente, vous pouvez nous contacter :",
                "email": "Email :",
                "phone": "Téléphone :",
                "address": "Adresse :",
                "hours": "Horaires :",
                "hoursValue": "Lundi au vendredi, 9h-18h",
                "lastUpdate": "Dernière mise à jour :"
            },
            "privacyPolicy": {
                "title": "Politique de Protection des Données Personnelles",
                "subtitle": "Protection de votre vie privée sur cayennefit.fr",
                "preamble": {
                    "title": "Préambule",
                    "company": "CAYENNEFIT",
                    "email": "contact@cayennefit.fr",
                    "address": "14 bis rue du Bouchain<br />59124 Escaudain - France",
                    "phone": "07 85 18 90 51",
                    "content1": "La société CAYENNEFIT accorde une grande importance à la protection de votre vie privée et de vos Données personnelles et s'engage à utiliser les Données personnelles de ses clients et prospects dans la mesure où cela est strictement nécessaire au bon fonctionnement du site www.cayennefit.fr (ci-après le \"Site\") et à la diffusion de ses services de vente de véhicules d'exception.",
                    "content2": "Les Données personnelles désignent les informations qui concernent des personnes physiques, identifiées ou identifiables, directement ou indirectement (ci-après les « Données personnelles »).",
                    "content3": "La collecte et les traitements de Données personnelles que nous réalisons s'effectuent dans le respect du cadre juridique en vigueur applicable à la protection des Données personnelles et notamment du Règlement européen 2016/679 du 27 avril 2016, (ci-après le « Règlement »).",
                    "content4": "Cette Politique a vocation à s'appliquer aux clients de CAYENNEFIT, ainsi qu'aux prospects et aux visiteurs lors de leur navigation sur le Site. CAYENNEFIT se réserve la possibilité de modifier, à tout moment, sa Politique afin notamment de faire évoluer ses services ou de se conformer à toute nouvelle réglementation applicable."
                },
                "section1": {
                    "title": "Qui traite les Données personnelles ?",
                    "content": "CAYENNEFIT intervient en qualité de responsable des traitements de vos Données personnelles mis en œuvre sur le Site. Ces traitements sont rendus nécessaires dans le cadre de nos services de vente de véhicules d'exception et la gestion de la relation avec nos clients et prospects."
                },
                "section2": {
                    "title": "Quand les Données personnelles sont-elles collectées ?",
                    "content": "Tout au long de la relation que CAYENNEFIT entretient avec ses clients et prospects, ces derniers peuvent être amenés à transmettre leurs Données personnelles :",
                    "items": [
                        "Demande de rendez-vous pour consultation ou essai de véhicule",
                        "Contact auprès du service client de CAYENNEFIT",
                        "Souscription à la newsletter",
                        "Demande d'informations sur nos véhicules",
                        "Consultation et navigation sur le Site",
                        "Utilisation des cookies lors de la navigation",
                        "Participation à des enquêtes de satisfaction",
                        "Communication via nos formulaires de contact"
                    ]
                },
                "section3": {
                    "title": "Quelles Données personnelles sont collectées ?",
                    "content": "En recourant aux services de notre Site, CAYENNEFIT peut utiliser les Données personnelles suivantes :",
                    "categories": {
                        "contact": {
                            "title": "Données de contact et civilité",
                            "items": [
                                "Civilité, nom, prénom",
                                "Numéros de téléphone",
                                "Adresses email",
                                "Adresses postales (si nécessaire)"
                            ]
                        },
                        "vehicles": {
                            "title": "Données relatives aux véhicules d'intérêt",
                            "items": [
                                "Préférences de marques et modèles",
                                "Budget souhaité",
                                "Critères de recherche de véhicules",
                                "Historique des véhicules consultés"
                            ]
                        },
                        "connection": {
                            "title": "Données de connexion",
                            "items": [
                                "Adresse IP",
                                "Données de navigation",
                                "Cookies et identifiants de session"
                            ]
                        },
                        "communication": {
                            "title": "Données de communication",
                            "items": [
                                "Gestion des rendez-vous",
                                "Planification, confirmation et suivi des rendez-vous clients",
                                "Échanges emails et messages",
                                "Préférences de communication"
                            ]
                        }
                    },
                    "important": "CAYENNEFIT ne collecte aucune donnée bancaire. Les paiements, lorsqu'ils sont nécessaires (arrhes, acomptes), sont traités par des prestataires certifiés PCI-DSS conformément aux dispositions légales en vigueur."
                },
                "section4": {
                    "title": "Pour quelles raisons les Données personnelles sont-elles collectées et traitées ?",
                    "content": "CAYENNEFIT s'engage à ne traiter et n'utiliser que les Données personnelles strictement nécessaires pour atteindre les objectifs suivants :",
                    "purposes": [
                        {
                            "objective": "Gestion des rendez-vous",
                            "description": "Planification, confirmation et suivi des rendez-vous clients",
                            "legalBasis": "Exécution contractuelle",
                            "retention": "3 ans après dernier contact"
                        },
                        {
                            "objective": "Gestion de la relation client",
                            "description": "Réponse aux demandes, suivi commercial, newsletter",
                            "legalBasis": "Intérêt légitime / Consentement",
                            "retention": "3 ans après dernier contact"
                        },
                        {
                            "objective": "Amélioration du site web",
                            "description": "Analyses statistiques, amélioration de l'expérience utilisateur",
                            "legalBasis": "Intérêt légitime",
                            "retention": "13 mois (cookies)"
                        },
                        {
                            "objective": "Respect des obligations légales",
                            "description": "Comptabilité, lutte anti-blanchiment",
                            "legalBasis": "Obligation légale",
                            "retention": "10 ans"
                        }
                    ]
                },
                "section5": {
                    "title": "Les Données personnelles sont-elles transmises à des tiers ?",
                    "content": "CAYENNEFIT peut être amenée à transmettre des Données personnelles à des tiers dans les cas suivants :",
                    "cases": [
                        {
                            "title": "Prestataires de services",
                            "description": "Hébergement web, services de maintenance, outils d'analyse (Google Analytics)"
                        },
                        {
                            "title": "Autorités compétentes",
                            "description": "Sur réquisition judiciaire ou administrative légalement motivée"
                        },
                        {
                            "title": "Partenaires commerciaux",
                            "description": "Uniquement avec votre consentement explicite et pour des services complémentaires"
                        }
                    ],
                    "commitment": "CAYENNEFIT s'engage à ne jamais vendre, louer ou céder vos données personnelles à des fins commerciales non autorisées."
                },
                "section6": {
                    "title": "Quels sont vos droits ?",
                    "content": "Conformément au Règlement européen, vous disposez des droits suivants sur vos données personnelles :",
                    "rights": [
                        {
                            "title": "Droit d'accès",
                            "description": "Obtenir confirmation que vos données sont traitées et y accéder"
                        },
                        {
                            "title": "Droit de rectification",
                            "description": "Corriger vos données inexactes ou incomplètes"
                        },
                        {
                            "title": "Droit à l'effacement",
                            "description": "Supprimer vos données dans certaines conditions"
                        },
                        {
                            "title": "Droit à la limitation",
                            "description": "Limiter le traitement de vos données"
                        },
                        {
                            "title": "Droit à la portabilité",
                            "description": "Récupérer vos données dans un format structuré"
                        },
                        {
                            "title": "Droit d'opposition",
                            "description": "Vous opposer au traitement pour motifs légitimes"
                        }
                    ],
                    "howToExercise": {
                        "title": "Comment exercer vos droits ?",
                        "content": "Pour exercer vos droits, contactez-nous par email à <strong>contact@cayennefit.fr</strong> ou par courrier postal en joignant une copie de votre pièce d'identité.",
                        "responseTime": "Nous nous engageons à vous répondre dans un délai d'un mois maximum."
                    }
                },
                "section7": {
                    "title": "Comment vos données sont-elles sécurisées ?",
                    "content": "CAYENNEFIT met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la destruction, la perte, l'altération, la divulgation ou l'accès non autorisés :",
                    "measures": [
                        {
                            "title": "Chiffrement SSL/TLS",
                            "description": "Toutes les données transitent de manière sécurisée"
                        },
                        {
                            "title": "Hébergement sécurisé",
                            "description": "Serveurs certifiés ISO 27001 en France"
                        },
                        {
                            "title": "Accès contrôlé",
                            "description": "Limitation des accès aux personnes autorisées"
                        },
                        {
                            "title": "Sauvegardes régulières",
                            "description": "Protection contre la perte de données"
                        }
                    ]
                },
                "section8": {
                    "title": "Contact et réclamations",
                    "contact": {
                        "title": "Nous contacter",
                        "email": "contact@cayennefit.fr",
                        "phone": "07 85 18 90 51",
                        "address": "14 bis rue du Bouchain<br />59124 Escaudain"
                    },
                    "authority": {
                        "title": "Autorité de contrôle",
                        "name": "CNIL (Commission Nationale de l'Informatique et des Libertés)",
                        "website": "www.cnil.fr",
                        "phone": "01 53 73 22 22"
                    }
                },
                "section9": {
                    "title": "Mise à jour de cette politique",
                    "content": "CAYENNEFIT se réserve le droit de modifier cette politique de protection des données à tout moment, notamment pour s'adapter aux évolutions légales ou à l'évolution de nos services.",
                    "lastUpdate": "Dernière mise à jour : Décembre 2024"
                },
                "backToHome": "Retour à l'accueil"
            }
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
            "excellence": "THE PORSCHE CAYENNE SPECIALIST",
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
            "fuel": "Fuel",
            "gas": "Gas",
            "hybrid": "Hybrid",
            "electricity": "Electricity",
            "diesel": "Diesel",
            "reset": "Reset",
            "resetting": "Resetting..."
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
        "appointment": {
            "button": "APPOINTMENT",
            "bookAppointment": "BOOK APPOINTMENT",
            "appointmentFor": "Book appointment for",
            "appointmentGeneral": "Book appointment",
            "meetingType": "🤝 Business appointment",
            "bookAppointmentTitle": "BOOK APPOINTMENT",
            "bookAppointmentSubtitle": "Book your slot in just a few clicks",
            "bookingSuccess": "Request sent successfully! We will contact you quickly.",
            "clientName": "Full name",
            "clientEmail": "Email",
            "serviceType": "Service type",
            "appointmentDate": "Desired date and time",
            "availableSlots": "Available slots for",
            "noSlotsAvailable": "No slots available for",
            "chooseAnotherDate": "Please choose another date. All slots are already confirmed.",
            "message": "Message (optional)",
            "messagePlaceholder": "Details about your request, specific questions...",
            "cancel": "CANCEL",
            "processing": "PROCESSING..."
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
        },
        "aboutUs": {
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
            "subtitle": "Specialist in used Porsche Cayenne vehicles. Expertise, quality and premium service for over 10 years.",
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
            "terms": "Terms & Conditions",
            "privacy": "Data Protection Policy",
            "madeWith": "Made with",
            "forPassionate": "for enthusiasts"
        },
        "adminHistory": {
            "title": "Appointment History",
            "description": "View complete history of appointments made via the website",
            "noAppointments": "No appointments found",
            "date": "Date",
            "time": "Time",
            "client": "Client",
            "phone": "Phone",
            "email": "Email",
            "vehicle": "Vehicle of Interest",
            "message": "Message",
            "actions": "Actions",
            "status": "Status",
            "pending": "Pending",
            "confirmed": "Confirmed",
            "cancelled": "Cancelled",
            "completed": "Completed",
            "viewDetails": "View Details",
            "markAsConfirmed": "Mark as Confirmed",
            "markAsCompleted": "Mark as Completed",
            "markAsCancelled": "Mark as Cancelled",
            "exportData": "Export Data",
            "filterByStatus": "Filter by Status",
            "searchClient": "Search Client",
            "totalAppointments": "Total Appointments",
            "thisMonth": "This Month",
            "lastUpdate": "Last Update"
        },
        "termsConditions": {
            "title": "Terms and Conditions of Sale",
            "subtitle": "Cayennefit - Exceptional Vehicles",
            "article1": {
                "title": "General Provisions",
                "content1": "These General Terms and Conditions of Sale apply to contractual relations between <strong>CAYENNEFIT</strong>, a sole proprietorship with its registered office at 14 bis rue du Bouchain, 59124 Escaudain, France, hereinafter referred to as \"CAYENNEFIT\" and the CLIENT, a natural person, hereinafter referred to as \"CLIENT\".",
                "content2": "The General Terms and Conditions are brought to the CLIENT'S attention before the execution of any transaction and constitute the basis thereof. CAYENNEFIT cannot waive them in advance. Making an appointment implies full and complete acceptance of these Terms and Conditions by the CLIENT.",
                "content3": "No particular condition may prevail except with formal written acceptance by CAYENNEFIT against these General Terms and Conditions.",
                "content4": "These General Terms and Conditions of Sale comply with the provisions of the Commercial Code and the Consumer Code. They conform to current commercial practices of the profession.",
                "content5": "Prices, information and characteristics appearing on brochures, technical sheets, the website or other documents are given for information only and cannot under any circumstances be considered as firm offers.",
                "content6": "Furthermore, CAYENNEFIT reserves the right, at any time and without notice, to make any modifications or improvements to its offers that it deems necessary, without the CLIENT being able to claim any prejudice."
            },
            "article2": {
                "title": "Purpose",
                "content": "The purpose of these General Terms and Conditions of Sale is to set the terms and conditions applicable to any purchase made by the CLIENT on CAYENNEFIT's website: <strong>www.cayennefit.io</strong> (hereinafter referred to as the \"WEBSITE\") or to any order placed by telephone or email."
            },
            "article3": {
                "title": "Definitions",
                "client": "<strong>CLIENT:</strong> refers to any natural person acting in their own name, making a purchase through the WEBSITE or by telephone or email.",
                "vehicles": "<strong>VEHICLES:</strong> refers to all luxury and exceptional vehicles marketed by CAYENNEFIT. Except in special cases, all vehicles offered are used in excellent condition.",
                "parties": "<strong>PARTIES:</strong> refers to the CLIENT and CAYENNEFIT, linked in a relationship by this agreement.",
                "site": "<strong>SITE:</strong> refers to the website \"www.cayennefit.io\" operated by CAYENNEFIT."
            },
            "article4": {
                "title": "Accessibility and Appointment Booking",
                "subtitle1": "Appointment booking conditions",
                "content1_1": "Appointment booking is done by filling out an online form or by telephone contact.",
                "content1_2": "The CLIENT must be of legal age and have the capacity to contract.",
                "content1_3": "CAYENNEFIT reserves the right to accept or refuse any appointment.",
                "content1_4": "The CLIENT undertakes to provide accurate and truthful data.",
                "subtitle2": "Vehicle test conditions",
                "content2_1": "Presentation of a valid driving license required.",
                "content2_2": "Proof of identity and residence required.",
                "content2_3": "Signing a liability waiver before the test.",
                "content2_4": "Strict compliance with safety instructions and traffic laws."
            },
            "article5": {
                "title": "Personal Data",
                "content1": "Within the framework of the contractual relationship governed by these General Terms and Conditions, the CLIENT expressly authorizes CAYENNEFIT to process personal data in the manner described below.",
                "content2": "CAYENNEFIT acts as data controller. Its registered office is located at 14 bis rue du Bouchain, 59124 Escaudain, France. Contact: <strong>contact@cayennefit.fr</strong> or by telephone: <strong>+33 1 XX XX XX XX</strong>",
                "content3": "The purpose of the processing to which the CLIENT consents is to enable CAYENNEFIT to fulfill its contractual obligations and to inform the CLIENT of its offers and new vehicles.",
                "content4": "The personal data collected under this agreement are as follows: surname, first name, email, postal and telephone contact details of the CLIENT.",
                "content5": "Only the manager and customer service of CAYENNEFIT have access to the collected data.",
                "content6": "The collected data is kept for the entire duration of the contractual relationship between the CLIENT and CAYENNEFIT, and for one year after the end of this relationship.",
                "content7": "The CLIENT is informed that the data collected by CAYENNEFIT is not transferred outside the European Union.",
                "content8": "The CLIENT has the right to access, rectify, erase or object regarding their personal data. They may also benefit from the right to data portability."
            },
            "article6": {
                "title": "Intellectual Property",
                "content1": "The WEBSITE is the exclusive property of CAYENNEFIT, which therefore holds all intellectual property rights relating to it. Its content cannot therefore be modified, copied, distributed, reproduced, downloaded, displayed, published, communicated or sold in any form or by any means whatsoever.",
                "content2": "CAYENNEFIT retains full and exclusive ownership of all trademarks, registered designs and copyrights attached to content provided by or accessible through the WEBSITE.",
                "content3": "It is specified that the trademarks of automotive manufacturers (Porsche, Ferrari, Lamborghini, etc.) are registered trademarks of their respective owners. CAYENNEFIT is not an official representative of these brands and does not act on their behalf."
            },
            "article7": {
                "title": "Sales Process",
                "content1": "When the CLIENT wishes to acquire a vehicle, they must first make an appointment for a visit and test drive.",
                "content2": "After agreement on the sales conditions, a sales contract is established specifying all the terms (price, payment, delivery, warranties).",
                "content3": "The sale will only be deemed final once payment is received by CAYENNEFIT.",
                "content4": "CAYENNEFIT reserves the right to refuse or cancel any sale, particularly in case of CLIENT insolvency or non-payment.",
                "content5": "The photographs and videos presented are not contractual. Only physical inspection of the vehicle is authoritative."
            },
            "article8": {
                "title": "Prices",
                "content1": "The price of VEHICLES on the WEBSITE is expressed in Euros and includes all taxes.",
                "content2": "The price associated with each VEHICLE does not include registration fees, delivery costs or any customs duties.",
                "content3": "The price indicated in the order confirmation is the final price.",
                "content4": "CAYENNEFIT reserves the right to modify the price of VEHICLES at any time, it being understood that the price appearing in the order confirmation only applies to the CLIENT."
            },
            "article9": {
                "title": "Payment Terms",
                "content1": "The price charged to the CLIENT is the price indicated in the order confirmation issued by CAYENNEFIT.",
                "paymentMethods": "Accepted payment methods:",
                "method1": "Bank transfer",
                "method2": "Bank check",
                "method3": "Cash (within legal limits)",
                "method4": "Financing with our banking partners",
                "content3": "CAYENNEFIT reserves the right to request a bank check and/or proof of identity and/or proof of residence when significant amounts are involved."
            },
            "article10": {
                "title": "Retention of Title and Transfer of Risks",
                "content1": "Ordered VEHICLES remain the property of CAYENNEFIT until their delivery and full payment.",
                "content2": "All risks of loss or damage to VEHICLES are transferred to the CLIENT when the CLIENT physically takes possession of these VEHICLES."
            },
            "article11": {
                "title": "Delivery",
                "content1": "After order confirmation and subject to full payment, CAYENNEFIT undertakes to deliver the VEHICLE according to the terms agreed in the contract.",
                "deliveryMethods": "Delivery methods:",
                "delivery1": "Collection at our premises in Escaudain",
                "delivery2": "Home delivery possible (additional charges)",
                "delivery3": "Delivery of all documents (registration card, transfer certificate, invoice)",
                "content3": "CAYENNEFIT will not be responsible for delivery delays due to force majeure, third party fault, or CLIENT error."
            },
            "article12": {
                "title": "Right of Withdrawal",
                "content1": "In accordance with article L 221-28 of the Consumer Code, the right of withdrawal does not apply to contracts for the sale of motor vehicles.",
                "content2": "However, CAYENNEFIT undertakes to take back any vehicle presenting a hidden defect or substantial non-conformity compared to the contractual description."
            },
            "article13": {
                "title": "Responsibilities",
                "content1": "CAYENNEFIT disclaims all responsibility in case of illicit use or exploitation of all or part of the WEBSITE content.",
                "content2": "CAYENNEFIT cannot be held responsible for any damage of any nature whatsoever, resulting from the use of the vehicle after delivery, except in case of proven hidden defect.",
                "content3": "CAYENNEFIT guarantees the conformity of its VEHICLES with the described specifications and cannot be responsible for any use contrary to these specifications.",
                "content4": "The CLIENT assumes all responsibility other than that of VEHICLE conformity with specifications, and in particular concerning the adequacy of VEHICLES to their needs and the use of VEHICLES."
            },
            "article14": {
                "title": "Legal Warranty",
                "content1": "All VEHICLES supplied by CAYENNEFIT are covered by the legal warranty relating to hidden defects provided for by articles 1641 and following of the Civil Code, valid for twenty-four (24) months from the discovery of the hidden defect.",
                "content2": "In case of application of the warranty for hidden defects, the CLIENT will have the choice between resolution of the sale or reduction of the sale price in accordance with article 1644 of the Civil Code.",
                "content3": "In case of non-conformity of a sold VEHICLE, the CLIENT benefits from the legal warranty of conformity provided for in articles L. 211-4 and following of the Consumer Code."
            },
            "article15": {
                "title": "Modification and Termination",
                "content1": "These General Terms and Conditions take effect from their publication on the WEBSITE and remain in force until partial or total modification by CAYENNEFIT.",
                "content2": "CAYENNEFIT reserves the right to modify these conditions at any time. New conditions are made available by email sent to all CLIENTS."
            },
            "article16": {
                "title": "Disputes",
                "content1": "These General Terms and Conditions are governed by French law.",
                "content2": "In case of disputes that may arise concerning the validity, interpretation, execution or non-execution of these General Terms and Conditions, the Parties will endeavor to reach an amicable solution.",
                "content3": "The CLIENT can consult the list of consumer mediators via the following link:",
                "mediationLink": "http://www.economie.gouv.fr/mediation-conso/saisir-mediateur",
                "content4": "European dispute resolution platform:",
                "disputeLink": "https://webgate.ec.europa.eu/odr/main/?event=main.home.show&lng=EN",
                "content5": "Any dispute between the Parties arising from the interpretation or execution of these General Terms and Conditions will be brought before the competent courts."
            },
            "contact": {
                "title": "Contact",
                "description": "For any questions regarding these general terms and conditions of sale, you can contact us:",
                "email": "Email:",
                "phone": "Phone:",
                "address": "Address:",
                "hours": "Hours:",
                "hoursValue": "Monday to Friday, 9am-6pm",
                "lastUpdate": "Last update:"
            },
            "privacyPolicy": {
                "title": "Privacy Policy",
                "subtitle": "Protecting your privacy on cayennefit.fr",
                "preamble": {
                    "title": "Preamble",
                    "company": "CAYENNEFIT",
                    "email": "contact@cayennefit.fr",
                    "address": "14 bis rue du Bouchain<br />59124 Escaudain - France",
                    "phone": "07 85 18 90 51",
                    "content1": "The company CAYENNEFIT places a high importance on protecting your privacy and personal data and is committed to using personal data of its clients and prospects to the extent strictly necessary for the proper functioning of the website www.cayennefit.fr (hereinafter referred to as the \"Site\") and the diffusion of its exceptional vehicle sales services.",
                    "content2": "Personal data refers to information about individuals, identifiable or identifiable, directly or indirectly (hereinafter referred to as \"Personal Data\").",
                    "content3": "The collection and processing of Personal Data we carry out are carried out in compliance with the legal framework applicable to personal data protection and in particular with the European Regulation 2016/679 of 27 April 2016, (hereinafter referred to as the \"Regulation\").",
                    "content4": "This Policy applies to clients of CAYENNEFIT, as well as to prospects and visitors during their navigation on the Site. CAYENNEFIT reserves the possibility to modify, at any time, its Policy in order to evolve its services or to comply with any applicable legal regulation."
                },
                "section1": {
                    "title": "Who processes Personal Data?",
                    "content": "CAYENNEFIT is responsible for processing your Personal Data for the purposes of our exceptional vehicle sales services and the management of the relationship with our clients and prospects."
                },
                "section2": {
                    "title": "When are Personal Data collected?",
                    "content": "Throughout the relationship that CAYENNEFIT maintains with its clients and prospects, they may be required to provide their Personal Data:",
                    "items": [
                        "Request for an appointment for a vehicle consultation or test drive",
                        "Contact with CAYENNEFIT's customer service",
                        "Subscription to the newsletter",
                        "Request for information about our vehicles",
                        "Consultation and navigation on the Site",
                        "Use of cookies during navigation",
                        "Participation in satisfaction surveys",
                        "Communication through our contact forms"
                    ]
                },
                "section3": {
                    "title": "What Personal Data are collected?",
                    "content": "By using our services, CAYENNEFIT may use the following Personal Data:",
                    "categories": {
                        "contact": {
                            "title": "Contact and civility data",
                            "items": [
                                "Civility, first name, last name",
                                "Telephone numbers",
                                "Email addresses",
                                "Postal addresses (if necessary)"
                            ]
                        },
                        "vehicles": {
                            "title": "Data relating to vehicles of interest",
                            "items": [
                                "Preferences for brands and models",
                                "Desired budget",
                                "Vehicle search criteria",
                                "Consulted vehicle history"
                            ]
                        },
                        "connection": {
                            "title": "Connection data",
                            "items": [
                                "IP address",
                                "Navigation data",
                                "Session cookies and identifiers"
                            ]
                        },
                        "communication": {
                            "title": "Communication data",
                            "items": [
                                "Appointment management",
                                "Planning, confirmation and follow-up of client appointments",
                                "Email exchanges and messages",
                                "Communication preferences"
                            ]
                        }
                    },
                    "important": "CAYENNEFIT does not collect any banking data. Payments, when necessary (advance payments), are processed by certified PCI-DSS compliant service providers."
                },
                "section4": {
                    "title": "For what purposes are Personal Data collected and processed?",
                    "content": "CAYENNEFIT is committed to processing only the Personal Data strictly necessary to achieve the following objectives:",
                    "purposes": [
                        {
                            "objective": "Managing appointments",
                            "description": "Planning, confirmation and follow-up of client appointments",
                            "legalBasis": "Execution of contract",
                            "retention": "3 years after last contact"
                        },
                        {
                            "objective": "Managing client relationships",
                            "description": "Responding to requests, commercial follow-up, newsletter",
                            "legalBasis": "Legitimate interest / Consent",
                            "retention": "3 years after last contact"
                        },
                        {
                            "objective": "Improving the website",
                            "description": "Statistical analyses, improving user experience",
                            "legalBasis": "Legitimate interest",
                            "retention": "13 months (cookies)"
                        },
                        {
                            "objective": "Fulfilling legal obligations",
                            "description": "Accounting, anti-money laundering",
                            "legalBasis": "Legal obligation",
                            "retention": "10 years"
                        }
                    ]
                },
                "section5": {
                    "title": "Are Personal Data disclosed to third parties?",
                    "content": "CAYENNEFIT may disclose Personal Data to third parties in the following cases:",
                    "cases": [
                        {
                            "title": "Service providers",
                            "description": "Web hosting, maintenance services, analysis tools (Google Analytics)"
                        },
                        {
                            "title": "Competent authorities",
                            "description": "On request by a judicial or administrative authority"
                        },
                        {
                            "title": "Commercial partners",
                            "description": "Only with your explicit consent and for complementary services"
                        }
                    ],
                    "commitment": "CAYENNEFIT is committed to never selling, renting or disclosing your personal data for unauthorized commercial purposes."
                },
                "section6": {
                    "title": "What are your rights?",
                    "content": "In accordance with the European Regulation, you have the following rights regarding your personal data:",
                    "rights": [
                        {
                            "title": "Right to access",
                            "description": "To obtain confirmation that your data is being processed and to access it"
                        },
                        {
                            "title": "Right to rectification",
                            "description": "To correct any inaccurate or incomplete data"
                        },
                        {
                            "title": "Right to erasure",
                            "description": "To delete your data under certain conditions"
                        },
                        {
                            "title": "Right to limitation",
                            "description": "To limit the processing of your data"
                        },
                        {
                            "title": "Right to portability",
                            "description": "To receive your data in a structured format"
                        },
                        {
                            "title": "Right to object",
                            "description": "To object to processing for legitimate reasons"
                        }
                    ],
                    "howToExercise": {
                        "title": "How to exercise your rights?",
                        "content": "To exercise your rights, please contact us by email at <strong>contact@cayennefit.fr</strong> or by post, attaching a copy of your identity document.",
                        "responseTime": "We commit to responding to you within one month."
                    }
                },
                "section7": {
                    "title": "How are your data protected?",
                    "content": "CAYENNEFIT implements appropriate technical and organizational measures to protect your personal data from destruction, loss, alteration, disclosure or unauthorized access:",
                    "measures": [
                        {
                            "title": "SSL/TLS encryption",
                            "description": "All data is transmitted securely"
                        },
                        {
                            "title": "Secure hosting",
                            "description": "Certified servers ISO 27001 in France"
                        },
                        {
                            "title": "Controlled access",
                            "description": "Limitation of access to authorized persons"
                        },
                        {
                            "title": "Regular backups",
                            "description": "Protection against data loss"
                        }
                    ]
                },
                "section8": {
                    "title": "Contact and complaints",
                    "contact": {
                        "title": "Contact us",
                        "email": "contact@cayennefit.fr",
                        "phone": "07 85 18 90 51",
                        "address": "14 bis rue du Bouchain<br />59124 Escaudain"
                    },
                    "authority": {
                        "title": "Data protection authority",
                        "name": "CNIL (Commission Nationale de l'Informatique et des Libertés)",
                        "website": "www.cnil.fr",
                        "phone": "01 53 73 22 22"
                    }
                },
                "section9": {
                    "title": "Updating this policy",
                    "content": "CAYENNEFIT reserves the right to modify this data protection policy at any time, in particular to adapt to legal changes or to the evolution of our services.",
                    "lastUpdate": "Last update: December 2024"
                },
                "backToHome": "Return to home"
            }
        }
    }
};

// Création du contexte avec valeur par défaut
const LanguageContext = createContext<LanguageContextType>({
    language: 'fr',
    setLanguage: () => {},
    t: (key: string) => key,
    translations
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
        t,
        translations
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