// ===== Mock Data for ERP Financial Dashboard =====

const mockData = {
    // Overview KPIs
    overview: {
        revenue: { value: 12500000000, change: 8.5, label: 'Tổng doanh thu' },
        profit: { value: 2800000000, change: -3.2, label: 'Lợi nhuận' },
        cashflow: { value: 1500000000, change: 12.1, label: 'Dòng tiền thuần' },
        totalDebt: { value: 4200000000, change: 5.4, label: 'Tổng công nợ' }
    },
    
    // Revenue & Profit Timeline
    revenueProfit: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        revenue: [8.2, 9.1, 10.5, 9.8, 11.2, 12.1, 11.8, 13.2, 12.5, 14.1, 13.8, 12.5],
        profit: [1.8, 2.1, 2.4, 2.2, 2.6, 2.9, 2.7, 3.1, 2.8, 3.2, 3.0, 2.8]
    },
    
    // Cashflow In/Out
    cashflowData: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        inflow: [3.2, 3.8, 4.1, 3.5, 4.2, 4.5],
        outflow: [2.8, 3.2, 3.5, 3.8, 3.4, 3.0]
    },
    
    // AI Insight
    aiSummary: {
        text: `<strong>Tình hình tài chính tháng 12/2025:</strong> Doanh thu đạt <strong>12.5 tỷ VNĐ</strong>, tăng 8.5% so với tháng trước. Tuy nhiên, lợi nhuận giảm nhẹ 3.2% do chi phí quản lý tăng. Dòng tiền thuần dương với <strong>1.5 tỷ VNĐ</strong>, cho thấy khả năng thanh khoản tốt. Có <strong>3 khoản công nợ quá hạn</strong> cần thu hồi sớm.`,
        reason: `AI phân tích dựa trên: Báo cáo kết quả kinh doanh (KQKD) tháng 12, Báo cáo lưu chuyển tiền tệ, và Sổ chi tiết công nợ. Thuật toán so sánh với dữ liệu 6 tháng gần nhất để đánh giá xu hướng.`
    },
    
    // AR Summary
    arSummary: {
        total: { value: 2800000000, label: 'Tổng phải thu' },
        overdue: { value: 680000000, label: 'Nợ quá hạn' },
        upcoming: { value: 1200000000, label: 'Sắp đến hạn' }
    },
    
    // AP Summary  
    apSummary: {
        total: { value: 1400000000, label: 'Tổng phải trả' },
        overdue: { value: 320000000, label: 'Nợ quá hạn' },
        upcoming: { value: 580000000, label: 'Sắp đến hạn' }
    },
    
    // Aging Data
    arAging: {
        labels: ['0-30 ngày', '31-60 ngày', '61-90 ngày', '>90 ngày'],
        values: [1200, 680, 520, 400],
        colors: ['#10b981', '#f59e0b', '#f97316', '#ef4444']
    },
    
    apAging: {
        labels: ['0-30 ngày', '31-60 ngày', '61-90 ngày', '>90 ngày'],
        values: [580, 420, 280, 120],
        colors: ['#10b981', '#f59e0b', '#f97316', '#ef4444']
    },
    
    // Customer/Supplier Lists
    customers: [
        { name: 'Công ty TNHH ABC Tech', debt: 820000000, overdue: 45, risk: 'high' },
        { name: 'CTCP Thương mại XYZ', debt: 650000000, overdue: 30, risk: 'medium' },
        { name: 'Công ty TNHH Innovation', debt: 480000000, overdue: 0, risk: 'low' },
        { name: 'CTCP Đầu tư Delta', debt: 420000000, overdue: 15, risk: 'medium' },
        { name: 'Công ty Sao Việt', debt: 380000000, overdue: 60, risk: 'high' }
    ],
    
    suppliers: [
        { name: 'NCC Vật tư Hoàng Phát', debt: 450000000, due: 10, risk: 'medium' },
        { name: 'Công ty Linh kiện Minh Châu', debt: 380000000, due: 5, risk: 'high' },
        { name: 'CTCP Cung ứng Toàn Cầu', debt: 320000000, due: 25, risk: 'low' },
        { name: 'NCC Thiết bị Công nghệ', debt: 250000000, due: 15, risk: 'low' }
    ],
    
    // Expense Data
    expense: {
        total: { value: 9700000000, change: 6.8 },
        ratio: 77.6,
        previousRatio: 72.4,
        categories: [
            { name: 'Chi phí nhân công', value: 3800000000, percent: 39.2 },
            { name: 'Chi phí nguyên vật liệu', value: 2400000000, percent: 24.7 },
            { name: 'Chi phí quản lý', value: 1800000000, percent: 18.6 },
            { name: 'Chi phí bán hàng', value: 1200000000, percent: 12.4 },
            { name: 'Chi phí khác', value: 500000000, percent: 5.1 }
        ],
        trend: {
            labels: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            current: [8.2, 8.5, 9.1, 9.4, 9.2, 9.7],
            previous: [7.8, 8.0, 8.2, 8.6, 8.4, 8.8]
        },
        anomalies: [
            { category: 'Chi phí quản lý', increase: 12.5, reason: 'Tăng chi phí thuê văn phòng mới' },
            { category: 'Chi phí bán hàng', increase: 8.2, reason: 'Chiến dịch marketing Q4' }
        ]
    },
    
    // AI Analysis
    aiAnalysis: {
        healthScore: 72,
        risks: [
            { level: 'high', title: 'Công nợ quá hạn tăng', description: 'Nợ quá hạn tăng 15% so với tháng trước' },
            { level: 'medium', title: 'Chi phí quản lý cao', description: 'Vượt ngưỡng an toàn 10%' },
            { level: 'low', title: 'Tồn kho tăng nhẹ', description: 'Cần theo dõi trong tháng tới' }
        ],
        forecast: {
            cashflow30: { value: 1800000000, trend: 'positive' },
            cashflow60: { value: 2100000000, trend: 'positive' },
            cashflow90: { value: 1500000000, trend: 'negative' },
            profitTrend: { value: 2600000000, change: -5.2 }
        },
        recommendations: [
            { icon: '💰', title: 'Thu hồi công nợ quá hạn', desc: 'Ưu tiên thu hồi từ ABC Tech và Sao Việt' },
            { icon: '📉', title: 'Kiểm soát chi phí quản lý', desc: 'Đàm phán lại hợp đồng thuê văn phòng' },
            { icon: '📊', title: 'Tối ưu tồn kho', desc: 'Giảm 15% hàng tồn kho chậm luân chuyển' }
        ]
    },
    
    // Alerts Configuration
    alerts: [
        { id: 1, name: 'Chi phí quản lý vượt ngưỡng', desc: 'Cảnh báo khi chi phí quản lý > X% doanh thu', threshold: 15, unit: '%', enabled: true, category: 'expense' },
        { id: 2, name: 'Dòng tiền thuần âm liên tục', desc: 'Cảnh báo khi dòng tiền âm liên tục Y ngày', threshold: 7, unit: 'ngày', enabled: true, category: 'cashflow' },
        { id: 3, name: 'Công nợ quá hạn', desc: 'Cảnh báo khi có nợ quá hạn > Z ngày', threshold: 30, unit: 'ngày', enabled: true, category: 'debt' },
        { id: 4, name: 'Tồn kho cao', desc: 'Cảnh báo khi tồn kho > X% doanh thu', threshold: 25, unit: '%', enabled: false, category: 'inventory' },
        { id: 5, name: 'Lợi nhuận giảm', desc: 'Cảnh báo khi lợi nhuận giảm > X% so với kỳ trước', threshold: 10, unit: '%', enabled: true, category: 'profit' }
    ],
    
    // Active Alerts
    activeAlerts: [
        { type: 'danger', title: 'Chi phí quản lý vượt 18%', time: '2 giờ trước' },
        { type: 'warning', title: 'Công nợ ABC Tech quá hạn 45 ngày', time: '5 giờ trước' },
        { type: 'warning', title: 'Lợi nhuận giảm 3.2%', time: '1 ngày trước' }
    ]
};

// API Endpoints Documentation
const apiDocs = {
    overview: {
        endpoint: 'GET /api/finance/overview',
        source: ['Báo cáo kết quả kinh doanh (KQKD)', 'Báo cáo lưu chuyển tiền tệ', 'Bảng cân đối kế toán']
    },
    aiSummary: {
        endpoint: 'GET /api/ai/finance-summary',
        source: ['Doanh thu 6 tháng gần nhất', 'Lợi nhuận theo kỳ', 'Xu hướng dòng tiền']
    },
    arSummary: {
        endpoint: 'GET /api/ar/summary',
        source: ['Sổ chi tiết công nợ phải thu', 'Báo cáo công nợ quá hạn']
    },
    apSummary: {
        endpoint: 'GET /api/ap/summary',
        source: ['Sổ chi tiết công nợ phải trả', 'Báo cáo thanh toán NCC']
    },
    arAging: {
        endpoint: 'GET /api/ar/aging',
        source: ['Bảng tuổi nợ phải thu', 'Ngày đến hạn hóa đơn']
    },
    apAging: {
        endpoint: 'GET /api/ap/aging',
        source: ['Bảng tuổi nợ phải trả', 'Lịch thanh toán NCC']
    },
    customers: {
        endpoint: 'GET /api/ar/customers',
        source: ['Danh mục khách hàng', 'Sổ chi tiết công nợ']
    },
    suppliers: {
        endpoint: 'GET /api/ap/suppliers',
        source: ['Danh mục nhà cung cấp', 'Sổ chi tiết công nợ']
    },
    debtRisk: {
        endpoint: 'GET /api/ai/debt-risk',
        source: ['Lịch sử thanh toán', 'Tuổi nợ', 'Điểm tín dụng']
    },
    expenseSummary: {
        endpoint: 'GET /api/expense/summary',
        source: ['Báo cáo chi phí tổng hợp', 'Sổ cái tài khoản chi phí']
    },
    expenseCategory: {
        endpoint: 'GET /api/expense/by-category',
        source: ['Chi tiết chi phí theo loại', 'Trung tâm chi phí']
    },
    costAnomaly: {
        endpoint: 'GET /api/ai/cost-anomaly',
        source: ['Dữ liệu chi phí 12 tháng', 'Ngưỡng trung bình ngành']
    },
    healthScore: {
        endpoint: 'GET /api/ai/health-score',
        source: ['Tổng hợp tất cả chỉ số tài chính', 'Mô hình AI đánh giá sức khỏe']
    },
    forecast: {
        endpoint: 'GET /api/ai/forecast',
        source: ['Dữ liệu lịch sử 24 tháng', 'Mô hình dự báo time-series']
    },
    recommendations: {
        endpoint: 'GET /api/ai/recommend-actions',
        source: ['Phân tích rủi ro', 'Quy tắc kinh doanh', 'Best practices']
    },
    alertsConfig: {
        endpoint: 'GET /api/alerts/config',
        source: ['Cấu hình cảnh báo người dùng']
    },
    alertsEvaluate: {
        endpoint: 'POST /api/alerts/evaluate',
        source: ['KQKD', 'Dòng tiền', 'Công nợ', 'Tồn kho']
    },
    chatbot: {
        endpoint: 'POST /api/chatbot/query',
        source: ['Tất cả báo cáo tài chính', 'Kết quả phân tích AI', 'Cảnh báo hiện tại']
    }
};

// Quick replies per tab
const quickReplies = {
    overview: [
        'Tình hình tài chính tháng này thế nào?',
        'Dòng tiền có vấn đề không?',
        'Khoản nào đang ảnh hưởng lợi nhuận?'
    ],
    debt: [
        'Khách hàng nào đang rủi ro cao?',
        'Nợ quá hạn bao nhiêu tiền?',
        'Có nên thanh toán NCC nào trước?'
    ],
    expense: [
        'Chi phí nào đang tăng bất thường?',
        'Tỷ lệ chi phí/doanh thu bao nhiêu?',
        'Có khoản chi nào cần kiểm soát?'
    ],
    'ai-analysis': [
        'AI đánh giá công ty tôi thế nào?',
        'Rủi ro lớn nhất hiện tại là gì?',
        'Nên làm gì trong 30 ngày tới?'
    ],
    alerts: [
        'Có bao nhiêu cảnh báo đang kích hoạt?',
        'Cảnh báo nào nghiêm trọng nhất?',
        'Tôi nên ưu tiên xử lý cảnh báo nào?'
    ]
};

// Format number to Vietnamese currency
function formatCurrency(value) {
    if (value >= 1000000000) {
        return (value / 1000000000).toFixed(1) + ' tỷ';
    } else if (value >= 1000000) {
        return (value / 1000000).toFixed(0) + ' triệu';
    }
    return value.toLocaleString('vi-VN');
}

// Format full currency
function formatFullCurrency(value) {
    return value.toLocaleString('vi-VN') + ' VNĐ';
}
