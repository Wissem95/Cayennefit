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
        console.log(`API: Récupération du véhicule ${params.id}`)
        
        // Validation de l'ID
        if (!params.id) {
            console.error('API: ID manquant')
            return NextResponse.json(
                { error: 'ID de véhicule requis' },
                { status: 400 }
            )
        }
        
        const vehicle = await getVehicleById(params.id);
        
        if (!vehicle) {
            console.log(`API: Véhicule ${params.id} non trouvé`)
            return NextResponse.json(
                { error: 'Véhicule non trouvé' },
                { status: 404 }
            );
        }
        
        console.log(`API: Véhicule ${params.id} récupéré avec succès`)
        return NextResponse.json(vehicle);
    } catch (error) {
        console.error(`API: Erreur lors de la récupération du véhicule ${params.id}:`, error);
        
        // Gestion d'erreurs spécifiques
        if (error instanceof Error) {
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
 * PUT - Met à jour un véhicule dans Prisma
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        console.log(`API: Mise à jour du véhicule ${params.id}`)
        
        // Validation de l'ID
        if (!params.id) {
            console.error('API: ID manquant pour mise à jour')
            return NextResponse.json(
                { error: 'ID de véhicule requis' },
                { status: 400 }
            )
        }
        
        const updateData = await request.json();
        console.log(`API: Données de mise à jour pour ${params.id}:`, updateData)
        
        // Validation des données
        if (!updateData || Object.keys(updateData).length === 0) {
            console.error('API: Données de mise à jour vides')
            return NextResponse.json(
                { error: 'Données de mise à jour requises' },
                { status: 400 }
            )
        }
        
        const updatedVehicle = await updateVehicle(params.id, updateData);
        
        console.log(`API: Véhicule ${params.id} mis à jour avec succès`)
        return NextResponse.json(updatedVehicle);
    } catch (error) {
        console.error(`API: Erreur lors de la mise à jour du véhicule ${params.id}:`, error);
        
        if (error instanceof Error) {
            // Erreurs de validation
            if (error.message.includes('Véhicule non trouvé')) {
                return NextResponse.json(
                    { error: 'Véhicule non trouvé' },
                    { status: 404 }
                );
            }
            if (error.message.includes('ID de véhicule invalide')) {
                return NextResponse.json(
                    { error: 'ID de véhicule invalide' },
                    { status: 400 }
                );
            }
            if (error.message.includes('invalide')) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }
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
 * DELETE - Supprime un véhicule de Prisma
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        console.log(`API: Suppression du véhicule ${params.id}`)
        
        // Validation de l'ID
        if (!params.id) {
            console.error('API: ID manquant pour suppression')
            return NextResponse.json(
                { error: 'ID de véhicule requis' },
                { status: 400 }
            )
        }
        
        await deleteVehicle(params.id);
        
        console.log(`API: Véhicule ${params.id} supprimé avec succès`)
        return NextResponse.json({ 
            message: 'Véhicule supprimé avec succès',
            id: params.id 
        });
    } catch (error) {
        console.error(`API: Erreur lors de la suppression du véhicule ${params.id}:`, error);
        
        if (error instanceof Error) {
            // Erreurs de validation
            if (error.message.includes('Véhicule non trouvé')) {
                return NextResponse.json(
                    { error: 'Véhicule non trouvé' },
                    { status: 404 }
                );
            }
            if (error.message.includes('ID de véhicule invalide')) {
                return NextResponse.json(
                    { error: 'ID de véhicule invalide' },
                    { status: 400 }
                );
            }
            if (error.message.includes('véhicule référencé ailleurs')) {
                return NextResponse.json(
                    { error: 'Impossible de supprimer - véhicule référencé' },
                    { status: 409 }
                );
            }
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