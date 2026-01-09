# CV Modulaire - Documentation

## 📁 Structure du Projet

```
cv/
├── data/                       # Données JSON
│   ├── config/                 # Configuration globale
│   │   ├── profile.json        # Informations du profil
│   │   └── navigation.json     # Configuration de navigation
│   └── sections/               # Contenu des sections
│       ├── home.json
│       ├── about.json
│       ├── experience.json
│       ├── education.json
│       ├── portfolio.json
│       ├── blog.json
│       └── contact.json
├── js/                         # Modules JavaScript
│   ├── data-loader.js          # Chargement des données JSON
│   ├── renderer.js             # Rendu des sections
│   └── navigation.js           # Gestion de la navigation
├── css/                        # Styles
│   └── style.css               # Feuille de style principale
├── public/                     # Fichiers publics
│   ├── index.html              # Page HTML principale
│   └── script.js               # Script principal
└── README-STRUCTURE.md         # Cette documentation
```

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

## 🛠️ Développement

### Lancer le serveur
```bash
npm start
# ou
node server.js
```

### Ajouter une nouvelle catégorie de projet
1. Ajouter le filtre dans `portfolio.json`
2. Créer les projets avec la nouvelle catégorie
3. Aucune modification de code nécessaire !

## 📦 Déploiement

Tous les fichiers sont prêts pour le déploiement. Il suffit de :
1. S'assurer que le serveur sert correctement les fichiers JSON
2. Vérifier que les chemins relatifs fonctionnent
3. Déployer le dossier complet

## 🎯 Prochaines étapes possibles

- Ajouter un système de traductions (i18n)
- Implémenter un mode sombre/clair
- Ajouter un CMS pour éditer les JSON
- Créer un générateur de CV PDF
- Ajouter des graphiques de compétences interactifs
