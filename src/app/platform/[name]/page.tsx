// src/app/category/[slug]/page.tsx



export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-800 uppercase">
        Danh mục: {slug.replace(/-/g, ' ')}
      </h1>
      <p className="text-gray-500 mt-4">
        Tính năng đang được phát triển...
      </p>
    </div>
  );
}