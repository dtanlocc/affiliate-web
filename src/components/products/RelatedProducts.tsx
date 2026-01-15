// src/components/products/RelatedProducts.tsx
"use client";

import { useEffect, useState } from "react";
import { ProductService, UIProductCard } from "@/services/productService";
import ProductCard from "./ProductCard";
import { Sparkles } from "lucide-react";

export default function RelatedProducts({ currentId }: { currentId: string }) {
  const [products, setProducts] = useState<UIProductCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        // Gọi Service lấy dữ liệu tương tự
        const data = await ProductService.getRelated(currentId);
        setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (currentId) {
        fetchRelated();
    }
  }, [currentId]);

  // Nếu không tải (loading=false) mà không có sản phẩm -> Ẩn luôn section này
  if (!loading && products.length === 0) return null;

  return (
    <div className="mt-12 border-t border-gray-100 pt-10">
      <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
        <Sparkles className="text-yellow-500 fill-yellow-500" />
        Có thể bạn cũng thích
      </h2>

      {loading ? (
        // Hiệu ứng Loading Skeleton
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[1,2,3,4].map(i => (
               <div key={i} className="h-72 bg-gray-100 rounded-xl animate-pulse"></div>
           ))}
        </div>
      ) : (
        // Danh sách sản phẩm
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {products.map((p, index) => (
               <ProductCard key={`${p.id}-${index}`} data={p} />
           ))}
        </div>
      )}
    </div>
  );
}