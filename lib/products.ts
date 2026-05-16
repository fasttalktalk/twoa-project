import fs from 'fs'
import path from 'path'

export type CategoryEntry = {
  key: string
  label: string
  icon: string
}

export type Product = {
  id: string
  name: string
  brand: string
  category: string
  price: number
  unit: string
  description: string
  image: string
  inStock: boolean
  featured: boolean
  createdAt: string
}

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), 'data')
const PRODUCTS_PATH = path.join(DATA_DIR, 'products.json')
const CATEGORIES_PATH = path.join(DATA_DIR, 'categories.json')

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

// ── Products ────────────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  if (!fs.existsSync(PRODUCTS_PATH)) return []
  return JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf-8'))
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id)
}

export function saveProducts(products: Product[]): void {
  ensureDir(DATA_DIR)
  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2), 'utf-8')
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts()
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
  }
  saveProducts([...products, newProduct])
  return newProduct
}

export function deleteProduct(id: string): boolean {
  const products = getProducts()
  const filtered = products.filter((p) => p.id !== id)
  if (filtered.length === products.length) return false
  saveProducts(filtered)
  return true
}

export function updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'createdAt'>>): boolean {
  const products = getProducts()
  const idx = products.findIndex((p) => p.id === id)
  if (idx === -1) return false
  products[idx] = { ...products[idx], ...data }
  saveProducts(products)
  return true
}

// ── Categories ───────────────────────────────────────────────────────────────

export function getCategories(): CategoryEntry[] {
  if (!fs.existsSync(CATEGORIES_PATH)) return []
  return JSON.parse(fs.readFileSync(CATEGORIES_PATH, 'utf-8'))
}

function saveCategories(cats: CategoryEntry[]): void {
  ensureDir(DATA_DIR)
  fs.writeFileSync(CATEGORIES_PATH, JSON.stringify(cats, null, 2), 'utf-8')
}

export function addCategory(entry: CategoryEntry): void {
  const cats = getCategories()
  if (cats.find((c) => c.key === entry.key)) throw new Error('KEY_EXISTS')
  saveCategories([...cats, entry])
}

export function deleteCategory(key: string): void {
  const cats = getCategories()
  saveCategories(cats.filter((c) => c.key !== key))
}

// Convenience maps built on-the-fly (drop-in for old CATEGORIES / CATEGORY_ICONS)
export function getCategoryMap(): Record<string, string> {
  return Object.fromEntries(getCategories().map((c) => [c.key, c.label]))
}

export function getCategoryIconMap(): Record<string, string> {
  return Object.fromEntries(getCategories().map((c) => [c.key, c.icon]))
}
