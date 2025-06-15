# 🚨 Dépannage Erreur 403 Resend

## Votre problème : Erreur 403 sur `/emails`

L'erreur 403 que vous voyez signifie que Resend refuse votre requête. Voici comment la résoudre :

## ✅ Solutions étape par étape

### 1. Vérifier votre clé API Resend

**Dans votre fichier `.env.local`**, vérifiez que vous avez :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
```

⚠️ **Important** : La clé doit commencer par `re_`

### 2. Obtenir une VRAIE clé API

1. **Allez sur [resend.com](https://resend.com)**
2. **Créez un compte gratuit** (si pas déjà fait)
3. **Allez dans "API Keys"**
4. **Cliquez "Create API Key"**
5. **Copiez la clé** (commence par `re_`)
6. **Remplacez dans `.env.local`**

### 3. Vérifier le fichier `.env.local`

Votre fichier doit ressembler à ça :

```env
# Configuration Resend (GRATUIT)
RESEND_API_KEY=re_votre_vraie_cle_ici

# URL de l'application
NEXTAUTH_URL=http://localhost:3000

# Base de données
DATABASE_URL="file:./dev.db"
```

### 4. Redémarrer complètement

```bash
# Arrêter le serveur (Ctrl+C)
# Puis redémarrer
npm run dev
```

### 5. Tester immédiatement

1. **Allez sur votre site**
2. **Créez un rendez-vous**
3. **Vérifiez votre email** `wissemkarboub@gmail.com`

## 🎯 Réponse à votre question sur Vercel

### ✅ BONNE NOUVELLE : Aucun domaine personnalisé requis !

- **Vercel gratuit** : `votre-app.vercel.app` ✅ Fonctionne parfaitement
- **Domaine Resend** : `onboarding@resend.dev` ✅ Gratuit et inclus
- **Emails sortants** : ✅ Fonctionnent immédiatement

### 📧 Ce qui va marcher :

```
De: Cayennefit <onboarding@resend.dev>
À: wissemkarboub@gmail.com
Sujet: 🚗 Nouvelle demande de RDV - [Nom du client]
```

## 🔍 Diagnostic rapide

Si ça ne marche toujours pas, vérifiez :

1. ✅ Clé API commence par `re_`
2. ✅ Fichier `.env.local` à la racine du projet
3. ✅ Serveur redémarré après modification
4. ✅ Compte Resend créé et vérifié

## 💡 Pourquoi c'est mieux que Gmail

| Aspect              | Gmail                     | Resend + Vercel            |
| ------------------- | ------------------------- | -------------------------- |
| **Configuration**   | ❌ 2FA + mot de passe app | ✅ Juste une clé API       |
| **Domaine requis**  | ❌ Compliqué              | ✅ Aucun domaine requis    |
| **Avec Vercel**     | ❌ Problèmes fréquents    | ✅ Parfaitement compatible |
| **Fiabilité**       | ❌ Bloquages fréquents    | ✅ Conçu pour les apps     |
| **Limite gratuite** | ❌ Très limitée           | ✅ 3000 emails/mois        |

## 🚀 Une fois que ça marche

Vous recevrez automatiquement :

- ✅ **Email immédiat** à chaque nouvelle demande de RDV
- ✅ **Email de confirmation** envoyé au client quand vous validez
- ✅ **Templates HTML professionnels**
- ✅ **Aucune limite technique**

---

**🎯 Résumé** : Resend + Vercel = Solution parfaite, aucun domaine personnalisé requis !
