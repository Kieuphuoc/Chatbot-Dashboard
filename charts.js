// ===== Chart Configurations =====

let charts = {};

// Chart.js default configuration
Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = 'rgba(148, 163, 184, 0.1)';
Chart.defaults.font.family = "'Inter', sans-serif";

// Create Revenue & Profit Chart
function createRevenueChart(container) {
    const ctx = container.getContext('2d');
    if (charts.revenue) charts.revenue.destroy();

    charts.revenue = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mockData.revenueProfit.labels,
            datasets: [
                {
                    label: 'Doanh thu (tỷ)',
                    data: mockData.revenueProfit.revenue,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: '#6366f1'
                },
                {
                    label: 'Lợi nhuận (tỷ)',
                    data: mockData.revenueProfit.profit,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: '#10b981'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(148, 163, 184, 0.1)' }
                },
                x: {
                    grid: { display: false }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Create Cashflow Chart
function createCashflowChart(container) {
    const ctx = container.getContext('2d');
    if (charts.cashflow) charts.cashflow.destroy();

    charts.cashflow = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: mockData.cashflowData.labels,
            datasets: [
                {
                    label: 'Tiền vào (tỷ)',
                    data: mockData.cashflowData.inflow,
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderRadius: 6
                },
                {
                    label: 'Tiền ra (tỷ)',
                    data: mockData.cashflowData.outflow,
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(148, 163, 184, 0.1)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// Create Aging Chart
function createAgingChart(container, data, type) {
    const ctx = container.getContext('2d');
    const chartKey = type + 'Aging';
    if (charts[chartKey]) charts[chartKey].destroy();

    charts[chartKey] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.colors,
                borderWidth: 0,
                spacing: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 16,
                        font: { size: 12 }
                    }
                }
            }
        }
    });
}

// Create Expense Category Chart
function createExpenseCategoryChart(container) {
    const ctx = container.getContext('2d');
    if (charts.expenseCategory) charts.expenseCategory.destroy();

    const categories = mockData.expense.categories;

    charts.expenseCategory = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories.map(c => c.name),
            datasets: [{
                data: categories.map(c => c.percent),
                backgroundColor: [
                    '#6366f1',
                    '#8b5cf6',
                    '#a855f7',
                    '#d946ef',
                    '#64748b'
                ],
                borderWidth: 0,
                spacing: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 12,
                        font: { size: 11 },
                        generateLabels: function (chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${data.datasets[0].data[i]}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                strokeStyle: data.datasets[0].backgroundColor[i],
                                pointStyle: 'circle',
                                index: i
                            }));
                        }
                    }
                }
            }
        }
    });
}

// Create Expense Trend Chart
function createExpenseTrendChart(container) {
    const ctx = container.getContext('2d');
    if (charts.expenseTrend) charts.expenseTrend.destroy();

    charts.expenseTrend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mockData.expense.trend.labels,
            datasets: [
                {
                    label: 'Kỳ này (tỷ)',
                    data: mockData.expense.trend.current,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                },
                {
                    label: 'Kỳ trước (tỷ)',
                    data: mockData.expense.trend.previous,
                    borderColor: '#64748b',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: { usePointStyle: true, padding: 20 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(148, 163, 184, 0.1)' }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

// Create Forecast Chart
function createForecastChart(container) {
    const ctx = container.getContext('2d');
    if (charts.forecast) charts.forecast.destroy();

    charts.forecast = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Hiện tại', '30 ngày', '60 ngày', '90 ngày'],
            datasets: [{
                label: 'Dự báo dòng tiền (tỷ)',
                data: [1.5, 1.8, 2.1, 1.5],
                borderColor: '#6366f1',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
                    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(148, 163, 184, 0.1)' }
                },
                x: { grid: { display: false } }
            }
        }
    });
}
