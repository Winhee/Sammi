'use client'

import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    title: '최고의 IT 솔루션',
    subtitle: '혁신적인 기술로 비즈니스의 미래를 선도합니다',
    gradient: 'from-primary to-secondary',
  },
  {
    id: 2,
    title: '맞춤형 시스템 구축',
    subtitle: '고객의 요구사항에 최적화된 시스템을 제공합니다',
    gradient: 'from-secondary to-accent',
  },
  {
    id: 3,
    title: '전문적인 기술 지원',
    subtitle: '24시간 365일 안정적인 서비스를 제공합니다',
    gradient: 'from-accent to-primary',
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-white">
        <div className="container mx-auto px-4">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-center text-white/80">
                {slide.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
} 