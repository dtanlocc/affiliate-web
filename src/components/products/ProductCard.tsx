"use client";

import { Flame, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react"; // 1. Import thêm useState, useEffect

interface ProductProps {
  image: string;
  name: string;
  price: string;
  discount: string;
  sold: number;
  label?: string; 
}

// Ảnh dự phòng (Nên dùng link ổn định hoặc ảnh trong thư mục public của bạn)
const FALLBACK_IMAGE = "https://placehold.co/400x400/png?text=No+Image";

export default function ProductCard({ data }: { data: ProductProps }) {
  // 2. Tạo state để lưu link ảnh đang hiển thị
  const [imgSrc, setImgSrc] = useState(data.image);

  // 3. Khi dữ liệu đầu vào (data.image) thay đổi, cập nhật lại state
  useEffect(() => {
    setImgSrc(data.image);
  }, [data.image]);

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden relative">
      
      {/* Phần Ảnh */}
      <div className="relative aspect-square bg-gray-200 overflow-hidden">
        <Image 
            src={imgSrc} // 4. Dùng state thay vì dùng trực tiếp data.image
            alt={data.name} 
            fill 
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            
            // 5. BẮT SỰ KIỆN LỖI TẠI ĐÂY
            onError={() => {
                setImgSrc(FALLBACK_IMAGE); // Nếu lỗi -> Đổi sang ảnh No Image ngay lập tức
            }}
            
            // 6. Mẹo nhỏ: Nếu ảnh lỗi quá nặng khiến Server Next.js bị crash, 
            // thêm dòng này để bỏ qua tối ưu hóa server (dùng ảnh gốc trực tiếp)
            // unoptimized={true} 
        />
        
        {/* Label góc trái */}
        {data.label && (
          <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-md flex items-center gap-1 z-10">
             <Flame size={10} className="fill-white"/> {data.label}
          </div>
        )}

        {/* Badge Giảm giá */}
        <div className="absolute top-2 right-2 bg-yellow-400 text-blue-900 text-xs font-black px-1.5 py-1 rounded shadow-sm z-10">
          -{data.discount}
        </div>
      </div>

      {/* Phần Thông tin (Giữ nguyên) */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm text-gray-700 line-clamp-2 mb-2 font-medium group-hover:text-blue-600 transition-colors h-10 leading-snug">
          {data.name}
        </h3>

        <div className="mt-auto">
            <div className="flex items-end gap-2 mb-3">
                <p className="text-red-600 font-bold text-lg leading-none">{data.price}</p>
                <p className="text-[10px] text-gray-400 line-through decoration-gray-300">500.000đ</p>
            </div>
            
            <div className="flex items-center justify-between">
                <div className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                    Đã bán {data.sold}
                </div>
                <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition shadow-blue-200 shadow-md group-hover:scale-105 active:scale-95">
                    <ShoppingCart size={16} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}