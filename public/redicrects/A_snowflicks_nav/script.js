document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Add falling snow animation effect to the navigation bar
    const navBar = document.querySelector('.snowflicks-nav');
    const navHeight = navBar.offsetHeight;
    let snowflakes = '';
    
    // Create SVG snowflake templates for variation
    const snowflakeTemplates = [
        `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0v24M5 5l14 14M19 5L5 19M0 12h24M8 2l4 6M12 8l4-6M16 22l-4-6M8 22l4-6" stroke="white" fill="none"/></svg>`,
        `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0v24M3 5l18 14M21 5L3 19M0 12h24M6 4l6 8M12 12l6-8M18 20l-6-8M6 20l6-8" stroke="white" fill="none"/></svg>`,
        `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0v24M2 12h20M5 5l14 14M19 5L5 19M7 8l5 4M12 12l5-4M17 16l-5-4M7 16l5-4" stroke="white" fill="none"/></svg>`,
        `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0v24M0 12h24M4 4l16 16M20 4L4 20M8 4l4 4M12 8l4-4M16 20l-4-4M8 20l4-4" stroke="white" fill="none"/></svg>`,
        `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0v24M0 12h24M3 3l18 18M21 3L3 21" stroke="white" fill="none"/></svg>`
    ];
    
    // Generate dynamic CSS for individual snowflake animations
    let snowflakeCSS = '';
    
    // Create more snowflakes for smooth effect
    for (let i = 0; i < 40; i++) {
        const size = Math.random() * 10 + 4; // Size variation
        const left = Math.random() * 100; // Horizontal position
        
        // Animation properties - unique for each snowflake
        const fallDuration = Math.random() * 10 + 15; // 15-25s (slow falling)
        const swayAmplitude = Math.random() * 15 + 5; // 5-20px
        const swayDuration = Math.random() * 7 + 3; // 3-10s
        const rotateSpeed = Math.random() * 15 + 10; // 10-25s
        const delay = Math.random() * 20; // Staggered start for more natural look
        
        // Pick a random template
        const templateIndex = Math.floor(Math.random() * snowflakeTemplates.length);
        
        // Create the snowflake element
        snowflakes += `<div class="nav-snowflake snowflake-${i}" style="
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
        ">${snowflakeTemplates[templateIndex]}</div>`;
        
        // Create unique CSS for this snowflake
        snowflakeCSS += `
            .snowflake-${i} {
                opacity: ${Math.random() * 0.2 + 0.1};
                animation: 
                    fall-${i} ${fallDuration}s linear infinite,
                    sway-${i} ${swayDuration}s ease-in-out infinite,
                    rotate-${i} ${rotateSpeed}s linear infinite;
                animation-delay: -${delay}s;
            }
            
            @keyframes fall-${i} {
                0% {
                    top: -10%;
                }
                100% {
                    top: 110%;
                }
            }
            
            @keyframes sway-${i} {
                0% {
                    margin-left: -${swayAmplitude}px;
                }
                50% {
                    margin-left: ${swayAmplitude}px;
                }
                100% {
                    margin-left: -${swayAmplitude}px;
                }
            }
            
            @keyframes rotate-${i} {
                0% {
                    transform: rotate(${Math.random() * 360}deg);
                }
                100% {
                    transform: rotate(${Math.random() * 360 + 360}deg);
                }
            }
        `;
    }
    
    // Create container and add snowflakes
    const snowContainer = document.createElement('div');
    snowContainer.classList.add('nav-snow-container');
    snowContainer.innerHTML = snowflakes;
    navBar.appendChild(snowContainer);
    
    // Add the CSS for the snow container and common snowflake styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-snow-container {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 2;
            overflow: hidden;
        }
        
        .nav-snowflake {
            position: absolute;
            filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.2));
            top: -10%;
        }
        
        .nav-snowflake svg {
            width: 100%;
            height: 100%;
        }
        
        ${snowflakeCSS}
    `;
    document.head.appendChild(style);
}); 