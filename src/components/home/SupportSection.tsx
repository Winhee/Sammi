'use client'

import { useState } from 'react'
import { faqData } from '@/data/faqs'

const supportChannels = [
  {
    title: '전화 상담',
    description: '평일 09:00-18:00',
    contact: '1588-XXXX',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    title: '이메일 문의',
    description: '24시간 접수 가능',
    contact: 'support@sammi.com',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: '원격 지원',
    description: '실시간 기술 지원',
    contact: '원격지원 연결하기',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'FAQ 게시판',
    description: '자주 묻는 질문 모음',
    contact: 'FAQ 바로가기',
    href: '/support/faq',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
]

export default function SupportSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">고객 지원</h2>
          <p className="text-lg text-text/80">언제나 고객 곁에서 든든한 지원을 약속드립니다</p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => channel.href ? window.location.href = channel.href : null}
            >
              <div className="text-primary mb-4">{channel.icon}</div>
              <h3 className="text-xl font-bold mb-2">{channel.title}</h3>
              <p className="text-text/80 mb-2">{channel.description}</p>
              <p className="text-primary font-semibold">{channel.contact}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">자주 묻는 질문</h3>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`px-6 pb-4 transition-all duration-200 ease-in-out ${
                    openFaq === index ? 'block opacity-100' : 'hidden opacity-0'
                  }`}
                >
                  <p className="text-text/80">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 