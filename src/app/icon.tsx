import { ImageResponse } from 'next/og'

// Cấu hình kích thước và loại ảnh
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Tạo Favicon bằng Code
export default function Icon() {
  return new ImageResponse(
    (
      // Thẻ div đại diện cho hình ảnh icon
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)', // Gradient Đỏ -> Cam
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fef08a', // Màu chữ Vàng
          borderRadius: '8px', // Bo góc mềm mại (như App iOS)
          fontWeight: 900,
          fontFamily: 'sans-serif',
          border: '2px solid #fef08a' // Viền vàng mỏng
        }}
      >
        {/* Chữ cái đầu của SANMA */}
        S
      </div>
    ),
    {
      ...size,
    }
  )
}