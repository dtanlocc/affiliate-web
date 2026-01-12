// src/components/layout/Header.tsx
"use client";
import Link from "next/link";
import { Search, Menu, ShoppingBag, Bell, X, ChevronDown, ChevronRight, Flame, ThumbsUp, TrendingUp, BookOpen } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State để quản lý việc mở/đóng các mục con trong menu mobile
  // expandedMenu = 'products' nghĩa là đang mở mục Sản phẩm tốt
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
        router.push(`/search?q=${keyword}`);
        setIsMobileMenuOpen(false); // Tìm xong đóng menu luôn
    }
  };

  // Hàm toggle mở/đóng menu con
  const toggleSubMenu = (menuName: string) => {
    if (expandedMenu === menuName) {
        setExpandedMenu(null); // Đang mở thì đóng lại
    } else {
        setExpandedMenu(menuName); // Chưa mở thì mở ra
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white sticky top-0 z-50 shadow-lg">
        {/* ... (Phần Header chính giữ nguyên như cũ) ... */}
        <div className="max-w-6xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4 transition-all">
           {/* Logo */}
           <Link href="/" className="flex flex-col leading-none group shrink-0">
            <span className="text-2xl font-black tracking-tighter italic flex items-center gap-1">
              <ShoppingBag className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              SANMA<span className="text-yellow-300">NHANH</span>
            </span>
          </Link>

           {/* Search Desktop */}
           <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xl relative group">
             <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="w-full h-10 pl-5 pr-12 rounded-full text-gray-800 bg-white focus:outline-none"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
             />
             <button type="submit" className="absolute right-1 top-1 h-8 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white"><Search size={16}/></button>
          </form>

           <div className="flex items-center gap-3 shrink-0">
              <button className="relative hover:bg-white/20 p-2 rounded-full"><Bell size={20}/></button>
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-1">
                <Menu size={28} />
              </button>
           </div>
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY (Nâng cấp) --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] animate-in fade-in" onClick={() => setIsMobileMenuOpen(false)}/>
      )}

      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header của Menu Mobile */}
        <div className="p-4 flex items-center justify-between bg-blue-600 text-white shrink-0">
            <span className="font-bold text-lg flex items-center gap-2"><Menu size={20}/> Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-blue-700 rounded"><X size={24}/></button>
        </div>

        {/* Nội dung Menu (Có cuộn dọc) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {/* 1. Mobile Search */}
            <form onSubmit={handleSearch}>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Tìm sản phẩm, mã giảm giá..." 
                        className="w-full border rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button className="absolute right-3 top-3 text-gray-400"><Search size={20}/></button>
                </div>
            </form>

            {/* 2. Danh sách Link */}
            <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Khám phá</p>
                
                {/* Link thường */}
                <Link href="/coupons" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition">
                    <Flame size={20} className="text-orange-500"/> Mã Giảm Giá HOT
                </Link>

                {/* --- MENU ĐA CẤP: SẢN PHẨM TỐT --- */}
                <div>
                    <button 
                        onClick={() => toggleSubMenu('products')}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-lg font-medium transition ${expandedMenu === 'products' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        <div className="flex items-center gap-3">
                            <ThumbsUp size={20} className="text-blue-500"/> Sản Phẩm Tốt
                        </div>
                        <ChevronDown size={18} className={`transition-transform duration-300 ${expandedMenu === 'products' ? 'rotate-180' : ''}`}/>
                    </button>
                    
                    {/* Danh sách con (Chỉ hiện khi expanded) */}
                    <div className={`overflow-hidden transition-all duration-300 ${expandedMenu === 'products' ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                        <div className="pl-10 pr-2 space-y-1 border-l-2 border-gray-100 ml-5">
                            <Link href="/products/top-picks?cat=female" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm text-gray-600 hover:text-blue-600">Thời trang Nữ</Link>
                            <Link href="/products/top-picks?cat=male" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm text-gray-600 hover:text-blue-600">Thời trang Nam</Link>
                            <Link href="/products/top-picks?cat=party" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm text-gray-600 hover:text-blue-600">Set đi tiệc</Link>
                            <Link href="/products/top-picks?cat=beauty" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm text-gray-600 hover:text-blue-600">Mỹ phẩm & Beauty</Link>
                            <Link href="/products/top-picks" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-blue-600">Xem tất cả</Link>
                        </div>
                    </div>
                </div>
                {/* ------------------------------------- */}

                <Link href="/products/trending" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition">
                    <TrendingUp size={20} className="text-purple-500"/> Trending & Idol
                </Link>

                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition">
                    <BookOpen size={20} className="text-green-500"/> Bài viết Review
                </Link>
            </div>
            
            {/* 3. Link Sàn (Nằm riêng) */}
             <div className="space-y-1 pt-4 border-t">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Mã theo sàn</p>
                <Link href="/platform/shopee" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition">
                    Shopee <ChevronRight size={16} className="text-gray-300"/>
                </Link>
                <Link href="/platform/tiktok" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 transition">
                    TikTok Shop <ChevronRight size={16} className="text-gray-300"/>
                </Link>
                <Link href="/platform/lazada" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition">
                    Lazada <ChevronRight size={16} className="text-gray-300"/>
                </Link>
             </div>

            {/* 4. Nút Zalo CTA */}
            <div className="pt-4">
                <a 
                    href="https://zalo.me/g/demo" 
                    target="_blank"
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center font-bold py-3 rounded-xl hover:shadow-lg transition transform active:scale-95"
                >
                    Tham Gia Nhóm Zalo
                </a>
            </div>
        </div>
      </div>
    </>
  );
}