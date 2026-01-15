// src/components/HomeClient.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, ThumbsUp, TrendingUp, BookOpen } from "lucide-react";
import CouponCard from "@/components/coupons/CouponCard";
import ProductCard from "@/components/products/ProductCard";
import GroupPopup from "@/components/widgets/GroupPopup";
// import ZaloWidget from "@/components/widgets/SocialFloatingWidget";
import { CouponService } from "@/services/couponService"; // Import Service
import { Coupon } from "@/types/coupon";
import { BLOG_POSTS } from "@/data/blogData";

interface HomeProps {
  initialCoupons: any[]; // Có thể không dùng, nhưng giữ để interface chuẩn
  goodProducts: any[];
  trendProducts: any[];
}

export default function HomeClient({ goodProducts, trendProducts }: HomeProps) {
  // State riêng cho Coupon
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState(true);

  // useEffect này chỉ chạy 1 lần ở trình duyệt để lấy Coupon
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        // Gọi Service (Service này sẽ gọi vào /api/accesstrade/route.ts mà mình đã fix ngon lành)
        // Lấy 4 mã Shopee
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

      {/* --- 1. MÃ GIẢM GIÁ (CLIENT FETCH) --- */}
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

      {/* --- 2. SẢN PHẨM TỐT (SERVER DATA - CÓ SẴN) --- */}
      <section>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <ThumbsUp className="text-blue-600" size={28}/>
                <div>
                    <h2 className="text-xl font-black text-gray-800 uppercase">Đồ Xịn Giá Xinh</h2>
                    {/* <p className="text-xs text-gray-500">Tạm biệt hàng kém chất lượng shopee! Mua sắm an tâm với list đồ Mall & Yêu thích đã qua lọc kỹ. 💎🛍️</p> */}
                    {/* <p className="text-xs text-gray-500">🚫 Ghét hàng "rác"? Để mình lọc Shopee thay bạn! 🔍 Chỉ tuyển cực phẩm Mall & Yêu thích đã qua "đãi cát tìm vàng".
                      <br /> ✨ Mua đúng đồ - đúng giá - đúng chất lượng. Yên tâm chốt đơn! 🧺🎯</p> */}

                      {/* <p className="text-xs text-gray-600 leading-relaxed">
                        🚫 Ghét hàng kém chất lượng? Để mình lọc <span className="font-bold text-orange-500">Shopee</span> thay bạn! <br />
                        🔍 Chỉ tuyển đồ <span className="font-bold text-red-600">Mall</span> & <span className="font-bold text-orange-500">Yêu thích +</span> cực xịn. <br />
                        ✨ Mua đúng đồ, đúng giá, an tâm chốt đơn nha! 🧺🎯
                      </p> */}


                      <p className="text-xs text-gray-600 leading-relaxed">
                        🚫 Loại bỏ hàng kém chất lượng! Mình giúp bạn lọc <span className="font-bold text-orange-500">Shopee</span> chuẩn xác. <br />
                        🔍 Chỉ chọn sản phẩm từ <span className="font-bold text-red-600"> Shop Mall</span> & <span className="font-bold text-orange-500">Shop Yêu thích</span>. <br />
                        ✨ Yên tâm mua sắm, chọn đúng đồ xịn, giá tốt nhất! 🛍️🎯
                      </p>
                </div>
             </div>
             <Link href="/products/top-picks" className="text-sm font-bold text-blue-600">Xem thêm</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {/* Dữ liệu goodProducts đã có sẵn từ Server, hiển thị ngay lập tức */}
             {goodProducts.map((p) => <ProductCard key={p.id} data={p} />)}
        </div>
      </section>


      {/* <ZaloWidget /> */}

      {/* Blog */}
      <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-800 uppercase flex items-center gap-2"><BookOpen className="text-green-600"/> BÀI VIẾT MỚI</h2>
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
      </section>
    </div>
  );
}