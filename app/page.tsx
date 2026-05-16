import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProducts, getCategories, getCategoryIconMap } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default function Home() {
  const products = getProducts()
  const featured = products.filter((p) => p.featured).slice(0, 4)
  const categories = getCategories()
  const iconMap = getCategoryIconMap()

  const categoryCounts = categories.map((cat) => ({
    key: cat.key,
    label: cat.label,
    icon: iconMap[cat.key] ?? '📦',
    count: products.filter((p) => p.category === cat.key).length,
  }))

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1b3c8b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#f5a623]/20 text-[#f5a623] text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#f5a623] rounded-full"></span>
              สินค้าคุณภาพสูง พร้อมจัดส่ง
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              ทูเอ ฮาร์ดแวร์<br />
              <span className="text-[#f5a623]">สี เครื่องมือ ฮาร์ดแวร์</span>
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed mb-8">
              จำหน่ายสินค้าแบรนด์ชั้นนำกว่า 20+ แบรนด์ ทั้ง TOA, BOSNY, MAKITA, Stanley, 3M
              และอีกมากมาย สำหรับงานก่อสร้าง ซ่อมแซม และอุตสาหกรรม
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-[#f5a623] hover:bg-[#d4891a] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                ดูสินค้าทั้งหมด →
              </Link>
              <Link
                href="/products?featured=true"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-white/20"
              >
                สินค้าแนะนำ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900">หมวดหมู่สินค้า</h2>
          <Link href="/products" className="text-sm text-[#1b3c8b] hover:text-[#132a63] font-medium">
            ดูทั้งหมด →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categoryCounts.map(({ key, label, icon, count }) => (
            <Link
              key={key}
              href={`/products?category=${key}`}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#1b3c8b]/30 hover:shadow-md transition-all group text-center"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <div className="text-sm font-medium text-gray-800 group-hover:text-[#1b3c8b] transition-colors mb-1">
                {label}
              </div>
              <div className="text-xs text-gray-400">{count} รายการ</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">สินค้าแนะนำ</h2>
            <Link href="/products" className="text-sm text-[#1b3c8b] hover:text-[#132a63] font-medium">
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
