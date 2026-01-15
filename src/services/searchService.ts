import { prisma } from "@/lib/db";
import { pipeline } from '@xenova/transformers';

// Singleton AI Model
let extractor: any = null;
async function getExtractor() {
    if (!extractor) {
        extractor = await pipeline('feature-extraction', 'Xenova/paraphrase-multilingual-MiniLM-L12-v2');
    }
    return extractor;
}

export const SearchService = {
  searchHybrid: async (query: string, limit = 20) => {
    // 1. Tạo Vector từ câu truy vấn của khách
    const model = await getExtractor();
    const output = await model(query, { pooling: 'mean', normalize: true });
    const vector = Array.from(output.data);
    const vectorString = JSON.stringify(vector);

    // 2. QUERY KẾT HỢP (Hybrid)
    // Công thức: Score = (Độ giống Vector * 0.7) + (Độ khớp từ khóa * 0.3)
    const products = await prisma.$queryRaw`
      SELECT 
        itemid::text, name, image, price, sold_count_value,
        (1 - (embedding <=> ${vectorString}::vector)) as vector_score, -- Điểm AI
        ts_rank(to_tsvector('simple', name), plainto_tsquery('simple', ${query})) as text_score -- Điểm Từ khóa
      FROM products
      WHERE status = 1
      ORDER BY (
        (1 - (embedding <=> ${vectorString}::vector)) * 0.7 + 
        ts_rank(to_tsvector('simple', name), plainto_tsquery('simple', ${query})) * 0.3
      ) DESC
      LIMIT ${limit};
    `;

    return products;
  }
};