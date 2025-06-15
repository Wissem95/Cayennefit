import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendClientConfirmationResend, sendClientCancellationResend, AppointmentEmailData } from '@/lib/email-resend';

// Instance Prisma réutilisable
const prisma = new PrismaClient();

/**
 * GET /api/appointments/[id]
 * Récupérer un rendez-vous spécifique
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
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

    if (!appointment) {
      return NextResponse.json(
        { success: false, message: 'Rendez-vous non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: appointment,
    });

  } catch (error) {
    console.error('Erreur GET appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/appointments/[id]
 * Mettre à jour le statut d'un rendez-vous (actions admin)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { action, adminMessage } = body;

    // Vérifier que l'action est valide
    const validActions = ['confirm', 'cancel', 'complete', 'reschedule', 'restore'];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { success: false, message: 'Action invalide' },
        { status: 400 }
      );
    }

    // Récupérer le rendez-vous existant
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id: params.id },
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

    if (!existingAppointment) {
      return NextResponse.json(
        { success: false, message: 'Rendez-vous non trouvé' },
        { status: 404 }
      );
    }

    // Préparer les données de mise à jour selon l'action
    let updateData: any = { adminNotes: adminMessage };
    let statusUpdate = '';

    switch (action) {
      case 'confirm':
        updateData.status = 'CONFIRMED';
        updateData.confirmedAt = new Date();
        statusUpdate = 'confirmé';
        break;
      case 'cancel':
        updateData.status = 'CANCELLED';
        updateData.cancelledAt = new Date();
        statusUpdate = 'annulé';
        break;
      case 'complete':
        updateData.status = 'COMPLETED';
        updateData.completedAt = new Date();
        statusUpdate = 'marqué comme terminé';
        break;
      case 'reschedule':
        updateData.status = 'RESCHEDULED';
        statusUpdate = 'reporté';
        break;
      case 'restore':
        updateData.status = 'PENDING';
        updateData.confirmedAt = null;
        updateData.cancelledAt = null;
        updateData.completedAt = null;
        statusUpdate = 'restauré en attente';
        break;
    }

    // Mettre à jour le rendez-vous
    const updatedAppointment = await prisma.appointment.update({
      where: { id: params.id },
      data: updateData,
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

    // Envoyer email au client selon l'action
    if (action === 'confirm' || action === 'cancel') {
      const emailData: AppointmentEmailData = {
        clientName: updatedAppointment.clientName,
        clientEmail: updatedAppointment.clientEmail,
        clientPhone: updatedAppointment.clientPhone,
        appointmentDate: updatedAppointment.appointmentDate.toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        serviceType: updatedAppointment.serviceType,
        message: updatedAppointment.message || undefined,
        adminMessage: adminMessage || undefined,
        vehicleInfo: updatedAppointment.vehicle ? {
          make: updatedAppointment.vehicle.make,
          model: updatedAppointment.vehicle.model,
          year: updatedAppointment.vehicle.year,
          price: updatedAppointment.vehicle.price,
        } : undefined,
      };

      // Envoyer l'email approprié (en arrière-plan)
      if (action === 'confirm') {
        sendClientConfirmationResend(emailData).catch((error: any) => {
          console.error('Erreur envoi email confirmation:', error);
        });
      } else if (action === 'cancel') {
        sendClientCancellationResend(emailData).catch((error: any) => {
          console.error('Erreur envoi email annulation:', error);
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Rendez-vous ${statusUpdate} avec succès`,
      data: updatedAppointment,
    });

  } catch (error) {
    console.error('Erreur PATCH appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/appointments/[id]
 * Supprimer un rendez-vous
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier que le rendez-vous existe
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id: params.id }
    });

    if (!existingAppointment) {
      return NextResponse.json(
        { success: false, message: 'Rendez-vous non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le rendez-vous
    await prisma.appointment.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Rendez-vous supprimé avec succès',
    });

  } catch (error) {
    console.error('Erreur DELETE appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
} 