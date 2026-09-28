import Link from 'next/link';
import { t, DEFAULT_LOCALE } from '@/lib/i18n';

// not-found ไม่ได้รับ params — ใช้ข้อความภาษาไทยเป็นหลัก พร้อมลิงก์กลับหน้าแรก
export default function NotFound() {
  const d = t(DEFAULT_LOCALE);
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">{d.notFoundTitle}</h1>
      <p className="mt-2 text-[var(--muted)]">{d.notFoundBody}</p>
      <Link href={`/${DEFAULT_LOCALE}`} className="mt-6 inline-block text-[var(--accent)] hover:underline">{d.backHome}</Link>
    </main>
  );
}
