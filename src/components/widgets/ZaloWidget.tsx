// src/components/widgets/ZaloWidget.tsx
import { ArrowRight, QrCode } from "lucide-react";

export default function ZaloWidget() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
      <div className="bg-white p-2 rounded-lg shadow-md shrink-0">
        {/* Thay ảnh QR thật của khách vào đây */}
        <QrCode size={100} className="text-blue-900"/>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Tham gia Nhóm Zalo Săn Sale VIP</h3>
        <p className="text-blue-700 text-sm mb-4">Nhận mã độc quyền, báo deal lỗi giá, và giao lưu cùng 50.000 thành viên khác.</p>
        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition flex items-center gap-2 mx-auto md:mx-0">
          Tham Gia Ngay <ArrowRight size={18}/>
        </button>
      </div>
    </div>
  );
}