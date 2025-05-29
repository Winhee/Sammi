'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LanguageSelector from './LanguageSelector'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-primary font-bold text-xl">삼미정보시스템</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-text hover:text-primary transition-colors">회사소개</Link>
            <Link href="/business" className="text-text hover:text-primary transition-colors">사업분야</Link>
            <Link href="/products" className="text-text hover:text-primary transition-colors">제품소개</Link>
            <Link href="/support" className="text-text hover:text-primary transition-colors">고객지원</Link>
            <LanguageSelector />
            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors">
              문의하기
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <nav className="py-4 flex flex-col space-y-4">
            <Link 
              href="/about" 
              className="text-text hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              회사소개
            </Link>
            <Link 
              href="/business" 
              className="text-text hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              사업분야
            </Link>
            <Link 
              href="/products" 
              className="text-text hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              제품소개
            </Link>
            <Link 
              href="/support" 
              className="text-text hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              고객지원
            </Link>
            <div className="px-2 py-1">
              <LanguageSelector />
            </div>
            <button className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors">
              문의하기
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
} 