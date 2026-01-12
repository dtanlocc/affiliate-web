"use client";
// SỬA LẠI DÒNG IMPORT NÀY:
import { Smartphone, Shirt, Baby, Home, Zap, Sparkles, BookOpen, Bike } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { id: 'all', name: 'Tất cả', icon: Zap },
  { id: 'tech', name: 'Điện tử', icon: Smartphone },
  { id: 'beauty', name: 'Làm đẹp', icon: Sparkles }, // Đổi icon ở đây
  { id: 'fashion', name: 'Thời trang', icon: Shirt },
  { id: 'mom', name: 'Mẹ & Bé', icon: Baby },
  { id: 'home', name: 'Nhà cửa', icon: Home },
  { id: 'book', name: 'Sách', icon: BookOpen },
  { id: 'life', name: 'Đời sống', icon: Bike },
];

export default function CategoryFilter() {
  const [active, setActive] = useState('all');

  return (
    <div className="bg-white border-b border-gray-100 sticky top-[6.5rem] md:top-[7.5rem] z-30 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto py-4 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button 
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer transition-all duration-200 ${isActive ? '-translate-y-1' : ''}`}
              >
                {/* Icon Container */}
                <div className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm
                  ${isActive 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-300 shadow-md scale-110' 
                    : 'bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 group-hover:shadow-sm'}
                `}>
                  <cat.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                {/* Text Label */}
                <span className={`
                  text-[11px] md:text-xs font-semibold whitespace-nowrap transition-colors
                  ${isActive ? 'text-blue-700' : 'text-gray-500 group-hover:text-blue-600'}
                `}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}