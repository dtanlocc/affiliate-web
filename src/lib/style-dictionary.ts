// src/lib/style-dictionary.ts

export const STYLE_DICTIONARY: Record<string, string[]> = {
    // --- THỜI TRANG NỮ ---
    'nang-tho': [
        'voan', 'hoa nhí', 'trễ vai', 'babydoll', 'bánh bèo', 
        'xòe', 'vintage', 'ren', 'nơ', 'tay phồng', 'cổ vuông',
        'maxi', 'midi', 'chiffon', 'nàng thơ'
    ],
    'tong-tai': [
        'vest', 'blazer', 'suit', 'công sở', 'thanh lịch', 
        'quần tây', 'sơ mi lụa', 'áo khoác dạ', 'tweed', 
        'chân váy bút chì', 'sang trọng', 'quý phái'
    ],
    'tiec': [
        'dạ hội', 'dự tiệc', 'đi tiệc', 'sequin', 'kim sa', 
        'hở lưng', 'xẻ tà', 'cúp ngực', 'lụa satin', 'nhung', 
        'đầm dây', 'body', 'quyến rũ', 'party'
    ],
    'duong-pho': [
        'bomber', 'hoodie', 'sweater', 'jogger', 'cargo', 'túi hộp',
        'oversize', 'unisex', 'rộng', 'hiphop', 'bụi bặm', 'ulzzang',
        'croptop', 'ống rộng'
    ],

    // --- MỸ PHẨM ---
    'skincare': [
        'serum', 'toner', 'kem dưỡng', 'sữa rửa mặt', 'tẩy trang', 
        'mặt nạ', 'bha', 'aha', 'retinol', 'cấp ẩm', 'phục hồi',
        'la roche-posay', 'cerave', 'loreal', 'skin1004'
    ],
    'makeup': [
        'son', 'phấn', 'kem nền', 'cushion', 'mascara', 'kẻ mắt', 
        'má hồng', 'che khuyết điểm', 'maybelline', 'clio', '3ce'
    ],
    
    // --- KHÁC ---
    'nam': ['nam', 'polo', 'sơ mi nam', 'quần âu', 'short nam', 'kaki'],
    'nu': ['nữ', 'váy', 'đầm', 'áo kiểu', 'croptop']
};

export function getKeywordsForStyle(styleKey: string) {
    return STYLE_DICTIONARY[styleKey] || [];
}