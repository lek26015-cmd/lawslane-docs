import { ChevronDown } from 'lucide-react';
import { Sidebar } from './sidebar';

// จอเล็กไม่มีแถบข้าง — ใช้เมนูพับได้ด้านบนแทน
export function MobileNav({ section, slug }: { section: string; slug?: string }) {
  return (
    <details className="group mb-6 rounded-xl border border-[var(--line)] lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium">
        สารบัญคู่มือ
        <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="border-t border-[var(--line)] px-4 py-4">
        <Sidebar section={section} slug={slug} />
      </div>
    </details>
  );
}
