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
        const matches = base64Image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
        if (!matches) {
            throw new Error('Format d\'image invalide');
        }
        
        const imageType = matches[1];
        const imageData = matches[2];
        
        const imagesDir = path.join(process.cwd(), 'public', 'vehicles');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }
        
        const fileName = `${vehicleId}-${imageIndex}-${Date.now()}.${imageType}`;
        const filePath = path.join(imagesDir, fileName);
        
        const buffer = Buffer.from(imageData, 'base64');
        fs.writeFileSync(filePath, new Uint8Array(buffer));
        
        return `/vehicles/${fileName}`;
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'image:', error);
        return '/pattern.png';
    }
}

// GET - Récupérer un véhicule par ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const vehicles = readDatabase();
        const vehicle = vehicles.find(v => v.id === params.id);
        
        if (!vehicle) {
            return NextResponse.json({ error: 'Véhicule non trouvé' }, { status: 404 });
        }
        
        return NextResponse.json(vehicle);
    } catch (error) {
        console.error('Erreur GET /api/vehicles/[id]:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

// PUT - Mettre à jour un véhicule
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const updates = await request.json();
        const vehicles = readDatabase();
        const index = vehicles.findIndex(v => v.id === params.id);
        
        if (index === -1) {
            return NextResponse.json({ error: 'Véhicule non trouvé' }, { status: 404 });
        }

        // Traiter les images si elles sont mises à jour
        let processedImages = updates.images;
        if (updates.images && updates.images.length > 0) {
            processedImages = [];
            for (let i = 0; i < updates.images.length; i++) {
                const image = updates.images[i];
                if (image.startsWith('data:image/')) {
                    const savedImagePath = await saveImageToPublic(image, params.id, i);
                    processedImages.push(savedImagePath);
                } else {
                    processedImages.push(image);
                }
            }
        }

        vehicles[index] = {
            ...vehicles[index],
            ...updates,
            images: processedImages || vehicles[index].images,
            updatedAt: new Date().toISOString()
        };

        writeDatabase(vehicles);
        return NextResponse.json(vehicles[index]);
    } catch (error) {
        console.error('Erreur PUT /api/vehicles/[id]:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

// DELETE - Supprimer un véhicule
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const vehicles = readDatabase();
        const index = vehicles.findIndex(v => v.id === params.id);
        
        if (index === -1) {
            return NextResponse.json({ error: 'Véhicule non trouvé' }, { status: 404 });
        }

        // Supprimer les images du véhicule
        const vehicle = vehicles[index];
        vehicle.images.forEach(imagePath => {
            if (imagePath.startsWith('/vehicles/')) {
                const fullPath = path.join(process.cwd(), 'public', imagePath);
                if (fs.existsSync(fullPath)) {
                    try {
                        fs.unlinkSync(fullPath);
                    } catch (error) {
                        console.error('Erreur lors de la suppression de l\'image:', error);
                    }
                }
            }
        });

        vehicles.splice(index, 1);
        writeDatabase(vehicles);
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Erreur DELETE /api/vehicles/[id]:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
} 