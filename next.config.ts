// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'content.accesstrade.vn',
      },
      {
        protocol: 'https',
        hostname: 'salt.tikicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'cf.shopee.vn',
      },
      {
        protocol: 'https',
        hostname: 'down-vn.img.susercontent.com', // Domain ảnh mới của Shopee
      },
      {
        protocol: 'https',
        hostname: 'lzd-img-global.slatic.net', // Domain ảnh Lazada
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Domain cho ảnh fallback
      },
      { protocol: "https", hostname: "**.shopee.vn" },
      { protocol: "https", hostname: "cf.shopee.vn" },
      { protocol: "https", hostname: "down-vn.img.susercontent.com" },
      { protocol: "https", hostname: "**.tiktokcdn.com" },
      { protocol: "https", hostname: "**.lazada.vn" },
      { protocol: "https", hostname: "**.tikicdn.com" },
      { hostname: 'images.unsplash.com' },
      { hostname: 'down-vn.img.susercontent.com' },
      { hostname: 'cf.shopee.vn' },
      { hostname: 'content.accesstrade.vn' },
      { hostname: 'static.accesstrade.vn' },
      { hostname: 'api.qrserver.com' },
    ],
    // Cache ảnh lâu hơn để giảm tải server
    minimumCacheTTL: 60 * 60 * 24, // 24 giờ
  },
  // Tắt strict mode nếu component React 19 gây render 2 lần khó chịu khi dev
  reactStrictMode: false, 
};

export default nextConfig;