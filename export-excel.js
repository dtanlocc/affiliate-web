const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx'); // Dùng thư viện xlsx để tăng độ tương thích
const prisma = new PrismaClient();

async function exportShopeeExcelStrict() {
    console.log("🚀 Đang khởi tạo quá trình xuất file chuẩn Shopee...");

    try {
        const allProducts = await prisma.product.findMany({
            select: { itemid: true, shopid: true },
            orderBy: { itemid: 'asc' }
        });

        const total = allProducts.length;
        const chunkSize = 10000;
        const totalFiles = Math.ceil(total / chunkSize);

        for (let i = 0; i < totalFiles; i++) {
            const start = i * chunkSize;
            const end = start + chunkSize;
            const chunk = allProducts.slice(start, end);

            // 1. Tạo mảng dữ liệu với Header chính xác 100%
            // Lưu ý: Shopee đôi khi yêu cầu tiêu đề Tiếng Anh hoặc Tiếng Việt tùy theo giao diện.
            // Nếu "Liên kết gốc" lỗi, bạn hãy thử đổi thành "Original Link"
            const data = chunk.map(p => ({
                'Liên kết gốc': `https://shopee.vn/product/${p.shopid}/${p.itemid}`,
                'Sub_id1': 'website',
                'Sub_id2': '',
                'Sub_id3': '',
                'Sub_id4': '',
                'Sub_id5': ''
            }));

            // 2. Tạo Worksheet từ mảng dữ liệu
            const worksheet = XLSX.utils.json_to_sheet(data);

            // 3. Tạo Workbook và thêm Worksheet vào
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Tên sheet phải là Sheet1

            // 4. Xuất file
            const fileName = `Shopee_Batch_${i + 1}.xlsx`;
            XLSX.writeFile(workbook, fileName);
            
            console.log(`✅ Đã tạo file: ${fileName}`);
        }

        console.log("\n🏁 Hoàn tất! Hãy thử tải lại file lên Shopee.");

    } catch (error) {
        console.error("❌ Lỗi:", error);
    } finally {
        await prisma.$disconnect();
    }
}

exportShopeeExcelStrict();