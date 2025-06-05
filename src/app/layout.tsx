import './globals.css'
import { Roboto_Mono } from 'next/font/google'
import { scheduleCleanup } from '@/utils/cleanupScheduler'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

// 서버 사이드에서만 실행
if (typeof window === 'undefined') {
  scheduleCleanup();
}

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
    <html lang="ko" className={robotoMono.variable}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body className="bg-background text-text font-sans">{children}</body>
    </html>
  )
}
