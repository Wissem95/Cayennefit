import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Instance Prisma réutilisable
const prisma = new PrismaClient();

/**
 * GET /api/appointments/availability
 * Vérifier la disponibilité des créneaux pour une date donnée
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');

    if (!dateParam) {
      return NextResponse.json(
        { success: false, message: 'Date requise' },
        { status: 400 }
      );
    }

    // Parser la date
    const selectedDate = new Date(dateParam);
    
    // Définir le début et la fin de la journée
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Récupérer tous les rendez-vous CONFIRMÉS pour cette date
    const confirmedAppointments = await prisma.appointment.findMany({
      where: {
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: 'CONFIRMED', // Seulement les RDV confirmés bloquent les créneaux
      },
      select: {
        appointmentDate: true,
        clientName: true,
        serviceType: true,
      },
    });

    // Extraire les heures occupées
    const occupiedTimes = confirmedAppointments.map(appointment => {
      const date = new Date(appointment.appointmentDate);
      return {
        time: date.toTimeString().slice(0, 5), // Format HH:MM
        clientName: appointment.clientName,
        serviceType: appointment.serviceType,
      };
    });

    // Créneaux disponibles par défaut
    const allTimeSlots = [
      '09:00', '10:00', '11:00', 
      '14:00', '15:00', '16:00', '17:00'
    ];

    // Filtrer les créneaux disponibles
    const availableTimeSlots = allTimeSlots.filter(
      slot => !occupiedTimes.some(occupied => occupied.time === slot)
    );

    return NextResponse.json({
      success: true,
      data: {
        date: dateParam,
        availableTimeSlots,
        occupiedTimeSlots: occupiedTimes,
        totalSlots: allTimeSlots.length,
        availableSlots: availableTimeSlots.length,
      },
    });

  } catch (error) {
    console.error('Erreur GET availability:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 