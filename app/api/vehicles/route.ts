import { NextRequest, NextResponse } from 'next/server';
import { getAllVehicles, createVehicle, initializeDatabase } from '@lib/database';

/**
 * GET - Récupère tous les véhicules depuis Vercel KV
 */
export async function GET() {
    try {
        const vehicles = await getAllVehicles();
        
        // Si aucun véhicule, initialiser la base avec des données de démo
        if (vehicles.length === 0) {
            await initializeDatabase();
            const newVehicles = await getAllVehicles();
            return NextResponse.json(newVehicles);
        }
        
        return NextResponse.json(vehicles);
    } catch (error) {
        console.error('Erreur lors de la récupération des véhicules:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des véhicules' },
            { status: 500 }
        );
    }
}

/**
 * POST - Crée un nouveau véhicule dans Vercel KV
 */
export async function POST(request: NextRequest) {
    try {
        const vehicleData = await request.json();
        
        // Validation basique
        if (!vehicleData.make || !vehicleData.model || !vehicleData.year) {
            return NextResponse.json(
                { error: 'Données manquantes (make, model, year requis)' },
                { status: 400 }
            );
        }

        const newVehicle = await createVehicle(vehicleData);
        
        return NextResponse.json(newVehicle, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création du véhicule:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création du véhicule' },
            { status: 500 }
        );
    }
} 