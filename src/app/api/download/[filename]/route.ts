import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { validateFileMetadata, checkFileAccess } from '@/utils/fileUtils'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params
    const filePath = join(process.cwd(), 'public', 'uploads', filename)

    // TODO: 실제 인증 구현 시 세션/토큰에서 사용자 정보 가져오기
    const userId = 'test-user'
    const isAdmin = false

    // 파일 접근 권한 확인
    const hasAccess = await checkFileAccess(filePath, userId, isAdmin)
    if (!hasAccess) {
      return NextResponse.json(
        { success: false, error: '파일에 대한 접근 권한이 없습니다.' },
        { status: 403 }
      )
    }

    // 파일 메타데이터 검증
    const metadata = await validateFileMetadata(filePath)
    if (!metadata.isValid) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 파일입니다.' },
        { status: 400 }
      )
    }

    // 파일 읽기
    const fileBuffer = await readFile(filePath)

    // 다운로드를 위한 헤더 설정
    const headers = new Headers()
    headers.set('Content-Type', metadata.mimeType)
    headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`)
    headers.set('Content-Security-Policy', "default-src 'self'")
    headers.set('X-Content-Type-Options', 'nosniff')

    return new NextResponse(fileBuffer, {
      status: 200,
      headers
    })
  } catch (error) {
    console.error('File download error:', error)
    return NextResponse.json(
      { success: false, error: '파일 다운로드에 실패했습니다.' },
      { status: 500 }
    )
  }
}

function getContentType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  const mimeTypes: { [key: string]: string } = {
    'txt': 'text/plain',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed'
  }

  return mimeTypes[ext || ''] || 'application/octet-stream'
} 