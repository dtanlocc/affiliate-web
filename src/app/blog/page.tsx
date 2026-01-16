// src/app/blog/page.tsx
import { BLOG_POSTS } from "@/data/blogData";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Blog Săn Sale & Review - SanMaNhanh",
  description: "Chia sẻ kinh nghiệm mua sắm, review sản phẩm chân thực.",
};
export const revalidate = 3600; // Cache 1 tiếng
export const dynamicParams = true; // Cho phép tạo trang mới nếu chưa có trong cache

export default function BlogListing() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-gray-800 uppercase mb-2">Góc Review & Kinh Nghiệm</h1>
        <p className="text-gray-500">Kiến thức mua sắm thông minh giúp bạn tiết kiệm hàng triệu đồng.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Ảnh Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
               <Image 
                 src={post.image} 
                 alt={post.title} 
                 fill 
                 className="object-cover group-hover:scale-105 transition-transform duration-500"
               />
            </div>
            
            {/* Nội dung tóm tắt */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                {post.excerpt}
              </p>
              <span className="text-blue-600 text-sm font-bold underline decoration-blue-200 hover:decoration-blue-600 transition-all">
                Đọc tiếp
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}