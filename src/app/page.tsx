// src/app/page.tsx
import HomeClient from "@/components/HomeClient";
import { prisma } from "@/lib/db";

// Cache trang này 1 tiếng (để update sản phẩm mới từ DB)
export const revalidate = 3600; 

// Hàm chuẩn hóa sản phẩm (Giữ nguyên)
const normalizeProduct = (p: any) => {
    let imageUrl = p.image;
    if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `https://down-vn.img.susercontent.com/file/${imageUrl}`;
    }

    let discount = p.discount_text;
    const priceNum = Number(p.price);
    const originalPriceNum = p.original_price ? Number(p.original_price) : 0;
    if (!discount && originalPriceNum > priceNum) {
        discount = `-${Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)}%`;
    }

    return {
        id: p.itemid.toString(),
        name: p.name,
        image: imageUrl || "https://placehold.co/400?text=NoImage",
        price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceNum),
        originalPrice: originalPriceNum ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPriceNum) : null,
        discount: discount,
        sold: p.sold_count_value,
        rating: p.rating_value || 5.0,
        merchant: 'Shopee',
        label: p.seller_flag?.name === 'OFFICIAL_SHOP' ? 'Mall' : '',
        link: `/products/${p.itemid.toString()}`
    };
};

export default async function Page() {
  // 1. KHÔNG GỌI COUPON Ở SERVER NỮA (Để Client lo)
  
  // 2. LẤY SẢN PHẨM TỐT (Từ Database)
  const bestSellers = await prisma.product.findMany({
    take: 8,
    orderBy: { sold_count_value: 'desc' },
    where: { status: 1 }
  });
  const goodProducts = bestSellers.map(normalizeProduct);

  // 3. LẤY TRENDING (Từ Database)
  const latest = await prisma.product.findMany({
    take: 8,
    orderBy: { first_seen: 'desc' },
    where: { status: 1 }
  });
  const trendProducts = latest.map(normalizeProduct);

  return (
    <HomeClient 
        initialCoupons={[]} // Truyền rỗng, Client sẽ tự fetch
        goodProducts={goodProducts} 
        trendProducts={trendProducts} 
    />
  );
}