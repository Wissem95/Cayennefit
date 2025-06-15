import { Resend } from 'resend';

// Configuration Resend (gratuit jusqu'à 3000 emails/mois)
const resend = new Resend(process.env.RESEND_API_KEY);

// Types pour les templates d'email
export interface AppointmentEmailData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  appointmentDate: string;
  serviceType: string;
  message?: string;
  adminMessage?: string; // Message personnalisé de l'admin
  vehicleInfo?: {
    make: string;
    model: string;
    year: number;
    price: number;
  };
}

// Fonction helper pour les labels des services
const getServiceTypeLabel = (serviceType: string): string => {
  const labels: Record<string, string> = {
    test_drive: '🚗 Essai du véhicule',
    inspection: '🔍 Inspection technique',
    meeting: '🤝 Rendez-vous commercial',
    other: '📋 Autre demande'
  };
  return labels[serviceType] || serviceType;
};

// Template HTML pour notification au propriétaire
const getOwnerNotificationHTML = (data: AppointmentEmailData) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 30px; }
        .appointment-card { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; }
        .info-row { display: flex; justify-content: space-between; margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .label { font-weight: 600; color: #4a5568; }
        .value { color: #2d3748; }
        .vehicle-info { background: #fef7f0; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #f6ad55; }
        .cta-button { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; font-weight: 600; }
        .footer { background: #2d3748; color: #a0aec0; padding: 20px; text-align: center; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 Nouvelle Demande de RDV</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0;">Cayennefit - Véhicules de Luxe</p>
        </div>
        
        <div class="content">
            <p>Bonjour,</p>
            <p>Une nouvelle demande de rendez-vous a été soumise sur votre site.</p>
            
            <div class="appointment-card">
                <h3 style="margin-top: 0; color: #2d3748;">📅 Détails du Rendez-vous</h3>
                
                <div class="info-row">
                    <span class="label">👤 Client :</span>
                    <span class="value">${data.clientName}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">📧 Email :</span>
                    <span class="value">${data.clientEmail}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">📱 Téléphone :</span>
                    <span class="value">${data.clientPhone}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">🗓️ Date/Heure :</span>
                    <span class="value">${data.appointmentDate}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">🔧 Service :</span>
                    <span class="value">${getServiceTypeLabel(data.serviceType)}</span>
                </div>
                
                ${data.message ? `
                <div class="info-row">
                    <span class="label">💬 Message :</span>
                    <span class="value">${data.message}</span>
                </div>
                ` : ''}
            </div>
            
            ${data.vehicleInfo ? `
            <div class="vehicle-info">
                <h3 style="margin-top: 0; color: #2d3748;">🚙 Véhicule concerné</h3>
                <p><strong>${data.vehicleInfo.make} ${data.vehicleInfo.model} ${data.vehicleInfo.year}</strong></p>
                <p>Prix: <strong>${data.vehicleInfo.price.toLocaleString()} €</strong></p>
            </div>
            ` : ''}
            
            <p>Pour gérer cette demande, connectez-vous à votre interface d'administration :</p>
            <a href="https://shop-your-car-v2.vercel.app/admin/rendez-vous" class="cta-button">
                Gérer les Rendez-vous
            </a>
        </div>
        
        <div class="footer">
            <p>Cayennefit - Système de Gestion des Rendez-vous</p>
            <p>Cet email a été généré automatiquement.</p>
        </div>
    </div>
</body>
</html>
`;

// Template HTML pour confirmation client
const getClientConfirmationHTML = (data: AppointmentEmailData) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 30px; }
        .confirmation-card { background: #f0fff4; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #48bb78; }
        .info-row { display: flex; justify-content: space-between; margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .label { font-weight: 600; color: #4a5568; }
        .value { color: #2d3748; }
        .vehicle-info { background: #fef7f0; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #f6ad55; }
        .contact-info { background: #ebf4ff; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #4299e1; }
        .footer { background: #2d3748; color: #a0aec0; padding: 20px; text-align: center; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Rendez-vous Confirmé</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0;">Cayennefit - Véhicules de Luxe</p>
        </div>
        
        <div class="content">
            <p>Bonjour <strong>${data.clientName}</strong>,</p>
            <p>Nous avons le plaisir de confirmer votre rendez-vous chez Cayennefit.</p>
            
            ${data.adminMessage ? `
            <div style="background: #e6fffa; border-radius: 8px; padding: 15px; margin: 20px 0; border-left: 4px solid #38b2ac;">
                <h4 style="margin-top: 0; color: #2d3748; font-size: 16px;">💬 Message personnalisé</h4>
                <p style="margin: 0; color: #2d3748; font-style: italic;">"${data.adminMessage}"</p>
            </div>
            ` : ''}
            
            <div class="confirmation-card">
                <h3 style="margin-top: 0; color: #2d3748;">📅 Votre Rendez-vous Confirmé</h3>
                
                <div class="info-row">
                    <span class="label">🗓️ Date/Heure :</span>
                    <span class="value">${data.appointmentDate}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">🔧 Service :</span>
                    <span class="value">${getServiceTypeLabel(data.serviceType)}</span>
                </div>
                
                ${data.message ? `
                <div class="info-row">
                    <span class="label">💬 Votre message :</span>
                    <span class="value">${data.message}</span>
                </div>
                ` : ''}
            </div>
            
            ${data.vehicleInfo ? `
            <div class="vehicle-info">
                <h3 style="margin-top: 0; color: #2d3748;">🚙 Véhicule</h3>
                <p><strong>${data.vehicleInfo.make} ${data.vehicleInfo.model} ${data.vehicleInfo.year}</strong></p>
                <p>Prix: <strong>${data.vehicleInfo.price.toLocaleString()} €</strong></p>
            </div>
            ` : ''}
            
            <div class="contact-info">
                <h3 style="margin-top: 0; color: #2d3748;">📞 Informations de Contact</h3>
                <p><strong>Email :</strong> wissemkarboub@gmail.com</p>
                <p><strong>Téléphone :</strong> +33 6 XX XX XX XX</p>
            </div>
            
            <p><strong>Important :</strong> Si vous devez reporter ou annuler ce rendez-vous, merci de nous contacter au moins 24h à l'avance.</p>
            
            <p>Nous avons hâte de vous rencontrer !</p>
            
            <p>Cordialement,<br><strong>L'équipe Cayennefit</strong></p>
        </div>
        
        <div class="footer">
            <p>Cayennefit - Véhicules de Luxe d'Exception</p>
            <p>Cet email de confirmation a été généré automatiquement.</p>
        </div>
    </div>
</body>
</html>
`;

// Template HTML pour annulation client
const getClientCancellationHTML = (data: AppointmentEmailData) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 30px; }
        .cancellation-card { background: #fed7d7; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #f56565; }
        .info-row { display: flex; justify-content: space-between; margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .label { font-weight: 600; color: #4a5568; }
        .value { color: #2d3748; }
        .contact-info { background: #ebf4ff; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #4299e1; }
        .footer { background: #2d3748; color: #a0aec0; padding: 20px; text-align: center; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>❌ Rendez-vous Annulé</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0;">Cayennefit - Véhicules de Luxe</p>
        </div>
        
        <div class="content">
            <p>Bonjour <strong>${data.clientName}</strong>,</p>
            <p>Nous sommes désolés de vous informer que votre rendez-vous a été annulé.</p>
            
            ${data.adminMessage ? `
            <div style="background: #fef5e7; border-radius: 8px; padding: 15px; margin: 20px 0; border-left: 4px solid #f6ad55;">
                <h4 style="margin-top: 0; color: #2d3748; font-size: 16px;">💬 Message personnalisé</h4>
                <p style="margin: 0; color: #2d3748; font-style: italic;">"${data.adminMessage}"</p>
            </div>
            ` : ''}
            
            <div class="cancellation-card">
                <h3 style="margin-top: 0; color: #2d3748;">📅 Rendez-vous Annulé</h3>
                
                <div class="info-row">
                    <span class="label">🗓️ Date/Heure :</span>
                    <span class="value">${data.appointmentDate}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">🔧 Service :</span>
                    <span class="value">${getServiceTypeLabel(data.serviceType)}</span>
                </div>
            </div>
            
            <div class="contact-info">
                <h3 style="margin-top: 0; color: #2d3748;">📞 Nous Contacter</h3>
                <p><strong>Email :</strong> wissemkarboub@gmail.com</p>
                <p><strong>Téléphone :</strong> +33 6 XX XX XX XX</p>
                <p>N'hésitez pas à nous contacter pour reprogrammer un nouveau rendez-vous.</p>
            </div>
            
            <p>Nous espérons avoir l'occasion de vous rencontrer prochainement.</p>
            
            <p>Cordialement,<br><strong>L'équipe Cayennefit</strong></p>
        </div>
        
        <div class="footer">
            <p>Cayennefit - Véhicules de Luxe d'Exception</p>
            <p>Cet email a été généré automatiquement.</p>
        </div>
    </div>
</body>
</html>
`;

// Template HTML pour notification de réception client (pas de confirmation)
const getClientReceiptHTML = (data: AppointmentEmailData) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 30px; }
        .receipt-card { background: #ebf8ff; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #4299e1; }
        .info-row { display: flex; justify-content: space-between; margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .label { font-weight: 600; color: #4a5568; }
        .value { color: #2d3748; }
        .vehicle-info { background: #fef7f0; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #f6ad55; }
        .contact-info { background: #f0fff4; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #48bb78; }
        .warning-box { background: #fffbeb; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #f59e0b; }
        .footer { background: #2d3748; color: #a0aec0; padding: 20px; text-align: center; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📨 Demande Reçue</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0;">Cayennefit - Véhicules de Luxe</p>
        </div>
        
        <div class="content">
            <p>Bonjour <strong>${data.clientName}</strong>,</p>
            <p>Nous avons bien reçu votre demande de rendez-vous. Notre équipe va l'examiner et vous contactera sous 24h pour la confirmer.</p>
            
            <div class="receipt-card">
                <h3 style="margin-top: 0; color: #2d3748;">📋 Récapitulatif de votre demande</h3>
                
                <div class="info-row">
                    <span class="label">🗓️ Date/Heure souhaitée :</span>
                    <span class="value">${data.appointmentDate}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">🔧 Service demandé :</span>
                    <span class="value">${getServiceTypeLabel(data.serviceType)}</span>
                </div>
                
                ${data.message ? `
                <div class="info-row">
                    <span class="label">💬 Votre message :</span>
                    <span class="value">${data.message}</span>
                </div>
                ` : ''}
            </div>
            
            ${data.vehicleInfo ? `
            <div class="vehicle-info">
                <h3 style="margin-top: 0; color: #2d3748;">🚙 Véhicule concerné</h3>
                <p><strong>${data.vehicleInfo.make} ${data.vehicleInfo.model} ${data.vehicleInfo.year}</strong></p>
                <p>Prix: <strong>${data.vehicleInfo.price.toLocaleString()} €</strong></p>
            </div>
            ` : ''}
            
            <div class="warning-box">
                <h4 style="margin-top: 0; color: #92400e;">⏳ Statut : En attente de confirmation</h4>
                <p style="margin: 0; color: #92400e;">Votre rendez-vous n'est pas encore confirmé. Nous vous contacterons rapidement pour finaliser les détails.</p>
            </div>
            
            <div class="contact-info">
                <h3 style="margin-top: 0; color: #2d3748;">📞 Nous contacter</h3>
                <p><strong>Email :</strong> wissemkarboub@gmail.com</p>
                <p><strong>Téléphone :</strong> +33 6 XX XX XX XX</p>
                <p>Pour toute question urgente, n'hésitez pas à nous appeler.</p>
            </div>
            
            <p>Merci de votre confiance,<br>
            <strong>L'équipe Cayennefit</strong></p>
        </div>
        
        <div class="footer">
            <p>Cayennefit - Véhicules d'Exception</p>
            <p>Cet email confirme la réception de votre demande.</p>
        </div>
    </div>
</body>
</html>
`;

// Envoyer notification au propriétaire avec Resend
export const sendOwnerNotificationResend = async (data: AppointmentEmailData): Promise<boolean> => {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Cayennefit <onboarding@resend.dev>', // Domaine de test Resend (gratuit)
      to: ['wissemkarboub@gmail.com'],
      replyTo: data.clientEmail, // Quand vous répondez, ça va directement au client
      subject: `🚗 Nouvelle demande de RDV - ${data.clientName}`,
      html: getOwnerNotificationHTML(data),
    });

    if (error) {
      console.error('Erreur Resend propriétaire:', error);
      return false;
    }

    console.log('Email propriétaire envoyé avec succès:', result);
    return true;
  } catch (error) {
    console.error('Erreur envoi email propriétaire:', error);
    return false;
  }
};

// Envoyer confirmation au client avec Resend
export const sendClientConfirmationResend = async (data: AppointmentEmailData): Promise<boolean> => {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Cayennefit <onboarding@resend.dev>', // Domaine de test Resend (gratuit)
      to: [data.clientEmail],
      subject: `✅ Rendez-vous confirmé - Cayennefit`,
      html: getClientConfirmationHTML(data),
    });

    if (error) {
      console.error('Erreur Resend client:', error);
      return false;
    }

    console.log('Email client envoyé avec succès:', result);
    return true;
  } catch (error) {
    console.error('Erreur envoi email client:', error);
    return false;
  }
};

// Envoyer annulation au client avec Resend
export const sendClientCancellationResend = async (data: AppointmentEmailData): Promise<boolean> => {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Cayennefit <onboarding@resend.dev>', // Domaine de test Resend (gratuit)
      to: [data.clientEmail],
      subject: `❌ Rendez-vous annulé - Cayennefit`,
      html: getClientCancellationHTML(data),
    });

    if (error) {
      console.error('Erreur Resend annulation client:', error);
      return false;
    }

    console.log('Email annulation client envoyé avec succès:', result);
    return true;
  } catch (error) {
    console.error('Erreur envoi email annulation client:', error);
    return false;
  }
};

// Fonction pour envoyer une notification de réception au client (pas de confirmation)
export const sendClientReceiptNotificationResend = async (data: AppointmentEmailData): Promise<boolean> => {
  try {
    await resend.emails.send({
      from: 'Cayennefit <onboarding@resend.dev>',
      to: [data.clientEmail],
      subject: '📨 Demande de rendez-vous reçue - Cayennefit',
      html: getClientReceiptHTML(data),
    });

    console.log('✅ Email de réception envoyé au client:', data.clientEmail);
    return true;
  } catch (error) {
    console.error('❌ Erreur envoi email réception client:', error);
    return false;
  }
};

// Fonction de test de la configuration Resend
export const testResendConfiguration = async (): Promise<boolean> => {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Cayennefit <onboarding@resend.dev>', // Domaine de test Resend (gratuit)
      to: ['wissemkarboub@gmail.com'],
      subject: '🧪 Test de configuration Resend',
      html: '<h1>Test réussi !</h1><p>Votre configuration Resend fonctionne parfaitement.</p>',
    });

    if (error) {
      console.error('Erreur test Resend:', error);
      return false;
    }

    console.log('Test Resend réussi:', result);
    return true;
  } catch (error) {
    console.error('Erreur test Resend:', error);
    return false;
  }
}; 