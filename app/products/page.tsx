import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProducts, getCategories, getCategoryIconMap } from '@/lib/products'

type SearchParams = Promise<{ category?: string; q?: string; featured?: string }>

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const { category, q, featured } = params

  const categories = getCategories()
  const iconMap = getCategoryIconMap()
  const validKeys = new Set(categories.map((c) => c.key))

  let products = getProducts()

  if (category && validKeys.has(category)) {
    products = products.filter((p) => p.category === category)
  }

  if (featured === 'true') {
    products = products.filter((p) => p.featured)
  }

  if (q) {
    const lower = q.toLowerCase()
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower),
    )
  }

  const activeCategory = category && validKeys.has(category) ? category : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">สินค้าทั้งหมด</h1>
        <form method="GET" action="/products" className="flex gap-2">
          {activeCategory && (
            <input type="hidden" name="category" value={activeCategory} />
          )}
          <input
            type="text"
            name="q"
            defaultValue={q || ''}
            placeholder="ค้นหาสินค้า, แบรนด์..."
            className="flex-1 max-w-sm bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="submit"
            className="bg-[#1b3c8b] hover:bg-[#132a63] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            ค้นหา
          </button>
          {(q || category || featured) && (
            <Link
              href="/products"
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              ล้าง
            </Link>
          )}
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-48 shrink-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">หมวดหมู่</p>
          <nav className="flex flex-row lg:flex-col gap-1 flex-wrap">
            <Link
              href={q ? `/products?q=${q}` : '/products'}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                !activeCategory && !featured
                  ? 'bg-blue-50 text-[#1b3c8b] font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ทั้งหมด
            </Link>
            {categories.map(({ key, label }) => (
              <Link
                key={key}
                href={q ? `/products?category=${key}&q=${q}` : `/products?category=${key}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeCategory === key
                    ? 'bg-blue-50 text-[#1b3c8b] font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{iconMap[key] ?? '📦'}</span>
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-medium text-gray-600 mb-1">ไม่พบสินค้า</p>
              <p className="text-sm">ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่อื่น</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-4">พบ {products.length} รายการ</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
