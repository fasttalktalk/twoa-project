import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.jpg"
              alt="TWO A HARDWARE"
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            <div className="leading-tight">
              <span className="font-bold text-[#1b3c8b] text-base tracking-tight block">TWO A</span>
              <span className="text-[10px] font-semibold text-[#f5a623] tracking-widest uppercase block -mt-0.5">HARDWARE</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-gray-600 hover:text-[#1b3c8b] transition-colors font-medium">
              หน้าแรก
            </Link>
            <Link href="/products" className="text-sm text-gray-600 hover:text-[#1b3c8b] transition-colors font-medium">
              สินค้าทั้งหมด
            </Link>
          </nav>

          <Link
            href="/products"
            className="text-sm bg-[#1b3c8b] hover:bg-[#132a63] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ดูสินค้า
          </Link>
        </div>
      </div>
    </header>
  )
}
