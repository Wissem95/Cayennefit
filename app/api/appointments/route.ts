import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendOwnerNotificationResend, sendClientReceiptNotificationResend, AppointmentEmailData } from '@/lib/email-resend';

// Instance Prisma réutilisable
const prisma = new PrismaClient();

/**
 * GET /api/appointments
 * Récupérer tous les rendez-vous (pour l'admin)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Construire le filtre de requête
    const where: any = {};
    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    // Récupérer les rendez-vous avec pagination
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          vehicle: {
            select: {
              id: true,
              make: true,
              model: true,
              year: true,
              price: true,
              images: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.appointment.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Erreur GET appointments:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/appointments
 * Créer un nouveau rendez-vous
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données requises
    const {
      clientName,
      clientEmail,
      clientPhone,
      appointmentDate,
      serviceType,
      message,
      vehicleId
    } = body;

    // Validation simple
    if (!clientName || !clientEmail || !clientPhone || !appointmentDate || !serviceType) {
      return NextResponse.json(
        { success: false, message: 'Tous les champs requis doivent être remplis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return NextResponse.json(
        { success: false, message: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validation de la date (pas dans le passé)
    const appointmentDateTime = new Date(appointmentDate);
    if (appointmentDateTime < new Date()) {
      return NextResponse.json(
        { success: false, message: 'La date du rendez-vous ne peut pas être dans le passé' },
        { status: 400 }
      );
    }

    // Vérifier que le véhicule existe si fourni
    let vehicleInfo = null;
    if (vehicleId) {
      vehicleInfo = await prisma.vehicle.findUnique({
        where: { id: vehicleId },
        select: {
          id: true,
          make: true,
          model: true,
          year: true,
          price: true,
          images: true,
        }
      });

      if (!vehicleInfo) {
        return NextResponse.json(
          { success: false, message: 'Véhicule non trouvé' },
          { status: 404 }
        );
      }
    }

    // Créer le rendez-vous en base
    const newAppointment = await prisma.appointment.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        appointmentDate: appointmentDateTime,
        serviceType,
        message: message || null,
        vehicleId: vehicleId || null,
        status: 'PENDING',
      },
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            price: true,
            images: true,
          }
        }
      }
    });

    // Préparer les données pour l'email
    const emailData: AppointmentEmailData = {
      clientName,
      clientEmail,
      clientPhone,
      appointmentDate: appointmentDateTime.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      serviceType,
      message: message || undefined,
      vehicleInfo: vehicleInfo ? {
        make: vehicleInfo.make,
        model: vehicleInfo.model,
        year: vehicleInfo.year,
        price: vehicleInfo.price,
      } : undefined,
    };

    // Envoyer les emails de notification (avec gestion d'erreur détaillée)
    try {
      const [ownerEmailSent, clientEmailSent] = await Promise.all([
        sendOwnerNotificationResend(emailData),
        sendClientReceiptNotificationResend(emailData)
      ]);
      
      console.log('📧 Résultats envoi emails:');
      console.log('- Email propriétaire:', ownerEmailSent ? '✅ Envoyé' : '❌ Échec');
      console.log('- Email client:', clientEmailSent ? '✅ Envoyé' : '❌ Échec');
      
      if (!ownerEmailSent) {
        console.error('⚠️ Échec email propriétaire pour RDV:', newAppointment.id);
      }
      if (!clientEmailSent) {
        console.error('⚠️ Échec email client pour RDV:', newAppointment.id);
      }
    } catch (error) {
      console.error('❌ Erreur critique envoi emails:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Rendez-vous créé avec succès',
      data: newAppointment,
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur POST appointments:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la création du rendez-vous' },
      { status: 500 }
    );
  }
} 