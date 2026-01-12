// src/services/recommendationService.ts
import { Coupon } from "@/types/coupon";

export const RecommendationService = {
    // 1. Logic lọc "Sản phẩm tốt" (Good Products)
    // Tiêu chí: Đã bán nhiều (> 1000) HOẶC Giảm giá sâu (> 30%)
    getGoodProducts: (allProducts: any[], type: 'all' | 'male' | 'female' | 'beauty') => {
        let filtered = allProducts;

        // Bộ lọc cơ bản theo Text (Nam/Nữ/Mỹ phẩm)
        if (type === 'male') filtered = allProducts.filter(p => p.name.toLowerCase().includes('nam') || p.tags.includes('men'));
        if (type === 'female') filtered = allProducts.filter(p => p.name.toLowerCase().includes('nữ') || p.name.toLowerCase().includes('váy') || p.tags.includes('women'));
        if (type === 'beauty') filtered = allProducts.filter(p => p.tags.includes('beauty') || p.name.toLowerCase().match(/son|kem|phấn/));

        // QUAN TRỌNG: Sắp xếp theo độ "Tốt" (Recommendation Logic)
        // Công thức: (Lượng bán * 0.6) + (Giảm giá * 0.4)
        return filtered.sort((a, b) => {
            const scoreA = (a.sold * 0.6) + (parseInt(a.discount) * 0.4);
            const scoreB = (b.sold * 0.6) + (parseInt(b.discount) * 0.4);
            return scoreB - scoreA; // Cái nào điểm cao xếp trước
        });
    },

    // 2. Logic Viral/Idol (Giữ nguyên như cũ)
    getViralProducts: (allProducts: any[]) => {
        return allProducts.filter(p => p.label === 'Viral' || p.label === 'Idol Pick');
    }
};