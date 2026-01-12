// src/app/products/top-picks/page.tsx
"use client";
import { RecommendationService } from "@/services/recommendationService";
import ProductCard from "@/components/products/ProductCard";
import { ThumbsUp, Filter } from "lucide-react"; // Thêm icon Filter
import { useState } from "react";
import { MOCK_PRODUCTS } from "@/data/mockData";

export default function TopPicksPage() {
  const [filter, setFilter] = useState<'all'|'male'|'female'|'beauty'>('all');
  const products = RecommendationService.getGoodProducts(MOCK_PRODUCTS, filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* KHỐI HEADER ĐƯỢC THIẾT KẾ LẠI */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Cột trái: Tiêu đề */}
          <div>
            <h1 className="text-2xl font-black text-gray-800 uppercase flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <ThumbsUp size={24} />
                </div>
                Sản Phẩm Tốt - Đáng Mua
            </h1>
            <p className="text-gray-500 text-sm mt-2 ml-14">
                Tuyển tập các sản phẩm đánh giá 5 sao & giảm giá sâu nhất hôm nay.
            </p>
          </div>
          
          {/* Cột phải: Bộ lọc (Style nút bấm hiện đại) */}
          <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100">
                <div className="text-gray-400 px-2">
                    <Filter size={18} />
                </div>
                {[
                    {id: 'all', label: 'Tất cả'},
                    {id: 'female', label: 'Nữ'},
                    {id: 'male', label: 'Nam'},
                    {id: 'beauty', label: 'Mỹ phẩm'},
                ].map(item => (
                    <button 
                        key={item.id}
                        onClick={() => setFilter(item.id as any)}
                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                            filter === item.id 
                            ? 'bg-blue-600 text-white shadow-blue-200' 
                            : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-transparent'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
          </div>
      </div>

      {/* Grid sản phẩm */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {products.map((p) => (
             <ProductCard key={p.id} data={p as any} />
         ))}
      </div>
    </div>
  );
}