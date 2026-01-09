# 🌍 Système Multilingue - Guide d'utilisation

## Structure des langues

```
data/
├── languages.json          # Configuration des langues disponibles
└── languages/
    ├── fr/                 # Français
    │   ├── config/
    │   │   ├── profile.json
    │   │   └── navigation.json
    │   └── sections/
    │       ├── home.json
    │       ├── about.json
    │       ├── experience.json
    │       └── ...
    ├── en/                 # English
    │   ├── config/
    │   └── sections/
    └── de/                 # Deutsch
        ├── config/
        └── sections/
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

## 🎨 Personnalisation du sélecteur

Le sélecteur de langue est en haut à droite. Pour modifier :

**Position :**
```css
.language-selector {
    top: 2rem;      /* Distance du haut */
    right: 2rem;    /* Distance de la droite */
}
```

**Style des drapeaux :**
```css
.lang-btn {
    width: 3rem;     /* Taille du bouton */
    height: 3rem;
    font-size: 1.8rem; /* Taille du drapeau */
}
```

## 🔄 Fonctionnement

1. **Sélection** : L'utilisateur clique sur un drapeau
2. **Sauvegarde** : La langue est sauvegardée dans `localStorage`
3. **Rechargement** : Le contenu est rechargé dans la nouvelle langue
4. **Persistance** : La langue reste active même après fermeture du navigateur

## 📋 Traduction rapide

Pour traduire uniquement certaines sections :

1. Créez les dossiers de la nouvelle langue
2. Copiez les fichiers de config (obligatoires)
3. Traduisez seulement les sections voulues
4. Les sections non traduites afficheront un message automatique

## 🎯 Bonnes pratiques

- ✅ Gardez la même structure JSON dans toutes les langues
- ✅ Utilisez des codes de langue ISO (fr, en, de, es, etc.)
- ✅ Testez chaque langue après ajout
- ✅ Documentez les sections non traduites
- ⚠️ Ne modifiez pas les IDs des sections
- ⚠️ Conservez les mêmes icônes Font Awesome

## 🔍 Dépannage

**La langue ne s'affiche pas :**
- Vérifiez que `languages.json` contient la langue
- Vérifiez l'existence des dossiers `config` et `sections`
- Consultez la console du navigateur pour les erreurs

**Page vide :**
- Normal si la traduction n'existe pas
- Créez les fichiers JSON manquants

**Sélecteur invisible :**
- Vérifiez que `language-manager.js` est chargé
- Vérifiez les styles CSS `.language-selector`
