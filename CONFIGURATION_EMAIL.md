# 🔧 Configuration Email Forward Email (GRATUIT)

## 🎯 **Votre fichier `email-resend.ts` a été adapté !**

Le fichier utilise maintenant **Forward Email** (gratuit) au lieu de Resend avec un fallback Gmail SMTP.

## ⚙️ **Configuration requise :**

### **Étape 1 : Ajoutez ces variables à votre `.env.local` :**

```env
# Configuration Forward Email (GRATUIT)
FORWARD_EMAIL_USER=contact@votre-domaine.com
FORWARD_EMAIL_PASSWORD=votre-mot-de-passe-genere
DOMAIN_NAME=votre-domaine.com

# Configuration Gmail SMTP (backup)
GMAIL_USER=wissemkarboub@gmail.com
GMAIL_APP_PASSWORD=votre-mot-de-passe-app-gmail

# Email propriétaire
OWNER_EMAIL=wissemkarboub@gmail.com
```

## 🚀 **Option 1 : Forward Email (RECOMMANDÉ)**

### **Avantages :**

- ✅ **100% gratuit** (pas de limite stricte)
- ✅ **Emails professionnels** depuis votre domaine
- ✅ **Configuration DNS simple**
- ✅ **Excellent support**

### **Configuration :**

1. **Achetez un domaine** (ex: `cayennefit.com`) - ~10€/an
2. **Configurez DNS dans Vercel** :
   - Allez dans Vercel → Votre projet → Settings → Domains
   - Ajoutez votre domaine
   - Configurez les DNS Records :

```
Type: MX  | Name: @  | Value: mx1.forwardemail.net  | Priority: 10
Type: MX  | Name: @  | Value: mx2.forwardemail.net  | Priority: 10
Type: TXT | Name: @  | Value: forward-email=wissemkarboub@gmail.com
```

3. **Créez un alias email** :

   - Allez sur https://forwardemail.net
   - Créez un compte gratuit
   - Configurez `contact@cayennefit.com` → `wissemkarboub@gmail.com`

4. **Obtenez mot de passe SMTP** :

   - Dans Forward Email, allez dans Settings → SMTP
   - Générez un mot de passe pour `contact@cayennefit.com`

5. **Mettez à jour `.env.local`** :

```env
FORWARD_EMAIL_USER=contact@cayennefit.com
FORWARD_EMAIL_PASSWORD=le-mot-de-passe-genere
DOMAIN_NAME=cayennefit.com
```

## 🔄 **Option 2 : Gmail SMTP (Simple)**

Si vous préférez rester sur Gmail uniquement :

1. **Activez 2FA** sur votre Gmail
2. **Créez un mot de passe d'application** :
   - Google Account → Security → 2-Step Verification → App passwords
   - Générez un mot de passe pour "Mail"
3. **Mettez à jour `.env.local`** :

```env
GMAIL_USER=wissemkarboub@gmail.com
GMAIL_APP_PASSWORD=votre-mot-de-passe-app-16-caracteres
```

## 🧪 **Test de la configuration :**

1. **Lancez votre serveur** :

```bash
npm run dev
```

2. **Testez l'API** :

```bash
curl "http://localhost:3000/api/test-email?email=test@example.com"
```

3. **Vérifiez les logs** dans votre terminal pour voir si ça fonctionne

## 📊 **Fonctionnement du système :**

Le système essaie **automatiquement** :

1. **Forward Email** en premier (si configuré)
2. **Gmail SMTP** en fallback (si Forward Email échoue)
3. **Erreur** si les deux échouent

## ✅ **Avantages de cette configuration :**

- 🆓 **100% gratuit** (Forward Email + Gmail)
- 📧 **Emails professionnels** depuis votre domaine
- 🔄 **Fallback automatique** si un service échoue
- 🚀 **Délivrabilité optimale**
- 🔧 **Configuration simple**

## ❓ **Quelle option choisir ?**

- **Forward Email** : Plus professionnel, emails depuis votre domaine
- **Gmail SMTP** : Plus simple, emails depuis votre Gmail

**Recommandation** : Commencez par Gmail SMTP pour tester, puis passez à Forward Email quand vous aurez un domaine.

## 🚨 **Important :**

N'oubliez pas de **redémarrer votre serveur** après avoir modifié `.env.local` !

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez :
npm run dev
```
