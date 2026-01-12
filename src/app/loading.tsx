// src/app/loading.tsx
import ProductSkeleton from "@/components/products/ProductSkeleton";
import Skeleton from "@/components/ui/Skeleton";

// BẮT BUỘC PHẢI CÓ 'export default' VÀ LÀ FUNCTION
export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      {/* Skeleton cho Banner */}
      <Skeleton className="w-full h-48 md:h-64 rounded-2xl" />

      {/* Skeleton cho Section 1 */}
      <div className="space-y-4">
         <div className="flex justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-24" />
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Tạo mảng 4 phần tử để lặp */}
            {[1, 2, 3, 4].map((i) => <ProductSkeleton key={i} />)}
         </div>
      </div>

       {/* Skeleton cho Section 2 */}
       <div className="space-y-4">
         <div className="flex justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-24" />
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <ProductSkeleton key={i} />)}
         </div>
      </div>
    </div>
  );
}