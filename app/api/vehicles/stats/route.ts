import { NextResponse } from 'next/server';
import { getVehicleStats } from '@lib/database';

/**
 * GET - Récupère les statistiques des véhicules depuis Prisma (données fraîches)
 * Compatible avec Vercel, Ionos et tous les hébergeurs
 */
export async function GET() {
    try {
        console.log('API: Récupération des statistiques des véhicules')
        
        const stats = await getVehicleStats();
        
        console.log('API: Statistiques récupérées avec succès:', stats)
        return NextResponse.json(stats);
    } catch (error) {
        console.error('API: Erreur détaillée lors du calcul des statistiques:', error);
        
        if (error instanceof Error) {
            if (error.message.includes('Erreur d\'accès à la base de données')) {
                return NextResponse.json(
                    { error: 'Service temporairement indisponible' },
                    { status: 503 }
                );
            }
        }
        
        // Retourner des statistiques vides en cas d'erreur
        const fallbackStats = {
            totalVehicles: 0,
            availableVehicles: 0,
            soldVehicles: 0,
            averagePrice: 0,
            totalValue: 0
        }
        
        console.log('API: Retour des statistiques par défaut suite à l\'erreur')
        return NextResponse.json(fallbackStats);
    }
} 