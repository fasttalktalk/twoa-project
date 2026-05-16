'use client'

type Props = {
  categoryKey: string
  label: string
  productCount: number
  removeCategory: (formData: FormData) => Promise<void>
}

export default function DeleteCategoryButton({ categoryKey, label, productCount, removeCategory }: Props) {
  return (
    <form action={removeCategory}>
      <input type="hidden" name="key" value={categoryKey} />
      <button
        type="submit"
        className="text-xs text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
        onClick={(e) => {
          const warning = productCount > 0
            ? `หมวดหมู่ "${label}" มีสินค้าอยู่ ${productCount} รายการ\nสินค้าเหล่านั้นจะยังอยู่แต่ไม่มีหมวดหมู่\nต้องการลบหมวดหมู่ใช่หรือไม่?`
            : `ลบหมวดหมู่ "${label}" ใช่หรือไม่?`
          if (!confirm(warning)) e.preventDefault()
        }}
      >
        ลบ
      </button>
    </form>
  )
}
