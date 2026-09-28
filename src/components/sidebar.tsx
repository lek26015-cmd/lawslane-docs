import Link from 'next/link';
import { SECTIONS } from '@/lib/sections';
import { getSectionDocs } from '@/lib/content';
import { SectionIcon } from './section-icon';

export function Sidebar({ section, slug }: { section: string; slug?: string }) {
  return (
    <nav className="space-y-6 text-sm" aria-label="สารบัญคู่มือ">
      {SECTIONS.map((s) => {
        const docs = getSectionDocs(s.id);
        if (docs.length === 0) return null;
        const active = s.id === section;
        return (
          <div key={s.id}>
            <Link
              href={`/${s.id}`}
              className={`mb-2 flex items-center gap-2 font-semibold ${active ? 'text-[var(--accent)]' : ''}`}
            >
              <SectionIcon icon={s.icon} className="h-4 w-4" />
              {s.title}
            </Link>
            {active && (
              <ul className="ml-2 space-y-0.5 border-l border-[var(--line)]">
                {docs.map((d) => {
                  const current = d.slug === slug;
                  return (
                    <li key={d.slug}>
                      <Link
                        href={`/${s.id}/${d.slug}`}
                        aria-current={current ? 'page' : undefined}
                        className={`-ml-px block border-l py-1.5 pl-3 ${
                          current
                            ? 'border-[var(--accent)] font-medium text-[var(--accent)]'
                            : 'border-transparent text-[var(--muted)] hover:text-[var(--fg)]'
                        }`}
                      >
                        {d.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
