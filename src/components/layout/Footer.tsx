export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">삼미정보시스템(주)</h3>
            <p className="text-sm opacity-80">
              최고의 IT 솔루션과 서비스로<br />
              고객의 성공을 지원합니다.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">연락처</h4>
            <p className="text-sm opacity-80">
              전화: 02-1234-5678<br />
              팩스: 02-1234-5679<br />
              이메일: info@sammi.com
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">주소</h4>
            <p className="text-sm opacity-80">
              서울특별시 강남구 테헤란로 123<br />
              삼미빌딩 4층
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-60">
          © 2024 삼미정보시스템(주). All rights reserved.
        </div>
      </div>
    </footer>
  )
} 