import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !/^\d+$/.test(id)) return NextResponse.json({ data: [] });

    const bigIntId = BigInt(id);

    // 1. Lấy thông tin sản phẩm hiện tại
    // (Lấy cả embedding để so sánh Vector nếu có)
    const currentProducts: any[] = await prisma.$queryRaw`
        SELECT itemid, name, price, embedding::text 
        FROM "Product" 
        WHERE itemid = ${bigIntId} 
        LIMIT 1
    `;
    const currentProduct = currentProducts[0];

    if (!currentProduct) return NextResponse.json({ data: [] });

    let relatedProducts: any[] = [];

    // 2. CHIẾN THUẬT TÌM KIẾM
    // ƯU TIÊN 1: Nếu có Vector AI -> Dùng AI tìm (Chính xác nhất)
    if (currentProduct.embedding) {
        relatedProducts = await prisma.$queryRaw`
            SELECT 
                itemid, name, image, price, "original_price", "discount_text", 
                "sold_count_value", "rating_value", "seller_flag", "affiliate_link", shopid
            FROM "Product"
            WHERE itemid != ${bigIntId} AND status = 1
            ORDER BY embedding <=> ${currentProduct.embedding}::vector
            LIMIT 8;
        `;
    } 
    
    // ƯU TIÊN 2: Nếu chưa có AI -> Dùng SQL thường (Tìm theo khoảng giá & Shop)
    if (relatedProducts.length === 0) {
        const minPrice = Number(currentProduct.price) * 0.7;
        const maxPrice = Number(currentProduct.price) * 1.3;
        
        relatedProducts = await prisma.product.findMany({
            take: 8,
            where: {
                itemid: { not: bigIntId },
                status: 1,
                price: { gte: minPrice, lte: maxPrice }, // Giá sàn sàn nhau
            },
            orderBy: { sold_count_value: 'desc' }
        });
    }

    // 3. Map dữ liệu trả về
    const safeData = relatedProducts.map((p: any) => {
        let imageUrl = p.image;
        if (!imageUrl.startsWith('http')) imageUrl = `https://down-vn.img.susercontent.com/file/${imageUrl}`;

        return {
            id: p.itemid.toString(),
            name: p.name,
            price: Number(p.price),
            image: imageUrl,
            originalPrice: p.original_price ? Number(p.original_price) : null,
            discount: p.discount_text,
            sold: p.sold_count_value,
            rating: p.rating_value,
            link: p.affiliate_link || `/products/${p.itemid.toString()}`,
            label: (p.seller_flag && JSON.stringify(p.seller_flag).includes('OFFICIAL')) ? 'Mall' : ''
        };
    });

    return NextResponse.json({ data: safeData });

  } catch (error: any) {
    console.error("Related API Error:", error);
    return NextResponse.json({ data: [] }); // Trả về rỗng thay vì lỗi 500
  }
}