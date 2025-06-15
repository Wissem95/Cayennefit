import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Récupération des stats des rendez-vous...');
    
    // Récupérer les statistiques des rendez-vous
    const [
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      cancelledAppointments,
      completedAppointments,
      allAppointments
    ] = await Promise.all([
      // Total des rendez-vous
      prisma.appointment.count(),
      
      // Rendez-vous en attente
      prisma.appointment.count({
        where: { status: 'PENDING' }
      }),
      
      // Rendez-vous confirmés
      prisma.appointment.count({
        where: { status: 'CONFIRMED' }
      }),
      
      // Rendez-vous annulés
      prisma.appointment.count({
        where: { status: 'CANCELLED' }
      }),
      
      // Rendez-vous terminés
      prisma.appointment.count({
        where: { status: 'COMPLETED' }
      }),
      
      // Tous les rendez-vous pour debug
      prisma.appointment.findMany({
        select: {
          id: true,
          status: true,
          clientName: true,
          createdAt: true
        }
      })
    ]);

    console.log('📊 Stats calculées:', {
      total: totalAppointments,
      pending: pendingAppointments,
      confirmed: confirmedAppointments,
      cancelled: cancelledAppointments,
      completed: completedAppointments
    });
    
    console.log('📋 Tous les RDV:', allAppointments);

    const stats = {
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      cancelledAppointments,
      completedAppointments
    };

    // Headers pour éviter le cache
    const response = NextResponse.json(stats);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des statistiques des rendez-vous:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 