/**
 * Module de gestion de la navigation
 */

class NavigationManager {
    constructor(sections) {
        this.sections = sections;
        this.currentSectionIndex = 0;
        this.isHoveringIcon = false;
        
        this.init();
    }

    init() {
        this.setupNavigationIcons();
        this.setupArrowNavigation();
        this.setupKeyboardNavigation();
        this.setupHeroButtons();
        this.setupTooltips();
    }

    setupNavigationIcons() {
        const navIcons = document.querySelectorAll('.nav-icon');
        navIcons.forEach((icon, index) => {
            icon.addEventListener('click', () => {
                this.navigateToSection(index);
            });
        });
    }

    setupArrowNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentSectionIndex = (this.currentSectionIndex - 1 + this.sections.length) % this.sections.length;
                this.navigateToSection(this.currentSectionIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentSectionIndex = (this.currentSectionIndex + 1) % this.sections.length;
                this.navigateToSection(this.currentSectionIndex);
            });
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                document.getElementById('prevBtn')?.click();
            } else if (e.key === 'ArrowRight') {
                document.getElementById('nextBtn')?.click();
            }
        });
    }

    setupHeroButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                const targetSection = e.target.getAttribute('href').substring(1);
                const sectionIndex = this.sections.indexOf(targetSection);
                
                if (sectionIndex !== -1) {
                    e.preventDefault();
                    this.navigateToSection(sectionIndex);
                }
            }
        });
    }

    setupTooltips() {
        const navIcons = document.querySelectorAll('.nav-icon');
        
        navIcons.forEach(icon => {
            const title = icon.getAttribute('title');
            
            icon.addEventListener('mouseenter', () => {
                this.isHoveringIcon = true;
                this.updateTooltip(title);
            });
            
            icon.addEventListener('mouseleave', () => {
                this.isHoveringIcon = false;
                setTimeout(() => {
                    this.showActiveTooltip();
                }, 300);
            });
        });

        // Afficher le tooltip de la page active au chargement
        setTimeout(() => {
            this.showActiveTooltip();
        }, 1000);
    }

    updateTooltip(title) {
        const existingTooltip = document.querySelector('.nav-tooltip');
        if (existingTooltip) {
            existingTooltip.textContent = title;
            return;
        }
        
        if (title) {
            const tooltip = document.createElement('div');
            tooltip.className = 'nav-tooltip';
            tooltip.textContent = title;
            
            // Insérer le tooltip dans .bottom-nav, entre nav-icons et nav-arrows
            const bottomNav = document.querySelector('.bottom-nav');
            const navArrows = document.querySelector('.nav-arrows');
            bottomNav.insertBefore(tooltip, navArrows);
        }
    }

    showActiveTooltip() {
        if (!this.isHoveringIcon) {
            const activeIcon = document.querySelector('.nav-icon.active');
            if (activeIcon) {
                const title = activeIcon.getAttribute('title');
                this.updateTooltip(title);
            }
        }
    }

    navigateToSection(index) {
        this.currentSectionIndex = index;
        
        // Animation aléatoire parmi 15 animations
        const randomAnim = Math.floor(Math.random() * 15) + 1;
        
        // Sections
        const contentSections = document.querySelectorAll('.content-section');
        contentSections.forEach((section, i) => {
            // Retirer toutes les animations
            for (let j = 1; j <= 15; j++) {
                section.classList.remove(`anim-${j}`);
            }
            
            if (i === index) {
                section.classList.add('active', `anim-${randomAnim}`);
            } else {
                section.classList.remove('active');
            }
        });
        
        // Icônes de navigation
        const navIcons = document.querySelectorAll('.nav-icon');
        navIcons.forEach((icon, i) => {
            if (i === index) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });
        
        // Scroll vers le haut
        const cardRight = document.querySelector('.card-right');
        cardRight?.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Mettre à jour le tooltip
        if (!this.isHoveringIcon) {
            this.showActiveTooltip();
        }
    }
}

// Export pour utilisation
window.NavigationManager = NavigationManager;
