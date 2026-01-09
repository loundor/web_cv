const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = express();

// Configuration des domaines autorisés
const ALLOWED_DOMAINS = ['cv.loundor.com', 'loundor.com', 'localhost'];

// Middleware pour vérifier le domaine (optionnel, pour logs)
app.use((req, res, next) => {
    const host = req.get('host')?.split(':')[0];
    console.log(`📍 Requête depuis: ${host} (${req.protocol})`);
    next();
});

// Servir les fichiers statiques
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/data', express.static('data'));
app.use('/assets', express.static('assets'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

// Chemins des certificats SSL
const SSL_KEY = process.env.SSL_KEY || '/etc/letsencrypt/live/cv.loundor.com/privkey.pem';
const SSL_CERT = process.env.SSL_CERT || '/etc/letsencrypt/live/cv.loundor.com/fullchain.pem';

// Vérifier si les certificats SSL existent
const sslAvailable = fs.existsSync(SSL_KEY) && fs.existsSync(SSL_CERT);

if (sslAvailable) {
    // Configuration HTTPS
    const httpsOptions = {
        key: fs.readFileSync(SSL_KEY),
        cert: fs.readFileSync(SSL_CERT)
    };

    // Serveur HTTPS
    https.createServer(httpsOptions, app).listen(HTTPS_PORT, '0.0.0.0', () => {
        console.log(`✓ Serveur HTTPS démarré sur https://0.0.0.0:${HTTPS_PORT}`);
        ALLOWED_DOMAINS.forEach(domain => {
            if (domain !== 'localhost') {
                console.log(`  - https://${domain}`);
            }
        });
    });

    // Serveur HTTP (redirection vers HTTPS)
    const httpApp = express();
    httpApp.use((req, res) => {
        const host = req.get('host')?.split(':')[0];
        res.redirect(301, `https://${host}${req.url}`);
    });
    http.createServer(httpApp).listen(HTTP_PORT, '0.0.0.0', () => {
        console.log(`✓ Serveur HTTP démarré (redirection HTTPS) sur http://0.0.0.0:${HTTP_PORT}`);
    });

} else {
    // Mode développement : HTTP uniquement
    console.warn('⚠️  Certificats SSL non trouvés - Mode HTTP uniquement');
    console.warn(`    Attendu: ${SSL_KEY}`);
    console.warn(`             ${SSL_CERT}`);
    
    http.createServer(app).listen(HTTP_PORT, '0.0.0.0', () => {
        console.log(`✓ Serveur HTTP démarré sur http://0.0.0.0:${HTTP_PORT}`);
        console.log(`✓ Domaines configurés: ${ALLOWED_DOMAINS.join(', ')}`);
    });
}
