'use client'

import { toggleInStock } from '@/app/actions'
import { useTransition } from 'react'

export default function ToggleStockButton({ id, inStock }: { id: string; inStock: boolean }) {
  const [isPending, startTransition] = useTransition()

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          await toggleInStock(formData)
        })
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={isPending}
        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors disabled:opacity-60 ${
          inStock
            ? 'bg-green-50 text-green-600 hover:bg-red-50 hover:text-red-500'
            : 'bg-red-50 text-red-500 hover:bg-green-50 hover:text-green-600'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-400'}`} />
        {isPending ? '...' : inStock ? 'มีสินค้า(กดเพื่อเปลี่ยนสถานะ)' : 'หมด(กดเพื่อเปลี่ยนสถานะ)'}
      </button>
    </form>
  )
}
