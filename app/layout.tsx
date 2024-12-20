import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vicunai',
  description: 'Your friendly thought-partner',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-[#7fff00] font-mono">
        {children}
      </body>
    </html>
  )
}
