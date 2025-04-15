const header = document.getElementById('header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav ul li a');
const portfolioGrid = document.querySelector('.portfolio-grid');
const portfolioFilters = document.querySelectorAll('.portfolio-filter button');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-modal');
const viewProjectBtns = document.querySelectorAll('.view-project');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');

function initPortfolio() {
    const sortedProjects = [...projectsData].sort((a, b) => {
        return new Date(b.year) - new Date(a.year);
    });
    
    renderPortfolioItems(sortedProjects, 6);
    bindPortfolioEvents();
}

function renderPortfolioItems(items, limit = null, reset = true) {
    if (reset) {
        portfolioGrid.innerHTML = '';
    }
    
    let startIndex = reset ? 0 : document.querySelectorAll('.portfolio-item').length;
    
    let endIndex = limit ? startIndex + limit : items.length;
    if (endIndex > items.length) endIndex = items.length;
    
    const activeFilter = document.querySelector('.portfolio-filter button.active');
    const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
    
    let filteredItems = items;
    if (filterValue !== 'all') {
        filteredItems = items.filter(item => item.category === filterValue);
    }
    
    let itemsToShow = filteredItems.slice(startIndex, endIndex);
    
    itemsToShow.forEach((item, index) => {
        const uniqueId = `portfolio-item-${Date.now()}-${index}`;
        
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item visible';
        portfolioItem.setAttribute('data-category', item.category);
        portfolioItem.id = uniqueId;
        portfolioItem.setAttribute('data-id', item.id);
        
        if (item.has_modal || item.link) {
            portfolioItem.style.cursor = 'pointer';
        }
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image-container">
                <div class="placeholder-image" style="background-color: #e0e0e0; display: flex; align-items: center; justify-content: center;"></div>
            </div>
            <div class="portfolio-info" style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <h3>${item.title}</h3>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
        
        const domItem = document.getElementById(uniqueId);
        if (!domItem) return;
        
        if (item.thumbnail) {
            const imageUrl = item.thumbnail;
            
            const imageExistsKey = `image_exists_${imageUrl}`;
            const imageExists = localStorage.getItem(imageExistsKey);
            
            if (imageExists === 'true') {
                const imgContainer = domItem.querySelector('.portfolio-image-container');
                const placeholderElement = domItem.querySelector('.placeholder-image');
                
                const displayImg = document.createElement('img');
                displayImg.alt = item.title;
                displayImg.src = imageUrl;
                imgContainer.appendChild(displayImg);
                placeholderElement.style.display = 'none';
            } else if (imageExists === 'false') {
            } else {
                const imgTest = new Image();
                
                const imgContainer = domItem.querySelector('.portfolio-image-container');
                const placeholderElement = domItem.querySelector('.placeholder-image');
                
                imgTest.addEventListener('load', function() {
                    const displayImg = document.createElement('img');
                    displayImg.alt = item.title;
                    displayImg.src = imageUrl;
                    
                    imgContainer.appendChild(displayImg);
                    
                    placeholderElement.style.display = 'none';
                    
                    try {
                        localStorage.setItem(imageExistsKey, 'true');
                    } catch (e) {
                    }
                });
                
                setTimeout(() => {
                    try {
                        imgTest.src = URL.createObjectURL(new Blob([]));
                        
                        imgTest.src = imageUrl;
                    } catch (e) {
                        try {
                            localStorage.setItem(imageExistsKey, 'false');
                        } catch (storageError) {
                        }
                    }
                }, 50);
            }
        }
    });
    
    updateLoadMoreButton(filteredItems.length, endIndex);
    
    bindPortfolioEvents();
}

function updateLoadMoreButton(totalItems, currentlyShowing) {
    const existingButton = document.querySelector('.load-more-btn');
    if (existingButton) {
        existingButton.remove();
    }
    
    if (currentlyShowing < totalItems) {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'btn primary-btn load-more-btn';
        loadMoreBtn.textContent = 'VER MÁS';
        
        loadMoreBtn.addEventListener('click', function() {
            const currentCount = document.querySelectorAll('.portfolio-item').length;
            
            const activeFilter = document.querySelector('.portfolio-filter button.active');
            const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            
            let filteredProjects = [...projectsData].sort((a, b) => new Date(b.year) - new Date(a.year));
            if (filterValue !== 'all') {
                filteredProjects = filteredProjects.filter(p => p.category === filterValue);
            }
            
            renderPortfolioItems(filteredProjects, 6, false);
        });
        
        const portfolioSection = document.querySelector('#works .container');
        portfolioSection.appendChild(loadMoreBtn);
    }
}

function bindPortfolioEvents() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioItems.length === 0) return;
    
    portfolioItems.forEach(item => {
        const clonedItem = item.cloneNode(true);
        item.parentNode.replaceChild(clonedItem, item);
        
        clonedItem.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            const project = projectsData.find(p => p.id === projectId);
            
            if (project) {
                if (project.has_modal) {
                    if (typeof window.openProjectModal === 'function') {
                        window.openProjectModal(project);
                    }
                } else if (project.link) {
                    window.open(project.link, '_blank');
                }
            }
        });
    });
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    
    skillBars.forEach(skillBar => {
        const skillBarTop = skillBar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (skillBarTop < windowHeight - 100 && skillBar.getAttribute('style')) {
            const width = skillBar.getAttribute('style').match(/width: (\d+)/)[1];
            skillBar.style.width = width + '%';
        }
    });
});

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('show');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        
        if (mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            mobileMenuToggle.classList.remove('active');
        }
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

window.addEventListener('DOMContentLoaded', function() {
    if (typeof projectDetails !== 'undefined') {
        window.projectDetails = projectDetails;
    }
    
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');
    
    if (!modal || !modalContent) {
        return;
    }
    
    initPortfolio();
    
    const filterBtns = document.querySelectorAll('.portfolio-filter button');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            let filteredProjects = [...projectsData].sort((a, b) => new Date(b.year) - new Date(a.year));
            
            if (filterValue !== 'all') {
                filteredProjects = filteredProjects.filter(item => item.category === filterValue);
            }
            
            renderPortfolioItems(filteredProjects, 6);
        });
    });
    
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                if (modalContent) modalContent.innerHTML = '';
            }, 300);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
                
                setTimeout(() => {
                    if (modalContent) modalContent.innerHTML = '';
                }, 300);
            }
        });
    }
    
    window.openProjectModal = async function(project) {
        if (!modal || !modalContent) {
            return;
        }
        
        try {            
            let projectDetails = project;
            
            if (project.slug && window.projectDetails) {
                try {                    
                    const detailData = window.projectDetails[project.slug];
                    if (detailData) {
                        projectDetails = { ...project, ...detailData };
                    }
                } catch (error) {}
            }
            
            const mainImagePath = projectDetails.image_main || null;
            
            let imageHTML = '<div class="project-image">';
            
            if (mainImagePath) {
                imageHTML += `
                    <div class="image-container">
                        <img src="images/portfolio/${mainImagePath}" alt="${projectDetails.title}" 
                             onload="this.style.display='block'; this.parentNode.querySelector('.loading-placeholder').style.display='none';" 
                             onerror="this.parentNode.innerHTML='<div class=\\'image-error\\'>Image not found</div>';" 
                             style="display:none;">
                        <div class="loading-placeholder">Loading image...</div>
                    </div>
                `;
            } else {
                imageHTML += `
                    <div class="image-placeholder">No image available</div>
                `;
            }
            
            imageHTML += '</div>';
            
            const projectInfoHTML = `
                <div class="project-info">
                    <h2>${projectDetails.title.toUpperCase()}</h2>
                    <p class="project-category">${projectDetails.overview}</p>
                    
                    <div class="project-meta">
                        <div class="meta-item">
                            <h4>CLIENTE</h4>
                            <p>${projectDetails.client || ''}</p>
                        </div>
                        <div class="meta-item">
                            <h4>FECHA</h4>
                            <p>${projectDetails.date || projectDetails.year || ''}</p>
                        </div>
                        <div class="meta-item">
                            <h4>ROL</h4>
                            <p>${projectDetails.role || projectDetails.services || ''}</p>
                        </div>
                    </div>
                    
                    <div class="project-description">
                        <p>${projectDetails.development}</p>
                    </div>
                    
                    ${projectDetails.link ? `<a href="${projectDetails.link}" target="_blank" class="btn primary-btn">VER SITIO <i class="fa fa-external-link" aria-hidden="true"></i></a>` : ''}
                </div>
            `;
            
            modalContent.innerHTML = `<div class="project-details">${imageHTML}${projectInfoHTML}</div>`;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        } catch (error) {}
    };
});

function initGallery() {
    const gallerySlider = document.querySelector('.project-gallery-slider');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryDots = document.querySelectorAll('.gallery-dot');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    let currentIndex = 0;
    
    function showSlide(index) {
        currentIndex = index;
        
        gallerySlider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        galleryDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    galleryDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showSlide(index);
        });
    });
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            showSlide(newIndex);
        });
        
        nextBtn.addEventListener('click', function() {
            const newIndex = (currentIndex + 1) % galleryItems.length;
            showSlide(newIndex);
        });
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        const formElements = contactForm.elements;
        let formValid = true;
        
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                formElements[i].classList.add('error');
                formValid = false;
            } else {
                formElements[i].classList.remove('error');
            }
        }
        
        if (formValid) {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<p>Thank you for your message! I will get back to you soon.</p>';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        }
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('DOMContentLoaded', () => {
    skillBars.forEach(skillBar => {
        if (isInViewport(skillBar)) {
            const width = skillBar.getAttribute('style').match(/width: (\d+)/)[1];
            skillBar.style.width = width + '%';
        }
    });
    
    updateActiveNavLink();
    
    window.addEventListener('load', function() {
        window.dispatchEvent(new Event('resize'));
    });
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + header.offsetHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                link.classList.remove('active-section-nav');
                
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                    link.classList.add('active-section-nav');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        const spans = mobileMenuToggle.querySelectorAll('span');
        
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
}); 