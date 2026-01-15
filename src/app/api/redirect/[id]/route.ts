// src/app/api/redirect/[id]/route.ts
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let targetUrl = "/"; // Mặc định về trang chủ nếu lỗi

  try {
    const product = await prisma.product.findUnique({
      where: { itemid: BigInt(id) },
      select: { 
        itemid: true, 
        shopid: true, 
        affiliate_link: true 
      }
    });

    if (product) {
      if (product.affiliate_link) {
        targetUrl = product.affiliate_link;
      } else {
        targetUrl = `https://shopee.vn/product/${product.shopid}/${product.itemid}`;
      }
    }
  } catch (error) {
    console.error("Database Query Error:", error);
    // Vẫn tiếp tục để targetUrl = "/"
  }

  // QUAN TRỌNG: Gọi redirect ở NGOÀI khối try...catch
  return redirect(targetUrl);
}