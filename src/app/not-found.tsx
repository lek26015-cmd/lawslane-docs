import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">ไม่พบหน้านี้</h1>
      <p className="mt-2 text-[var(--muted)]">หัวข้อนี้อาจถูกย้ายหรือเปลี่ยนชื่อแล้ว</p>
      <Link href="/" className="mt-6 inline-block text-[var(--accent)] hover:underline">กลับหน้าคู่มือ</Link>
    </main>
  );
}
