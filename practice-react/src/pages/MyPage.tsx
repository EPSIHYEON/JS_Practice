import React, { useEffect, useState } from 'react';
import MyCard from '../components/MyCard';
import { usePostsApi, type PostResponse } from '../api/posts';
import { useAuth } from '../contexts/AuthContext';

// 상단 통계 카드 컴포넌트 (MyPage 내부에서만 사용)
function StatCard({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="pb-2 text-5xl text-gray-800 border-b-4 border-gray-300 px-2">
        {value}
      </span>
      <span className="mt-2 text-2xl  text-gray-600">
        {label}
      </span>
    </div>
  );
}

// 메인 마이페이지 컴포넌트
export default function MyPage(){
  const { user } = useAuth();
  const { fetchLikeSummary, fetchMyPosts } = usePostsApi();
  const [totalLikes, setTotalLikes] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [myPosts, setMyPosts] = useState<PostResponse[]>([]);

  useEffect(() => {
    if (!user) return;
    fetchLikeSummary()
      .then(({ totalLikes: likes, postCount: count }) => {
        setTotalLikes(likes);
        setPostCount(count);
      })
      .catch((err) => {
        console.error('좋아요 요약 정보를 불러오지 못했습니다:', err);
      });
  }, [fetchLikeSummary, user]);

  useEffect(() => {
    if (!user) {
      setMyPosts([]);
      return;
    }
    fetchMyPosts()
      .then((posts) => {
        setMyPosts(posts);
      })
      .catch((err) => {
        console.error('내 게시글을 불러오지 못했습니다:', err);
        setMyPosts([]);
      });
  }, [fetchMyPosts, user]);

  return (
    // 페이지 전체 컨테이너 (배경색은 App.tsx가 담당)
    <div className="m-6">
      
      {/* 1. 상단 프로필 및 통계 섹션 */}
      <div className="bg-white rounded-xl shadow-lg p-11 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
          
          {/* 프로필 아이콘 */}
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          
          {/* 통계 카드들 */}
          <StatCard value={postCount} label="나의 글" />
          <StatCard value={totalLikes} label="총 좋아요 수" />
        </div>
      </div>

      {/* 2. 나의 글 목록 섹션 */}
      <h2 className="text-4xl text-white mb-5">
        나의 글
      </h2>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          {/* 테이블 헤더 */}
          <thead className="bg-gray-50 border-b border-gray-200 ">
            <tr>
              <th className="p-4 text-center text-xl  text-gray-500 w-1/6">번호</th>
              <th className="p-4 text-left text-xl  text-gray-500 w-4/6">제목</th>

            </tr>
          </thead>
          
          {/* 테이블 바디 (MyCard 컴포넌트 사용) */}
          <tbody>
            {myPosts.length === 0 ? (
              <tr>
                <td
                  className="p-6 text-center text-gray-500"
                  colSpan={2}
                >
                  작성한 글이 없습니다.
                </td>
              </tr>
            ) : (
              myPosts.map((post, index) => (
                <MyCard
                  key={post._id}
                  id={post._id}
                  index={index + 1}
                  title={post.title ?? '(제목 없음)'}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
