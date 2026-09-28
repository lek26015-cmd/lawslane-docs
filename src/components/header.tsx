import Link from 'next/link';
import Image from 'next/image';
import { Search } from './search';
import { getSearchIndex } from '@/lib/content';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={24} height={34} className="h-8 w-auto dark:hidden" />
          <Image src="/logo-white.png" alt="" width={24} height={34} className="hidden h-8 w-auto dark:block" />
          <span className="font-semibold">
            Lawslane<span className="text-[var(--muted)]">.doc</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Search index={getSearchIndex()} />
          <a href="https://lawslane.com" className="hidden text-sm text-[var(--muted)] hover:text-[var(--fg)] sm:block">
            ไปที่ lawslane.com
          </a>
        </div>
      </div>
    </header>
  );
}
