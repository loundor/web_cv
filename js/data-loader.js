/**
 * Module de chargement des données JSON
 */

class DataLoader {
    constructor(languageManager) {
        this.cache = {};
        this.languageManager = languageManager;
    }

    /**
     * Charge un fichier JSON
     * @param {string} path - Chemin vers le fichier JSON
     * @returns {Promise<Object>} Les données chargées
     */
    async load(path) {
        // Vérifier le cache
        if (this.cache[path]) {
            return this.cache[path];
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load ${path}: ${response.statusText}`);
            }
            const data = await response.json();
            this.cache[path] = data;
            return data;
        } catch (error) {
            console.error(`Error loading ${path}:`, error);
            return null; // Retourner null si la traduction n'existe pas
        }
    }

    /**
     * Vide le cache (utile lors du changement de langue)
     */
    clearCache() {
        this.cache = {};
    }

    /**
     * Charge la configuration du profil
     */
    async loadProfile() {
        const langPath = this.languageManager.getLanguagePath();
        return this.load(`${langPath}/config/profile.json`);
    }

    /**
     * Charge la configuration de navigation
     */
    async loadNavigation() {
        const langPath = this.languageManager.getLanguagePath();
        return this.load(`${langPath}/config/navigation.json`);
    }

    /**
     * Charge les données d'une section
     * @param {string} sectionId - ID de la section
     */
    async loadSection(sectionId) {
        const langPath = this.languageManager.getLanguagePath();
        return this.load(`${langPath}/sections/${sectionId}.json`);
    }

    /**
     * Charge toutes les sections
     */
    async loadAllSections() {
        const navigation = await this.loadNavigation();
        const sections = {};
        
        for (const section of navigation.sections) {
            if (section.enabled) {
                try {
                    sections[section.id] = await this.loadSection(section.id);
                } catch (error) {
                    console.warn(`Could not load section ${section.id}:`, error);
                }
            }
        }
        
        return sections;
    }
}

// Export pour utilisation
window.DataLoader = DataLoader;
