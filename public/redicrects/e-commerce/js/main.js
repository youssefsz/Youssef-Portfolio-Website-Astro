const products = [
    {
      id: 1,
      name: "PC Portable MSI GF63 Thin 11SC",
      price: 2399.000,
      image: "https://www.tunisianet.com.tn/240666-large/pc-portable-msi-gaming-gf63-thin-11sc-i7-11e-gen-8-go-gtx-1650-4g.jpg",
      description: "i7 11800H - 8Go - 512Go SSD - GTX 1650 4G",
      rating: 4.5,
      ratingCount: 128,
      category: "Laptops"
    },
    {
      id: 2,
      name: "PC Portable Gamer ASUS TUF F15",
      price: 3299.000,
      image: "https://mk-media.mytek.tn/media/catalog/product/cache/8be3f98b14227a82112b46963246dfe1/p/c/pc-portable-asus-tuf-gaming-f15-i7-13e-gen-8go-rtx-4070-3.jpg",
      description: "i5 11400H - RTX 3050 4Go - 8Go RAM - 512Go SSD - Win11",
      rating: 4.2,
      ratingCount: 75,
      category: "Laptops"
    },
    {
      id: 3,
      name: "Écran Gaming ASUS TUF VG247Q1A",
      price: 689.000,
      image: "https://megapc.tn/_next/image?url=https%3A%2F%2Fstatic.gi-ga.tech%2F%2Fuploads%2Fgallerie%2F1667484820386.webp&w=640&q=75",
      description: "24\" FHD - 1ms - 165Hz - FreeSync Premium",
      rating: 4.8,
      ratingCount: 92,
      category: "Monitors"
    },
    {
      id: 4,
      name: "Clavier Gaming Razer BlackWidow V3",
      price: 529.000,
      image: "https://www.tunisianet.com.tn/248560-large/clavier-gaming-mecaniques-razer-razer-blackwidow-v3-switches-razer-green.jpg",
      description: "Mécanique - RGB Chroma - Switches Green",
      rating: 4.6,
      ratingCount: 183,
      category: "Peripherals"
    },
    {
      id: 5,
      name: "PC Portable Apple MacBook Air M2",
      price: 5189.000,
      image: "https://www.tunisianet.com.tn/280148-large/pc-portable-apple-macbook-air-m2-2022-8go-256-go-lumiere-stellaire.jpg",
      description: "M2 8CPU 8GPU - 8Go - 256Go SSD - Gris Sidéral",
      rating: 4.9,
      ratingCount: 45,
      category: "Laptops"
    },
    {
      id: 6,
      name: "Casque Gaming HyperX Cloud II",
      price: 299.000,
      image: "https://www.tunisianet.com.tn/282650-large/casque-gaming-hyperx-cloud-ii-sans-fil-noir-rouge.jpg",
      description: "Sans fil - 7.1 Surround - Micro détachable",
      rating: 4.4,
      ratingCount: 156,
      category: "Audio"
    },
    {
      id: 7,
      name: "SSD Samsung 970 EVO Plus",
      price: 259.000,
      image: "https://www.tunisianet.com.tn/165069-large/disque-dur-interne-ssd-samsung-970-evo-plus-nvme-m2-500-go.jpg",
      description: "500Go NVMe M.2 - 3500/3200 Mo/s",
      rating: 4.7,
      ratingCount: 234,
      category: "Storage"
    },
    {
      id: 8,
      name: "Carte Graphique MSI RTX 4070 Ti",
      price: 3099.000,
      image: "https://www.tunisianet.com.tn/311455-large/carte-graphique-msi-geforce-rtx-4070-ti-gaming-x-trio-12g-gddr6x.jpg",
      description: "GAMING X TRIO 12Go GDDR6X",
      rating: 4.8,
      ratingCount: 67,
      category: "Graphics Cards"
    },
    {
      id: 9,
      name: "Souris Gaming Razer DeathAdder V2",
      price: 219.000,
      image: "https://www.tunisianet.com.tn/248583-large/souris-gaming-usb-razer-deathadder-v2.jpg",
      description: "20000 DPI - RGB Chroma - 8 boutons",
      rating: 4.3,
      ratingCount: 91,
      category: "Peripherals"
    },
    {
      id: 10,
      name: "PC Portable HP Victus 16",
      price: 2799.000,
      image: "https://www.tunisianet.com.tn/277986-large/pc-portable-hp-victus-15-fb0020nk-ryzen-5-5600h-32-go-rtx-3050-4g.jpg",
      description: "R7 7735HS - RTX 4050 6Go - 16Go - 512Go SSD",
      rating: 4.5,
      ratingCount: 112,
      category: "Laptops"
    },
    {
      id: 11,
      name: "RAM Corsair Vengeance RGB Pro",
      price: 319.000,
      image: "https://www.tunisianet.com.tn/186539-large/barrette-memoire-corsair-vengeance-rgb-pro-32-go-2x-16-go-ddr4-dimm-3200mhz-cl16.jpg",
      description: "16Go (2x8) DDR4 3200MHz RGB",
      rating: 4.6,
      ratingCount: 88,
      category: "Components"
    },
    {
      id: 12,
      name: "Webcam Logitech C920 HD Pro",
      price: 289.000,
      image: "https://www.tunisianet.com.tn/64689-large/webcam-pro-full-hd-logitech-c920-refresh.jpg",
      description: "1080p - 30FPS - Mise au point auto",
      rating: 4.4,
      ratingCount: 73,
      category: "Peripherals"
    }
  ];
  

// State management
let cart = [];
let wishlist = [];
let currentUser = null;
let priceRange = {
    min: null,
    max: null
};
let currentSort = null; // 'asc', 'desc', or null

// DOM Elements
const productGrid = document.querySelector('.products-grid');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
const wishlistCount = document.querySelector('.wishlist-count');
const overlay = document.querySelector('.overlay');
const authButton = document.getElementById('authButton');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const checkoutModal = document.querySelector('.checkout-modal');

// Price Filter Functionality
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const applyPriceFilterBtn = document.getElementById('apply-price-filter');
const resetPriceFilterBtn = document.getElementById('reset-price-filter');
const productsGrid = document.querySelector('.products-grid');

let originalProducts = [...products]; // Store original products for reset

// Add these variables with the other DOM elements
const sortAscBtn = document.getElementById('sort-asc');
const sortDescBtn = document.getElementById('sort-desc');

// Initialize the application
function init() {
    loadFromLocalStorage();
    renderProducts();
    setupEventListeners();
    updateCartCount();
    updateWishlistCount();
}

// Load data from localStorage
function loadFromLocalStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    updateAuthButton();
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// Render products
function renderProducts() {
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    const template = document.getElementById('productCardTemplate');
    
    let filteredProducts = products;
    
    // Apply price filter if set
    if (priceRange.min !== null && priceRange.max !== null) {
        filteredProducts = products.filter(product => 
            product.price >= priceRange.min && product.price <= priceRange.max
        );
    }
    
    filteredProducts.forEach(product => {
        const clone = template.content.cloneNode(true);
        
        // Set product image
        const img = clone.querySelector('img');
        img.src = product.image;
        img.alt = product.name;
        
        // Set product info
        clone.querySelector('h3').textContent = product.name;
        clone.querySelector('.price').textContent = `${product.price.toFixed(2)} DT`;
        
        // Set rating
        const starsContainer = clone.querySelector('.stars');
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 !== 0;
        
        for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
            if (i < fullStars) {
                star.className = 'fas fa-star';
            } else if (i === fullStars && hasHalfStar) {
                star.className = 'fas fa-star-half-alt';
            } else {
                star.className = 'far fa-star';
            }
        starsContainer.appendChild(star);
    }
    
        clone.querySelector('.rating-count').textContent = `(${product.ratingCount})`;
        
        // Set wishlist button state
        const wishlistBtn = clone.querySelector('.wishlist-btn');
        if (wishlist.includes(product.id)) {
            wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
        }
    
    // Add event listeners
        const viewDetailsBtn = clone.querySelector('.view-details');
        viewDetailsBtn.className = 'btn btn-secondary view-details';
        viewDetailsBtn.innerHTML = '<i class="fas fa-eye"></i> Voir détails';
        viewDetailsBtn.addEventListener('click', () => showProductModal(product));

        const addToCartBtn = clone.querySelector('.add-to-cart');
        addToCartBtn.className = 'btn btn-primary add-to-cart';
        addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Ajouter au panier';
        addToCartBtn.addEventListener('click', () => addToCart(product));

        wishlistBtn.addEventListener('click', () => toggleWishlist(product.id, wishlistBtn));
        
        productGrid.appendChild(clone);
    });
}

// Cart functions
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveToLocalStorage();
    updateCartCount();
    renderCart();
    updateCartTotal();
    showNotification('Produit ajouté au panier', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveToLocalStorage();
    updateCartCount();
    renderCart();
    updateCartTotal();
    showNotification('Produit retiré du panier', 'error');
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
}

function renderCart() {
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>VOTRE PANIER EST VIDE!</p>
            </div>
        `;
        document.querySelector('.cart-total .total-amount').textContent = '0.00 DT';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="quantity-control">
                    <button class="btn-secondary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-secondary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)} DT</span>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    // Calculate and update total
    updateCartTotal();
}

// Add new function to update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalElements = document.querySelectorAll('.total-amount');
    totalElements.forEach(element => {
        element.textContent = `${total.toFixed(2)} DT`;
    });
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveToLocalStorage();
        updateCartCount();
        renderCart();
        updateCartTotal();
    }
}

// Wishlist functions
function toggleWishlist(productId, button) {
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        wishlist.push(productId);
        button.innerHTML = '<i class="fas fa-heart"></i>';
        showNotification('Produit ajouté aux favoris', 'success');
    } else {
        wishlist.splice(index, 1);
        button.innerHTML = '<i class="far fa-heart"></i>';
        showNotification('Produit retiré des favoris', 'error');
    }
    
    saveToLocalStorage();
    updateWishlistCount();
}

function updateWishlistCount() {
    wishlistCount.textContent = wishlist.length;
}

// Auth functions
function updateAuthButton() {
    if (currentUser) {
        authButton.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
    } else {
        authButton.innerHTML = '<i class="fas fa-user"></i> MON ESPACE';
    }
}

// Modal functions
function showProductModal(product) {
    const modal = document.querySelector('.product-modal');
    modal.querySelector('.modal-body').innerHTML = `
        <div class="product-gallery">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-details">
            <h2>${product.name}</h2>
            <div class="product-rating">
                <div class="stars">
                    ${generateStarsHTML(product.rating)}
                </div>
                <span class="rating-count">(${product.ratingCount})</span>
            </div>
            <p class="product-price">${product.price.toFixed(2)} DT</p>
            <p class="product-description">${product.description}</p>
            <div class="add-to-cart-section">
                <button class="btn btn-primary" onclick="addToCart(${JSON.stringify(product)})">
                    <i class="fas fa-shopping-cart"></i>
                    AJOUTER AU PANIER
                </button>
            </div>
        </div>
    `;
    
    showModal(modal);
}

function generateStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let html = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            html += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            html += '<i class="fas fa-star-half-alt"></i>';
        } else {
            html += '<i class="far fa-star"></i>';
        }
    }
    
    return html;
}

function showModal(modal) {
    modal.style.display = 'flex';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    modal.style.display = 'none';
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Notification function
function showNotification(message, type = 'default') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
    });

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create message span
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-notification';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.onclick = () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    };
    
    // Append elements
    notification.appendChild(messageSpan);
    notification.appendChild(closeButton);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }, 100);
}

// Event listeners
function setupEventListeners() {
    // Cart toggle
    document.querySelector('.cart').addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });
    
    // Close buttons
    document.querySelectorAll('.close-modal, .close-cart').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.auth-modal, .checkout-modal, .product-modal').forEach(modal => hideModal(modal));
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    });
    
    // Auth modal
    authButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentUser) {
            // Show user menu or logout
            currentUser = null;
            saveToLocalStorage();
            updateAuthButton();
            showNotification('Déconnexion réussie', 'success');
        } else {
            showModal(loginModal);
        }
    });
    
    // Switch between login and register
    document.querySelectorAll('.switch-form a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const form = e.target.dataset.form;
            hideModal(loginModal);
            hideModal(registerModal);
            showModal(form === 'login' ? loginModal : registerModal);
        });
    });
    
    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
    
    // Price filter
    document.getElementById('apply-price-filter').addEventListener('click', () => {
        const min = parseFloat(document.getElementById('min-price').value);
        const max = parseFloat(document.getElementById('max-price').value);
        
        if (!isNaN(min) && !isNaN(max) && min <= max) {
            priceRange.min = min;
            priceRange.max = max;
            renderProducts();
        }
    });
    
    // Overlay click
    overlay.addEventListener('click', () => {
        document.querySelectorAll('.auth-modal, .checkout-modal, .product-modal').forEach(modal => hideModal(modal));
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Sort buttons
    sortAscBtn.addEventListener('click', () => handleSort('asc'));
    sortDescBtn.addEventListener('click', () => handleSort('desc'));
}

// Form handlers
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Here you would typically make an API call to verify credentials
    // For demo purposes, we'll just simulate a successful login
    currentUser = {
        name: 'John Doe',
        email: email
    };
    
    saveToLocalStorage();
    updateAuthButton();
    hideModal(loginModal);
    showNotification('Connexion réussie', 'success');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Les mots de passe ne correspondent pas', 'error');
        return;
    }
    
    // Here you would typically make an API call to register the user
    // For demo purposes, we'll just simulate a successful registration
    currentUser = {
        name: name,
        email: email
    };
    
    saveToLocalStorage();
    updateAuthButton();
    hideModal(registerModal);
    showNotification('Inscription réussie', 'success');
}

function handleCheckout(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showNotification('Veuillez vous connecter pour continuer', 'error');
        hideModal(checkoutModal);
        showModal(loginModal);
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Votre panier est vide', 'error');
        return;
    }
    
    // Here you would typically make an API call to process the order
    // For demo purposes, we'll just simulate a successful checkout
    cart = [];
    saveToLocalStorage();
    updateCartCount();
    renderCart();
    hideModal(checkoutModal);
    showNotification('Commande confirmée! Merci de votre achat.', 'success');
}

// Price Filter Functionality
function filterProducts() {
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    if (minPrice > maxPrice && maxPrice !== 0) {
        showNotification('Le prix minimum ne peut pas être supérieur au prix maximum', 'error');
        return;
    }

    let filteredProducts = originalProducts.filter(product => {
        const price = parseFloat(product.price);
        return price >= minPrice && price <= maxPrice;
    });

    // Apply sorting if active
    if (currentSort) {
        filteredProducts = sortProducts(filteredProducts, currentSort);
    }

    displayProducts(filteredProducts);
    
    if (filteredProducts.length === 0) {
        showNotification('Aucun produit trouvé dans cette gamme de prix', 'info');
    }
}

function resetFilter() {
    minPriceInput.value = '';
    maxPriceInput.value = '';
    currentSort = null;
    sortAscBtn.classList.remove('active');
    sortDescBtn.classList.remove('active');
    displayProducts(originalProducts);
    showNotification('Filtres réinitialisés', 'success');
}

// Input validation
function validatePriceInput(input) {
    input.addEventListener('input', (e) => {
        let value = e.target.value;
        if (value < 0) {
            e.target.value = 0;
        }
    });
}

// Event listeners
applyPriceFilterBtn.addEventListener('click', filterProducts);
resetPriceFilterBtn.addEventListener('click', resetFilter);
validatePriceInput(minPriceInput);
validatePriceInput(maxPriceInput);

// Function to display products
function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="wishlist-btn">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-rating">
                    <div class="stars">
                        ${getStarRating(product.rating)}
                    </div>
                    <span class="rating-count">(${product.ratingCount})</span>
                </div>
                <h3>${product.name}</h3>
                <p class="price">${product.price} DT</p>
                <button class="view-details" onclick="openProductModal(${product.id})">
                    <i class="fas fa-eye"></i> Voir détails
                </button>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Ajouter au panier
                </button>
            </div>
        </div>
    `).join('');
}

// Helper function to generate star rating HTML
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Initialize the display
displayProducts(products);

// Initialize the application
document.addEventListener('DOMContentLoaded', init);

// Add this function for sorting products
function sortProducts(products, sortDirection) {
    return [...products].sort((a, b) => {
        if (sortDirection === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
}

// Add these functions for sorting
function handleSort(direction) {
    // Remove active class from both buttons
    sortAscBtn.classList.remove('active');
    sortDescBtn.classList.remove('active');

    if (currentSort === direction) {
        // If clicking the same button again, reset sort
        currentSort = null;
        displayProducts(originalProducts);
        showNotification('Tri réinitialisé', 'info');
    } else {
        // Apply new sort
        currentSort = direction;
        if (direction === 'asc') {
            sortAscBtn.classList.add('active');
            showNotification('Prix triés par ordre croissant', 'success');
        } else {
            sortDescBtn.classList.add('active');
            showNotification('Prix triés par ordre décroissant', 'success');
        }
        filterProducts(); // This will apply both filter and sort
    }
} 