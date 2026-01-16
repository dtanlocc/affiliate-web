"use client";

import { useEffect, useState } from "react";

export default function AccesstradeVoucher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const loadScript = (src: string, id?: string, attrs?: Record<string, string>) => {
      return new Promise((resolve) => {
        // Nếu script đã tồn tại thì không nạp lại
        if (id && document.getElementById(id)) return resolve(true);
        
        const script = document.createElement("script");
        script.src = src;
        if (id) script.id = id;
        script.async = false; // QUAN TRỌNG: Ép trình duyệt chạy xong file này mới chạy file sau
        
        if (attrs) {
          Object.keys(attrs).forEach(key => script.setAttribute(key, attrs[key]));
        }

        script.onload = () => resolve(true);
        script.onerror = () => resolve(true); // Vẫn tiếp tục nếu 1 file lỗi nhẹ
        document.body.appendChild(script);
      });
    };

    const initAT = async () => {
      // 1. Nạp jQuery từ CDN của Google để tránh bị Adblock và lỗi Preload
      await loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
      
      // 2. Nạp các thư viện của AT
      await loadScript("https://static.accesstrade.vn/coupon/v2/js/popper.min.js");
      await loadScript("https://static.accesstrade.vn/coupon/v2/js/bootstrap.min.js");
      
      // 3. Nạp script chính cuối cùng với đầy đủ thông số bạn cung cấp
      await loadScript("https://static.accesstrade.vn/coupon/v2/js/main_at_v3.js", "atScript6626", {
        "data-sub1": "",
        "data-style-color": "#fff",
        "data-limit": "10",
        "data-row": "2",
        "data-filters": '{"merchant":",4742147753565840242","category":"E-COMMERCE,","campaign":""}',
        "data-accesskey": "" 
      });
    };

    initAT();

    // Dọn dẹp script khi thoát trang để web luôn sạch
    return () => {
      const script = document.getElementById("atScript6626");
      if (script) script.remove();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full bg-white rounded-2xl min-h-[600px]">
      {/* Nạp FontAwesome bắt buộc */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet" />

      <div id="layout-wrapper">
        <main className="atEQPOIVFSDFSDG-voucher-main">
          {/* Spinner lúc chờ load dữ liệu */}
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
              <div className='atEQPOIVFSDFSDG-filters-and-delete-search'></div>
              <div className='atEQPOIVFSDFSDG-voucher-dealcoupon'></div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .atEQPOIVFSDFSDG-voucher-main { font-family: sans-serif !important; width: 100% !important; }
        .atEQPOIVFSDFSDG-container { width: 100% !important; max-width: 100% !important; }
      `}</style>
    </div>
  );
}