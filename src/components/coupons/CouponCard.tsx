// src/components/coupons/CouponCard.tsx
"use client";

import { Coupon } from "@/types/coupon";
import { Copy, ExternalLink, Clock } from "lucide-react";
import { useState } from "react";

const PLATFORM_COLOR = {
  shopee: "bg-orange-500",
  tiktok: "bg-black",
  lazada: "bg-blue-600",
  tiki: "bg-blue-400",
};

export default function CouponCard({ data }: { data: Coupon }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(data.code);
    setCopied(true);
    window.open(data.link, "_blank");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Badge Sàn - Góc trái trên */}
      <div className={`absolute top-0 left-0 px-3 py-1 text-[10px] font-bold text-white rounded-br-lg z-10 ${PLATFORM_COLOR[data.merchant]}`}>
        {data.merchant.toUpperCase()}
      </div>

      <div className="p-4 flex gap-4">
        {/* Cột trái: Ảnh & % Giảm */}
        <div className="flex flex-col items-center gap-2 w-20 flex-shrink-0 pt-4">
          <img src={data.imageUrl} alt={data.merchant} className="w-16 h-16 object-contain" />
          <div className="font-black text-red-600 text-lg text-center leading-none">
            {data.percent || "SALE"}
          </div>
        </div>

        {/* Cột phải: Thông tin */}
        <div className="flex-1 min-w-0 pt-2">
           {/* Tags */}
           <div className="flex gap-1 mb-1">
            {data.tags?.map((tag, idx) => (
              <span key={idx} className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100">
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="font-bold text-gray-800 text-sm line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
            {data.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{data.minSpend}</p>

          {/* Progress Bar (Tạo sự khan hiếm) */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
            <div 
              className="bg-red-500 h-1.5 rounded-full" 
              style={{ width: `${data.used}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[10px] text-gray-400 mb-3">
            <span>Đã dùng {data.used}%</span>
            <span className="flex items-center gap-1"><Clock size={10}/> HSD: {data.endDate}</span>
          </div>
        </div>
      </div>

      {/* Phần nút bấm - Ngăn cách bằng đường kẻ đứt */}
      <div className="relative mt-auto">
        {/* 2 hình tròn tạo hiệu ứng vết cắt */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-gray-50 rounded-full"></div>
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-gray-50 rounded-full"></div>
        <div className="border-t border-dashed border-gray-300"></div>

        <div className="p-3 bg-gray-50 flex items-center justify-between gap-2">
          <div className="flex-1 bg-white border border-gray-200 border-dashed rounded px-2 py-1.5 text-center font-mono font-bold text-gray-700 text-sm truncate">
            {data.code || "THU THẬP NGAY"}
          </div>
          <button
            onClick={handleClick}
            className={`px-4 py-1.5 rounded text-sm font-bold flex items-center gap-1 transition-all ${
              copied 
              ? "bg-green-600 text-white" 
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 shadow-md"
            }`}
          >
            {copied ? "Đã Copy" : <><Copy size={14}/> Lấy Mã</>}
          </button>
        </div>
      </div>
    </div>
  );
}