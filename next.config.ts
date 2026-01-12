// next.config.ts
import type { NextConfig } from "next";

const nextConfig = {
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
    ],
  },
};

export default nextConfig;