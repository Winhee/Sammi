import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* 여기에 메인 콘텐츠가 들어갈 예정입니다 */}
        <div className="h-[500px] flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">삼미정보시스템(주)</h1>
            <p className="text-xl md:text-2xl opacity-80">최고의 IT 솔루션과 서비스</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
