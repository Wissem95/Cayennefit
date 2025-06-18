import { NextRequest, NextResponse } from 'next/server';
import { 
  sendOwnerNotificationResend, 
  sendClientReceiptNotificationResend,
  testResendConfiguration,
  AppointmentEmailData 
} from '@/lib/email-resend';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const emailType = searchParams.get('type') || 'all';
  
  // Données de test
  const testEmailData: AppointmentEmailData = {
    clientName: 'Test Client',
    clientEmail: 'wissemkarboub@gmail.com', // Utilise ton email pour tester
    clientPhone: '+33 6 12 34 56 78',
    appointmentDate: 'lundi 16 juin 2025 à 14:30',
    serviceType: 'MAINTENANCE',
    message: 'Ceci est un test d\'email depuis l\'API de debug',
    vehicleInfo: {
      make: 'PORSCHE',
      model: 'CAYENNE',
      year: 2023,
      price: 85000,
    },
  };

  const results: any = {
    timestamp: new Date().toISOString(),
    resendKey: process.env.RESEND_API_KEY ? 'Présente (commence par: ' + process.env.RESEND_API_KEY.substring(0, 5) + '...)' : 'MANQUANTE',
    tests: {}
  };

  try {
    // Test 1: Email propriétaire (notification nouvelle demande)
    if (emailType === 'all' || emailType === 'owner') {
      console.log('🧪 Test email propriétaire...');
      const ownerResult = await sendOwnerNotificationResend(testEmailData);
      results.tests.ownerNotification = {
        success: ownerResult,
        description: 'Email vers wissemkarboub@gmail.com quand nouvelle demande',
        error: ownerResult ? null : 'Échec envoi'
      };
    }

    // Test 2: Email client (accusé de réception)
    if (emailType === 'all' || emailType === 'receipt') {
      console.log('🧪 Test email accusé réception client...');
      const receiptResult = await sendClientReceiptNotificationResend(testEmailData);
      results.tests.clientReceipt = {
        success: receiptResult,
        description: 'Email accusé réception vers client',
        error: receiptResult ? null : 'Échec envoi'
      };
    }

    // Test 3: Configuration Resend
    if (emailType === 'all' || emailType === 'config') {
      console.log('🧪 Test configuration Resend...');
      const configResult = await testResendConfiguration();
      results.tests.resendConfig = {
        success: configResult,
        description: 'Test de la configuration Resend',
        error: configResult ? null : 'Échec configuration'
      };
    }

    // Résumé
    const totalTests = Object.keys(results.tests).length;
    const successfulTests = Object.values(results.tests).filter((test: any) => test.success).length;
    
    results.summary = {
      totalTests,
      successfulTests,
      failedTests: totalTests - successfulTests,
      overallSuccess: successfulTests === totalTests
    };

    return NextResponse.json(results, { 
      status: results.summary.overallSuccess ? 200 : 500 
    });

  } catch (error) {
    console.error('Erreur test emails:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString(),
      resendKey: process.env.RESEND_API_KEY ? 'Présente' : 'MANQUANTE'
    }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({
    message: 'Utilise GET avec ?type=all|owner|receipt|config pour tester les emails'
  });
} 