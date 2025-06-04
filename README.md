# ShopYourCar V2 - Système de Vente de Véhicules

## 🚗 Description

ShopYourCar V2 est une application web moderne de vente de véhicules d'occasion, construite avec Next.js 13, TypeScript et Tailwind CSS. Le système remplace l'ancien modèle de location par un système complet de vente avec panel d'administration.

## ✨ Fonctionnalités Principales

### 🏠 Page d'Accueil

- **Catalogue de véhicules** : Affichage des véhicules disponibles à la vente
- **Système de recherche** : Filtrage par marque, modèle, année, carburant
- **Cartes véhicules** : Affichage avec prix, images, caractéristiques
- **Interface moderne** : Design responsive et animations fluides

### 👨‍💼 Panel d'Administration

- **Gestion complète des véhicules** : Créer, modifier, supprimer
- **Statistiques en temps réel** : Nombre total, disponibles, prix moyen
- **Formulaire complet** : Toutes les caractéristiques du véhicule
- **Interface intuitive** : Confirmation de suppression, validation des données

### 🚙 Gestion des Véhicules

- **Informations détaillées** : Marque, modèle, année, prix, kilométrage
- **Caractéristiques techniques** : Consommation, transmission, carburant
- **Galerie d'images** : Support multi-images avec navigation
- **Descriptions personnalisées** : Texte libre pour chaque véhicule

## 🛠️ Technologies Utilisées

- **Framework** : Next.js 13 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **UI Components** : Headless UI
- **Base de données** : Système local (à migrer vers une vraie DB)
- **Images** : Next.js Image Optimization

## 📁 Structure du Projet

```
ShopYourCarV2/
├── app/
│   ├── page.tsx              # Page d'accueil (catalogue)
│   ├── admin/
│   │   └── page.tsx          # Panel d'administration
│   ├── layout.tsx            # Layout principal
│   └── globals.css           # Styles globaux
├── components/
│   ├── VehicleCard.tsx       # Carte de véhicule
│   ├── VehicleDetails.tsx    # Modal de détails
│   ├── AdminVehicleForm.tsx  # Formulaire admin
│   ├── Hero.tsx              # Section hero
│   ├── Navbar.tsx            # Navigation
│   └── ...                   # Autres composants
├── utils/
│   └── vehicles.ts           # Gestion des données véhicules
├── types/
│   └── index.ts              # Types TypeScript
└── public/                   # Assets statiques
```

## 🚀 Installation et Démarrage

1. **Cloner le projet**

```bash
git clone [url-du-repo]
cd ShopYourCarV2
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer le serveur de développement**

```bash
npm run dev
```

4. **Ouvrir l'application**

- Page d'accueil : http://localhost:3000
- Panel admin : http://localhost:3000/admin

## 📋 Utilisation

### Pour les Visiteurs

1. Parcourir le catalogue de véhicules sur la page d'accueil
2. Utiliser les filtres pour affiner la recherche
3. Cliquer sur "Voir Détails" pour plus d'informations
4. Consulter les caractéristiques et images

### Pour les Administrateurs

1. Accéder au panel admin via le lien dans la navbar
2. Voir les statistiques en temps réel
3. Ajouter un nouveau véhicule avec le bouton "Nouveau Véhicule"
4. Modifier un véhicule existant avec le bouton "Modifier"
5. Supprimer un véhicule (avec confirmation)

## 🔧 Configuration

### Ajout d'Images

Pour l'instant, le système utilise `/pattern.png` comme placeholder. Pour ajouter de vraies images :

1. Placer les images dans le dossier `public/`
2. Modifier le champ `images` dans `utils/vehicles.ts`
3. Ou implémenter un système d'upload dans le formulaire admin

### Base de Données

Le système utilise actuellement une base de données en mémoire. Pour la production :

1. Configurer une vraie base de données (PostgreSQL, MongoDB, etc.)
2. Remplacer les fonctions dans `utils/vehicles.ts`
3. Ajouter les variables d'environnement nécessaires

## 🎨 Personnalisation

### Styles

- Modifier `app/globals.css` pour les styles globaux
- Utiliser les classes Tailwind dans les composants
- Personnaliser les couleurs dans `tailwind.config.ts`

### Fonctionnalités

- Ajouter de nouveaux champs dans `types/index.ts`
- Étendre les formulaires dans `AdminVehicleForm.tsx`
- Modifier les filtres dans les composants de recherche

## 🔄 Migrations depuis l'Ancien Système

### Changements Principaux

- ❌ **Supprimé** : API externe Cars by API Ninjas
- ❌ **Supprimé** : Système de calcul de prix de location
- ❌ **Supprimé** : Génération automatique d'images
- ✅ **Ajouté** : Base de données locale de véhicules
- ✅ **Ajouté** : Panel d'administration complet
- ✅ **Ajouté** : Système de prix de vente fixe
- ✅ **Ajouté** : Gestion manuelle des images

### Composants Remplacés

- `CarCard` → `VehicleCard`
- `CarDetails` → `VehicleDetails`
- `fetchCars()` → `fetchVehicles()`

## 🐛 Dépannage

### Erreurs Communes

1. **Images non affichées** : Vérifier que `/pattern.png` existe
2. **Erreurs TypeScript** : Vérifier les imports dans `components/index.ts`
3. **Styles manquants** : Vérifier que Tailwind CSS est configuré

### Performance

- Les images sont optimisées automatiquement par Next.js
- La base de données en mémoire est rapide mais temporaire
- Utiliser `npm run build` pour la production

## 📝 TODO / Améliorations Futures

- [ ] Système d'upload d'images
- [ ] Base de données persistante
- [ ] Authentification administrateur
- [ ] Système de favoris
- [ ] Recherche avancée avec prix
- [ ] Export des données
- [ ] Notifications en temps réel
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec ❤️ en utilisant Next.js et TypeScript**
