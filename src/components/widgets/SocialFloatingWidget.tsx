"use client";

import { MessageCircle, Facebook, Sparkles } from "lucide-react"; // Thêm Sparkles cho đẹp
import { useState, useEffect } from "react";

export default function SocialFloatingWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div suppressHydrationWarning={true} className="fixed bottom-6 left-6 z-[100] flex flex-col gap-3 animate-in slide-in-from-left-10 duration-700">
      
      {/* Nút Facebook: Màu Xanh đậm truyền thống nhưng thêm viền Vàng */}
      <a 
        href="https://www.facebook.com/groups/737583286073750/?ref=share" 
        target="_blank" 
        rel="noreferrer"
        className="group flex items-center gap-3 bg-[#1877F2] text-white px-4 py-2.5 rounded-2xl shadow-xl hover:scale-105 hover:bg-[#166fe5] transition-all duration-300 border-2 border-yellow-300 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 opacity-20 -mr-2 -mt-2 text-yellow-300"><Sparkles size={20}/></div>
        <div className="bg-white p-1.5 rounded-xl text-[#1877F2] shadow-sm">
          <Facebook size={20} fill="currentColor" />
        </div>
        <div className="pr-1">
           <p className="text-[10px] leading-tight opacity-90 font-medium text-yellow-100">Tham gia ngay</p>
           <p className="text-[15px] font-black leading-tight tracking-tight">Group Facebook</p>
        </div>
      </a>

      {/* Nút Zalo: Đổi sang màu Đỏ Tết cho nổi bật */}
      <a 
        href="https://zalo.me/g/wydidr139" 
        target="_blank" 
        rel="noreferrer"
        className="group flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2.5 rounded-2xl shadow-xl hover:scale-105 hover:shadow-red-200 transition-all duration-300 border-2 border-yellow-300 relative overflow-hidden"
      >
        {/* Hiệu ứng lấp lánh */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent group-hover:animate-shimmer" />

        <div className="bg-white p-1.5 rounded-xl text-red-600 shadow-sm z-10">
          <MessageCircle size={20} fill="currentColor" />
        </div>
        <div className="pr-1 z-10">
           <p className="text-[10px] leading-tight opacity-90 font-medium text-yellow-100">Săn Lì Xì tại</p>
           <p className="text-[15px] font-black leading-tight tracking-tight">Nhóm Zalo VIP</p>
        </div>
      </a>
      
      <style jsx>{`
        @keyframes shimmer {
          100% { left: 125%; }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}