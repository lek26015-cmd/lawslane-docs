# lawslane-docs

คู่มือการใช้งานระบบในเครือ Lawslane สำหรับ docs.lawslane.com — lawslane.com (ลูกความ/ทนาย/ล่าม), Cap & Deal, Lawslane Wittaya
ไม่รวมหลังบ้านแอดมินโดยตั้งใจ

- 3 ภาษา th / en / zh — URL เป็น `/th/...`, `/en/...`, `/zh/...` และหน้า `/` เลือกภาษาให้อัตโนมัติ
- เนื้อหาอยู่ที่ `content/<ภาษา>/<หมวด>/<เลขลำดับ>-<slug>.md` (frontmatter: `title`, `description`)
  ภาษาไทยเป็นต้นฉบับ — ถ้าหน้าไหนยังไม่มีฉบับแปล จะแสดงเนื้อหาไทยพร้อมแถบแจ้ง
- ลิงก์ภายในในไฟล์ markdown เขียนแบบไม่มีภาษา เช่น `/client/payment` ระบบเติมภาษาให้เอง
- ข้อความของหน้าเว็บ (ปุ่ม เมนู) อยู่ใน `src/lib/i18n.ts`
- หมวดและลำดับกำหนดใน `src/lib/sections.ts`
- `npm run dev` (พอร์ต 9040) · `npm run build` → static ใน `out/`
