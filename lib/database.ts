import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { VehicleProps } from '@types'

/**
 * Service de base de données CAYENNEFIT avec Prisma Accelerate
 * Cache ultra-rapide pour performances optimales
 */

// Type pour l'instance Prisma étendue avec Accelerate
type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>

// Fonction pour créer l'instance Prisma avec Accelerate
function createPrismaClient() {
  return new PrismaClient().$extends(withAccelerate())
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
 * Récupère tous les véhicules avec cache Accelerate (5min)
 */
export async function getAllVehicles(): Promise<VehicleProps[]> {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
      cacheStrategy: { ttl: 300 } // Cache 5 minutes
    })
    return vehicles.map(convertPrismaVehicle)
  } catch (error) {
    console.error('Erreur lors de la récupération des véhicules:', error)
    return []
  }
}

/**
 * Récupère un véhicule par ID avec cache Accelerate
 */
export async function getVehicleById(id: string): Promise<VehicleProps | null> {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      cacheStrategy: { ttl: 300 } // Cache 5 minutes
    })
    return vehicle ? convertPrismaVehicle(vehicle) : null
  } catch (error) {
    console.error('Erreur lors de la récupération du véhicule:', error)
    return null
  }
}

/**
 * Crée un nouveau véhicule
 */
export async function createVehicle(vehicleData: Omit<VehicleProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<VehicleProps> {
  try {
    const createData = convertToCreateData(vehicleData)
    const newVehicle = await prisma.vehicle.create({
      data: createData
    })
    return convertPrismaVehicle(newVehicle)
  } catch (error) {
    console.error('Erreur lors de la création du véhicule:', error)
    throw new Error('Impossible de créer le véhicule')
  }
}

/**
 * Met à jour un véhicule existant
 */
export async function updateVehicle(id: string, updates: Partial<VehicleProps>): Promise<VehicleProps> {
  try {
    // Conversion des champs pour Prisma
    const updateData: any = {}
    
    if (updates.make) updateData.make = updates.make
    if (updates.model) updateData.model = updates.model
    if (updates.year) updateData.year = updates.year
    if (updates.price) updateData.price = updates.price
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
      }
    }

    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: updateData
    })
    
    return convertPrismaVehicle(updatedVehicle)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du véhicule:', error)
    throw new Error('Impossible de mettre à jour le véhicule')
  }
}

/**
 * Supprime un véhicule
 */
export async function deleteVehicle(id: string): Promise<boolean> {
  try {
    await prisma.vehicle.delete({
      where: { id }
    })
    return true
  } catch (error) {
    console.error('Erreur lors de la suppression du véhicule:', error)
    return false
  }
}

/**
 * Calcule les statistiques des véhicules avec cache Accelerate
 */
export async function getVehicleStats() {
  try {
    const [totalVehicles, availableVehicles, soldVehicles, priceStats] = await Promise.all([
      prisma.vehicle.count({
        cacheStrategy: { ttl: 60 } // Cache 1 minute pour stats
      }),
      prisma.vehicle.count({ 
        where: { isAvailable: true },
        cacheStrategy: { ttl: 60 }
      }),
      prisma.vehicle.count({ 
        where: { isAvailable: false },
        cacheStrategy: { ttl: 60 }
      }),
      prisma.vehicle.aggregate({
        _avg: { price: true },
        _sum: { price: true },
        cacheStrategy: { ttl: 60 }
      })
    ])
    
    return {
      totalVehicles,
      availableVehicles,
      soldVehicles,
      averagePrice: Math.round((priceStats._avg as any)?.price || 0),
      totalValue: (priceStats._sum as any)?.price || 0
    }
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error)
    return {
      totalVehicles: 0,
      availableVehicles: 0,
      soldVehicles: 0,
      averagePrice: 0,
      totalValue: 0
    }
  }
}

/**
 * Initialise la base de données avec des données de démonstration
 */
export async function initializeDatabase() {
  try {
    // Vérifier si des véhicules existent déjà
    const existingCount = await prisma.vehicle.count()
    
    if (existingCount > 0) {
      console.log('Base de données déjà initialisée')
      return
    }

    console.log('Base de données Prisma Accelerate prête - aucune donnée de démonstration')
    
    console.log('Base de données Prisma Accelerate initialisée avec succès !')
  } catch (error) {
    console.error('Erreur lors de l\'initialisation Prisma Accelerate:', error)
  }
}

/**
 * Ferme la connexion Prisma (utile pour les tests)
 */
export async function disconnectDatabase() {
  await prisma.$disconnect()
} 