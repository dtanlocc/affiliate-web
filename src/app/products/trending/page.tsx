// src/app/products/trending/page.tsx
import { RecommendationService } from "@/services/recommendationService";
import ProductCard from "@/components/products/ProductCard";
import { TrendingUp, Flame } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mockData"; // Import dữ liệu chung

export default function TrendingPage() {
  const viralProducts = RecommendationService.getViralProducts(MOCK_PRODUCTS);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <h1 className="text-3xl font-black uppercase mb-2 flex items-center gap-3">
                Trending & Idol <Flame className="text-yellow-300 fill-yellow-300"/>
            </h1>
            <p className="text-pink-100">Cập nhật xu hướng thời trang Idol và các món đồ Viral trên TikTok.</p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
              <TrendingUp size={150} />
          </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {viralProducts.map((p) => (
             <ProductCard key={p.id} data={p as any} />
         ))}
      </div>
    </div>
  );
}