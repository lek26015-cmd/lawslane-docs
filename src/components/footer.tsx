import { SECTIONS } from '@/lib/sections';

export function Footer() {
  const sites = SECTIONS.filter((s) => s.siteUrl && ['client', 'capdeal', 'wittaya'].includes(s.id));
  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-[var(--bg-soft)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Lawslane · คู่มือการใช้งานระบบในเครือ</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {sites.map((s) => (
            <a key={s.id} href={s.siteUrl} className="hover:text-[var(--fg)]">
              {s.id === 'client' ? 'Lawslane' : s.title}
            </a>
          ))}
          <a href="https://lawslane.com/th/terms" className="hover:text-[var(--fg)]">ข้อกำหนดการใช้งาน</a>
          <a href="https://lawslane.com/th/privacy" className="hover:text-[var(--fg)]">นโยบายความเป็นส่วนตัว</a>
        </nav>
      </div>
    </footer>
  );
}
