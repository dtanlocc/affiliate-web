// src/components/products/ProductCard.tsx
"use client";
import { Flame, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { UIProductCard } from "@/services/productService";

const FALLBACK_IMAGE = "https://placehold.co/400x400/png?text=No+Image";

// Hàm làm gọn số lượng bán (VD: 1500 -> 1.5k)
const formatSold = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'k';
  }
  return num;
};

export default function ProductCard({ data }: { data: UIProductCard }) {
  const [imgSrc, setImgSrc] = useState(data.image);
  
  // Guard clause
  if (!data.id || data.id === "undefined") return null;

  return (
    <Link href={`/products/${data.id}`} className="block h-full">
      <div className="group bg-white rounded-xl border border-red-100 shadow-sm hover:shadow-xl hover:border-red-400 hover:shadow-red-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden relative">
        
        {/* --- 1. ẢNH SẢN PHẨM --- */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image 
              src={imgSrc} 
              alt={data.name} 
              fill 
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImgSrc(FALLBACK_IMAGE)}
              unoptimized
          />
          
          {/* Label Mall: Đỏ chữ Vàng (Màu hoàng gia) */}
          {data.label && (
            <div className="absolute top-0 left-0 bg-red-700 text-yellow-300 text-[10px] font-black px-3 py-1 rounded-br-lg shadow-md z-10 uppercase tracking-widest border-b border-r border-white/20">
               {data.label}
            </div>
          )}

          {/* Badge Giảm giá: Thiết kế giống thẻ bài treo ngày Tết */}
          {data.discount && (
            <div className="absolute top-0 right-2 z-10">
                {/* Phần dây treo giả lập */}
                <div className="w-[2px] h-2 bg-yellow-600 mx-auto opacity-50"></div> 
                <div className="w-10 h-11 bg-gradient-to-b from-red-600 to-red-700 shadow-md flex flex-col items-center justify-center rounded-b-lg border-x border-b border-yellow-400 text-white">
                  <span className="text-[9px] font-bold uppercase leading-none opacity-90">Giảm</span>
                  <span className="text-sm font-black text-yellow-200">{data.discount.replace('-','')}</span>
                </div>
            </div>
          )}
        </div>

        {/* --- 2. THÔNG TIN --- */}
        <div className="p-3 flex flex-col flex-1 bg-gradient-to-b from-white to-red-50/40">
          {/* Tên sản phẩm */}
          <h3 className="text-sm text-gray-800 line-clamp-2 mb-2 font-medium group-hover:text-red-600 transition-colors h-10 leading-snug">
            {data.name}
          </h3>

          <div className="mt-auto">
              {/* Giá tiền */}
              <div className="flex items-baseline gap-2 mb-2">
                  {/* Chỉnh lại font chữ giá cho đẹp */}
                  <span className="text-red-600 font-bold text-lg leading-none">
                    {data.price}<span className="text-xs align-top"></span> 
                    {/* (FormatVND của bạn đã có chữ đ chưa? Nếu chưa thì thêm vào) */}
                  </span>
                  {data.originalPrice && (
                    <span className="text-[10px] text-gray-400 line-through decoration-red-200">{data.originalPrice}</span>
                  )}
              </div>
              
              {/* Thanh footer card */}
              <div className="flex items-center justify-between">
                  <div className="text-[10px] text-red-600 bg-red-100/80 px-2 py-0.5 rounded-full font-bold border border-red-200">
                      Đã bán {formatSold(data.sold)}
                  </div>
                  
                  {/* Nút giỏ hàng đỏ rực */}
                  <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-2 rounded-lg hover:from-red-700 hover:to-red-600 transition shadow-lg shadow-red-200 group-hover:scale-105 active:scale-95">
                      <ShoppingCart size={16} />
                  </div>
              </div>
          </div>
        </div>
      </div>
    </Link>
  );
}