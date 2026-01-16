"use client";
import { useEffect, useState } from "react";

export default function TetAtmosphere() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Tạo mảng các phần tử rơi ngẫu nhiên
  const items = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100, // Vị trí ngang ngẫu nhiên
    delay: Math.random() * 5,  // Độ trễ ngẫu nhiên
    duration: 5 + Math.random() * 5, // Tốc độ rơi ngẫu nhiên
    type: Math.random() > 0.6 ? "🧧" : (Math.random() > 0.5 ? "🌸" : "🌼") // Lì xì, Hoa Đào, Hoa Mai
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden h-screen w-screen">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute top-[-50px] text-xl md:text-3xl animate-fall opacity-80"
          style={{
            left: `${item.left}%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.type}
        </div>
      ))}
      
      {/* CSS Animation ngay trong component */}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}