import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Reusable Next.js + Supabase authentication',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
