// Animation Controller - Manages smooth animations throughout the dashboard
export class AnimationController {
    constructor() {
        this.observers = [];
        this.animationQueue = [];
        this.isAnimating = false;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    init() {
        this.setupIntersectionObserver();
        this.setupMutationObserver();
        this.bindAnimationEvents();
        
        // Listen for reduced motion changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.prefersReducedMotion = e.matches;
        });
    }

    setupIntersectionObserver() {
        // Observe elements for scroll-triggered animations
        const observerOptions = {
            threshold: [0.1, 0.3, 0.7],
            rootMargin: '-50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScrollAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });

        this.observers.push(observer);
    }

    setupMutationObserver() {
        // Watch for new elements added to the DOM
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const animatableElements = node.querySelectorAll('[data-animate]');
                        animatableElements.forEach(el => {
                            this.observers[0]?.observe(el);
                        });
                    }
                });
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.observers.push(mutationObserver);
    }

    bindAnimationEvents() {
        // Add CSS animation event listeners
        document.addEventListener('animationend', this.handleAnimationEnd.bind(this));
        document.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
    }

    triggerPageAnimations() {
        if (this.prefersReducedMotion) return;

        // Trigger entrance animations for page elements
        this.staggerElementAnimation('.kpi-card', 'animate-slide-up', 100);
        this.staggerElementAnimation('.chart-container', 'animate-fade-in', 200);
        this.animateElement('.table-section', 'animate-slide-up', 400);

        // Trigger counter animations
        this.triggerCounterAnimations();
    }

    triggerCounterAnimations() {
        const counterElements = document.querySelectorAll('[data-counter]');
        counterElements.forEach((element, index) => {
            setTimeout(() => {
                // Remove commas and parse the number
                const counterValue = element.dataset.counter.replace(/,/g, '');
                const targetValue = parseFloat(counterValue);
                
                // Skip if not a valid number
                if (isNaN(targetValue)) return;
                
                // Detect format from the initial text content
                let format = '';
                const initialText = element.textContent;
                if (initialText.includes('$')) {
                    format = '$';
                } else if (initialText.includes('%')) {
                    format = '%';
                } else if (initialText.includes('m')) {
                    format = 'm';
                }
                
                this.animateCounter(element, 0, targetValue, 2000, format);
            }, index * 200);
        });
    }

    triggerScrollAnimation(element) {
        if (this.prefersReducedMotion) return;

        const animationType = element.dataset.animate;
        const delay = parseInt(element.dataset.delay) || 0;

        setTimeout(() => {
            this.addAnimationClass(element, animationType);
        }, delay);
    }

    staggerElementAnimation(selector, animationClass, staggerDelay = 100) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.addAnimationClass(element, animationClass);
            }, index * staggerDelay);
        });
    }

    animateElement(selector, animationClass, delay = 0) {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                this.addAnimationClass(element, animationClass);
            }, delay);
        }
    }

    addAnimationClass(element, animationClass) {
        if (this.prefersReducedMotion) return;

        // Ensure element is visible
        element.style.opacity = '1';
        element.classList.add(animationClass);
        
        // Store original state for potential reset
        if (!element.dataset.originalClass) {
            element.dataset.originalClass = element.className;
        }
    }

    // Counter animation with easing
    animateCounter(element, startValue, endValue, duration = 2000, format = '') {
        if (this.prefersReducedMotion) {
            this.setFormattedValue(element, endValue, format);
            return;
        }

        const startTime = performance.now();
        const difference = endValue - startValue;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function - ease out cubic
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (difference * easeOutCubic);
            
            this.setFormattedValue(element, currentValue, format);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    setFormattedValue(element, value, format) {
        let displayValue;
        if (format === '$') {
            displayValue = `$${Math.floor(value).toLocaleString()}`;
        } else if (format === '%') {
            displayValue = `${(Math.floor(value * 10) / 10).toFixed(1)}%`;
        } else if (element.textContent.includes('m')) {
            // Handle minutes format like "4.2m"
            displayValue = `${(Math.floor(value * 10) / 10).toFixed(1)}m`;
        } else if (element.textContent.includes(',') || value >= 1000) {
            // Handle comma-separated numbers like "1,247"
            displayValue = Math.floor(value).toLocaleString();
        } else {
            displayValue = Math.floor(value).toString();
        }
        element.textContent = displayValue;
    }

    // Smooth fade transitions
    fadeOut(selector, callback = null, duration = 300) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.style.transition = `opacity ${duration}ms ease-out`;
            element.style.opacity = '0';
        });

        if (callback) {
            setTimeout(callback, duration);
        }
    }

    fadeIn(selector, delay = 0, duration = 300) {
        setTimeout(() => {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(element => {
                element.style.transition = `opacity ${duration}ms ease-in`;
                element.style.opacity = '1';
            });
        }, delay);
    }

    // Slide animations
    slideUp(element, duration = 400) {
        if (this.prefersReducedMotion) return;

        element.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms ease-out`;
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }

    slideDown(element, duration = 400) {
        if (this.prefersReducedMotion) return;

        element.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms ease-out`;
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
    }

    // Scale animations
    scaleIn(element, duration = 300) {
        if (this.prefersReducedMotion) return;

        element.style.transition = `transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        element.style.transform = 'scale(1)';
    }

    scaleOut(element, duration = 300) {
        if (this.prefersReducedMotion) return;

        element.style.transition = `transform ${duration}ms ease-in`;
        element.style.transform = 'scale(0.9)';
    }

    // Ripple effect for buttons
    createRipple(element, event) {
        if (this.prefersReducedMotion) return;

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 600ms linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;

        // Add ripple keyframes if not already added
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
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

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Loading animation
    showLoadingAnimation(container, type = 'spinner') {
        const loadingElement = document.createElement('div');
        loadingElement.className = 'loading-animation';
        
        if (type === 'spinner') {
            loadingElement.innerHTML = '<div class="spinner"></div>';
        } else if (type === 'skeleton') {
            loadingElement.innerHTML = this.createSkeletonHTML();
        } else if (type === 'pulse') {
            loadingElement.className += ' animate-pulse';
            loadingElement.innerHTML = '<div class="pulse-indicator"></div>';
        }

        container.appendChild(loadingElement);
        return loadingElement;
    }

    createSkeletonHTML() {
        return `
            <div class="skeleton-loader">
                <div class="skeleton-line" style="width: 100%; height: 20px; margin-bottom: 10px;"></div>
                <div class="skeleton-line" style="width: 80%; height: 20px; margin-bottom: 10px;"></div>
                <div class="skeleton-line" style="width: 60%; height: 20px;"></div>
            </div>
        `;
    }

    hideLoadingAnimation(loadingElement) {
        if (loadingElement) {
            this.fadeOut(loadingElement, () => {
                loadingElement.remove();
            });
        }
    }

    // Particle effects
    createParticleEffect(container, particleCount = 20) {
        if (this.prefersReducedMotion) return;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #3b82f6;
                border-radius: 50%;
                pointer-events: none;
                animation: particle-float ${2 + Math.random() * 3}s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
            `;
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 5000);
        }

        // Add particle animation keyframes
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes particle-float {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(0);
                    }
                    50% {
                        opacity: 0.8;
                        transform: translateY(-100px) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-200px) scale(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Event handlers
    handleAnimationEnd(event) {
        const element = event.target;
        
        // Clean up animation classes after completion
        if (element.classList.contains('animate-slide-up')) {
            element.classList.remove('animate-slide-up');
        }
        if (element.classList.contains('animate-fade-in')) {
            element.classList.remove('animate-fade-in');
        }
        if (element.classList.contains('animate-bounce-in')) {
            element.classList.remove('animate-bounce-in');
        }
    }

    handleTransitionEnd(event) {
        // Handle transition completions
        const element = event.target;
        
        // Remove temporary transition styles
        if (element.style.transition && element.style.transition.includes('temp-')) {
            element.style.transition = '';
        }
    }

    // Performance optimization
    requestIdleAnimation(callback) {
        if (window.requestIdleCallback) {
            requestIdleCallback(callback);
        } else {
            setTimeout(callback, 16); // ~60fps fallback
        }
    }

    // Cleanup
    destroy() {
        this.observers.forEach(observer => {
            if (observer.disconnect) {
                observer.disconnect();
            }
        });
        this.observers = [];
        this.animationQueue = [];
    }

    // Batch animations for performance
    batchAnimate(animations) {
        return new Promise(resolve => {
            let completed = 0;
            const total = animations.length;

            animations.forEach((animation, index) => {
                setTimeout(() => {
                    animation.callback();
                    completed++;
                    
                    if (completed === total) {
                        resolve();
                    }
                }, animation.delay || index * 50);
            });
        });
    }
} 