import Link from 'next/link';
import Image from 'next/image';
import { Search } from './search';
import { LangSwitcher } from './lang-switcher';
import { getSearchIndex } from '@/lib/content';
import { t, type Locale } from '@/lib/i18n';

export function Header({ locale }: { locale: Locale }) {
  const d = t(locale);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="" width={24} height={34} className="h-8 w-auto dark:hidden" />
          <Image src="/logo-white.png" alt="" width={24} height={34} className="hidden h-8 w-auto dark:block" />
          <span className="font-semibold">
            Lawslane<span className="text-[var(--muted)]">.doc</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <Search
            index={getSearchIndex(locale)}
            labels={{ search: d.search, hero: d.searchHero, placeholder: d.searchPlaceholder, dialog: d.searchDialog, noResults: d.noResults, close: d.close }}
          />
          <LangSwitcher locale={locale} label={d.language} />
          <a href={`https://lawslane.com/${locale}`} className="hidden text-sm text-[var(--muted)] hover:text-[var(--fg)] md:block">
            {d.gotoMain}
          </a>
        </div>
      </div>
    </header>
  );
}
