// src/components/search/SearchClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductService, UIProductCard } from "@/services/productService";
import ProductCard from "@/components/products/ProductCard";
import { Search, Loader2, PlusCircle } from "lucide-react";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || ""; // Lấy từ khóa từ URL

  const [products, setProducts] = useState<UIProductCard[]>([]);
  const [loading, setLoading] = useState(true); // Loading lần đầu
  const [loadingMore, setLoadingMore] = useState(false); // Loading khi bấm xem thêm
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 1. Tải dữ liệu lần đầu (Trang 1)
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      setProducts([]);
      setPage(1);
      setHasMore(true);

      if (query) {
        const data = await ProductService.search(query, 40, 1);
        setProducts(data);
        if (data.length < 40) setHasMore(false);
      }
      setLoading(false);
    };

    fetchInitial();
  }, [query]);

  // 2. Hàm tải thêm (Trang 2, 3...)
  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    
    // Gọi Service lấy trang tiếp theo
    // Lưu ý: Ở Backend ta đã có Cache Vector, nên trang 2 sẽ load cực nhanh
    const moreData = await ProductService.search(query, 40, nextPage);
    
    if (moreData.length > 0) {
        setProducts(prev => [...prev, ...moreData]);
        setPage(nextPage);
        if (moreData.length < 40) setHasMore(false);
    } else {
        setHasMore(false);
    }
    setLoadingMore(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      
      {/* Header Kết quả */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-in fade-in slide-in-from-top-4">
        <h1 className="text-xl md:text-2xl font-black text-gray-800 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
             <Search size={24} />
          </div>
          Kết quả tìm kiếm: <span className="text-blue-600">"{query}"</span>
        </h1>
        {/* <p className="text-gray-500 mt-2 ml-14">
          Hệ thống AI đang tìm kiếm các sản phẩm phù hợp nhất với ý định của bạn.
        </p> */}

        <p className="text-gray-500 mt-2 ml-14">
          Chờ mình tí nha, mình đang lục tìm những món xinh nhất cho bạn nè 🌸
        </p>
      </div>

      {/* Grid Sản Phẩm */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
            ))}
        </div>
      ) : products.length > 0 ? (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((p, index) => (
                    <ProductCard key={`${p.id}-${index}`} data={p} />
                ))}
            </div>

            {/* Nút Xem Thêm */}
            {hasMore && (
                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="flex items-center gap-2 px-8 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-full hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm disabled:opacity-70"
                    >
                        {loadingMore ? (
                            <><Loader2 className="animate-spin" size={20}/> Đang tải thêm...</>
                        ) : (
                            <><PlusCircle size={20}/> Xem thêm kết quả</>
                        )}
                    </button>
                </div>
            )}

            {!hasMore && (
                 <div className="text-center mt-10 text-gray-400 text-sm">--- Đã hiển thị hết kết quả ---</div>
            )}
        </>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="text-6xl mb-4">🤔</div>
            <p className="text-gray-600 font-bold text-lg">Không tìm thấy sản phẩm nào.</p>
            <p className="text-gray-400 text-sm mt-2">Hãy thử từ khóa khác (ví dụ: son, váy, tai nghe...)</p>
        </div>
      )}
    </div>
  );
}