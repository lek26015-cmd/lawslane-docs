import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getSection } from '@/lib/sections';
import { getAllDocs, getDoc, getSectionDocs, renderMarkdown } from '@/lib/content';
import { Sidebar } from '@/components/sidebar';
import { MobileNav } from '@/components/mobile-nav';

type Props = { params: Promise<{ section: string; slug: string }> };

export function generateStaticParams() {
  return getAllDocs().map((d) => ({ section: d.section, slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  const d = getDoc(section, slug);
  return d ? { title: d.title, description: d.description } : {};
}

export default async function DocPage({ params }: Props) {
  const { section, slug } = await params;
  const s = getSection(section);
  const doc = getDoc(section, slug);
  if (!s || !doc) notFound();

  const { html, headings } = await renderMarkdown(doc.body);
  const siblings = getSectionDocs(section);
  const i = siblings.findIndex((d) => d.slug === slug);
  const prev = siblings[i - 1];
  const next = siblings[i + 1];

  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 py-10">
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8">
          <Sidebar section={section} slug={slug} />
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <MobileNav section={section} slug={slug} />
        <nav className="mb-4 flex items-center gap-1 text-sm text-[var(--muted)]" aria-label="breadcrumb">
          <Link href="/" className="hover:underline">คู่มือ</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/${section}`} className="hover:underline">{s.title}</Link>
        </nav>
        <h1 className="text-2xl font-bold sm:text-3xl">{doc.title}</h1>
        {doc.description && <p className="mt-2 text-lg text-[var(--muted)]">{doc.description}</p>}

        <article
          className="doc prose mt-8 max-w-none prose-headings:font-semibold prose-a:text-[var(--accent)] prose-strong:text-[var(--fg)] prose-headings:text-[var(--fg)] prose-p:text-[var(--fg)] prose-li:text-[var(--fg)] prose-td:text-[var(--fg)] prose-th:text-[var(--fg)] prose-code:text-[var(--fg)] prose-code:before:content-none prose-code:after:content-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-12 grid gap-4 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
          {prev ? (
            <Link href={`/${section}/${prev.slug}`} className="rounded-xl border border-[var(--line)] p-4 hover:border-[var(--accent)]">
              <span className="flex items-center gap-1 text-xs text-[var(--muted)]"><ChevronLeft className="h-3.5 w-3.5" /> ก่อนหน้า</span>
              <span className="font-medium">{prev.title}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/${section}/${next.slug}`} className="rounded-xl border border-[var(--line)] p-4 text-right hover:border-[var(--accent)]">
              <span className="flex items-center justify-end gap-1 text-xs text-[var(--muted)]">ถัดไป <ChevronRight className="h-3.5 w-3.5" /></span>
              <span className="font-medium">{next.title}</span>
            </Link>
          )}
        </div>
      </main>

      {headings.length > 1 && (
        <aside className="hidden w-52 shrink-0 xl:block">
          <div className="sticky top-24 text-sm">
            <p className="mb-2 font-semibold">ในหน้านี้</p>
            <ul className="space-y-1.5">
              {headings.map((h) => (
                <li key={h.id} className={h.depth === 3 ? 'pl-3' : ''}>
                  <a href={`#${h.id}`} className="text-[var(--muted)] hover:text-[var(--fg)]">{h.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}
