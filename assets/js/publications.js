// Publications page specific JavaScript

let publicationData = [];

document.addEventListener('DOMContentLoaded', function() {
    // Load publication data from JSON file
    loadPublicationData();
});

// Load publication data from JSON file
async function loadPublicationData() {
    try {
        const response = await fetch('./publications-data.json');
        const data = await response.json();
        publicationData = data.publications;
        
        // Initialize the page after data is loaded
        initializePage();
    } catch (error) {
        console.error('Error loading publication data:', error);
        // Fallback to empty array if loading fails
        publicationData = [];
        initializePage();
    }
}

// Initialize page after data is loaded
function initializePage() {
    // Generate publication HTML
    generatePublicationHTML();
    
    // Initialize publication statistics
    updatePublicationStats();
    
    // Set up search functionality
    setupSearch();
    
    // Set up filter functionality
    setupFilters();
    
    // Set up year navigation
    setupYearNavigation();
}

// Generate HTML for all publications
function generatePublicationHTML() {
    const publicationsContent = document.querySelector('.publications-content');
    if (!publicationsContent) return;

    // Group publications by year
    const publicationsByYear = {};
    publicationData.forEach(pub => {
        if (!publicationsByYear[pub.year]) {
            publicationsByYear[pub.year] = [];
        }
        publicationsByYear[pub.year].push(pub);
    });

    // Sort years in descending order
    const sortedYears = Object.keys(publicationsByYear).sort((a, b) => b - a);

    // Generate HTML for each year
    let html = '';
    sortedYears.forEach(year => {
        html += `
            <div class="year-section" data-year="${year}">
                <h3>${year}</h3>
                <div class="publication-list">
        `;
        
        publicationsByYear[year].forEach(pub => {
            const ifScore = pub.if ? `<span class="if-score">IF: ${pub.if}</span>` : '';
            const jcrRank = pub.jcr ? `<span class="jcr-rank">${pub.jcr === 'KCI' ? 'KCI' : 'JCR: ' + pub.jcr}</span>` : '';
            
            html += `
                <div class="publication-item" data-type="${pub.type}">
                    <div class="pub-info">
                        <h4>${pub.title}</h4>
                        <p class="pub-authors">${pub.authors}</p>
                        <p class="pub-journal">${pub.journal}${pub.volume ? ', ' + pub.volume : ''}${pub.issue ? '(' + pub.issue + ')' : ''}${pub.pages ? ', ' + pub.pages : ''}</p>
                        <div class="pub-metrics">
                            ${ifScore}
                            ${jcrRank}
                        </div>
                        <div class="pub-abstract" style="display: none;">
                            <p><strong>Abstract:</strong> ${pub.abstract}</p>
                            <p><strong>Keywords:</strong> ${pub.keywords.join(', ')}</p>
                        </div>
                    </div>
                    <div class="pub-links">
                        ${pub.doi ? `<a href="https://doi.org/${pub.doi}" class="pub-link" title="View Online" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
                        <a href="#" class="pub-link" title="View Abstract" onclick="toggleAbstract(this)"><i class="fas fa-eye"></i></a>
                        <a href="#" class="pub-link" title="Download PDF"><i class="fas fa-download"></i></a>
                        <a href="#" class="pub-link" title="Cite" onclick="showCitation(this)"><i class="fas fa-quote-right"></i></a>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });

    publicationsContent.innerHTML = html;
}

// Update publication statistics
function updatePublicationStats() {
    const totalPubs = publicationData.length;
    const totalCitations = 78; // From your Google Scholar data
    const hIndex = 5; // From your Google Scholar data
    const i10Index = 2; // From your Google Scholar data

    // Update stats if elements exist
    const elements = {
        'total-pubs': totalPubs,
        'total-citations': totalCitations,
        'h-index': hIndex,
        'i10-index': i10Index
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            animateCounter(id, value);
        }
    });
}

// Animate counter
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue;
        }
    }

    requestAnimationFrame(updateCounter);
}

// Setup year navigation
function setupYearNavigation() {
    const navButtons = document.querySelectorAll('.pub-nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const selectedYear = this.getAttribute('data-year');
            filterByYear(selectedYear);
        });
    });
}

// Filter publications by year
function filterByYear(year) {
    const yearSections = document.querySelectorAll('.year-section');
    
    yearSections.forEach(section => {
        const sectionYear = section.getAttribute('data-year');
        if (year === 'all' || sectionYear === year) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('pub-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterPublications(searchTerm);
    });
}

// Setup filter functionality
function setupFilters() {
    const yearFilter = document.getElementById('year-filter');
    const typeFilter = document.getElementById('type-filter');

    if (yearFilter) {
        yearFilter.addEventListener('change', function() {
            filterPublications();
        });
    }

    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            filterPublications();
        });
    }
}

// Filter publications based on search and filters
function filterPublications(searchTerm = '') {
    const publicationItems = document.querySelectorAll('.publication-item');
    let visibleCount = 0;

    publicationItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const authors = item.querySelector('.pub-authors').textContent.toLowerCase();
        const journal = item.querySelector('.pub-journal').textContent.toLowerCase();

        const matchesSearch = searchTerm === '' || 
            title.includes(searchTerm) || 
            authors.includes(searchTerm) || 
            journal.includes(searchTerm);

        if (matchesSearch) {
            item.style.display = 'flex';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    // Show/hide year sections based on visible items
    const yearSections = document.querySelectorAll('.year-section');
    yearSections.forEach(section => {
        const visibleItems = section.querySelectorAll('.publication-item[style*="flex"]');
        if (visibleItems.length > 0) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    // Show no results message if no publications are visible
    showNoResults(visibleCount === 0);
}

// Show no results message
function showNoResults(show) {
    let noResultsDiv = document.querySelector('.no-results');
    
    if (show && !noResultsDiv) {
        noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>No publications found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        document.querySelector('.publications-content').appendChild(noResultsDiv);
    } else if (!show && noResultsDiv) {
        noResultsDiv.remove();
    }
}

// Toggle abstract visibility
function toggleAbstract(button) {
    const publicationItem = button.closest('.publication-item');
    const abstract = publicationItem.querySelector('.pub-abstract');
    
    if (abstract.style.display === 'none' || abstract.style.display === '') {
        abstract.style.display = 'block';
        button.innerHTML = '<i class="fas fa-eye-slash"></i>';
        button.title = 'Hide Abstract';
    } else {
        abstract.style.display = 'none';
        button.innerHTML = '<i class="fas fa-eye"></i>';
        button.title = 'View Abstract';
    }
}

// Show citation
function showCitation(button) {
    const publicationItem = button.closest('.publication-item');
    const title = publicationItem.querySelector('h4').textContent;
    const authors = publicationItem.querySelector('.pub-authors').textContent;
    const journal = publicationItem.querySelector('.pub-journal').textContent;
    
    // Find the publication data to get the year
    const pubData = publicationData.find(pub => pub.title === title);
    const year = pubData ? pubData.year : new Date().getFullYear();
    
    const citation = `${authors} (${year}). ${title}. ${journal}.`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(citation).then(() => {
        showNotification('Citation copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy citation', 'error');
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    switch(type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'info':
        default:
            notification.style.background = '#3498db';
            break;
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .pub-abstract {
        margin-top: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 5px;
        border-left: 4px solid #3498db;
    }
    
    .pub-abstract p {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        line-height: 1.5;
    }
`;
document.head.appendChild(style);