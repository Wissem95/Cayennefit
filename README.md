# 🚗 CAYENNEFIT - Plateforme de Vente de Véhicules de Luxe

Plateforme moderne de vente de véhicules haut de gamme avec interface admin complète.

## 🛠️ TechnologiE

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Base de données**: PostgreSQL + Prisma ORM
- **Authentification**: Session-based auth
- **Hébergement**: Compatible Vercel, Ionos, tous hébergeurs

## 🚀 Installation & Développement

### 1. Clonage et dépendances

```bash
git clone <repo-url>
cd CayennefitV2
npm install
```

### 2. Configuration base de données

#### Option A: PostgreSQL Local (Docker)

```bash
# Lancer PostgreSQL avec Docker
docker run --name cayenne-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=cayenne \
  -e POSTGRES_DB=cayennefit \
  -p 5432:5432 -d postgres:15

# Créer .env.local
echo 'DATABASE_URL="postgresql://cayenne:password@localhost:5432/cayennefit?schema=public"' > .env.local
```

#### Option C: Ionos

1. Activer PostgreSQL dans votre hébergement Ionos
2. Noter les informations de connexion
3. Configurer `.env.local`:

```bash
DATABASE_URL="postgresql://username:password@hostname:5432/database_name?sslmode=require"
```

### 3. Initialisation base de données

```bash
# Appliquer le schéma
npx prisma db push

# Générer le client Prisma
npx prisma generate

# Voir la base de données (optionnel)
npx prisma studio
```

### 4. Lancement

```bash
npm run dev
# Site: http://localhost:3000
# Admin: http://localhost:3000/admin/login
# Identifiants: admin / cayenne2024
```

## 🌐 Déploiement

### Vercel

```bash
# Connecter base Neon dans dashboard Vercel
vercel env add DATABASE_URL

# Déployer
vercel --prod
```

### Ionos

1. Uploader les fichiers
2. Configurer `DATABASE_URL` dans les variables d'environnement
3. Lancer `npx prisma db push` via SSH

### Autres hébergeurs

- Configurer PostgreSQL
- Définir `DATABASE_URL`
- Builder : `npm run build`
- Démarrer : `npm start`

## 📊 Fonctionnalités

### Interface Publique

- ✅ Catalogue véhicules avec filtres
- ✅ Recherche avancée
- ✅ Détails véhicules
- ✅ Design responsive luxueux

### Interface Admin

- ✅ Authentification sécurisée
- ✅ Ajout/modification véhicules
- ✅ Gestion images multiples
- ✅ Statistiques temps réel
- ✅ Historique des ventes

## 🔧 Scripts

```bash
npm run dev          # Développement
npm run build        # Build production
npm run start        # Démarrage production
npm run lint         # Vérification code

# Prisma
npx prisma studio    # Interface base de données
npx prisma db push   # Appliquer schéma
npx prisma generate  # Générer client
npx prisma reset     # Reset base (dev seulement)
```

## 📁 Structure

```
CayennefitV2/
├── app/                 # Pages Next.js
│   ├── admin/          # Interface admin
│   ├── api/            # API routes
│   └── vehicle/        # Pages véhicules
├── components/         # Composants React
├── lib/               # Utilitaires
│   ├── database.ts    # Service PostgreSQL
│   └── auth.ts        # Authentification
├── prisma/            # Configuration Prisma
│   └── schema.prisma  # Schéma base de données
├── types/             # Types TypeScript
└── public/            # Fichiers statiques
```

## 🐛 Dépannage

### Erreur connexion base

```bash
# Vérifier URL dans .env.local
echo $DATABASE_URL

# Tester connexion
npx prisma db pull
```

### Erreur Prisma Client

```bash
# Régénérer client
npx prisma generate

# Synchroniser schéma
npx prisma db push
```

### Reset complet (dev seulement)

```bash
npx prisma reset
npx prisma db push
npx prisma generate
```

## 📞 Support

Compatible avec tous les hébergeurs supportant PostgreSQL :

- ✅ Vercel (avec Neon)
- ✅ Ionos
- ✅ Heroku
- ✅ Railway
- ✅ PlanetScale
- ✅ Serveurs dédiés
