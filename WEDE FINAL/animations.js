// animations.js - Advanced animations and interactive effects

class ScrollAnimator {
    constructor() {
        this.observers = [];
        this.init();
    }
    
    init() {
        this.setupScrollObserver();
        this.setupParallaxEffects();
        this.setupHoverAnimations();
    }
    
    setupScrollObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation delay for multiple elements
                    if (entry.target.classList.contains('service-card')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);
        
        // Observe all elements with animation classes
        const animatedElements = document.querySelectorAll('.service-card, .blog-post, .mission-card, .values-card');
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.banner, .about-hero');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    setupHoverAnimations() {
        // Card hover effects
        const cards = document.querySelectorAll('.service-card, .blog-post, .mission-card, .values-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.animateCardHover(e.currentTarget, 'enter');
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.animateCardHover(e.currentTarget, 'leave');
            });
        });
        
        // Button hover effects
        const buttons = document.querySelectorAll('.get-started-btn, .cta-btn, .submit-btn, .read-more');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.animateButtonHover(e.currentTarget, 'enter');
            });
            
            button.addEventListener('mouseleave', (e) => {
                this.animateButtonHover(e.currentTarget, 'leave');
            });
        });
    }
    
    animateCardHover(card, action) {
        if (action === 'enter') {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        }
    }
    
    animateButtonHover(button, action) {
        if (action === 'enter') {
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
        } else {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '';
        }
    }
}

class Typewriter {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.options = {
            speed: 50,
            delay: 2000,
            loop: true,
            ...options
        };
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let typeSpeed = this.options.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.options.delay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex++;
            if (this.currentTextIndex >= this.texts.length) {
                if (this.options.loop) {
                    this.currentTextIndex = 0;
                } else {
                    return;
                }
            }
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

class ParticleEffect {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            count: 30,
            colors: ['#4CAF50', '#2196F3', '#FFC107', '#E91E63'],
            ...options
        };
        this.particles = [];
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < this.options.count; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${this.options.colors[Math.floor(Math.random() * this.options.colors.length)]};
                border-radius: 50%;
                pointer-events: none;
            `;
            
            this.setInitialPosition(particle);
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    setInitialPosition(particle) {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particle.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        };
    }
    
    animate() {
        this.particles.forEach(particle => {
            let rect = particle.getBoundingClientRect();
            let containerRect = this.container.getBoundingClientRect();
            
            let x = parseFloat(particle.style.left) + particle.velocity.x;
            let y = parseFloat(particle.style.top) + particle.velocity.y;
            
            // Bounce off edges
            if (x <= 0 || x >= 100) particle.velocity.x *= -1;
            if (y <= 0 || y >= 100) particle.velocity.y *= -1;
            
            particle.style.left = Math.max(0, Math.min(100, x)) + '%';
            particle.style.top = Math.max(0, Math.min(100, y)) + '%';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    new ScrollAnimator();
    
    // Add loading animation
    initLoadingAnimation();
    
    // Add click effects
    initClickEffects();
    
    // Add cursor effects
    initCursorEffects();
});

function initLoadingAnimation() {
    // Add loaded class with delay for smooth entrance
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Animate elements sequentially
    const sequentialElements = document.querySelectorAll('.service-card, .blog-post');
    sequentialElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

function initClickEffects() {
    document.addEventListener('click', function(e) {
        // Create ripple effect for buttons
        if (e.target.matches('button, .btn, .cta-btn, .get-started-btn, .submit-btn')) {
            createRippleEffect(e);
        }
    });
    
    function createRippleEffect(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = diameter + 'px';
        circle.style.left = (event.clientX - button.getBoundingClientRect().left - radius) + 'px';
        circle.style.top = (event.clientY - button.getBoundingClientRect().top - radius) + 'px';
        circle.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        circle.style.borderRadius = '50%';
        circle.style.position = 'absolute';
        circle.style.transform = 'scale(0)';
        circle.style.animation = 'ripple 0.6s linear';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
        }, 600);
    }
    
    // Add ripple animation to CSS
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function initCursorEffects() {
    // Custom cursor effect (optional)
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #4CAF50;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const follower = document.createElement('div');
    follower.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #4CAF50;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        transition: all 0.2s ease;
    `;
    document.body.appendChild(follower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .blog-post');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = '#45a049';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = '#4CAF50';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Utility function for staggered animations
function staggerAnimation(elements, animationClass, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, index * delay);
    });
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScrollAnimator, Typewriter, ParticleEffect };
}