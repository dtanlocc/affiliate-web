"use client";

import { useState, useEffect } from "react";
import { CouponService } from "@/services/couponService";
import CouponCard from "@/components/coupons/CouponCard";
import { Ticket, Loader2, PlusCircle } from "lucide-react";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCoupons = async (p: number, isLoadMore: boolean) => {
    if (isLoadMore) setLoadingMore(true); else setLoading(true);
    const result = await CouponService.getAll(p, 40);
    if (isLoadMore) setCoupons(prev => [...prev, ...result.data]);
    else setCoupons(result.data);
    setTotalItems(result.total);
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => { fetchCoupons(1, false); }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCoupons(nextPage, true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 mb-8 bg-gradient-to-r from-orange-50 to-white">
          <div className="p-3 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-200">
            <Ticket size={32} />
          </div>
          <h1 className="text-2xl font-black text-gray-800 uppercase leading-none">Mã Giảm Giá Shopee</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="h-44 bg-gray-100 rounded-xl animate-pulse"></div>)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coupons.map((c, index) => <CouponCard key={`${c.id}-${index}`} data={c} />)}
          </div>

          {coupons.length < totalItems && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="group flex items-center gap-2 px-10 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {loadingMore ? <Loader2 className="animate-spin" size={22}/> : <PlusCircle size={22}/>}
                Xem thêm mã giảm giá
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// import AccesstradeWidget from "@/components/coupons/AccesstradeWidget";

// export default function CouponsPage() {
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6 text-center text-blue-700 uppercase">
//         Tổng hợp Mã Giảm Giá
//       </h1>
      
//       {/* Nhúng Widget vào đây */}
//       <AccesstradeWidget />
//     </div>
//   );
// }