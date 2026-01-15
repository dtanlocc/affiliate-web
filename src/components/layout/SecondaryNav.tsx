// src/components/layout/SecondaryNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/config/site";

export default function SecondaryNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block bg-white border-b border-gray-200 sticky top-16 md:top-[85px] z-40 transition-all">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center gap-8 h-12 overflow-visible">
          
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href && !item.isExternal;
            const hasDropdown = item.children && item.children.length > 0;

            return (
              <div key={item.label} className="relative group h-full flex items-center">
                <Link
                  href={item.href}
                  target={item.isExternal ? "_blank" : "_self"}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all
                    ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}
                  `}
                >
                  <item.icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'} />
                  {item.label}
                  {hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-gray-400"/>}
                </Link>

                {/* Dropdown Menu có Icon */}
                {hasDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-4 group-hover:translate-y-2 p-6 z-50">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {item.children?.map((sub, idx) => {
                        const SubIcon = (sub as any).icon;
                        return (
                            <Link 
                                key={idx} 
                                href={sub.href}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group/sub"
                            >
                                {SubIcon && (
                                    <div className="p-2 bg-gray-50 rounded-lg group-hover/sub:bg-white transition-colors">
                                        <SubIcon size={18} className={(sub as any).color} />
                                    </div>
                                )}
                                <span className="font-medium">{sub.label}</span>
                            </Link>
                        )
                      })}
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