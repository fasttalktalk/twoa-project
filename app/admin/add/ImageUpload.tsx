'use client'

import { useState, useRef } from 'react'

export default function ImageUpload() {
  const [preview, setPreview] = useState<string>('')
  const [mode, setMode] = useState<'file' | 'url'>('file')
  const [urlValue, setUrlValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setUrlValue('')
  }

  function handleUrl(e: React.ChangeEvent<HTMLInputElement>) {
    setUrlValue(e.target.value)
    setPreview(e.target.value)
  }

  function clearImage() {
    setPreview('')
    setUrlValue('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">รูปภาพสินค้า</label>
        <div className="flex bg-gray-100 rounded-lg p-0.5 text-xs">
          <button
            type="button"
            onClick={() => { setMode('file'); clearImage() }}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${mode === 'file' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            อัปโหลดไฟล์
          </button>
          <button
            type="button"
            onClick={() => { setMode('url'); clearImage() }}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${mode === 'url' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            URL
          </button>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        {/* Preview */}
        <div className="w-24 h-24 shrink-0 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl opacity-20">🖼</span>
          )}
        </div>

        {/* Input */}
        <div className="flex-1">
          {mode === 'file' ? (
            <>
              <input
                ref={inputRef}
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleFile}
                className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-[#132a63] hover:file:bg-blue-100 cursor-pointer"
              />
              <p className="text-xs text-gray-400 mt-1.5">JPG, PNG, WEBP — ขนาดไม่เกิน 5MB</p>
            </>
          ) : (
            <>
              <input
                type="url"
                name="imageUrl"
                value={urlValue}
                onChange={handleUrl}
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1b3c8b] focus:ring-2 focus:ring-blue-100"
              />
              <p className="text-xs text-gray-400 mt-1.5">ใส่ URL รูปภาพจากอินเทอร์เน็ต</p>
            </>
          )}
          {preview && (
            <button
              type="button"
              onClick={clearImage}
              className="text-xs text-red-400 hover:text-red-600 mt-1.5"
            >
              ล้างรูป
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
