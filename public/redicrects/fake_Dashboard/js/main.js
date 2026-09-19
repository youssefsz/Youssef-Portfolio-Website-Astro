// Main Dashboard Application
import { FakeAPI } from './fake-api.js';
import { ChartManager } from './chart-manager.js';
import { AnimationController } from './animation-controller.js';
import { Utils } from './utils.js';

class Dashboard {
    constructor() {
        // Components will be initialized in init() method after Chart.js is ready
        this.api = null;
        this.chartManager = null;
        this.animationController = null;
        this.isLoading = false;
        
        this.init();
    }

    async init() {
        this.showLoading();
        
        try {
            // Wait for Chart.js to be available
            await this.waitForChart();
            
            // Initialize components
            this.api = new FakeAPI();
            this.chartManager = new ChartManager();
            this.animationController = new AnimationController();
            
            this.setupEventListeners();
            this.animationController.init();
            
            // Load initial data with realistic delay
            await this.loadDashboardData();
            
            this.startRealTimeUpdates();
        } catch (error) {
            console.error('Failed to initialize dashboard:', error);
            this.showError('Failed to load dashboard');
        } finally {
            this.hideLoading();
        }
    }

    async waitForChart() {
        return new Promise((resolve) => {
            if (typeof Chart !== 'undefined') {
                resolve();
                return;
            }
            
            const checkChart = () => {
                if (typeof Chart !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(checkChart, 100);
                }
            };
            
            checkChart();
        });
    }

    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        sidebarToggle?.addEventListener('click', this.toggleSidebar.bind(this));

        // Sidebar overlay (mobile)
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        sidebarOverlay?.addEventListener('click', this.closeSidebar.bind(this));

        // Navigation
        const navItems = document.querySelectorAll('.nav-item a');
        navItems.forEach(item => {
            item.addEventListener('click', this.handleNavigation.bind(this));
        });

        // Chart filters
        const chartFilters = document.querySelectorAll('.chart-filter');
        chartFilters.forEach(filter => {
            filter.addEventListener('change', this.handleChartFilter.bind(this));
        });

        // Search functionality
        const searchInput = document.querySelector('.search-box input');
        searchInput?.addEventListener('input', Utils.debounce(this.handleSearch.bind(this), 300));

        // Export button
        const exportBtn = document.querySelector('.btn-primary');
        exportBtn?.addEventListener('click', this.handleExport.bind(this));

        // Window resize for responsive charts
        window.addEventListener('resize', Utils.debounce(this.handleResize.bind(this), 250));

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
            }
        });
    }

    async loadDashboardData() {
        try {
            // Load data in parallel for better performance
            const [kpiData, chartData, tableData] = await Promise.all([
                this.api.getKPIData(),
                this.api.getChartData(),
                this.api.getTableData()
            ]);

            // Update UI with loaded data
            this.updateKPICards(kpiData);
            this.chartManager.initializeCharts(chartData);
            this.updateDataTable(tableData);

            // Trigger animations after data is loaded
            this.animationController.triggerPageAnimations();
            
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showError('Failed to load dashboard data');
        }
    }

    updateKPICards(data) {
        data.forEach((kpi, index) => {
            const card = document.querySelectorAll('.kpi-card')[index];
            if (card) {
                const valueElement = card.querySelector('.kpi-value');
                const changeElement = card.querySelector('.kpi-change span');
                
                // Animate counter
                this.animateCounter(valueElement, kpi.value, kpi.format);
                
                // Update change indicator
                if (changeElement) {
                    changeElement.textContent = kpi.change;
                    const changeContainer = card.querySelector('.kpi-change');
                    changeContainer.className = `kpi-change ${kpi.changeType}`;
                }
            }
        });
    }

    animateCounter(element, targetValue, format = '') {
        const startValue = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = startValue + (targetValue * easeOutQuart);
            
            // Format the value based on type
            let displayValue;
            if (format === 'currency') {
                displayValue = `$${Math.floor(currentValue).toLocaleString()}`;
            } else if (format === 'percentage') {
                displayValue = `${currentValue.toFixed(1)}%`;
            } else {
                displayValue = Math.floor(currentValue).toLocaleString();
            }
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    updateDataTable(data) {
        const tbody = document.querySelector('#ordersTable tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        data.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.style.animationDelay = `${index * 0.1}s`;
            tr.classList.add('animate-fade-in');
            
            tr.innerHTML = `
                <td>#${row.id}</td>
                <td>${row.customer}</td>
                <td>${row.product}</td>
                <td>$${row.amount.toLocaleString()}</td>
                <td><span class="status-badge ${row.status.toLowerCase()}">${row.status}</span></td>
                <td>${new Date(row.date).toLocaleDateString()}</td>
            `;
            
            tbody.appendChild(tr);
        });
    }

    toggleSidebar() {
        const container = document.querySelector('.dashboard-container');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (window.innerWidth <= 768) {
            const isOpen = sidebar.classList.contains('open');
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
            
            // Prevent body scroll when sidebar is open on mobile
            if (!isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        } else {
            container.classList.toggle('sidebar-collapsed');
        }
    }

    closeSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    handleNavigation(event) {
        event.preventDefault();
        
        const section = event.currentTarget.dataset.section;
        
        // Close sidebar on mobile after navigation
        this.closeSidebar();
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        event.currentTarget.closest('.nav-item').classList.add('active');
        
        // Load the selected page
        this.loadPage(section);
    }

    async loadPage(section) {
        const dashboardContent = document.querySelector('.dashboard-content');
        const pageTitle = document.querySelector('.page-title');
        const pageSubtitle = document.querySelector('.page-subtitle');
        
        // Show loading state
        this.animationController.fadeOut('.dashboard-content', async () => {
            try {
                // Update page title and subtitle
                const pageConfig = this.getPageConfig(section);
                pageTitle.textContent = pageConfig.title;
                pageSubtitle.textContent = pageConfig.subtitle;
                
                // Generate page content
                const pageContent = await this.generatePageContent(section);
                dashboardContent.innerHTML = pageContent;
                
                // Initialize page-specific functionality
                this.initializePage(section);
                
                // Fade in new content
                this.animationController.fadeIn('.dashboard-content');
                this.animationController.triggerPageAnimations();
                
            } catch (error) {
                console.error('Error loading page:', error);
                this.showError('Failed to load page content');
            }
        });
    }

    getPageConfig(section) {
        const configs = {
            overview: {
                title: 'Dashboard Overview',
                subtitle: 'Real-time analytics and insights'
            },
            analytics: {
                title: 'Advanced Analytics',
                subtitle: 'Deep dive into your data and metrics'
            },
            users: {
                title: 'User Management',
                subtitle: 'Manage users, roles, and permissions'
            },
            reports: {
                title: 'Reports & Insights',
                subtitle: 'Generate and view detailed reports'
            },
            settings: {
                title: 'Settings',
                subtitle: 'Configure your dashboard preferences'
            }
        };
        
        return configs[section] || configs.overview;
    }

    async generatePageContent(section) {
        switch (section) {
            case 'overview':
                return this.generateOverviewContent();
            case 'analytics':
                return this.generateAnalyticsContent();
            case 'users':
                return this.generateUsersContent();
            case 'reports':
                return this.generateReportsContent();
            case 'settings':
                return this.generateSettingsContent();
            default:
                return this.generateOverviewContent();
        }
    }

    generateOverviewContent() {
        return `
            <!-- KPI Cards -->
            <section class="kpi-section">
                <div class="kpi-grid">
                    <div class="kpi-card" data-animate="slide-up">
                        <div class="kpi-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Total Users</h3>
                            <div class="kpi-value" data-counter="24567">0</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+12.5%</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="100">
                        <div class="kpi-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Revenue</h3>
                            <div class="kpi-value" data-counter="89432">$0</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+8.2%</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="200">
                        <div class="kpi-icon">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Orders</h3>
                            <div class="kpi-value" data-counter="1247">0</div>
                            <div class="kpi-change negative">
                                <i class="fas fa-arrow-down"></i>
                                <span>-3.1%</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="300">
                        <div class="kpi-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Conversion</h3>
                            <div class="kpi-value" data-counter="3.47">0%</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+0.8%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Charts Section -->
            <section class="charts-section">
                <div class="charts-grid">
                    <!-- Revenue Chart -->
                    <div class="chart-container large" data-animate="fade-in">
                        <div class="chart-header">
                            <h3>Revenue Overview</h3>
                            <div class="chart-controls">
                                <select class="chart-filter" data-chart="revenue">
                                    <option value="7d">Last 7 days</option>
                                    <option value="30d" selected>Last 30 days</option>
                                    <option value="90d">Last 90 days</option>
                                </select>
                            </div>
                        </div>
                        <div class="chart-body">
                            <canvas id="revenueChart"></canvas>
                        </div>
                    </div>

                    <!-- User Activity Chart -->
                    <div class="chart-container medium" data-animate="fade-in" data-delay="200">
                        <div class="chart-header">
                            <h3>User Activity</h3>
                        </div>
                        <div class="chart-body">
                            <canvas id="activityChart"></canvas>
                        </div>
                    </div>

                    <!-- Sales Distribution -->
                    <div class="chart-container medium" data-animate="fade-in" data-delay="400">
                        <div class="chart-header">
                            <h3>Sales by Category</h3>
                        </div>
                        <div class="chart-body">
                            <canvas id="salesChart"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Data Table Section -->
            <section class="table-section" data-animate="slide-up">
                <div class="table-container">
                    <div class="table-header">
                        <h3>Recent Orders</h3>
                        <button class="btn-primary">
                            <i class="fas fa-download"></i>
                            Export
                        </button>
                    </div>
                    <div class="table-body">
                        <table class="data-table" id="ordersTable">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    }

    generateAnalyticsContent() {
        return `
            <!-- Analytics KPIs -->
            <section class="kpi-section">
                <div class="kpi-grid">
                    <div class="kpi-card" data-animate="slide-up">
                        <div class="kpi-icon">
                            <i class="fas fa-eye"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Page Views</h3>
                            <div class="kpi-value" data-counter="1247856">0</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+15.3%</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="100">
                        <div class="kpi-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Avg Session</h3>
                            <div class="kpi-value" data-counter="4.2">0m</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+2.8%</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="200">
                        <div class="kpi-icon">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Bounce Rate</h3>
                            <div class="kpi-value" data-counter="32.1">0%</div>
                            <div class="kpi-change negative">
                                <i class="fas fa-arrow-down"></i>
                                <span>-5.2%</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="300">
                        <div class="kpi-icon">
                            <i class="fas fa-chart-pie"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">CTR</h3>
                            <div class="kpi-value" data-counter="2.84">0%</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+1.1%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Analytics Charts -->
            <section class="charts-section">
                <div class="charts-grid">
                    <div class="chart-container large" data-animate="fade-in">
                        <div class="chart-header">
                            <h3>Traffic Sources</h3>
                            <div class="chart-controls">
                                <select class="chart-filter">
                                    <option value="7d">Last 7 days</option>
                                    <option value="30d" selected>Last 30 days</option>
                                    <option value="90d">Last 90 days</option>
                                </select>
                            </div>
                        </div>
                        <div class="chart-body">
                            <canvas id="trafficChart"></canvas>
                        </div>
                    </div>

                    <div class="chart-container medium" data-animate="fade-in" data-delay="200">
                        <div class="chart-header">
                            <h3>Top Pages</h3>
                        </div>
                        <div class="chart-body">
                            <canvas id="pagesChart"></canvas>
                        </div>
                    </div>

                    <div class="chart-container medium" data-animate="fade-in" data-delay="400">
                        <div class="chart-header">
                            <h3>Device Types</h3>
                        </div>
                        <div class="chart-body">
                            <canvas id="devicesChart"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Analytics Table -->
            <section class="table-section" data-animate="slide-up">
                <div class="table-container">
                    <div class="table-header">
                        <h3>Traffic Analytics</h3>
                        <button class="btn-primary">
                            <i class="fas fa-download"></i>
                            Export Report
                        </button>
                    </div>
                    <div class="table-body">
                        <table class="data-table" id="analyticsTable">
                            <thead>
                                <tr>
                                    <th>Source</th>
                                    <th>Users</th>
                                    <th>Sessions</th>
                                    <th>Bounce Rate</th>
                                    <th>Conversion</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    }

    generateUsersContent() {
        return `
            <!-- User Management KPIs -->
            <section class="kpi-section">
                <div class="kpi-grid">
                    <div class="kpi-card" data-animate="slide-up">
                        <div class="kpi-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Total Users</h3>
                            <div class="kpi-value" data-counter="12847">0</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+8.4%</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="100">
                        <div class="kpi-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">New Users</h3>
                            <div class="kpi-value" data-counter="247">0</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+12.7%</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="200">
                        <div class="kpi-icon">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Active Users</h3>
                            <div class="kpi-value" data-counter="8934">0</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+5.2%</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="300">
                        <div class="kpi-icon">
                            <i class="fas fa-user-shield"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Admins</h3>
                            <div class="kpi-value" data-counter="23">0</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- User Management Actions -->
            <section class="actions-section" style="margin-bottom: 2rem;">
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="btn-primary">
                        <i class="fas fa-user-plus"></i>
                        Add New User
                    </button>
                    <button class="btn-secondary" style="background: var(--gray-600); color: white;">
                        <i class="fas fa-upload"></i>
                        Import Users
                    </button>
                    <button class="btn-secondary" style="background: var(--success-500); color: white;">
                        <i class="fas fa-download"></i>
                        Export Users
                    </button>
                    <button class="btn-secondary" style="background: var(--warning-500); color: white;">
                        <i class="fas fa-cog"></i>
                        Manage Roles
                    </button>
                </div>
            </section>

            <!-- Users Table -->
            <section class="table-section" data-animate="slide-up">
                <div class="table-container">
                    <div class="table-header">
                        <h3>User Management</h3>
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <div class="search-box" style="margin: 0;">
                                <i class="fas fa-search"></i>
                                <input type="text" placeholder="Search users..." style="width: 250px;">
                            </div>
                            <select class="chart-filter" style="margin: 0;">
                                <option value="all">All Users</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="admin">Administrators</option>
                            </select>
                        </div>
                    </div>
                    <div class="table-body">
                        <table class="data-table" id="usersTable">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Last Login</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    }

    generateReportsContent() {
        return `
            <!-- Reports KPIs -->
            <section class="kpi-section">
                <div class="kpi-grid">
                    <div class="kpi-card" data-animate="slide-up">
                        <div class="kpi-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Total Reports</h3>
                            <div class="kpi-value" data-counter="1,247">0</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+23</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="100">
                        <div class="kpi-icon">
                            <i class="fas fa-calendar-day"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Today</h3>
                            <div class="kpi-value" data-counter="47">0</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+12</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="200">
                        <div class="kpi-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Pending</h3>
                            <div class="kpi-value" data-counter="12">0</div>
                            <div class="kpi-change negative">
                                <i class="fas fa-arrow-down"></i>
                                <span>-3</span>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card" data-animate="slide-up" data-delay="300">
                        <div class="kpi-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="kpi-content">
                            <h3 class="kpi-title">Completed</h3>
                            <div class="kpi-value" data-counter="1,235">0</div>
                            <div class="kpi-change positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>+26</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Report Generation -->
            <section class="report-generation" style="margin-bottom: 2rem;">
                <div class="chart-container" data-animate="fade-in">
                    <div class="chart-header">
                        <h3>Generate New Report</h3>
                    </div>
                    <div style="padding: 2rem;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--gray-700);">Report Type</label>
                                <select class="chart-filter" style="width: 100%; margin: 0;">
                                    <option value="sales">Sales Report</option>
                                    <option value="users">User Activity Report</option>
                                    <option value="revenue">Revenue Report</option>
                                    <option value="analytics">Analytics Report</option>
                                    <option value="custom">Custom Report</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--gray-700);">Date Range</label>
                                <select class="chart-filter" style="width: 100%; margin: 0;">
                                    <option value="7d">Last 7 days</option>
                                    <option value="30d">Last 30 days</option>
                                    <option value="90d">Last 90 days</option>
                                    <option value="1y">Last year</option>
                                    <option value="custom">Custom range</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--gray-700);">Format</label>
                                <select class="chart-filter" style="width: 100%; margin: 0;">
                                    <option value="pdf">PDF</option>
                                    <option value="csv">CSV</option>
                                    <option value="xlsx">Excel</option>
                                    <option value="html">HTML</option>
                                </select>
                            </div>
                        </div>
                        <button class="btn-primary" style="padding: 0.75rem 2rem;">
                            <i class="fas fa-chart-bar"></i>
                            Generate Report
                        </button>
                    </div>
                </div>
            </section>

            <!-- Reports Table -->
            <section class="table-section" data-animate="slide-up">
                <div class="table-container">
                    <div class="table-header">
                        <h3>Recent Reports</h3>
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <div class="search-box" style="margin: 0;">
                                <i class="fas fa-search"></i>
                                <input type="text" placeholder="Search reports..." style="width: 250px;">
                            </div>
                            <select class="chart-filter" style="margin: 0;">
                                <option value="all">All Reports</option>
                                <option value="sales">Sales</option>
                                <option value="users">Users</option>
                                <option value="revenue">Revenue</option>
                                <option value="analytics">Analytics</option>
                            </select>
                        </div>
                    </div>
                    <div class="table-body">
                        <table class="data-table" id="reportsTable">
                            <thead>
                                <tr>
                                    <th>Report Name</th>
                                    <th>Type</th>
                                    <th>Created By</th>
                                    <th>Date Created</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    }

    generateSettingsContent() {
        return `
            <!-- Settings Sections -->
            <section class="settings-section">
                <!-- Account Settings -->
                <div class="chart-container" data-animate="fade-in" style="margin-bottom: 2rem;">
                    <div class="chart-header">
                        <h3>Account Settings</h3>
                        <p style="color: var(--gray-500); font-size: 0.875rem; margin: 0;">Manage your account information and preferences</p>
                    </div>
                    <div style="padding: 2rem;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--gray-700);">Full Name</label>
                                <input type="text" value="John Doe" style="width: 100%; padding: 0.75rem; border: 1px solid var(--gray-300); border-radius: 0.5rem; background: white;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--gray-700);">Email Address</label>
                                <input type="email" value="john.doe@example.com" style="width: 100%; padding: 0.75rem; border: 1px solid var(--gray-300); border-radius: 0.5rem; background: white;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--gray-700);">Role</label>
                                <select style="width: 100%; padding: 0.75rem; border: 1px solid var(--gray-300); border-radius: 0.5rem; background: white;">
                                    <option value="admin">Administrator</option>
                                    <option value="manager">Manager</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--gray-700);">Department</label>
                                <select style="width: 100%; padding: 0.75rem; border: 1px solid var(--gray-300); border-radius: 0.5rem; background: white;">
                                    <option value="marketing">Marketing</option>
                                    <option value="sales">Sales</option>
                                    <option value="engineering">Engineering</option>
                                    <option value="hr">Human Resources</option>
                                </select>
                            </div>
                        </div>
                        <div style="margin-top: 2rem;">
                            <button class="btn-primary">
                                <i class="fas fa-save"></i>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Dashboard Preferences -->
                <div class="chart-container" data-animate="fade-in" data-delay="200" style="margin-bottom: 2rem;">
                    <div class="chart-header">
                        <h3>Dashboard Preferences</h3>
                        <p style="color: var(--gray-500); font-size: 0.875rem; margin: 0;">Customize your dashboard experience</p>
                    </div>
                    <div style="padding: 2rem;">
                        <div style="display: grid; gap: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--gray-200); border-radius: 0.5rem;">
                                <div>
                                    <h4 style="margin: 0; color: var(--gray-900);">Dark Mode</h4>
                                    <p style="margin: 0.25rem 0 0 0; color: var(--gray-500); font-size: 0.875rem;">Switch to dark theme</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--gray-200); border-radius: 0.5rem;">
                                <div>
                                    <h4 style="margin: 0; color: var(--gray-900);">Auto-refresh Data</h4>
                                    <p style="margin: 0.25rem 0 0 0; color: var(--gray-500); font-size: 0.875rem;">Automatically update dashboard data</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--gray-200); border-radius: 0.5rem;">
                                <div>
                                    <h4 style="margin: 0; color: var(--gray-900);">Compact View</h4>
                                    <p style="margin: 0.25rem 0 0 0; color: var(--gray-500); font-size: 0.875rem;">Use compact layout for more data</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--gray-200); border-radius: 0.5rem;">
                                <div>
                                    <h4 style="margin: 0; color: var(--gray-900);">Reduce Animations</h4>
                                    <p style="margin: 0.25rem 0 0 0; color: var(--gray-500); font-size: 0.875rem;">Minimize motion for better performance</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Notification Settings -->
                <div class="chart-container" data-animate="fade-in" data-delay="400">
                    <div class="chart-header">
                        <h3>Notification Settings</h3>
                        <p style="color: var(--gray-500); font-size: 0.875rem; margin: 0;">Configure how you receive notifications</p>
                    </div>
                    <div style="padding: 2rem;">
                        <div style="display: grid; gap: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--gray-200); border-radius: 0.5rem;">
                                <div>
                                    <h4 style="margin: 0; color: var(--gray-900);">Email Notifications</h4>
                                    <p style="margin: 0.25rem 0 0 0; color: var(--gray-500); font-size: 0.875rem;">Receive notifications via email</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--gray-200); border-radius: 0.5rem;">
                                <div>
                                    <h4 style="margin: 0; color: var(--gray-900);">Push Notifications</h4>
                                    <p style="margin: 0.25rem 0 0 0; color: var(--gray-500); font-size: 0.875rem;">Receive browser push notifications</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--gray-200); border-radius: 0.5rem;">
                                <div>
                                    <h4 style="margin: 0; color: var(--gray-900);">Weekly Reports</h4>
                                    <p style="margin: 0.25rem 0 0 0; color: var(--gray-500); font-size: 0.875rem;">Receive weekly summary reports</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--gray-200); border-radius: 0.5rem;">
                                <div>
                                    <h4 style="margin: 0; color: var(--gray-900);">System Alerts</h4>
                                    <p style="margin: 0.25rem 0 0 0; color: var(--gray-500); font-size: 0.875rem;">Receive system maintenance alerts</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div style="margin-top: 2rem;">
                            <button class="btn-primary">
                                <i class="fas fa-save"></i>
                                Save Preferences
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    initializePage(section) {
        switch (section) {
            case 'overview':
                this.initializeOverviewPage();
                break;
            case 'analytics':
                this.initializeAnalyticsPage();
                break;
            case 'users':
                this.initializeUsersPage();
                break;
            case 'reports':
                this.initializeReportsPage();
                break;
            case 'settings':
                this.initializeSettingsPage();
                break;
        }
    }

    async handleChartFilter(event) {
        const chartType = event.target.dataset.chart;
        const period = event.target.value;
        
        this.showChartLoading(chartType);
        
        try {
            const newData = await this.api.getChartData(period);
            this.chartManager.updateChart(chartType, newData[chartType]);
        } catch (error) {
            console.error('Error updating chart:', error);
        } finally {
            this.hideChartLoading(chartType);
        }
    }

    handleSearch(event) {
        const query = event.target.value.toLowerCase();
        
        // Filter table rows
        const rows = document.querySelectorAll('#ordersTable tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const shouldShow = text.includes(query);
            
            row.style.display = shouldShow ? '' : 'none';
            
            if (shouldShow) {
                row.classList.add('animate-fade-in');
            }
        });
    }

    handleExport() {
        // Simulate export functionality
        const btn = document.querySelector('.btn-primary');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Exported!';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }, 1500);
    }

    handleResize() {
        this.chartManager.resizeCharts();
    }

    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 1000); // Show loading for at least 1 second for smooth UX
        }
    }

    showChartLoading(chartType) {
        const chart = document.querySelector(`#${chartType}Chart`);
        if (chart) {
            chart.style.opacity = '0.5';
            chart.style.pointerEvents = 'none';
        }
    }

    hideChartLoading(chartType) {
        const chart = document.querySelector(`#${chartType}Chart`);
        if (chart) {
            chart.style.opacity = '1';
            chart.style.pointerEvents = 'auto';
        }
    }

    showError(message) {
        // Simple error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideLeft 0.3s ease-out;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.animation = 'slideRight 0.3s ease-out forwards';
            setTimeout(() => errorDiv.remove(), 300);
        }, 3000);
    }

    startRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(async () => {
            try {
                const newKPIData = await this.api.getKPIData();
                this.updateKPICards(newKPIData);
                
                // Add subtle animation to indicate update
                document.querySelectorAll('.kpi-card').forEach(card => {
                    card.classList.add('animate-pulse');
                    setTimeout(() => card.classList.remove('animate-pulse'), 1000);
                });
            } catch (error) {
                console.error('Error updating real-time data:', error);
            }
        }, 30000);
    }
    async initializeOverviewPage() {
        // Load dashboard data and charts
        await this.loadDashboardData();
    }

    async initializeAnalyticsPage() {
        // Initialize analytics charts
        await this.loadAnalyticsData();
        this.setupAnalyticsEventListeners();
        // Trigger counter animations specifically for this page
        this.animationController.triggerCounterAnimations();
    }

    async initializeUsersPage() {
        // Load and display user data
        await this.loadUsersData();
        this.setupUsersEventListeners();
        // Trigger counter animations specifically for this page
        this.animationController.triggerCounterAnimations();
    }

    async initializeReportsPage() {
        // Load reports data
        await this.loadReportsData();
        this.setupReportsEventListeners();
        // Trigger counter animations specifically for this page
        this.animationController.triggerCounterAnimations();
    }

    initializeSettingsPage() {
        // Setup settings event listeners
        this.setupSettingsEventListeners();
    }

    async loadAnalyticsData() {
        try {
            const analyticsData = await this.api.getAnalyticsData();
            this.updateAnalyticsCharts(analyticsData);
            this.populateAnalyticsTable(analyticsData.traffic.tableData || analyticsData.traffic);
        } catch (error) {
            console.error('Error loading analytics data:', error);
        }
    }

    async loadUsersData() {
        try {
            const usersData = await this.api.getUsersData();
            this.populateUsersTable(usersData);
        } catch (error) {
            console.error('Error loading users data:', error);
        }
    }

    async loadReportsData() {
        try {
            const reportsData = await this.api.getReportsData();
            this.populateReportsTable(reportsData);
        } catch (error) {
            console.error('Error loading reports data:', error);
        }
    }

    updateAnalyticsCharts(data) {
        // Traffic Sources Chart
        const trafficCtx = document.getElementById('trafficChart');
        if (trafficCtx) {
            this.chartManager.createChart(trafficCtx, 'line', {
                data: data.traffic,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Traffic Sources'
                        }
                    }
                }
            });
        }

        // Top Pages Chart
        const pagesCtx = document.getElementById('pagesChart');
        if (pagesCtx) {
            this.chartManager.createChart(pagesCtx, 'bar', {
                data: data.pages,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Top Pages'
                        }
                    }
                }
            });
        }

        // Device Types Chart
        const devicesCtx = document.getElementById('devicesChart');
        if (devicesCtx) {
            this.chartManager.createChart(devicesCtx, 'doughnut', {
                data: data.devices,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Device Types'
                        }
                    }
                }
            });
        }
    }

    populateAnalyticsTable(data) {
        const table = document.getElementById('analyticsTable');
        if (!table) return;

        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.style.animationDelay = `${index * 100}ms`;
            tr.classList.add('animate-fade-in');
            
            tr.innerHTML = `
                <td>${row.source}</td>
                <td>${row.users.toLocaleString()}</td>
                <td>${row.sessions.toLocaleString()}</td>
                <td>${row.bounceRate}%</td>
                <td>${row.conversion}%</td>
                <td>$${row.revenue.toLocaleString()}</td>
            `;
            
            tbody.appendChild(tr);
        });
    }

    populateUsersTable(data) {
        const table = document.getElementById('usersTable');
        if (!table) return;

        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach((user, index) => {
            const tr = document.createElement('tr');
            tr.style.animationDelay = `${index * 100}ms`;
            tr.classList.add('animate-fade-in');
            
            tr.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div class="avatar" style="width: 32px; height: 32px; background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem;">
                            ${user.name.charAt(0)}
                        </div>
                        <span style="font-weight: 500;">${user.name}</span>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>
                    <span style="padding: 0.25rem 0.75rem; background: var(--gray-100); color: var(--gray-700); border-radius: 1rem; font-size: 0.75rem; font-weight: 500;">
                        ${user.role}
                    </span>
                </td>
                <td><span class="status-badge ${user.status.toLowerCase()}">${user.status}</span></td>
                <td>${new Date(user.lastLogin).toLocaleDateString()}</td>
                <td>
                    <div style="display: flex; gap: 0.5rem;">
                        <button style="padding: 0.25rem 0.5rem; border: none; background: var(--primary-500); color: white; border-radius: 0.25rem; cursor: pointer; font-size: 0.75rem;">Edit</button>
                        <button style="padding: 0.25rem 0.5rem; border: none; background: var(--error-500); color: white; border-radius: 0.25rem; cursor: pointer; font-size: 0.75rem;">Delete</button>
                    </div>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
    }

    populateReportsTable(data) {
        const table = document.getElementById('reportsTable');
        if (!table) return;

        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach((report, index) => {
            const tr = document.createElement('tr');
            tr.style.animationDelay = `${index * 100}ms`;
            tr.classList.add('animate-fade-in');
            
            tr.innerHTML = `
                <td style="font-weight: 500;">${report.name}</td>
                <td>
                    <span style="padding: 0.25rem 0.75rem; background: var(--blue-100); color: var(--blue-700); border-radius: 1rem; font-size: 0.75rem; font-weight: 500;">
                        ${report.type}
                    </span>
                </td>
                <td>${report.createdBy}</td>
                <td>${new Date(report.dateCreated).toLocaleDateString()}</td>
                <td><span class="status-badge ${report.status.toLowerCase()}">${report.status}</span></td>
                <td>
                    <div style="display: flex; gap: 0.5rem;">
                        <button style="padding: 0.25rem 0.5rem; border: none; background: var(--success-500); color: white; border-radius: 0.25rem; cursor: pointer; font-size: 0.75rem;">Download</button>
                        <button style="padding: 0.25rem 0.5rem; border: none; background: var(--gray-500); color: white; border-radius: 0.25rem; cursor: pointer; font-size: 0.75rem;">View</button>
                    </div>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
    }

    setupAnalyticsEventListeners() {
        // Analytics-specific event listeners
        const searchInput = document.querySelector('#analyticsTable + .search-box input');
        searchInput?.addEventListener('input', Utils.debounce((e) => {
            this.filterTable('analyticsTable', e.target.value);
        }, 300));
    }

    setupUsersEventListeners() {
        // Users-specific event listeners
        const searchInput = document.querySelector('#usersTable + .search-box input');
        searchInput?.addEventListener('input', Utils.debounce((e) => {
            this.filterTable('usersTable', e.target.value);
        }, 300));

        // User action buttons
        const actionButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', this.handleUserAction.bind(this));
        });
    }

    setupReportsEventListeners() {
        // Reports-specific event listeners
        const generateBtn = document.querySelector('.btn-primary');
        generateBtn?.addEventListener('click', this.handleReportGeneration.bind(this));

        const searchInput = document.querySelector('#reportsTable + .search-box input');
        searchInput?.addEventListener('input', Utils.debounce((e) => {
            this.filterTable('reportsTable', e.target.value);
        }, 300));
    }

    setupSettingsEventListeners() {
        // Settings toggle switches
        const toggles = document.querySelectorAll('.switch input[type="checkbox"]');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', this.handleSettingToggle.bind(this));
        });

        // Save buttons
        const saveButtons = document.querySelectorAll('.btn-primary');
        saveButtons.forEach(btn => {
            btn.addEventListener('click', this.handleSettingsSave.bind(this));
        });
    }

    filterTable(tableId, query) {
        const table = document.getElementById(tableId);
        if (!table) return;

        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const shouldShow = text.includes(query.toLowerCase());
            row.style.display = shouldShow ? '' : 'none';
        });
    }

    handleUserAction(event) {
        const action = event.target.textContent.toLowerCase();
        const originalText = event.target.innerHTML;
        
        event.target.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        event.target.disabled = true;
        
        setTimeout(() => {
            event.target.innerHTML = originalText;
            event.target.disabled = false;
            
            this.showNotification(`User ${action} completed successfully!`, 'success');
        }, 1500);
    }

    handleReportGeneration(event) {
        const btn = event.target;
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Generated!';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
            
            this.showNotification('Report generated successfully!', 'success');
        }, 2500);
    }

    handleSettingToggle(event) {
        const setting = event.target.closest('.switch').previousElementSibling.querySelector('h4').textContent;
        const enabled = event.target.checked;
        
        this.showNotification(`${setting} ${enabled ? 'enabled' : 'disabled'}`, 'info');
    }

    handleSettingsSave(event) {
        const btn = event.target;
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Saved!';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
            
            this.showNotification('Settings saved successfully!', 'success');
        }, 1500);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const colors = {
            success: 'var(--success-500)',
            error: 'var(--error-500)',
            warning: 'var(--warning-500)',
            info: 'var(--primary-500)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideLeft 0.3s ease-out;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations and updates when tab is not visible
        document.body.classList.add('paused');
    } else {
        document.body.classList.remove('paused');
    }
}); 