import { 
  Flame, ThumbsUp, TrendingUp, MessageSquare, BookOpen, 
  Shirt, Briefcase, PartyPopper, Zap, User, 
  Sparkles, Palette, Heart, Sun, Baby
} from "lucide-react";

export const NAV_ITEMS = [
  { 
    label: "Mã Giảm Giá", 
    href: "/coupons", 
    icon: Flame,
    color: "text-orange-500" 
  },
  { 
    label: "Đồ Xịn Giá Xinh", 
    href: "/products/top-picks", 
    icon: ThumbsUp,
    color: "text-blue-600",
    children: [
        // --- THỜI TRANG ---
        { label: "Thời trang Nam", href: "/style/nam-tinh", icon: User, color: "text-slate-600" },
        { label: "Thời trang Nữ", href: "/style/nang-tho", icon: Shirt, color: "text-pink-500" },
        { label: "Style Tổng Tài", href: "/style/tong-tai", icon: Briefcase, color: "text-slate-800" },
        { label: "Set đi tiệc", href: "/style/tiec", icon: PartyPopper, color: "text-purple-500" },
        { label: "Style Đường Phố", href: "/style/duong-pho", icon: Zap, color: "text-yellow-500" },
        
        // --- MỸ PHẨM ---
        { label: "Skincare", href: "/style/skincare", icon: Sparkles, color: "text-cyan-500" },
        { label: "Makeup", href: "/style/makeup", icon: Palette, color: "text-rose-500" },
        // { label: "Son môi Hot", href: "/style/son", icon: Heart, color: "text-red-500" },
        { label: "Chống nắng", href: "/style/kem-chong-nang", icon: Sun, color: "text-orange-400" },
    ]
  },
  { 
    label: "DỄ THƯƠNG - CUTE", 
    href: "https://collshp.com/kiencag", // <--- LINK MỚI CỦA BẠN
    icon: Baby, 
    color: "text-purple-600",
    isExternal: true // <--- QUAN TRỌNG: Để mở tab mới
  },
  { 
    label: "Bài Viết Mới", 
    href: "/blog", 
    icon: BookOpen,
    color: "text-green-600"
  },
  { 
    label: "Group Zalo", 
    href: "https://zalo.me/g/wydidr139", 
    icon: MessageSquare, 
    isExternal: true,
    color: "text-blue-500"
  },
];