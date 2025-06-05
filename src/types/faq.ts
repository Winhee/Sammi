export interface FaqAttachment {
  id: number;
  postId: number;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  uploadedAt: string;
}

export interface FaqPost {
  id: number;
  title: string;
  content: string;
  author: string;
  password: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
  attachments: FaqAttachment[];
}

export interface FaqComment {
  id: number;
  postId: number;
  content: string;
  author: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface FaqPostInput {
  title: string;
  content: string;
  author: string;
  password: string;
  isPrivate: boolean;
  attachments?: File[];
}

export interface FaqCommentInput {
  postId: number;
  content: string;
  author: string;
  password?: string;
  isAdmin: boolean;
} 