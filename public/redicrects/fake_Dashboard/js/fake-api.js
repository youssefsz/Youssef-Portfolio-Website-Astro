// Fake API Module - Simulates realistic backend interactions
export class FakeAPI {
    constructor() {
        this.baseDelay = 300; // Base API delay in ms
        this.maxDelay = 1200; // Maximum delay for slow connections
    }

    // Simulate network delay
    async simulateDelay() {
        const delay = this.baseDelay + Math.random() * (this.maxDelay - this.baseDelay);
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    // Simulate API errors (1% chance)
    shouldSimulateError() {
        return Math.random() < 0.01;
    }

    // Get KPI data
    async getKPIData() {
        await this.simulateDelay();
        
        if (this.shouldSimulateError()) {
            throw new Error('Network error');
        }

        // Generate realistic KPI data with small variations
        const baseData = {
            users: 24567,
            revenue: 89432,
            orders: 1247,
            conversion: 3.47
        };

        // Add small random variations (±5%)
        const variation = () => 0.95 + (Math.random() * 0.1);

        return [
            {
                value: Math.floor(baseData.users * variation()),
                change: this.generateChange(),
                changeType: Math.random() > 0.3 ? 'positive' : 'negative',
                format: 'number'
            },
            {
                value: Math.floor(baseData.revenue * variation()),
                change: this.generateChange(),
                changeType: Math.random() > 0.2 ? 'positive' : 'negative',
                format: 'currency'
            },
            {
                value: Math.floor(baseData.orders * variation()),
                change: this.generateChange(),
                changeType: Math.random() > 0.4 ? 'positive' : 'negative',
                format: 'number'
            },
            {
                value: parseFloat((baseData.conversion * variation()).toFixed(2)),
                change: this.generateChange(),
                changeType: Math.random() > 0.3 ? 'positive' : 'negative',
                format: 'percentage'
            }
        ];
    }

    // Generate realistic percentage changes
    generateChange() {
        const change = (Math.random() * 20 - 5).toFixed(1); // -5% to +15%
        return `${change >= 0 ? '+' : ''}${change}%`;
    }

    // Get chart data
    async getChartData(period = '30d') {
        await this.simulateDelay();
        
        if (this.shouldSimulateError()) {
            throw new Error('Failed to load chart data');
        }

        const days = this.getPeriodDays(period);
        
        return {
            revenue: this.generateRevenueData(days),
            activity: this.generateActivityData(days),
            sales: this.generateSalesData()
        };
    }

    getPeriodDays(period) {
        switch (period) {
            case '7d': return 7;
            case '30d': return 30;
            case '90d': return 90;
            default: return 30;
        }
    }

    generateRevenueData(days) {
        const labels = [];
        const data = [];
        const baseRevenue = 2500;
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            }));
            
            // Generate realistic revenue with trends and seasonality
            const weekDay = date.getDay();
            const weekendMultiplier = (weekDay === 0 || weekDay === 6) ? 0.7 : 1;
            const trendMultiplier = 1 + (i / days) * 0.3; // Slight upward trend
            const randomVariation = 0.8 + Math.random() * 0.4;
            
            const revenue = Math.floor(
                baseRevenue * weekendMultiplier * trendMultiplier * randomVariation
            );
            
            data.push(revenue);
        }

        return {
            labels,
            datasets: [
                {
                    label: 'Revenue',
                    data,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }
            ]
        };
    }

    generateActivityData(days) {
        const labels = [];
        const activeUsers = [];
        const newUsers = [];
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            }));
            
            // Generate realistic user activity
            const baseActive = 800;
            const baseNew = 120;
            const weekDay = date.getDay();
            const weekMultiplier = (weekDay === 0 || weekDay === 6) ? 0.6 : 1;
            
            activeUsers.push(Math.floor(
                baseActive * weekMultiplier * (0.9 + Math.random() * 0.2)
            ));
            
            newUsers.push(Math.floor(
                baseNew * weekMultiplier * (0.8 + Math.random() * 0.4)
            ));
        }

        return {
            labels,
            datasets: [
                {
                    label: 'Active Users',
                    data: activeUsers,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'New Users',
                    data: newUsers,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ]
        };
    }

    generateSalesData() {
        const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'];
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        const data = categories.map(() => Math.floor(Math.random() * 30) + 10);
        
        return {
            labels: categories,
            datasets: [{
                data,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 10
            }]
        };
    }

    // Get table data
    async getTableData() {
        await this.simulateDelay();
        
        if (this.shouldSimulateError()) {
            throw new Error('Failed to load table data');
        }

        const customers = [
            'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis',
            'David Wilson', 'Lisa Anderson', 'Robert Taylor', 'Jennifer Martinez',
            'William Garcia', 'Mary Rodriguez', 'James Lopez', 'Patricia Lee'
        ];

        const products = [
            'MacBook Pro 16"', 'iPhone 15 Pro', 'Samsung Galaxy S24', 'iPad Air',
            'Dell XPS 15', 'Sony WH-1000XM5', 'Nintendo Switch', 'AirPods Pro',
            'Tesla Model Y', 'Canon EOS R5', 'Surface Laptop 5', 'PlayStation 5'
        ];

        const statuses = ['completed', 'pending', 'cancelled'];
        const statusWeights = [0.7, 0.25, 0.05]; // Most orders completed

        const orders = [];
        
        for (let i = 0; i < 25; i++) {
            const randomStatus = this.weightedRandom(statuses, statusWeights);
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));
            
            orders.push({
                id: 10000 + i,
                customer: customers[Math.floor(Math.random() * customers.length)],
                product: products[Math.floor(Math.random() * products.length)],
                amount: Math.floor(Math.random() * 2500) + 100,
                status: randomStatus,
                date: date.toISOString()
            });
        }

        // Sort by date (newest first)
        orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return orders;
    }

    // Weighted random selection helper
    weightedRandom(items, weights) {
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return items[i];
            }
        }
        
        return items[items.length - 1];
    }

    // Simulate real-time data updates
    async getRealtimeUpdates() {
        await this.simulateDelay();
        
        return {
            newNotifications: Math.floor(Math.random() * 5),
            serverLoad: Math.random() * 100,
            activeConnections: Math.floor(Math.random() * 1000) + 500,
            timestamp: new Date().toISOString()
        };
    }

    // Simulate user actions
    async performUserAction(action, data) {
        await this.simulateDelay();
        
        if (this.shouldSimulateError()) {
            throw new Error(`Failed to perform ${action}`);
        }

        // Simulate successful response
        return {
            success: true,
            action,
            data,
            timestamp: new Date().toISOString(),
            message: `${action} completed successfully`
        };
    }

    async getAnalyticsData() {
        await this.simulateDelay();
        
        if (this.shouldSimulateError()) {
            throw new Error('Failed to fetch analytics data');
        }

        return {
            traffic: this.generateTrafficData(),
            pages: this.generatePagesData(),
            devices: this.generateDevicesData()
        };
    }

    async getUsersData() {
        await this.simulateDelay();
        
        if (this.shouldSimulateError()) {
            throw new Error('Failed to fetch users data');
        }

        return this.generateUsersData();
    }

    async getReportsData() {
        await this.simulateDelay();
        
        if (this.shouldSimulateError()) {
            throw new Error('Failed to fetch reports data');
        }

        return this.generateReportsData();
    }

    generateTrafficData() {
        const sources = ['Google', 'Direct', 'Facebook', 'Twitter', 'LinkedIn', 'Email', 'Referral'];
        const days = 7;
        const labels = [];
        const datasets = [];
        
        // Generate labels for the last 7 days
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            }));
        }
        
        // Generate data for top 3 traffic sources
        const topSources = sources.slice(0, 3);
        const colors = ['#3b82f6', '#10b981', '#f59e0b'];
        
        topSources.forEach((source, index) => {
            const data = [];
            for (let i = 0; i < days; i++) {
                data.push(Math.floor(Math.random() * 1000) + 200);
            }
            
            datasets.push({
                label: source,
                data,
                borderColor: colors[index],
                backgroundColor: colors[index] + '20',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            });
        });
        
        return {
            labels,
            datasets,
            // Also return table data for analytics table
            tableData: sources.map(source => ({
                source,
                users: Math.floor(Math.random() * 10000) + 1000,
                sessions: Math.floor(Math.random() * 15000) + 1500,
                bounceRate: parseFloat((Math.random() * 60 + 20).toFixed(1)),
                conversion: parseFloat((Math.random() * 5 + 1).toFixed(2)),
                revenue: Math.floor(Math.random() * 50000) + 5000
            }))
        };
    }

    generatePagesData() {
        const pages = [
            { page: '/home', views: 45230 },
            { page: '/products', views: 32150 },
            { page: '/about', views: 18940 },
            { page: '/contact', views: 12760 },
            { page: '/blog', views: 8930 },
            { page: '/pricing', views: 7540 }
        ];

        return {
            labels: pages.map(p => p.page),
            datasets: [{
                label: 'Page Views',
                data: pages.map(p => p.views),
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        };
    }

    generateDevicesData() {
        return {
            labels: ['Desktop', 'Mobile', 'Tablet'],
            datasets: [{
                data: [60, 35, 5],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 101, 101, 0.8)'
                ],
                borderWidth: 0
            }]
        };
    }

    generateUsersData() {
        const names = [
            'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 
            'David Brown', 'Lisa Davis', 'Robert Miller', 'Emily Garcia',
            'Michael Rodriguez', 'Ashley Martinez', 'Christopher Lee', 'Amanda Taylor'
        ];
        
        const roles = ['Admin', 'Manager', 'User', 'Editor'];
        const statuses = ['Active', 'Inactive', 'Pending'];
        
        return names.map((name, index) => ({
            id: index + 1,
            name,
            email: name.toLowerCase().replace(/\s+/g, '.') + '@company.com',
            role: roles[Math.floor(Math.random() * roles.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        }));
    }

    generateReportsData() {
        const reportTypes = ['Sales', 'Analytics', 'Users', 'Revenue', 'Custom'];
        const creators = ['John Admin', 'Sarah Manager', 'Mike Analyst', 'Lisa Director'];
        const statuses = ['Completed', 'Pending', 'Failed'];
        
        const reports = [];
        
        for (let i = 1; i <= 15; i++) {
            const type = reportTypes[Math.floor(Math.random() * reportTypes.length)];
            reports.push({
                id: i,
                name: `${type} Report #${i.toString().padStart(3, '0')}`,
                type,
                createdBy: creators[Math.floor(Math.random() * creators.length)],
                dateCreated: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
                status: statuses[Math.floor(Math.random() * statuses.length)]
            });
        }
        
        return reports.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    }
} 