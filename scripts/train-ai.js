const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function trainAI() {
  console.log("📥 Đang tải 'SIÊU NÃO' BGE-M3...");
  
  const { pipeline } = await import('@xenova/transformers');
  const extractor = await pipeline('feature-extraction', 'Xenova/bge-m3');

  console.log("🚀 Bắt đầu quy trình Training tự động toàn bộ Database...");

  let totalProcessed = 0;

  // VÒNG LẶP VÔ TẬN: Chạy cho đến khi hết dữ liệu
  while (true) {
    // 1. Lấy 50 sản phẩm chưa có Vector (embedding IS NULL)
    // Lưu ý: Dùng tên bảng "Product" (có ngoặc kép)
    const products = await prisma.$queryRaw`
      SELECT itemid, name, description, shop_location 
      FROM "Product" 
      WHERE embedding IS NULL 
      LIMIT 50
    `;

    // 2. Nếu không còn sản phẩm nào -> Dừng lại
    if (products.length === 0) {
        console.log("\n🎉 CHÚC MỪNG! Toàn bộ Database đã được AI học xong.");
        break;
    }

    // 3. Xử lý từng sản phẩm trong lô này
    for (const p of products) {
      try {
        const textToEmbed = `Sản phẩm: ${p.name}. Mô tả: ${p.description ? p.description.substring(0, 300) : ''}. Nơi bán: ${p.shop_location}`;

        const output = await extractor(textToEmbed, { pooling: 'cls', normalize: true });
        const vector = Array.from(output.data);

        await prisma.$executeRaw`
          UPDATE "Product" 
          SET embedding = ${JSON.stringify(vector)}::vector
          WHERE itemid = ${p.itemid}
        `;
        
        totalProcessed++;
        // In trên cùng 1 dòng để đỡ rối mắt
        process.stdout.write(`\r🧠 Đã học: ${totalProcessed} sản phẩm... (Đang xử lý ID: ${p.itemid})`);
      
      } catch (e) {
        console.error(`\n❌ Lỗi SP ${p.itemid}:`, e.message);
        // Nếu lỗi, gán tạm vector rỗng hoặc đánh dấu để không lặp lại (Tuỳ chọn)
      }
    }
  }

  console.log("\n🏁 Kết thúc script.");
}

trainAI();