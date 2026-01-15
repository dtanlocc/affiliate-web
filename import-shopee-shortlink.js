const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const prisma = new PrismaClient();

async function importAllCSVs() {
    // 1. Tìm tất cả các file .csv trong thư mục hiện tại
    const directoryPath = __dirname;
    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.csv'));

    if (files.length === 0) {
        console.log("❌ Không tìm thấy file .csv nào trong thư mục!");
        return;
    }

    console.log(`🚀 Tìm thấy ${files.length} file CSV. Bắt đầu quét dữ liệu tổng lực...`);

    let globalSuccessCount = 0;
    let globalFailCount = 0;

    for (const file of files) {
        console.log(`\n--------------------------------------------------`);
        console.log(`📂 Đang xử lý file: ${file}`);
        
        const filePath = path.join(directoryPath, file);
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let lineCount = 0;
        let fileSuccessCount = 0;

        for await (const line of rl) {
            lineCount++;
            // Bỏ qua dòng tiêu đề
            if (lineCount === 1) continue;

            // Xử lý dữ liệu dòng (Tách bằng dấu phẩy)
            const columns = line.split(',');
            const originalUrl = columns[0];
            const shortUrl = columns[6];

            if (!originalUrl || !shortUrl || !shortUrl.includes('s.shopee.vn')) {
                globalFailCount++;
                continue;
            }

            try {
                // Trích xuất ItemID dùng Regex
                const match = originalUrl.match(/product\/\d+\/(\d+)/);
                if (match && match[1]) {
                    const itemId = BigInt(match[1]);

                    // Cập nhật Database
                    await prisma.product.update({
                        where: { itemid: itemId },
                        data: { affiliate_link: shortUrl }
                    });

                    fileSuccessCount++;
                    globalSuccessCount++;

                    if (globalSuccessCount % 1000 === 0) {
                        console.log(`✅ Đã nạp tổng cộng: ${globalSuccessCount} link...`);
                    }
                }
            } catch (err) {
                globalFailCount++;
            }
        }
        console.log(`✨ File ${file} xong: +${fileSuccessCount} link.`);
    }

    console.log(`
    ==================================================
    🏁 HOÀN TẤT CHIẾN DỊCH NẠP DỮ LIỆU
    📊 Tổng số file đã quét: ${files.length}
    ✅ Tổng link Affiliate đã nạp: ${globalSuccessCount}
    ❌ Tổng link lỗi/bỏ qua: ${globalFailCount}
    ==================================================
    `);
}

importAllCSVs()
    .catch(console.error)
    .finally(() => prisma.$disconnect());