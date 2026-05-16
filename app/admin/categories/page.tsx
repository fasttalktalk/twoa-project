import Link from 'next/link'
import { getCategories, getProducts } from '@/lib/products'
import { createCategory, removeCategory } from '@/app/actions'
import CategoryForm from './CategoryForm'
import DeleteCategoryButton from './DeleteCategoryButton'

export default function CategoriesPage() {
  const categories = getCategories()
  const products = getProducts()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-1">
            ← กลับ Admin
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">จัดการหมวดหมู่</h1>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Add form */}
        <CategoryForm createCategory={createCategory} />

        {/* List */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800 text-sm">หมวดหมู่ทั้งหมด ({categories.length})</h2>
          </div>

          {categories.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">ยังไม่มีหมวดหมู่</div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {categories.map(({ key, label, icon }) => {
                const count = products.filter((p) => p.category === key).length
                return (
                  <li key={key} className="flex items-center gap-4 px-5 py-4">
                    <span className="text-2xl w-8 text-center">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">key: {key} · {count} สินค้า</p>
                    </div>
                    <DeleteCategoryButton
                      categoryKey={key}
                      label={label}
                      productCount={count}
                      removeCategory={removeCategory}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
