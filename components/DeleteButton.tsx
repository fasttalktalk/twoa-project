'use client'

import { removeProduct } from '@/app/actions'

export default function DeleteButton({ id, name }: { id: string; name: string }) {
  return (
    <form action={removeProduct}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
        onClick={(e) => {
          if (!confirm(`ลบ "${name}" ใช่หรือไม่?`)) e.preventDefault()
        }}
      >
        ลบ
      </button>
    </form>
  )
}
