// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { Search, Menu, ShoppingBag, Bell, X, ChevronDown, ChevronRight, TrendingUp, Gift } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/config/site"; 

// Danh sách từ khóa
const HOT_KEYWORDS = [
    "Đồ đi biển", "Váy trễ vai", "Váy dự tiệc", "Đồ ngủ", "Áo quần tết"
];

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null); 
  const router = useRouter();

  const handleSearch = (e: React.FormEvent, searchKey?: string) => {
    if (e) e.preventDefault();
    const key = searchKey || keyword;
    if (key.trim()) {
        router.push(`/search?q=${key}`);
        setIsMobileMenuOpen(false);
        setKeyword(key);
    }
  };

  const toggleSubMenu = (label: string) => {
      if (expandedMenu === label) setExpandedMenu(null);
      else setExpandedMenu(label);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white sticky top-0 z-50 shadow-lg pt-2 pb-1 md:pt-4 md:pb-0 transition-all border-b-4 border-yellow-400">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start justify-between gap-4 md:gap-8 h-auto min-h-[64px]">
             
             {/* Logo */}
             <Link href="/" className="flex flex-col leading-none group shrink-0 mt-1 md:mt-2">
              <span className="text-2xl font-black tracking-tighter italic flex items-center gap-1">
                <ShoppingBag className="w-7 h-7 text-yellow-300 fill-yellow-300" />
                <span className="text-white drop-shadow-md">SANMA</span>
                <span className="text-yellow-300 drop-shadow-md">NHANH</span>
              </span>
              <span className="text-[10px] text-yellow-100 font-medium tracking-widest hidden sm:block uppercase">
                Khai Xuân Như Ý - Săn Sale Hết Ý
              </span>
            </Link>

             {/* Search Desktop */}
             <div className="flex-1 max-w-xl hidden md:block relative group">
                <form onSubmit={handleSearch} className="relative z-10">
                   <input 
                      type="text" 
                      placeholder="Tìm lì xì, quần áo tết, quà tặng..." 
                      className="w-full h-10 pl-5 pr-14 rounded-full text-red-900 bg-white border-2 border-transparent focus:border-yellow-400 focus:outline-none shadow-sm placeholder:text-red-300"
                      value={keyword} onChange={(e) => setKeyword(e.target.value)}
                      suppressHydrationWarning={true} // <--- QUAN TRỌNG
                   />
                   <button 
                      type="submit" 
                      suppressHydrationWarning={true} // <--- QUAN TRỌNG: FIX LỖI Ở ĐÂY
                      className="absolute right-1 top-1 h-8 w-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-red-700 hover:scale-105 transition shadow-sm"
                    >
                      <Search size={18} strokeWidth={3}/>
                   </button>
                </form>

                {/* --- PHẦN GỢI Ý (DESKTOP) --- */}
                <div className="flex gap-3 mt-1.5 text-xs text-yellow-100 overflow-hidden whitespace-nowrap">
                    <span className="opacity-80 flex items-center gap-1"><TrendingUp size={12}/> Gợi ý:</span>
                    {HOT_KEYWORDS.map((k, idx) => (
                        <button 
                            key={idx} 
                            onClick={(e) => handleSearch(e, k)}
                            suppressHydrationWarning={true} // <--- QUAN TRỌNG: FIX LỖI Ở ĐÂY
                            className="hover:text-yellow-300 hover:underline cursor-pointer transition-colors"
                        >
                            {k}
                        </button>
                    ))}
                </div>
             </div>

             {/* Icons */}
             <div className="flex items-center gap-3 mt-1 md:mt-2">
                <button 
                    className="relative p-2 rounded-full hover:bg-white/10" 
                    suppressHydrationWarning={true} // <--- QUAN TRỌNG
                >
                    <Gift 
            size={24} 
            className="text-yellow-300 group-hover:text-white transition-colors group-hover:animate-bounce" 
            strokeWidth={2.5}
        />
                    <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-yellow-400 border-2 border-red-600 rounded-full animate-pulse"></span>
                </button>
                <button 
                    onClick={() => setIsMobileMenuOpen(true)} 
                    className="md:hidden p-1" 
                    suppressHydrationWarning={true} // <--- QUAN TRỌNG
                >
                  <Menu size={28} />
                </button>
             </div>
          </div>
        </div>
      </header>

      {/* ... Phần Mobile Menu bên dưới giữ nguyên (nhớ thêm suppressHydrationWarning vào các input/button trong đó nếu cần) ... */}
      
      {/* --- MOBILE DRAWER --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60]" onClick={() => setIsMobileMenuOpen(false)}/>
      )}

      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between bg-red-600 text-white shrink-0">
            <span className="font-bold text-lg flex items-center gap-2"><Menu size={20}/> Menu Tết</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-red-700 rounded"><X size={24}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {/* Mobile Search */}
            <div>
                <form onSubmit={handleSearch} className="relative">
                    <input 
                        type="text" placeholder="Tìm kiếm..." 
                        className="w-full border rounded-lg px-4 py-3 bg-red-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none text-gray-800"
                        value={keyword} onChange={(e) => setKeyword(e.target.value)}
                        suppressHydrationWarning={true}
                    />
                    <button className="absolute right-3 top-3 text-red-400"><Search size={20}/></button>
                </form>
                {/* --- PHẦN GỢI Ý (MOBILE) --- */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {HOT_KEYWORDS.slice(0, 4).map((k, idx) => (
                        <button 
                            key={idx}
                            onClick={(e) => handleSearch(e, k)}
                            suppressHydrationWarning={true}
                            className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded border border-red-100 hover:bg-red-100"
                        >
                            {k}
                        </button>
                    ))}
                </div>
            </div>

            {/* Danh sách Link */}
            <div className="space-y-1">
                {NAV_ITEMS.map((item, idx) => {
                    if (item.children) {
                        const isExpanded = expandedMenu === item.label;
                        return (
                            <div key={idx} className="border-b border-gray-100 last:border-0 pb-1">
                                <button 
                                    onClick={() => toggleSubMenu(item.label)}
                                    suppressHydrationWarning={true}
                                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg font-medium transition-colors ${isExpanded ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} className={item.color}/> {item.label}
                                    </div>
                                    <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}/>
                                </button>
                                
                                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                    <div className="pl-4 pr-2 space-y-1 bg-gray-50/50 rounded-lg py-2 mx-2">
                                        {item.children.map((sub, subIdx) => {
                                            const SubIcon = (sub as any).icon;
                                            return (
                                                <Link 
                                                    key={subIdx}
                                                    href={sub.href} 
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                                                >
                                                    {SubIcon && <SubIcon size={16} className={(sub as any).color} />}
                                                    {sub.label}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return (
                        <Link 
                            key={idx}
                            href={item.href} 
                            target={item.isExternal ? "_blank" : "_self"}
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="flex items-center justify-between px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-red-50 hover:text-red-600 transition border-b border-gray-100 last:border-0"
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className={item.color}/> {item.label}
                            </div>
                            {!item.isExternal && <ChevronRight size={16} className="text-gray-300"/>}
                        </Link>
                    );
                })}
            </div>
            
            <div className="pt-4">
                <a href="https://zalo.me/g/wydidr139" target="_blank" className="block w-full bg-red-600 text-white text-center font-bold py-3 rounded-xl hover:bg-red-700 shadow-lg shadow-red-200">
                    Vào Nhóm Săn Sale
                </a>
            </div>
        </div>
      </div>
    </>
  );
}