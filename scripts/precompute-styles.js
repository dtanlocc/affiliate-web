const fs = require('fs');
const path = require('path');

async function precompute() {
  console.log("📥 Đang load model BGE-M3 (Quantized)...");
  const { pipeline } = await import('@xenova/transformers');
  
  // Dùng model nén để chạy nhanh
  const extractor = await pipeline('feature-extraction', 'Xenova/bge-m3', { quantized: true });

  // --- CẤU HÌNH TỪ KHÓA CHUẨN ---
  const STYLE_PROMPTS = {
    // THỜI TRANG
    'tong-tai': 'Phong cách công sở nữ, vest blazer thanh lịch, sang trọng, nữ doanh nhân, quyền lực, quần tây',
    'nang-tho': 'Váy đầm xòe, phong cách vintage, nhẹ nhàng, hoa nhí, tiểu thư, dịu dàng, lụa, voan',
    'duong-pho': 'Phong cách hiphop, quần ống rộng, áo thun oversize, cá tính, bụi bặm, street style, bomber',
    'tiec': 'Đầm dạ hội, váy dự tiệc sang trọng, quyến rũ, lộng lẫy, sexy, hở vai, xẻ tà',
    'nam-tinh': 'Thời trang nam, áo polo, sơ mi nam, quần âu, lịch lãm, mạnh mẽ, gentleman',

    // MỸ PHẨM (MỚI THÊM)
    'skincare': 'Sản phẩm chăm sóc da mặt, serum, toner, kem dưỡng ẩm, trị mụn, phục hồi da, tẩy trang, sữa rửa mặt',
    'makeup': 'Trang điểm, phấn phủ, kem nền, cushion, che khuyết điểm, kẻ mắt, mascara, má hồng',
    // 'son': 'Son môi, son kem lì, son tint, son dưỡng có màu',
    'kem-chong-nang': 'Kem chống nắng, xịt chống nắng, suncream, bảo vệ da UV'
  };

  const result = {};

  console.log("🚀 Bắt đầu tính toán Vector...");
  
  for (const [slug, prompt] of Object.entries(STYLE_PROMPTS)) {
    const output = await extractor(prompt, { pooling: 'cls', normalize: true });
    result[slug] = Array.from(output.data);
    console.log(`✅ Đã xong: ${slug}`);
  }

  // Đảm bảo thư mục tồn tại
  const dataDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const outFile = path.join(dataDir, 'style-vectors.json');
  fs.writeFileSync(outFile, JSON.stringify(result));
  console.log(`\n💾 Đã lưu vào '${outFile}'`);
}

precompute();