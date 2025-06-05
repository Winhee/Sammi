'use client'

import { useState } from 'react'

const businessAreas = [
  {
    id: 1,
    title: '시스템 통합',
    description: '기업의 업무 프로세스를 최적화하는 맞춤형 시스템 통합 서비스를 제공합니다.',
    details: [
      '업무 프로세스 분석 및 설계',
      '시스템 아키텍처 설계',
      '레거시 시스템 연동',
      '클라우드 마이그레이션',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 2,
    title: '소프트웨어 개발',
    description: '최신 기술을 활용한 맞춤형 소프트웨어 개발 서비스를 제공합니다.',
    details: [
      '웹 애플리케이션 개발',
      '모바일 앱 개발',
      '클라우드 네이티브 개발',
      'API 개발 및 통합',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'IT 컨설팅',
    description: '기업의 디지털 전환을 위한 전문적인 IT 컨설팅 서비스를 제공합니다.',
    details: [
      'IT 전략 수립',
      '디지털 전환 컨설팅',
      '정보 보안 컨설팅',
      '클라우드 전환 전략',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

export default function BusinessSection() {
  const [selectedBusiness, setSelectedBusiness] = useState<number | null>(null)

  return (
    <section id="business" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">사업 분야</h2>
          <p className="text-lg text-text/80">전문적인 IT 서비스로 고객의 성공을 지원합니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businessAreas.map((business) => (
            <div
              key={business.id}
              className="group relative perspective"
              onMouseEnter={() => setSelectedBusiness(business.id)}
              onMouseLeave={() => setSelectedBusiness(null)}
            >
              <div
                className={`relative transition-transform duration-500 transform-style-3d ${
                  selectedBusiness === business.id ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front */}
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow backface-hidden">
                  <div className="text-primary mb-6">{business.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{business.title}</h3>
                  <p className="text-text/80">{business.description}</p>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-primary text-white p-8 rounded-lg shadow-lg rotate-y-180 backface-hidden">
                  <h3 className="text-xl font-bold mb-4">{business.title}</h3>
                  <ul className="space-y-2">
                    {business.details.map((detail, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 