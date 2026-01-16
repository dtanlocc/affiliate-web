"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function AccesstradeVoucher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="at-voucher-wrapper w-full bg-white rounded-2xl overflow-hidden min-h-[600px]">
      {/* 1. CSS FontAwesome bắt buộc theo tài liệu */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" 
        rel="stylesheet" 
      />

      {/* 2. Cấu trúc HTML GỐC từ Developer AT */}
      <div id="layout-wrapper">
        <main className="atEQPOIVFSDFSDG-voucher-main">
          {/* Vòng xoay Loading */}
          <div className="fa-3x flex justify-center py-20 text-blue-600">
            <i className="fas fa-spinner fa-spin"></i>
          </div>

          <div className="atEQPOIVFSDFSDG-container" style={{ display: "none" }}>
            <div className="atEQPOIVFSDFSDG-first-block">
              <div className="atEQPOIVFSDFSDG-search"></div>
              <div className="atEQPOIVFSDFSDG-filter-keyword">
                <ul className="atEQPOIVFSDFSDG-tags"></ul>
              </div>
            </div>
            <div className="atEQPOIVFSDFSDG-second-block">
              <div className="atEQPOIVFSDFSDG-title-tabs"></div>
              <div className="atEQPOIVFSDFSDG-filters-and-delete-search"></div>
              <div className="atEQPOIVFSDFSDG-voucher-dealcoupon"></div>
            </div>
          </div>
        </main>
      </div>

      {/* 3. Nạp thư viện bổ trợ (Sử dụng link AT cung cấp) */}
      <Script 
        src="https://static.accesstrade.vn/coupon/v2/js/jquery-1.11.1.min.js" 
        strategy="beforeInteractive" // Phải có jQuery trước mọi thứ
      />
      <Script 
        src="https://static.accesstrade.vn/coupon/v2/js/popper.min.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="https://static.accesstrade.vn/coupon/v2/js/bootstrap.min.js" 
        strategy="afterInteractive" 
      />

      {/* 4. SCRIPT CHÍNH - Giữ nguyên các thông số rỗng như bản WordPress */}
      <Script
        id="atScript6626"
        src="https://static.accesstrade.vn/coupon/v2/js/main_at_v3.js"
        strategy="lazyOnload"
        data-sub1=""
        data-sub2=""
        data-sub3=""
        data-sub4=""
        data-sub5=""
        data-utm-source=""
        data-utm-medium=""
        data-utm-campaign=""
        data-utm-content=""
        data-style-color="#fff"
        data-limit="10"
        data-row="2"
        // Dùng đúng cấu trúc filter từ tài liệu của bạn (Đã xóa dấu phẩy lỗi)
        data-filters='{"merchant":",4742147753565840242","category":"E-COMMERCE,","campaign":""}'
        data-accesskey="" // Để trống để AT tự nhận diện qua Domain
      />

      {/* Fix CSS để không bị Tailwind "đè" mất style của AT */}
      <style jsx global>{`
        .atEQPOIVFSDFSDG-voucher-main {
          font-family: sans-serif !important;
          width: 100% !important;
        }
        .atEQPOIVFSDFSDG-container {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 auto !important;
        }
      `}</style>
    </div>
  );
}