// src/app/api/accesstrade/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiKey = process.env.ACCESSTRADE_ACCESS_KEY;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 40;

    const SHOPEE_ID = "4742147753565840242";
    const apiUrl = `https://api.accesstrade.vn/v1/offers_informations/coupon?merchant=${SHOPEE_ID}&page=${page}&limit=${limit}`;

    const res = await fetch(apiUrl, {
      headers: { "Authorization": `Token ${apiKey}` },
      cache: 'no-store'
    });

    const result = await res.json();
    const rawData = result.data || [];

    // BỘ LỌC 3 LỚP: Đảm bảo 100% là Shopee và có Link Affiliate
    const cleanData = rawData.filter((item: any) => {
      const finalLink = (item.aff_link || "").toLowerCase();
      // Phải có link isclix (affiliate) và link gốc phải dẫn về shopee.vn
      return finalLink.includes('isclix.com') && finalLink.includes('shopee.vn');
    });

    return NextResponse.json({
      data: cleanData,
      total: result.count || cleanData.length
    });

  } catch (error: any) {
    return NextResponse.json({ data: [], total: 0 }, { status: 500 });
  }
}