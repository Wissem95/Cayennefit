# 🆓 Forward Email - 100% GRATUIT

## 🎯 **Setup complet en 15 minutes - 0€**

### **Étape 1 : Obtenez un domaine GRATUIT**

1. **Allez sur [Freenom.com](https://freenom.com)**
2. **Cherchez un domaine** : `cayennefit.tk` ou `cayennefit.ml`
3. **Sélectionnez "Get it now!"** → 12 mois GRATUIT
4. **Créez un compte** et finalisez l'inscription

### **Étape 2 : Configurez Forward Email**

1. **Allez sur [forwardemail.net](https://forwardemail.net)**
2. **Créez un compte GRATUIT**
3. **Ajoutez votre domaine** (`cayennefit.tk`)
4. **Notez les DNS Records** à ajouter

### **Étape 3 : Configurez DNS chez Freenom**

1. **Retournez sur Freenom** → Services → My Domains
2. **Cliquez "Manage Domain"** → Management Tools → Nameservers
3. **Sélectionnez "Use Freenom DNS"**
4. **Ajoutez ces records** :

```
Type: MX  | Name: @  | Target: mx1.forwardemail.net  | Priority: 10
Type: MX  | Name: @  | Target: mx2.forwardemail.net  | Priority: 10
Type: TXT | Name: @  | Target: forward-email=wissemkarboub@gmail.com
```

### **Étape 4 : Obtenez vos identifiants SMTP**

1. **Dans Forward Email** → Settings → Domains
2. **Vérifiez que votre domaine est validé** ✅
3. **Allez dans "Aliases"** → Créez `contact@cayennefit.tk`
4. **Allez dans "SMTP"** → Générez un mot de passe

### **Étape 5 : Configuration `.env.local`**

```env
# Forward Email GRATUIT
FORWARD_EMAIL_USER=contact@cayennefit.tk
FORWARD_EMAIL_PASSWORD=le-mot-de-passe-smtp-genere
DOMAIN_NAME=cayennefit.tk
OWNER_EMAIL=wissemkarboub@gmail.com

# Plus besoin de Resend !
# RESEND_API_KEY=...
```

### **Étape 6 : Remplacez le fichier email**

**Remplacez le contenu de `lib/email-resend.ts`** par le contenu de `lib/email-resend-forward-only.ts`

Ou utilisez cette commande :

```bash
mv lib/email-resend-forward-only.ts lib/email-resend.ts
```

### **Étape 7 : Test**

1. **Redémarrez votre serveur** :

```bash
npm run dev
```

2. **Testez l'API** :

```bash
curl "http://localhost:3000/api/test-email?email=test@example.com"
```

3. **Créez un vrai RDV** avec un email différent du vôtre

## ✅ **Avantages de cette solution :**

- 🆓 **100% gratuit** (domaine + email)
- 📧 **Emails professionnels** : `contact@cayennefit.tk`
- 🚀 **Délivrabilité excellente**
- 🔧 **Simple à configurer**
- 📊 **Pas de limite d'envoi** stricte
- ⚡ **Configuration en 15 minutes**

## 🛠️ **Si vous avez des problèmes :**

### **DNS ne se propage pas :**

- Attendez 24h maximum
- Vérifiez sur [whatsmydns.net](https://www.whatsmydns.net/)

### **SMTP ne fonctionne pas :**

- Vérifiez le domaine dans Forward Email
- Régénérez le mot de passe SMTP
- Vérifiez `.env.local`

### **Emails n'arrivent pas :**

- Vérifiez les spam/indésirables
- Testez avec votre propre email d'abord

## 📞 **Support :**

- **Forward Email** : Support gratuit sur leur site
- **Freenom** : FAQ détaillée
- **Logs de votre app** : Regardez la console pour les erreurs

## 🎉 **Résultat final :**

Vous aurez :

- ✅ Emails depuis `contact@cayennefit.tk`
- ✅ Réception sur `wissemkarboub@gmail.com`
- ✅ Clients reçoivent leurs emails
- ✅ **Coût total : 0€**

**C'est parti ! 🚀**
