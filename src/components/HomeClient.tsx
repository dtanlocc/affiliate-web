// src/components/HomeClient.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, ThumbsUp, TrendingUp, BookOpen } from "lucide-react";

// Import các component con
import CouponCard from "@/components/coupons/CouponCard";
import ProductCard from "@/components/products/ProductCard";
import GroupPopup from "@/components/widgets/GroupPopup";
import ZaloWidget from "@/components/widgets/ZaloWidget";

// Import Services & Types
import { CouponService, Product } from "@/services/couponService";
import { Coupon } from "@/types/coupon";
import { BLOG_POSTS } from "@/data/blogData";

export default function HomeClient() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [goodProducts, setGoodProducts] = useState<Product[]>([]);
  const [trendProducts, setTrendProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const couponData = await CouponService.getAll(1, 4); 
      setCoupons(couponData.data || []);

        // --- CHIẾN THUẬT CẮT LÁT MỚI ---

        // 1. Mục "Sản Phẩm Tốt": Lấy 8 cái đầu tiên (Từ 0 đến 8)
        // offset = 0, limit = 8
        const goods = await CouponService.getRealProducts(0, 8, "Best Seller");
        setGoodProducts(goods);

        // 2. Mục "Trending": Lấy 8 cái TIẾP THEO (Từ 8 đến 16)
        // offset = 8, limit = 8
        // Đảm bảo 100% không trùng với mục trên
        const trends = await CouponService.getRealProducts(8, 8, "Hot Trend");
        setTrendProducts(trends);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      {/* Popup Zalo mời vào nhóm */}
      <GroupPopup />

      {/* --- SECTION 1: MÃ GIẢM GIÁ --- */}
      <section>
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-2">
             <div className="bg-red-500 p-2 rounded-lg text-white shadow-lg shadow-red-200">
                 <Flame size={24} className="fill-white"/>
             </div>
             <h2 className="text-2xl font-black text-gray-800 uppercase">Mã Giảm Giá Mới</h2>
           </div>
           <Link href="/coupons" className="text-sm font-bold text-blue-600 hover:underline">Xem tất cả</Link>
        </div>
        
        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-pulse">
                {[1,2,3,4].map(i => <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>)}
             </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Nếu có mã thì hiện, không thì hiện thông báo */}
                {coupons.length > 0 ? (
                    coupons.slice(0, 4).map(c => <CouponCard key={c.id} data={c} />)
                ) : (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded-xl border border-dashed">
                        <p className="text-gray-500">Hệ thống đang cập nhật mã mới...</p>
                    </div>
                )}
            </div>
        )}
      </section>

      {/* --- SECTION 2: SẢN PHẨM TỐT (Datafeed Shopee) --- */}
      <section>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <ThumbsUp className="text-blue-600" size={28}/>
                <div>
                    <h2 className="text-xl font-black text-gray-800 uppercase">SẢN PHẨM TỐT</h2>
                    <p className="text-xs text-gray-500">Tuyển tập hàng chính hãng từ Shopee Mall</p>
                </div>
             </div>
             <Link href="/products/top-picks" className="text-sm font-bold text-blue-600">Xem thêm</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {loading 
                ? [1,2,3,4].map(i => <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>)
                : goodProducts.map((p) => <ProductCard key={p.id} data={p as any} />)
             }
        </div>
      </section>

      {/* --- SECTION 3: TRENDING (Thời trang) --- */}
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
         <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-purple-600"/>
            <h2 className="text-2xl font-black text-gray-800 uppercase">THỜI TRANG HOT</h2>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {loading 
                ? [1,2,3,4].map(i => <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>)
                : trendProducts.map((p) => <ProductCard key={p.id} data={p as any} />)
             }
         </div>
      </section>

      {/* --- SECTION 4: WIDGET ZALO --- */}
      <ZaloWidget />

      {/* --- SECTION 5: BLOG REVIEW --- */}
      <section>
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
                          {/* Lưu ý: Dùng img thường nếu ảnh blog chưa config domain, hoặc dùng Next Image nếu đã config */}
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                      </div>
                      <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                  </div>
              ))}
          </div>
      </section>
    </div>
  );
}