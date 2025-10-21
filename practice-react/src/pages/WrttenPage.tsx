import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostsApi } from '../api/posts';


export default function WrttenPage() {
     const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchPost, removePost } = usePostsApi();

  
  useEffect(() => {
    if (!id) {
      setError('잘못된 접근입니다.');
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const data = await fetchPost(id);
        setTitle(data.title ?? '');
        setContent(data.content ?? '');
      } catch (err) {
        console.error(err);
        setError('게시글을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetchPost, id]);

  const handleDelete = async () => {
  if (!id) return;
  if (!window.confirm('정말 삭제할까요?')) return;

  try {
    await removePost(id);
    alert('삭제되었습니다.');
    navigate('/home');
  } catch (err) {
    console.error(err);
    alert('삭제에 실패했습니다. 다시 시도해주세요.');
  }
};
   if (loading) return <div className="p-20 text-white">로딩 중…</div>;
  if (error) return <div className="p-20 text-red-400">{error}</div>;

    return (
<div className='p-20'>
    {/* 카드 본문 */}
    <h1 className="text-5xl mb-2">{title} </h1>
    <div className="border-t-5 border-dashed border-white w-[80%] my-6"></div>
    <p className="text-white text-[1.4rem] min-h-[12rem] ">
    {content}
    </p>

        {/* 버튼 영역 */}
    <div className="flex justify-end gap-3 mr-20 mt-10">
        <button
    type="button"
     onClick={() => navigate(-1)}
     className="bg-sky-400 text-white px-5 py-2 rounded-md shadow-md hover:bg-sky-500 transition">뒤로가기</button>
    <button
    type="button"
     onClick={() => navigate(`/updatepage/${id}`)} 
    className="bg-sky-400 text-white px-5 py-2 rounded-md shadow-md hover:bg-sky-500 transition">
        수정</button>
    <button
    type="button"
     onClick={handleDelete } 
     className="bg-red-400 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-500 transition">삭제</button>
    </div>

</div>
);

}
