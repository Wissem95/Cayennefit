import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { VehicleProps } from '@types';
import { getVehicleStats } from '@lib/database';

// Chemin vers le fichier de base de données JSON
const DB_PATH = path.join(process.cwd(), 'data', 'vehicles.json');

// Véhicules d'exemple pour l'initialisation
const INITIAL_VEHICLES: VehicleProps[] = [
    {
        id: "vehicle-1",
        make: "BMW",
        model: "Série 3",
        year: 2022,
        price: 45000,
        city_mpg: 8.5,
        highway_mpg: 6.2,
        fuel_type: "Essence",
        transmission: "Automatique",
        drive: "RWD",
        color: "Noir",
        mileage: 15000,
        description: "BMW Série 3 en excellent état, parfaite pour les trajets urbains et autoroutiers.",
        images: ["/pattern.png"],
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "vehicle-2", 
        make: "Mercedes",
        model: "Classe C",
        year: 2021,
        price: 42000,
        city_mpg: 9.1,
        highway_mpg: 6.8,
        fuel_type: "Diesel",
        transmission: "Automatique", 
        drive: "RWD",
        color: "Blanc",
        mileage: 22000,
        description: "Mercedes Classe C diesel, économique et confortable pour tous vos déplacements.",
        images: ["/pattern.png"],
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

/**
 * Initialise la base de données si elle n'existe pas
 */
function initializeDatabase() {
    const dataDir = path.dirname(DB_PATH);
    
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_VEHICLES, null, 2));
    }
}

/**
 * Lit les données de la base de données JSON
 */
function readDatabase(): VehicleProps[] {
    try {
        initializeDatabase();
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erreur lors de la lecture de la base de données:', error);
        return INITIAL_VEHICLES;
    }
}

/**
 * GET - Récupère les statistiques des véhicules depuis Vercel KV
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