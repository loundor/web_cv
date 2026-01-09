/**
 * Script principal - Initialisation de l'application
 */

(async function() {
    // Instances des modules
    const languageManager = new LanguageManager();
    let dataLoader;
    const renderer = new Renderer();
    let navigationManager;

    /**
     * Initialise l'application
     */
    async function init() {
        try {
            // Afficher un indicateur de chargement
            showLoader();

            // 1. Initialiser le gestionnaire de langues
            await languageManager.init();
            
            // 2. Créer le data loader avec le language manager
            dataLoader = new DataLoader(languageManager);

            // 3. Charger et afficher le contenu
            await loadContent();

            // 4. Écouter les changements de langue
            window.addEventListener('languageChanged', async () => {
                showLoader();
                dataLoader.clearCache();
                await loadContent(true); // Restaurer la section courante
                hideLoader();
            });

            // Masquer le loader
            hideLoader();

        } catch (error) {
            console.error('Error initializing app:', error);
            showError('Erreur lors du chargement de l\'application');
        }
    }

    /**
     * Charge le contenu pour la langue courante
     */
    async function loadContent(restoreSection = false) {
        // Sauvegarder l'index de la section courante
        const currentSectionIndex = navigationManager ? navigationManager.currentSectionIndex : 0;
        
        // Charger les configurations
        const [profile, navigation] = await Promise.all([
            dataLoader.loadProfile(),
            dataLoader.loadNavigation()
        ]);

        if (!profile || !navigation) {
            showEmptyPage();
            return;
        }

        // Rendre le profil et la navigation
        renderer.renderProfile(profile);
        renderer.renderNavigation(navigation);

        // Charger toutes les sections
        const sectionsData = await dataLoader.loadAllSections();

        // Créer les sections dans le DOM
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Vider le contenu existant
        
        const enabledSections = navigation.sections.filter(s => s.enabled);
        
        // Déterminer quelle section doit être active
        const activeIndex = restoreSection ? Math.min(currentSectionIndex, enabledSections.length - 1) : 0;
        
        enabledSections.forEach((section, index) => {
            const sectionElement = document.createElement('section');
            sectionElement.id = section.id;
            sectionElement.className = `content-section ${index === activeIndex ? 'active' : ''}`;
            
            if (sectionsData[section.id]) {
                sectionElement.innerHTML = renderer.render(section.id, sectionsData[section.id], section.type);
            } else {
                // Section non traduite - afficher le message dans la langue courante
                const notTranslatedMsg = languageManager.getNotTranslatedMessage();
                sectionElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; flex-direction: column;"><i class="fas fa-language" style="font-size: 5rem; color: var(--accent); margin-bottom: 2rem;"></i><p style="color: var(--text-secondary); font-size: 1.2rem;">${notTranslatedMsg}</p></div>`;
            }
            
            mainContent.appendChild(sectionElement);
        });

        // Réinitialiser ou créer la navigation
        const sectionIds = enabledSections.map(s => s.id);
        navigationManager = new NavigationManager(sectionIds);
        
        // Restaurer la section active
        if (restoreSection && activeIndex > 0) {
            navigationManager.navigateToSection(activeIndex);
        }

        // Réinitialiser les fonctionnalités additionnelles
        initPortfolioFilters();
        initAnimations();
    }

    /**
     * Affiche une page vide pour les traductions manquantes
     */
    function showEmptyPage() {
        const mainContent = document.getElementById('main-content');
        const notTranslatedMsg = languageManager.getNotTranslatedMessage();
        mainContent.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; flex-direction: column;">
                <i class="fas fa-language" style="font-size: 5rem; color: var(--accent); margin-bottom: 2rem;"></i>
                <p style="color: var(--text-secondary); font-size: 1.2rem;">${notTranslatedMsg}</p>
            </div>
        `;
    }

    /**
     * Initialise les filtres du portfolio
     */
    function initPortfolioFilters() {
        const filterTags = document.querySelectorAll('.filter-tag');
        const projectCards = document.querySelectorAll('.project-card');

        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // Retirer la classe active
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                
                const filter = tag.getAttribute('data-filter');
                
                projectCards.forEach((card, index) => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        }, index * 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.9)';
                        card.style.transition = 'all 0.3s ease';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    /**
     * Initialise les animations
     */
    function initAnimations() {
        // Animation de la photo de profil
        const profilePhoto = document.querySelector('.profile-photo');
        if (profilePhoto) {
            let floatPosition = 0;
            let floatDirection = 1;

            setInterval(() => {
                floatPosition += 0.3 * floatDirection;
                if (floatPosition > 10 || floatPosition < -10) {
                    floatDirection *= -1;
                }
                profilePhoto.style.transform = `translateY(${floatPosition}px)`;
            }, 50);
        }

        // Animation au chargement de la page
        setTimeout(() => {
            const cardLeft = document.querySelector('.card-left');
            const cardRight = document.querySelector('.card-right');
            
            if (cardLeft && cardRight) {
                cardLeft.style.opacity = '0';
                cardRight.style.opacity = '0';
                cardLeft.style.transform = 'translateX(-50px)';
                cardRight.style.transform = 'translateX(50px)';
                
                setTimeout(() => {
                    cardLeft.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    cardRight.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    cardLeft.style.opacity = '1';
                    cardRight.style.opacity = '1';
                    cardLeft.style.transform = 'translateX(0)';
                    cardRight.style.transform = 'translateX(0)';
                }, 100);
            }
        }, 100);
    }

    /**
     * Affiche le loader
     */
    function showLoader() {
        const loader = document.createElement('div');
        loader.id = 'app-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--bg-pattern);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        loader.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: var(--accent);"></i>
                <p style="color: var(--text-primary); margin-top: 20px;">Chargement...</p>
            </div>
        `;
        document.body.appendChild(loader);
    }

    /**
     * Masque le loader
     */
    function hideLoader() {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.3s ease';
            setTimeout(() => loader.remove(), 300);
        }
    }

    /**
     * Affiche un message d'erreur
     */
    function showError(message) {
        hideLoader();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 64px; color: #ff6b6b;"></i>
                    <h2 style="margin-top: 20px;">${message}</h2>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: var(--accent); border: none; border-radius: 8px; color: white; cursor: pointer;">
                        Recharger
                    </button>
                </div>
            `;
        }
    }

    // Lancer l'application
    init();
})();
