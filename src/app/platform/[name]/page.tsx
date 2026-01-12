// src/app/platform/[name]/page.tsx
import { CouponService } from "@/services/couponService";
import CouponCard from "@/components/coupons/CouponCard";
import { notFound } from "next/navigation";

// CHỈNH SỬA 1: Định nghĩa lại kiểu dữ liệu cho Next.js 15
interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function PlatformPage({ params }: PageProps) {
  // CHỈNH SỬA 2: Phải dùng 'await' để giải nén params
  const resolvedParams = await params; 
  const platformName = resolvedParams.name;

  // 1. Kiểm tra nếu tên sàn không hợp lệ thì trả về 404 luôn
  // Lưu ý: Đảm bảo tên sàn khớp với dữ liệu trong Mock Data (viết thường)
  const validPlatforms = ['shopee', 'lazada', 'tiktok', 'tiki'];
  
  if (!validPlatforms.includes(platformName.toLowerCase())) {
    return notFound();
  }

  // 2. Gọi Service lấy dữ liệu
  const coupons = await CouponService.getByPlatform(platformName);

  return (
    <div className="max-w-6xl mx-auto px-4 w-full">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <a href="/" className="hover:text-blue-600">Trang chủ</a> 
        <span>/</span> 
        <span className="capitalize font-bold text-blue-600">{platformName}</span>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-2">
            {/* Logic hiển thị logo theo tên sàn */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md
                ${platformName === 'shopee' ? 'bg-orange-500' : 
                  platformName === 'lazada' ? 'bg-blue-600' : 
                  platformName === 'tiktok' ? 'bg-black' : 'bg-blue-400'}`}>
                {platformName.substring(0, 1).toUpperCase()}
            </div>
            <div>
                <h1 className="text-2xl font-bold uppercase text-gray-800">
                Mã Giảm Giá {platformName}
                </h1>
                <p className="text-gray-500 text-sm">
                Cập nhật tự động {coupons.length} mã mới nhất hôm nay.
                </p>
            </div>
        </div>
      </div>

      {/* Danh sách mã */}
      {coupons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {coupons.map((c) => (
            <CouponCard key={c.id} data={c} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">Hiện tại chưa có mã nào cho sàn này.</p>
          <a href="/" className="text-blue-600 text-sm hover:underline mt-2 inline-block">Quay về trang chủ</a>
        </div>
      )}
    </div>
  );
}