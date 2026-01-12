// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import SecondaryNav from "@/components/layout/SecondaryNav"; 
import dynamic from 'next/dynamic';

// Lazy load Footer để web tải nhanh hơn
const Footer = dynamic(() => import('@/components/layout/Footer'), { 
  ssr: true 
});

// Tối ưu Font chữ, display swap để hiện chữ ngay lập tức
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', 
});

// --- CẤU HÌNH SEO (QUAN TRỌNG) ---
export const metadata: Metadata = {
  // Tiêu đề trang
  title: {
    default: "SanMaNhanh - Mã Giảm Giá Shopee, TikTok, Lazada Tự Động",
    template: "%s | SanMaNhanh" // Các trang con sẽ tự điền vào %s (VD: Blog | SanMaNhanh)
  },
  description: "Hệ thống tổng hợp mã giảm giá tự động, tìm kiếm sản phẩm hot trend, đồ Idol, review chân thực.",
  
  // Cấu hình khi share lên Facebook/Zalo
  openGraph: {
    title: "SanMaNhanh - Săn Sale Tự Động & Review Chất",
    description: "Cập nhật mã giảm giá Shopee/TikTok/Lazada nhanh nhất Việt Nam.",
    type: "website",
    locale: "vi_VN",
    url: "https://sanmanhanh.com",
    siteName: "SanMaNhanh",
    images: [
      {
        // Ảnh đại diện khi share (Tạm dùng ảnh placeholder, sau này thay ảnh thật của web)
        url: "https://placehold.co/1200x630/0052cc/ffffff?text=SAN+MA+NHANH", 
        width: 1200,
        height: 630,
        alt: "SanMaNhanh Banner",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header/>
        <SecondaryNav/> {/* Thanh điều hướng phụ */}
        
        {/* Main Content với padding chuẩn */}
        <main className="min-h-screen bg-slate-50 pt-8 pb-12">
            {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}