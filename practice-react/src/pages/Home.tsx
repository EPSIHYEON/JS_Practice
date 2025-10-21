import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BoardCard from '../components/BoardCards';
import type { PostImageType } from '../components/BoardCards';
import { usePostsApi } from '../api/posts';
import type { PostResponse } from '../api/posts';

interface Post {
  id: number | string;
  title: string;
  snippet: string;
  type: PostImageType;
  imageUrl?: string;
  authorName?: string;
  likesCount: number;
}

// export default로 Home 컴포넌트를 내보냄
export default function Home() {
  const fallbackPosts: Post[] = [];

  const [posts, setPosts] = useState<Post[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const { fetchPosts } = usePostsApi();

  useEffect(() => {
    let isMounted = true;

    fetchPosts()
      .then((docs: PostResponse[]) => {
        if (!isMounted) return;

        const mapped: Post[] = docs.map((doc, index) => {
          const hasImage = Boolean(doc.imageData);
          return {
            id: doc._id ?? `post-${index}`,
            title: doc.title ?? '제목 없음',
            snippet:
              doc.content && doc.content.length > 120
                ? doc.content.slice(0, 120)
                : doc.content ?? '내용이 없습니다',
            type: hasImage ? 'image' : 'noImage',
            imageUrl: hasImage ? doc.imageData : undefined,
            authorName: doc.author?.username,
            likesCount: doc.likesCount ?? 0,
          };
        });

        if (mapped.length) {
          setPosts(mapped);
          setCurrentPage(1);
        }
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

  useEffect(() => {
    setCurrentPage((prev) => {
      const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
      return Math.min(prev, totalPages);
    });
  }, [posts, pageSize]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(posts.length / pageSize)),
    [posts, pageSize],
  );

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return posts.slice(start, start + pageSize);
  }, [posts, currentPage, pageSize]);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const goPrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  if (loading) return <div>불러오는 중…</div>;
  if (error) return <div>게시글을 불러오지 못했습니다.</div>;


  // return 되는 이 JSX가 App.tsx의 <main> 안으로 들어가게 됨
  return (
    <div className="relative m-6">
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
      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {paginatedPosts.map((post) => (
          <BoardCard
            key={post.id}
            id={String(post.id)}
            title={post.title}
            snippet={post.snippet}
            type={post.type}
            imageUrl={post.imageUrl}
            authorName={post.authorName}
            likesCount={post.likesCount}
          />
        ))}
      </div>

      {posts.length > pageSize && (
        <>
          <div className="fixed left-6 top-1/2 z-10 flex -translate-y-1/2 transform items-center">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="이전 페이지"
              className={`flex h-12 w-12 items-center justify-center text-9xl text-white/20 transition ${
                canGoPrev
                  ? ' hover:text-gray-700'
                  : 'cursor-not-allowed  opacity-40'
              }`}
            >
              &#8249;
            </button>
          </div>
          <div className="fixed right-6 top-1/2 z-10 flex -translate-y-1/2 transform items-center">
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="다음 페이지"
              className={`flex h-12 w-12 items-center justify-center text-9xl text-white/20 transition ${
                canGoNext
                  ? ' hover:text-gray-700'
                  : 'cursor-not-allowed  opacity-40'
              }`}
            >
              &#8250;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
