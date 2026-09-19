(function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const html = document.documentElement;
    const images = [
        document.getElementById('homeImg'),
        document.getElementById('savedImg'),
        document.getElementById('previewImg'),
        document.getElementById('settingsImg'),
    ];
    const carouselControls = Array.from(document.querySelectorAll('.carousel-control'));
    const carouselCaption = document.querySelector('.carousel-caption');

    let currentImageIndex = 0;
    let carouselTimer;

    function preferredTheme() {
        return localStorage.getItem('theme') || (systemTheme.matches ? 'dark' : 'light');
    }

    function updateImages(theme) {
        const mode = theme === 'dark' ? 'dark' : 'light';
        const filenames = ['home.png', 'new-invoice.png', 'invoice-preview.png', 'settings.png'];

        images.forEach((image, index) => {
            image.src = `screenshots/${mode}/${filenames[index]}`;
        });
    }

    function updateThemeControl(theme) {
        const isDark = theme === 'dark';
        themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
        themeColor.content = isDark ? '#171717' : '#FAFAFA';

        themeIcon.innerHTML = isDark
            ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="currentColor"/>'
            : '<path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    }

    function setTheme(theme, persist) {
        html.setAttribute('data-theme', theme);
        html.classList.remove('light', 'dark');
        html.classList.add(theme);

        if (persist) {
            localStorage.setItem('theme', theme);
        }

        updateImages(theme);
        updateThemeControl(theme);
    }

    function showImage(index) {
        images.forEach((image, imageIndex) => {
            const isActive = imageIndex === index;
            image.classList.toggle('active', isActive);

            if (isActive) {
                image.removeAttribute('aria-hidden');
            } else {
                image.setAttribute('aria-hidden', 'true');
            }
        });

        carouselControls.forEach((control, controlIndex) => {
            control.setAttribute('aria-current', String(controlIndex === index));
        });

        currentImageIndex = index;
        carouselCaption.textContent = images[index].alt;
    }

    function stopCarousel() {
        window.clearInterval(carouselTimer);
        carouselTimer = undefined;
    }

    function startCarousel() {
        stopCarousel();

        if (!reducedMotion.matches && !document.hidden) {
            carouselTimer = window.setInterval(() => {
                showImage((currentImageIndex + 1) % images.length);
            }, 4500);
        }
    }

    setTheme(preferredTheme(), false);
    showImage(currentImageIndex);
    startCarousel();

    carouselControls.forEach((control) => {
        control.addEventListener('click', () => {
            showImage(Number(control.dataset.slide));
            startCarousel();
        });
    });

    themeToggle.addEventListener('click', () => {
        const nextTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme, true);
    });

    systemTheme.addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) {
            setTheme(event.matches ? 'dark' : 'light', false);
        }
    });

    reducedMotion.addEventListener('change', startCarousel);
    document.addEventListener('visibilitychange', startCarousel);
})();
