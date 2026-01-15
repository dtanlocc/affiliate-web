import { prisma } from "@/lib/db";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts"; 
import { notFound } from "next/navigation";
import { Star, ShoppingCart, ShieldCheck, Truck, Home } from "lucide-react";
import Link from "next/link";

const formatVND = (price: number | any) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price));
};

export const revalidate = 3600; 



export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  

  // 1. Kiểm tra ID hợp lệ (Chỉ số mới được qua)
  if (!id || !/^\d+$/.test(id)) {
    return notFound();
  }

  // 2. Query Database
  const product = await prisma.product.findUnique({
    where: { 
        itemid: BigInt(id) // Prisma tự xử lý mapping vào bảng "Product" nhờ bước 1
    }
  });

  if (!product) {
    return notFound();
  }

  const redirectUrl = `/api/redirect/${product.itemid.toString()}`;

  // 3. Mapping dữ liệu hiển thịmt-auto
  let mainImage = product.image || "";
  if (mainImage && !mainImage.startsWith('http')) {
      mainImage = `https://down-vn.img.susercontent.com/file/${mainImage}`;
  }

  let gallery: string[] = [];
  try {
    // Ép kiểu JSON sang mảng
    const rawImages = product.images as unknown as string[]; 
    if (Array.isArray(rawImages)) {
        gallery = rawImages.map((img) => {
            if (!img.startsWith('http')) return `https://down-vn.img.susercontent.com/file/${img}`;
            return img;
        });
    } else {
        gallery = [mainImage];
    }
  } catch (e) { gallery = [mainImage]; }

  const buyLink = product.affiliate_link || `https://shopee.vn/product/${product.shopid}/${product.itemid}`;
  const isMall = (product.seller_flag as any)?.name === 'OFFICIAL_SHOP';
  const priceNum = Number(product.price);
  const originalPriceNum = product.original_price ? Number(product.original_price) : 0;

  let discount = product.discount_text;
  if (!discount && originalPriceNum > priceNum) {
      discount = `-${Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)}%`;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="container max-w-6xl mx-auto px-4 py-6">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-2 overflow-hidden whitespace-nowrap">
           <Link href="/" className="hover:text-blue-600 shrink-0 flex items-center gap-1">
             <Home size={14} /> Trang chủ
           </Link> 
           <span>/</span> 
           <span className="truncate text-gray-800 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            {/* Ảnh */}
            <div className="md:col-span-5">
                <ProductGallery images={gallery} mainImage={mainImage} name={product.name} />
            </div>

            {/* Thông tin */}
            <div className="md:col-span-7 flex flex-col">
                {isMall && <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-2">Shopee Mall</span>}
                <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-4 line-clamp-3 leading-snug">{product.name}</h1>
                
                <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-6">
                    <div className="flex items-center text-yellow-500 gap-1">
                        <span className="font-bold text-black border-b border-black">{product.rating_value || 5.0}</span>
                        <Star size={16} fill="currentColor" />
                    </div>
                    <div className="h-4 w-[1px] bg-gray-300"></div>
                    <div className="text-gray-600 text-sm">Đã bán <span className="font-bold text-black">{product.sold_count_value || 0}</span></div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-8 flex items-end gap-3 border border-gray-100">
                    <span className="text-3xl font-bold text-red-600">{formatVND(priceNum)}</span>
                    {originalPriceNum > 0 && <span className="text-gray-400 line-through mb-1 text-sm">{formatVND(originalPriceNum)}</span>}
                    {discount && <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-2">{discount} GIẢM</span>}
                </div>

                <div className="mt-auto">
                    <a href={redirectUrl}  target="_blank" rel="nofollow noreferrer" className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg">
                        <ShoppingCart size={24}/> Mua Ngay Trên Shopee
                    </a>

                    <p className="text-[10px] text-center text-gray-400 mt-2 italic">
                      * Bạn sẽ được chuyển hướng an toàn đến trang đối tác Shopee
                    </p>
                </div>
            </div>
        </div>

        {/* Gợi ý */}
        <div className="mt-10">
             <RelatedProducts currentId={product.itemid.toString()} />
        </div>
      </div>
    </div>
  );
}