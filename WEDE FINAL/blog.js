// blog.js - Blog functionality for expandable posts

document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog page loaded successfully');
    initBlogPosts();
    initNewsletterForm();
    addReadingProgress();
});

function initBlogPosts() {
    console.log('Initializing blog posts...');
    
    // Add click handlers to all read more/less buttons
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    const readLessButtons = document.querySelectorAll('.read-less-btn');
    
    console.log(`Found ${readMoreButtons.length} read more buttons`);
    console.log(`Found ${readLessButtons.length} read less buttons`);
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-post');
            console.log(`Expanding post: ${postId}`);
            expandBlogPost(postId);
        });
    });
    
    readLessButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-post');
            console.log(`Collapsing post: ${postId}`);
            collapseBlogPost(postId);
        });
    });
    
    // Add smooth scrolling for better UX
    initSmoothScrolling();
    
    console.log('Blog posts initialized successfully');
}

function expandBlogPost(postId) {
    const post = document.getElementById(postId);
    if (!post) {
        console.error(`Post not found: ${postId}`);
        return;
    }
    
    const fullContent = post.querySelector('.post-full-content');
    const readMoreBtn = post.querySelector('.read-more-btn');
    const readLessBtn = post.querySelector('.read-less-btn');
    const excerpt = post.querySelector('.post-excerpt');
    
    // Hide excerpt and show full content
    if (excerpt) excerpt.style.display = 'none';
    if (fullContent) {
        fullContent.style.display = 'block';
        fullContent.classList.add('content-expanding');
    }
    
    // Switch button visibility
    if (readMoreBtn) readMoreBtn.style.display = 'none';
    if (readLessBtn) readLessBtn.style.display = 'inline-block';
    
    // Scroll to the post for better user experience
    setTimeout(() => {
        post.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
    
    console.log(`Expanded: ${post.querySelector('h2').textContent}`);
}

function collapseBlogPost(postId) {
    const post = document.getElementById(postId);
    if (!post) {
        console.error(`Post not found: ${postId}`);
        return;
    }
    
    const fullContent = post.querySelector('.post-full-content');
    const readMoreBtn = post.querySelector('.read-more-btn');
    const readLessBtn = post.querySelector('.read-less-btn');
    const excerpt = post.querySelector('.post-excerpt');
    
    // Show excerpt and hide full content
    if (excerpt) excerpt.style.display = 'block';
    if (fullContent) {
        fullContent.style.display = 'none';
        fullContent.classList.remove('content-expanding');
    }
    
    // Switch button visibility
    if (readMoreBtn) readMoreBtn.style.display = 'inline-block';
    if (readLessBtn) readLessBtn.style.display = 'none';
    
    // Scroll to the top of the post
    post.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    console.log(`Collapsed: ${post.querySelector('h2').textContent}`);
}

function initSmoothScrolling() {
    // Smooth scrolling for internal links
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
}

function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        console.log('Newsletter form found, initializing...');
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate subscription success
                showBlogNotification('🎉 Thank you for subscribing to our career newsletter!', 'success');
                emailInput.value = '';
                
                // Add to local storage to remember subscription
                localStorage.setItem('newsletterSubscribed', 'true');
                
                // Update form state
                updateNewsletterFormState();
            } else {
                showBlogNotification('Please enter a valid email address.', 'error');
                emailInput.style.borderColor = '#e74c3c';
            }
        });
        
        // Check if already subscribed
        updateNewsletterFormState();
    } else {
        console.log('Newsletter form not found');
    }
}

function updateNewsletterFormState() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    if (localStorage.getItem('newsletterSubscribed')) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button');
        
        if (emailInput) {
            emailInput.placeholder = "You're already subscribed! 🎉";
            emailInput.disabled = true;
        }
        
        if (submitButton) {
            submitButton.textContent = 'Subscribed ✓';
            submitButton.disabled = true;
            submitButton.style.backgroundColor = '#95a5a6';
        }
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showBlogNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.blog-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `blog-notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        z-index: 10000;
        font-weight: bold;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-size: 14px;
        cursor: pointer;
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

// Keyboard navigation for blog posts
document.addEventListener('keydown', function(e) {
    // Close expanded posts with Escape key
    if (e.key === 'Escape') {
        const expandedPosts = document.querySelectorAll('.post-full-content[style*="display: block"]');
        expandedPosts.forEach(fullContent => {
            const post = fullContent.closest('.blog-post');
            const postId = post.id;
            collapseBlogPost(postId);
        });
    }
});

// Add reading progress bar
function addReadingProgress() {
    // Remove existing progress bar if any
    const existingProgress = document.querySelector('.reading-progress');
    if (existingProgress) {
        existingProgress.remove();
    }
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #4CAF50, #2196F3);
        width: 0%;
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / (docHeight - winHeight)) * 100;
        progressBar.style.width = progress + '%';
    });
    
    console.log('Reading progress bar added');
}

// Debug function to check if everything is working
function debugBlog() {
    console.log('=== BLOG DEBUG INFO ===');
    console.log('Posts found:', document.querySelectorAll('.blog-post').length);
    console.log('Read more buttons:', document.querySelectorAll('.read-more-btn').length);
    console.log('Read less buttons:', document.querySelectorAll('.read-less-btn').length);
    console.log('Newsletter form:', document.querySelector('.newsletter-form') ? 'Found' : 'Not found');
    console.log('CSS loaded:', document.querySelector('link[href*="blog.css"]') ? 'Yes' : 'No');
    console.log('=====================');
}

// Run debug on load
setTimeout(debugBlog, 1000);

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initBlogPosts, expandBlogPost, collapseBlogPost };
}