import type { NextConfig } from 'next';

// เว็บคู่มือเป็นหน้า static ทั้งหมด — ไม่มี API ไม่มีการเชื่อม Firebase
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
