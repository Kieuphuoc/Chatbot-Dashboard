// ===== Main Application =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();

    // Initialize all tabs
    initTabs();

    // Initialize chatbot
    initChatbot();

    // Initialize dev tooltips
    initDevTooltips();

    // Initialize refresh button
    initRefreshButton();

    // Render initial tab
    renderOverviewTab();
});

// ===== Theme Toggle =====
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateChartColors(savedTheme);

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateChartColors(newTheme);

        // Re-render current tab to update chart colors
        const activeNav = document.querySelector('.nav-item.active');
        if (activeNav) {
            activeNav.click();
        }

        // Notify via chatbot
        const themeLabel = newTheme === 'light' ? 'Sáng ☀️' : 'Tối 🌙';
        addBotMessage(`Đã chuyển sang giao diện ${themeLabel}`);
    });
}

// Update Chart.js colors based on theme
function updateChartColors(theme) {
    if (theme === 'light') {
        Chart.defaults.color = '#475569';
        Chart.defaults.borderColor = 'rgba(15, 23, 42, 0.1)';
    } else {
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.borderColor = 'rgba(148, 163, 184, 0.1)';
    }
}

// Tab Navigation
function initTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    const pageTitle = document.querySelector('.page-title');

    const tabTitles = {
        'overview': 'Tổng quan Tài chính',
        'debt': 'Quản lý Công nợ',
        'expense': 'Phân tích Chi phí',
        'ai-analysis': 'Phân tích AI',
        'alerts': 'Cảnh báo & Rủi ro'
    };

    const tabRenderers = {
        'overview': renderOverviewTab,
        'debt': renderDebtTab,
        'expense': renderExpenseTab,
        'ai-analysis': renderAIAnalysisTab,
        'alerts': renderAlertsTab
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.dataset.tab;

            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update page title
            pageTitle.textContent = tabTitles[tabId];

            // Update tab content
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');

            // Render tab content
            if (tabRenderers[tabId]) {
                tabRenderers[tabId]();
            }

            // Update chatbot quick replies
            updateQuickReplies(tabId);
        });
    });
}

// Developer Tooltips
function initDevTooltips() {
    const tooltip = document.getElementById('dev-tooltip');
    const tooltipContent = document.getElementById('tooltip-content');

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.dev-info-btn');

        if (btn) {
            const apiKey = btn.dataset.api;
            const apiInfo = apiDocs[apiKey];

            if (apiInfo) {
                tooltipContent.innerHTML = `
                    <p><strong>API Endpoint:</strong></p>
                    <p><code>${apiInfo.endpoint}</code></p>
                    <p style="margin-top: 8px;"><strong>Nguồn dữ liệu ERP:</strong></p>
                    <ul>
                        ${apiInfo.source.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                `;

                // Position tooltip
                const rect = btn.getBoundingClientRect();
                tooltip.style.top = (rect.bottom + 8) + 'px';
                tooltip.style.left = Math.min(rect.left, window.innerWidth - 320) + 'px';
                tooltip.classList.remove('hidden');
            }
        } else if (!e.target.closest('.dev-tooltip')) {
            tooltip.classList.add('hidden');
        }
    });
}

// Refresh Button
function initRefreshButton() {
    const refreshBtn = document.getElementById('refresh-btn');
    const lastUpdate = document.querySelector('.last-update');

    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('rotating');
        refreshBtn.disabled = true;

        // Simulate data refresh
        setTimeout(() => {
            const now = new Date();
            const timeStr = now.toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            lastUpdate.textContent = `Cập nhật: ${timeStr}`;

            refreshBtn.classList.remove('rotating');
            refreshBtn.disabled = false;

            // Re-render current tab
            const activeNav = document.querySelector('.nav-item.active');
            if (activeNav) {
                activeNav.click();
            }

            // Notify via chatbot
            addBotMessage('✅ Dữ liệu đã được cập nhật! Các chỉ số tài chính mới nhất đã được tải.');
        }, 1500);
    });
}

// Add rotating animation for refresh
const style = document.createElement('style');
style.textContent = `
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .btn-refresh.rotating svg {
        animation: rotate 1s linear infinite;
    }
    .btn-refresh:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);

// Story Mode - Convert data to narrative
function generateFinanceStory() {
    const { overview, expense, aiAnalysis } = mockData;

    const story = `
📖 **Câu chuyện tài chính tháng 12/2025**

Trong tháng này, doanh nghiệp ghi nhận doanh thu ${formatCurrency(overview.revenue.value)}, 
tăng ${overview.revenue.change}% so với tháng trước - một tín hiệu tích cực cho thấy 
hoạt động kinh doanh đang mở rộng.

Tuy nhiên, lợi nhuận lại giảm ${Math.abs(overview.profit.change)}%, chủ yếu do chi phí 
quản lý tăng mạnh 12.5% từ việc thuê văn phòng mới. Đây là sự đánh đổi cần thiết 
cho tăng trưởng dài hạn, nhưng cần được kiểm soát chặt chẽ.

Điểm sáng: Dòng tiền thuần dương ${formatCurrency(overview.cashflow.value)}, cho thấy 
khả năng thanh khoản ổn định. AI dự báo dòng tiền sẽ tiếp tục dương trong 60 ngày tới.

⚠️ Lưu ý: Có ${mockData.activeAlerts.length} cảnh báo cần xử lý, đặc biệt là 
công nợ quá hạn từ ABC Tech.

💡 Hành động đề xuất: Ưu tiên thu hồi công nợ và đàm phán giảm chi phí thuê.
    `;

    return story;
}

// Finance Story Mode Button Handler
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="story-mode"]')) {
        const story = generateFinanceStory();
        addBotMessage(story);
    }
});

// Period filter change handler
document.getElementById('period-select')?.addEventListener('change', (e) => {
    const period = e.target.value;
    const periodLabels = {
        'month': 'Tháng này',
        'quarter': 'Quý này',
        'year': 'Năm nay'
    };

    addBotMessage(`📅 Đã chuyển sang xem dữ liệu: **${periodLabels[period]}**. Các chỉ số đang được cập nhật...`);

    // Re-render current tab
    setTimeout(() => {
        const activeNav = document.querySelector('.nav-item.active');
        if (activeNav) {
            activeNav.click();
        }
    }, 500);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + 1-5 for quick tab switching
    if (e.altKey && e.key >= '1' && e.key <= '5') {
        const tabIndex = parseInt(e.key) - 1;
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems[tabIndex]) {
            navItems[tabIndex].click();
        }
    }

    // Ctrl + / to focus chatbot
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        document.getElementById('chat-input')?.focus();
    }
});

// Console info for developers
console.log(`
╔═══════════════════════════════════════════════════════════╗
║         FinanceAI Dashboard - Developer Mode              ║
╠═══════════════════════════════════════════════════════════╣
║  Keyboard Shortcuts:                                      ║
║  • Alt + 1-5    : Quick tab switching                     ║
║  • Ctrl + /     : Focus chatbot input                     ║
║                                                           ║
║  API Documentation:                                       ║
║  Click the ℹ️ button on any card to see API details       ║
║                                                           ║
║  Mock Data:                                               ║
║  Access via window.mockData in console                    ║
╚═══════════════════════════════════════════════════════════╝
`);

// Expose mock data for debugging
window.mockData = mockData;
window.apiDocs = apiDocs;
