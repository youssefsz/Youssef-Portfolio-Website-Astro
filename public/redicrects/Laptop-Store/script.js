// DOM Elements
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const screenContainer = document.querySelector('.screen-container');
const sliderDots = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const screens = document.querySelectorAll('.screen');
const sections = document.querySelectorAll('section');
const featureCards = document.querySelectorAll('.feature-card');

// Mobile Menu Toggle
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate burger
    burger.classList.toggle('toggle');
    const lines = burger.querySelectorAll('div');
    if (burger.classList.contains('toggle')) {
        lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        
        // Reset burger
        burger.classList.remove('toggle');
        const lines = burger.querySelectorAll('div');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    });
});

// Create slider dots
function createSliderDots() {
    for (let i = 0; i < screens.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) {
            dot.classList.add('active');
        }
        dot.setAttribute('data-index', i);
        sliderDots.appendChild(dot);
        
        // Add click event to dot
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            scrollToScreen(index);
        });
    }
}

// Scroll to specific screen
function scrollToScreen(index) {
    const screen = screens[index];
    const screenWidth = screen.offsetWidth;
    const screenMargin = 30; // gap between screens
    screenContainer.scrollLeft = (screenWidth + screenMargin) * index;
    
    // Update active dot
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
    });
    document.querySelector(`.dot[data-index="${index}"]`).classList.add('active');
}

// Handle next/prev buttons
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        const activeDotIndex = parseInt(document.querySelector('.dot.active').getAttribute('data-index'));
        const prevIndex = activeDotIndex > 0 ? activeDotIndex - 1 : screens.length - 1;
        scrollToScreen(prevIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        const activeDotIndex = parseInt(document.querySelector('.dot.active').getAttribute('data-index'));
        const nextIndex = activeDotIndex < screens.length - 1 ? activeDotIndex + 1 : 0;
        scrollToScreen(nextIndex);
    });
}

// Update active dot on scroll
screenContainer.addEventListener('scroll', () => {
    const screenWidth = screens[0].offsetWidth;
    const screenMargin = 30; // gap between screens
    const scrollPosition = screenContainer.scrollLeft;
    const activeIndex = Math.round(scrollPosition / (screenWidth + screenMargin));
    
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
    });
    
    const activeDot = document.querySelector(`.dot[data-index="${activeIndex}"]`);
    if (activeDot) {
        activeDot.classList.add('active');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Add fade-up class to feature cards and observe
featureCards.forEach((card, index) => {
    card.classList.add('fade-up');
    // Add delay to stagger animation
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Add scroll animations to sections
sections.forEach(section => {
    // Add animation classes based on section id
    if (section.id === 'home') {
        const content = section.querySelector('.hero-content');
        const image = section.querySelector('.hero-image');
        
        if (content) {
            content.classList.add('slide-in-left');
            observer.observe(content);
        }
        
        if (image) {
            image.classList.add('slide-in-right');
            observer.observe(image);
        }
    } else if (section.id === 'download') {
        const content = section.querySelector('.download-content');
        const image = section.querySelector('.download-image');
        
        if (content) {
            content.classList.add('slide-in-left');
            observer.observe(content);
        }
        
        if (image) {
            image.classList.add('slide-in-right');
            observer.observe(image);
        }
    } else {
        // Default fade in animation for other sections
        section.classList.add('fade-in');
        observer.observe(section);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Initialize slider dots
if (sliderDots) {
    createSliderDots();
}

// Auto-slider for screens
let sliderInterval;

function startSlider() {
    sliderInterval = setInterval(() => {
        const activeDotIndex = parseInt(document.querySelector('.dot.active')?.getAttribute('data-index') || 0);
        const nextIndex = activeDotIndex < screens.length - 1 ? activeDotIndex + 1 : 0;
        scrollToScreen(nextIndex);
    }, 4000); // Change slide every 4 seconds
}

function stopSlider() {
    clearInterval(sliderInterval);
}

// Start auto-slider
if (screenContainer && screens.length > 0) {
    startSlider();
    
    // Stop auto-slider on interaction
    screenContainer.addEventListener('mouseenter', stopSlider);
    screenContainer.addEventListener('touchstart', stopSlider);
    
    // Resume auto-slider after interaction
    screenContainer.addEventListener('mouseleave', startSlider);
    screenContainer.addEventListener('touchend', startSlider);
}

// Add parallax effect to hero and download sections
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Hero parallax
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.1}px) translateY(${Math.sin(Date.now() / 2000) * 15}px)`;
    }
    
    // Download parallax
    const downloadImage = document.querySelector('.download-image img');
    if (downloadImage) {
        downloadImage.style.transform = `translateY(${(scrollY - downloadImage.offsetTop) * 0.05}px) translateY(${Math.sin(Date.now() / 2000) * 15}px)`;
    }
});

// Add a scroll-triggered sticky header effect
const header = document.querySelector('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Add box shadow when scrolled
    if (scrollY > 10) {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    // Hide header when scrolling down, show when scrolling up
    if (scrollY > lastScrollY && scrollY > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = scrollY;
});

// Add transition to header for smooth animations
header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

// Initialize AOS-like animations on page load
window.addEventListener('load', () => {
    // Add a slight delay to ensure everything is loaded
    setTimeout(() => {
        document.querySelectorAll('.fade-in, .fade-up, .slide-in-left, .slide-in-right').forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add('active');
            }
        });
    }, 300);
}); 