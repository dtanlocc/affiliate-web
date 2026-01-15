"use client";

import { useState, useEffect, useRef } from "react";
import ProductCard from "@/components/products/ProductCard";
import { 
    ThumbsUp, Loader2, PlusCircle, Sparkles, 
    ChevronLeft, ChevronRight, Flame, User, Shirt, 
    Briefcase, PartyPopper, Zap, Sun, Palette // Đã bỏ Heart (Son môi)
} from "lucide-react";
import { ProductService, UIProductCard } from "@/services/productService";

// Cấu hình Menu với Icon xịn (Đã bỏ Son Môi)
const CATEGORIES = [
    { id: 'all', label: 'Top Bán Chạy', icon: Flame, color: 'text-red-500' },
    { id: 'nang-tho', label: 'Nàng thơ', icon: Shirt, color: 'text-pink-500' },
    { id: 'tong-tai', label: 'Tổng tài', icon: Briefcase, color: 'text-slate-700' },
    { id: 'tiec', label: 'Đi tiệc', icon: PartyPopper, color: 'text-purple-500' },
    { id: 'duong-pho', label: 'Streetwear', icon: Zap, color: 'text-yellow-500' },
    { id: 'nam-tinh', label: 'Đồ Nam', icon: User, color: 'text-blue-600' },
    { id: 'skincare', label: 'Skincare', icon: Sparkles, color: 'text-cyan-500' },
    { id: 'makeup', label: 'Makeup', icon: Palette, color: 'text-rose-500' },
    // Đã bỏ Son môi ở đây
    { id: 'kem-chong-nang', label: 'Chống nắng', icon: Sun, color: "text-orange-500" },
];

export default function TopPicksPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState<UIProductCard[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Ref cho thanh cuộn
  const scrollRef = useRef<HTMLDivElement>(null);

  // Hàm xử lý cuộn sang trái/phải
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const { current } = scrollRef;
        const scrollAmount = 300; // Khoảng cách mỗi lần cuộn
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  };

  const fetchProducts = async (currentTab: string, pageNumber: number, isLoadMore: boolean) => {
    try {
      if (!isLoadMore) setLoading(true);
      else setLoadingMore(true);

      let data = [];
      if (currentTab === 'all') {
        data = await ProductService.fetchFromDB('bestseller', 40, pageNumber);
      } else {
        data = await ProductService.fetchFromDB('bestseller', 40, pageNumber, currentTab);
      }
      
      if (data.length < 40) setHasMore(false);

      if (isLoadMore) {
        setProducts(prev => [...prev, ...data]);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(activeTab, 1, false);
  }, [activeTab]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(activeTab, nextPage, true);
  };

  // Lấy thông tin tab hiện tại để hiển thị tiêu đề
  const currentCategory = CATEGORIES.find(c => c.id === activeTab);
  const CurrentIcon = currentCategory?.icon || ThumbsUp;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      
      {/* --- HEADER CAO CẤP --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-20 z-30 mb-8">
          
          {/* 1. Phần Tiêu Đề Chính */}
          <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gray-50 ${currentCategory?.color}`}>
                <CurrentIcon size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-800 uppercase leading-none mb-1">
                    {currentCategory?.label}
                </h1>
                <p className="text-sm text-gray-500">
                    {activeTab === 'all' 
                        ? 'Các sản phẩm bán chạy nhất được cập nhật liên tục.' 
                        : 'Các sản phẩm được AI tuyển chọn theo phong cách.'}
                </p>
              </div>
          </div>
          
          {/* 2. Thanh Menu Trượt (Smart Slider) */}
          <div className="relative group p-2 bg-gray-50/50">
            
            {/* Nút lùi */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-blue-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Vùng cuộn */}
            <div 
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth px-2 py-1"
            >
                {CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    const isActive = activeTab === cat.id;
                    return (
                        <button 
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            suppressHydrationWarning={true}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border
                                ${isActive 
                                    ? 'bg-white border-blue-600 text-blue-600 shadow-sm ring-1 ring-blue-100' 
                                    : 'bg-transparent border-transparent text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm'
                                }
                            `}
                        >
                            <Icon size={16} className={isActive ? 'text-blue-600' : cat.color} />
                            {cat.label}
                        </button>
                    )
                })}
            </div>

            {/* Nút tiến */}
            <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-blue-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
            >
                <ChevronRight size={20} />
            </button>
            
            {/* Hiệu ứng mờ */}
            <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
          </div>
      </div>

      {/* --- GRID SẢN PHẨM --- */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
            ))}
        </div>
      ) : (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-500">
                {products.length > 0 ? (
                    products.map((p, index) => (
                        <ProductCard key={`${p.id}-${activeTab}-${index}`} data={p} />
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-70">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <Sparkles className="text-gray-400" size={40} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-600">Chưa tìm thấy sản phẩm</h3>
                        <p className="text-sm text-gray-400">AI đang học thêm về style này, bạn thử lại sau nhé.</p>
                    </div>
                )}
            </div>

            {hasMore && products.length > 0 && (
                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="group flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-full hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm active:scale-95 disabled:opacity-70"
                    >
                        {loadingMore ? (
                            <><Loader2 className="animate-spin" size={20}/> Đang tải...</>
                        ) : (
                            <><PlusCircle size={20} className="group-hover:rotate-90 transition-transform"/> Xem thêm</>
                        )}
                    </button>
                </div>
            )}
            
            {!hasMore && products.length > 0 && (
                 <div className="py-10 text-center">
                    <div className="h-px w-20 bg-gray-200 mx-auto mb-3"></div>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Đã hiển thị hết</span>
                 </div>
            )}
        </>
      )}
    </div>
  );
}