'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaqPost, FaqComment, FaqAttachment } from '@/types/faq'

interface FaqDetailProps {
  postId: number;
}

// 임시 데이터
const tempPost: FaqPost = {
  id: 1,
  title: '제품 설치 방법에 대해 문의드립니다.',
  content: '제품 설치 과정에서 오류가 발생하는데 어떻게 해결해야 하나요?',
  author: '김고객',
  password: '1234',
  isPrivate: false,
  createdAt: '2024-03-15',
  updatedAt: '2024-03-15',
  views: 15,
  attachments: [
    {
      id: 1,
      postId: 1,
      fileName: '오류_스크린샷.png',
      fileSize: 1024 * 1024, // 1MB
      fileUrl: '/uploads/error_screenshot.png',
      uploadedAt: '2024-03-15'
    }
  ]
}

const tempComments: FaqComment[] = [
  {
    id: 1,
    postId: 1,
    content: '안녕하세요. 구체적인 오류 메시지를 알려주시면 도움드리겠습니다.',
    author: '관리자',
    isAdmin: true,
    createdAt: '2024-03-15'
  }
]

export default function FaqDetail({ postId }: FaqDetailProps) {
  const router = useRouter()
  const [post] = useState<FaqPost>(tempPost)
  const [comments, setComments] = useState<FaqComment[]>(tempComments)
  const [newComment, setNewComment] = useState('')
  const [password, setPassword] = useState('')
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [isAdmin] = useState(false) // TODO: 실제 관리자 권한 체크 로직 필요

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // TODO: API 호출하여 게시글 삭제
      router.push('/support/faq')
    }
  }

  const handleEdit = () => {
    router.push(`/support/faq/edit/${postId}`)
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API 호출하여 댓글 저장
    const newCommentData: FaqComment = {
      id: comments.length + 1,
      postId,
      content: newComment,
      author: isAdmin ? '관리자' : '익명',
      isAdmin,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setComments([...comments, newCommentData])
    setNewComment('')
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDownload = async (attachment: FaqAttachment) => {
    try {
      // TODO: API 호출하여 파일 다운로드
      const response = await fetch(attachment.fileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = attachment.fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error)
      alert('파일 다운로드에 실패했습니다.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 게시글 내용 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <div className="flex justify-between text-sm text-gray-500">
            <div>
              <span>작성자: {post.author}</span>
              <span className="mx-2">|</span>
              <span>작성일: {post.createdAt}</span>
            </div>
            <span>조회수: {post.views}</span>
          </div>
        </div>
        <div className="min-h-[200px] mb-6 whitespace-pre-wrap">
          {post.content}
        </div>

        {/* 첨부 파일 */}
        {post.attachments.length > 0 && (
          <div className="border-t border-gray-200 pt-4 mb-6">
            <h3 className="text-lg font-medium mb-2">첨부 파일</h3>
            <div className="space-y-2">
              {post.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{attachment.fileName}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(attachment.fileSize)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(attachment)}
                    className="text-primary hover:text-secondary"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            목록
          </button>
          {(isAdmin || post.isPrivate) && (
            <>
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-primary hover:text-secondary transition-colors"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">댓글 {comments.length}개</h2>
        <div className="space-y-4 mb-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex justify-between mb-2">
                <span className={`font-medium ${comment.isAdmin ? 'text-primary' : ''}`}>
                  {comment.author}
                </span>
                <span className="text-sm text-gray-500">{comment.createdAt}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>

        {/* 댓글 작성 폼 */}
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary mb-4"
            rows={3}
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
            >
              댓글 작성
            </button>
          </div>
        </form>
      </div>

      {/* 비밀번호 확인 모달 */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">비밀번호 확인</h3>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  // TODO: 비밀번호 확인 로직
                  setShowPasswordModal(false)
                }}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 