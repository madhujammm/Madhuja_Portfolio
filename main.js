// Particle System
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Advanced Theme Toggle with Smooth Transitions
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition effect
    body.style.transition = 'all 0.5s ease';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Remove transition after animation
    setTimeout(() => {
        body.style.transition = '';
    }, 500);
});

// Enhanced Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Add body scroll lock when menu is open
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Advanced Smooth Scrolling with Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic Navbar with Advanced Effects
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Navbar background and blur effects
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(0, 212, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '1px solid rgba(0, 212, 255, 0.2)';
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Enhanced Download Resume with Animation
document.getElementById('download-resume').addEventListener('click', (e) => {
    e.preventDefault();
    
    const button = e.target.closest('.btn');
    const originalText = button.innerHTML;
    
    // Animate button
    button.style.transform = 'scale(0.95)';
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    
    setTimeout(() => {
        // Replace with your actual resume URL
        const resumeUrl = 'https://drive.google.com/file/d/1nwURKTs9O4RmpgwsWuvfipLrsa447Hx1/view?usp=drive_link';
        
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'myresume2025.pdf';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset button
        button.innerHTML = originalText;
        button.style.transform = '';
        
        showAdvancedNotification('Resume download started!', 'success');
    }, 1500);
});

// Enhanced Contact Form with Validation
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Advanced validation
    if (!name || name.length < 2) {
        showAdvancedNotification('Please enter a valid name (at least 2 characters)', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAdvancedNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (!message || message.length < 10) {
        showAdvancedNotification('Please enter a message (at least 10 characters)', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = e.target.querySelector('.btn');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        console.log('Form submitted:', { name, email, message });
        e.target.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        showAdvancedNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }, 2000);
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Advanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special animations for different elements
            if (entry.target.classList.contains('tech-item')) {
                animateTechItems(entry.target);
            } else if (entry.target.classList.contains('project-card')) {
                animateProjectCard(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('section, .tech-item, .project-card, .highlight-item').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Advanced Typing Effect with Multiple Strings
function advancedTypeWriter(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? deleteSpeed : speed;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Initialize advanced typing effect
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.gradient-text');
    if (heroTitle) {
        const texts = ['Madhuja Mungase', 'Data Analyst', 'Software Developer', 'Problem Solver'];
        advancedTypeWriter(heroTitle, texts, 150, 75, 2000);
    }
    
    // Initialize particles
    createParticles();
});

// Enhanced Project Cards with 3D Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        card.style.transform = 'translateY(-15px) rotateX(5deg) rotateY(5deg) scale(1.02)';
        card.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

// Enhanced Tech Items with Stagger Animation
function animateTechItems(container) {
    const items = container.querySelectorAll('.tech-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

// Project Card Animation
function animateProjectCard(card) {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
}

// Enhanced Floating Animation for Hero Cards
function initAdvancedFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        const delay = index * 2000;
        const duration = 8000 + (index * 1000);
        
        card.style.animation = `float3D ${duration}ms ease-in-out infinite`;
        card.style.animationDelay = `${delay}ms`;
        
        // Add mouse interaction
        card.addEventListener('mouseenter', () => {
            card.style.animationPlayState = 'paused';
            card.style.transform = 'translateY(-20px) scale(1.1) rotateX(0deg) rotateY(0deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animationPlayState = 'running';
        });
    });
}

// Advanced Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual, .floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Advanced Notification System
function showAdvancedNotification(message, type = 'info', duration = 4000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Create notification content
    const icon = getNotificationIcon(type);
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 400px;
    `;
    
    // Set background based on type
    const backgrounds = {
        success: 'linear-gradient(45deg, #10b981, #059669)',
        error: 'linear-gradient(45deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(45deg, #f59e0b, #d97706)',
        info: 'linear-gradient(45deg, #00d4ff, #0ea5e9)'
    };
    
    notification.style.background = backgrounds[type] || backgrounds.info;
    
    // Add notification content styles
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .notification-content i:first-child {
            font-size: 1.2rem;
            flex-shrink: 0;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: background 0.2s ease;
            margin-left: auto;
        }
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Slide in animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%) scale(0.8)';
    notification.style.opacity = '0';
    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 400);
}

// Initialize advanced floating cards
window.addEventListener('load', initAdvancedFloatingCards);

// Enhanced Performance Monitoring
function logAdvancedPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
        
        console.log(`%c🚀 Performance Metrics`, 'color: #00d4ff; font-size: 16px; font-weight: bold;');
        console.log(`📊 Page Load Time: ${loadTime}ms`);
        console.log(`⚡ DOM Content Loaded: ${domContentLoaded}ms`);
        
        if (loadTime > 3000) {
            console.warn('⚠️ Page load time is slower than recommended (>3s)');
        }
    }
}

// Enhanced Error Handling
window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript Error:', e.error);
    showAdvancedNotification('Something went wrong. Please refresh the page.', 'error');
});

// Enhanced Image Error Handling
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        img.style.display = 'none';
        console.warn('🖼️ Failed to load image:', img.src);
    });
    
    img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });
});

// Enhanced Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
    
    // Quick navigation with number keys
    if (e.altKey) {
        const sections = ['#home', '#tech', '#projects', '#about', '#contact'];
        const key = parseInt(e.key);
        if (key >= 1 && key <= sections.length) {
            e.preventDefault();
            document.querySelector(sections[key - 1]).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Enhanced Focus Management
document.addEventListener('DOMContentLoaded', () => {
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .nav-link:focus,
        .btn:focus,
        .project-link:focus,
        .social-link:focus,
        .theme-toggle:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
            box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.3);
            border-radius: 4px;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.3);
        }
    `;
    document.head.appendChild(style);
});

// Dynamic Copyright Year
document.addEventListener('DOMContentLoaded', () => {
    const copyrightElement = document.querySelector('.footer-content p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} Madhuja Mungase. All rights reserved.`;
    }
});

// Initialize performance monitoring
window.addEventListener('load', () => {
    logAdvancedPerformance();
    console.log('%c🎨 Creative Portfolio Loaded Successfully!', 'color: #00d4ff; font-size: 18px; font-weight: bold;');
});

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

console.log('%c🚀 Advanced Portfolio System Initialized', 'color: #00d4ff; font-size: 14px; font-weight: bold;');
