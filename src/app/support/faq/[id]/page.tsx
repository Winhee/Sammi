import FaqDetail from '@/components/faq/FaqDetail'

interface FaqDetailPageProps {
  params: {
    id: string;
  }
}

export default function FaqDetailPage({ params }: FaqDetailPageProps) {
  return <FaqDetail postId={parseInt(params.id)} />
} 