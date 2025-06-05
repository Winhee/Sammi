import Image from 'next/image'
import Link from 'next/link'
import { faqData } from '@/data/faqs'

interface FAQ {
  question: string;
  answer: string;
}

export default function Home() {
  const previewFaqs = faqData.slice(0, 2);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-main.jpg"
            alt="삼미정보시스템 대표 이미지"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">삼미정보시스템</h1>
            <p className="text-xl md:text-2xl mb-8">혁신적인 IT 솔루션으로 미래를 선도합니다</p>
            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            >
              자세히 보기
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">자주 묻는 질문</h2>
            <div className="space-y-4">
              {previewFaqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-text/80">{faq.answer}</p>
                </div>
              ))}
              <div className="text-center mt-8">
                <Link
                  href="/support"
                  className="inline-block px-6 py-2 text-primary hover:text-secondary transition-colors"
                >
                  더 많은 질문 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-4">삼미정보시스템</h3>
              <p className="text-gray-400">혁신적인 IT 솔루션으로<br />미래를 선도하는 기업</p>
            </div>
            <div className="col-span-1">
              <h4 className="font-semibold mb-4">연락처</h4>
              <p className="text-gray-400">전화: 1588-XXXX</p>
              <p className="text-gray-400">이메일: support@sammi.com</p>
            </div>
            <div className="col-span-1">
              <h4 className="font-semibold mb-4">주소</h4>
              <p className="text-gray-400">
                서울특별시 강남구 테헤란로<br />
                삼미빌딩 8층
              </p>
            </div>
            <div className="col-span-1">
              <h4 className="font-semibold mb-4">고객지원</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/support" className="text-gray-400 hover:text-white transition-colors">
                    고객센터
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                    제품 소개
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    회사 소개
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 삼미정보시스템. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
