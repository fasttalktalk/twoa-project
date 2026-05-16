import Link from 'next/link'
import { getCategoryMap, type Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  const categoryMap = getCategoryMap()

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#1b3c8b]/30 hover:shadow-lg transition-all duration-200">
        <div className="aspect-square bg-gray-50 flex items-center justify-center">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl opacity-20 select-none">📦</span>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-[#1b3c8b] bg-blue-50 px-2 py-0.5 rounded-full">
              {product.brand}
            </span>
            <span className="text-xs text-gray-400">
              {categoryMap[product.category] ?? product.category}
            </span>
          </div>

          <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-[#1b3c8b] transition-colors mb-3">
            {product.name}
          </h3>

          <div className="flex items-end justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">
                ฿{product.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 ml-1">/ {product.unit}</span>
            </div>
            {!product.inStock && (
              <span className="text-xs text-red-400 font-medium">หมด</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
