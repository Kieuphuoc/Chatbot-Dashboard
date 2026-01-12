// ===== Tab Content Generators =====

// Generate KPI Card HTML
function createKPICard(title, value, change, icon, iconClass, apiKey) {
    const changeClass = change >= 0 ? 'positive' : 'negative';
    const changeIcon = change >= 0 ? '↑' : '↓';
    const apiInfo = apiDocs[apiKey];

    return `
        <div class="card kpi-card">
            <div class="card-header">
                <div class="card-icon ${iconClass}">${icon}</div>
                <button class="dev-info-btn" data-api="${apiKey}" title="Developer Info">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                </button>
            </div>
            <div class="card-title">${title}</div>
            <div class="card-value">${formatCurrency(value)}</div>
            <span class="card-change ${changeClass}">${changeIcon} ${Math.abs(change)}%</span>
            <div class="kpi-label">so với tháng trước</div>
        </div>
    `;
}

// Tab 1: Overview Content
function renderOverviewTab() {
    const container = document.getElementById('overview');
    const { overview, aiSummary } = mockData;

    container.innerHTML = `
        <!-- KPI Cards -->
        <div class="bento-grid" style="margin-bottom: 24px;">
            ${createKPICard(overview.revenue.label, overview.revenue.value, overview.revenue.change,
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
        'primary', 'overview')}
            ${createKPICard(overview.profit.label, overview.profit.value, overview.profit.change,
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>',
            'success', 'overview')}
            ${createKPICard(overview.cashflow.label, overview.cashflow.value, overview.cashflow.change,
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M12 2l10 10-10 10"/></svg>',
                'info', 'overview')}
            ${createKPICard(overview.totalDebt.label, overview.totalDebt.value, overview.totalDebt.change,
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
                    'warning', 'overview')}
        </div>
        
        <!-- Charts Row -->
        <div class="bento-grid cols-2" style="margin-bottom: 24px;">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/></svg>
                        Doanh thu & Lợi nhuận theo thời gian
                    </div>
                    <button class="dev-info-btn" data-api="overview" title="Developer Info">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                    </button>
                </div>
                <div class="chart-container">
                    <canvas id="revenue-chart"></canvas>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M12 2l10 10-10 10"/></svg>
                        Dòng tiền vào / ra
                    </div>
                    <button class="dev-info-btn" data-api="overview" title="Developer Info">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                    </button>
                </div>
                <div class="chart-container">
                    <canvas id="cashflow-chart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- AI Insight -->
        <div class="card ai-insight-card span-4">
            <div class="card-header">
                <div class="ai-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                    Phân tích AI
                </div>
                <button class="dev-info-btn" data-api="aiSummary" title="Developer Info">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                </button>
            </div>
            <div class="ai-summary">${aiSummary.text}</div>
            <button class="why-ai-btn" onclick="showAIReason('overview')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
                Vì sao AI nói vậy?
            </button>
        </div>
    `;

    // Initialize charts
    setTimeout(() => {
        createRevenueChart(document.getElementById('revenue-chart'));
        createCashflowChart(document.getElementById('cashflow-chart'));
    }, 100);
}

// Tab 2: Debt Content
function renderDebtTab() {
    const container = document.getElementById('debt');

    container.innerHTML = `
        <div class="sub-tabs">
            <button class="sub-tab active" data-subtab="ar">Phải thu khách hàng (AR)</button>
            <button class="sub-tab" data-subtab="ap">Phải trả nhà cung cấp (AP)</button>
        </div>
        
        <div id="ar-content" class="subtab-content">
            ${renderARContent()}
        </div>
        <div id="ap-content" class="subtab-content" style="display: none;">
            ${renderAPContent()}
        </div>
    `;

    // Sub-tab switching
    container.querySelectorAll('.sub-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const subtab = tab.dataset.subtab;
            document.getElementById('ar-content').style.display = subtab === 'ar' ? 'block' : 'none';
            document.getElementById('ap-content').style.display = subtab === 'ap' ? 'block' : 'none';

            if (subtab === 'ar') {
                setTimeout(() => createAgingChart(document.getElementById('ar-aging-chart'), mockData.arAging, 'ar'), 100);
            } else {
                setTimeout(() => createAgingChart(document.getElementById('ap-aging-chart'), mockData.apAging, 'ap'), 100);
            }
        });
    });

    setTimeout(() => createAgingChart(document.getElementById('ar-aging-chart'), mockData.arAging, 'ar'), 100);
}

function renderARContent() {
    const { arSummary, customers } = mockData;
    return `
        <div class="bento-grid cols-3" style="margin-bottom: 24px;">
            <div class="card">
                <div class="card-header">
                    <div class="card-icon primary"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
                    <button class="dev-info-btn" data-api="arSummary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="card-title">${arSummary.total.label}</div>
                <div class="card-value">${formatCurrency(arSummary.total.value)}</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-icon danger"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
                    <button class="dev-info-btn" data-api="arSummary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="card-title">${arSummary.overdue.label}</div>
                <div class="card-value" style="color: #ef4444;">${formatCurrency(arSummary.overdue.value)}</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-icon warning"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                    <button class="dev-info-btn" data-api="arSummary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="card-title">${arSummary.upcoming.label}</div>
                <div class="card-value" style="color: #f59e0b;">${formatCurrency(arSummary.upcoming.value)}</div>
            </div>
        </div>
        
        <div class="bento-grid cols-2">
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></svg> Phân tích tuổi nợ</div>
                    <button class="dev-info-btn" data-api="arAging"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="chart-container" style="height: 240px;">
                    <canvas id="ar-aging-chart"></canvas>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> Danh sách khách hàng</div>
                    <button class="dev-info-btn" data-api="customers"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="data-table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr><th>Khách hàng</th><th>Công nợ</th><th>Quá hạn</th><th>AI Risk</th></tr>
                        </thead>
                        <tbody>
                            ${customers.map(c => `
                                <tr>
                                    <td>${c.name}</td>
                                    <td>${formatCurrency(c.debt)}</td>
                                    <td>${c.overdue} ngày</td>
                                    <td><span class="risk-badge ${c.risk}">${c.risk === 'high' ? 'Cao' : c.risk === 'medium' ? 'TB' : 'Thấp'}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderAPContent() {
    const { apSummary, suppliers } = mockData;
    return `
        <div class="bento-grid cols-3" style="margin-bottom: 24px;">
            <div class="card">
                <div class="card-header">
                    <div class="card-icon primary"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
                    <button class="dev-info-btn" data-api="apSummary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="card-title">${apSummary.total.label}</div>
                <div class="card-value">${formatCurrency(apSummary.total.value)}</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-icon danger"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
                    <button class="dev-info-btn" data-api="apSummary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="card-title">${apSummary.overdue.label}</div>
                <div class="card-value" style="color: #ef4444;">${formatCurrency(apSummary.overdue.value)}</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-icon warning"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                    <button class="dev-info-btn" data-api="apSummary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="card-title">${apSummary.upcoming.label}</div>
                <div class="card-value" style="color: #f59e0b;">${formatCurrency(apSummary.upcoming.value)}</div>
            </div>
        </div>
        
        <div class="bento-grid cols-2">
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></svg> Phân tích tuổi nợ</div>
                    <button class="dev-info-btn" data-api="apAging"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="chart-container" style="height: 240px;">
                    <canvas id="ap-aging-chart"></canvas>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Danh sách nhà cung cấp</div>
                    <button class="dev-info-btn" data-api="suppliers"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="data-table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr><th>Nhà cung cấp</th><th>Công nợ</th><th>Đến hạn</th><th>Ưu tiên</th></tr>
                        </thead>
                        <tbody>
                            ${suppliers.map(s => `
                                <tr>
                                    <td>${s.name}</td>
                                    <td>${formatCurrency(s.debt)}</td>
                                    <td>${s.due} ngày</td>
                                    <td><span class="risk-badge ${s.risk}">${s.risk === 'high' ? 'Gấp' : s.risk === 'medium' ? 'Sớm' : 'Bình thường'}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Tab 3: Expense Content
function renderExpenseTab() {
    const container = document.getElementById('expense');
    const { expense } = mockData;

    container.innerHTML = `
        <div class="bento-grid" style="margin-bottom: 24px;">
            <div class="card">
                <div class="card-header">
                    <div class="card-icon primary"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12V7H5a2 2 0 010-4h14v4"/><path d="M3 5v14a2 2 0 002 2h16v-5"/><path d="M18 12a2 2 0 000 4h4v-4h-4z"/></svg></div>
                    <button class="dev-info-btn" data-api="expenseSummary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="card-title">Tổng chi phí</div>
                <div class="card-value">${formatCurrency(expense.total.value)}</div>
                <span class="card-change negative">↑ ${expense.total.change}%</span>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-icon warning"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg></div>
                    <button class="dev-info-btn" data-api="expenseSummary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="card-title">Tỷ lệ chi phí/doanh thu</div>
                <div class="card-value">${expense.ratio}%</div>
                <div class="kpi-label">Kỳ trước: ${expense.previousRatio}%</div>
            </div>
            <div class="card span-2 ai-insight-card">
                <div class="card-header">
                    <div class="ai-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg> AI Phát hiện bất thường</div>
                    <button class="dev-info-btn" data-api="costAnomaly"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div style="margin-top: 12px;">
                    ${expense.anomalies.map(a => `
                        <div style="display: flex; justify-content: space-between; padding: 12px; background: rgba(239, 68, 68, 0.1); border-radius: 8px; margin-bottom: 8px; border-left: 4px solid #ef4444;">
                            <span><strong>${a.category}</strong>: Tăng ${a.increase}%</span>
                            <span style="color: var(--text-muted); font-size: 13px;">${a.reason}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="bento-grid cols-2">
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></svg> Chi phí theo danh mục</div>
                    <button class="dev-info-btn" data-api="expenseCategory"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="chart-container">
                    <canvas id="expense-category-chart"></canvas>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/></svg> Xu hướng chi phí</div>
                    <button class="dev-info-btn" data-api="expenseSummary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="chart-container">
                    <canvas id="expense-trend-chart"></canvas>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        createExpenseCategoryChart(document.getElementById('expense-category-chart'));
        createExpenseTrendChart(document.getElementById('expense-trend-chart'));
    }, 100);
}

// Tab 4: AI Analysis Content
function renderAIAnalysisTab() {
    const container = document.getElementById('ai-analysis');
    const { aiAnalysis } = mockData;

    container.innerHTML = `
        <div class="bento-grid" style="margin-bottom: 24px;">
            <div class="card span-2">
                <div class="card-header">
                    <div class="card-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg> AI Financial Health Score</div>
                    <button class="dev-info-btn" data-api="healthScore"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="health-score-container">
                    <div>
                        <div class="health-score-circle" style="--score: ${aiAnalysis.healthScore}">
                            <span class="health-score-value">${aiAnalysis.healthScore}</span>
                        </div>
                        <div class="health-score-label">Điểm sức khỏe tài chính: <strong>${aiAnalysis.healthScore >= 70 ? 'Tốt' : aiAnalysis.healthScore >= 50 ? 'Trung bình' : 'Cần cải thiện'}</strong></div>
                    </div>
                </div>
                <button class="why-ai-btn" onclick="showAIReason('health')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg> Vì sao AI nói vậy?</button>
            </div>
            <div class="card span-2">
                <div class="card-header">
                    <div class="card-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg> Rủi ro phát hiện</div>
                    <button class="dev-info-btn" data-api="healthScore"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                ${aiAnalysis.risks.map(r => `
                    <div style="display: flex; gap: 12px; padding: 16px; background: var(--bg-input); border-radius: 8px; margin-bottom: 12px; border-left: 4px solid ${r.level === 'high' ? '#ef4444' : r.level === 'medium' ? '#f59e0b' : '#10b981'};">
                        <span class="risk-badge ${r.level}">${r.level === 'high' ? 'Cao' : r.level === 'medium' ? 'TB' : 'Thấp'}</span>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px;">${r.title}</div>
                            <div style="font-size: 13px; color: var(--text-muted);">${r.description}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="bento-grid cols-2" style="margin-bottom: 24px;">
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/></svg> Dự báo dòng tiền</div>
                    <button class="dev-info-btn" data-api="forecast"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
                </div>
                <div class="chart-container" style="height: 200px;">
                    <canvas id="forecast-chart"></canvas>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Dự báo chi tiết</div>
                </div>
                <div class="forecast-item">
                    <span class="forecast-label">30 ngày tới</span>
                    <span class="forecast-value positive">+${formatCurrency(aiAnalysis.forecast.cashflow30.value)}</span>
                </div>
                <div class="forecast-item">
                    <span class="forecast-label">60 ngày tới</span>
                    <span class="forecast-value positive">+${formatCurrency(aiAnalysis.forecast.cashflow60.value)}</span>
                </div>
                <div class="forecast-item">
                    <span class="forecast-label">90 ngày tới</span>
                    <span class="forecast-value negative">${formatCurrency(aiAnalysis.forecast.cashflow90.value)}</span>
                </div>
            </div>
        </div>
        
        <div class="card span-4">
            <div class="card-header">
                <div class="card-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> Đề xuất hành động từ AI</div>
                <button class="dev-info-btn" data-api="recommendations"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
            </div>
            ${aiAnalysis.recommendations.map(r => `
                <div class="recommendation-item">
                    <div class="recommendation-icon">${r.icon}</div>
                    <div class="recommendation-content">
                        <h4>${r.title}</h4>
                        <p>${r.desc}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    setTimeout(() => {
        createForecastChart(document.getElementById('forecast-chart'));
    }, 100);
}

// Tab 5: Alerts Content
function renderAlertsTab() {
    const container = document.getElementById('alerts');
    const { alerts, activeAlerts } = mockData;

    const categories = {
        expense: 'Chi phí',
        cashflow: 'Dòng tiền',
        debt: 'Công nợ',
        inventory: 'Tồn kho',
        profit: 'Lợi nhuận'
    };

    container.innerHTML = `
        <div class="bento-grid cols-3" style="margin-bottom: 24px;">
            ${activeAlerts.map(a => `
                <div class="card" style="border-left: 4px solid ${a.type === 'danger' ? '#ef4444' : '#f59e0b'};">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="card-icon ${a.type === 'danger' ? 'danger' : 'warning'}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 2px;">${a.title}</div>
                            <div style="font-size: 12px; color: var(--text-muted);">${a.time}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="card span-4">
            <div class="card-header">
                <div class="card-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg> Cấu hình cảnh báo</div>
                <button class="dev-info-btn" data-api="alertsConfig"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></button>
            </div>
            
            ${Object.keys(categories).map(cat => {
        const catAlerts = alerts.filter(a => a.category === cat);
        if (catAlerts.length === 0) return '';
        return `
                    <div style="margin-bottom: 24px;">
                        <h3 style="font-size: 14px; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">${categories[cat]}</h3>
                        ${catAlerts.map(a => `
                            <div class="alert-config-item">
                                <div class="alert-info">
                                    <div class="alert-name">${a.name}</div>
                                    <div class="alert-description">${a.desc}</div>
                                </div>
                                <div class="alert-controls">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="font-size: 13px; color: var(--text-muted);">Ngưỡng:</span>
                                        <input type="number" class="threshold-input" value="${a.threshold}" data-alert-id="${a.id}">
                                        <span style="font-size: 13px; color: var(--text-muted);">${a.unit}</span>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" ${a.enabled ? 'checked' : ''} data-toggle-id="${a.id}">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
    }).join('')}
        </div>
        
        <!-- Action Simulator -->
        <div class="card span-4 ai-insight-card" style="margin-top: 24px;">
            <div class="card-header">
                <div class="ai-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4"/></svg>Mô phỏng quyết định tài chính</div>
            </div>
            <div style="margin-top: 16px;">
                <p style="color: var(--text-secondary); margin-bottom: 16px;">Thử mô phỏng tác động của các hành động lên dòng tiền:</p>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <button class="why-ai-btn" onclick="simulateAction('collect30')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                        Thu 30% công nợ quá hạn
                    </button>
                    <button class="why-ai-btn" onclick="simulateAction('reduceCost')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
                        Giảm 10% chi phí quản lý
                    </button>
                    <button class="why-ai-btn" onclick="simulateAction('inventory')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/></svg>
                        Giảm 15% tồn kho
                    </button>
                </div>
                <div id="simulation-result" style="margin-top: 16px; padding: 16px; background: var(--bg-input); border-radius: 8px; display: none;"></div>
            </div>
        </div>
    `;
}

// Show AI Reason Modal
function showAIReason(type) {
    let reason = '';
    if (type === 'overview') {
        reason = mockData.aiSummary.reason;
    } else if (type === 'health') {
        reason = 'AI đánh giá sức khỏe tài chính dựa trên 5 tiêu chí chính: (1) Khả năng thanh toán ngắn hạn, (2) Hiệu quả sử dụng vốn, (3) Tỷ lệ nợ/vốn chủ, (4) Xu hướng doanh thu & lợi nhuận, (5) Chất lượng công nợ. Điểm số được tính theo mô hình weighted score với trọng số phù hợp ngành SME Việt Nam.';
    }

    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += `
        <div class="chat-message bot">
            <strong>🤖 Giải thích từ AI:</strong><br><br>${reason}
        </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simulate Action
function simulateAction(action) {
    const resultDiv = document.getElementById('simulation-result');
    let result = '';

    switch (action) {
        case 'collect30':
            result = '📊 <strong>Kết quả mô phỏng:</strong> Nếu thu được 30% công nợ quá hạn (≈ 204 triệu), dòng tiền thuần sẽ tăng từ <span style="color:#10b981">1.5 tỷ</span> lên <span style="color:#10b981">1.7 tỷ VNĐ</span>. Điểm sức khỏe tài chính tăng từ 72 lên 76 điểm.';
            break;
        case 'reduceCost':
            result = '📊 <strong>Kết quả mô phỏng:</strong> Giảm 10% chi phí quản lý (≈ 180 triệu/tháng), lợi nhuận tăng từ <span style="color:#10b981">2.8 tỷ</span> lên <span style="color:#10b981">3.0 tỷ VNĐ</span>. Tỷ lệ chi phí/doanh thu giảm còn 76.1%.';
            break;
        case 'inventory':
            result = '📊 <strong>Kết quả mô phỏng:</strong> Giảm 15% tồn kho sẽ giải phóng khoảng <span style="color:#10b981">450 triệu VNĐ</span> vốn lưu động, cải thiện vòng quay tồn kho và giảm rủi ro hàng tồn đọng.';
            break;
    }

    resultDiv.innerHTML = result;
    resultDiv.style.display = 'block';
}
