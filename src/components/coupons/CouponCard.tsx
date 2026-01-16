"use client";

import { useState } from "react";
import { Copy, Check, Clock, TicketPercent } from "lucide-react";
import Image from "next/image";

const FALLBACK_IMAGE = "https://placehold.co/400x400/png?text=No+Image";

// HÀM QUAN TRỌNG: Biến ảnh mờ thành ảnh HD
const getHighResImage = (url: string) => {
  if (!url) return FALLBACK_IMAGE;
  // Xóa đuôi "_tn" (thumbnail) để lấy ảnh gốc độ phân giải cao
  return url.replace(/_tn/g, "");
};

export default function CouponCard({ data }: { data: any }) {
  const [copied, setCopied] = useState(false);
  
  // Xử lý ảnh ngay từ đầu vào
  const hdImage = getHighResImage(data.imageUrl);
  const [imgSrc, setImgSrc] = useState(hdImage);

  const handleUseCoupon = async () => {
    try {
      await navigator.clipboard.writeText(data.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Lỗi copy:", err);
    }
    window.open(data.link, "_blank");
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-xl border border-red-200 shadow-sm hover:shadow-lg hover:border-red-400 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      
      {/* 1. PHẦN TRÊN: ẢNH (Dùng ảnh HD) */}
      <div className="relative h-36 w-full bg-white overflow-hidden border-b border-red-50">
        
        {/* Ảnh nền mờ để trang trí (tạo chiều sâu) */}
        <div 
            className="absolute inset-0 bg-cover bg-center blur-xl opacity-20"
            style={{ backgroundImage: `url(${imgSrc})` }}
        ></div>

        <Image 
             src={imgSrc} 
             alt={data.title}
             fill 
             // Tăng chất lượng lên tối đa
             quality={100}
             // sizes lớn để trình duyệt tải ảnh to
             sizes="(max-width: 768px) 100vw, 400px"
             // Dùng 'contain' để không bị cắt mất chữ trên banner, hoặc 'cover' nếu muốn đẹp
             className="object-contain p-2 z-10 group-hover:scale-105 transition-transform duration-500"
             onError={() => setImgSrc(FALLBACK_IMAGE)}
             // Bỏ qua bộ nén của Next.js nếu ảnh vẫn mờ
             unoptimized={true} 
        />
        
        {/* Nhãn Tag */}
        <div className="absolute top-2 left-2 z-20">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shadow-sm border border-white/20 text-white
              ${data.percent === 'FREESHIP' ? 'bg-green-500' : 'bg-red-600'}`}>
              {data.percent}
            </span>
        </div>

        {/* Nhãn Sàn */}
        <div className="absolute bottom-2 right-2 z-20 bg-black/50 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
            {data.merchant ? data.merchant.toUpperCase() : "SHOPEE"}
        </div>
      </div>

      {/* 2. VẾT CẮT RĂNG CƯA */}
      <div className="relative flex items-center w-full bg-white z-20">
          <div className="w-3 h-3 bg-slate-50 rounded-full absolute -left-1.5 border-r border-red-200"></div>
          <div className="w-full border-t border-dashed border-red-200 mx-3"></div>
          <div className="w-3 h-3 bg-slate-50 rounded-full absolute -right-1.5 border-l border-red-200"></div>
      </div>

      {/* 3. PHẦN DƯỚI: NỘI DUNG */}
      <div className="p-3 flex flex-col flex-grow bg-white z-10">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-3 leading-snug group-hover:text-red-600 transition-colors h-[2.5rem]" title={data.title}>
          {data.title}
        </h3>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 bg-red-50 w-fit px-2 py-1 rounded">
             <Clock size={12} className="text-red-500"/>
             <span>HSD: {data.endDate || "Sắp hết"}</span>
          </div>

          <button 
            onClick={handleUseCoupon}
            className={`
                relative w-full overflow-hidden py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm
                ${copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gradient-to-r from-red-600 to-orange-500 text-white hover:shadow-orange-200'
                }
            `}
          >
            {/* Hiệu ứng lấp lánh */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />
            
            {copied ? (
              <><Check size={14} /> Đã Lưu Mã</>
            ) : (
              <>
                <Copy size={14} /> 
                <span className="truncate max-w-[120px]">
                    {data.code === "LẤY NGAY" ? "Lấy Ngay" : `Copy: ${data.code}`}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx global>{`
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