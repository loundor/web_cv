# 🚀 Déploiement du CV - Node.js Direct

## Ceci est un exemple a ne pas suivre!!! Il faudra évidemment adapter la configuration avec ton propre nom de domaine et modifier le fichier `server.js` en conséquence. Alors oui, c'est totalement automatisable, mais ce projet a été fait à la volée et j'ai eu une grosse flemme de m'en occuper...

## Configuration DNS

Configurer les enregistrements DNS chez votre fournisseur :

```
cv.loundor.com  →  A  →  [VOTRE_IP_SERVEUR]
loundor.com     →  A  →  [VOTRE_IP_SERVEUR]
```

✅ DNS déjà configuré

## 1. Obtenir un certificat SSL (Let's Encrypt)

### Installation de Certbot
```bash
sudo apt update
sudo apt install certbot
```

### Obtenir les certificats (méthode standalone)
⚠️ Arrêter le serveur Node.js temporairement :
```bash
# Arrêter le serveur si il tourne
pkill -f "node server.js"

# Obtenir les certificats
sudo certbot certonly --standalone \
  -d cv.loundor.com \
  -d loundor.com \
  --agree-tos \
  --email loundor@gmail.com

# Les certificats seront dans :
# /etc/letsencrypt/live/cv.loundor.com/privkey.pem
# /etc/letsencrypt/live/cv.loundor.com/fullchain.pem
```

### Renouvellement automatique
```bash
# Tester le renouvellement
sudo certbot renew --dry-run

# Configurer le cron (déjà fait automatiquement par certbot)
# Les certificats se renouvellent automatiquement tous les 90 jours
```

## 2. Donner accès aux certificats à Node.js

```bash
# Option 1 : Donner les droits de lecture à votre utilisateur
sudo chmod 644 /etc/letsencrypt/live/cv.loundor.com/privkey.pem
sudo chmod 644 /etc/letsencrypt/live/cv.loundor.com/fullchain.pem

# Option 2 : Ajouter votre utilisateur au groupe ssl-cert (recommandé)
sudo usermod -a -G ssl-cert loundor
sudo chgrp ssl-cert /etc/letsencrypt/live/cv.loundor.com/privkey.pem
sudo chgrp ssl-cert /etc/letsencrypt/archive/cv.loundor.com/privkey*.pem
```

## 3. Service systemd pour Node.js

Créer `/etc/systemd/system/cv-loundor.service`:

```ini
[Unit]
Description=CV Loundor - Node.js Application
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/home/loundor/dev/cv
ExecStart=/usr/bin/node /home/loundor/dev/cv/server.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=cv-loundor
Environment=NODE_ENV=production

# Recharger automatiquement après renouvellement SSL
ExecReload=/bin/kill -s HUP $MAINPID

[Install]
WantedBy=multi-user.target
```

### Activer le service
```bash
sudo systemctl daemon-reload
sudo systemctl enable cv-loundor
sudo systemctl start cv-loundor
sudo systemctl status cv-loundor
```

### ⚠️ Note sur les ports 80 et 443
Node.js doit tourner en **root** pour écouter sur les ports 80/443, ou utiliser `setcap` :

```bash
# Option 1 : Donner les capacités réseau à Node.js (plus sûr)
sudo setcap 'cap_net_bind_service=+ep' $(which node)

# Option 2 : Lancer en root (dans le systemd service)
# User=root (déjà configuré ci-dessus)
```

## 4. Rechargement automatique après renouvellement SSL

Créer `/etc/letsencrypt/renewal-hooks/deploy/reload-nodejs.sh`:

```bash
#!/bin/bash
systemctl reload cv-loundor
```

Rendre exécutable :
```bash
sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nodejs.sh
```

## 5. Vérifications

```bash
# Vérifier que le service tourne
sudo systemctl status cv-loundor

# Vérifier les logs
sudo journalctl -u cv-loundor -f

# Tester HTTP (doit rediriger vers HTTPS)
curl -I http://cv.loundor.com
curl -I http://loundor.com

# Tester HTTPS
curl -I https://cv.loundor.com
curl -I https://loundor.com

# Vérifier les certificats
sudo certbot certificates
```

## 6. Mise à jour du site

```bash
cd /home/loundor/dev/cv
git pull  # Si vous utilisez git
sudo systemctl restart cv-loundor
```

## 7. Firewall (optionnel)

```bash
# Ouvrir les ports HTTP et HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

## Monitoring

```bash
# Logs en temps réel
sudo journalctl -u cv-loundor -f

# CPU/RAM
htop

# Vérifier les processus Node.js
ps aux | grep node

# Vérifier les ports ouverts
sudo netstat -tlnp | grep node
```

## Architecture

```
Internet
   ↓
DNS (cv.loundor.com, loundor.com)
   ↓
Serveur Linux (VOTRE_IP)
   ↓
Node.js Direct (ports 80 + 443)
   ├── HTTP (port 80) → Redirection vers HTTPS
   └── HTTPS (port 443) → Application CV
```

## Avantages de cette configuration

- ✅ Pas de reverse proxy (Nginx/Apache)
- ✅ Configuration simple
- ✅ HTTPS avec Let's Encrypt
- ✅ Certificats auto-renouvelés
- ✅ Redirection HTTP → HTTPS automatique
- ✅ Service systemd (redémarrage automatique)
- ✅ Logs centralisés (journalctl)
