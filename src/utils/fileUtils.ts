import crypto from 'crypto';
import { lookup } from 'mime-types';
import path from 'path';
import fs from 'fs/promises';

// 허용된 파일 타입 정의
export const ALLOWED_FILE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
]);

// 파일 크기 제한 (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_FILES_PER_UPLOAD = 5;

// 파일 타입 검증
export const validateFileType = (mimetype: string): boolean => {
  return ALLOWED_FILE_TYPES.has(mimetype);
};

// 파일 크기 검증
export const validateFileSize = (size: number): boolean => {
  return size <= MAX_FILE_SIZE;
};

// 안전한 파일 이름 생성
export const generateSafeFileName = (originalName: string): string => {
  const ext = path.extname(originalName);
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(16).toString('hex');
  return `${timestamp}-${randomString}${ext}`;
};

// 파일 메타데이터 검증
export const validateFileMetadata = async (filePath: string) => {
  const stat = await fs.stat(filePath);
  const mimeType = lookup(filePath) || 'application/octet-stream';
  
  return {
    size: stat.size,
    mimeType,
    isValid: validateFileType(mimeType) && validateFileSize(stat.size)
  };
};

// 파일 정리 (24시간 이상 된 임시 파일 삭제)
export const cleanupTempFiles = async (directory: string) => {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  const files = await fs.readdir(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = await fs.stat(filePath);
    
    if (now - stat.ctimeMs > ONE_DAY) {
      await fs.unlink(filePath);
    }
  }
};

// 파일 접근 권한 확인
export const checkFileAccess = async (
  filePath: string,
  userId: string,
  isAdmin: boolean
): Promise<boolean> => {
  // TODO: 실제 파일 접근 권한 로직 구현
  // 예: DB에서 파일 메타데이터를 조회하여 권한 확인
  return true;
}; 