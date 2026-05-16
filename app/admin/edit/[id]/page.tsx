import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduct, getCategories } from '@/lib/products'
import { editProduct } from '@/app/actions'

type Params = Promise<{ id: string }>

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const categories = getCategories()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-4">
          ← กลับ Admin
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">แก้ไขสินค้า</h1>
        <p className="text-sm text-gray-400 mt-1">{product.name}</p>
      </div>

      <form action={editProduct} encType="multipart/form-data" className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
        <input type="hidden" name="id" value={product.id} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ชื่อสินค้า <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={product.name}
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
              defaultValue={product.brand}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              หมวดหมู่ <span className="text-red-400">*</span>
            </label>
            <select
              name="category"
              required
              defaultValue={product.category}
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
              defaultValue={product.price}
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
              defaultValue={product.unit}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">คำอธิบายสินค้า</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={product.description}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100 resize-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">รูปภาพ</label>
            {product.image && (
              <div className="flex items-center gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt="" className="w-16 h-16 object-cover rounded-xl border border-gray-100" />
                <p className="text-xs text-gray-400">รูปปัจจุบัน — อัปโหลดใหม่หรือใส่ URL เพื่อเปลี่ยน</p>
              </div>
            )}
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-[#1b3c8b] hover:file:bg-blue-100 cursor-pointer mb-2"
            />
            <input
              type="url"
              name="imageUrl"
              placeholder="หรือใส่ URL รูปภาพ"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="inStock"
                value="true"
                defaultChecked={product.inStock}
                className="w-4 h-4 accent-[#1b3c8b]"
              />
              <span className="text-sm font-medium text-gray-700">มีสินค้าพร้อมส่ง</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                value="true"
                defaultChecked={product.featured}
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
            บันทึกการเปลี่ยนแปลง
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
