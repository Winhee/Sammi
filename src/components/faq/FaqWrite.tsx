'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaqPostInput } from '@/types/faq'
import FileUpload from './FileUpload'

export default function FaqWrite() {
  const router = useRouter()
  const [formData, setFormData] = useState<FaqPostInput>({
    title: '',
    content: '',
    author: '',
    password: '',
    isPrivate: false,
    attachments: [],
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // 파일 업로드
      const uploadedFiles = await uploadFiles(selectedFiles)

      // TODO: API 호출하여 게시글 저장
      console.log('Form submitted:', {
        ...formData,
        attachments: uploadedFiles
      })

      router.push('/support/faq')
    } catch (error) {
      console.error('Form submission error:', error)
      setError('게시글 작성 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return []

    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('파일 업로드에 실패했습니다.')
    }

    const data = await response.json()
    return data.files
  }

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files)
  }

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">FAQ 작성</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            제목
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            내용
          </label>
          <textarea
            id="content"
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              작성자
            </label>
            <input
              type="text"
              id="author"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary"
              checked={formData.isPrivate}
              onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
            />
            <span className="ml-2 text-sm text-gray-700">비밀글로 작성</span>
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            파일 첨부
          </label>
          <FileUpload
            onFilesSelected={handleFilesSelected}
            maxFiles={5}
            maxSizeInMB={10}
            acceptedFileTypes="*/*"
          />
          {selectedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            disabled={isSubmitting}
          >
            취소
          </button>
          <button
            type="submit"
            className={`px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? '등록 중...' : '등록'}
          </button>
        </div>
      </form>
    </div>
  )
} 