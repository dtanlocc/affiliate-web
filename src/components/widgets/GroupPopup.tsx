"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle, Facebook, ArrowRight, Sparkles, Gift } from "lucide-react"; // Dùng icon Gift

export default function GroupPopup() {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full relative overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-yellow-300">
        
        {/* Nút đóng */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 bg-white/20 hover:bg-white text-white hover:text-red-600 p-1.5 rounded-full transition-all z-20 backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        {/* Header Đỏ Rực - Họa Tiết Tết */}
        <div className="bg-gradient-to-br from-red-700 via-red-600 to-orange-600 p-8 text-center text-white relative overflow-hidden">
          {/* Họa tiết nền mờ */}
          <div className="absolute inset-0 opacity-10" 
               style={{backgroundImage: 'radial-gradient(#fde047 1px, transparent 1px)', backgroundSize: '15px 15px'}}>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-red-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-3 shadow-lg">
               <Gift size={12} /> Lì xì thành viên mới
            </div>
            <h3 className="text-3xl font-black uppercase mb-1 tracking-tight drop-shadow-md text-yellow-300">
                GIA NHẬP TEAM
            </h3>
            <p className="text-red-50 text-sm font-medium">Nhận mã giảm giá độc quyền & Deal 0đ</p>
          </div>
        </div>

        <div className="p-6 bg-red-50/30">
          <p className="text-gray-500 text-sm text-center mb-6 px-4">
            Chọn kênh nhận thông báo để không bỏ lỡ "Lộc" đầu năm bạn nhé!
          </p>

          <div className="grid grid-cols-1 gap-3">
            {/* LỰA CHỌN 1: ZALO (Nổi bật nhất) */}
            <a 
              href="https://zalo.me/g/wydidr139" 
              target="_blank"
              rel="noreferrer"
              onClick={handleClose}
              className="group flex items-center gap-4 p-3 rounded-2xl bg-white border-2 border-red-100 hover:border-red-500 hover:shadow-lg hover:shadow-red-100 transition-all shadow-sm relative overflow-hidden"
            >
              {/* Nhãn HOT */}
              <div className="absolute top-0 right-0 bg-red-600 text-yellow-300 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">HOT</div>

              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <MessageCircle size={24} fill="currentColor" />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">Nhóm Zalo Săn Mã</h4>
                <p className="text-xs text-gray-500">Cập nhật mã hỏa tốc 24/7</p>
              </div>
              <ArrowRight size={20} className="text-red-300 group-hover:text-red-600 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* LỰA CHỌN 2: FACEBOOK */}
            <a 
              href="https://www.facebook.com/groups/737583286073750/?ref=share" 
              target="_blank"
              rel="noreferrer"
              onClick={handleClose}
              className="group flex items-center gap-4 p-3 rounded-2xl bg-white border border-blue-100 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm"
            >
              <div className="w-12 h-12 bg-[#1877F2] text-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Facebook size={24} fill="currentColor" />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-gray-800 group-hover:text-blue-600">Group Facebook</h4>
                <p className="text-xs text-gray-500">Thảo luận & Review</p>
              </div>
              <ArrowRight size={20} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img 
                      key={i} 
                      className="w-6 h-6 rounded-full border-2 border-white object-cover" 
                      src={`https://i.pravatar.cc/100?u=${i+10}`} 
                      alt="User"
                    />
                  ))}
               </div>
               <span className="text-[10px] font-bold text-red-400 uppercase tracking-tighter">50.000+ thành viên</span>
            </div>

            <button 
              onClick={handleClose}
              className="text-xs text-gray-400 hover:text-red-600 transition-colors underline underline-offset-4"
            >
              Để sau, tôi muốn xem tiếp sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}