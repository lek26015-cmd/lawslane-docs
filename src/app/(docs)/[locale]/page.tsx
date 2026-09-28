import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SECTIONS } from '@/lib/sections';
import { getSearchIndex, getSectionDocs } from '@/lib/content';
import { t, type Locale } from '@/lib/i18n';
import { Search } from '@/components/search';
import { SectionIcon } from '@/components/section-icon';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const d = t(locale);
  return (
    <main>
      <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{d.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">{d.heroSubtitle}</p>
          <div className="mt-8">
            <Search
              index={getSearchIndex(locale)}
              variant="hero"
              labels={{ search: d.search, hero: d.searchHero, placeholder: d.searchPlaceholder, dialog: d.searchDialog, noResults: d.noResults, close: d.close }}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => {
          const docs = getSectionDocs(locale, s.id);
          if (docs.length === 0) return null;
          return (
            <div key={s.id} className="flex flex-col rounded-2xl border border-[var(--line)] p-6 transition hover:border-[var(--accent)]">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-[var(--accent-soft)] p-2.5 text-[var(--accent)]">
                  <SectionIcon icon={s.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-semibold">
                    <Link href={`/${locale}/${s.id}`} className="hover:underline">{s.title[locale]}</Link>
                  </h2>
                  <p className="text-xs text-[var(--muted)]">{s.site[locale]}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">{s.blurb[locale]}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {docs.slice(0, 5).map((doc) => (
                  <li key={doc.slug}>
                    <Link href={`/${locale}/${s.id}/${doc.slug}`} className="hover:text-[var(--accent)] hover:underline">
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/${s.id}`} className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-[var(--accent)]">
                {d.seeAll(docs.length)} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
