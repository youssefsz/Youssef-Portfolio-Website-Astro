// Landing Page JavaScript for FitnessHub

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTabSwitching();
    initScrollEffects();
    initAnimations();
    initMobileMenu();
});

// Navigation Functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(13, 13, 13, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(138, 138, 138, 0.2)';
        } else {
            navbar.style.background = 'rgba(13, 13, 13, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(138, 138, 138, 0.1)';
        }
        
        // Show/hide scroll to top button
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Tab Switching Functionality
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    console.log('Initializing tab switching...');
    console.log(`Found ${tabButtons.length} tab buttons and ${tabContents.length} tab contents`);
    
    // Function to switch tabs
    function switchToTab(targetTabId) {
        console.log(`Switching to tab: ${targetTabId}`);
        
        // Remove active from all buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === targetTabId) {
                btn.classList.add('active');
                console.log(`Activated button: ${targetTabId}`);
            }
        });
        
        // Remove active from all content and add to target
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === targetTabId) {
                content.classList.add('active');
                console.log(`Activated content: ${targetTabId}`);
                console.log(`Content display: ${getComputedStyle(content).display}`);
            }
        });
        
        // Verify the switch worked
        const activeButton = document.querySelector('.tab-btn.active');
        const activeContent = document.querySelector('.tab-content.active');
        console.log(`Active button: ${activeButton ? activeButton.getAttribute('data-tab') : 'none'}`);
        console.log(`Active content: ${activeContent ? activeContent.id : 'none'}`);
    }
    
    // Add click listeners to all tab buttons
    tabButtons.forEach(button => {
        const tabId = button.getAttribute('data-tab');
        console.log(`Adding listener to button: ${tabId}`);
        
        button.addEventListener('click', () => {
            switchToTab(tabId);
        });
    });
    
    // Ensure home tab is active by default
    switchToTab('home');
}

// Scroll-triggered Animations
function initScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .showcase-item, .download-content, .section-header'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize Animations
function initAnimations() {
    // Floating phone animations
    const floatingPhones = document.querySelectorAll('.floating-phone');
    floatingPhones.forEach((phone, index) => {
        const rotation = index % 2 === 0 ? '15deg' : '-15deg';
        phone.style.setProperty('--rotation', rotation);
    });
    
    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-circle');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Counter Animation
function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const number = parseInt(text.replace(/[^\d]/g, ''));
    let current = 0;
    const duration = 2000;
    const increment = number / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
    }, 16);
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    let isMenuOpen = false;
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            toggleMobileMenu(isMenuOpen);
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    isMenuOpen = false;
                    toggleMobileMenu(isMenuOpen);
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                isMenuOpen = false;
                toggleMobileMenu(isMenuOpen);
            }
        });
    }
}

function toggleMobileMenu(isOpen) {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (isOpen) {
        // Open menu
        navMenu.style.display = 'flex';
        navMenu.style.position = 'fixed';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--dark-grey)';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '20px';
        navMenu.style.borderTop = '1px solid var(--medium-grey)';
        navMenu.style.zIndex = '999';
        navMenu.style.gap = '20px';
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        
        // Prevent body scroll
        body.style.overflow = 'hidden';
    } else {
        // Close menu
        navMenu.style.display = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.background = '';
        navMenu.style.flexDirection = '';
        navMenu.style.padding = '';
        navMenu.style.borderTop = '';
        navMenu.style.zIndex = '';
        navMenu.style.gap = '';
        
        // Reset hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        
        // Restore body scroll
        body.style.overflow = '';
    }
}

// Smooth Button Interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .download-btn, .feature-card')) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple styles
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.animation = 'ripple-animation 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .feature-card:not(.animate-in) {
        opacity: 0;
        transform: translateY(50px);
    }
    
    .showcase-item:not(.animate-in) {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .download-content:not(.animate-in) {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .section-header:not(.animate-in) {
        opacity: 0;
        transform: translateY(30px);
    }
`;
document.head.appendChild(style);

// Enhanced Phone Mockup Interactions
function initPhoneInteractions() {
    const phoneScreens = document.querySelectorAll('.phone-screen, .showcase-image');
    
    phoneScreens.forEach(screen => {
        screen.addEventListener('mouseenter', () => {
            screen.style.transform = 'scale(1.05)';
            screen.style.transition = 'transform 0.3s ease-out';
        });
        
        screen.addEventListener('mouseleave', () => {
            screen.style.transform = 'scale(1)';
        });
    });
}

// Initialize phone interactions after DOM is loaded
document.addEventListener('DOMContentLoaded', initPhoneInteractions);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Re-run scroll-dependent functions with throttling
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-circle');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Add loading animation
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loader">
            <i class="fas fa-dumbbell"></i>
            <span>FitnessHub</span>
        </div>
    `;
    
    // Add loading screen styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--rich-black);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease-out;
        }
        
        .loader {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
        
        .loader i {
            font-size: 48px;
            color: var(--vibrant-green);
            animation: spin 1s linear infinite;
        }
        
        .loader span {
            font-size: 24px;
            font-weight: 700;
            color: var(--white);
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(loadingStyle);
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after a short delay
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
            loadingStyle.remove();
        }, 500);
    }, 1000);
}); 