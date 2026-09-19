// Chart Manager - Handles all chart operations using Chart.js
export class ChartManager {
    constructor() {
        this.charts = {};
        this.defaultOptions = this.getDefaultOptions();
    }

    getDefaultOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            size: 12,
                            weight: '500'
                        },
                        color: '#64748b',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#e2e8f0',
                    borderColor: '#334155',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    titleFont: {
                        family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                        size: 12
                    },
                    padding: 12,
                    caretPadding: 10
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            size: 11
                        },
                        color: '#94a3b8',
                        maxTicksLimit: 8
                    }
                },
                y: {
                    grid: {
                        color: '#e2e8f0',
                        lineWidth: 1
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                            size: 11
                        },
                        color: '#94a3b8',
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        };
    }

    initializeCharts(data) {
        this.createRevenueChart(data.revenue);
        this.createActivityChart(data.activity);
        this.createSalesChart(data.sales);
    }

    // Generic chart creation method
    createChart(ctx, type, options = {}) {
        if (!ctx) return null;
        
        const config = {
            type: type,
            data: options.data,
            options: {
                ...this.defaultOptions,
                ...options.options,
                plugins: {
                    ...this.defaultOptions.plugins,
                    ...(options.options?.plugins || {})
                }
            }
        };

        const chartId = ctx.id || `chart_${Date.now()}`;
        this.charts[chartId] = new Chart(ctx, config);
        this.addChartAnimations(this.charts[chartId]);
        
        return this.charts[chartId];
    }

    createRevenueChart(data) {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        const config = {
            type: 'line',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `Revenue: $${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    ...this.defaultOptions.scales,
                    y: {
                        ...this.defaultOptions.scales.y,
                        ticks: {
                            ...this.defaultOptions.scales.y.ticks,
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8,
                        hitRadius: 10
                    }
                }
            }
        };

        this.charts.revenue = new Chart(ctx, config);
        this.addChartAnimations(this.charts.revenue);
    }

    createActivityChart(data) {
        const ctx = document.getElementById('activityChart');
        if (!ctx) return;

        const config = {
            type: 'line',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} users`;
                            }
                        }
                    }
                },
                scales: {
                    ...this.defaultOptions.scales,
                    y: {
                        ...this.defaultOptions.scales.y,
                        ticks: {
                            ...this.defaultOptions.scales.y.ticks,
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 0,
                        hoverRadius: 6,
                        hitRadius: 8
                    }
                }
            }
        };

        this.charts.activity = new Chart(ctx, config);
        this.addChartAnimations(this.charts.activity);
    }

    createSalesChart(data) {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                                size: 11,
                                weight: '500'
                            },
                            color: '#64748b',
                            usePointStyle: true,
                            padding: 15,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    return data.labels.map((label, i) => {
                                        const dataset = data.datasets[0];
                                        const value = dataset.data[i];
                                        const total = dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        
                                        return {
                                            text: `${label}: ${percentage}%`,
                                            fillStyle: dataset.backgroundColor[i],
                                            index: i
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    },
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${percentage}% (${context.parsed} items)`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1200,
                    easing: 'easeOutBounce'
                },
                onHover: (event, elements) => {
                    event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
                }
            }
        };

        this.charts.sales = new Chart(ctx, config);
        this.addChartAnimations(this.charts.sales);
    }

    addChartAnimations(chart) {
        // Add custom animations and interactions
        chart.options.onHover = (event, elements) => {
            const canvas = event.native.target;
            canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';
        };

        // Add progressive data reveal animation
        const originalUpdate = chart.update.bind(chart);
        chart.update = function(mode) {
            if (mode === 'resize') {
                return originalUpdate('none');
            }
            return originalUpdate(mode);
        };
    }

    updateChart(chartType, newData) {
        const chart = this.charts[chartType];
        if (!chart) return;

        // Smooth data transition
        this.animateDataUpdate(chart, newData);
    }

    animateDataUpdate(chart, newData) {
        const oldData = chart.data;
        
        // Create animation for smooth data transition
        const animationConfig = {
            duration: 750,
            easing: 'easeInOutQuart',
            onProgress: function(animation) {
                const progress = animation.currentStep / animation.numSteps;
                
                // Interpolate between old and new data
                if (newData.datasets && oldData.datasets) {
                    newData.datasets.forEach((newDataset, datasetIndex) => {
                        const oldDataset = oldData.datasets[datasetIndex];
                        if (oldDataset && newDataset.data && oldDataset.data) {
                            newDataset.data.forEach((newValue, pointIndex) => {
                                const oldValue = oldDataset.data[pointIndex] || 0;
                                const interpolatedValue = oldValue + (newValue - oldValue) * progress;
                                chart.data.datasets[datasetIndex].data[pointIndex] = interpolatedValue;
                            });
                        }
                    });
                }
                
                chart.update('none');
            },
            onComplete: function() {
                // Ensure final values are set
                chart.data = newData;
                chart.update('none');
            }
        };

        // Update labels immediately
        chart.data.labels = newData.labels;
        
        // Start the animation
        chart.options.animation = animationConfig;
        chart.update();
        
        // Reset animation options
        setTimeout(() => {
            chart.options.animation = {
                duration: 800,
                easing: 'easeOutQuart'
            };
        }, animationConfig.duration);
    }

    resizeCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }

    destroyCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};
    }

    // Advanced chart interactions
    addDataPointInteraction(chartType, callback) {
        const chart = this.charts[chartType];
        if (!chart) return;

        const canvas = chart.canvas;
        canvas.addEventListener('click', (event) => {
            const points = chart.getElementsAtEventForMode(
                event,
                'nearest',
                { intersect: true },
                true
            );

            if (points.length) {
                const firstPoint = points[0];
                const label = chart.data.labels[firstPoint.index];
                const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
                
                callback({
                    label,
                    value,
                    datasetIndex: firstPoint.datasetIndex,
                    index: firstPoint.index
                });
            }
        });
    }

    // Export chart as image
    exportChart(chartType, filename = 'chart.png') {
        const chart = this.charts[chartType];
        if (!chart) return;

        const url = chart.toBase64Image();
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
    }

    // Get chart statistics
    getChartStats(chartType) {
        const chart = this.charts[chartType];
        if (!chart) return null;

        const datasets = chart.data.datasets;
        const stats = {};

        datasets.forEach((dataset, index) => {
            const data = dataset.data.filter(value => typeof value === 'number');
            if (data.length > 0) {
                stats[dataset.label || `Dataset ${index}`] = {
                    min: Math.min(...data),
                    max: Math.max(...data),
                    avg: data.reduce((sum, val) => sum + val, 0) / data.length,
                    total: data.reduce((sum, val) => sum + val, 0),
                    count: data.length
                };
            }
        });

        return stats;
    }
} 