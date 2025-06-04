import { PrismaClient } from '@prisma/client'
import { VehicleProps } from '@types'

/**
 * Service de base de données CAYENNEFIT sans cache
 * Données toujours fraîches - pas de cache pour éviter les problèmes de synchronisation
 */

// Type pour l'instance Prisma standard
type ExtendedPrismaClient = PrismaClient

// Fonction pour créer l'instance Prisma standard (sans Accelerate)
function createPrismaClient() {
  return new PrismaClient()
}

// Instance Prisma singleton avec Accelerate
const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedPrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/**
 * Convertit un véhicule Prisma vers le format VehicleProps
 */
function convertPrismaVehicle(vehicle: any): VehicleProps {
  return {
    id: vehicle.id,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    city_mpg: vehicle.cityMpg,
    highway_mpg: vehicle.highwayMpg,
    fuel_type: vehicle.fuelType,
    transmission: vehicle.transmission,
    drive: vehicle.drive,
    color: vehicle.color,
    mileage: vehicle.mileage,
    description: vehicle.description || '',
    images: vehicle.images,
    isAvailable: vehicle.isAvailable,
    createdAt: vehicle.createdAt.toISOString(),
    updatedAt: vehicle.updatedAt.toISOString(),
    soldAt: vehicle.soldAt?.toISOString()
  }
}

/**
 * Convertit VehicleProps vers le format Prisma
 */
function convertToCreateData(vehicleData: Omit<VehicleProps, 'id' | 'createdAt' | 'updatedAt'>): any {
  return {
    make: vehicleData.make,
    model: vehicleData.model,
    year: vehicleData.year,
    price: vehicleData.price,
    cityMpg: vehicleData.city_mpg,
    highwayMpg: vehicleData.highway_mpg,
    fuelType: vehicleData.fuel_type,
    transmission: vehicleData.transmission,
    drive: vehicleData.drive,
    color: vehicleData.color,
    mileage: vehicleData.mileage || 0,
    description: vehicleData.description || '',
    images: vehicleData.images || [],
    isAvailable: vehicleData.isAvailable ?? true
  }
}

/**
 * Récupère tous les véhicules (données fraîches)
 */
export async function getAllVehicles(): Promise<VehicleProps[]> {
  try {
    console.log('Récupération de tous les véhicules')
    console.log('Instance Prisma:', typeof prisma)
    console.log('DATABASE_URL présente:', !!process.env.DATABASE_URL)
    
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`${vehicles.length} véhicules récupérés de la base`)
    console.log('Premiers véhicules (max 2):', vehicles.slice(0, 2))
    
    const converted = vehicles.map(convertPrismaVehicle)
    console.log(`${converted.length} véhicules convertis`)
    
    return converted
  } catch (error) {
    console.error('Erreur détaillée lors de la récupération des véhicules:', error)
    
    if (error instanceof Error) {
      console.error('Message:', error.message)
      console.error('Stack:', error.stack)
      
      if (error.message.includes('User was denied access')) {
        console.error('Erreur d\'accès à la base de données pour getAllVehicles')
      }
    }
    
    return []
  }
}

/**
 * Récupère un véhicule par ID (données fraîches)
 */
export async function getVehicleById(id: string): Promise<VehicleProps | null> {
  try {
    console.log(`Récupération du véhicule ${id}`)
    
    // Validation de l'ID
    if (!id || typeof id !== 'string') {
      console.error('ID de véhicule invalide pour récupération')
      return null
    }
    
    const vehicle = await prisma.vehicle.findUnique({
      where: { id }
    })
    
    if (vehicle) {
      console.log(`Véhicule ${id} trouvé`)
      return convertPrismaVehicle(vehicle)
    } else {
      console.log(`Véhicule ${id} non trouvé`)
      return null
    }
  } catch (error) {
    console.error(`Erreur détaillée lors de la récupération du véhicule ${id}:`, error)
    
    if (error instanceof Error) {
      console.error('Message:', error.message)
      
      if (error.message.includes('User was denied access')) {
        console.error('Erreur d\'accès à la base de données pour getVehicleById')
      }
    }
    
    return null
  }
}

/**
 * Crée un nouveau véhicule
 */
export async function createVehicle(vehicleData: Omit<VehicleProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<VehicleProps> {
  try {
    console.log('Données avant conversion:', vehicleData)
    const createData = convertToCreateData(vehicleData)
    console.log('Données après conversion pour Prisma:', createData)
    
    const newVehicle = await prisma.vehicle.create({
      data: createData
    })
    
    console.log('Véhicule créé avec succès:', newVehicle.id)
    return convertPrismaVehicle(newVehicle)
  } catch (error) {
    console.error('Erreur détaillée lors de la création du véhicule:', error)
    
    // Logs spécifiques selon le type d'erreur
    if (error instanceof Error) {
      console.error('Message:', error.message)
      console.error('Stack:', error.stack)
      
      // Erreurs spécifiques Prisma
      if (error.message.includes('User was denied access')) {
        throw new Error('Erreur d\'accès à la base de données')
      }
      if (error.message.includes('Unique constraint')) {
        throw new Error('Un véhicule avec ces caractéristiques existe déjà')
      }
      if (error.message.includes('Foreign key constraint')) {
        throw new Error('Référence invalide dans les données')
      }
    }
    
    throw new Error(`Impossible de créer le véhicule: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
  }
}

/**
 * Met à jour un véhicule existant
 */
export async function updateVehicle(id: string, updates: Partial<VehicleProps>): Promise<VehicleProps> {
  try {
    console.log(`🔧 Mise à jour du véhicule ${id}`)
    console.log('📝 Données de mise à jour reçues:', JSON.stringify(updates, null, 2))
    
    // Validation de l'ID
    if (!id || typeof id !== 'string') {
      throw new Error('ID de véhicule invalide')
    }

    // Vérifier si le véhicule existe
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id }
    })
    
    if (!existingVehicle) {
      throw new Error('Véhicule non trouvé')
    }

    console.log('📄 Véhicule existant avant mise à jour:', {
      id: existingVehicle.id,
      make: existingVehicle.make,
      model: existingVehicle.model,
      isAvailable: existingVehicle.isAvailable,
      soldAt: existingVehicle.soldAt
    })

    // Conversion des champs pour Prisma avec validation
    const updateData: any = {}
    
    if (updates.make) updateData.make = updates.make
    if (updates.model) updateData.model = updates.model
    if (updates.year) {
      if (typeof updates.year !== 'number' || updates.year < 1900 || updates.year > new Date().getFullYear() + 1) {
        throw new Error('Année invalide pour la mise à jour')
      }
      updateData.year = updates.year
    }
    if (updates.price) {
      if (typeof updates.price !== 'number' || updates.price <= 0) {
        throw new Error('Prix invalide pour la mise à jour')
      }
      updateData.price = updates.price
    }
    if (updates.city_mpg) updateData.cityMpg = updates.city_mpg
    if (updates.highway_mpg) updateData.highwayMpg = updates.highway_mpg
    if (updates.fuel_type) updateData.fuelType = updates.fuel_type
    if (updates.transmission) updateData.transmission = updates.transmission
    if (updates.drive) updateData.drive = updates.drive
    if (updates.color) updateData.color = updates.color
    if (updates.mileage !== undefined) updateData.mileage = updates.mileage
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.images) updateData.images = updates.images
    if (updates.isAvailable !== undefined) {
      updateData.isAvailable = updates.isAvailable
      // Marquer comme vendu si plus disponible
      if (!updates.isAvailable) {
        updateData.soldAt = new Date()
        console.log(`🎯 Véhicule ${id} marqué comme vendu avec soldAt:`, updateData.soldAt)
      } else {
        // Remettre en vente - supprimer la date de vente
        updateData.soldAt = null
        console.log(`✅ Véhicule ${id} remis en vente`)
      }
    }

    console.log('💾 Données finales pour Prisma:', JSON.stringify(updateData, null, 2))

    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: updateData
    })
    
    console.log('✅ Véhicule mis à jour avec succès en base:')
    console.log('📄 Véhicule après mise à jour:', {
      id: updatedVehicle.id,
      make: updatedVehicle.make,
      model: updatedVehicle.model,
      isAvailable: updatedVehicle.isAvailable,
      soldAt: updatedVehicle.soldAt,
      updatedAt: updatedVehicle.updatedAt
    })
    
    return convertPrismaVehicle(updatedVehicle)
  } catch (error) {
    console.error(`❌ Erreur détaillée lors de la mise à jour du véhicule ${id}:`, error)
    
    if (error instanceof Error) {
      console.error('📝 Message d\'erreur:', error.message)
      
      // Erreurs spécifiques Prisma
      if (error.message.includes('Record to update not found')) {
        throw new Error('Véhicule non trouvé pour la mise à jour')
      }
      if (error.message.includes('User was denied access')) {
        throw new Error('Erreur d\'accès à la base de données')
      }
      if (error.message.includes('Unique constraint')) {
        throw new Error('Conflit lors de la mise à jour')
      }
    }
    
    throw new Error(`Impossible de mettre à jour le véhicule: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
  }
}

/**
 * Supprime un véhicule
 */
export async function deleteVehicle(id: string): Promise<boolean> {
  try {
    console.log(`Tentative de suppression du véhicule ${id}`)
    
    // Validation de l'ID
    if (!id || typeof id !== 'string') {
      console.error('ID de véhicule invalide pour suppression')
      throw new Error('ID de véhicule invalide')
    }

    // Vérifier si le véhicule existe avant suppression
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id }
    })
    
    if (!existingVehicle) {
      console.error(`Véhicule ${id} non trouvé pour suppression`)
      throw new Error('Véhicule non trouvé')
    }

    // Suppression effective
    await prisma.vehicle.delete({
      where: { id }
    })
    
    console.log(`Véhicule ${id} supprimé avec succès`)
    return true
  } catch (error) {
    console.error(`Erreur détaillée lors de la suppression du véhicule ${id}:`, error)
    
    if (error instanceof Error) {
      console.error('Message:', error.message)
      
      // Erreurs spécifiques Prisma
      if (error.message.includes('Record to delete does not exist')) {
        console.error('Véhicule déjà supprimé ou inexistant')
        throw new Error('Véhicule non trouvé')
      }
      if (error.message.includes('User was denied access')) {
        throw new Error('Erreur d\'accès à la base de données')
      }
      if (error.message.includes('Foreign key constraint')) {
        throw new Error('Impossible de supprimer - véhicule référencé ailleurs')
      }
      
      // Propager l'erreur si elle vient de nos validations
      if (error.message.includes('ID de véhicule invalide') || error.message.includes('Véhicule non trouvé')) {
        throw error
      }
    }
    
    throw new Error(`Impossible de supprimer le véhicule: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
  }
}

/**
 * Calcule les statistiques des véhicules (données fraîches)
 */
export async function getVehicleStats() {
  try {
    console.log('Calcul des statistiques des véhicules')
    
    const [totalVehicles, availableVehicles, soldVehicles, priceStats] = await Promise.all([
      prisma.vehicle.count(),
      prisma.vehicle.count({ 
        where: { isAvailable: true }
      }),
      prisma.vehicle.count({ 
        where: { isAvailable: false }
      }),
      prisma.vehicle.aggregate({
        _avg: { price: true },
        _sum: { price: true }
      })
    ])
    
    const stats = {
      totalVehicles,
      availableVehicles,
      soldVehicles,
      averagePrice: Math.round((priceStats._avg as any)?.price || 0),
      totalValue: (priceStats._sum as any)?.price || 0
    }
    
    console.log('Statistiques calculées:', stats)
    return stats
  } catch (error) {
    console.error('Erreur détaillée lors du calcul des statistiques:', error)
    
    if (error instanceof Error) {
      console.error('Message:', error.message)
      
      if (error.message.includes('User was denied access')) {
        console.error('Erreur d\'accès à la base de données pour getVehicleStats')
      }
    }
    
    const fallbackStats = {
      totalVehicles: 0,
      availableVehicles: 0,
      soldVehicles: 0,
      averagePrice: 0,
      totalValue: 0
    }
    
    console.log('Retour des statistiques par défaut:', fallbackStats)
    return fallbackStats
  }
}

/**
 * Initialise la base de données
 */
export async function initializeDatabase() {
  try {
    // Vérifier si des véhicules existent déjà
    const existingCount = await prisma.vehicle.count()
    
    if (existingCount > 0) {
      console.log('Base de données déjà initialisée')
      return
    }

    console.log('Base de données Prisma prête - aucune donnée de démonstration')
    
    console.log('Base de données Prisma initialisée avec succès !')
  } catch (error) {
    console.error('Erreur lors de l\'initialisation Prisma:', error)
  }
}

/**
 * Ferme la connexion Prisma (utile pour les tests)
 */
export async function disconnectDatabase() {
  await prisma.$disconnect()
} 