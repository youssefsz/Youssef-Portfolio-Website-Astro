/**
 * Easy Reader Landing Page JavaScript
 * Modern, responsive landing page with theme switching and animations
 */

// ===== GLOBAL VARIABLES =====
let currentTheme = 'dark';
let isMenuOpen = false;
let currentScreen = 'home';

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeScreenNavigation();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeImageSwitching();
    
    // Initialize performance optimizations
    initializeIntersectionObserver();
    initializeLazyLoading();
    
    // Load critical images immediately
    setTimeout(() => {
        preloadCriticalImages();
    }, 100);
});

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('easy-reader-theme') || 'dark';
    currentTheme = savedTheme;
    body.setAttribute('data-theme', currentTheme);
    
    // Update all theme-dependent images after a short delay to ensure DOM is ready
    setTimeout(() => {
        updateAllImages();
    }, 100);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const body = document.body;
    
    // Toggle theme
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update body attribute with smooth transition
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    body.setAttribute('data-theme', currentTheme);
    
    // Save theme preference
    localStorage.setItem('easy-reader-theme', currentTheme);
    
    // Update all images with theme
    updateAllImages();
    
    // Add visual feedback
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    }
}

function updateAllImages() {
    // Update hero screenshot
    const heroScreenshot = document.getElementById('heroScreenshot');
    if (heroScreenshot) {
        updateImageSource(heroScreenshot);
    }
    
    // Update all screen images
    const screenImages = document.querySelectorAll('.screen-img');
    screenImages.forEach(img => updateImageSource(img));
    
    // Update premium image
    const premiumImg = document.querySelector('.premium-img');
    if (premiumImg) {
        updateImageSource(premiumImg);
    }
}

function updateImageSource(img) {
    const lightSrc = img.getAttribute('data-light');
    const darkSrc = img.getAttribute('data-dark');
    const placeholder = img.closest('.image-placeholder');
    
    if (lightSrc && darkSrc) {
        const newSrc = currentTheme === 'dark' ? darkSrc : lightSrc;
        
        // Only update if image is already loaded (has src attribute)
        if (img.src && img.src !== window.location.href) {
            // Fade out, change source, fade in
            img.style.opacity = '0.7';
            img.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                img.src = newSrc;
                img.style.opacity = '1';
            }, 150);
        } else if (placeholder && placeholder.getAttribute('data-loaded') !== 'true') {
            // Image not loaded yet, load it with correct theme
            loadLazyImage(img, placeholder);
        }
    }
}

// ===== NAVIGATION =====
function initializeNavigation() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Navigation links smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (isMenuOpen) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

function openMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    navMenu.classList.add('mobile-open');
    mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
    isMenuOpen = true;
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    navMenu.classList.remove('mobile-open');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
    isMenuOpen = false;
}

// ===== SCREEN NAVIGATION =====
function initializeScreenNavigation() {
    const screenNavButtons = document.querySelectorAll('.screen-nav-btn');
    const screenItems = document.querySelectorAll('.screen-item');
    
    screenNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetScreen = button.getAttribute('data-target');
            switchToScreen(targetScreen);
        });
    });
}

function switchToScreen(screenName) {
    if (screenName === currentScreen) return;
    
    const currentItem = document.querySelector(`[data-screen="${currentScreen}"]`);
    const targetItem = document.querySelector(`[data-screen="${screenName}"]`);
    const screenNavButtons = document.querySelectorAll('.screen-nav-btn');
    
    if (!currentItem || !targetItem) return;
    
    // Load target screen image if not already loaded
    const targetImg = targetItem.querySelector('.lazy-image');
    if (targetImg) {
        const placeholder = targetImg.closest('.image-placeholder');
        if (placeholder && placeholder.getAttribute('data-loaded') !== 'true') {
            loadLazyImage(targetImg, placeholder);
        }
    }
    
    // Update navigation buttons immediately for visual feedback
    screenNavButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    const targetButton = document.querySelector(`[data-target="${screenName}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }
    
    // Force complete hiding of current item before showing new one
    currentItem.classList.remove('active');
    
    // Force DOM reflow to ensure current item is completely hidden
    currentItem.offsetHeight;
    
    // Immediately show target item - no overlap possible
    targetItem.classList.add('active');
    currentScreen = screenName;
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    // Smooth scroll for all anchor links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#' || href === '#download') {
                if (href === '#download') {
                    e.preventDefault();
                    const downloadSection = document.querySelector('#download');
                    if (downloadSection) {
                        const offsetTop = downloadSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    // Add animate-on-scroll class to elements
    const animatedElements = document.querySelectorAll(`
        .feature-card,
        .tool-card,
        .screen-item,
        .premium-feature,
        .section-header
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Check for elements in viewport on scroll
    window.addEventListener('scroll', checkScrollAnimations);
    // Initial check
    checkScrollAnimations();
}

function checkScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.animate)');
    
    animatedElements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('animate');
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const threshold = 100; // Trigger animation 100px before element is fully visible
    
    return (
        rect.top <= (window.innerHeight - threshold) &&
        rect.bottom >= threshold
    );
}

// ===== INTERSECTION OBSERVER =====
function initializeIntersectionObserver() {
    // More performant scroll animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with delay for staggered animation
    const elementsToObserve = document.querySelectorAll('.animate-on-scroll');
    elementsToObserve.forEach((el, index) => {
        setTimeout(() => {
            observer.observe(el);
        }, index * 50); // Stagger observations
    });
}

// ===== LAZY LOADING =====
function initializeLazyLoading() {
    // Intersection Observer for lazy loading
    const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const placeholder = img.closest('.image-placeholder');
                
                loadLazyImage(img, placeholder);
                lazyImageObserver.unobserve(img);
            }
        });
    }, {
        // Load images when they're 50px away from viewport
        rootMargin: '50px'
    });
    
    // Observe all lazy images
    const lazyImages = document.querySelectorAll('.lazy-image');
    lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
    });
    
    // Preload critical images immediately
    preloadCriticalImages();
}

function loadLazyImage(img, placeholder) {
    const dataSrc = img.getAttribute('data-src');
    const lightSrc = img.getAttribute('data-light');
    const darkSrc = img.getAttribute('data-dark');
    
    // Determine which image to load based on theme
    let srcToLoad;
    if (lightSrc && darkSrc) {
        srcToLoad = currentTheme === 'dark' ? darkSrc : lightSrc;
    } else {
        srcToLoad = dataSrc;
    }
    
    if (srcToLoad) {
        // Create a new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = function() {
            // Set the source and mark as loaded
            img.src = srcToLoad;
            img.classList.add('loaded');
            
            if (placeholder) {
                placeholder.setAttribute('data-loaded', 'true');
            }
            
            // Preload the other theme image if available
            if (lightSrc && darkSrc) {
                const otherSrc = currentTheme === 'dark' ? lightSrc : darkSrc;
                preloadImage(otherSrc);
            }
        };
        
        imageLoader.onerror = function() {
            console.warn('Failed to load image:', srcToLoad);
            // Try fallback or show error state
            if (placeholder) {
                placeholder.setAttribute('data-loaded', 'error');
                const spinner = placeholder.querySelector('.loading-spinner');
                if (spinner) {
                    spinner.style.display = 'none';
                }
            }
        };
        
        // Start loading
        imageLoader.src = srcToLoad;
    }
}

function preloadCriticalImages() {
    // Mark hero image as loaded since it has src
    const heroImg = document.getElementById('heroScreenshot');
    if (heroImg && heroImg.src) {
        const placeholder = heroImg.closest('.image-placeholder');
        if (placeholder) {
            placeholder.setAttribute('data-loaded', 'true');
        }
    }
    
    // Preload active screen image
    const activeScreenImg = document.querySelector('.screen-item.active .lazy-image');
    if (activeScreenImg) {
        const placeholder = activeScreenImg.closest('.image-placeholder');
        loadLazyImage(activeScreenImg, placeholder);
    }
}

function preloadImage(src) {
    if (src) {
        const img = new Image();
        img.src = src;
    }
}

// ===== IMAGE SWITCHING =====
function initializeImageSwitching() {
    // Set initial images based on current theme
    updateAllImages();
    
    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                updateAllImages();
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    checkScrollAnimations();
}, 10);

// Throttled scroll handler for navbar
const throttledScrollHandler = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 16); // ~60fps

// Replace scroll handlers with optimized versions
window.removeEventListener('scroll', checkScrollAnimations);
window.addEventListener('scroll', debouncedScrollHandler);
window.addEventListener('scroll', throttledScrollHandler);

// ===== FLOATING ANIMATIONS =====
function initializeFloatingAnimations() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Random floating animation
        const randomDelay = Math.random() * 2000;
        const randomDuration = 3000 + Math.random() * 2000;
        
        setTimeout(() => {
            icon.style.animation = `float ${randomDuration}ms ease-in-out infinite`;
        }, randomDelay);
    });
}

// ===== HOVER EFFECTS =====
function initializeHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.feature-card, .tool-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
}

// ===== BUTTON INTERACTIONS =====
function initializeButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== KEYBOARD NAVIGATION =====
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
        
        // Tab navigation for screen buttons
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const screenButtons = document.querySelectorAll('.screen-nav-btn');
            const activeButton = document.querySelector('.screen-nav-btn.active');
            const currentIndex = Array.from(screenButtons).indexOf(activeButton);
            
            if (currentIndex !== -1) {
                e.preventDefault();
                let newIndex;
                
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : screenButtons.length - 1;
                } else {
                    newIndex = currentIndex < screenButtons.length - 1 ? currentIndex + 1 : 0;
                }
                
                const newButton = screenButtons[newIndex];
                const targetScreen = newButton.getAttribute('data-target');
                switchToScreen(targetScreen);
                newButton.focus();
            }
        }
    });
}

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll(`
        button, a, input, select, textarea, 
        [tabindex]:not([tabindex="-1"])
    `);
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
    
    // Screen reader announcements
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `Theme switched to ${currentTheme} mode`;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        });
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Landing page error:', e.error);
    // Graceful degradation - ensure basic functionality works
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
    
    // Recalculate animations
    checkScrollAnimations();
}, 250));

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    setTimeout(() => {
        initializeFloatingAnimations();
        initializeHoverEffects();
        initializeButtonInteractions();
        initializeKeyboardNavigation();
        initializeAccessibility();
    }, 500);
});

// ===== EXPORT FOR EXTERNAL USE =====
window.EasyReaderLanding = {
    toggleTheme,
    switchToScreen,
    updateAllImages,
    currentTheme: () => currentTheme,
    currentScreen: () => currentScreen
}; 