document.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('hero');
    const header = document.getElementById('header');
    const featuredGrid = document.getElementById('featuredGrid');
    
    let lastScroll = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (currentScroll > scrollThreshold) {
            hero.classList.add('shrink');
        } else {
            hero.classList.remove('shrink');
        }
        
        lastScroll = currentScroll;
    });
    
    const projectsData = [];
    
    if (window.virtualFolder) {
        const projectsRoot = window.virtualFolder['projects/'];
        
        if (projectsRoot) {
            for (const folderName in projectsRoot) {
                const folder = projectsRoot[folderName];
                for (const fileName in folder) {
                    const content = folder[fileName];
                    projectsData.push({
                        category: folderName.replace('/', ''),
                        title: fileName.replace('.txt', ''),
                        description: content[0] || 'Description du projet',
                        tech: content[1] || 'Technologies utilisées',
                        notes: content[2] || ''
                    });
                }
            }
        }
        
        if (projectsData.length > 0) {
            const firstProject = projectsData[0];
            document.getElementById('cardCategory').textContent = firstProject.category;
            document.getElementById('cardTitle').textContent = firstProject.title;
            document.getElementById('badgeLabel').textContent = firstProject.tech.replace('Technologies: ', '');
            document.getElementById('badgeDate').textContent = 'Janvier 2026';
            document.getElementById('badgeValue').textContent = '100%';
        }
    }
    
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];
    
    const displayProjects = projectsData.length > 0 ? projectsData : [
        {
            category: 'website',
            title: 'project1',
            description: 'Description: Example project 1 - replace with your description',
            tech: 'Technologies: HTML, CSS, JavaScript',
            notes: 'Notes: Add details about your role and links'
        },
        {
            category: 'website',
            title: 'project2',
            description: 'Description: Example project 2 - replace with your description',
            tech: 'Technologies: HTML, CSS, JavaScript',
            notes: ''
        },
        {
            category: 'tools',
            title: 'tool-example',
            description: 'Description: Example tool - replace with usage info',
            tech: 'Usage: How to run or use this tool',
            notes: ''
        }
    ];
    
    displayProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const gradient = gradients[index % gradients.length];
        
        card.innerHTML = `
            <div class="project-image" style="background: ${gradient}">
                <div class="project-number">${(index + 1).toString().padStart(2, '0')}</div>
            </div>
            <div class="project-info">
                <div class="project-category">${project.category}</div>
                <h3 class="project-title">${project.title.replace(/-/g, ' ')}</h3>
                <p class="project-description">${project.description.replace('Description: ', '')}</p>
                <div class="project-footer">
                    <div class="project-badge">
                        <div class="project-badge-icon"></div>
                        <span>${project.tech.replace('Technologies: ', '').split(',')[0]}</span>
                    </div>
                    <div class="project-status">Terminé</div>
                </div>
            </div>
        `;
        
        featuredGrid.appendChild(card);
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
