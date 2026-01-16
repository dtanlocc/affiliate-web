// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import SecondaryNav from "@/components/layout/SecondaryNav"; 
import dynamic from 'next/dynamic';

// 1. CHỈ dùng dynamic cho Footer (vì nó cho phép ssr: true)
const Footer = dynamic(() => import('@/components/layout/Footer'), { 
  ssr: true 
});

// 2. IMPORT TRỰC TIẾP Widget (Vì nó đã tự xử lý Client-side bên trong)
import SocialFloatingWidget from "@/components/widgets/SocialFloatingWidget";
import TetEffects from "@/components/ui/TetEffects";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', 
});

export const metadata: Metadata = {
  title: {
    default: "SanMaNhanh - Mã Giảm Giá Shopee, TikTok, Lazada Tự Động",
    template: "%s | SanMaNhanh"
  },
  description: "Hệ thống tổng hợp mã giảm giá tự động, tìm kiếm sản phẩm hot trend, đồ Idol, review chân thực.",
  openGraph: {
    title: "SanMaNhanh - Săn Sale Tự Động & Review Chất",
    description: "Cập nhật mã giảm giá Shopee/TikTok/Lazada nhanh nhất Việt Nam.",
    type: "website",
    locale: "vi_VN",
    url: "https://sanmanhanh.com",
    siteName: "SanMaNhanh",
    images: [
      {
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
        <SecondaryNav/>
        
        <main className="min-h-screen bg-slate-50 pt-8 pb-12">
            {children}
        </main>
        <TetEffects />

        {/* 3. CHÈN WIDGET VÀO ĐÂY - NÓ SẼ CHẠY MƯỢT MÀ */}
        <SocialFloatingWidget />

        <Footer />
      </body>
    </html>
  );
}