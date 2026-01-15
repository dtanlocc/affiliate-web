"use client";

import Link from "next/link";
import { Hammer, ArrowLeft, Construction, Sparkles, Bell } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-slate-50">
      <div className="max-w-2xl w-full text-center">
        
        {/* Icon minh họa */}
        <div className="relative inline-block mb-8">
            <div className="bg-blue-100 p-8 rounded-full animate-pulse">
                <Construction size={80} className="text-blue-600" />
            </div>
            <div className="absolute -top-2 -right-2 bg-orange-500 text-white p-2 rounded-full shadow-lg">
                <Hammer size={20} />
            </div>
        </div>

        {/* Nội dung thông báo */}
        <div className="space-y-4 mb-10">
            <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tight flex items-center justify-center gap-3">
                <Sparkles className="text-yellow-500" /> 
                Góc Review Đang Chờ "Lên Sóng"
            </h1>
            <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">
                Đội ngũ biên tập viên AI của chúng tôi đang hoàn thiện các bài viết 
                đánh giá sản phẩm chất lượng nhất để giúp bạn mua sắm thông minh hơn.
            </p>
        </div>

        {/* Các nút hành động */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
                href="/" 
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
                <ArrowLeft size={18} /> Quay lại trang chủ
            </Link>
            
            <button 
                onClick={() => alert("Cảm ơn bạn! Chúng tôi sẽ thông báo cho bạn ngay khi trang Blog hoạt động.")}
                className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95"
            >
                <Bell size={18} className="text-orange-500" /> Nhận thông báo
            </button>
        </div>

        {/* Trang trí chân trang */}
        <div className="mt-20 pt-8 border-t border-slate-200 flex justify-center items-center gap-8 opacity-40 grayscale">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Thiết kế bởi Software Engineer</span>
        </div>
      </div>
    </div>
  );
}