import React from 'react';
// 1. MyCard 컴포넌트를 import
import MyCard from '../components/MyCard';
import type { MyCardProps } from '../components/MyCard';

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

  // 2. 요청한 '쓰레기 데이터들' (더미 데이터)
  // (MyCardProps 인터페이스를 따르는 배열)
  const myPosts: MyCardProps[] = [
    { id: 101, index: 1, title: "열심히 사는 법", views: 30 },
    { id: 102, index: 2, title: "GITHUB 레포 설정하는 방법", views: 27 },
    { id: 103, index: 3, title: "리액트 왕초보 탈출", views: 15 },
    // 필요하면 여기에 데이터 더 추가...
  ];

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
          <StatCard value={29} label="나의 글" />
          <StatCard value={72} label="총 조회수" />
          <StatCard value={48} label="총 좋아요 수" />
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
              <th className="p-4 text-center text-[26px]  text-gray-500 w-1/6">번호</th>
              <th className="p-4 text-left text-[26px]  text-gray-500 w-4/6">제목</th>
              <th className="p-4 text-center text-[26px]  text-gray-500 w-1/6">조회수</th>
            </tr>
          </thead>
          
          {/* 테이블 바디 (MyCard 컴포넌트 사용) */}
          <tbody>
            {myPosts.map(post => (
              <MyCard 
                key={post.id}
                id={post.id}
                index={post.index}
                title={post.title}
                views={post.views}
              />
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}