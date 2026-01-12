// src/data/mockData.ts

// Bộ ảnh này lấy từ các ID ảnh "kinh điển" trên Unsplash, đảm bảo không bị lỗi 404
export const MOCK_PRODUCTS = [
  { 
    id: 1, 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop", 
    name: "Giày Nike Air Max Đỏ - Phong cách thể thao", 
    price: "2.500.000đ", discount: "30%", sold: 5.2, tags: ['men', 'shoes'], label: 'Best Seller' 
  },
  { 
    id: 2, 
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=400&auto=format&fit=crop", 
    name: "Áo Cardigan Len Trắng - Phong cách Hàn Quốc", 
    price: "120.000đ", discount: "50%", sold: 12.5, tags: ['women', 'fashion'], label: 'Viral' 
  },
  { 
    id: 3, 
    image: "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=400&auto=format&fit=crop", 
    name: "Serum dưỡng da Vitamin C - Sáng da mờ thâm", 
    price: "350.000đ", discount: "10%", sold: 20.1, tags: ['beauty', 'skincare'], label: 'Bác sĩ khuyên dùng' 
  },
  { 
    id: 4, 
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop", 
    name: "Tai Nghe Chụp Tai Sony - Chống ồn chủ động", 
    price: "1.890.000đ", discount: "25%", sold: 8.9, tags: ['tech'], label: 'Idol Pick' 
  },
  { 
    id: 5, 
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop", 
    name: "Áo Khoác Bomber Nam Xanh Navy", 
    price: "350.000đ", discount: "15%", sold: 1.2, tags: ['men'], label: '' 
  },
  { 
    id: 6, 
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=400&auto=format&fit=crop", 
    name: "Đầm Dạ Hội Xẻ Tà - Thiết kế sang trọng", 
    price: "450.000đ", discount: "5%", sold: 3.5, tags: ['women', 'party'], label: 'Tiệc' 
  },
  { 
    id: 7, 
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop", 
    name: "Son Kem Lì Đỏ Rượu Vang", 
    price: "199.000đ", discount: "40%", sold: 15.0, tags: ['beauty', 'makeup'], label: 'Viral' 
  },
  { 
    id: 8, 
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062dc?q=80&w=400&auto=format&fit=crop", 
    name: "Kem Chống Nắng Vật Lý - Dành cho da nhạy cảm", 
    price: "320.000đ", discount: "0%", sold: 9.0, tags: ['beauty'], label: '' 
  },
];