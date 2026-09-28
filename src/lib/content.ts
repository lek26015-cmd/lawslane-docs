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

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type Heading = { depth: 2 | 3; text: string; id: string };

export type Doc = {
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

let cache: Doc[] | null = null;

export function getAllDocs(): Doc[] {
  if (cache) return cache;
  const docs: Doc[] = [];
  for (const section of SECTIONS) {
    const dir = path.join(CONTENT_DIR, section.id);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
    for (const file of files) {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      docs.push({
        section: section.id,
        slug: slugOf(file),
        title: String(data.title ?? slugOf(file)),
        description: String(data.description ?? ''),
        body: content,
      });
    }
  }
  cache = docs;
  return docs;
}

export function getSectionDocs(section: string) {
  return getAllDocs().filter((d) => d.section === section);
}

export function getDoc(section: string, slug: string) {
  return getAllDocs().find((d) => d.section === section && d.slug === slug);
}

export async function renderMarkdown(md: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(md);
  const html = String(file);
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

export function getSearchIndex(): SearchEntry[] {
  return getAllDocs().map((d) => ({
    href: `/${d.section}/${d.slug}`,
    title: d.title,
    section: SECTIONS.find((s) => s.id === d.section)?.title ?? d.section,
    description: d.description,
    text: plainText(d.body).slice(0, 4000),
  }));
}
