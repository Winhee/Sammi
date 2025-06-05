export interface FAQ {
  question: string;
  answer: string;
  isPrivate?: boolean;
}

export const faqData: FAQ[] = [
  {
    question: '기술 지원은 어떻게 받을 수 있나요?',
    answer: '전화, 이메일, 원격 지원 등 다양한 채널을 통해 신속한 기술 지원을 제공해 드립니다. 고객지원센터(1588-XXXX)로 연락주시면 친절히 안내해 드리겠습니다.',
    isPrivate: false
  },
  {
    question: '제품 교육은 어떻게 진행되나요?',
    answer: '정기적인 집체교육과 요청에 따른 방문교육을 제공하고 있습니다. 온라인 교육 자료도 제공되며, 맞춤형 교육 일정 조율이 가능합니다.',
    isPrivate: false
  },
  {
    question: '유지보수 서비스는 어떻게 이루어지나요?',
    answer: '정기점검, 긴급출동, 원격지원 등 다양한 방식의 유지보수 서비스를 제공합니다. 서비스 계약 내용에 따라 맞춤형 지원이 이루어집니다.',
    isPrivate: false
  },
  {
    question: '제품 업그레이드는 어떻게 진행되나요?',
    answer: '정기적인 업데이트 및 패치를 제공하며, 주요 버전 업그레이드 시에는 사전 안내와 함께 원활한 전환을 지원해 드립니다.',
    isPrivate: false
  },
  {
    question: '제품 설치 방법에 대해 문의드립니다.',
    answer: '제품 설치 과정에서 오류가 발생하는 경우, 다음과 같은 절차로 해결할 수 있습니다...',
    isPrivate: false
  },
  {
    question: '라이센스 갱신은 어떻게 하나요?',
    answer: '라이센스 갱신은 관리자 페이지에서 진행할 수 있습니다...',
    isPrivate: false
  },
  {
    question: '비밀글입니다.',
    answer: '라이센스 관련 문의입니다.',
    isPrivate: true
  }
] 