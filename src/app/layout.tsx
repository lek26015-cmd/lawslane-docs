import type { Metadata } from 'next';
import { Prompt } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

// next/font ดาวน์โหลดฟอนต์ตอน build แล้วเสิร์ฟจากโดเมนเราเอง (ไม่ส่ง IP ผู้อ่านไป Google)
const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.lawslane.com'),
  title: { default: 'คู่มือการใช้งาน Lawslane', template: '%s · คู่มือ Lawslane' },
  description:
    'คู่มือการใช้งานระบบในเครือ Lawslane — ลูกความ ทนายความ บริการล่าม Cap & Deal และ Lawslane Wittaya',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
