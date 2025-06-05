'use client'

import { useEffect, useRef } from 'react'

const visionData = [
  {
    title: '미션',
    description: '혁신적인 IT 솔루션으로 고객의 디지털 혁신을 선도합니다.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: '비전',
    description: '글로벌 IT 시장을 선도하는 혁신 기업으로 성장합니다.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: '핵심가치',
    description: '혁신, 신뢰, 전문성을 바탕으로 최고의 가치를 창출합니다.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

const historyData = [
  { year: '2024', event: '글로벌 시장 진출' },
  { year: '2023', event: '클라우드 서비스 출시' },
  { year: '2022', event: '기업부설연구소 설립' },
  { year: '2021', event: '벤처기업 인증' },
  { year: '2020', event: '삼미정보시스템(주) 설립' },
]

export default function AboutSection() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Vision & Mission */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">회사 소개</h2>
          <p className="text-lg text-text/80">혁신적인 기술로 미래를 선도하는 기업</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {visionData.map((item, index) => (
            <div
              key={item.title}
              className="animate-on-scroll opacity-0 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-primary mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-text/80">{item.description}</p>
            </div>
          ))}
        </div>

        {/* History Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20"></div>
          {historyData.map((item, index) => (
            <div
              key={item.year}
              className={`animate-on-scroll opacity-0 flex items-center mb-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex-1 p-4">
                <div
                  className={`bg-white p-6 rounded-lg shadow-lg ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}
                >
                  <h4 className="text-xl font-bold text-primary mb-2">{item.year}</h4>
                  <p className="text-text/80">{item.event}</p>
                </div>
              </div>
              <div className="w-4 h-4 bg-primary rounded-full relative z-10">
                <div className="w-8 h-8 bg-primary/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div className="flex-1 p-4"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 