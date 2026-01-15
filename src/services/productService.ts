// src/services/productService.ts

// Interface cho Frontend (UI)
export interface UIProductCard {
    id: string;
    name: string;
    image: string;
    price: string;
    originalPrice: string | null;
    discount: string | null;
    sold: number;
    rating: number;
    merchant: string;
    link: string;
    label?: string;
}

const formatVND = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

// 1. HÀM HELPER: Lấy Base URL
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Nếu đang chạy ở trình duyệt -> Trả về rỗng (dùng đường dẫn tương đối)
    return '';
  }
  // Nếu đang chạy ở Server -> Trả về localhost hoặc domain thật
  // Bạn nên thêm biến NEXT_PUBLIC_APP_URL vào .env nếu deploy
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
};

export const ProductService = {
  fetchFromDB: async (type: 'bestseller' | 'mall' | 'latest', limit: number = 12, page: number = 1, style: string = ''): Promise<UIProductCard[]> => {
    try {
      // Dùng getBaseUrl() nếu chạy trên server (đã làm ở bước trước)
      const baseUrl = typeof window === 'undefined' ? (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000') : '';
      const url = `${baseUrl}/api/products?type=${type}&limit=${limit}&page=${page}&style=${style}`;
      
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) return [];
      const json = await res.json();
      const dbData = json.data || [];

      return dbData.map((item: any) => {
        // API đã trả về 'id' chuẩn dạng string rồi, cứ thế dùng
        const safeId = item.id || "undefined";

        // Logic format tiền
        const priceFmt = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price);
        const originalFmt = item.originalPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.originalPrice) : null;
        
        // Logic Discount tự tính nếu thiếu
        let discount = item.discount;
        if (!discount && item.originalPrice > item.price) {
            const percent = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
            discount = `-${percent}%`;
        }

        return {
            id: safeId,
            name: item.name,
            image: item.image,
            price: priceFmt,
            originalPrice: originalFmt,
            discount: discount,
            sold: item.sold,
            rating: item.rating,
            merchant: 'Shopee',
            link: `/products/${safeId}`, // Link nội bộ
            label: item.label
        };
      });

    } catch (error) {
      console.error("Service Error:", error);
      return [];
    }
  },
  getRelated: async (currentId: string): Promise<UIProductCard[]> => {
    try {
      const res = await fetch(`/api/products/related?id=${currentId}`, { cache: 'no-store' });
      
      if (!res.ok) return [];
      const json = await res.json();
      const dbData = json.data || [];

      // Map lại lần nữa cho chắc chắn khớp UI
      const formatVND = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

      return dbData.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          price: formatVND(item.price),
          originalPrice: item.originalPrice ? formatVND(item.originalPrice) : null,
          discount: item.discount,
          sold: item.sold,
          rating: item.rating || 5.0,
          merchant: 'Shopee',
          link: `/products/${item.id}`,
          label: item.label
      }));
    } catch (error) {
      return [];
    }
  },

  // HÀM LẤY CHI TIẾT (Tạm thời trả về null hoặc viết API riêng cho nó sau)
  getDetail: async (id: string) => {
     // Chưa xử lý vội để tránh lỗi, tập trung fix trang chủ trước
     return null;
  },
  search: async (keyword: string, limit: number = 12, page: number = 1): Promise<UIProductCard[]> => {
    try {
      const baseUrl = typeof window === 'undefined' ? (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000') : '';
      
      // Truyền thêm page vào URL
      const res = await fetch(`${baseUrl}/api/products?keyword=${encodeURIComponent(keyword)}&limit=${limit}&page=${page}`, { 
          cache: 'no-store' 
      });
      
      if (!res.ok) return [];
      const json = await res.json();
      const dbData = json.data || [];

      // Map dữ liệu (Logic giống fetchFromDB)
      return dbData.map((item: any) => {
        let imageUrl = item.image;
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `https://down-vn.img.susercontent.com/file/${imageUrl}`;
        } else if (!imageUrl) {
            imageUrl = "https://placehold.co/400x400?text=No+Image";
        }

        const formatVND = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

        let discount = item.discount;
        if (!discount && item.original_price > item.price) {
            const percent = Math.round(((item.original_price - item.price) / item.original_price) * 100);
            discount = `-${percent}%`;
        }

        return {
            id: item.id,
            name: item.name,
            image: imageUrl,
            price: formatVND(item.price),
            originalPrice: item.original_price ? formatVND(item.original_price) : null,
            discount: discount,
            sold: item.sold,
            rating: item.rating || 5.0,
            merchant: 'Shopee',
            link: `/products/${item.id}`,
            label: (item.seller_flag && JSON.stringify(item.seller_flag).includes('OFFICIAL')) ? 'Mall' : ''
        };
      });

    } catch (error) {
      console.error("Lỗi Search Product:", error);
      return [];
    }
  },
};