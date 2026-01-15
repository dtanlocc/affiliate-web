"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle, Facebook, ArrowRight, Sparkles, Users } from "lucide-react";

export default function GroupPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // CẤU HÌNH THỜI GIAN CHỜ (5 phút)
  const COOLDOWN_TIME = 5 * 60 * 1000; 

  useEffect(() => {
    const lastClosedTime = localStorage.getItem("popupLastClosedTime");
    const now = Date.now();

    if (!lastClosedTime || (now - parseInt(lastClosedTime)) > COOLDOWN_TIME) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("popupLastClosedTime", Date.now().toString());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Nút đóng góc trên */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 bg-gray-100 p-1.5 rounded-full text-gray-500 hover:bg-red-500 hover:text-white transition-all z-20"
        >
          <X size={18} />
        </button>

        {/* Header với Gradient mượt hơn */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
             <Users size={120} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
               <Sparkles size={12} /> Cộng đồng săn deal
            </div>
            <h3 className="text-2xl font-black uppercase mb-1 tracking-tight">Gia Nhập Nhóm VIP</h3>
            <p className="text-blue-100 text-sm font-medium">Nhận mã giảm giá 1 Triệu & Deal 0đ mỗi ngày</p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-500 text-sm text-center mb-6">
            Chọn nền tảng bạn yêu thích để không bỏ lỡ các đợt Sale khủng nhất.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {/* LỰA CHỌN 1: ZALO */}
            <a 
              href="https://zalo.me/g/wydidr139" 
              target="_blank"
              rel="noreferrer"
              onClick={handleClose}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-cyan-50 border border-cyan-100 hover:bg-cyan-100 hover:border-cyan-200 transition-all shadow-sm"
            >
              <div className="w-14 h-14 bg-[#0068FF] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">
                <MessageCircle size={28} fill="currentColor" />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-gray-800">Nhóm Zalo Săn Mã</h4>
                <p className="text-xs text-gray-500">Cập nhật mã hỏa tốc 24/7</p>
              </div>
              <ArrowRight size={20} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* LỰA CHỌN 2: FACEBOOK */}
            <a 
              href="https://www.facebook.com/groups/737583286073750/?ref=share" 
              target="_blank"
              rel="noreferrer"
              onClick={handleClose}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-all shadow-sm"
            >
              <div className="w-14 h-14 bg-[#1877F2] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                <Facebook size={28} fill="currentColor" />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-gray-800">Group Facebook VIP</h4>
                <p className="text-xs text-gray-500">Review sản phẩm & Thảo luận</p>
              </div>
              <ArrowRight size={20} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Footer của Popup */}
          <div className="mt-8 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img 
                      key={i} 
                      className="w-7 h-7 rounded-full border-2 border-white object-cover" 
                      src={`https://i.pravatar.cc/100?u=${i}`} 
                      alt="User"
                    />
                  ))}
               </div>
               <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">50.000+ thành viên đã tham gia</span>
            </div>

            <button 
              onClick={handleClose}
              className="text-xs text-gray-400 hover:text-blue-600 transition-colors underline underline-offset-4"
            >
              Để sau, tôi muốn xem tiếp sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}