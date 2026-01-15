import Link from "next/link";
import { Facebook, Mail, ShieldCheck, Zap, ArrowRight, Tag, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-slate-300 border-t border-slate-800 mt-auto overflow-hidden">
      {/* Phần Top Footer: Call to Action cho Nhóm Zalo */}
      <div className="bg-blue-600">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
                <Zap size={20} className="text-white fill-white" />
            </div>
            <p className="text-white font-bold text-sm md:text-base">
                Tham gia cộng đồng săn mã "Hỏa Tốc" - Không bỏ lỡ deal hời nào!
            </p>
          </div>
          <a 
            href="https://zalo.me/g/wydidr139"
            target="_blank"
            className="flex items-center gap-2 bg-white text-blue-600 px-6 py-2 rounded-full font-black text-sm hover:bg-blue-50 transition-all shadow-xl active:scale-95 whitespace-nowrap"
          >
            VÀO NHÓM ZALO <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Phần Middle Footer: Nội dung chính */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Cột 1: Thương hiệu */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white font-black text-2xl uppercase tracking-tighter">
              <Tag className="text-blue-500 fill-blue-500" /> SanMaNhanh
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              SanMaNhanh là trợ lý mua sắm thông minh, giúp bạn tự động tìm kiếm và tổng hợp những mã giảm giá tốt nhất từ các sàn TMĐT lớn nhất Việt Nam.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
                { icon: Mail, href: "mailto:contact@sanmanhanh.com", color: "hover:bg-red-500" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  className={`w-10 h-10 flex items-center justify-center bg-slate-800 rounded-xl text-slate-300 ${social.color} hover:text-white transition-all duration-300`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Cột 2: Hỗ trợ */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Về Chúng Tôi</h3>
            <ul className="space-y-4 text-sm">
              {[
                { label: "Giới thiệu", href: "/blog/ve-chung-toi" },
                { label: "Liên hệ hợp tác", href: "/blog/lien-he" },
                { label: "Chính sách bảo mật", href: "/blog/chinh-sach-bao-mat" },
                { label: "Điều khoản sử dụng", href: "/blog/dieu-khoan-su-dung" }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Đối tác sàn */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Săn Mã Theo Sàn</h3>
            <ul className="space-y-4 text-sm">
              {[
                { label: "Shopee Mall", href: "/coupons", color: "hover:text-orange-500" },
                { label: "Lazada Voucher", href: "#", color: "hover:text-blue-500" },
                { label: "TikTok Shop", href: "#", color: "hover:text-white" },
                { label: "Tiki Trading", href: "#", color: "hover:text-cyan-400" }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={`${link.color} transition-colors flex items-center justify-between group`}>
                    {link.label} <ExternalLink size={12} className="opacity-30 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Chứng nhận uy tín */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Uy Tín & Bảo Mật</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                <ShieldCheck className="text-green-500 shrink-0" size={24} />
                <p className="text-xs text-slate-400 leading-snug">
                  Mọi liên kết đều được kiểm tra an toàn trước khi chuyển hướng người dùng.
                </p>
              </div>
              {/* <div className="pt-2">
                 <img 
                    src="https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=200&q=80" 
                    alt="DMCA Protected" 
                    className="h-8 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer"
                 />
              </div> */}
            </div>
          </div>
          
        </div>
      </div>

      {/* Phần Bottom: Disclaimer & Copyright */}
      <div className="bg-[#0a0f1d] py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4">
            <p className="text-[11px] text-slate-500 max-w-3xl mx-auto leading-relaxed uppercase tracking-wider">
              © {currentYear} SanMaNhanh.com. Nền tảng chia sẻ mã giảm giá. <br/>
              Chúng tôi không bán hàng trực tiếp. Chúng tôi nhận hoa hồng từ việc tiếp thị liên kết các sản phẩm trên sàn TMĐT. 
              Mọi giao dịch, thanh toán và bảo hành sản phẩm thuộc trách nhiệm của nhà bán hàng trên sàn tương ứng.
            </p>
            <div className="h-px w-20 bg-slate-800 mx-auto"></div>
            <p className="text-[10px] text-slate-600 italic">
                Designed with precision by Senior Software Engineer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}