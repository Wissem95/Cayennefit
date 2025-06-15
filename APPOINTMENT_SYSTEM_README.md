# 🗓️ Système de Prise de Rendez-vous - Cayennefit

## Vue d'ensemble

Ce système de prise de rendez-vous professionnel et **100% gratuit** permet à vos clients de réserver facilement des créneaux pour :

- ✅ Essais de véhicules
- ✅ Inspections techniques
- ✅ Rendez-vous commerciaux
- ✅ Autres demandes personnalisées

## 🚀 Fonctionnalités Principales

### ✨ Modal Élégant (Pas de page dédiée)

- Interface moderne et responsive
- Animations fluides avec Framer Motion
- Calendrier interactif intégré
- Auto-remplissage véhicule selon le contexte
- Validation complète des formulaires

### 📧 Notifications Email Automatiques

- **Gmail SMTP 100% gratuit** (pas de service payant)
- Email automatique au propriétaire à chaque nouvelle demande
- Email de confirmation automatique au client (quand confirmé)
- Templates HTML élégants et professionnels

### 🎛️ Interface Admin Complète

- Page dédiée `/admin/rendez-vous`
- Gestion de tous les statuts (pending, confirmed, cancelled, completed)
- Actions en un clic (confirmer, refuser, reporter, terminer)
- Filtres par date, statut, client
- Historique complet avec recherche

### 🔧 Intégration Facile

- Boutons prêts à l'emploi pour toutes les pages
- Composant `AppointmentSystem` tout-en-un
- Compatible avec toute l'architecture existante

## 📦 Installation et Configuration

### 1. Variables d'environnement

Ajoutez ces variables à votre fichier `.env` :

```env
# Configuration Gmail SMTP (100% gratuit)
GMAIL_USER="votre-email@gmail.com"
GMAIL_APP_PASSWORD="votre-mot-de-passe-application-gmail"
OWNER_EMAIL="admin@cayennefit.com"

# URL de base (pour les liens dans les emails)
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Configuration Gmail

1. **Activez la validation en 2 étapes** sur votre compte Gmail
2. **Générez un mot de passe d'application** :
   - Allez dans Paramètres Google → Sécurité
   - Validation en 2 étapes → Mots de passe d'application
   - Sélectionnez "Mail" et "Autre (nom personnalisé)"
   - Nommez-le "Cayennefit" et générez
   - Utilisez ce mot de passe dans `GMAIL_APP_PASSWORD`

### 3. Base de données

La base de données a été automatiquement mise à jour avec les nouveaux modèles :

- `Appointment` (rendez-vous)
- `AppointmentStatus` (enum des statuts)

## 🎨 Utilisation des Composants

### AppointmentSystem (Recommandé)

Le composant tout-en-un le plus simple à utiliser :

```tsx
import { AppointmentSystem } from '@/components';

// Usage basique
<AppointmentSystem />

// Avec un véhicule spécifique
<AppointmentSystem
  variant="luxury"
  vehicleInfo={{
    id: vehicle.id,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    images: vehicle.images
  }}
/>

// Personnalisé
<AppointmentSystem
  variant="primary"
  size="lg"
  text="Réserver un essai"
  className="w-full"
/>
```

### AppointmentButton (Bouton seul)

Pour plus de contrôle :

```tsx
import { AppointmentButton } from '@/components';

const [modalOpen, setModalOpen] = useState(false);

<AppointmentButton
  onClick={() => setModalOpen(true)}
  variant="secondary"
  size="md"
  text="📅 Prendre RDV"
/>;
```

### Variantes disponibles

- `primary` : Bleu/violet (par défaut)
- `secondary` : Gris élégant
- `minimal` : Blanc bordure
- `luxury` : Or/jaune premium

## 🔗 Intégrations Suggérées

### 1. Page d'accueil (Hero Section)

```tsx
// Dans votre Hero.tsx
<AppointmentSystem
  variant="luxury"
  size="lg"
  text="Réserver une visite"
  className="mt-8"
/>
```

### 2. Fiches véhicules

```tsx
// Dans VehicleCard.tsx ou VehicleDetails.tsx
<AppointmentSystem
  variant="primary"
  vehicleInfo={vehicle}
  text="Essayer ce véhicule"
/>
```

### 3. Navigation/Header

```tsx
// Dans Navbar.tsx
<AppointmentSystem variant="minimal" size="sm" text="RDV" showIcon={false} />
```

## 📊 API Endpoints

### Public

- `POST /api/appointments` - Créer un nouveau rendez-vous
- `GET /api/appointments` - Lister les rendez-vous (admin)

### Admin

- `GET /api/appointments/[id]` - Détails d'un rendez-vous
- `PATCH /api/appointments/[id]` - Actions (confirm, cancel, complete, reschedule)
- `DELETE /api/appointments/[id]` - Supprimer un rendez-vous

### Actions disponibles

```javascript
// Confirmer (envoie email au client)
fetch(`/api/appointments/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({ action: 'confirm', adminNotes: 'Confirmé par admin' }),
});

// Autres actions : 'cancel', 'complete', 'reschedule'
```

## 🎯 Interface Admin

Accédez à `/admin/rendez-vous` pour :

- ✅ Voir tous les rendez-vous en temps réel
- ✅ Filtrer par statut (pending, confirmed, etc.)
- ✅ Rechercher par nom/email/téléphone
- ✅ Actions en un clic sur chaque rendez-vous
- ✅ Pagination automatique
- ✅ Statistiques rapides

## 📧 Personnalisation des Emails

Les templates sont dans `/lib/email.ts` :

- `getOwnerNotificationTemplate()` - Email au propriétaire
- `getClientConfirmationTemplate()` - Email au client

Vous pouvez personnaliser :

- ✅ Design et couleurs
- ✅ Logo et branding
- ✅ Informations de contact
- ✅ Messages et textes

## 🔍 Types TypeScript

```typescript
interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  appointmentDate: string;
  serviceType: 'test_drive' | 'inspection' | 'meeting' | 'other';
  message?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'RESCHEDULED';
  vehicle?: {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    images: string[];
  };
}
```

## 🎨 Styles CSS

Le système utilise Tailwind CSS avec :

- ✅ Design responsive automatique
- ✅ Animations et transitions fluides
- ✅ Thème luxueux avec gradients
- ✅ Mode sombre compatible (si activé)

## 🚀 Performance

- ✅ Lazy loading des composants
- ✅ Optimisation des requêtes Prisma
- ✅ Emails envoyés en arrière-plan
- ✅ Validation côté client et serveur
- ✅ Cache automatique des données

## 🛠️ Maintenance

### Tests recommandés

1. **Test email** : Utilisez `testEmailConfiguration()` dans `/lib/email.ts`
2. **Test formulaire** : Vérifiez la création d'un rendez-vous
3. **Test admin** : Confirmez qu'un rendez-vous envoie l'email client

### Monitoring suggéré

- Logs des emails (console.log dans les fonctions)
- Monitoring des erreurs API
- Statistiques d'utilisation des rendez-vous

## 🔒 Sécurité

- ✅ Validation complète des données d'entrée
- ✅ Protection CSRF avec Next.js
- ✅ Sanitisation des emails HTML
- ✅ Rate limiting recommandé (à implémenter)

## 🎉 Avantages Business

### 💰 100% Gratuit

- Aucun coût mensuel
- Gmail SMTP gratuit (limite généreuse)
- Pas d'abonnement externe

### 📈 Conversion Optimisée

- Modal non-intrusif
- Processus simplifié en 3 clics
- Auto-remplissage intelligent

### 🏆 Professionnel

- Emails HTML élégants
- Interface admin moderne
- Branding cohérent

---

## 🔧 Support et Évolutions

Ce système est conçu pour être :

- ✅ **Extensible** : Ajoutez facilement de nouvelles fonctionnalités
- ✅ **Maintenable** : Code clean et bien documenté
- ✅ **Évolutif** : Base solide pour futures améliorations

### Évolutions possibles

- 📅 Intégration calendrier Google/Outlook
- 💬 SMS notifications (Twilio)
- 🔔 Notifications push
- 📊 Analytics avancées
- 🌐 Multi-langues

---

**🎯 Système prêt à l'emploi ! Commencez à recevoir des demandes de rendez-vous dès maintenant.**
