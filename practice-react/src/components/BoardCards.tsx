import React from 'react';
import { Link } from 'react-router-dom';

// 포스트 카드의 이미지 타입을 위한 리터럴 타입 (export해서 App.tsx에서도 사용)
export type PostImageType = 'image' | 'noImage';

export interface BoardCardProps {
  id: string;
  title: string;
  snippet: string; // 게시글의 일부 미리보기
  type: PostImageType;
  imageUrl?: string;
  authorName?: string;
  likesCount?: number;
}

interface ImageProps {
  type: PostImageType;
  imageUrl?: string;
}

// 이미지 플레이스홀더 컴포넌트
const ImagePlaceholder = ({ type, imageUrl }: ImageProps) => {
  if (type === 'image' && imageUrl) {
    return (
      <div className="w-full h-40 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={imageUrl}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
      <span>No Image</span>
    </div>
  );
};

// --- 메인 카드 컴포넌트 ---
export default function BoardCard({
  id,
  title,
  snippet,
  type,
  imageUrl,
  authorName,
  likesCount = 0,
}: BoardCardProps) {
  return (
    <Link to={`/writtenPage/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 border border-gray-300 h-80 flex flex-col">
        <ImagePlaceholder type={type} imageUrl={imageUrl} />

        <div className="flex flex-col flex-1 p-3">
          <h3 className="text-base font-bold text-gray-900 truncate mb-1">
            {title}
          </h3>
          {authorName && (
            <p className="text-xs text-gray-500 mb-2">작성자: {authorName}</p>
          )}
          <p className="text-gray-600 text-sm leading-snug overflow-hidden h-15">
            {snippet}
          </p>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 text-sm text-gray-500">
          <span>좋아요 ❤️ {likesCount}</span>
        </div>
      </div>
    </Link>
  );
}
