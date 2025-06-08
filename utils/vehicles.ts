import { VehicleProps, FilterProps } from "@types";

/**
 * Récupère tous les véhicules avec filtres optionnels
 * @param filters - Filtres à appliquer à la recherche
 * @returns Promise<VehicleProps[]> - Liste des véhicules filtrés
 */
export async function fetchVehicles(filters?: FilterProps): Promise<VehicleProps[]> {
    try {
        console.log('Utils: Récupération des véhicules avec filtres:', filters)
        
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
        console.log('Utils: URL de récupération:', url)
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Utils: Erreur HTTP ${response.status}:`, errorText)
            throw new Error(`Erreur ${response.status} lors de la récupération des véhicules`)
        }
        
        const vehicles = await response.json()
        console.log(`Utils: ${vehicles.length} véhicules récupérés`)
        return vehicles
    } catch (error) {
        console.error('Utils: Erreur détaillée fetchVehicles:', error);
        
        if (error instanceof Error) {
            console.error('Utils: Message d\'erreur:', error.message)
        }
        
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
        console.log(`Utils: Récupération du véhicule ${id}`)
        
        // Validation de l'ID
        if (!id || typeof id !== 'string') {
            console.error('Utils: ID de véhicule invalide')
            return null
        }
        
        const response = await fetch(`/api/vehicles/${id}`);
        
        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Utils: Erreur HTTP ${response.status} pour véhicule ${id}:`, errorText)
            return null;
        }
        
        const vehicle = await response.json()
        console.log(`Utils: Véhicule ${id} récupéré avec succès`)
        return vehicle
    } catch (error) {
        console.error(`Utils: Erreur détaillée fetchVehicleById ${id}:`, error);
        
        if (error instanceof Error) {
            console.error('Utils: Message d\'erreur:', error.message)
        }
        
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
        console.log('Utils: Création d\'un nouveau véhicule:', vehicleData)
        
        // Validation des données de base
        if (!vehicleData || typeof vehicleData !== 'object') {
            throw new Error('Données de véhicule invalides')
        }
        
        if (!vehicleData.make || !vehicleData.model || !vehicleData.year || !vehicleData.price) {
            throw new Error('Champs obligatoires manquants (marque, modèle, année, prix)')
        }
        
        const response = await fetch('/api/vehicles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicleData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }))
            console.error(`Utils: Erreur HTTP ${response.status}:`, errorData)
            throw new Error(errorData.error || `Erreur ${response.status} lors de la création`)
        }

        const newVehicle = await response.json()
        console.log('Utils: Véhicule créé avec succès:', newVehicle.id)
        return newVehicle
    } catch (error) {
        console.error('Utils: Erreur détaillée createVehicle:', error);
        
        if (error instanceof Error) {
            console.error('Utils: Message d\'erreur:', error.message)
        }
        
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
        console.log(`Utils: Mise à jour du véhicule ${id}:`, updates)
        
        // Validation des paramètres
        if (!id || typeof id !== 'string') {
            console.error('Utils: ID de véhicule invalide pour mise à jour')
            return null
        }
        
        if (!updates || Object.keys(updates).length === 0) {
            console.error('Utils: Données de mise à jour vides')
            return null
        }
        
        const response = await fetch(`/api/vehicles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }))
            console.error(`Utils: Erreur HTTP ${response.status} pour mise à jour ${id}:`, errorData)
            
            // Ne pas retourner null pour les erreurs client, propager l'erreur
            if (response.status >= 400 && response.status < 500) {
                throw new Error(errorData.error || `Erreur ${response.status}`)
            }
            
            return null
        }

        const updatedVehicle = await response.json()
        console.log(`Utils: Véhicule ${id} mis à jour avec succès`)
        return updatedVehicle
    } catch (error) {
        console.error(`Utils: Erreur détaillée updateVehicle ${id}:`, error);
        
        if (error instanceof Error) {
            console.error('Utils: Message d\'erreur:', error.message)
            
            // Propager les erreurs de validation
            if (error.message.includes('invalide') || error.message.includes('non trouvé')) {
                throw error
            }
        }
        
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
        console.log(`Utils: Suppression du véhicule ${id}`)
        
        // Validation de l'ID
        if (!id || typeof id !== 'string') {
            console.error('Utils: ID de véhicule invalide pour suppression')
            throw new Error('ID de véhicule invalide')
        }
        
        const response = await fetch(`/api/vehicles/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }))
            console.error(`Utils: Erreur HTTP ${response.status} pour suppression ${id}:`, errorData)
            
            // Propager les erreurs de validation
            if (response.status >= 400 && response.status < 500) {
                throw new Error(errorData.error || `Erreur ${response.status}`)
            }
            
            return false
        }

        console.log(`Utils: Véhicule ${id} supprimé avec succès`)
        return true
    } catch (error) {
        console.error(`Utils: Erreur détaillée deleteVehicle ${id}:`, error);
        
        if (error instanceof Error) {
            console.error('Utils: Message d\'erreur:', error.message)
            
            // Propager les erreurs importantes
            if (error.message.includes('invalide') || error.message.includes('non trouvé') || error.message.includes('référencé')) {
                throw error
            }
        }
        
        return false;
    }
}

/**
 * Marque un véhicule comme vendu en conservant l'historique
 * @param id - ID du véhicule à marquer comme vendu
 * @returns Promise<VehicleProps | null> - Véhicule mis à jour ou null
 */
export async function markVehicleAsSold(id: string): Promise<VehicleProps | null> {
    try {
        console.log(`Utils: Marquage du véhicule ${id} comme vendu`)
        
        if (!id || typeof id !== 'string') {
            throw new Error('ID de véhicule invalide pour vente')
        }
        
        const result = await updateVehicle(id, { 
        isAvailable: false,
        updatedAt: new Date().toISOString()
    });
        
        if (result) {
            console.log(`Utils: Véhicule ${id} marqué comme vendu avec succès`)
        }
        
        return result
    } catch (error) {
        console.error(`Utils: Erreur lors du marquage comme vendu ${id}:`, error)
        throw error
    }
}

/**
 * Marque un véhicule comme disponible 
 * @param id - ID du véhicule à rendre disponible
 * @returns Promise<VehicleProps | null> - Véhicule mis à jour ou null
 */
export async function markVehicleAsAvailable(id: string): Promise<VehicleProps | null> {
    try {
        console.log(`Utils: Remise en vente du véhicule ${id}`)
        
        if (!id || typeof id !== 'string') {
            throw new Error('ID de véhicule invalide pour remise en vente')
        }
        
        const result = await updateVehicle(id, { 
        isAvailable: true,
        updatedAt: new Date().toISOString()
    });
        
        if (result) {
            console.log(`Utils: Véhicule ${id} remis en vente avec succès`)
        }
        
        return result
    } catch (error) {
        console.error(`Utils: Erreur lors de la remise en vente ${id}:`, error)
        throw error
    }
}

/**
 * Récupère les statistiques pour l'admin panel
 * @returns Promise<object> - Statistiques des véhicules
 */
export async function getVehicleStats() {
    try {
        console.log('Utils: Récupération des statistiques')
        
        const response = await fetch('/api/vehicles/stats');
        
        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Utils: Erreur HTTP ${response.status} pour statistiques:`, errorText)
            throw new Error(`Erreur ${response.status} lors de la récupération des statistiques`)
        }
        
        const stats = await response.json()
        console.log('Utils: Statistiques récupérées:', stats)
        return stats
    } catch (error) {
        console.error('Utils: Erreur détaillée getVehicleStats:', error);
        
        if (error instanceof Error) {
            console.error('Utils: Message d\'erreur:', error.message)
        }
        
        const fallbackStats = {
            totalVehicles: 0,
            availableVehicles: 0,
            soldVehicles: 0,
            averagePrice: 0,
            totalValue: 0
        }
        
        console.log('Utils: Retour des statistiques par défaut')
        return fallbackStats
    }
} 