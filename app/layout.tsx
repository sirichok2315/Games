import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="bg-slate-50 min-h-screen text-slate-800 flex flex-col">
        {/* แถบเมนูตรงกลาง */}
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
          <div className="w-full max-w-[2400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <nav>
              <ul className="flex items-center gap-4 text-sm font-semibold text-slate-600">
                <li>
                  <Link href="/courses" className="hover:text-indigo-600 transition-colors">
                    หลักสูตร
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-indigo-600 transition-colors">
                    เกี่ยวกับเรา
                  </Link>
                </li>
                <li>
                  <Link href="/games" className="hover:text-indigo-600 transition-colors">
                    Game
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* เนื้อหากรอบขนาดพอดีอยู่ตรงกลาง */}
        <main className="w-full max-w-[2400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex-1 flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}