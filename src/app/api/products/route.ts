import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { pipeline } from '@xenova/transformers';

// =========================================================
// 1. NẠP VECTOR TĨNH (OPTIMIZATION)
// =========================================================
let PRECOMPUTED_VECTORS: Record<string, number[]> = {};
try {
    PRECOMPUTED_VECTORS = require('@/data/style-vectors.json');
    console.log("✅ API: Đã nạp Vector Tĩnh.");
} catch (e) {
    console.log("⚠️ API: Chưa có file vector tĩnh. Sẽ dùng AI Realtime.");
}

// =========================================================
// 2. CẤU HÌNH AI & CACHE
// =========================================================
let extractor: any = null;
const RUNTIME_CACHE: Record<string, number[]> = {};

async function getExtractor() {
    if (!extractor) {
        console.log("⏳ API: Đang load model BGE-M3...");
        extractor = await pipeline('feature-extraction', 'Xenova/bge-m3', { quantized: true });
    }
    return extractor;
}

// Map Style -> Mô tả (Dùng khi fallback hoặc tìm kiếm lạ)
const STYLE_PROMPTS: Record<string, string> = {
    'tong-tai': 'Phong cách công sở nữ, vest blazer thanh lịch, sang trọng, nữ doanh nhân, quyền lực, quần tây',
    'nang-tho': 'Váy đầm xòe, phong cách vintage, nhẹ nhàng, hoa nhí, tiểu thư, dịu dàng, lụa, voan',
    'duong-pho': 'Phong cách hiphop, quần ống rộng, áo thun oversize, cá tính, bụi bặm, street style, bomber',
    'tiec': 'Đầm dạ hội, váy dự tiệc sang trọng, quyến rũ, lộng lẫy, sexy, hở vai, xẻ tà',
    'nam-tinh': 'Thời trang nam, áo polo, sơ mi nam, quần âu, lịch lãm, mạnh mẽ',
    'skincare': 'Sản phẩm chăm sóc da mặt, serum, toner, kem dưỡng ẩm, trị mụn, phục hồi da',
    'makeup': 'Trang điểm, phấn phủ, kem nền, cushion, che khuyết điểm, kẻ mắt, mascara',
    // 'son': 'Son môi, son kem lì, son tint, son dưỡng có màu',
    'kem-chong-nang': 'Kem chống nắng, xịt chống nắng, suncream, bảo vệ da UV'
};

// =========================================================
// 3. CẤU HÌNH BỘ LỌC CỨNG (HARD FILTERS)
// =========================================================
const GENDER_FILTERS = {
    FEMALE: { mustInclude: ['nữ', 'váy', 'đầm', 'yếm', 'girl', 'women', 'bà'], mustExclude: ['nam', 'men', 'boy', 'trai', 'ông'] },
    MALE: { mustInclude: ['nam', 'men', 'boy', 'trai', 'ông'], mustExclude: ['nữ', 'váy', 'đầm', 'yếm', 'girl', 'women', 'bà', 'thun nữ'] }
};

interface StyleRule {
    mustInclude?: string[];
    mustExclude?: string[];
}

const STYLE_RULES: Record<string, StyleRule> = {
    'nang-tho': { ...GENDER_FILTERS.FEMALE },
    'tiec': { ...GENDER_FILTERS.FEMALE },
    'tong-tai': { mustInclude: ['nữ', 'blazer', 'vest'], mustExclude: ['nam', 'đồ ngủ'] },
    'nam-tinh': { ...GENDER_FILTERS.MALE },
    'duong-pho': { mustExclude: ['đồ lót', 'trẻ em', 'váy ngủ'] },
    'skincare': { mustExclude: ['áo', 'quần', 'giày', 'túi'] }, // Tránh nhầm thời trang
    'makeup': { mustExclude: ['áo', 'quần'] },
    // 'son': { mustInclude: ['son'], mustExclude: ['áo', 'quần'] },
    'kem-chong-nang': { mustInclude: ['chống nắng'], mustExclude: ['áo'] } // Tránh áo chống nắng
};

// =========================================================
// 4. MAIN HANDLER
// =========================================================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); 
    const style = searchParams.get("style");
    const keyword = searchParams.get("keyword") || searchParams.get("q");
    
    const limit = parseInt(searchParams.get("limit") || "12");
    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;

    const tableName = '"Product"'; 
    let products: any[] = [];

    // --- TRƯỜNG HỢP A: TÌM KIẾM AI (HYBRID SEARCH) ---
    if (style || keyword) {
        let queryVector: number[] = [];
        let filterSql = `embedding IS NOT NULL`; // Điều kiện cơ bản

        // 1. ÁP DỤNG BỘ LỌC CỨNG (SQL)
        if (style && STYLE_RULES[style]) {
            const rule = STYLE_RULES[style];
            if (rule.mustInclude?.length) {
                const inc = rule.mustInclude.map(w => `name ILIKE '%${w}%'`).join(' OR ');
                filterSql += ` AND (${inc})`;
            }
            if (rule.mustExclude?.length) {
                const exc = rule.mustExclude.map(w => `name NOT ILIKE '%${w}%'`).join(' AND ');
                filterSql += ` AND (${exc})`;
            }
        }

        // 2. LẤY VECTOR (Ưu tiên File Tĩnh -> Cache -> AI Realtime)
        if (style && PRECOMPUTED_VECTORS[style]) {
            queryVector = PRECOMPUTED_VECTORS[style];
        } else if (keyword && RUNTIME_CACHE[keyword]) {
            queryVector = RUNTIME_CACHE[keyword];
        } else {
            // Tính toán mới
            let searchPhrase = keyword;
            if (style && STYLE_PROMPTS[style]) searchPhrase = STYLE_PROMPTS[style];
            else if (style) searchPhrase = style.replace(/-/g, ' ');

            if (!searchPhrase) return NextResponse.json({ data: [] });

            const model = await getExtractor();
            const output = await model(searchPhrase, { pooling: 'cls', normalize: true });
            queryVector = Array.from(output.data);
            
            if (keyword) RUNTIME_CACHE[keyword] = queryVector;
        }

        // 3. THỰC HIỆN QUERY
        products = await prisma.$queryRawUnsafe(`
            SELECT 
                itemid::text, shopid::text, name, image, price, "original_price", "discount_text", 
                "sold_count_value", "rating_value", "seller_flag", "affiliate_link",
                (1 - (embedding <=> $1::vector)) as score
            FROM ${tableName}
            WHERE ${filterSql}
            ORDER BY score DESC
            LIMIT ${limit} OFFSET ${offset};
        `, JSON.stringify(queryVector));
    } 
    
    // --- TRƯỜNG HỢP B: LẤY DANH SÁCH THƯỜNG ---
    else {
        const queryOptions: any = {
            take: limit,
            skip: offset,
        };

        if (type === "bestseller") {
            queryOptions.orderBy = { sold_count_value: 'desc' };
        } else if (type === "mall") {
            queryOptions.orderBy = [{ rating_value: 'desc' }, { sold_count_value: 'desc' }];
        } else {
            queryOptions.orderBy = { updated_at: 'desc' };
        }

        products = await prisma.product.findMany(queryOptions);
    }

    // --- MAPPING DATA ---
    const safeData = products.map((p: any) => {
        const strId = p.itemid ? p.itemid.toString() : "0";
        
        let imageUrl = p.image;
        try {
            if (p.image && p.image.startsWith('[')) {
               const imgs = JSON.parse(p.image);
               if (Array.isArray(imgs) && imgs.length > 0) imageUrl = imgs[0];
            }
        } catch(e) {}
        if (imageUrl && !imageUrl.startsWith('http')) {
             imageUrl = `https://down-vn.img.susercontent.com/file/${imageUrl}`;
        }

        let discount = p.discount_text;
        const priceNum = Number(p.price);
        const originalPriceNum = p.original_price ? Number(p.original_price) : 0;
        if (!discount && originalPriceNum > priceNum) {
            const percent = Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100);
            discount = `-${percent}%`;
        }

        let label = '';
        try {
            const flagStr = typeof p.seller_flag === 'string' ? p.seller_flag : JSON.stringify(p.seller_flag);
            if (flagStr && flagStr.includes('OFFICIAL')) label = 'Mall';
        } catch (e) {}

        return {
            id: strId,
            itemid: strId,
            shopid: p.shopid ? p.shopid.toString() : "",
            name: p.name,
            image: imageUrl || "https://placehold.co/400?text=NoImage",
            price: priceNum,
            originalPrice: originalPriceNum || null,
            discount: discount,
            sold: p.sold_count_value || p.sold || 0,
            rating: p.rating_value || p.rating || 5.0,
            link: `/products/${strId}`, 
            affiliate_link: p.affiliate_link,
            label: label
        };
    });

    return NextResponse.json({ data: safeData });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}