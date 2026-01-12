const axios = require('axios');

// ⚠️ DÁN KEY CỦA BẠN VÀO ĐÂY
const ACCESS_KEY = 'lj527tNdTRgqZJ9ey3aAoroTLMM24DBl'; 


async function findTiki() {
    console.log("🕵️ ĐANG QUÉT DANH SÁCH MERCHANT...\n");
    try {
        // 1. Lấy danh sách tất cả nhà cung cấp
        const res = await axios.get('https://api.accesstrade.vn/v1/offers_informations/merchant_list', {
            headers: { 'Authorization': `Token ${ACCESS_KEY}` }
        });

        const merchants = res.data.data || [];
        
        // 2. Tìm thằng nào tên có chữ "tiki"
        const tikiFound = merchants.filter(m => m.login_name.toLowerCase().includes('tiki'));

        if (tikiFound.length > 0) {
            console.log("✅ TÌM THẤY TIKI:");
            tikiFound.forEach(m => {
                console.log(`--------------------------------`);
                console.log(`Tên: ${m.display_name} (login_name: ${m.login_name})`);
                console.log(`ID: ${m.id}`); // <--- ĐÂY LÀ CÁI MÌNH CẦN
                console.log(`Tổng mã hiện có: ${m.total_offer}`);
                
                if (m.total_offer === 0) {
                    console.log("⚠️ CẢNH BÁO: Tiki hiện đang KHÔNG CÓ MÃ NÀO (Total = 0).");
                }
            });
        } else {
            console.log("❌ Không tìm thấy merchant nào tên Tiki. Bạn đã đăng ký chiến dịch Tiki chưa?");
        }

    } catch (e) {
        console.log(`❌ Lỗi: ${e.message}`);
    }
}

findTiki();