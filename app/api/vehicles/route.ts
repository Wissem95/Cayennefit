import { NextRequest, NextResponse } from 'next/server';
import { getAllVehicles, createVehicle } from '@lib/database';

/**
 * GET - Récupère tous les véhicules depuis Prisma avec filtres optionnels
 */
export async function GET(request: NextRequest) {
    try {
        console.log('API: Récupération de tous les véhicules')
        
        const { searchParams } = new URL(request.url);
        console.log('API: Paramètres de recherche:', Object.fromEntries(searchParams.entries()))
        
        // Récupérer tous les véhicules depuis Prisma
        let vehicles = await getAllVehicles();
        console.log(`API: ${vehicles.length} véhicules récupérés depuis la base`)
        
        // Appliquer les filtres côté serveur
        const manufacturer = searchParams.get('manufacturer');
        const year = searchParams.get('year');
        const fuel = searchParams.get('fuel');
        const model = searchParams.get('model');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        let filteredCount = vehicles.length

        if (manufacturer) {
            vehicles = vehicles.filter(vehicle => 
                vehicle.make.toLowerCase().includes(manufacturer.toLowerCase())
            );
            console.log(`API: Filtre marque '${manufacturer}': ${vehicles.length} véhicules`)
        }

        if (model) {
            vehicles = vehicles.filter(vehicle =>
                vehicle.model.toLowerCase().includes(model.toLowerCase())
            );
            console.log(`API: Filtre modèle '${model}': ${vehicles.length} véhicules`)
        }

        if (year) {
            const yearNum = parseInt(year)
            if (isNaN(yearNum)) {
                console.error('API: Année invalide:', year)
                return NextResponse.json(
                    { error: 'Année invalide' },
                    { status: 400 }
                )
            }
            vehicles = vehicles.filter(vehicle => vehicle.year === yearNum);
            console.log(`API: Filtre année ${yearNum}: ${vehicles.length} véhicules`)
        }

        if (fuel) {
            vehicles = vehicles.filter(vehicle =>
                vehicle.fuel_type.toLowerCase().includes(fuel.toLowerCase())
            );
            console.log(`API: Filtre carburant '${fuel}': ${vehicles.length} véhicules`)
        }

        if (minPrice) {
            const minPriceNum = parseInt(minPrice)
            if (isNaN(minPriceNum) || minPriceNum < 0) {
                console.error('API: Prix minimum invalide:', minPrice)
                return NextResponse.json(
                    { error: 'Prix minimum invalide' },
                    { status: 400 }
                )
            }
            vehicles = vehicles.filter(vehicle => vehicle.price >= minPriceNum);
            console.log(`API: Filtre prix min ${minPriceNum}: ${vehicles.length} véhicules`)
        }

        if (maxPrice) {
            const maxPriceNum = parseInt(maxPrice)
            if (isNaN(maxPriceNum) || maxPriceNum < 0) {
                console.error('API: Prix maximum invalide:', maxPrice)
                return NextResponse.json(
                    { error: 'Prix maximum invalide' },
                    { status: 400 }
                )
            }
            vehicles = vehicles.filter(vehicle => vehicle.price <= maxPriceNum);
            console.log(`API: Filtre prix max ${maxPriceNum}: ${vehicles.length} véhicules`)
        }
        
        console.log(`API: Retour de ${vehicles.length} véhicules après filtrage`)
        return NextResponse.json(vehicles);
    } catch (error) {
        console.error('API: Erreur détaillée lors de la récupération des véhicules:', error);
        
        if (error instanceof Error) {
            console.error('API: Message d\'erreur:', error.message)
            
            if (error.message.includes('Erreur d\'accès à la base de données')) {
                return NextResponse.json(
                    { error: 'Service temporairement indisponible' },
                    { status: 503 }
                );
            }
        }
        
        return NextResponse.json(
            { error: 'Erreur serveur interne' },
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
        console.log('Données reçues:', vehicleData);
        
        // Validation étendue
        const requiredFields = ['make', 'model', 'year', 'price'];
        const missingFields = requiredFields.filter(field => !vehicleData[field]);
        
        if (missingFields.length > 0) {
            console.error('Champs manquants:', missingFields);
            return NextResponse.json(
                { error: `Champs manquants: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Validation des types
        if (typeof vehicleData.year !== 'number' || vehicleData.year < 1900 || vehicleData.year > new Date().getFullYear() + 1) {
            return NextResponse.json(
                { error: 'Année invalide' },
                { status: 400 }
            );
        }

        if (typeof vehicleData.price !== 'number' || vehicleData.price <= 0) {
            return NextResponse.json(
                { error: 'Prix invalide' },
                { status: 400 }
            );
        }

        // Assurer les valeurs par défaut
        const cleanedData = {
            ...vehicleData,
            city_mpg: vehicleData.city_mpg || 0,
            highway_mpg: vehicleData.highway_mpg || 0,
            fuel_type: vehicleData.fuel_type || 'Essence',
            transmission: vehicleData.transmission || 'Manuelle',
            drive: vehicleData.drive || 'FWD',
            color: vehicleData.color || 'Blanc',
            mileage: vehicleData.mileage || 0,
            description: vehicleData.description || '',
            images: Array.isArray(vehicleData.images) ? vehicleData.images : [],
            isAvailable: vehicleData.isAvailable !== undefined ? vehicleData.isAvailable : true
        };

        console.log('Données nettoyées:', cleanedData);

        const newVehicle = await createVehicle(cleanedData);
        
        return NextResponse.json(newVehicle, { status: 201 });
    } catch (error) {
        console.error('Erreur complète lors de la création du véhicule:', error);
        
        // Logs détaillés pour debug
        if (error instanceof Error) {
            console.error('Message d\'erreur:', error.message);
            console.error('Stack trace:', error.stack);
        }
        
        return NextResponse.json(
            { 
                error: 'Erreur lors de la création du véhicule',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            },
            { status: 500 }
        );
    }
} 