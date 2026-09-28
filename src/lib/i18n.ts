export const LOCALES = ['th', 'en', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'th';

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export const LOCALE_LABEL: Record<Locale, string> = { th: 'ไทย', en: 'English', zh: '中文' };
export const HTML_LANG: Record<Locale, string> = { th: 'th', en: 'en', zh: 'zh-CN' };

const DICT = {
  th: {
    siteDescription: 'คู่มือการใช้งานระบบในเครือ Lawslane — ลูกความ ทนายความ บริการล่าม Cap & Deal และ Lawslane Wittaya',
    heroTitle: 'คู่มือการใช้งาน Lawslane',
    heroSubtitle: 'รวมวิธีใช้งานทุกเว็บในเครือไว้ที่เดียว ใช้บัญชีเดียวกันได้ทั้ง lawslane.com, Cap & Deal และ Lawslane Wittaya',
    search: 'ค้นหา',
    searchHero: 'ค้นหาในคู่มือ เช่น “ขอนัดหมาย”, “ยืนยันตัวตนทนาย”',
    searchPlaceholder: 'พิมพ์คำที่ต้องการค้นหา',
    searchDialog: 'ค้นหาในคู่มือ',
    noResults: 'ไม่พบหัวข้อที่ตรงกับ',
    close: 'ปิด',
    gotoMain: 'ไปที่ lawslane.com',
    seeAll: (n: number) => `ดูทั้งหมด ${n} หัวข้อ`,
    docs: 'คู่มือ',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    onThisPage: 'ในหน้านี้',
    toc: 'สารบัญคู่มือ',
    tocAria: 'สารบัญคู่มือ',
    footer: 'คู่มือการใช้งานระบบในเครือ',
    terms: 'ข้อกำหนดการใช้งาน',
    privacy: 'นโยบายความเป็นส่วนตัว',
    notFoundTitle: 'ไม่พบหน้านี้',
    notFoundBody: 'หัวข้อนี้อาจถูกย้ายหรือเปลี่ยนชื่อแล้ว',
    backHome: 'กลับหน้าคู่มือ',
    language: 'ภาษา',
    untranslated: 'หน้านี้ยังไม่มีฉบับภาษาไทย',
  },
  en: {
    siteDescription: 'User guides for the Lawslane network — clients, lawyers, interpreter service, Cap & Deal and Lawslane Wittaya',
    heroTitle: 'Lawslane user guide',
    heroSubtitle: 'How to use every Lawslane site in one place. One account works on lawslane.com, Cap & Deal and Lawslane Wittaya.',
    search: 'Search',
    searchHero: 'Search the guide, e.g. “payment”, “verify lawyer”',
    searchPlaceholder: 'Type to search',
    searchDialog: 'Search the guide',
    noResults: 'No topics match',
    close: 'Close',
    gotoMain: 'Go to lawslane.com',
    seeAll: (n: number) => `See all ${n} topics`,
    docs: 'Guide',
    prev: 'Previous',
    next: 'Next',
    onThisPage: 'On this page',
    toc: 'Guide contents',
    tocAria: 'Guide contents',
    footer: 'User guide for the Lawslane network',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    notFoundTitle: 'Page not found',
    notFoundBody: 'This topic may have been moved or renamed.',
    backHome: 'Back to the guide',
    language: 'Language',
    untranslated: 'This page is not yet available in English — showing the Thai version.',
  },
  zh: {
    siteDescription: 'Lawslane 旗下网站使用指南 — 客户、律师、翻译服务、Cap & Deal 与 Lawslane Wittaya',
    heroTitle: 'Lawslane 使用指南',
    heroSubtitle: '所有 Lawslane 网站的使用方法集中在这里。一个账户即可登录 lawslane.com、Cap & Deal 和 Lawslane Wittaya。',
    search: '搜索',
    searchHero: '搜索指南，例如“付款”、“核验律师”',
    searchPlaceholder: '输入关键词搜索',
    searchDialog: '搜索指南',
    noResults: '没有找到相关主题：',
    close: '关闭',
    gotoMain: '前往 lawslane.com',
    seeAll: (n: number) => `查看全部 ${n} 个主题`,
    docs: '指南',
    prev: '上一篇',
    next: '下一篇',
    onThisPage: '本页内容',
    toc: '指南目录',
    tocAria: '指南目录',
    footer: 'Lawslane 旗下网站使用指南',
    terms: '服务条款',
    privacy: '隐私政策',
    notFoundTitle: '页面不存在',
    notFoundBody: '该主题可能已被移动或重命名。',
    backHome: '返回指南首页',
    language: '语言',
    untranslated: '本页暂无中文版本，以下显示泰文内容。',
  },
} as const;

export function t(locale: Locale) {
  return DICT[locale];
}
