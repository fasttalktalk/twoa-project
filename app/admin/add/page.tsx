import Link from 'next/link'
import { createProduct } from '@/app/actions'
import { getCategories } from '@/lib/products'
import ImageUpload from './ImageUpload'

export default function AddProductPage() {
  const categories = getCategories()
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-4">
          ← กลับ Admin
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">เพิ่มสินค้าใหม่</h1>
      </div>

      <form action={createProduct} encType="multipart/form-data" className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ชื่อสินค้า <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="เช่น สีสเปรย์ BOSNY สีแดง"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              แบรนด์ <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="brand"
              required
              placeholder="เช่น BOSNY, TOA, MAKITA"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700">
                หมวดหมู่ <span className="text-red-400">*</span>
              </label>
              <Link href="/admin/categories" className="text-xs text-[#1b3c8b] hover:underline">
                + จัดการหมวดหมู่
              </Link>
            </div>
            <select
              name="category"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100 bg-white"
            >
              {categories.map(({ key, label }) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ราคา (บาท) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="price"
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              หน่วย <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="unit"
              required
              placeholder="เช่น กระป๋อง, ถัง, ชุด"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">คำอธิบายสินค้า</label>
            <textarea
              name="description"
              rows={3}
              placeholder="อธิบายรายละเอียดสินค้า..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100 resize-none"
            />
          </div>

          <div className="sm:col-span-2">
            <ImageUpload />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="inStock"
                value="true"
                defaultChecked
                className="w-4 h-4 accent-[#1b3c8b]"
              />
              <span className="text-sm font-medium text-gray-700">มีสินค้าพร้อมส่ง</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                value="true"
                className="w-4 h-4 accent-[#1b3c8b]"
              />
              <span className="text-sm font-medium text-gray-700">สินค้าแนะนำ</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-[#1b3c8b] hover:bg-[#132a63] text-white font-semibold py-3 rounded-xl transition-colors"
          >
            เพิ่มสินค้า
          </button>
          <Link
            href="/admin"
            className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
          >
            ยกเลิก
          </Link>
        </div>
      </form>
    </div>
  )
}
