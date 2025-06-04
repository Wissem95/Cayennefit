import { NextRequest, NextResponse } from 'next/server';
import { getAllVehicles, getVehicleStats } from '@lib/database';

/**
 * GET - Route de diagnostic pour vérifier l'état de la base de données
 * URL: /api/debug
 */
export async function GET(request: NextRequest) {
    try {
        console.log('🔍 Diagnostic de la base de données CAYENNEFIT');

        // 1. Récupérer tous les véhicules
        const allVehicles = await getAllVehicles();
        
        // 2. Calculer les statistiques manuellement
        const availableVehicles = allVehicles.filter(v => v.isAvailable === true);
        const soldVehicles = allVehicles.filter(v => v.isAvailable === false);
        
        // 3. Récupérer les statistiques via la fonction
        const stats = await getVehicleStats();

        // 4. Préparer le rapport de diagnostic
        const diagnosticReport = {
            timestamp: new Date().toISOString(),
            database: {
                totalVehicles: allVehicles.length,
                availableCount: availableVehicles.length,
                soldCount: soldVehicles.length,
                lastUpdated: allVehicles.length > 0 ? allVehicles[0].updatedAt : null
            },
            officialStats: stats,
            vehiclesList: allVehicles.map(v => ({
                id: v.id,
                make: v.make,
                model: v.model,
                year: v.year,
                isAvailable: v.isAvailable,
                soldAt: v.soldAt,
                createdAt: v.createdAt,
                updatedAt: v.updatedAt
            })),
            availableVehicles: availableVehicles.map(v => ({
                id: v.id,
                make: v.make,
                model: v.model,
                year: v.year
            })),
            soldVehicles: soldVehicles.map(v => ({
                id: v.id,
                make: v.make,
                model: v.model,
                year: v.year,
                soldAt: v.soldAt
            }))
        };

        console.log('📊 Rapport de diagnostic généré');
        console.log(`📈 Total: ${allVehicles.length}, Disponibles: ${availableVehicles.length}, Vendus: ${soldVehicles.length}`);
        
        return NextResponse.json(diagnosticReport);
    } catch (error) {
        console.error('❌ Erreur lors du diagnostic:', error);
        return NextResponse.json(
            { 
                error: 'Erreur lors du diagnostic',
                details: error instanceof Error ? error.message : 'Erreur inconnue',
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
} 