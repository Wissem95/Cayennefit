import { NextRequest, NextResponse } from 'next/server';
import { getAllVehicles, createVehicle } from '@lib/database';

/**
 * GET - Récupère tous les véhicules depuis Prisma avec filtres optionnels
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        
        // Récupérer tous les véhicules depuis Prisma
        let vehicles = await getAllVehicles();
        
        // Appliquer les filtres côté serveur
        const manufacturer = searchParams.get('manufacturer');
        const year = searchParams.get('year');
        const fuel = searchParams.get('fuel');
        const model = searchParams.get('model');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        if (manufacturer) {
            vehicles = vehicles.filter(vehicle => 
                vehicle.make.toLowerCase().includes(manufacturer.toLowerCase())
            );
        }

        if (model) {
            vehicles = vehicles.filter(vehicle =>
                vehicle.model.toLowerCase().includes(model.toLowerCase())
            );
        }

        if (year) {
            vehicles = vehicles.filter(vehicle => vehicle.year === parseInt(year));
        }

        if (fuel) {
            vehicles = vehicles.filter(vehicle =>
                vehicle.fuel_type.toLowerCase().includes(fuel.toLowerCase())
            );
        }

        if (minPrice) {
            vehicles = vehicles.filter(vehicle => vehicle.price >= parseInt(minPrice));
        }

        if (maxPrice) {
            vehicles = vehicles.filter(vehicle => vehicle.price <= parseInt(maxPrice));
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
 * POST - Crée un nouveau véhicule dans Prisma
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