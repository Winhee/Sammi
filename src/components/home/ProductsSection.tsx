'use client'

import { useState } from 'react'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: 'ERP 시스템',
    description: '기업의 자원을 통합적으로 관리하는 솔루션',
    features: [
      '재무/회계 관리',
      '인사/급여 관리',
      '생산/재고 관리',
      '영업/구매 관리',
    ],
    image: '/images/product-erp.jpg'
  },
  {
    id: 2,
    name: '그룹웨어',
    description: '기업의 업무 효율성을 높이는 협업 솔루션',
    features: [
      '전자결재',
      '일정관리',
      '메일시스템',
      '게시판',
    ],
    image: '/images/product-groupware.jpg'
  },
  {
    id: 3,
    name: '클라우드 서비스',
    description: '언제 어디서나 접근 가능한 클라우드 기반 서비스',
    features: [
      '클라우드 스토리지',
      '서버 호스팅',
      '백업 서비스',
      '보안 서비스',
    ],
    image: '/images/product-cloud.jpg'
  }
]

export default function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">제품 소개</h2>
          <p className="text-lg text-text/80">혁신적인 솔루션으로 비즈니스 성공을 지원합니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              onMouseEnter={() => setSelectedProduct(product.id)}
              onMouseLeave={() => setSelectedProduct(null)}
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-primary/10" />
                <div className="w-full h-full flex items-center justify-center text-primary">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-text/80 mb-4">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 