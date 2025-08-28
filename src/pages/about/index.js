// About Us Page JavaScript Functionality

/**
 * Initialize About Us page animations and interactions
 */
export function initAbout() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupAboutPage);
    } else {
        setupAboutPage();
    }
}

/**
 * Setup all About Us page functionality
 * This function initializes all the interactive features
 */

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation triggers
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize staggered animations for card elements
 */
function initStaggeredAnimations() {
    // Staggered animation for team cards
    const teamCards = document.querySelectorAll('.role-card');
    teamCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Staggered animation for value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    // Tech table rows animation
    const techRows = document.querySelectorAll('.tech-row');
    techRows.forEach((row, index) => {
        row.style.animationDelay = `${index * 0.1}s`;
    });
}

/**
 * Typing effect for hero title
 */
function initTypingEffect() {
    setTimeout(() => {
        const heroTitle = document.querySelector('.about-hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 1000);
}

/**
 * Type writer effect function
 * @param {HTMLElement} element - Element to apply typing effect
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed in milliseconds
 */
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

/**
 * Initialize parallax effect for hero section
 */
function initParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.about-hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

/**
 * Initialize mouse follower effect (desktop only)
 */
function initMouseFollower() {
    // Only create mouse follower on desktop
    if (window.innerWidth > 768) {
        createMouseFollower();
    }
}

/**
 * Create and setup mouse follower element
 */
function createMouseFollower() {
    const mouseFollower = document.createElement('div');
    mouseFollower.id = 'mouse-follower';
    mouseFollower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #FFC042, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(mouseFollower);
    
    // Mouse move handler
    function handleMouseMove(e) {
        mouseFollower.style.left = e.clientX + 'px';
        mouseFollower.style.top = e.clientY + 'px';
    }
    
    // Mouse leave handler
    function handleMouseLeave() {
        mouseFollower.style.opacity = '0';
    }
    
    // Mouse enter handler
    function handleMouseEnter() {
        mouseFollower.style.opacity = '0.6';
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
}

/**
 * Initialize Easter eggs and fun interactions
 */
function initEasterEggs() {
    initKonamiCode();
    initCounterAnimations();
}

/**
 * Konami code easter egg
 */
function initKonamiCode() {
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            triggerRainbowEffect();
            konamiCode = [];
        }
    });
}

/**
 * Trigger rainbow effect for easter egg
 */
function triggerRainbowEffect() {
    document.body.style.animation = 'rainbow 2s ease-in-out';
    
    // Add rainbow animation if not exists
    if (!document.getElementById('rainbow-style')) {
        const style = document.createElement('style');
        style.id = 'rainbow-style';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                25% { filter: hue-rotate(90deg); }
                50% { filter: hue-rotate(180deg); }
                75% { filter: hue-rotate(270deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Reset after animation
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

/**
 * Counter animation for stats (extendable for future use)
 * @param {HTMLElement} element - Element to animate
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Animation duration in ms
 */
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

/**
 * Initialize counter animations for any stats elements
 */
function initCounterAnimations() {
    // Example usage - can be extended when stats are added
    const statsElements = document.querySelectorAll('[data-counter]');
    
    statsElements.forEach(element => {
        const endValue = parseInt(element.getAttribute('data-counter'));
        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(element, 0, endValue, duration);
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

/**
 * Initialize smooth scroll for internal links
 */
function initSmoothScroll() {
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

/**
 * Add hover effects to interactive elements
 */
function initHoverEffects() {
    // Enhanced hover effects for role cards
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Enhanced hover effects for value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotateY(360deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

/**
 * Performance optimized scroll handler
 */
function initOptimizedScroll() {
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Add any scroll-based animations here
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Cleanup function for page navigation
 */
export function cleanupAbout() {
    // Remove mouse follower
    const mouseFollower = document.getElementById('mouse-follower');
    if (mouseFollower) {
        mouseFollower.remove();
    }
    
    // Remove any event listeners if needed
    // This is important for SPAs to prevent memory leaks
}

/**
 * Utility function to detect if user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Initialize accessibility features
 */
function initAccessibility() {
    // Disable animations for users who prefer reduced motion
    if (prefersReducedMotion()) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize responsive features
 */
function initResponsive() {
    function handleResize() {
        // Remove mouse follower on mobile
        if (window.innerWidth <= 768) {
            const mouseFollower = document.getElementById('mouse-follower');
            if (mouseFollower) {
                mouseFollower.remove();
            }
        } else if (!document.getElementById('mouse-follower')) {
            // Re-add mouse follower on desktop
            createMouseFollower();
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on init
}

// Enhanced setup function with all features
function setupAboutPage() {
    initScrollAnimations();
    initStaggeredAnimations();
    initTypingEffect();
    initParallaxEffect();
    initMouseFollower();
    initEasterEggs();
    initSmoothScroll();
    initHoverEffects();
    initOptimizedScroll();
    initAccessibility();
    initResponsive();
}

// Auto-initialize if this script is loaded directly
if (typeof window !== 'undefined') {
    // Check if we're on the about page
    if (window.location.pathname === '/about' || document.querySelector('.about-hero')) {
        initAbout();
    }
}