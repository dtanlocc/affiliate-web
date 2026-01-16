"use client";

import { useEffect } from "react";

export default function AccesstradeWidget() {

  useEffect(() => {
    // Hàm nạp script thủ công để đảm bảo thứ tự
    const loadScript = (src: string, id: string, attrs: Record<string, string> = {}) => {
      return new Promise((resolve) => {
        if (document.getElementById(id)) return resolve(true);

        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.async = false; // Chạy tuần tự

        Object.keys(attrs).forEach((key) => {
          script.setAttribute(key, attrs[key]);
        });

        script.onload = () => resolve(true);
        document.body.appendChild(script);
      });
    };

    const init = async () => {
      // 1. Nạp jQuery
      if (!(window as any).jQuery) {
        await loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js", "at-jquery");
      }

      // 2. Nạp thư viện phụ
      await loadScript("https://static.accesstrade.vn/coupon/v2/js/popper.min.js", "at-popper");
      await loadScript("https://static.accesstrade.vn/coupon/v2/js/bootstrap.min.js", "at-bootstrap");
      await loadScript("https://static.accesstrade.vn/coupon/v2/js/slick/slick.min.js", "at-slick");

      // 3. Nạp Script Chính (Với thông số chính xác từ file mẫu của bạn)
      // Lưu ý: data-filters giữ nguyên dấu phẩy lạ lạ của họ
      await loadScript(
        "https://static.accesstrade.vn/coupon/v2/js/main_at_v3.js",
        "atScript6626",
        {
          "data-sub1": "",
          "data-sub2": "",
          "data-sub3": "",
          "data-sub4": "",
          "data-sub5": "",
          "data-utm-source": "",
          "data-utm-medium": "",
          "data-utm-campaign": "",
          "data-utm-content": "",
          "data-style-color": "#fff",
          "data-limit": "10",
          "data-row": "2",
          "data-filters": '{"merchant":",4742147753565840242","category":"E-COMMERCE,","campaign":""}',
          "data-accesskey": "6883468076645991879" // Key cứng của bạn
        }
      );
    };

    // Delay nhẹ 500ms để đảm bảo HTML đã vẽ xong mới nạp script
    setTimeout(init, 500);

    // Cleanup
    return () => {
      const s = document.getElementById("atScript6626");
      if (s) s.remove();
    };
  }, []);

  // HTML GỐC TỪ ACCESSTRADE (Không sửa đổi class, id)
  const widgetHtml = `
    <div id="layout-wrapper">
      <main class="atEQPOIVFSDFSDG-voucher-main">
        <div class="fa-3x">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
        <div class="atEQPOIVFSDFSDG-container" style="display: none">
            <div class="atEQPOIVFSDFSDG-first-block">
              <div class='atEQPOIVFSDFSDG-search'></div>
              <div class='atEQPOIVFSDFSDG-filter-keyword'>
                  <ul class='atEQPOIVFSDFSDG-tags'>
                  </ul>
              </div>
            </div>
            <div class="atEQPOIVFSDFSDG-second-block">
              <div class="atEQPOIVFSDFSDG-title-tabs"></div>
              <div class='atEQPOIVFSDFSDG-filters-and-delete-search'></div>
              <div class='atEQPOIVFSDFSDG-voucher-dealcoupon'></div>
            </div>
        </div>
      </main>
    </div>
  `;

  return (
    <div className="bg-white p-4 rounded-xl min-h-[600px]">
        {/* CSS Ngoài */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="https://static.accesstrade.vn/coupon/v2/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="https://static.accesstrade.vn/coupon/v2/css/css-voucher.css" />
        <link rel="stylesheet" type="text/css" href="https://static.accesstrade.vn/coupon/v2/js/slick/slick.css" />
        <link rel="stylesheet" type="text/css" href="https://static.accesstrade.vn/coupon/v2/js/slick/slick-theme.css" />

        {/* Ép render HTML thuần */}
        <div dangerouslySetInnerHTML={{ __html: widgetHtml }} />
    </div>
  );
}