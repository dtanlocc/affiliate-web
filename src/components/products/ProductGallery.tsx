"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryProps {
  images: string[];
  mainImage: string;
  name: string;
}

export default function ProductGallery({ images, mainImage, name }: GalleryProps) {
  const allImages = Array.from(new Set([mainImage, ...images])).slice(0, 5);
  
  const [activeImg, setActiveImg] = useState(allImages[0]);

  useEffect(() => {
    setActiveImg(mainImage);
  }, [mainImage]);

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      {/* Ảnh Lớn */}
      <div className="relative aspect-square w-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group">
        <Image 
            src={activeImg} 
            alt={name} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
            priority
            unoptimized={true}
        />
      </div>

      {/* List Ảnh Nhỏ */}
      <div className="grid grid-cols-5 gap-2">
        {allImages.map((img, idx) => (
            <button 
                key={idx}
                onMouseEnter={() => setActiveImg(img)}
                onClick={() => setActiveImg(img)}
                // 👇 THÊM DÒNG NÀY ĐỂ FIX LỖI MCAFEE
                suppressHydrationWarning={true} 
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    activeImg === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent hover:border-gray-300'
                }`}
            >
                <Image 
                    src={img} 
                    alt={`Thumb ${idx}`} 
                    fill 
                    sizes="(max-width: 768px) 20vw, 10vw"
                    className="object-cover"
                    unoptimized={true}
                />
            </button>
        ))}
      </div>
    </div>
  );
}