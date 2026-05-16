import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'TWO A HARDWARE — ทูเอ ฮาร์ดแวร์',
  description: 'จำหน่ายสี เครื่องมือช่าง อุปกรณ์รถยนต์ และฮาร์ดแวร์คุณภาพสูง',
  icons:{
    icon: '/public/logo.jpg',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={geist.variable}>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
