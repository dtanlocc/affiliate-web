const axios = require('axios');

// ⚠️ THAY KEY CỦA BẠN VÀO ĐÂY
const ACCESS_KEY = 'lj527tNdTRgqZJ9ey3aAoroTLMM24DBl'; 

async function compareKeywords() {
    const url = "https://api.accesstrade.vn/v1/datafeeds";
    
    // Config chung
    const headers = { 
        'Authorization': `Token ${ACCESS_KEY}`,
        'Content-Type': 'application/json'
    };

    console.log("🕵️ BẮT ĐẦU SO SÁNH 2 TỪ KHÓA...\n");

    try {
        // --- LẦN 1: TÌM "LAPTOP" ---
        console.log("👉 1. Tìm 'laptop'...");
        const res1 = await axios.get(url, {
            headers,
            params: { domain: 'shopee.vn', keyword: 'laptop', limit: 3 }
        });
        const items1 = res1.data.data || [];
        console.log(`   -> Trả về: ${items1.length} món.`);
        items1.forEach(i => console.log(`      - ${i.name} (${i.price}đ)`));

        console.log("\n-----------------------------------\n");

        // --- LẦN 2: TÌM "SON MOI" ---
        console.log("👉 2. Tìm 'son moi'...");
        const res2 = await axios.get(url, {
            headers,
            params: { domain: 'shopee.vn', keyword: 'son moi', limit: 3 }
        });
        const items2 = res2.data.data || [];
        console.log(`   -> Trả về: ${items2.length} món.`);
        items2.forEach(i => console.log(`      - ${i.name} (${i.price}đ)`));

        console.log("\n===================================");
        
        // SO SÁNH ID CỦA SẢN PHẨM ĐẦU TIÊN
        if (items1.length > 0 && items2.length > 0) {
            if (items1[0].product_id === items2[0].product_id) {
                console.log("❌ KẾT LUẬN: API ĐANG TRẢ VỀ GIỐNG HỆT NHAU! (Keyword bị lờ đi)");
            } else {
                console.log("✅ KẾT LUẬN: Dữ liệu KHÁC nhau -> API hoạt động tốt.");
                console.log("   (Lỗi nằm ở code Next.js hoặc Caching)");
            }
        }

    } catch (e) {
        console.log(`❌ Lỗi: ${e.message}`);
    }
}

compareKeywords();