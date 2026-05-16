import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduct, getProducts, getCategoryMap } from '@/lib/products'

type Params = Promise<{ id: string }>

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const categoryMap = getCategoryMap()
  const related = getProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600">หน้าแรก</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-600">สินค้า</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-gray-600">
          {categoryMap[product.category] ?? product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-700 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="bg-white border border-gray-100 rounded-3xl aspect-square flex items-center justify-center">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-3xl" />
          ) : (
            <span className="text-8xl opacity-20">📦</span>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-[#1b3c8b] bg-blue-50 px-3 py-1 rounded-full">
              {product.brand}
            </span>
            <span className="text-sm text-gray-400">{categoryMap[product.category] ?? product.category}</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-gray-900">฿{product.price.toLocaleString()}</span>
            <span className="text-gray-400">/ {product.unit}</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <div className="mt-auto">
            <div
              className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg mb-6 ${
                product.inStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-400'}`}></span>
              {product.inStock ? 'มีสินค้าพร้อมส่ง' : 'สินค้าหมด'}
            </div>

            <p className="text-sm text-gray-500 mb-3">ติดต่อซื้อได้ผ่านช่องทางด้านล่าง</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61571792037230"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 bg-[#1877F2] hover:bg-[#1464d8] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
                Facebook
              </a>
              <a
                href="https://line.me/ti/p/~twoahardware"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05a847] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                Line
              </a>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-5">สินค้าในหมวดเดียวกัน</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group bg-white border border-gray-100 rounded-2xl p-4 hover:border-[#1b3c8b]/30 transition-all">
                <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center mb-3 opacity-20">
                  📦
                </div>
                <p className="text-xs font-medium text-[#1b3c8b] mb-1">{p.brand}</p>
                <p className="text-sm text-gray-700 line-clamp-2 leading-snug mb-2 group-hover:text-[#1b3c8b] transition-colors">
                  {p.name}
                </p>
                <p className="text-sm font-bold">฿{p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
