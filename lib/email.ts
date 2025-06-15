import nodemailer from 'nodemailer';

// Configuration du transport SMTP Gmail (100% gratuit)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Votre email Gmail
    pass: process.env.GMAIL_APP_PASSWORD, // Mot de passe d'application Gmail
  },
});

// Types pour les templates d'email
export interface AppointmentEmailData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  appointmentDate: string;
  serviceType: string;
  message?: string;
  vehicleInfo?: {
    make: string;
    model: string;
    year: number;
    price: number;
  };
}

// Template HTML pour notification au propriétaire
const getOwnerNotificationTemplate = (data: AppointmentEmailData) => `
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
const getClientConfirmationTemplate = (data: AppointmentEmailData) => `
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
                <p><strong>Adresse :</strong> [Votre adresse]</p>
                <p><strong>Téléphone :</strong> [Votre numéro]</p>
                <p><strong>Email :</strong> [Votre email]</p>
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

// Envoyer notification au propriétaire
export const sendOwnerNotification = async (data: AppointmentEmailData): Promise<boolean> => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'wissemkarboub@gmail.com',
      subject: `🚗 Nouvelle demande de RDV - ${data.clientName}`,
      html: getOwnerNotificationTemplate(data),
    };

    await transporter.sendMail(mailOptions);
    console.log('Email de notification propriétaire envoyé avec succès');
    return true;
  } catch (error) {
    console.error('Erreur envoi email propriétaire:', error);
    return false;
  }
};

// Envoyer confirmation au client
export const sendClientConfirmation = async (data: AppointmentEmailData): Promise<boolean> => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: data.clientEmail,
      subject: `✅ Rendez-vous confirmé - Cayennefit`,
      html: getClientConfirmationTemplate(data),
    };

    await transporter.sendMail(mailOptions);
    console.log('Email de confirmation client envoyé avec succès');
    return true;
  } catch (error) {
    console.error('Erreur envoi email client:', error);
    return false;
  }
};

// Fonction de test de la configuration email
export const testEmailConfiguration = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('Configuration email validée avec succès');
    return true;
  } catch (error) {
    console.error('Erreur configuration email:', error);
    return false;
  }
}; 