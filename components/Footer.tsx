import Link from 'next/link'
import Image from 'next/image'
import { getCategories } from '@/lib/products'

export default function Footer() {
  const categories = getCategories()

  return (
    <footer className="bg-[#1b3c8b] text-blue-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/admin" className="flex items-center gap-2.5 mb-4 w-fit">
              <Image
                src="/logo.jpg"
                alt="TWO A HARDWARE"
                width={36}
                height={36}
                className="rounded-md object-cover"
              />
              <div className="leading-tight">
                <span className="text-white font-bold text-sm block">TWO A</span>
                <span className="text-[#f5a623] text-[9px] font-semibold tracking-widest uppercase block">HARDWARE</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-blue-200">
              จำหน่ายสี เครื่องมือช่าง อุปกรณ์รถยนต์ และฮาร์ดแวร์คุณภาพสูง ครบครันในที่เดียว
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">หมวดหมู่สินค้า</h3>
            <ul className="space-y-2 text-sm">
              {categories.map(({ key, label }) => (
                <li key={key}>
                  <Link href={`/products?category=${key}`} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">ติดต่อเรา</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors flex items-center gap-2">
                  📞 123-456-789
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  💬 Line: ...
                </a>
              </li>
              <li className="flex items-center gap-2">🕐 จ-ส 08:00–17:00 น.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-10 pt-6 text-xs text-center text-blue-300">
          © 2026 TWO A HARDWARE (ทูเอ ฮาร์ดแวร์). All rights reserved.
        </div>
      </div>
    </footer>
  )
}
