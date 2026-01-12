// File: test-api.js
// Script này dùng để kiểm tra dữ liệu trả về thực tế từ AccessTrade
// Cần cài axios: npm install axios

const axios = require('axios');

// ⚠️ QUAN TRỌNG: Dán Access Key thật của bạn vào đây để test
const ACCESS_KEY = 'lj527tNdTRgqZJ9ey3aAoroTLMM24DBl'; 

const URL = 'https://api.accesstrade.vn/v1/top_products';

async function getRealData() {
  try {
    console.log("🔄 Đang gọi API AccessTrade...");
    
    const response = await axios.get(URL, {
      headers: {
        'Authorization': `Token ${ACCESS_KEY}`,
        'Content-Type': 'application/json'
      },
      params: {
        merchant: '4348611690224153209',
        is_next_day_coupon: false,
        limit: 5,
        page: 1
        // date: 2
      }
    });

    console.log("✅ Kết nối thành công! Dữ liệu gốc trả về:");
    console.log("------------------------------------------------");
    // In ra toàn bộ cấu trúc JSON để phân tích
    console.log(JSON.stringify(response.data, null, 2)); 
    console.log("------------------------------------------------");

  } catch (error) {
    console.error("❌ Lỗi kết nối:", error.response ? error.response.data : error.message);
  }
}

getRealData();