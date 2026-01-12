// src/app/coupons/page.tsx
"use client";

import { useState, useEffect } from "react";
import { CouponService } from "@/services/couponService";
import CouponCard from "@/components/coupons/CouponCard";
import { Coupon } from "@/types/coupon";
import { Tag, ChevronLeft, ChevronRight, ShoppingBag, Loader2 } from "lucide-react";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); 
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const ITEMS_PER_PAGE = 24; // Lấy 24 cái mỗi lần cho đẹp grid

  // Hàm gọi API
const fetchData = async (merchant: string, page: number) => {
    setLoading(true);
    const apiMerchant = merchant === 'all' ? '' : merchant;
    
    const { data, total } = await CouponService.getAll(page, ITEMS_PER_PAGE, apiMerchant);
    
    setCoupons(data);
    
    // Cập nhật tổng số lượng chính xác từ API
    setTotalItems(total); 
    
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

  // 1. Khi đổi Tab Sàn -> Reset về trang 1
  useEffect(() => {
    setCurrentPage(1);
    fetchData(activeTab, 1);
  }, [activeTab]);

  // 2. Khi đổi Trang -> Gọi API trang tương ứng
  useEffect(() => {
    // Chỉ gọi khi không phải lần đầu (để tránh gọi 2 lần do useEffect trên)
    // Tuy nhiên, logic đơn giản là cứ gọi fetchData
    if (currentPage > 1) { 
        fetchData(activeTab, currentPage);
    }
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Banner & Tabs giữ nguyên */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 mb-8 text-white text-center shadow-lg">
        <h1 className="text-3xl font-black uppercase">Săn Mã Giảm Giá</h1>
      </div>

      {/* <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-1">
        {[
            { id: 'all', label: 'Tất cả' },
            { id: 'shopee', label: 'Shopee' }, // Gửi 'shopee'
        ].map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-bold rounded-t-lg border-b-2 transition-all 
                    ${activeTab === tab.id ? 'text-orange-600 border-orange-600 bg-orange-50' : 'border-transparent text-gray-500'}`}
            >
                {tab.label}
            </button>
        ))}
      </div> */}

      {/* Grid Kết Quả */}
      {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>)}
          </div>
      ) : (
          <div className="min-h-[400px]">
            {coupons.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {coupons.map((c) => <CouponCard key={c.id} data={c} />)}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">Không tìm thấy mã nào.</div>
            )}
          </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1 || loading}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
            <ChevronLeft size={18}/> Trang trước
        </button>
        
        <span className="font-bold text-gray-700">Trang {currentPage}</span>
        
        {/* Nút Next luôn hiện nếu còn dữ liệu */}
        <button 
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={loading || coupons.length < ITEMS_PER_PAGE}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
            Trang sau <ChevronRight size={18}/>
        </button>
      </div>
    </div>
  );
}