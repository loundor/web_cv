# CV - Site Web Vitrine

Site web one-page moderne présentant votre CV de développeur système et embarqué.

## 🚀 Démarrage

### Installation
```bash
npm install
```

### Lancement du serveur
```bash
npm start
```

Le serveur démarre sur `http://0.0.0.0:3000`

## ✨ Caractéristiques

- **Design moderne** : Interface sombre avec animations fluides
- **Responsive** : S'adapte à tous les écrans (mobile, tablette, desktop)
- **Sections complètes** :
  - En-tête avec profil et coordonnées
  - À propos
  - Compétences techniques (4 catégories)
  - Expérience professionnelle (timeline)
  - Projets notables (4 projets)
  - Formation
- **Animations** : Effets au scroll et au hover
- **Icônes** : Font Awesome 6 intégré

## 📝 Personnalisation

Modifiez le fichier `public/index.html` pour :
- Changer votre nom et informations de contact
- Mettre à jour vos compétences
- Ajouter votre expérience et projets
- Modifier votre formation

Les couleurs peuvent être ajustées dans `public/style.css` (variables CSS en début de fichier).

## 🛠️ Technologies

- **Backend** : Node.js + Express
- **Frontend** : HTML5, CSS3, JavaScript vanilla
- **Serveur** : Écoute sur 0.0.0.0:3000

## 📦 Structure

```
cv/
├── server.js          # Serveur Node.js
├── package.json       # Configuration npm
├── public/
│   ├── index.html    # Page principale
│   ├── style.css     # Styles
│   └── script.js     # Animations JavaScript
└── README.md         # Ce fichier
```

## 🎨 Personnalisation des couleurs

Variables CSS disponibles dans `style.css` :
- `--primary-color` : Couleur principale
- `--accent-color` : Couleur d'accentuation
- `--dark-bg` : Fond sombre
- `--card-bg` : Fond des cartes

Profitez de votre nouveau CV en ligne ! 🎉
