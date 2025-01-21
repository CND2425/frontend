import '@/app/ui/global.css'
import { Metadata } from 'next'

import { inter } from '@/app/ui/fonts'

export const metadata: Metadata = {
  title: 'ecme',
  description: 'CND - ECME Project'
  // icons: {
  //   icon: '/favicon.png',
  // },
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
