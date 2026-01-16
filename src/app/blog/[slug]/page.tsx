// src/app/blog/[slug]/page.tsx
import { BLOG_POSTS } from "@/data/blogData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 3600; // Cache 1 tiếng
export const dynamicParams = true; // Cho phép tạo trang mới nếu chưa có trong cache

// 1. Tạo Metadata động cho SEO (Tiêu đề bài viết hiện lên tab trình duyệt)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Không tìm thấy bài viết" };
  
  return {
    title: `${post.title} | SanMaNhanh`,
    description: post.excerpt,
    openGraph: {
        images: [post.image], // Ảnh khi share Facebook
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return notFound(); // Trả về trang 404 nếu sai link

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft size={16}/> Quay lại danh sách
      </Link>

      <article className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <span>Đăng ngày: {post.date}</span>
            <span>•</span>
            <span>Tác giả: {post.author}</span>
        </div>

        {/* Nội dung bài viết (Render HTML) */}
        <div 
            className="prose prose-blue max-w-none prose-img:rounded-xl prose-headings:font-bold"
            dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        {/* Call to Action cuối bài */}
        <div className="mt-10 bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
            <p className="font-bold text-blue-900 mb-2">Thấy bài viết hữu ích?</p>
            <p className="text-sm text-blue-700 mb-4">Tham gia nhóm Zalo để nhận thêm nhiều tips hay ho nhé!</p>
            <a href="https://zalo.me/g/demo" className="inline-block bg-blue-600 text-white font-bold px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Vào Nhóm Ngay
            </a>
        </div>
      </article>
    </div>
  );
}