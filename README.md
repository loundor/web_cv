# 🌐 CV Multilingue - Site Web Professionnel

Site web one-page moderne et dynamique présentant un CV avec support multilingue complet (FR/EN/DE et autres).

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
```

### Mode Développement
```bash
npm start
```
Le serveur démarre sur http://localhost:3000

### Mode Production
```bash
npm run production
```
Le serveur démarre sur les ports 80 (HTTP) et 443 (HTTPS) avec support SSL.

## ✨ Fonctionnalités Principales

### 🌍 Système Multilingue
- **3 langues** : Français, Anglais, Allemand (possibilite d'ajouter des langues)
- **Changement dynamique** : Sélecteur avec drapeaux en temps réel
- **Persistance** : Le choix de langue est sauvegardé (localStorage)
- **Préservation de section** : Reste sur la même section lors du changement de langue
- **Messages localisés** : Gestion des traductions manquantes par langue

### 🎨 Animations Avancées
- **15 types d'animations** : slide, rotate, flip, depth, bounce, elastic, etc (certains presentes des petits bug).
- **Randomisation** : Chaque navigation utilise une animation aléatoire
- **Titre animé** : Grille de points rotatifs sur les titres de section
- **Transitions fluides** : Effets CSS

### 📱 Interface PAS Responsive
- **Design moderne** : Interface sombre avec variables CSS
- **Navigation intelligente** : Barre de navigation fixe avec tooltips
- **Raccourcis clavier** : Navigation au clavier (bug)
- **Photo de profil** : Support zoom et offset X/Y configurables

### 🔧 Architecture Modulaire
- **JSON-driven** : Tout le contenu est configurable via JSON
- **Système flexible** : ID de section (nom de fichier) → type (renderer)
- **Renderers personnalisables** : Système de fallback générique
- **Support SVG** : Icônes SVG avec filtres CSS pour styling

### 🛡️ Serveur Sécurisé
- **HTTPS natif** : Support SSL/TLS avec Let's Encrypt
- **Multi-domaines** : cv.loundor.com et loundor.com
- **Redirection HTTP→HTTPS** : Automatique en production
- **Pas de reverse proxy** : Node.js gère directement HTTPS (fleme)

## 📂 Structure du Projet

```
SITE/
├── assets/                        # Images et ressources
│       ├── download/              # Fichiers telechargeable
│       │   └── cv.pdf
│       ├── de.svg
│       ├── photo.jpg
│       └── ...
├── server.js                      # Serveur Express avec HTTPS
├── package.json                   # Dépendances et scripts
├── public/                        # Frontend
│   ├── index.html                 # Page principale
│   └── script.js                  # Orchestration
├── js/                            # Modules JavaScript
│   ├── data-loader.js             # Chargement JSON avec cache
│   ├── renderer.js                # Renderers par type de section
│   ├── navigation.js              # Navigation et animations
│   └── language-manager.js        # Gestion multilingue
├── css/                           # Styles modulaires
│   └── style.css                  # CSS steel sheets
└── data/                          # Données JSON
    ├── languages.json             # Configuration des langues
    └── languages/                 # Contenu par langue
        ├── fr/                    # Français
        │   ├── config/
        │   │   ├── profile.json   # Profil avec photo (zoom, offsetX/Y)
        │   │   └── navigation.json # Sections (id→type mapping)
        │   └── sections/          # Contenu des sections
        │       ├── home.json
        │       ├── about.json
        │       ├── experience.json
        │       ├── education.json
        │       ├── expertise.json
        │       ├── projects.json
        │       └── contact.json
        ├── en/                    # Anglais (même structure)
        └── de/                    # Allemand (même structure)
```

## 🎯 Configuration

### Photo de Profil
Dans `data/languages/{lang}/config/profile.json` :
```json
{
  "photo": {
    "type": "image",
    "src": "/assets/photo.jpg",
    "alt": "Photo de profil",
    "zoom": 1.5,      // Facteur de zoom (1.0 = normal)
    "offsetX": 0,     // Décalage horizontal (px)
    "offsetY": 0      // Décalage vertical (px)
  }
}
```

### Sections Personnalisées
Dans `data/languages/{lang}/config/navigation.json` :
```json
{
  "sections": [
    {
      "id": "accueil",           // Nom du fichier JSON (accueil.json)
      "type": "home",             // Type de renderer à utiliser
      "title": "Accueil",
      "icon": "fas fa-home",
      "enabled": true
    }
  ]
}
```

### Ajouter une Langue
1. Créer le dossier `data/languages/{code}/`
2. Copier la structure d'une langue existante
3. Ajouter l'entrée dans `data/languages.json` :
```json
{
  "code": "es",
  "name": "Español",
  "flag": "/assets/flags/es.svg",
  "default": false,
  "notTranslated": "Traducción no disponible"
}
```

## 🛠️ Technologies

### Backend
- **Node.js 18+** : Environnement d'exécution
- **Express 4** : Framework web
- **HTTPS natif** : Support SSL/TLS

### Frontend
- **HTML5** : Structure sémantique
- **CSS3** : Variables, Grid, Flexbox, Animations
- **JavaScript ES6+** : Modules, Classes, Promises
- **Font Awesome 6** : Bibliothèque d'icônes

### Déploiement
- **systemd** : Service Linux
- **Let's Encrypt** : Certificats SSL gratuits
- **Ports 80/443** : HTTP et HTTPS standards

## 📝 Personnalisation du Contenu

### Informations Personnelles
Modifiez `data/languages/fr/config/profile.json` :
- Nom, rôle, photo
- Réseaux sociaux
- Lien CV téléchargeable

### Sections Dynamiques
- **personalInfo** : Clés = labels automatiques
- **Sous-blocs** : Projets dans education, tâches dans experience
- **Expertises** : Support icônes Font Awesome + SVG avec filtres

### Animations
15 types disponibles (appliqués aléatoirement) :
1. fadeSlideUp
2. slideFromRight
3. slideFromLeft
4. rotateIn
5. flip
6. cardFlipVertical
7. zoomIn
8. depth
9. cubeRotate
10. bounceSlideIn
11. elasticScale
12. swingIn
13. spiralIn
14. glitchFade
15. pageFlip

## 🔒 SSL/HTTPS Configuration

Voir [DEPLOY.md](DEPLOY.md) pour :
- Obtention des certificats Let's Encrypt
- Configuration systemd
- Renouvellement automatique
- Gestion multi-domaines

## 📦 Scripts NPM

```bash
npm start              # Développement (port 3000)
npm run production     # Production (ports 80/443)
```

## 🎨 Personnalisation Visuelle

Variables CSS dans `public/style.css` :
```css
:root {
  --bg-dark: #0a0a0a;
  --bg-card: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --accent: #00ff88;
  /* ... */
}
```

## 📄 Licence

Ce projet est un CV personnel. Libre d'utilisation comme template.

## 👤 Auteur

**Sébastien Tisserand**
- Site: https://cv.loundor.com
- GitHub: [@loundor](https://github.com/loundor)

## 🚧 Structure

```
cv/
├── server.js          # Serveur Node.js
├── package.json       # Configuration npm
├── public/
│   ├── index.html    # Page principale
│   └── script.js     # Animations JavaScript
└── README.md         # Ce fichier
```

## 🎨 Personnalisation des couleurs

Profitez de votre nouveau CV en ligne ! 🎉

## 🚀 Utilisation

### Ajouter une nouvelle section

1. **Créer le fichier JSON** dans `data/sections/` :
```json
// data/sections/ma-section.json
{
  "title": "Mon Titre",
  "content": "Mon contenu..."
}
```

2. **Activer la section** dans `data/config/navigation.json` :
```json
{
  "sections": [
    ...
    {
      "id": "ma-section",
      "title": "Ma Section",
      "icon": "fas fa-star",
      "enabled": true
    }
  ]
}
```

3. **Ajouter le renderer** dans `js/renderer.js` :
```javascript
renderMaSection(data) {
    return `
        <h2 class="section-title">${data.title}</h2>
        <p>${data.content}</p>
    `;
}
```

### Modifier le profil

Éditez `data/config/profile.json` :
```json
{
  "name": "Votre Nom",
  "role": "Votre Poste",
  "social": [
    {
      "platform": "github",
      "url": "https://github.com/username",
      "icon": "fab fa-github"
    }
  ]
}
```

### Modifier une section existante

Éditez simplement le fichier JSON correspondant dans `data/sections/`.
Par exemple, pour ajouter une expérience :

```json
// data/sections/experience.json
{
  "title": "Expérience Professionnelle",
  "items": [
    {
      "period": "2023 - Présent",
      "position": "Nouveau Poste",
      "company": "Entreprise",
      "description": "Description..."
    }
  ]
}
```

## 🎨 Personnalisation du Design

Le design est entièrement préservé dans `css/style.css`. Pour modifier :
- Les couleurs : Variables CSS dans `:root`
- Les animations : Classes `.anim-*`
- Les layouts : Classes de composants

## 📝 Formats JSON

### Profile (profile.json)
```json
{
  "name": "string",
  "role": "string",
  "photo": {
    "type": "icon",
    "iconClass": "string"
  },
  "social": [
    {
      "platform": "string",
      "url": "string",
      "icon": "string"
    }
  ]
}
```

### Experience (experience.json)
```json
{
  "title": "string",
  "items": [
    {
      "period": "string",
      "position": "string",
      "company": "string",
      "description": "string"
    }
  ]
}
```

### Portfolio (portfolio.json)
```json
{
  "title": "string",
  "filters": [
    {
      "id": "string",
      "label": "string",
      "active": boolean
    }
  ],
  "projects": [
    {
      "title": "string",
      "category": "string",
      "technologies": "string",
      "image": "string",
      "link": "string"
    }
  ]
}
```

## 🚀 Ajouter une nouvelle langue

### 1. Ajouter la langue dans `languages.json`
```json
{
  "languages": [
    ...
    {
      "code": "es",
      "name": "Español",
      "flag": "🇪🇸",
      "default": false
    }
  ]
}
```

### 2. Créer la structure de dossiers
```bash
mkdir -p data/languages/es/config
mkdir -p data/languages/es/sections
```

### 3. Créer les fichiers JSON traduits
Copiez les fichiers depuis une autre langue et traduisez :
```bash
cp -r data/languages/fr/* data/languages/es/
# Puis traduire chaque fichier JSON
```

## 📝 Traduction des sections

### Fichiers obligatoires :
- `config/profile.json` - Informations du profil
- `config/navigation.json` - Navigation et titres

### Fichiers de sections :
Tous les fichiers dans `sections/` sont optionnels. Si une section n'est pas traduite, une page vide s'affichera avec un message "Traduction non disponible".


## 🔧 Fonctionnalités

### Architecture Modulaire
- **DataLoader** : Charge les données JSON avec cache
- **Renderer** : Génère le HTML des sections
- **NavigationManager** : Gère la navigation et les interactions

### Avantages
- ✅ Ajout facile de nouvelles sections
- ✅ Modification du contenu sans toucher au code
- ✅ Structure claire et organisée
- ✅ Réutilisable et extensible
- ✅ Design original préservé

## 🎯 Prochaines étapes possibles

- Ajouter un système de traductions (i18n)
- Implémenter un mode sombre/clair
- Ajouter un CMS pour éditer les JSON
- Créer un générateur de CV PDF
- Ajouter des graphiques de compétences interactifs
En vrai j'y crois pas!!!