'use client'

import { useActionState } from 'react'

type Props = {
  createCategory: (
    prev: { error?: string } | undefined,
    formData: FormData,
  ) => Promise<{ error?: string } | undefined>
}

export default function CategoryForm({ createCategory }: Props) {
  const [state, action, pending] = useActionState(createCategory, undefined)

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <h2 className="font-semibold text-gray-800 text-sm mb-4">เพิ่มหมวดหมู่ใหม่</h2>
      <form action={action} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          name="icon"
          placeholder="🏷"
          maxLength={2}
          className="w-16 border border-gray-200 rounded-xl px-3 py-2.5 text-center text-lg outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
        />
        <input
          type="text"
          name="label"
          required
          placeholder="ชื่อหมวดหมู่ เช่น อุปกรณ์ไฟฟ้า"
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-[#1b3c8b] hover:bg-[#132a63] disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
        >
          {pending ? 'กำลังเพิ่ม...' : '+ เพิ่ม'}
        </button>
      </form>
      {state?.error && (
        <p className="text-sm text-red-500 mt-2">{state.error}</p>
      )}
    </div>
  )
}
