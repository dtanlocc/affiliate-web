// src/types/coupon.ts
export type Platform = 'shopee' | 'tiktok' | 'lazada' | 'tiki';

export interface Coupon {
  id: string;
  title: string;
  merchant: Platform;
  code: string;
  percent?: string;       // VD: "50%", "15K"
  minSpend?: string;      // VD: "Đơn từ 150K"
  used: number;           // % đã sử dụng (để tạo thanh progress bar)
  imageUrl: string;
  link: string;
  endDate: string;
  tags?: string[];        // VD: ["Hoàn xu", "Freeship"]
}