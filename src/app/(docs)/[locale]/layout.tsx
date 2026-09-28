import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Prompt } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HTML_LANG, LOCALES, isLocale, t } from '@/lib/i18n';
import '../../globals.css';

// next/font ดาวน์โหลดฟอนต์ตอน build แล้วเสิร์ฟจากโดเมนเราเอง (ไม่ส่ง IP ผู้อ่านไป Google)
// Prompt มี Thai + Latin — ตัวจีนใช้ฟอนต์ระบบตามลำดับใน tailwind.config
const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
});

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL('https://docs.lawslane.com'),
    title: { default: `Lawslane.doc — ${t(locale).heroTitle}`, template: '%s · Lawslane.doc' },
    description: t(locale).siteDescription,
    icons: { icon: '/logo.png' },
    alternates: { languages: Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `/${l}`])) },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={HTML_LANG[locale]} className={prompt.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
