import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SECTIONS } from '@/lib/sections';
import { getSearchIndex, getSectionDocs } from '@/lib/content';
import { Search } from '@/components/search';
import { SectionIcon } from '@/components/section-icon';

export default function Home() {
  return (
    <main>
      <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">คู่มือการใช้งาน Lawslane</h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
            รวมวิธีใช้งานทุกเว็บในเครือไว้ที่เดียว ใช้บัญชีเดียวกันได้ทั้ง lawslane.com, Cap &amp; Deal และ Lawslane Wittaya
          </p>
          <div className="mt-8">
            <Search index={getSearchIndex()} variant="hero" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => {
          const docs = getSectionDocs(s.id);
          if (docs.length === 0) return null;
          return (
            <div key={s.id} className="flex flex-col rounded-2xl border border-[var(--line)] p-6 transition hover:border-[var(--accent)]">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-[var(--accent-soft)] p-2.5 text-[var(--accent)]">
                  <SectionIcon icon={s.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-semibold">
                    <Link href={`/${s.id}`} className="hover:underline">{s.title}</Link>
                  </h2>
                  <p className="text-xs text-[var(--muted)]">{s.site}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">{s.blurb}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {docs.slice(0, 5).map((d) => (
                  <li key={d.slug}>
                    <Link href={`/${s.id}/${d.slug}`} className="hover:text-[var(--accent)] hover:underline">
                      {d.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/${s.id}`} className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-[var(--accent)]">
                ดูทั้งหมด {docs.length} หัวข้อ <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
