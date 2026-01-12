import { NextResponse } from "next/server";

// 2 Endpoint khác nhau
const AT_GENERAL_URL = "https://api.accesstrade.vn/v1/offers_informations"; // Cho Tiki/Lazada
const AT_COUPON_URL = "https://api.accesstrade.vn/v1/offers_informations/coupon"; // Cho Shopee
const AT_DATAFEED_URL = "https://api.accesstrade.vn/v1/datafeeds";

/**
 * CẤU HÌNH ĐỊNH TUYẾN CHUẨN 2026
 * - Shopee: Dùng API Coupon + ID số.
 * - Tiki: Dùng API General + ID chữ (login_name) để ổn định nhất.
 */
const MERCHANT_CONFIG: Record<string, any> = {
  shopee: {
    endpoint: AT_COUPON_URL,
    id: "4742147753565840242", // ID số của Shopee
    paramName: "merchant_id",   // API Coupon dùng merchant_id
  },
};

export async function GET(request: Request) {
  try {
    const apiKey = process.env.ACCESSTRADE_ACCESS_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // --- 1. SẢN PHẨM (DATAFEED) ---
    if (type === 'product') {
      const keyword = searchParams.get('keyword') || '';
      const domain = searchParams.get('domain') || 'shopee.vn';
      
      const res = await fetch(
        `${AT_DATAFEED_URL}?domain=${domain}&keyword=${encodeURIComponent(keyword)}&limit=12`,
        {
          headers: { Authorization: `Token ${apiKey}` },
          cache: 'no-store'
        }
      );
      const data = await res.json();
      return NextResponse.json(data);
    }

    // --- 2. MÃ GIẢM GIÁ & ƯU ĐÃI (HYBRID LOGIC) ---
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 20;
    const frontendMerchant = searchParams.get('merchant') || 'all';

    let apiUrl = '';

    const config = MERCHANT_CONFIG[frontendMerchant];

    if (frontendMerchant === 'all' || !config) {
      // Nếu chọn tất cả -> Dùng API chung
      apiUrl = `${AT_COUPON_URL}?status=1&page=${page}&limit=${limit}`;
    } else {
      // logic tách biệt cho từng sàn để tránh bị "loạn" dữ liệu
      const baseUrl = config.endpoint;
      
      if (frontendMerchant === 'shopee') {
        // Shopee: Gọi API Coupon
        apiUrl = `${baseUrl}?${config.paramName}=${config.id}&page=${page}&limit=${limit}`;
      } else {
        // Tiki: Gọi API General (thêm status=1 để lấy campaign đang chạy)
        apiUrl = `${baseUrl}?${config.paramName}=${config.id}&status=1&page=${page}&limit=${limit}`;
      }
    }

    const res = await fetch(apiUrl, {
      headers: { 
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      return NextResponse.json({ error: `AT API responded with ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}