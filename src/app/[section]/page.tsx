import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { SECTIONS, getSection } from '@/lib/sections';
import { getSectionDocs } from '@/lib/content';
import { Sidebar } from '@/components/sidebar';
import { MobileNav } from '@/components/mobile-nav';
import { SectionIcon } from '@/components/section-icon';

type Props = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return SECTIONS.filter((s) => getSectionDocs(s.id).length > 0).map((s) => ({ section: s.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSection((await params).section);
  return s ? { title: s.title, description: s.blurb } : {};
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  const s = getSection(section);
  if (!s) notFound();
  const docs = getSectionDocs(section);

  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 py-10">
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8">
          <Sidebar section={section} />
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        <MobileNav section={section} />
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-[var(--accent-soft)] p-2.5 text-[var(--accent)]">
            <SectionIcon icon={s.icon} className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{s.title}</h1>
            {s.siteUrl ? (
              <a href={s.siteUrl} className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:underline">
                {s.site} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <p className="text-sm text-[var(--muted)]">{s.site}</p>
            )}
          </div>
        </div>
        <p className="mt-4 text-[var(--muted)]">{s.blurb}</p>
        <ol className="mt-8 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)]">
          {docs.map((d, i) => (
            <li key={d.slug}>
              <Link href={`/${section}/${d.slug}`} className="flex gap-4 p-5 hover:bg-[var(--bg-soft)]">
                <span className="w-6 shrink-0 text-right font-semibold text-[var(--muted)]">{i + 1}</span>
                <span>
                  <span className="font-medium">{d.title}</span>
                  {d.description && <span className="mt-1 block text-sm text-[var(--muted)]">{d.description}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
