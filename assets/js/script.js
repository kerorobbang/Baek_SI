// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Publications filtering by year
const pubNavBtns = document.querySelectorAll('.pub-nav-btn');
const yearSections = document.querySelectorAll('.year-section');

pubNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        pubNavBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const selectedYear = btn.getAttribute('data-year');
        
        yearSections.forEach(section => {
            if (selectedYear === 'all' || section.getAttribute('data-year') === selectedYear) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.research-item, .publication-item, .stat-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Publication search functionality
function searchPublications() {
    const searchInput = document.getElementById('pub-search');
    const searchTerm = searchInput.value.toLowerCase();
    const publications = document.querySelectorAll('.publication-item');
    
    publications.forEach(pub => {
        const title = pub.querySelector('h4').textContent.toLowerCase();
        const authors = pub.querySelector('.pub-authors').textContent.toLowerCase();
        const journal = pub.querySelector('.pub-journal').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || authors.includes(searchTerm) || journal.includes(searchTerm)) {
            pub.style.display = 'flex';
        } else {
            pub.style.display = 'none';
        }
    });
}

// Add search functionality if search input exists
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('pub-search');
    if (searchInput) {
        searchInput.addEventListener('input', searchPublications);
    }
});

// Copy email to clipboard
function copyEmail() {
    const email = 'your.email@institution.edu';
    navigator.clipboard.writeText(email).then(() => {
        // Show tooltip or notification
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Email copied to clipboard!';
        tooltip.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
        `;
        document.body.appendChild(tooltip);
        setTimeout(() => tooltip.remove(), 3000);
    });
}

// Add click handler to email if it exists
document.addEventListener('DOMContentLoaded', () => {
    const emailElement = document.querySelector('.contact-item p');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.addEventListener('click', copyEmail);
    }
});

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});
