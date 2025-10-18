import React from 'react';
import { Link } from 'react-router-dom';
// BlogCard 컴포넌트를 import (경로는 맞게 수정해줘)
import BoardCard from '../components/BoardCards';
import type { PostImageType } from '../components/BoardCards';

// Post 데이터 타입 (나중에 DB에서 받아올 구조)
interface Post {
  id: number;
  title: string;
  snippet: string;
  type: PostImageType;
  imageUrl?: string; // 'image' 타입일 때만 사용
}

// export default로 Home 컴포넌트를 내보냄
export default function Home(){
  
  // 샘플 데이터
  // 나중에는 이 데이터를 useState와 useEffect로 DB에서 불러올 거야.
  const posts: Post[] = [
    { id: 1, title: "하루를 보람차게 보내는 방법", snippet: "오늘은 열심히 사는 방법에 대해 이야기 해보겠다 하루를 보람차게 보내는 방법은 일단 첫번째...", type: 'noImage' }, // URL 예시
    { id: 2, title: "하루를 열심히 보내는 방법", snippet: "오늘은 열심히 사는 방법에 대해 이야기 해보겠다 하루를 보람차게 보내는 방법은 일단 첫번째...", type: 'noImage' },
    { id: 3, title: "하루를 멋지게 보내는 방법", snippet: "오늘은 열심히 사는 방법에 대해 이야기 해보겠다 하루를 보람차게 보내는 방법은 일단 첫번째...", type: 'noImage' },
    { id: 4, title: "하루를 보람차게 보내는 방법", snippet: "오늘은 열심히 사는 방법에 대해 이야기 해보겠다 하루를 보람차게 보내는 방법은 일단 첫번째...", type: 'noImage' },
    { id: 5, title: "GITHUB 관리하는 방법", snippet: "Git과 Github의 차이점부터 브랜치 전략까지...", type: 'noImage' },
    { id: 6, title: "리액트 열심히 하는 방법", snippet: "컴포넌트 라이프사이클과 상태 관리에 대해 알아봅니다...", type: 'noImage' },
  ];

  // return 되는 이 JSX가 App.tsx의 <main> 안으로 들어가게 됨
  return (
    <div className='m-6'>
      {/* 부제목 및 새 글 추가 버튼 */}
      <div className="flex flex-col md:items-center gap-4 mb-12">
        <h1 className="text-5xl text-white">
          구름에서 블로그를 시작해보세요
        </h1>
        <Link 
          to= {"/newpage"}
          className="bg-cyan-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-cyan-600 transition-colors mt-5 ml-160 text-[20px]"
        >
          새 글 추가
        </Link>
      </div>
      
      {/* 전체 게시글 섹션 */}
      <h2 className="text-4xl white mb-6">
        전체 게시글
      </h2>
      
      {/* *** 반응형 그리드 *** */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 샘플 데이터를 map으로 돌려서 BlogCard를 렌더링 */}
        {posts.map(post => (
          <BoardCard
            key={post.id}
            title={post.title}
            snippet={post.snippet}
            type={post.type}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}