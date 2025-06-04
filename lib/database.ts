import { kv } from '@vercel/kv';
import { VehicleProps } from '@types';

/**
 * Service de base de données CAYENNEFIT utilisant Vercel KV
 * Remplace le stockage JSON local pour les déploiements
 */

// Clé principale pour stocker les véhicules
const VEHICLES_KEY = 'cayennefit:vehicles';
const COUNTER_KEY = 'cayennefit:counter';

/**
 * Génère un ID unique pour un nouveau véhicule
 */
async function generateVehicleId(): Promise<string> {
    const counter = await kv.incr(COUNTER_KEY);
    return `vehicle_${counter}`;
}

/**
 * Récupère tous les véhicules
 */
export async function getAllVehicles(): Promise<VehicleProps[]> {
    try {
        const vehiclesData = await kv.get<Record<string, VehicleProps>>(VEHICLES_KEY);
        if (!vehiclesData) {
            return [];
        }
        return Object.values(vehiclesData);
    } catch (error) {
        console.error('Erreur lors de la récupération des véhicules:', error);
        return [];
    }
}

/**
 * Récupère un véhicule par ID
 */
export async function getVehicleById(id: string): Promise<VehicleProps | null> {
    try {
        const vehiclesData = await kv.get<Record<string, VehicleProps>>(VEHICLES_KEY);
        if (!vehiclesData || !vehiclesData[id]) {
            return null;
        }
        return vehiclesData[id];
    } catch (error) {
        console.error('Erreur lors de la récupération du véhicule:', error);
        return null;
    }
}

/**
 * Crée un nouveau véhicule
 */
export async function createVehicle(vehicleData: Omit<VehicleProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<VehicleProps> {
    try {
        const id = await generateVehicleId();
        const now = new Date().toISOString();
        
        const newVehicle: VehicleProps = {
            ...vehicleData,
            id,
            createdAt: now,
            updatedAt: now
        };

        // Récupérer les véhicules existants
        const existingVehicles = await kv.get<Record<string, VehicleProps>>(VEHICLES_KEY) || {};
        
        // Ajouter le nouveau véhicule
        existingVehicles[id] = newVehicle;
        
        // Sauvegarder
        await kv.set(VEHICLES_KEY, existingVehicles);
        
        return newVehicle;
    } catch (error) {
        console.error('Erreur lors de la création du véhicule:', error);
        throw new Error('Impossible de créer le véhicule');
    }
}

/**
 * Met à jour un véhicule existant
 */
export async function updateVehicle(id: string, updates: Partial<VehicleProps>): Promise<VehicleProps> {
    try {
        // Récupérer les véhicules existants
        const existingVehicles = await kv.get<Record<string, VehicleProps>>(VEHICLES_KEY) || {};
        
        if (!existingVehicles[id]) {
            throw new Error('Véhicule non trouvé');
        }

        // Mettre à jour le véhicule
        const updatedVehicle = {
            ...existingVehicles[id],
            ...updates,
            id, // Préserver l'ID
            updatedAt: new Date().toISOString()
        };

        existingVehicles[id] = updatedVehicle;
        
        // Sauvegarder
        await kv.set(VEHICLES_KEY, existingVehicles);
        
        return updatedVehicle;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du véhicule:', error);
        throw new Error('Impossible de mettre à jour le véhicule');
    }
}

/**
 * Supprime un véhicule
 */
export async function deleteVehicle(id: string): Promise<boolean> {
    try {
        // Récupérer les véhicules existants
        const existingVehicles = await kv.get<Record<string, VehicleProps>>(VEHICLES_KEY) || {};
        
        if (!existingVehicles[id]) {
            return false;
        }

        // Supprimer le véhicule
        delete existingVehicles[id];
        
        // Sauvegarder
        await kv.set(VEHICLES_KEY, existingVehicles);
        
        return true;
    } catch (error) {
        console.error('Erreur lors de la suppression du véhicule:', error);
        throw new Error('Impossible de supprimer le véhicule');
    }
}

/**
 * Calcule les statistiques des véhicules
 */
export async function getVehicleStats() {
    try {
        const vehicles = await getAllVehicles();
        
        const totalVehicles = vehicles.length;
        const availableVehicles = vehicles.filter(v => v.isAvailable).length;
        const soldVehicles = totalVehicles - availableVehicles;
        
        const totalValue = vehicles.reduce((sum, v) => sum + v.price, 0);
        const averagePrice = totalVehicles > 0 ? Math.round(totalValue / totalVehicles) : 0;
        
        return {
            totalVehicles,
            availableVehicles,
            soldVehicles,
            averagePrice
        };
    } catch (error) {
        console.error('Erreur lors du calcul des statistiques:', error);
        return {
            totalVehicles: 0,
            availableVehicles: 0,
            soldVehicles: 0,
            averagePrice: 0
        };
    }
}

/**
 * Initialise la base de données avec des données de démonstration
 * (À utiliser seulement une fois lors du premier déploiement)
 */
export async function initializeDatabase() {
    try {
        const existingVehicles = await kv.get<Record<string, VehicleProps>>(VEHICLES_KEY);
        
        // Si des données existent déjà, ne pas les écraser
        if (existingVehicles && Object.keys(existingVehicles).length > 0) {
            console.log('Base de données déjà initialisée');
            return;
        }

        console.log('Initialisation de la base de données...');
        
        // Données de démonstration
        const demoVehicles = [
            {
                make: "Porsche",
                model: "Cayenne",
                year: 2023,
                price: 98000,
                city_mpg: 8.5,
                highway_mpg: 6.2,
                fuel_type: "Essence",
                transmission: "Automatique",
                drive: "AWD",
                color: "Noir",
                mileage: 1200,
                description: "Porsche Cayenne neuf, état exceptionnel",
                isAvailable: true,
                images: ["/pattern.png"]
            }
        ];

        for (const vehicleData of demoVehicles) {
            await createVehicle(vehicleData);
        }
        
        console.log('Base de données initialisée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
} 