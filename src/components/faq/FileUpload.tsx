'use client'

import { useRef, useState } from 'react'

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizeInMB?: number;
  acceptedFileTypes?: string;
}

export default function FileUpload({
  onFilesSelected,
  maxFiles = 5,
  maxSizeInMB = 10,
  acceptedFileTypes = '*/*'
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string>('')

  const validateFiles = (files: File[]): boolean => {
    if (files.length > maxFiles) {
      setError(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`)
      return false
    }

    for (const file of files) {
      if (file.size > maxSizeInMB * 1024 * 1024) {
        setError(`파일 크기는 ${maxSizeInMB}MB를 초과할 수 없습니다.`)
        return false
      }
    }

    setError('')
    return true
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)
    if (validateFiles(fileArray)) {
      onFilesSelected(fileArray)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}
        `}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          accept={acceptedFileTypes}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M24 14v6m0 0v6m0-6h6m-6 0h-6"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4h24a8 8 0 0 1 8 8v24a8 8 0 0 1-8 8H12a8 8 0 0 1-8-8V12a8 8 0 0 1 8-8z"
          />
        </svg>
        <p className="mt-2 text-sm text-gray-600">
          파일을 드래그하여 업로드하거나 클릭하여 선택하세요
        </p>
        <p className="mt-1 text-xs text-gray-500">
          최대 {maxFiles}개 파일, {maxSizeInMB}MB 이하
        </p>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
} 