// Publications page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize publication statistics
    updatePublicationStats();
    
    // Set up search functionality
    setupSearch();
    
    // Set up filter functionality
    setupFilters();
    
    // Set up action buttons
    setupActionButtons();
});

// Publication data (in a real application, this would come from an API)
const publicationData = [
    {
        id: 1,
        year: 2024,
        type: 'journal',
        title: 'Advanced Machine Learning Techniques for Environmental Monitoring',
        authors: 'Your Name, Co-author 1, Co-author 2, Co-author 3',
        journal: 'Environmental Science & Technology, 58(12), 4567-4578',
        if: 5.2,
        jcr: 'Q1',
        citations: 15,
        doi: '10.1021/acs.est.4c01234',
        abstract: 'This study presents novel machine learning approaches for environmental monitoring applications...'
    },
    {
        id: 2,
        year: 2024,
        type: 'conference',
        title: 'Real-time Data Processing for IoT Environmental Sensors',
        authors: 'Your Name, Co-author 1, Co-author 2',
        journal: 'Proceedings of the 15th International Conference on Environmental Informatics, 2024',
        if: null,
        jcr: null,
        citations: 3,
        doi: null,
        abstract: 'This paper presents a real-time data processing framework for IoT environmental monitoring systems...'
    },
    {
        id: 3,
        year: 2023,
        type: 'journal',
        title: 'Deep Learning Applications in Climate Change Research',
        authors: 'Your Name, Co-author 1, Co-author 2, Co-author 3, Co-author 4',
        journal: 'Nature Climate Change, 13(8), 1234-1245',
        if: 4.8,
        jcr: 'Q1',
        citations: 28,
        doi: '10.1038/s41558-023-01678-9',
        abstract: 'This comprehensive study explores the application of deep learning techniques in climate change research...'
    },
    {
        id: 4,
        year: 2023,
        type: 'journal',
        title: 'Sustainable Energy Solutions for Smart Cities',
        authors: 'Your Name, Co-author 1, Co-author 2',
        journal: 'Renewable and Sustainable Energy Reviews, 45, 112-125',
        if: 3.9,
        jcr: 'Q2',
        citations: 12,
        doi: '10.1016/j.rser.2023.113456',
        abstract: 'This review paper examines sustainable energy solutions and their implementation in smart city environments...'
    }
];

// Update publication statistics
function updatePublicationStats() {
    const totalPubs = publicationData.length;
    const totalCitations = publicationData.reduce((sum, pub) => sum + pub.citations, 0);
    const avgIF = publicationData
        .filter(pub => pub.if !== null)
        .reduce((sum, pub) => sum + pub.if, 0) / publicationData.filter(pub => pub.if !== null).length;
    const hIndex = calculateHIndex(publicationData.map(pub => pub.citations));

    // Animate counters
    animateCounter('total-pubs', totalPubs);
    animateCounter('total-citations', totalCitations);
    animateCounter('avg-if', avgIF.toFixed(1));
    animateCounter('h-index', hIndex);
}

// Calculate H-index
function calculateHIndex(citations) {
    citations.sort((a, b) => b - a);
    let h = 0;
    for (let i = 0; i < citations.length; i++) {
        if (citations[i] >= i + 1) {
            h = i + 1;
        } else {
            break;
        }
    }
    return h;
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

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('pub-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterPublications();
    });
}

// Setup filter functionality
function setupFilters() {
    const yearFilter = document.getElementById('year-filter');
    const typeFilter = document.getElementById('type-filter');

    if (yearFilter) {
        yearFilter.addEventListener('change', filterPublications);
    }

    if (typeFilter) {
        typeFilter.addEventListener('change', filterPublications);
    }
}

// Filter publications based on search and filters
function filterPublications() {
    const searchTerm = document.getElementById('pub-search').value.toLowerCase();
    const yearFilter = document.getElementById('year-filter').value;
    const typeFilter = document.getElementById('type-filter').value;

    const publicationItems = document.querySelectorAll('.publication-item');
    let visibleCount = 0;

    publicationItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const authors = item.querySelector('.pub-authors').textContent.toLowerCase();
        const journal = item.querySelector('.pub-journal').textContent.toLowerCase();
        const year = item.closest('.year-section').getAttribute('data-year');
        const type = item.getAttribute('data-type');

        const matchesSearch = searchTerm === '' || 
            title.includes(searchTerm) || 
            authors.includes(searchTerm) || 
            journal.includes(searchTerm);

        const matchesYear = yearFilter === 'all' || year === yearFilter;
        const matchesType = typeFilter === 'all' || type === typeFilter;

        if (matchesSearch && matchesYear && matchesType) {
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
            <i class="fas fa-search"></i>
            <h3>No publications found</h3>
            <p>Try adjusting your search criteria or filters</p>
        `;
        document.querySelector('.publications-list').appendChild(noResultsDiv);
    } else if (!show && noResultsDiv) {
        noResultsDiv.remove();
    }
}

// Setup action buttons
function setupActionButtons() {
    // Abstract toggle functionality
    document.querySelectorAll('.action-btn[title="View Abstract"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleAbstract(this);
        });
    });

    // Download functionality
    document.querySelectorAll('.action-btn[title="Download PDF"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadPDF(this);
        });
    });

    // External link functionality
    document.querySelectorAll('.action-btn[title="View Online"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openExternalLink(this);
        });
    });

    // Citation functionality
    document.querySelectorAll('.action-btn[title="Cite"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showCitation(this);
        });
    });
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

// Download PDF (placeholder)
function downloadPDF(button) {
    const publicationItem = button.closest('.publication-item');
    const title = publicationItem.querySelector('h3').textContent;
    
    // In a real application, this would download the actual PDF
    showNotification(`Downloading PDF for: ${title}`, 'info');
}

// Open external link (placeholder)
function openExternalLink(button) {
    const publicationItem = button.closest('.publication-item');
    const title = publicationItem.querySelector('h3').textContent;
    
    // In a real application, this would open the actual journal link
    showNotification(`Opening external link for: ${title}`, 'info');
}

// Show citation
function showCitation(button) {
    const publicationItem = button.closest('.publication-item');
    const title = publicationItem.querySelector('h3').textContent;
    const authors = publicationItem.querySelector('.pub-authors').textContent;
    const journal = publicationItem.querySelector('.pub-journal').textContent;
    
    const citation = `${authors} (${new Date().getFullYear()}). ${title}. ${journal}.`;
    
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
`;
document.head.appendChild(style);
