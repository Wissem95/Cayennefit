import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { VehicleProps } from '@types';

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
    
    // Créer le dossier data s'il n'existe pas
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Créer le fichier JSON s'il n'existe pas
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
 * Écrit les données dans la base de données JSON
 */
function writeDatabase(vehicles: VehicleProps[]): void {
    try {
        initializeDatabase();
        fs.writeFileSync(DB_PATH, JSON.stringify(vehicles, null, 2));
    } catch (error) {
        console.error('Erreur lors de l\'écriture de la base de données:', error);
    }
}

/**
 * Sauvegarde une image en base64 dans le dossier public
 */
async function saveImageToPublic(base64Image: string, vehicleId: string, imageIndex: number): Promise<string> {
    try {
        // Extraire le type d'image et les données
        const matches = base64Image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
        if (!matches) {
            throw new Error('Format d\'image invalide');
        }
        
        const imageType = matches[1];
        const imageData = matches[2];
        
        // Créer le dossier des images s'il n'existe pas
        const imagesDir = path.join(process.cwd(), 'public', 'vehicles');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }
        
        // Nom de fichier unique
        const fileName = `${vehicleId}-${imageIndex}-${Date.now()}.${imageType}`;
        const filePath = path.join(imagesDir, fileName);
        
        // Sauvegarder l'image
        const buffer = Buffer.from(imageData, 'base64');
        fs.writeFileSync(filePath, new Uint8Array(buffer));
        
        // Retourner le chemin public
        return `/vehicles/${fileName}`;
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'image:', error);
        return '/pattern.png'; // Image de fallback
    }
}

// GET - Récupérer tous les véhicules
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const manufacturer = searchParams.get('manufacturer');
        const year = searchParams.get('year');
        const fuel = searchParams.get('fuel');
        const model = searchParams.get('model');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        let vehicles = readDatabase();

        // Appliquer les filtres
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
        console.error('Erreur GET /api/vehicles:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

// POST - Créer un nouveau véhicule
export async function POST(request: NextRequest) {
    try {
        const vehicleData = await request.json();
        const vehicles = readDatabase();
        const vehicleId = `vehicle-${Date.now()}`;
        
        // Traiter les images si elles sont en base64
        let processedImages: string[] = [];
        if (vehicleData.images && vehicleData.images.length > 0) {
            for (let i = 0; i < vehicleData.images.length; i++) {
                const image = vehicleData.images[i];
                if (image.startsWith('data:image/')) {
                    // C'est une image base64, la sauvegarder
                    const savedImagePath = await saveImageToPublic(image, vehicleId, i);
                    processedImages.push(savedImagePath);
                } else {
                    // C'est déjà un chemin d'image
                    processedImages.push(image);
                }
            }
        } else {
            processedImages = ['/pattern.png'];
        }

        const newVehicle: VehicleProps = {
            ...vehicleData,
            id: vehicleId,
            images: processedImages,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        vehicles.push(newVehicle);
        writeDatabase(vehicles);
        
        return NextResponse.json(newVehicle, { status: 201 });
    } catch (error) {
        console.error('Erreur POST /api/vehicles:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
} 