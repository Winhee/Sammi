import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import {
  validateFileType,
  validateFileSize,
  generateSafeFileName,
  MAX_FILES_PER_UPLOAD,
  cleanupTempFiles
} from '@/utils/fileUtils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files')
    
    // 파일 개수 제한 확인
    if (files.length > MAX_FILES_PER_UPLOAD) {
      return NextResponse.json(
        { success: false, error: `최대 ${MAX_FILES_PER_UPLOAD}개의 파일만 업로드할 수 있습니다.` },
        { status: 400 }
      )
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads')
    
    // 업로드 디렉토리가 없으면 생성
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      console.error('Failed to create upload directory:', error)
    }

    const savedFiles = []

    for (const file of files) {
      if (!(file instanceof File)) {
        continue
      }

      // 파일 타입 검증
      if (!validateFileType(file.type)) {
        return NextResponse.json(
          { success: false, error: '허용되지 않는 파일 형식입니다.' },
          { status: 400 }
        )
      }

      // 파일 크기 검증
      if (!validateFileSize(file.size)) {
        return NextResponse.json(
          { success: false, error: '파일 크기가 제한을 초과했습니다.' },
          { status: 400 }
        )
      }

      // 안전한 파일 이름 생성
      const safeFileName = generateSafeFileName(file.name)
      const filePath = join(uploadDir, safeFileName)

      // 파일을 Buffer로 변환
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // 파일 저장
      await writeFile(filePath, buffer)

      savedFiles.push({
        originalName: file.name,
        savedName: safeFileName,
        size: file.size,
        type: file.type,
        url: `/uploads/${safeFileName}`,
        uploadedAt: new Date().toISOString()
      })
    }

    // 오래된 임시 파일 정리
    cleanupTempFiles(uploadDir).catch(console.error)

    return NextResponse.json({
      success: true,
      files: savedFiles
    })
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { success: false, error: '파일 업로드에 실패했습니다.' },
      { status: 500 }
    )
  }
} 