"use client";

import { MessageCircle, Facebook, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function SocialFloatingWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Kỹ thuật Senior: Chỉ xác nhận đã mounted sau khi render lần đầu ở Client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Nếu chưa mounted (đang ở bước Hydration), trả về null để tránh lệch HTML
  if (!mounted || !isOpen) return null;

  return (
    <div suppressHydrationWarning={true} className="fixed bottom-6 left-6 z-[100] flex flex-col gap-3 animate-in slide-in-from-left-10 duration-700">
      
      {/* Nút Facebook Group - Luôn hiện */}
      <a 
        href="https://www.facebook.com/groups/737583286073750/?ref=share" 
        target="_blank" 
        rel="noreferrer"
        className="group flex items-center gap-3 bg-[#1877F2] text-white px-4 py-2.5 rounded-2xl shadow-xl hover:scale-105 hover:bg-[#166fe5] transition-all duration-300 border border-white/10"
      >
        <div className="bg-white p-1.5 rounded-xl text-[#1877F2] shadow-sm">
          <Facebook size={20} fill="currentColor" />
        </div>
        <div className="pr-1">
           <p className="text-[10px] leading-tight opacity-90 font-medium">Tham gia cộng đồng</p>
           <p className="text-[15px] font-black leading-tight tracking-tight">Group Facebook</p>
        </div>
      </a>

      {/* Nút Zalo Group - Luôn hiện */}
      <a 
        href="https://zalo.me/g/wydidr139" 
        target="_blank" 
        rel="noreferrer"
        className="group flex items-center gap-3 bg-[#0068FF] text-white px-4 py-2.5 rounded-2xl shadow-xl hover:scale-105 hover:bg-[#005ae0] transition-all duration-300 border border-white/10"
      >
        <div className="bg-white p-1.5 rounded-xl text-[#0068FF] shadow-sm">
          <MessageCircle size={20} fill="currentColor" />
        </div>
        <div className="pr-1">
           <p className="text-[10px] leading-tight opacity-90 font-medium">Săn mã nhanh qua</p>
           <p className="text-[15px] font-black leading-tight tracking-tight">Nhóm Zalo</p>
        </div>
      </a>
      
    </div>
  );
}