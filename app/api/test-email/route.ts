import { NextRequest, NextResponse } from 'next/server';
import { 
  sendOwnerNotificationResend, 
  sendClientReceiptNotificationResend,
  AppointmentEmailData 
} from '@/lib/email-resend';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const testEmail = searchParams.get('email') || 'test@example.com';
  
  console.log('🧪 Test d\'email vers:', testEmail);
  
  // Données de test
  const testData: AppointmentEmailData = {
    clientName: 'Client Test',
    clientEmail: testEmail,
    clientPhone: '+33 6 12 34 56 78',
    appointmentDate: new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    serviceType: 'test_drive',
    message: 'Test d\'envoi d\'email depuis l\'API de diagnostic',
  };

  const results: any = {
    timestamp: new Date().toISOString(),
    testEmail,
    resendApiKey: process.env.RESEND_API_KEY ? 'Configurée ✅' : 'MANQUANTE ❌',
    tests: {}
  };

  try {
    // Test 1: Email au propriétaire (devrait fonctionner)
    console.log('📧 Test 1: Email au propriétaire...');
    const ownerResult = await sendOwnerNotificationResend(testData);
    results.tests.proprietaire = {
      success: ownerResult,
      description: 'Email vers le propriétaire (wissemkarboub@gmail.com)',
      email: process.env.OWNER_EMAIL || 'wissemkarboub@gmail.com'
    };

    // Test 2: Email au client (peut échouer avec domaine de test)
    console.log('📧 Test 2: Email au client...');
    const clientResult = await sendClientReceiptNotificationResend(testData);
    results.tests.client = {
      success: clientResult,
      description: `Email vers le client (${testEmail})`,
      email: testEmail,
      warning: !clientResult ? 'Échec probable dû au domaine de test Resend' : null
    };

    // Diagnostic
    const diagnosis: any = {
      status: ownerResult && clientResult ? 'Tout fonctionne ✅' : 'Problèmes détectés ⚠️',
      issues: [],
      solutions: []
    };

    if (!ownerResult) {
      diagnosis.issues.push('❌ Échec email propriétaire');
      diagnosis.solutions.push('Vérifier RESEND_API_KEY et la configuration');
    }

    if (!clientResult) {
      diagnosis.issues.push('❌ Échec email client');
      diagnosis.solutions.push('SOLUTION PRINCIPALE: Configurer un domaine personnalisé dans Resend');
      diagnosis.solutions.push('ALTERNATIVE: Utiliser un autre service email (SMTP, SendGrid, etc.)');
    }

    results.diagnosis = diagnosis;

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('❌ Erreur test email:', error);
    return NextResponse.json({
      ...results,
      error: (error as Error).message,
      diagnosis: {
        status: 'Erreur critique ❌',
        issues: ['Erreur lors des tests d\'email'],
        solutions: ['Vérifier les logs serveur']
      }
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, name = 'Test Client' } = await request.json();
    
    if (!email) {
      return NextResponse.json({
        success: false,
        error: 'Email requis'
      }, { status: 400 });
    }

    console.log('🧪 Test d\'email manuel vers:', email);

    const testData: AppointmentEmailData = {
      clientName: name,
      clientEmail: email,
      clientPhone: '+33 6 12 34 56 78',
      appointmentDate: new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      serviceType: 'test_drive',
      message: 'Test d\'envoi d\'email depuis l\'API de diagnostic (POST)',
    };

    const clientResult = await sendClientReceiptNotificationResend(testData);

    return NextResponse.json({
      success: clientResult,
      email,
      message: clientResult 
        ? 'Email envoyé avec succès ✅' 
        : 'Échec d\'envoi ❌ (probablement dû au domaine de test Resend)',
      recommendation: !clientResult 
        ? 'Configurez un domaine personnalisé dans Resend pour envoyer à des emails externes'
        : null
    });

  } catch (error) {
    console.error('❌ Erreur test email POST:', error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 });
  }
} 