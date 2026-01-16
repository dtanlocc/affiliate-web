"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Dùng cái này để lấy slug trên Client
import { useInView } from "react-intersection-observer";
import { ProductService, UIProductCard } from "@/services/productService";
import ProductCard from "@/components/products/ProductCard";
import { Sparkles, Loader2 } from "lucide-react";

export const revalidate = 3600; // Cache 1 tiếng
export const dynamicParams = true; // Cho phép tạo trang mới nếu chưa có trong cache

// Map tên hiển thị cho đẹp
const STYLE_NAMES: Record<string, string> = {
    'tong-tai': 'Phong Cách Tổng Tài Khí Chất',
    'nang-tho': 'Style Nàng Thơ Vintage',
    'duong-pho': 'Streetwear Đường Phố',
    'tiec': 'Set Đồ Đi Tiệc Sang Trọng',
    'skincare': 'Skincare - Chăm Sóc Da',
    'son': 'Son Môi Hot Trend',
    'makeup': 'Trang Điểm Thời Thượng'
};

export default function StylePage() {
  const params = useParams();
  const slug = params?.slug as string; // Lấy slug từ URL
  const title = STYLE_NAMES[slug] || "Góc Đồ Chất Cho Anh Em";

  const [products, setProducts] = useState<UIProductCard[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Hook để phát hiện cuộn xuống đáy
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false
  });

  // 1. Load dữ liệu lần đầu
  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      // Gọi API Search theo style (slug)
      const data = await ProductService.fetchFromDB('bestseller', 40, 1, slug);
      setProducts(data);
      if (data.length < 40) setHasMore(false);
      setLoading(false);
    };

    if (slug) loadInitial();
  }, [slug]);

  // 2. Load thêm khi cuộn xuống đáy
  useEffect(() => {
    if (inView && hasMore && !loading && !loadingMore) {
      loadMore();
    }
  }, [inView]);

  const loadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const moreData = await ProductService.fetchFromDB('bestseller', 40, nextPage, slug);
    
    if (moreData.length > 0) {
        setProducts(prev => [...prev, ...moreData]);
        setPage(nextPage);
    } else {
        setHasMore(false);
    }
    setLoadingMore(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Banner tiêu đề Style */}
        <div className="bg-white border-b-4 border-pink-400 p-8 rounded-2xl shadow-sm mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-500">
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 uppercase flex justify-center items-center gap-3">
                <Sparkles className="text-pink-500 fill-pink-200" /> {title}
            </h1>
            <p className="text-gray-500 mt-2">Tuyển tập những món đồ chuẩn gu nhất dành cho bạn.</p>
        </div>

        {/* Grid sản phẩm */}
        {loading ? (
             // Skeleton Loading ban đầu
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="h-72 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
             </div>
        ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((p, index) => (
                    // Thêm index vào key để tránh trùng lặp
                    <ProductCard key={`${p.id}-${index}`} data={p} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-dashed">
                <p className="text-lg">Chưa tìm thấy sản phẩm phù hợp style này.</p>
                <p className="text-sm">Hệ thống AI đang học thêm dữ liệu, bạn quay lại sau nhé!</p>
            </div>
        )}

        {/* Loading Spinner khi cuộn xuống */}
        {hasMore && products.length > 0 && (
            <div ref={ref} className="w-full flex justify-center py-8 mt-4">
                {loadingMore && (
                    <div className="flex items-center gap-2 text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                        <Loader2 className="animate-spin text-blue-600" size={20}/>
                        <span className="text-sm font-medium">Đang tìm thêm đồ xinh...</span>
                    </div>
                )}
            </div>
        )}
        
        {!hasMore && products.length > 0 && (
            <div className="text-center mt-8 text-gray-400 text-sm">
                Đã hiển thị hết sản phẩm.
            </div>
        )}
        
      </div>
    </div>
  );
}