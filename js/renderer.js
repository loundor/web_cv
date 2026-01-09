/**
 * Module de rendu des sections
 */

class Renderer {
    /**
     * Rend la section Home
     */
    renderHome(data) {
        return `
            <div class="home-hero">
                <h1 class="hero-name">${data.name}</h1>
                <h2 class="hero-title">${data.title}</h2>
                <p class="hero-subtitle">${data.subtitle}</p>
                <div class="hero-buttons">
                    ${data.buttons.map(btn => `
                        <a href="${btn.link}" class="hero-btn ${btn.class}">${btn.text}</a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Rend la section About
     */
    renderAbout(data) {
        return `
            <h2 class="section-title" data-text="${data.title}">${data.title}</h2>
            
            <div class="content-block">
                <p class="intro-text">${data.intro}</p>
                
                <div class="info-grid">
                    ${Object.entries(data.personalInfo).map(([label, value]) => `
                        <div class="info-row">
                            <span class="info-label">${label}</span>
                            <span class="info-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <h3 class="subsection-title">Mes expertises</h3>
            
            <div class="services-grid">
                ${data.expertises.map(exp => `
                    <div class="service-card">
                        ${exp.icon.startsWith('/') || exp.icon.startsWith('http') ? 
                            `<img src="${exp.icon}" alt="${exp.title}" class="service-icon-img">` : 
                            `<i class="${exp.icon}"></i>`
                        }
                        <h4>${exp.title}</h4>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Rend la section Experience
     */
    renderExperience(data) {
        return `
            <h2 class="section-title" data-text="${data.title}">${data.title}</h2>
            
            ${data.items.map(item => `
                <div class="timeline-item">
                    <span class="timeline-period">${item.period}</span>
                    <h4>${item.position}</h4>
                    <span class="timeline-place">${item.company}</span>
                    <p>${item.description}</p>
                    ${item.tasks ? `
                        <div class="sub-projects">
                            <h5 style="margin: 1.5rem 0 1rem; color: var(--accent); font-size: 0.95rem;"><i class="fas fa-tasks" style="margin-right: 0.5rem;"></i>Réalisations principales</h5>
                            ${item.tasks.map(task => `
                                <div class="project-block" style="margin-bottom: 1rem; padding: 1rem; background: rgba(0, 255, 136, 0.03); border-left: 3px solid var(--accent); border-radius: 6px;">
                                    <h6 style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 0.95rem;">${task.title}</h6>
                                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.5rem;">${task.description}</p>
                                    <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                                        ${task.technologies.split(',').map(tech => `<span style="background: rgba(0, 255, 136, 0.15); color: var(--accent); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem;">${tech.trim()}</span>`).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        `;
    }

    /**
     * Rend la section Education
     */
    renderEducation(data) {
        return `
            <h2 class="section-title" data-text="${data.title}">${data.title}</h2>
            
            ${data.education.map(edu => `
                <div class="timeline-item">
                    <span class="timeline-period">${edu.period}</span>
                    <h4>${edu.degree}</h4>
                    <span class="timeline-place">${edu.school}</span>
                    <p>${edu.description}</p>
                    ${edu.projects ? `
                        <div class="sub-projects">
                            <h5 style="margin: 1.5rem 0 1rem; color: var(--accent); font-size: 0.95rem;"><i class="fas fa-folder-open" style="margin-right: 0.5rem;"></i>Projets réalisés</h5>
                            ${edu.projects.map(project => `
                                <div class="project-block" style="margin-bottom: 1rem; padding: 1rem; background: rgba(0, 255, 136, 0.03); border-left: 3px solid var(--accent); border-radius: 6px;">
                                    <h6 style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 0.95rem;">${project.title}</h6>
                                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.5rem;">${project.description}</p>
                                    <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                                        ${project.technologies.split(',').map(tech => `<span style="background: rgba(0, 255, 136, 0.15); color: var(--accent); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem;">${tech.trim()}</span>`).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}

            <h3 class="subsection-title">Compétences</h3>

            ${data.skills.map(skill => `
                <div class="skill-item">
                    <div class="skill-info">
                        <span>${skill.name}</span>
                        <span>${skill.level}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-fill" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            `).join('')}

            <h3 class="subsection-title" style="margin-top: 40px;">Technologies</h3>
            <div class="tech-tags">
                ${data.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        `;
    }

    /**
     * Rend la section Portfolio
     */
    renderPortfolio(data) {
        return `
            <h2 class="section-title" data-text="${data.title}">${data.title}</h2>
            
            <div class="portfolio-filters">
                ${data.filters.map(filter => `
                    <button class="filter-tag ${filter.active ? 'active' : ''}" data-filter="${filter.id}">
                        ${filter.label}
                    </button>
                `).join('')}
            </div>

            <div class="portfolio-grid">
                ${data.projects.map(project => `
                    <div class="project-card" data-category="${project.category}">
                        <div class="project-img">
                            <img src="${project.image}" alt="${project.title}">
                            <div class="project-overlay">
                                <a href="${project.link}" class="view-btn"><i class="fas fa-eye"></i></a>
                            </div>
                        </div>
                        <div class="project-info">
                            <h4>${project.title}</h4>
                            <span>${project.technologies}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Rend la section Blog
     */
    renderBlog(data) {
        return `
            <h2 class="section-title" data-text="${data.title}">${data.title}</h2>
            
            <div class="blog-grid">
                ${data.articles.map(article => `
                    <article class="blog-card">
                        <div class="blog-date">${article.date}</div>
                        <h3>${article.title}</h3>
                        <p>${article.excerpt}</p>
                        <a href="${article.link}" class="blog-link">Lire la suite <i class="fas fa-arrow-right"></i></a>
                    </article>
                `).join('')}
            </div>
        `;
    }

    /**
     * Rend la section Contact
     */
    renderContact(data) {
        return `
            <h2 class="section-title" data-text="${data.title}">${data.title}</h2>
            
            <h3 class="contact-heading">${data.heading}</h3>
            <p class="contact-intro">${data.intro}</p>

            <div class="contact-grid">
                ${data.info.map(item => `
                    <div class="contact-item">
                        <i class="${item.icon}"></i>
                        <div>
                            <strong>${item.label}</strong>
                            <p${item.available ? ' class="available"' : ''}>${item.value}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Rend une section selon son ID
     */
    render(sectionId, data, sectionType = null) {
        // Utiliser le type si fourni, sinon utiliser l'ID
        const renderType = sectionType || sectionId;
        const methodName = `render${renderType.charAt(0).toUpperCase() + renderType.slice(1)}`;
        
        if (typeof this[methodName] === 'function') {
            return this[methodName](data);
        }
        
        // Fallback: renderer générique pour sections personnalisées
        console.info(`Using generic renderer for section: ${sectionId}`);
        return this.renderGeneric(data);
    }

    /**
     * Renderer générique pour sections personnalisées
     */
    renderGeneric(data) {
        let html = '';
        
        // Si le data a un titre
        if (data.title) {
            html += `<h2 class="section-title" data-text="${data.title}">${data.title}</h2>`;
        }
        
        // Si c'est une structure type "home"
        if (data.name && data.subtitle && data.buttons) {
            return this.renderHome(data);
        }
        
        // Si le data a un contenu texte simple
        if (data.content) {
            html += `<div class="content-block"><p>${data.content}</p></div>`;
        }
        
        // Si le data a des items (liste générique)
        if (data.items && Array.isArray(data.items)) {
            html += `<div class="generic-items">`;
            data.items.forEach(item => {
                html += `
                    <div class="generic-item">
                        ${item.title ? `<h4>${item.title}</h4>` : ''}
                        ${item.description ? `<p>${item.description}</p>` : ''}
                        ${item.content ? `<p>${item.content}</p>` : ''}
                    </div>
                `;
            });
            html += `</div>`;
        }
        
        return html || '<p>Section en construction...</p>';
    }

    /**
     * Rend le profil dans le panneau gauche
     */
    renderProfile(data) {
        const profileSection = document.querySelector('.profile-section');
        if (profileSection) {
            let photoHTML = '';
            if (data.photo.type === 'image') {
                const zoom = data.photo.zoom || 1.0;
                const offsetX = data.photo.offsetX || 0;
                const offsetY = data.photo.offsetY || 0;
                const transforms = [];
                if (zoom !== 1.0) transforms.push(`scale(${zoom})`);
                if (offsetX !== 0 || offsetY !== 0) transforms.push(`translate(${offsetX}px, ${offsetY}px)`);
                const style = transforms.length > 0 ? ` style="transform: ${transforms.join(' ')}; transform-origin: center;"` : '';
                photoHTML = `<img src="${data.photo.src}" alt="${data.photo.alt || 'Photo de profil'}"${style}>`;
            } else if (data.photo.type === 'icon') {
                photoHTML = `<i class="${data.photo.iconClass}"></i>`;
            }
            
            profileSection.innerHTML = `
                <div class="profile-photo">
                    ${photoHTML}
                </div>
                <h1 class="profile-name">${data.name}</h1>
                <p class="profile-role">${data.role}</p>
            `;
        }

        const socialSection = document.querySelector('.social-section');
        if (socialSection) {
            socialSection.innerHTML = data.social.map(social => `
                <a href="${social.url}" target="_blank" class="social-btn">
                    <i class="${social.icon}"></i>
                </a>
            `).join('');
        }

        const cvBtn = document.querySelector('.download-cv-btn');
        if (cvBtn) {
            cvBtn.href = data.cv.downloadUrl;
            cvBtn.innerHTML = `<i class="fas fa-download"></i> ${data.cv.buttonText}`;
        }
    }

    /**
     * Rend la navigation
     */
    renderNavigation(data) {
        const navIcons = document.querySelector('.nav-icons');
        if (navIcons) {
            navIcons.innerHTML = data.sections
                .filter(section => section.enabled)
                .map((section, index) => `
                    <button class="nav-icon ${index === 0 ? 'active' : ''}" 
                            data-section="${section.id}" 
                            title="${section.title}">
                        <i class="${section.icon}"></i>
                    </button>
                `).join('');
        }
    }
}

// Export pour utilisation
window.Renderer = Renderer;
