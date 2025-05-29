'use client'

import { useState } from 'react'

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('ko')

  const languages = {
    ko: '한국어',
    en: 'English',
  }

  const handleLanguageChange = (lang: keyof typeof languages) => {
    setCurrentLang(lang)
    setIsOpen(false)
    // TODO: 실제 언어 변경 로직 구현
  }

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 text-sm hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{languages[currentLang as keyof typeof languages]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded shadow-lg py-1 z-50">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                currentLang === code ? 'text-primary font-medium' : 'text-text'
              }`}
              onClick={() => handleLanguageChange(code as keyof typeof languages)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 