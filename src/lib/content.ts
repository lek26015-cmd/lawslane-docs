import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { SECTIONS } from './sections';
import { DEFAULT_LOCALE, type Locale } from './i18n';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type Heading = { depth: 2 | 3; text: string; id: string };

export type Doc = {
  locale: Locale;
  // true = ยังไม่มีฉบับแปล แสดงเนื้อหาภาษาไทยแทน
  fallback: boolean;
  section: string;
  slug: string;
  title: string;
  description: string;
  body: string;
};

// ชื่อไฟล์ขึ้นต้นด้วยเลขลำดับ เช่น 01-account.md → slug "account"
function slugOf(file: string) {
  return file.replace(/\.md$/, '').replace(/^\d+-/, '');
}

const cache = new Map<Locale, Doc[]>();

function readDir(locale: Locale, section: string) {
  const dir = path.join(CONTENT_DIR, locale, section);
  if (!fs.existsSync(dir)) return new Map<string, { data: Record<string, unknown>; content: string }>();
  const out = new Map<string, { data: Record<string, unknown>; content: string }>();
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
    out.set(file, matter(fs.readFileSync(path.join(dir, file), 'utf8')));
  }
  return out;
}

// รายการหน้าอิงจากภาษาไทยเสมอ — ภาษาอื่นที่ยังแปลไม่ครบจะใช้เนื้อหาไทยแทน
export function getAllDocs(locale: Locale): Doc[] {
  const hit = cache.get(locale);
  if (hit) return hit;
  const docs: Doc[] = [];
  for (const section of SECTIONS) {
    const base = readDir(DEFAULT_LOCALE, section.id);
    const local = locale === DEFAULT_LOCALE ? base : readDir(locale, section.id);
    for (const [file, th] of base) {
      const src = local.get(file) ?? th;
      docs.push({
        locale,
        fallback: !local.has(file),
        section: section.id,
        slug: slugOf(file),
        title: String(src.data.title ?? slugOf(file)),
        description: String(src.data.description ?? ''),
        body: src.content,
      });
    }
  }
  cache.set(locale, docs);
  return docs;
}

export function getSectionDocs(locale: Locale, section: string) {
  return getAllDocs(locale).filter((d) => d.section === section);
}

export function getDoc(locale: Locale, section: string, slug: string) {
  return getAllDocs(locale).find((d) => d.section === section && d.slug === slug);
}

export async function renderMarkdown(md: string, locale: Locale) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(md);
  // ลิงก์ภายในในไฟล์ markdown เขียนแบบไม่มีภาษา (/client/payment) — เติมภาษาปัจจุบันให้
  const html = String(file).replace(/href="\/(?!\/)/g, `href="/${locale}/`);
  // ดึงหัวข้อ h2/h3 จาก HTML ที่ได้ (มี id จาก rehype-slug แล้ว) ไปทำสารบัญ
  const headings: Heading[] = [];
  for (const m of html.matchAll(/<h([23]) id="([^"]+)">(.*?)<\/h\1>/g)) {
    headings.push({ depth: Number(m[1]) as 2 | 3, id: m[2], text: m[3].replace(/<[^>]+>/g, '') });
  }
  return { html, headings };
}

// ข้อความล้วนสำหรับค้นหา — ตัด markdown syntax ออกแบบหยาบ ๆ
export function plainText(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export type SearchEntry = { href: string; title: string; section: string; description: string; text: string };

export function getSearchIndex(locale: Locale): SearchEntry[] {
  return getAllDocs(locale).map((d) => ({
    href: `/${locale}/${d.section}/${d.slug}`,
    title: d.title,
    section: SECTIONS.find((s) => s.id === d.section)?.title[locale] ?? d.section,
    description: d.description,
    text: plainText(d.body).slice(0, 4000),
  }));
}
