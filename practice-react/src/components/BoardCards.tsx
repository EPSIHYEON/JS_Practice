import React from "react";

// 포스트 카드의 이미지 타입을 위한 리터럴 타입 (export해서 App.tsx에서도 사용)
export type PostImageType = 'image' | 'noImage';

export interface BoardCardProps{
    title: string;
    snippet:string; //단편: 게시글의 일부만 나오게.. 
    type:PostImageType;
    imageUrl?: string;
}

interface ImageProps{
    type: PostImageType;
    imageUrl?: string;
}

// 이미지 플레이스홀더 컴포넌트
const ImagePlaceholder = ({ type, imageUrl }: ImageProps) =>{
  // 1. 'image' 타입이고 imageUrl이 있으면, 실제 이미지 렌더링
  if (type === 'image' && imageUrl) {
    return (
      <div className="w-full aspect-video">
        <img 
          src={imageUrl} 
          alt={imageUrl} 
          className="w-full h-full object-cover" 
        />
      </div>
    );
  }
}

// --- 메인 BlogCard 컴포넌트 ---
export default function BoardCard({ title, snippet, type, imageUrl }: BoardCardProps){
  return (
    // 카드 전체 컨테이너
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 border border-gray-300">
      
      {/* 이미지 공간 */}
      <ImagePlaceholder type={type} imageUrl={imageUrl} />
      
      {/* 텍스트 컨텐츠 (제목, 미리보기) */}
      <div className="p-4 bg-white">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
          {title}
        </h3>
        <p className="text-gray-600 text-sm h-10 overflow-hidden text-ellipsis">
          {snippet}
        </p>
      </div>
    </div>
  );
}