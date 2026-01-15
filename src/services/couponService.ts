export const CouponService = {
  getAll: async (page: number = 1, limit: number = 40) => {
    try {
      const res = await fetch(`/api/accesstrade?page=${page}&limit=${limit}`);
      const json = await res.json();
      const rawList = json.data || [];

      return {
        data: rawList.map((item: any) => {
          // 1. Lấy mã code chính xác
          const code = item.coupons?.[0]?.coupon_code || "LẤY NGAY";

          // 2. Logic nhãn (Label) dựa trên keywords bạn vừa tìm được
          let label = "HOT";
          const keywords = item.keyword || [];
          if (keywords.some((k: string) => k.toLowerCase().includes('freeshipping'))) {
            label = "FREESHIP";
          } else if (item.discount_percentage > 0) {
            label = `Giảm ${item.discount_percentage}%`;
          } else if (item.discount_value > 0) {
            label = `Giảm ${item.discount_value / 1000}K`;
          }

          return {
            id: item.id,
            title: item.name,
            merchant: 'shopee',
            code: code,
            percent: label,
            // aff_link là trường hái ra tiền mà bạn vừa debug được
            link: item.aff_link, 
            imageUrl: item.image,
            endDate: item.end_time || "Chưa xác định",
            // Lấy điều kiện dùng mã từ coupon_desc
            minSpend: item.coupons?.[0]?.coupon_desc || "Mọi đơn hàng",
            description: item.content
          };
        }),
        total: json.total || 0
      };
    } catch (e) {
      return { data: [], total: 0 };
    }
  }
};