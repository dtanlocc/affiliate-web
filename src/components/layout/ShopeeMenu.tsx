"use client";

import Link from "next/link";
import Image from "next/image";

// Định nghĩa kiểu dữ liệu cho Menu
export interface ShopeeMenuItem {
  id: number;
  title: string;
  image: string;
  url: string;
}

export default function ShopeeMenu({ items }: { items: ShopeeMenuItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    // BỎ class bg-white, border, shadow ở đây đi. Chỉ giữ lại grid.
    <div className="w-full"> 
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
        {items.map((item) => (
          <a 
            key={item.id} 
            href={item.url}
            target="_blank" 
            rel="nofollow noreferrer"
            className="flex flex-col items-center gap-2 group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
          >
            {/* Ảnh Icon */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border border-gray-100 bg-white">
                <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-contain p-1" 
                    sizes="100px"
                    unoptimized 
                />
            </div>
            
            {/* Tên Menu */}
            <span className="text-[10px] md:text-xs font-bold text-gray-600 text-center leading-tight group-hover:text-red-600 transition-colors px-1 h-8 flex items-center justify-center">
                {item.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}