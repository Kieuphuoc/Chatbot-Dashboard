// ===== AI Chatbot Logic =====

const chatbotResponses = {
    // Overview responses
    'tình hình tài chính': 'Tình hình tài chính tháng 12/2025:\n\n📈 **Doanh thu:** 12.5 tỷ VNĐ (↑8.5%)\n📉 **Lợi nhuận:** 2.8 tỷ VNĐ (↓3.2%)\n💰 **Dòng tiền thuần:** +1.5 tỷ VNĐ\n📋 **Công nợ:** 4.2 tỷ VNĐ\n\n⚠️ Có 3 cảnh báo đang kích hoạt cần chú ý.',

    'dòng tiền': 'Dòng tiền hiện tại:\n\n✅ **Dòng tiền thuần dương:** 1.5 tỷ VNĐ\n📊 **Tiền vào:** 4.5 tỷ/tháng\n📊 **Tiền ra:** 3.0 tỷ/tháng\n\n🔮 **Dự báo 30 ngày:** +1.8 tỷ VNĐ\n\nNhìn chung dòng tiền ổn định, tuy nhiên cần thu hồi công nợ quá hạn để đảm bảo thanh khoản.',

    'lợi nhuận': 'Phân tích lợi nhuận:\n\n📉 Lợi nhuận giảm 3.2% so với tháng trước\n\n**Nguyên nhân chính:**\n1. Chi phí quản lý tăng 12.5% (thuê văn phòng mới)\n2. Chi phí bán hàng tăng 8.2% (chiến dịch marketing Q4)\n\n💡 **Đề xuất:** Đàm phán lại hợp đồng thuê để giảm chi phí cố định.',

    // Debt responses
    'rủi ro cao': '🔴 **Khách hàng rủi ro cao:**\n\n1. **ABC Tech** - Nợ 820 triệu, quá hạn 45 ngày\n2. **Sao Việt** - Nợ 380 triệu, quá hạn 60 ngày\n\n💡 Đề xuất: Liên hệ ngay để đàm phán thu hồi, cân nhắc biện pháp pháp lý nếu không hợp tác.',

    'nợ quá hạn': '📊 **Tổng hợp nợ quá hạn:**\n\n💰 **Phải thu quá hạn:** 680 triệu VNĐ\n💸 **Phải trả quá hạn:** 320 triệu VNĐ\n\nTổng cộng: 1 tỷ VNĐ công nợ quá hạn cần xử lý ưu tiên.',

    'thanh toán ncc': '📋 **Đề xuất ưu tiên thanh toán NCC:**\n\n1. **Linh kiện Minh Châu** - 380 triệu, đến hạn 5 ngày (Gấp)\n2. **Vật tư Hoàng Phát** - 450 triệu, đến hạn 10 ngày\n\n💡 Thanh toán đúng hạn để duy trì mối quan hệ và điểm tín dụng tốt.',

    // Expense responses
    'chi phí bất thường': '⚠️ **Chi phí tăng bất thường:**\n\n1. **Chi phí quản lý:** +12.5%\n   → Nguyên nhân: Thuê văn phòng mới\n\n2. **Chi phí bán hàng:** +8.2%\n   → Nguyên nhân: Chiến dịch marketing Q4\n\n💡 Cần đánh giá ROI của các khoản chi tăng này.',

    'tỷ lệ chi phí': '📊 **Tỷ lệ chi phí/doanh thu:**\n\n• Kỳ này: 77.6%\n• Kỳ trước: 72.4%\n• Chênh lệch: +5.2%\n\n⚠️ Tỷ lệ đang cao hơn trung bình ngành (70-75%). Cần kiểm soát chi phí quản lý.',

    'kiểm soát': '💡 **Các khoản chi cần kiểm soát:**\n\n1. **Chi phí quản lý** (18.6%): Vượt ngưỡng an toàn\n2. **Chi phí vận chuyển**: Cần tối ưu lộ trình\n3. **Chi phí tiếp khách**: Áp dụng quy chế mới\n\nĐề xuất: Thiết lập KPI chi phí cho từng phòng ban.',

    // AI Analysis responses
    'ai đánh giá': '🤖 **Đánh giá của AI:**\n\n📊 **Điểm sức khỏe tài chính:** 72/100 (Tốt)\n\n**Điểm mạnh:**\n✅ Dòng tiền dương ổn định\n✅ Doanh thu tăng trưởng\n\n**Cần cải thiện:**\n⚠️ Công nợ quá hạn tăng\n⚠️ Chi phí quản lý cao',

    'rủi ro lớn': '⚠️ **Rủi ro lớn nhất hiện tại:**\n\n**#1 Công nợ quá hạn tăng 15%**\nTác động: Ảnh hưởng dòng tiền và vốn lưu động\n\n**#2 Chi phí quản lý vượt ngưỡng**\nTác động: Giảm biên lợi nhuận\n\n💡 Ưu tiên thu hồi công nợ từ ABC Tech và Sao Việt.',

    '30 ngày tới': '📅 **Kế hoạch hành động 30 ngày tới:**\n\n1️⃣ **Tuần 1-2:** Thu hồi công nợ ABC Tech (mục tiêu 50%)\n2️⃣ **Tuần 2-3:** Đàm phán giảm chi phí thuê văn phòng\n3️⃣ **Tuần 3-4:** Tối ưu tồn kho chậm luân chuyển\n\n🎯 Mục tiêu: Tăng điểm sức khỏe lên 78 điểm.',

    // Alerts responses
    'cảnh báo': '🔔 **Có 3 cảnh báo đang kích hoạt:**\n\n🔴 Chi phí quản lý vượt 18% (2 giờ trước)\n🟠 Công nợ ABC Tech quá hạn 45 ngày (5h trước)\n🟠 Lợi nhuận giảm 3.2% (1 ngày trước)',

    'nghiêm trọng': '🚨 **Cảnh báo nghiêm trọng nhất:**\n\n**Chi phí quản lý vượt 18%**\n• Ngưỡng cài đặt: 15%\n• Hiện tại: 18.6%\n• Vượt: 3.6%\n\nTác động trực tiếp đến lợi nhuận. Cần hành động ngay.',

    'ưu tiên xử lý': '📋 **Thứ tự ưu tiên xử lý:**\n\n1️⃣ **Thu hồi công nợ quá hạn** - Tác động cao\n2️⃣ **Kiểm soát chi phí quản lý** - Tác động trung bình\n3️⃣ **Tối ưu tồn kho** - Tác động thấp\n\nBắt đầu từ việc liên hệ ABC Tech ngay hôm nay.',

    // Default
    'default': 'Tôi có thể giúp bạn phân tích:\n\n• Tình hình tài chính tổng quan\n• Công nợ và rủi ro\n• Chi phí và hiệu quả\n• Dự báo và đề xuất AI\n• Cảnh báo hiện tại\n\nHãy hỏi cụ thể hơn để tôi hỗ trợ tốt nhất!'
};

// Initialize chatbot
function initChatbot() {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const quickRepliesContainer = document.getElementById('quick-replies');
    const chatbotMinimize = document.getElementById('chatbot-minimize');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbot = document.getElementById('chatbot');
    const mainContent = document.querySelector('.main-content');

    // Add welcome message
    addBotMessage('Xin chào! 👋 Tôi là Trợ lý AI Tài chính. Tôi có thể giúp bạn phân tích số liệu, giải thích báo cáo, và đề xuất hành động. Hãy hỏi bất cứ điều gì về tài chính doanh nghiệp!');

    // Update quick replies based on current tab
    updateQuickReplies('overview');

    // Send message on button click
    chatSend.addEventListener('click', sendMessage);

    // Send message on Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Minimize chatbot
    chatbotMinimize.addEventListener('click', () => {
        chatbot.classList.add('hidden');
        chatbotToggle.classList.remove('hidden');
        mainContent.classList.add('chatbot-hidden');
    });

    // Show chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbot.classList.remove('hidden');
        chatbotToggle.classList.add('hidden');
        mainContent.classList.remove('chatbot-hidden');
    });
}

// Add bot message
function addBotMessage(text) {
    const chatMessages = document.getElementById('chat-messages');
    const message = document.createElement('div');
    message.className = 'chat-message bot';
    message.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add user message
function addUserMessage(text) {
    const chatMessages = document.getElementById('chat-messages');
    const message = document.createElement('div');
    message.className = 'chat-message user';
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const text = chatInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    chatInput.value = '';

    // Simulate typing
    setTimeout(() => {
        const response = getResponse(text);
        addBotMessage(response);
    }, 500 + Math.random() * 500);
}

// Get response based on keywords
function getResponse(text) {
    const lowerText = text.toLowerCase();

    for (const [keyword, response] of Object.entries(chatbotResponses)) {
        if (lowerText.includes(keyword)) {
            return response;
        }
    }

    return chatbotResponses.default;
}

// Update quick replies
function updateQuickReplies(tabId) {
    const container = document.getElementById('quick-replies');
    const replies = quickReplies[tabId] || quickReplies.overview;

    container.innerHTML = replies.map(reply =>
        `<button class="quick-reply-btn" onclick="sendQuickReply('${reply}')">${reply}</button>`
    ).join('');
}

// Send quick reply
function sendQuickReply(text) {
    const chatInput = document.getElementById('chat-input');
    chatInput.value = text;
    sendMessage();
}

// Navigate to tab via chatbot
function navigateToTab(tabId) {
    const navItem = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
    if (navItem) {
        navItem.click();
        addBotMessage(`Đã chuyển đến tab "${navItem.textContent.trim()}". Bạn cần tôi giải thích gì thêm?`);
    }
}
