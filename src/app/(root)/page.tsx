import Link from 'next/link';
import { LOCALES, LOCALE_LABEL } from '@/lib/i18n';
import { LocaleRedirect } from './locale-redirect';

export default function RootPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-24 text-center">
      <LocaleRedirect />
      <p className="text-lg font-semibold">Lawslane.doc</p>
      <nav className="mt-6 flex justify-center gap-4">
        {LOCALES.map((l) => (
          <Link key={l} href={`/${l}`} className="text-[var(--accent)] hover:underline">{LOCALE_LABEL[l]}</Link>
        ))}
      </nav>
    </main>
  );
}
