// src/app/search/page.tsx
import { CouponService } from "@/services/couponService";
import CouponCard from "@/components/coupons/CouponCard";

// ĐỊNH NGHĨA LẠI KIỂU DỮ LIỆU CHO NEXT.JS 15
interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // BƯỚC QUAN TRỌNG: Phải await searchParams trước
  const resolvedSearchParams = await searchParams;
  
  // Sau đó mới lấy biến q ra
  const query = (resolvedSearchParams.q as string) || "";
  
  // Gọi Service tìm kiếm
  const results = await CouponService.search(query);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header kết quả tìm kiếm */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h1 className="text-xl font-bold text-gray-800">
          Kết quả tìm kiếm cho: <span className="text-blue-600 text-2xl">"{query}"</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Tìm thấy <span className="font-bold text-gray-800">{results.length}</span> mã giảm giá phù hợp.
        </p>
      </div>

      {/* Danh sách kết quả */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((c) => (
            <CouponCard key={c.id} data={c} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-500 font-medium text-lg">Không tìm thấy mã nào.</p>
          <p className="text-gray-400 text-sm mt-2">Hãy thử tìm từ khóa khác như "Shopee", "Freeship"...</p>
        </div>
      )}
    </div>
  );
}