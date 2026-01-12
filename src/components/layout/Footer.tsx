// src/components/layout/Footer.tsx
import Link from "next/link";
import { Facebook, Mail, Phone, MapPin, Tag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      {/* Phần chính */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Cột 1: Giới thiệu */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-blue-600 font-black text-xl uppercase tracking-tighter">
              <Tag className="text-yellow-400" /> SanMaNhanh
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Nền tảng tổng hợp mã giảm giá, voucher khuyến mãi tự động từ Shopee, Lazada, Tiki, TikTok Shop. Giúp bạn mua sắm tiết kiệm hơn mỗi ngày.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Cột 2: Hỗ trợ khách hàng */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Về Chúng Tôi</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/blog/ve-chung-toi" className="hover:text-blue-600 transition">Giới thiệu</Link>
              </li>
              <li>
                <Link href="/blog/lien-he" className="hover:text-blue-600 transition">Liên hệ hợp tác</Link>
              </li>
              <li>
                <Link href="/blog/chinh-sach-bao-mat" className="hover:text-blue-600 transition">Chính sách bảo mật</Link>
              </li>
              <li>
                <Link href="/blog/dieu-khoan-su-dung" className="hover:text-blue-600 transition">Điều khoản sử dụng</Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Danh mục nổi bật */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Săn Mã Theo Sàn</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/platform/shopee" className="hover:text-orange-500 transition">Mã Giảm Giá Shopee</Link>
              </li>
              <li>
                <Link href="/platform/lazada" className="hover:text-blue-600 transition">Mã Giảm Giá Lazada</Link>
              </li>
              <li>
                <Link href="/platform/tiktok" className="hover:text-black transition">Mã TikTok Shop</Link>
              </li>
              <li>
                <Link href="/platform/tiki" className="hover:text-blue-400 transition">Mã Giảm Giá Tiki</Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ & Cộng đồng */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Liên Hệ</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="flex-shrink-0 text-blue-600" />
                <span>Tp HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-blue-600" />
                <a href="mailto:contact@sanmanhanh.com" className="hover:text-blue-600">contact@sanmanhanh.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-blue-600" />
                <a href="tel:0912345678" className="hover:text-blue-600">0912.345.678</a>
              </li>
            </ul>
            
            {/* Box tham gia nhóm Zalo - Rất quan trọng để kéo user quay lại */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs font-bold text-blue-800 mb-1">Cộng đồng săn sale Zalo</p>
              <button className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded hover:bg-blue-700 transition">
                Tham gia ngay
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Phần Disclaimer (Bắt buộc phải có để tránh rắc rối pháp lý) */}
      <div className="bg-gray-50 border-t border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400">
            © 2024 SanMaNhanh.com. All rights reserved. <br/>
            *Lưu ý: Chúng tôi không bán hàng trực tiếp. Chúng tôi chỉ tổng hợp mã giảm giá và nhận hoa hồng từ các sàn thương mại điện tử thông qua link tiếp thị liên kết.
          </p>
        </div>
      </div>
    </footer>
  );
}