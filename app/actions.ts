'use server'

import { addProduct, deleteProduct, updateProduct, getProducts, saveProducts, addCategory, deleteCategory } from '@/lib/products'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import fs from 'fs'
import path from 'path'

async function resolveImage(formData: FormData): Promise<string> {
  const file = formData.get('imageFile') as File | null
  if (file && file.size > 0) {
    const dataDir = process.env.DATA_DIR ?? path.join(process.cwd(), 'data')
    const uploadsDir = path.join(dataDir, 'uploads')
    fs.mkdirSync(uploadsDir, { recursive: true })
    const ext = path.extname(file.name) || '.jpg'
    const filename = `${Date.now()}${ext}`
    fs.writeFileSync(path.join(uploadsDir, filename), Buffer.from(await file.arrayBuffer()))
    return `/api/images/${filename}`
  }
  return (formData.get('imageUrl') as string) || ''
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string
  const brand = formData.get('brand') as string
  const category = formData.get('category') as string
  const price = parseFloat(formData.get('price') as string)
  const unit = formData.get('unit') as string
  const description = formData.get('description') as string
  const image = await resolveImage(formData)
  const inStock = formData.get('inStock') === 'true'
  const featured = formData.get('featured') === 'true'

  addProduct({ name, brand, category, price, unit, description, image, inStock, featured })

  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/admin')
  redirect('/admin')
}

export async function removeProduct(formData: FormData) {
  const id = formData.get('id') as string
  deleteProduct(id)
  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/admin')
}

export async function editProduct(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const brand = formData.get('brand') as string
  const category = formData.get('category') as string
  const price = parseFloat(formData.get('price') as string)
  const unit = formData.get('unit') as string
  const description = formData.get('description') as string
  const image = await resolveImage(formData)
  const inStock = formData.get('inStock') === 'true'
  const featured = formData.get('featured') === 'true'

  const current = getProducts().find((p) => p.id === id)
  updateProduct(id, {
    name, brand, category, price, unit, description, inStock, featured,
    image: image || current?.image || '',
  })

  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath(`/products/${id}`)
  revalidatePath('/admin')
  redirect('/admin')
}

export async function toggleInStock(formData: FormData) {
  const id = formData.get('id') as string
  const products = getProducts()
  const updated = products.map((p) =>
    p.id === id ? { ...p, inStock: !p.inStock } : p
  )
  saveProducts(updated)
  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/admin')
}

export async function createCategory(
  _prev: { error?: string } | undefined,
  formData: FormData,
) {
  const label = (formData.get('label') as string).trim()
  const icon = (formData.get('icon') as string).trim() || '📦'
  const key = label
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9ก-๙-]/g, '')
    .slice(0, 40)

  if (!key) return { error: 'ชื่อหมวดหมู่ไม่ถูกต้อง' }

  try {
    addCategory({ key, label, icon })
  } catch {
    return { error: 'มีหมวดหมู่นี้อยู่แล้ว' }
  }

  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/admin')
  revalidatePath('/admin/add')
  revalidatePath('/admin/categories')
}

export async function removeCategory(formData: FormData) {
  const key = formData.get('key') as string
  deleteCategory(key)
  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/admin')
  revalidatePath('/admin/categories')
}
