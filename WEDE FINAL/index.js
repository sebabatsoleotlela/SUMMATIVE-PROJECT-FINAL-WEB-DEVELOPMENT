// main.js - Main JavaScript functionality for LaunchPAD website

document.addEventListener('DOMContentLoaded', function() {
    console.log('LaunchPAD website initialized');
    
    // Initialize all features
    initNavigation();
    initSmoothScrolling();
    initAnimations();
    initServiceCards();
    initNewsletterForm();
});

// 1. Navigation Enhancement
function initNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Add active class to current page
        if (linkHref === currentPage) {
            link.classList.add('active');
            link.style.backgroundColor = '#2A4D6C';
            link.style.color = '#4CAF50';
        }
        
        // Add hover effects
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
}

// 2. Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 3. Animations
function initAnimations() {
    // Add fade-in animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.service-card, .blog-post, .mission-card, .values-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Simple scroll trigger
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Check on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
}

// 4. Service Cards Enhancement
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });
    });
}

// 5. Newsletter Form Handler
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate subscription
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
                emailInput.style.borderColor = '#e74c3c';
            }
        });
        
        // Real-time email validation
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        emailInput.addEventListener('input', function() {
            if (validateEmail(this.value.trim())) {
                this.style.borderColor = '#4CAF50';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    }
}

// 6. Utility Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        font-weight: bold;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    } else {
        notification.style.backgroundColor = '#2196F3';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Add click to close
    notification.addEventListener('click', function() {
        this.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
}

// 7. Page Load Enhancements
window.addEventListener('load', function() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Enhance images with loading animation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transition = 'opacity 0.5s ease';
            });
        }
    });
});

// 8. Mobile Menu Toggle (for future responsive enhancement)
function initMobileMenu() {
    // This can be expanded for mobile menu functionality
    console.log('Mobile menu ready for implementation');
}

// Make functions available globally
window.LaunchPAD = {
    showNotification,
    validateEmail,
    initNavigation
};

// Export for module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LaunchPAD };
}