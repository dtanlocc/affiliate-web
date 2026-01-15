"use client";
import { useState } from "react";
import Image from "next/image";
// import { cn } from "@/lib/utils"; // Nếu chưa có hàm cn thì dùng `className` thường cũng được

interface GalleryProps {
  images: string[];
  mainImage: string;
  name: string;
}

export default function ProductGallery({ images, mainImage, name }: GalleryProps) {
  // Gộp ảnh chính vào list ảnh (nếu chưa có) để hiển thị đủ
  const allImages = [mainImage, ...images].filter((v, i, a) => a.indexOf(v) === i).slice(0, 5);
  const [activeImg, setActiveImg] = useState(allImages[0]);

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      {/* Ảnh lớn Main */}
      <div className="relative aspect-square bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group">
        <Image 
            src={activeImg} 
            alt={name} 
            fill 
            className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
            priority // Load ảnh này trước tiên cho LCP (Largest Contentful Paint) tốt
            unoptimized={true}
        />
      </div>

      {/* List ảnh nhỏ Thumbnail */}
      <div className="grid grid-cols-5 gap-2">
        {allImages.map((img, idx) => (
            <button 
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImg === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent hover:border-gray-300'}`}
            >
                <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" unoptimized={true}/>
            </button>
        ))}
      </div>
    </div>
  );
}