import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// BlogCard 컴포넌트를 import (경로는 맞게 수정해줘)
import BoardCard from '../components/BoardCards';
import type { PostImageType } from '../components/BoardCards';
import { usePostsApi } from '../api/posts';

// Post 데이터 타입 (나중에 DB에서 받아올 구조)
interface Post {
  id: number | string;
  title: string;
  snippet: string;
  type: PostImageType;
  imageUrl?: string; // 'image' 타입일 때만 사용
}


// 백엔드 응답 타입 최소 정의
interface BackendPost {
  _id: string;
  title: string;
  content: string;
}

// export default로 Home 컴포넌트를 내보냄
export default function Home(){
  
  // 샘플 데이터
  // 나중에는 이 데이터를 useState와 useEffect로 DB에서 불러올 거야.
  const fallbackPosts: Post[] = [
    
  ];

  const [posts, setPosts] = useState<Post[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { fetchPosts } = usePostsApi();

  useEffect(() => {
    let isMounted = true;

    fetchPosts()
      .then((docs: BackendPost[]) => {
        if (!isMounted) return;

        const mapped: Post[] = docs.map((doc, index) => ({
          id: doc._id ?? `post-${index}`,
          title: doc.title ?? '제목 없음',
          snippet:
            doc.content && doc.content.length > 120
              ? doc.content.slice(0, 120)
              : doc.content ?? '내용이 없습니다',
          type: 'noImage',
        }));

        if (mapped.length) setPosts(mapped);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error(err);
        setError(err as Error);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [fetchPosts]);

  if (loading) return <div>불러오는 중…</div>;
  if (error) return <div>게시글을 불러오지 못했습니다.</div>;


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
          className="bg-sky-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-sky-600 transition-colors mt-5 ml-160 text-xl"
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
            id={String(post.id)}
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
