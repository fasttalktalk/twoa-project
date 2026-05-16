import Link from 'next/link'
import { getProducts, getCategoryMap } from '@/lib/products'
import DeleteButton from '@/components/DeleteButton'
import ToggleStockButton from '@/components/ToggleStockButton'
import { logout } from '@/app/actions/auth'

export default function AdminPage() {
  const products = getProducts()
  const categoryMap = getCategoryMap()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">จัดการสินค้าทั้งหมด {products.length} รายการ</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/categories"
            className="text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl transition-colors"
          >
            หมวดหมู่
          </Link>
          <Link
            href="/admin/add"
            className="inline-flex items-center gap-2 bg-[#1b3c8b] hover:bg-[#132a63] text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            + เพิ่มสินค้าใหม่
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              ออกจากระบบ
            </button>
          </form>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-gray-500 mb-4">ยังไม่มีสินค้า</p>
          <Link href="/admin/add" className="text-[#1b3c8b] font-medium hover:text-[#132a63]">
            + เพิ่มสินค้าแรก
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">สินค้า</th>
                <th className="text-left px-4 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider hidden sm:table-cell">หมวดหมู่</th>
                <th className="text-left px-4 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">ราคา</th>
                <th className="text-left px-4 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">สถานะ</th>
                <th className="text-right px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                      <p className="text-xs text-[#1b3c8b] mt-0.5">{product.brand}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                      {categoryMap[product.category] ?? product.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-gray-900">฿{product.price.toLocaleString()}</span>
                    <span className="text-gray-400 text-xs ml-1">/{product.unit}</span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <ToggleStockButton id={product.id} inStock={product.inStock} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/edit/${product.id}`}
                        className="text-xs text-[#1b3c8b] hover:text-[#132a63] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                      >
                        แก้ไข
                      </Link>
                      <DeleteButton id={product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
