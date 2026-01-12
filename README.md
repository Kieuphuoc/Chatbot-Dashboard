# FinanceAI - ERP Financial Analytics Dashboard

Bảng điều khiển phân tích tài chính doanh nghiệp hiện đại, được thiết kế cho các doanh nghiệp SME và vừa tại Việt Nam.

![Dashboard Preview](./screenshots/dashboard_overview.png)

## 🚀 Tính năng chính

### 5 Tab Chức năng

| Tab | Mô tả | API Endpoint |
|-----|-------|--------------|
| **Tổng quan** | KPI tài chính, biểu đồ doanh thu & dòng tiền, AI insight | `GET /api/finance/overview` |
| **Công nợ** | Quản lý phải thu/phải trả, tuổi nợ, xếp hạng rủi ro AI | `GET /api/ar/summary`, `/api/ap/summary` |
| **Chi phí** | Phân tích chi phí theo danh mục, phát hiện bất thường | `GET /api/expense/summary` |
| **Phân tích AI** | Health Score, dự báo, đề xuất hành động | `GET /api/ai/health-score` |
| **Cảnh báo & Rủi ro** | Cấu hình ngưỡng cảnh báo, Action Simulator | `GET /api/alerts/config` |

### 🤖 AI Chatbot
- Trả lời câu hỏi tài chính bằng tiếng Việt
- Quick replies theo context của từng tab
- Giải thích số liệu dễ hiểu
- Đề xuất hành động

### ✨ Tính năng độc đáo
- **Explainable AI**: Nút "Vì sao AI nói vậy?" giải thích logic
- **Finance Story Mode**: Chuyển báo cáo thành narrative
- **Action Simulator**: Mô phỏng tác động của hành động lên dòng tiền
- **Developer Tooltips**: Hiển thị API endpoint và nguồn dữ liệu ERP

---

## 📁 Cấu trúc Project

```
Chatbot-Report/
├── index.html      # HTML chính
├── styles.css      # CSS styling (dark theme)
├── data.js         # Mock data & API documentation
├── charts.js       # Chart.js configurations
├── tabs.js         # Tab content generators
├── chatbot.js      # AI chatbot logic
├── app.js          # Main application
└── README.md       # Documentation
```

---

## 🛠️ Công nghệ sử dụng

- **HTML5** - Cấu trúc semantic
- **CSS3** - Dark theme, animations, responsive
- **Vanilla JavaScript** - Không framework
- **Chart.js** - Biểu đồ tương tác

---

## 🚀 Cách chạy

1. Mở file `index.html` trong trình duyệt
2. Hoặc sử dụng Live Server trong VS Code

```bash
# Với Live Server extension
# Right-click index.html → Open with Live Server
```

---

## ⌨️ Phím tắt

| Phím | Chức năng |
|------|-----------|
| `Alt + 1-5` | Chuyển nhanh giữa các tab |
| `Ctrl + /` | Focus vào chatbot input |

---

## 📊 API Endpoints Reference

### Finance Overview
```
GET /api/finance/overview
Source: Báo cáo KQKD, Lưu chuyển tiền tệ, Bảng CĐKT
```

### AI Analysis
```
GET /api/ai/health-score      # Điểm sức khỏe tài chính
GET /api/ai/forecast          # Dự báo dòng tiền
GET /api/ai/recommend-actions # Đề xuất hành động
GET /api/ai/finance-summary   # Tóm tắt AI
GET /api/ai/debt-risk         # Đánh giá rủi ro công nợ
GET /api/ai/cost-anomaly      # Phát hiện chi phí bất thường
```

### Debt Management
```
GET /api/ar/summary           # Tổng hợp phải thu
GET /api/ar/aging             # Tuổi nợ phải thu
GET /api/ar/customers         # Danh sách khách hàng
GET /api/ap/summary           # Tổng hợp phải trả
GET /api/ap/aging             # Tuổi nợ phải trả
GET /api/ap/suppliers         # Danh sách NCC
```

### Expense
```
GET /api/expense/summary      # Tổng chi phí
GET /api/expense/by-category  # Chi phí theo danh mục
```

### Alerts
```
GET /api/alerts/config        # Cấu hình cảnh báo
POST /api/alerts/evaluate     # Kiểm tra trigger
```

### Chatbot
```
POST /api/chatbot/query       # Gửi câu hỏi cho AI
```

---

## 🎨 Design System

### Colors
```css
--primary: #6366f1      /* Indigo */
--secondary: #8b5cf6    /* Purple */
--success: #10b981      /* Green */
--warning: #f59e0b      /* Amber */
--danger: #ef4444       /* Red */
--bg-primary: #0f0f1a   /* Dark background */
--bg-card: #252540      /* Card background */
```

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800

---

## 📱 Responsive

Dashboard được thiết kế desktop-first nhưng responsive-ready:
- **> 1400px**: 4 columns grid
- **992px - 1400px**: 2 columns grid
- **< 992px**: Collapsed sidebar

---

## 📜 License

MIT License - Free for personal and commercial use.

---

## 👥 Credits

Designed & Developed for Vietnamese SME ERP systems.

**Version**: 1.0.0  
**Last Updated**: January 2026
"# Chatbot-Dashboard" 
