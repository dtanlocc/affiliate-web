// src/components/layout/SecondaryNav.tsx
"use client";

import Link from "next/link";
import { Flame, ThumbsUp, TrendingUp, MessageSquare, BookOpen, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

// Định nghĩa kiểu dữ liệu cho Menu
type NavItem = {
  label: string;
  href: string;
  icon: any;
  isExternal?: boolean;
  // Thêm trường này để chứa menu con
  subColumns?: {
    title: string; // Tên cột (VD: Thời Trang)
    items: { name: string; href: string }[]; // Các link con
  }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Mã Giảm Giá", href: "/coupons", icon: Flame },
  
  // --- MỤC CÓ DROPDOWN ---
  { 
    label: "Sản Phẩm Tốt", 
    href: "/products/top-picks", 
    icon: ThumbsUp,
    subColumns: [
      {
        title: "Thời Trang Trendy",
        items: [
          { name: "Thời trang Nam", href: "/products/top-picks?cat=male" },
          { name: "Thời trang Nữ", href: "/products/top-picks?cat=female" },
          { name: "Set đi tiệc", href: "/products/top-picks?cat=party" },
          { name: "Style Tổng Tài", href: "/products/top-picks?tag=tong-tai" },
          { name: "Style Nàng Thơ", href: "/products/top-picks?tag=nang-tho" },
          { name: "Style Đường Phố", href: "/products/top-picks?tag=streetwear" },
        ]
      },
      {
        title: "Mỹ Phẩm & Beauty",
        items: [
          { name: "Skincare (Da mặt)", href: "/products/top-picks?cat=skincare" },
          { name: "Makeup (Trang điểm)", href: "/products/top-picks?cat=makeup" },
          { name: "Son môi Hot", href: "/products/top-picks?tag=lipstick" },
          { name: "Kem chống nắng", href: "/products/top-picks?tag=sunscreen" },
        ]
      }
    ]
  },
  // -----------------------

  { label: "Trending & Idol", href: "/products/trending", icon: TrendingUp },
  { label: "Group Zalo", href: "https://zalo.me/g/your-zalo-group-link", icon: MessageSquare, isExternal: true },
  { label: "Bài Viết Mới", href: "/blog", icon: BookOpen },
];

export default function SecondaryNav() {
  const pathname = usePathname();

  return (
    // Lưu ý: overflow-visible để dropdown không bị cắt mất
    <nav className="hidden md:block bg-white border-b border-gray-200 sticky top-16 md:top-20 z-40">
      <div className="max-w-6xl mx-auto px-4  w-full">
        {/* Container menu */}
        <div className="flex items-center justify-center gap-8 h-12 overflow-visible">
          
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href && !item.isExternal;
            const hasDropdown = item.subColumns && item.subColumns.length > 0;

            return (
              <div key={item.label} className="relative group h-full flex items-center">
                
                {/* 1. Link chính */}
                <Link
                  href={item.href}
                  target={item.isExternal ? "_blank" : "_self"}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors relative z-10
                    ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'}
                  `}
                >
                  <item.icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'} />
                  {item.label}
                  {/* Mũi tên chỉ xuống nếu có menu con */}
                  {hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300"/>}
                </Link>

                {/* 2. Dropdown Menu (Chỉ hiện khi Hover) */}
                {hasDropdown && (
                  <div className="absolute top-full left-0 w-[500px] bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 p-6 overflow-hidden z-50 hidden md:block">
                    {/* Mũi tên nhỏ trỏ lên trên cho đẹp */}
                    <div className="absolute -top-1.5 left-10 w-3 h-3 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
                    
                    <div className="grid grid-cols-2 gap-8 relative">
                      {item.subColumns?.map((col, idx) => (
                        <div key={idx}>
                          {/* Tiêu đề cột (Thời trang/Mỹ phẩm) */}
                          <h4 className="font-black text-gray-800 uppercase text-xs mb-3 tracking-wider border-b pb-2 border-gray-100">
                            {col.title}
                          </h4>
                          {/* Danh sách link con */}
                          <ul className="space-y-2">
                            {col.items.map((subItem) => (
                              <li key={subItem.name}>
                                <Link 
                                  href={subItem.href}
                                  className="text-sm text-gray-500 hover:text-blue-600 hover:translate-x-1 transition-all inline-block hover:font-medium"
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Banner nhỏ dưới dropdown (Quảng cáo thêm - Optional) */}
                    <div className="mt-4 pt-3 border-t border-dashed border-gray-100 text-xs text-blue-500 font-medium bg-blue-50/50 p-2 rounded text-center">
                       🔥 Đang có mã giảm giá 50% cho Thời Trang Nữ!
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}