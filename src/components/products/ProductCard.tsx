// src/components/products/ProductCard.tsx
"use client";
import { Flame, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { UIProductCard } from "@/services/productService";

const FALLBACK_IMAGE = "https://placehold.co/400x400/png?text=No+Image";

export default function ProductCard({ data }: { data: UIProductCard }) {
  const [imgSrc, setImgSrc] = useState(data.image);

  // BẢO VỆ: Kiểm tra ID
  if (!data.id || data.id === "undefined" || data.id === "0") {
    return null; // Không hiển thị card lỗi
  }

  return (
    <Link href={`/products/${data.id}`} className="block h-full">
      <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden relative">
        
        {/* ... (Phần nội dung bên trong giữ nguyên) ... */}
        <div className="relative aspect-square bg-gray-200 overflow-hidden">
             <Image 
                  src={imgSrc}
                  alt={data.name} 
                  fill 
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={() => setImgSrc(FALLBACK_IMAGE)}
                  unoptimized={true}
              />
              {/* ... Badges ... */}
        </div>

        <div className="p-3 flex flex-col flex-1">
             <h3 className="text-sm text-gray-700 line-clamp-2 mb-2 font-medium group-hover:text-blue-600 transition-colors h-10 leading-snug">
                {data.name}
             </h3>
             <div className="mt-auto">
                <div className="flex items-end gap-2 mb-3">
                    <p className="text-red-600 font-bold text-lg leading-none">{data.price}</p>
                    {/* ... */}
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        Đã bán {data.sold}
                    </div>
                    <div className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition shadow-blue-200 shadow-md">
                        <ShoppingCart size={16} />
                    </div>
                </div>
             </div>
        </div>

      </div>
    </Link>
  );
}