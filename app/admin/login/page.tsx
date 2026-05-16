'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import Image from 'next/image'

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image
            src="/logo.jpg"
            alt="TWO A HARDWARE"
            width={72}
            height={72}
            className="rounded-2xl mx-auto mb-4 object-cover"
          />
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-400 mt-1">TWO A HARDWARE</p>
        </div>

        <form action={action} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">รหัสผ่าน (1234) For Demo</label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#1b3c8b] hover:bg-[#132a63] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors"
          >
            {pending ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
      </div>
    </div>
  )
}
