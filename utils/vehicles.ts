import { VehicleProps, FilterProps } from "@types";

/**
 * Récupère tous les véhicules avec filtres optionnels
 * @param filters - Filtres à appliquer à la recherche
 * @returns Promise<VehicleProps[]> - Liste des véhicules filtrés
 */
export async function fetchVehicles(filters?: FilterProps): Promise<VehicleProps[]> {
    try {
        const searchParams = new URLSearchParams();
        
        if (filters) {
            if (filters.manufacturer) searchParams.append('manufacturer', filters.manufacturer);
            if (filters.year) searchParams.append('year', filters.year.toString());
            if (filters.fuel) searchParams.append('fuel', filters.fuel);
            if (filters.model) searchParams.append('model', filters.model);
            if (filters.minPrice) searchParams.append('minPrice', filters.minPrice.toString());
            if (filters.maxPrice) searchParams.append('maxPrice', filters.maxPrice.toString());
        }

        const url = `/api/vehicles${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des véhicules');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur fetchVehicles:', error);
        return [];
    }
}

/**
 * Récupère un véhicule par son ID
 * @param id - ID du véhicule
 * @returns Promise<VehicleProps | null> - Véhicule trouvé ou null
 */
export async function fetchVehicleById(id: string): Promise<VehicleProps | null> {
    try {
        const response = await fetch(`/api/vehicles/${id}`);
        
        if (!response.ok) {
            return null;
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur fetchVehicleById:', error);
        return null;
    }
}

/**
 * Ajoute un nouveau véhicule à la base de données
 * @param vehicleData - Données du nouveau véhicule
 * @returns Promise<VehicleProps> - Véhicule créé
 */
export async function createVehicle(vehicleData: Omit<VehicleProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<VehicleProps> {
    try {
        const response = await fetch('/api/vehicles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicleData),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la création du véhicule');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur createVehicle:', error);
        throw error;
    }
}

/**
 * Met à jour un véhicule existant
 * @param id - ID du véhicule à mettre à jour  
 * @param updates - Données à mettre à jour
 * @returns Promise<VehicleProps | null> - Véhicule mis à jour ou null
 */
export async function updateVehicle(id: string, updates: Partial<VehicleProps>): Promise<VehicleProps | null> {
    try {
        const response = await fetch(`/api/vehicles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du véhicule');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur updateVehicle:', error);
        return null;
    }
}

/**
 * Supprime un véhicule de la base de données
 * @param id - ID du véhicule à supprimer
 * @returns Promise<boolean> - true si supprimé avec succès
 */
export async function deleteVehicle(id: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/vehicles/${id}`, {
            method: 'DELETE',
        });

        return response.ok;
    } catch (error) {
        console.error('Erreur deleteVehicle:', error);
        return false;
    }
}

/**
 * Marque un véhicule comme vendu en conservant l'historique
 * @param id - ID du véhicule à marquer comme vendu
 * @returns Promise<VehicleProps | null> - Véhicule mis à jour ou null
 */
export async function markVehicleAsSold(id: string): Promise<VehicleProps | null> {
    return updateVehicle(id, { 
        isAvailable: false,
        updatedAt: new Date().toISOString()
    });
}

/**
 * Marque un véhicule comme disponible 
 * @param id - ID du véhicule à rendre disponible
 * @returns Promise<VehicleProps | null> - Véhicule mis à jour ou null
 */
export async function markVehicleAsAvailable(id: string): Promise<VehicleProps | null> {
    return updateVehicle(id, { 
        isAvailable: true,
        updatedAt: new Date().toISOString()
    });
}

/**
 * Récupère les statistiques pour l'admin panel
 * @returns Promise<object> - Statistiques des véhicules
 */
export async function getVehicleStats() {
    try {
        const response = await fetch('/api/vehicles/stats');
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des statistiques');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur getVehicleStats:', error);
        return {
            totalVehicles: 0,
            availableVehicles: 0,
            averagePrice: 0,
            vehiclesByBrand: {}
        };
    }
} 