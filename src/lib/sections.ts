import type { Locale } from './i18n';

type L10n = Record<Locale, string>;

// หมวดของคู่มือ — เรียงตามลำดับที่แสดงบนเว็บ (ไม่รวมหลังบ้านแอดมินโดยตั้งใจ)
export type Section = {
  id: string;
  title: L10n;
  site: L10n;
  // ลิงก์ไปเว็บจริง — {locale} จะถูกแทนด้วยภาษาที่เลือก
  siteUrl?: string;
  blurb: L10n;
  icon: 'rocket' | 'user' | 'scale' | 'languages' | 'file-signature' | 'graduation-cap' | 'life-buoy';
};

const ALL_SITES: L10n = { th: 'ทุกเว็บในเครือ', en: 'All Lawslane sites', zh: '所有 Lawslane 网站' };
const same = (s: string): L10n => ({ th: s, en: s, zh: s });

export const SECTIONS: Section[] = [
  {
    id: 'start',
    title: { th: 'เริ่มต้นใช้งาน', en: 'Getting started', zh: '快速入门' },
    site: ALL_SITES,
    blurb: {
      th: 'บัญชีเดียวใช้ได้ทุกเว็บ สมัคร เข้าสู่ระบบ จัดการบัญชี',
      en: 'One account for every site — sign up, log in, manage your account',
      zh: '一个账户通用所有网站 — 注册、登录、管理账户',
    },
    icon: 'rocket',
  },
  {
    id: 'client',
    title: { th: 'ลูกความ', en: 'Clients', zh: '客户' },
    site: same('lawslane.com'),
    siteUrl: 'https://lawslane.com/{locale}',
    blurb: {
      th: 'ปรึกษา AI ลลิน หาทนาย ปรึกษาผ่านแชท ติดตามเคส ชำระค่าบริการ',
      en: 'Ask LAlin AI, find a lawyer, consult via chat, track cases, pay fees',
      zh: '咨询 LAlin AI、寻找律师、在线咨询、跟进案件、支付费用',
    },
    icon: 'user',
  },
  {
    id: 'lawyer',
    title: { th: 'ทนายความ', en: 'Lawyers', zh: '律师' },
    site: same('lawslane.com'),
    siteUrl: 'https://lawslane.com/{locale}/for-lawyers',
    blurb: {
      th: 'สมัครและยืนยันตัวตน โปรไฟล์ รับงาน จัดการเคส รับเงิน แพลนรายเดือน',
      en: 'Register and verify, profile, take cases, manage work, get paid, monthly plans',
      zh: '注册与认证、个人资料、接案、管理案件、收款、月度会员',
    },
    icon: 'scale',
  },
  {
    id: 'interpreter',
    title: { th: 'บริการล่ามกฎหมาย', en: 'Legal interpreters', zh: '法律翻译服务' },
    site: same('lawslane.com/interpreters'),
    siteUrl: 'https://lawslane.com/{locale}/interpreters',
    blurb: {
      th: 'ขอใช้บริการล่าม คุยกับทีมงาน ชำระเงินผ่านลิงก์',
      en: 'Request an interpreter, talk to our team, pay via a payment link',
      zh: '申请翻译、与团队沟通、通过付款链接支付',
    },
    icon: 'languages',
  },
  {
    id: 'capdeal',
    title: same('Cap & Deal'),
    site: same('capdeal.lawslane.com'),
    siteUrl: 'https://capdeal.lawslane.com/{locale}',
    blurb: {
      th: 'ร่าง ตรวจ เซ็น และแชร์สัญญา พร้อมแพ็กเกจรายเดือน',
      en: 'Draft, review, sign and share contracts, with monthly plans',
      zh: '起草、审阅、签署和分享合同，并提供月度套餐',
    },
    icon: 'file-signature',
  },
  {
    id: 'wittaya',
    title: same('Lawslane Wittaya'),
    site: same('wittaya.lawslane.com'),
    siteUrl: 'https://wittaya.lawslane.com',
    blurb: {
      th: 'คลังข้อสอบเก่าพร้อม AI ตรวจ และร้านหนังสือ',
      en: 'Past exam bank with AI grading, and a bookstore',
      zh: '历年试题库与 AI 批改，以及书店',
    },
    icon: 'graduation-cap',
  },
  {
    id: 'help',
    title: { th: 'ช่วยเหลือ', en: 'Help', zh: '帮助' },
    site: ALL_SITES,
    blurb: {
      th: 'คำถามพบบ่อย ติดต่อทีมงาน ความปลอดภัยและข้อมูลส่วนตัว',
      en: 'FAQ, contact the team, safety and privacy',
      zh: '常见问题、联系团队、安全与隐私',
    },
    icon: 'life-buoy',
  },
];

export function getSection(id: string) {
  return SECTIONS.find((s) => s.id === id);
}

export function siteHref(s: Section, locale: Locale) {
  return s.siteUrl?.replace('{locale}', locale);
}
