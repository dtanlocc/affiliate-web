// src/app/page.tsx
import HomeClient from "@/components/HomeClient";

// Cấu hình này bây giờ sẽ hoạt động hoàn hảo
export const revalidate = 60; 

export default function Page() {
  return <HomeClient />;
}