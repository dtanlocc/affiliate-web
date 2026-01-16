// src/components/HomeClient.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, ThumbsUp, TrendingUp, BookOpen, ChevronRight } from "lucide-react"; // Giữ nguyên import
import CouponCard from "@/components/coupons/CouponCard";
import ProductCard from "@/components/products/ProductCard";
import GroupPopup from "@/components/widgets/GroupPopup";
// import ZaloWidget from "@/components/widgets/SocialFloatingWidget";
import { CouponService } from "@/services/couponService"; 
import { Coupon } from "@/types/coupon";
import { BLOG_POSTS } from "@/data/blogData";
import { UIProductCard } from "@/services/productService"; 
import ShopeeMenu, { ShopeeMenuItem } from "@/components/layout/ShopeeMenu";

interface HomeProps {
  initialCoupons: any[]; 
  goodProducts: any[];
  trendProducts: any[];
  shopeeMenu: ShopeeMenuItem[];
}

export default function HomeClient({ goodProducts, trendProducts , shopeeMenu}: HomeProps) {
  // State riêng cho Coupon
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState(true);

  // useEffect này chỉ chạy 1 lần ở trình duyệt để lấy Coupon
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await CouponService.getAll(1, 4); 
        setCoupons(data.data || []);
      } catch (error) {
        console.error("Lỗi lấy mã:", error);
      } finally {
        setLoadingCoupons(false);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      <GroupPopup />

      

      {/* --- BANNER TẾT (THÊM MỚI ĐỂ CÓ KHÔNG KHÍ) --- */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-yellow-300 mb-8 bg-gradient-to-r from-red-700 to-orange-600">
          <div className="relative z-10 px-6 py-12 text-center text-white">
              <h1 className="text-3xl md:text-5xl font-black mb-4 drop-shadow-md text-yellow-300 uppercase">
                  Khai Xuân Như Ý - Săn Deal Hết Ý
              </h1>
              <p className="text-white/90 text-lg font-medium">
                  Rước lộc đầu năm với hàng ngàn ưu đãi độc quyền.
              </p>
              {/* Hình trang trí hoa mai đơn giản bằng CSS/Image */}
              <div className="absolute top-0 left-0 opacity-20 text-6xl select-none">🌸</div>
              <div className="absolute bottom-0 right-0 opacity-20 text-6xl select-none">🧧</div>
          </div>
      </div>

      <section className="-mt-6 relative z-20 px-4"> 
          {/* -mt-6 để nó đè nhẹ lên banner một chút tạo hiệu ứng nổi */}
          <div className="bg-white rounded-xl p-6 shadow-xl border border-red-100">
             <ShopeeMenu items={shopeeMenu} />
          </div>
      </section>
      {/* --- 1. MÃ GIẢM GIÁ (Style: Đỏ Tết) --- */}
      <section>
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-2">
             {/* Đổi màu nền icon thành Đỏ */}
             <div className="bg-red-600 p-2 rounded-lg text-yellow-300 shadow-md">
                 <Flame size={24} fill="currentColor"/>
             </div>
             <h2 className="text-2xl font-black text-gray-800 uppercase">Lì Xì (Mã Giảm Giá)</h2>
           </div>
           {/* Đổi link thành màu đỏ */}
           <Link href="/coupons" className="text-sm font-bold text-red-600 hover:underline flex items-center">
              Xem tất cả <ChevronRight size={16}/>
           </Link>
        </div>
        
        {loadingCoupons ? (
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-pulse">
                {[1,2,3,4].map(i => <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>)}
             </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {coupons.length > 0 ? (
                    coupons.map(c => <CouponCard key={c.id} data={c} />)
                ) : (
                    <div className="col-span-full text-center py-10 bg-gray-50 border border-dashed rounded-xl">
                        <p className="text-gray-500">Hệ thống đang cập nhật mã Shopee...</p>
                    </div>
                )}
            </div>
        )}
      </section>

      {/* --- 2. SẢN PHẨM TỐT (Style: Viền Đỏ + Giữ nguyên Text của bạn) --- */}
      <section>
        {/* Thêm border-red-200 để tạo không khí tết nhẹ nhàng */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6 mb-8 flex items-center justify-between">
             <div className="flex items-center gap-4">
                {/* Đổi icon thành màu đỏ */}
                <div className="bg-red-50 p-3 rounded-full">
                    <ThumbsUp className="text-red-600" size={28}/>
                </div>
                <div>
                    <h2 className="text-xl font-black text-gray-800 uppercase">Đồ Xịn Giá Xinh</h2>
                    
                    {/* --- ĐOẠN TEXT CỦA BẠN (GIỮ NGUYÊN 100%) --- */}
                    <div className="mt-2 text-xs text-gray-600 leading-relaxed bg-orange-50 p-2 rounded border border-orange-100">
                        <p>🚫 Loại bỏ hàng kém chất lượng! Mình giúp bạn lọc <span className="font-bold text-orange-500">Shopee</span> chuẩn xác.</p>
                        <p>🔍 Chỉ chọn sản phẩm từ <span className="font-bold text-red-600"> Shop Mall</span> & <span className="font-bold text-orange-500">Shop Yêu thích</span>.</p>
                        <p>✨ Yên tâm mua sắm, chọn đúng đồ xịn, giá tốt nhất! 🛍️🎯</p>
                    </div>
                    {/* ------------------------------------------- */}

                </div>
             </div>
             {/* Đổi nút xem thêm thành màu đỏ */}
             <Link href="/products/top-picks" className="text-sm font-bold text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-lg transition">
                Xem thêm
             </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {goodProducts.map((p) => <ProductCard key={p.id} data={p} />)}
        </div>
      </section>

      {/* <ZaloWidget /> */}

      {/* Blog (Style: Tiêu đề Đỏ/Xanh) */}
      {/* <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-800 uppercase flex items-center gap-2">
                <BookOpen className="text-green-600"/> BÀI VIẾT MỚI
            </h2>
            <Link href="/blog" className="text-blue-600 font-bold text-sm hover:underline">Xem tất cả</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_POSTS.map(post => (
                  <div key={post.id} className="group cursor-pointer">
                      <div className="overflow-hidden rounded-xl mb-3 aspect-video relative">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                      </div>
                      <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                  </div>
              ))}
          </div>
      </section> */}
    </div>
  );
}