'use client'

import { useState } from 'react'
import Link from 'next/link'
import { faqData } from '@/data/faqs'

export default function FaqList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 검색 필터링
  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 페이지네이션
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedFaqs = filteredFaqs.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">FAQ 게시판</h2>
        <Link
          href="/support/faq/write"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
        >
          글쓰기
        </Link>
      </div>

      {/* 검색 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* FAQ 목록 */}
      <div className="space-y-4">
        {paginatedFaqs.map((faq, index) => (
          <Link
            key={startIndex + index}
            href={`/support/faq/${startIndex + index + 1}`}
            className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-text/80 line-clamp-2">{faq.answer}</p>
              {faq.isPrivate && (
                <div className="mt-2 flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-sm">비공개 글</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}
    </div>
  )
} 