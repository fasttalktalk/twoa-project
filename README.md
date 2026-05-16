# ทูเอ ฮาร์ดแวร์ (TWO A Hardware)

เว็บไซต์แคตตาล็อกสินค้า สำหรับร้าน **ทูเอ ฮาร์ดแวร์** จำหน่ายสี เครื่องมือ และฮาร์ดแวร์ชั้นนำ

Live: [https://twoa-project-production.up.railway.app](https://twoa-project-production.up.railway.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | Tailwind CSS v4 |
| Language | TypeScript |
| Auth | JWT via `jose` (stored in httpOnly cookie) |
| Storage | JSON files on disk (no database) |
| Image upload | Local filesystem, served via API route |
| Hosting | Railway (Docker + persistent volume) |

---

## Features

- หน้าแคตตาล็อกสินค้า กรองตามหมวดหมู่ แบรนด์ และสถานะสต็อก
- หน้ารายละเอียดสินค้าแต่ละชิ้น
- ระบบ Admin (protected by password + JWT session):
  - เพิ่ม / แก้ไข / ลบสินค้า
  - อัปโหลดรูปภาพสินค้า
  - จัดการหมวดหมู่ (เพิ่ม / ลบ)
  - Toggle สถานะสินค้ามีพร้อมส่ง / ไม่พร้อมส่ง

---

## Project Structure

```
app/
  page.tsx              — หน้าหลัก (Hero + Categories + Featured)
  layout.tsx            — Root layout + Navbar + Footer
  actions.ts            — Server Actions (CRUD สินค้า + หมวดหมู่)
  products/
    page.tsx            — หน้าสินค้าทั้งหมด (filter, search)
    [id]/page.tsx       — หน้ารายละเอียดสินค้า
  admin/
    page.tsx            — Admin dashboard (รายการสินค้า)
    login/page.tsx      — หน้า login
    add/page.tsx        — เพิ่มสินค้าใหม่
    edit/[id]/page.tsx  — แก้ไขสินค้า
    categories/page.tsx — จัดการหมวดหมู่
  api/
    images/[filename]/  — Serve รูปภาพที่อัปโหลด

lib/
  products.ts           — อ่าน/เขียน products.json และ categories.json
  session.ts            — JWT encrypt/decrypt/createSession/deleteSession

proxy.ts                — Middleware: ป้องกัน /admin/* routes (ต้อง login)
```

---

## Local Development

### 1. ติดตั้ง dependencies

```bash
npm install
```

### 2. สร้างไฟล์ `.env.local`

```env
SESSION_SECRET=your-secret-key-here
ADMIN_PASSWORD=your-admin-password
```

### 3. รัน dev server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `SESSION_SECRET` | Secret key สำหรับ sign JWT | ✅ |
| `ADMIN_PASSWORD` | รหัสผ่าน Admin panel | ✅ |
| `DATA_DIR` | Path สำหรับเก็บไฟล์ JSON และรูปภาพ (default: `./data`) | ตามต้องการ |

---

## Data Storage

ข้อมูลทั้งหมดเก็บเป็น JSON files ใน folder `data/` (หรือ path ที่กำหนดใน `DATA_DIR`):

```
data/
  products.json     — รายการสินค้าทั้งหมด
  categories.json   — หมวดหมู่สินค้า
  uploads/          — รูปภาพที่ admin อัปโหลด
```

> บน Railway ใช้ Persistent Volume mount ที่ `/app/data` เพื่อไม่ให้ข้อมูลหายเมื่อ redeploy

---

## Railway Deployment

โปรเจกต์ใช้ `Dockerfile` เพื่อ build และ deploy บน Railway:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npm run build && npm start"]
```

> Build เกิดขึ้นตอน container startup (ไม่ใช่ตอน image build) เพื่อให้ environment variables พร้อมใช้งานตอน build

### ขั้นตอน Deploy

1. Push โค้ดขึ้น GitHub
2. สร้าง Railway project → เชื่อม GitHub repo
3. ตั้งค่า Service Settings:
   - **Root directory**: `/`
   - Environment variables: `SESSION_SECRET`, `ADMIN_PASSWORD`, `DATA_DIR=/app/data`
4. แนบ Persistent Volume → mount path `/app/data`
5. Railway จะ build และ deploy อัตโนมัติ

---

## Admin Panel

เข้าถึงได้ที่ `/admin/login`

- รหัสผ่านกำหนดใน environment variable `ADMIN_PASSWORD`
- Session มีอายุ 8 ชั่วโมง (JWT cookie)
- ทุก route ใต้ `/admin/*` ถูก protect ด้วย middleware (`proxy.ts`)
