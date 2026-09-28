import '../globals.css';

// layout แยกสำหรับหน้า "/" ที่มีหน้าที่เดียวคือพาไปหน้าภาษาที่เหมาะสม
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
