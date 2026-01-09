/**
 * Module de gestion des langues (i18n)
 */

class LanguageManager {
    constructor() {
        this.languages = [];
        this.currentLanguage = null;
        this.defaultLanguage = 'fr';
    }

    /**
     * Initialise le gestionnaire de langues
     */
    async init() {
        // Charger la liste des langues disponibles
        const response = await fetch('/data/languages.json');
        const data = await response.json();
        this.languages = data.languages;
        
        // Déterminer la langue par défaut
        const defaultLang = this.languages.find(lang => lang.default);
        this.defaultLanguage = defaultLang ? defaultLang.code : this.languages[0].code;
        
        // Charger la langue depuis localStorage ou utiliser la langue par défaut
        const savedLang = localStorage.getItem('selectedLanguage');
        this.currentLanguage = savedLang || this.defaultLanguage;
        
        // Créer le sélecteur de langue dans l'UI
        this.createLanguageSelector();
    }

    /**
     * Crée le sélecteur de langue dans l'interface
     */
    createLanguageSelector() {
        const selector = document.createElement('div');
        selector.className = 'language-selector';
        selector.innerHTML = this.languages.map(lang => `
            <button class="lang-btn ${lang.code === this.currentLanguage ? 'active' : ''}" 
                    data-lang="${lang.code}"
                    title="${lang.name}">
                <img src="${lang.flag}" alt="${lang.name}" class="flag-img">
            </button>
        `).join('');
        
        document.body.appendChild(selector);
        
        // Ajouter les écouteurs d'événements
        selector.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }

    /**
     * Change la langue active
     */
    setLanguage(langCode) {
        if (this.currentLanguage === langCode) return;
        
        this.currentLanguage = langCode;
        localStorage.setItem('selectedLanguage', langCode);
        
        // Mettre à jour le sélecteur UI
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === langCode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Recharger l'application avec la nouvelle langue
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: langCode } }));
    }

    /**
     * Retourne la langue courante
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Retourne le chemin de base pour les fichiers de la langue courante
     */
    getLanguagePath() {
        return `/data/languages/${this.currentLanguage}`;
    }
    /**
     * Obtient le message de traduction non disponible pour la langue courante
     */
    getNotTranslatedMessage() {
        const lang = this.languages.find(l => l.code === this.currentLanguage);
        return lang?.notTranslated || 'Translation not available';
    }}

// Export pour utilisation
window.LanguageManager = LanguageManager;
