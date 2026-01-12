"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle, ArrowRight } from "lucide-react";

export default function GroupPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // CẤU HÌNH THỜI GIAN CHỜ (Tính bằng mili-giây)
  // Ví dụ: 30 phút = 30 * 60 * 1000 = 1800000
  // Để test cho nhanh, bạn có thể để 10000 (10 giây)
  const COOLDOWN_TIME = 5 * 60 * 1000; 

  useEffect(() => {
    // 1. Lấy thời điểm lần cuối user tắt popup
    const lastClosedTime = localStorage.getItem("popupLastClosedTime");
    const now = Date.now();

    // 2. Kiểm tra logic:
    // - Nếu chưa từng tắt (người mới) -> Hiện
    // - HOẶC Nếu đã tắt nhưng quá thời gian chờ rồi -> Hiện lại
    if (!lastClosedTime || (now - parseInt(lastClosedTime)) > COOLDOWN_TIME) {
      
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // Vẫn đợi 1.5s mới hiện cho mượt

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // 3. Khi bấm tắt, lưu thời điểm hiện tại vào bộ nhớ
    localStorage.setItem("popupLastClosedTime", Date.now().toString());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full relative overflow-hidden animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 bg-gray-100 p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-red-500 transition z-10"
        >
          <X size={20} />
        </button>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center text-white">
          <h3 className="text-xl font-black uppercase mb-1">Tham Gia Nhóm VIP</h3>
          <p className="text-blue-100 text-sm">Nhận mã độc quyền & Báo lỗi giá</p>
        </div>

        <div className="p-6 flex flex-col items-center text-center">
          <div className="relative w-48 h-48 mb-4 bg-white p-2 rounded-xl border-2 border-dashed border-blue-200 shadow-inner">
             <img 
               src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://zalo.me/g/nhom-san-sale" 
               alt="QR Zalo" 
               className="w-full h-full object-contain"
             />
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full">
                <MessageCircle className="text-blue-600 fill-blue-600" size={24}/>
             </div>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Quét mã QR hoặc bấm nút bên dưới để tham gia cộng đồng <strong>50.000+</strong> thành viên.
          </p>

          <a 
            href="https://zalo.me/g/nhom-san-sale-demo" 
            target="_blank"
            rel="noreferrer"
            onClick={handleClose} // Bấm vào link cũng tính là đã xem -> Đóng và lưu giờ
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
          >
            Vào Nhóm Ngay <ArrowRight size={18} />
          </a>

          {/* Nút đóng phụ */}
          <button 
            onClick={handleClose}
            className="mt-3 text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Để sau, tôi muốn xem web trước
          </button>
        </div>
      </div>
    </div>
  );
}