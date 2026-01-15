"use client";

import { useState } from "react";
import { Copy, Check, Zap, Clock } from "lucide-react";

export default function CouponCard({ data }: { data: any }) {
  const [copied, setCopied] = useState(false);

  const handleUseCoupon = async () => {
    try {
      await navigator.clipboard.writeText(data.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Lỗi copy:", err);
    }
    // Chuyển hướng ngay lập tức qua link Affiliate isclix
    window.open(data.link, "_blank");
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col">
      
      {/* 1. Nhãn High-end với hiệu ứng Pulse */}
      <div className="absolute top-3 left-3 z-20 flex gap-2">
        <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1
          ${data.percent === 'FREESHIP' 
            ? 'bg-green-500 text-white animate-pulse' 
            : 'bg-blue-600 text-white'}`}>
          <Zap size={10} fill="currentColor" />
          {data.percent}
        </div>
        {data.isHot && (
             <div className="bg-orange-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm">
                HOT
             </div>
        )}
      </div>

      {/* 2. Image Container với dải màu Gradient */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-8">
        <img 
          src={data.imageUrl} 
          alt={data.title}
          className="max-w-[80%] max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Lớp phủ Highlight khi di chuột */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* 3. Thiết kế Ticket (Vết cắt răng cưa giả lập) */}
      <div className="relative h-4 bg-white flex items-center justify-between px-[-10px] z-10">
          <div className="w-4 h-4 rounded-full bg-gray-50 -ml-2 border-r border-gray-100" />
          <div className="flex-grow border-t-2 border-dashed border-gray-100 mx-2" />
          <div className="w-4 h-4 rounded-full bg-gray-50 -mr-2 border-l border-gray-100" />
      </div>

      {/* 4. Nội dung chi tiết */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-4 min-h-[40px] leading-relaxed group-hover:text-blue-600 transition-colors">
          {data.title}
        </h3>
        
        <div className="mt-auto space-y-4">
          {/* Stats Bar */}
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-gray-500 font-medium">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
               {data.minSpend}
            </div>
            <div className="flex items-center gap-1 text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
               <Clock size={12} />
               {data.endDate}
            </div>
          </div>

          {/* 5. Nút bấm với hiệu ứng SHIMMER (Tia sáng chạy qua) */}
          <button 
            onClick={handleUseCoupon}
            className="relative w-full group/btn overflow-hidden bg-blue-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            {/* Hiệu ứng tia sáng (Shimmer) */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-shimmer" />
            
            {copied ? (
              <><Check size={18} className="animate-bounce"/> Đã chép mã</>
            ) : (
              <><Copy size={18} className="group-hover/btn:rotate-12 transition-transform"/> {data.code}</>
            )}
          </button>
        </div>
      </div>

      {/* CSS cho hiệu ứng Shimmer */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            left: 125%;
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}