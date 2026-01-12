// src/services/couponService.ts
import { Coupon } from "@/types/coupon";

export interface Product {
    id: string;
    image: string;
    name: string;
    price: string;
    originalPrice: string;
    discount: string;
    sold: string;
    merchant: string;
    link: string;
    label?: string; // Thêm trường này
}

const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const cleanName = (name: string) => {
    return name
        .replace(/\[.*?\]/g, '')
        .replace(/^\s*[-|/:]+\s*/, '')
        .replace(/chính hãng/gi, '')
        .trim();
};

export const CouponService = {
  
  getAll: async (page: number = 1, limit: number = 20, merchant: string = ''): Promise<{ data: Coupon[], total: number }> => {
    try {
      const res = await fetch(`/api/accesstrade?type=coupon&page=${page}&limit=${limit}&merchant=${merchant}`, { 
          cache: 'no-store' 
      });
      
      if (!res.ok) return { data: [], total: 0 };
      const json = await res.json();
      
      const rawList = json.data || [];
      const totalCount = json.total || 0;

      const coupons = rawList.map((item: any) => {
        // 1. Lấy mã code (API mới trả về mảng coupons)
        let code = "LẤY NGAY";
        if (item.coupons && item.coupons.length > 0) {
            code = item.coupons[0].coupon_code;
        }

        // 2. Tính % giảm giá
        // API mới trả về discount_percentage hoặc discount_value
        let percentLabel = "HOT";
        if (item.discount_percentage > 0) {
            percentLabel = `Giảm ${Math.round(item.discount_percentage)}%`;
        } else if (item.discount_value > 0) {
            percentLabel = `Giảm ${item.discount_value / 1000}K`;
        } else if (item.name.toLowerCase().includes('freeship')) {
            percentLabel = "FREESHIP";
        }

        return {
            id: item.id || Math.random().toString(),
            title: item.name,
            merchant: item.merchant, // shopee, tikivn...
            code: code,
            percent: percentLabel,
            used: item.percentage_used || 0, // API mới có trường này (quá ngon)
            // Ảnh API mới nằm ở field 'image'
            imageUrl: item.image || "https://placehold.co/400x400?text=Coupon",
            link: item.prod_link || item.link, // prod_link là affiliate link
            endDate: item.end_time || "",
            tags: []
        };
      });

      return { data: coupons, total: totalCount };

    } catch (e) { 
        return { data: [], total: 0 }; 
    }
  },


  // SỬA: Thêm tham số 'label' vào hàm
  getRealProducts: async (offset: number = 0, limit: number = 8, label: string = ''): Promise<Product[]> => {
    try {
        // Gọi API lấy cục to (60 cái)
        const res = await fetch(`/api/accesstrade?type=product`);
        
        if (!res.ok) return [];
        const json = await res.json();
        const rawList = json.data || [];

        // --- CHIẾN THUẬT CẮT LÁT (SLICING) ---
        // Lấy từ vị trí 'offset' một lượng 'limit' sản phẩm
        // Ví dụ: offset=0 lấy 8 cái đầu. offset=8 lấy 8 cái sau.
        const slicedList = rawList.slice(offset, offset + limit);

        return slicedList.map((item: any) => {
            const price = Number(item.price);
            
            // Logic tạo số giả lập (Giữ nguyên như bài trước để data đẹp)
            const seed = item.product_id ? item.product_id.charCodeAt(item.product_id.length - 1) : 50;
            const randomPercent = (seed % 35) + 10; 
            const originalPriceNum = price * (1 + randomPercent / 100);
            const soldRaw = (seed * 123) % 5000 + 50;
            const soldStr = soldRaw > 1000 ? `${(soldRaw/1000).toFixed(1)}k` : `${soldRaw}`;

            return {
                id: item.product_id,
                name: cleanName(item.name),
                image: item.image || item.img_url || "https://placehold.co/400x400?text=No+Image",
                price: formatVND(price),
                originalPrice: formatVND(originalPriceNum),
                discount: `${randomPercent}%`,
                sold: soldStr,
                merchant: 'shopee',
                link: item.aff_link,
                label: label 
            };
        });

    } catch (error) {
        console.error("Lỗi service:", error);
        return [];
    }
  }
};