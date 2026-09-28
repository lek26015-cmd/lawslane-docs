// หมวดของคู่มือ — เรียงตามลำดับที่แสดงบนเว็บ (ไม่รวมหลังบ้านแอดมินโดยตั้งใจ)
export type Section = {
  id: string;
  title: string;
  site: string;
  siteUrl?: string;
  blurb: string;
  icon: 'rocket' | 'user' | 'scale' | 'languages' | 'file-signature' | 'graduation-cap' | 'life-buoy';
};

export const SECTIONS: Section[] = [
  {
    id: 'start',
    title: 'เริ่มต้นใช้งาน',
    site: 'ทุกเว็บในเครือ',
    blurb: 'บัญชีเดียวใช้ได้ทุกเว็บ สมัคร เข้าสู่ระบบ จัดการบัญชี',
    icon: 'rocket',
  },
  {
    id: 'client',
    title: 'ลูกความ',
    site: 'lawslane.com',
    siteUrl: 'https://lawslane.com',
    blurb: 'ปรึกษา AI ลลิน หาทนาย ขอนัดหมาย ติดตามเคส ชำระค่าบริการ',
    icon: 'user',
  },
  {
    id: 'lawyer',
    title: 'ทนายความ',
    site: 'lawslane.com',
    siteUrl: 'https://lawslane.com/th/for-lawyers',
    blurb: 'สมัครและยืนยันตัวตน โปรไฟล์ รับงาน จัดการเคส รับเงิน แพลนรายเดือน',
    icon: 'scale',
  },
  {
    id: 'interpreter',
    title: 'บริการล่ามกฎหมาย',
    site: 'lawslane.com/interpreters',
    siteUrl: 'https://lawslane.com/th/interpreters',
    blurb: 'ขอใช้บริการล่าม คุยกับทีมงาน ชำระเงินผ่านลิงก์',
    icon: 'languages',
  },
  {
    id: 'capdeal',
    title: 'Cap & Deal',
    site: 'capdeal.lawslane.com',
    siteUrl: 'https://capdeal.lawslane.com',
    blurb: 'ร่าง ตรวจ เซ็น และแชร์สัญญา พร้อมแพ็กเกจรายเดือน',
    icon: 'file-signature',
  },
  {
    id: 'wittaya',
    title: 'Lawslane Wittaya',
    site: 'wittaya.lawslane.com',
    siteUrl: 'https://wittaya.lawslane.com',
    blurb: 'คอร์สเรียน คลังข้อสอบเก่าพร้อม AI ตรวจ และร้านหนังสือ',
    icon: 'graduation-cap',
  },
  {
    id: 'help',
    title: 'ช่วยเหลือ',
    site: 'ทุกเว็บในเครือ',
    blurb: 'คำถามพบบ่อย ติดต่อทีมงาน ความปลอดภัยและข้อมูลส่วนตัว',
    icon: 'life-buoy',
  },
];

export function getSection(id: string) {
  return SECTIONS.find((s) => s.id === id);
}
