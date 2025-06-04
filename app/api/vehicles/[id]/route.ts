import { NextRequest, NextResponse } from 'next/server';
import { getVehicleById, updateVehicle, deleteVehicle } from '@lib/database';

/**
 * GET - Récupère un véhicule par ID depuis Prisma
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const vehicle = await getVehicleById(params.id);
        
        if (!vehicle) {
            return NextResponse.json(
                { error: 'Véhicule non trouvé' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(vehicle);
    } catch (error) {
        console.error('Erreur lors de la récupération du véhicule:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}

/**
 * PUT - Met à jour un véhicule dans Prisma
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const updateData = await request.json();
        
        const updatedVehicle = await updateVehicle(params.id, updateData);
        
        return NextResponse.json(updatedVehicle);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du véhicule:', error);
        
        if (error instanceof Error && error.message === 'Véhicule non trouvé') {
            return NextResponse.json(
                { error: 'Véhicule non trouvé' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}

/**
 * DELETE - Supprime un véhicule de Prisma
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const success = await deleteVehicle(params.id);
        
        if (!success) {
            return NextResponse.json(
                { error: 'Véhicule non trouvé' },
                { status: 404 }
            );
        }
        
        return NextResponse.json({ message: 'Véhicule supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du véhicule:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
} 