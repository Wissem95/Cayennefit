import { NextResponse } from 'next/server';
import { getVehicleStats } from '@lib/database';

/**
 * GET - Récupère les statistiques des véhicules depuis PostgreSQL
 * Compatible avec Vercel, Ionos et tous les hébergeurs
 */
export async function GET() {
    try {
        const stats = await getVehicleStats();
        return NextResponse.json(stats);
    } catch (error) {
        console.error('Erreur lors du calcul des statistiques:', error);
        return NextResponse.json(
            { error: 'Erreur lors du calcul des statistiques' },
            { status: 500 }
        );
    }
} 