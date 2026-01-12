// src/components/products/ProductSkeleton.tsx
import Skeleton from "../ui/Skeleton";

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 h-full">
      <Skeleton className="w-full aspect-square rounded-lg mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex justify-between items-end mt-auto">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  );
}