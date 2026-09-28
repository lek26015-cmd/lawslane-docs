'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { LOCALES, LOCALE_LABEL, type Locale } from '@/lib/i18n';

// สลับภาษาโดยคงหน้าเดิมไว้ — แทนที่ส่วนแรกของ path (/th/...) ด้วยภาษาใหม่
export function LangSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(th|en|zh)(?=\/|$)/, '');
  return (
    <div className="flex items-center gap-1 text-sm" role="group" aria-label={label}>
      <Globe className="h-4 w-4 text-[var(--muted)]" aria-hidden />
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === locale ? 'true' : undefined}
          onClick={() => {
            try {
              localStorage.setItem('docs-locale', l);
            } catch {}
          }}
          className={`rounded-md px-1.5 py-0.5 ${
            l === locale ? 'bg-[var(--accent-soft)] font-medium text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'
          }`}
        >
          {l === 'th' ? 'TH' : l === 'en' ? 'EN' : '中文'}
          <span className="sr-only"> {LOCALE_LABEL[l]}</span>
        </Link>
      ))}
    </div>
  );
}
