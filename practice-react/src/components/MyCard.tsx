import React from 'react';
import { Link } from 'react-router-dom'; // 제목을 클릭해서 글로 이동할 수 있게

// MyCard 컴포넌트가 받을 props 타입
export interface MyCardProps {
  id: number; // 나중에 Link 이동에 쓸 고유 ID
  index: number;
  title: string;
  views: number;
}

export default function MyCard({ id, index, title, views }: MyCardProps){
  return (
    // 이 컴포넌트 자체가 테이블의 한 줄(tr)이 됨
    <tr className="border-b border-gray-200 hover:bg-gray-50 text-[22px]">
      
      {/* 1. 번호 */}
      <td className="p-4 text-center font-bold text-gray-600">
        {index}
      </td>
      
      {/* 2. 제목 (클릭 가능하게 Link로 감쌈) */}
      <td className="p-4  text-gray-700">
        <Link to={`/post/${id}`} className="hover:underline">
          {title}
        </Link>
      </td>
      
      {/* 3. 조회수 */}
      <td className="p-4 text-center font-bold text-gray-600">
        {views}
      </td>
    </tr>
  );
}