import React from 'react';
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nexus',
  description: 'Where the unknown begins, Nexus leads',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-[#0080ff] font-mono">
        {children}
      </body>
    </html>
  )
}
