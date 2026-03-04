import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'THREAT RADAR | Global Conflict Monitor',
  description: 'Real-time global threat monitoring dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen">
        {children}
      </body>
    </html>
  )
}
