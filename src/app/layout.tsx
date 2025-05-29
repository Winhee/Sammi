import './globals.css'
import localFont from 'next/font/local'
import { Roboto_Mono } from 'next/font/google'

const pretendard = localFont({
  src: [
    {
      path: '../fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export const metadata = {
  title: '삼미정보시스템(주)',
  description: '삼미정보시스템(주) 공식 웹사이트',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${robotoMono.variable}`}>
      <body className="bg-background text-text">{children}</body>
    </html>
  )
}
