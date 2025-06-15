# 🚀 Configuration Resend (Alternative GRATUITE à Gmail)

## Pourquoi Resend ?

- ✅ **100% GRATUIT** jusqu'à 3000 emails/mois
- ✅ **Configuration ultra-simple** (5 minutes)
- ✅ **Pas de mot de passe d'application** compliqué
- ✅ **Conçu pour les développeurs**

## 📝 Étapes de configuration

### 1. Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Cliquez sur "Sign up"
3. Créez votre compte (gratuit)

### 2. Obtenir votre clé API

1. Une fois connecté, allez dans "API Keys"
2. Cliquez sur "Create API Key"
3. Donnez un nom : "Cayennefit"
4. Copiez la clé générée (commence par `re_`)

### 3. Créer le fichier `.env.local`

Créez un fichier `.env.local` à la racine de votre projet avec :

```env
# Configuration Resend (GRATUIT)
RESEND_API_KEY=re_votre_cle_api_ici

# URL de l'application
NEXTAUTH_URL=http://localhost:3000

# Base de données
DATABASE_URL="file:./dev.db"
```

### 4. Domaine (AUCUNE configuration nécessaire)

✅ **Avec Vercel** : Votre site `votre-app.vercel.app` fonctionne parfaitement
✅ **Domaine de test** : Nous utilisons `onboarding@resend.dev` (gratuit)
✅ **Aucun domaine personnalisé requis** pour commencer

### 5. Redémarrer le serveur

```bash
npm run dev
```

## 🎯 C'est tout !

Vos emails fonctionneront immédiatement avec :

- ✅ **Email au propriétaire** : `wissemkarboub@gmail.com` à chaque nouvelle demande
- ✅ **Email au client** : Confirmation automatique quand vous validez le RDV

## 🔧 Avantages de Resend vs Gmail

| Fonctionnalité       | Gmail          | Resend               |
| -------------------- | -------------- | -------------------- |
| Configuration        | ❌ Complexe    | ✅ Simple            |
| Authentification 2FA | ❌ Obligatoire | ✅ Pas besoin        |
| Mot de passe app     | ❌ Requis      | ✅ Juste une clé API |
| Limite gratuite      | ❌ Limitée     | ✅ 3000 emails/mois  |
| Fiabilité            | ✅ Bonne       | ✅ Excellente        |
| Support développeur  | ❌ Basique     | ✅ Optimisé          |

## 🆘 Dépannage

Si ça ne marche pas :

1. Vérifiez que la clé API commence par `re_`
2. Vérifiez que le fichier `.env.local` est à la racine
3. Redémarrez le serveur complètement
4. Vérifiez les logs dans la console

## 📧 Test rapide

Une fois configuré, testez en créant un rendez-vous depuis votre site.
Vous devriez recevoir l'email immédiatement !

---

**💡 Conseil :** Resend est utilisé par des milliers de développeurs et est beaucoup plus simple que Gmail pour les applications web.
