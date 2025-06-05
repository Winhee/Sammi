import { join } from 'path';
import { cleanupTempFiles } from './fileUtils';

// 매일 자정에 실행
export const scheduleCleanup = () => {
  const now = new Date();
  const night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // 다음날
    0, // 0시
    0, // 0분
    0  // 0초
  );
  
  const msUntilMidnight = night.getTime() - now.getTime();
  
  // 첫 실행을 자정에 맞추기
  setTimeout(() => {
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // 처음 한 번 실행
    cleanupTempFiles(uploadDir).catch(console.error);
    
    // 이후 24시간마다 실행
    setInterval(() => {
      cleanupTempFiles(uploadDir).catch(console.error);
    }, 24 * 60 * 60 * 1000);
  }, msUntilMidnight);
}; 