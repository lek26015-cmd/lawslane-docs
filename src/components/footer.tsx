import { SECTIONS, siteHref } from '@/lib/sections';
import { t, type Locale } from '@/lib/i18n';

export function Footer({ locale }: { locale: Locale }) {
  const d = t(locale);
  const sites = SECTIONS.filter((s) => s.siteUrl && ['client', 'capdeal', 'wittaya'].includes(s.id));
  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-[var(--bg-soft)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Lawslane · {d.footer}</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {sites.map((s) => (
            <a key={s.id} href={siteHref(s, locale)} className="hover:text-[var(--fg)]">
              {s.id === 'client' ? 'Lawslane' : s.title[locale]}
            </a>
          ))}
          <a href={`https://lawslane.com/${locale}/terms`} className="hover:text-[var(--fg)]">{d.terms}</a>
          <a href={`https://lawslane.com/${locale}/privacy`} className="hover:text-[var(--fg)]">{d.privacy}</a>
        </nav>
      </div>
    </footer>
  );
}
