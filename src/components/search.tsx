'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Search as SearchIcon, X } from 'lucide-react';
import type { SearchEntry } from '@/lib/content';

// ค้นหาฝั่ง browser จากดัชนีที่สร้างตอน build — ภาษาไทยไม่มีเว้นวรรค จึงใช้ substring ไม่ใช่ตัดคำ
function score(e: SearchEntry, q: string) {
  const t = e.title.toLowerCase();
  if (t.includes(q)) return 3;
  if (e.description.toLowerCase().includes(q)) return 2;
  if (e.text.toLowerCase().includes(q)) return 1;
  return 0;
}

function snippet(text: string, q: string) {
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return '';
  const start = Math.max(0, i - 40);
  return (start > 0 ? '…' : '') + text.slice(start, i + q.length + 60) + '…';
}

export type SearchLabels = { search: string; hero: string; placeholder: string; dialog: string; noResults: string; close: string };

export function Search({ index, labels, variant = 'bar' }: { index: SearchEntry[]; labels: SearchLabels; variant?: 'bar' | 'hero' }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return index
      .map((e) => ({ e, s: score(e, query) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => ({ ...r.e, snip: r.s === 1 ? snippet(r.e.text, query) : r.e.description }));
  }, [q, index]);

  // modal ต้อง portal ไปที่ body — header ใช้ backdrop-blur ซึ่งทำให้ position:fixed ข้างในยึดกับ header แทนหน้าจอ
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          variant === 'hero'
            ? 'flex w-full max-w-xl items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-5 py-4 text-left text-[var(--muted)] shadow-sm transition hover:border-[var(--accent)]'
            : 'flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--bg-soft)] px-3 py-1.5 text-sm text-[var(--muted)] transition hover:border-[var(--accent)]'
        }
      >
        <SearchIcon className={variant === 'hero' ? 'h-5 w-5' : 'h-4 w-4'} />
        <span className={variant === 'hero' ? 'flex-1' : 'hidden flex-1 sm:inline'}>{variant === 'hero' ? labels.hero : labels.search}</span>
        <kbd className="hidden rounded border border-[var(--line)] px-1.5 text-xs sm:inline">⌘K</kbd>
      </button>

      {open &&
        createPortal(
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[10vh]" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={labels.dialog}
          >
            <div className="flex items-center gap-3 border-b border-[var(--line)] px-4">
              <SearchIcon className="h-5 w-5 text-[var(--muted)]" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={labels.placeholder}
                className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-[var(--muted)]"
              />
              <button type="button" onClick={() => setOpen(false)} aria-label={labels.close} className="text-[var(--muted)]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto p-2">
              {q.trim() && results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-[var(--muted)]">{labels.noResults} “{q}”</li>
              )}
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 hover:bg-[var(--accent-soft)]"
                  >
                    <div className="text-xs text-[var(--muted)]">{r.section}</div>
                    <div className="font-medium">{r.title}</div>
                    {r.snip && <div className="line-clamp-2 text-sm text-[var(--muted)]">{r.snip}</div>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
