// src/app/search/page.tsx
import SearchClient from "@/components/search/SearchClient";
import { Suspense } from "react";

export const metadata = {
  title: "Tìm kiếm sản phẩm thông minh | SanMaNhanh",
  description: "Tìm kiếm sản phẩm Shopee bằng công nghệ AI Vector.",
};

export default function SearchPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
       <Suspense fallback={<div className="p-10 text-center">Đang tải bộ máy tìm kiếm...</div>}>
          <SearchClient />
       </Suspense>
    </div>
  );
}