import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostsApi } from '../api/posts';
import { useAuth } from '../contexts/AuthContext';


export default function WrttenPage() {
     const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string | null>(null);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const { fetchPost, removePost, toggleLike } = usePostsApi();
  const { user } = useAuth();

  
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
        setImageData(data.imageData ?? null);
        setAuthorName(data.author?.username ?? null);
        setAuthorId(data.author?._id ?? null);
        setLikesCount(data.likesCount ?? 0);
        setLiked(Boolean(data.liked));
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
    const message =
      err instanceof Error ? err.message : '삭제에 실패했습니다. 다시 시도해주세요.';
    alert(message);
  }
};
  const isAuthor = useMemo(() => {
    if (!user || !authorId) return false;
    return user.id === authorId;
  }, [user, authorId]);

  const hasLiked = useMemo(() => (user ? liked : false), [user, liked]);

  const handleToggleLike = async () => {
    if (!id) return;
    if (!user) {
      alert('좋아요를 하려면 로그인하세요.');
      return;
    }
    try {
      const result = await toggleLike(id);
      setLikesCount(result.likesCount ?? 0);
      setLiked(Boolean(result.liked));
    } catch (err) {
      console.error(err);
      alert('좋아요 처리에 실패했습니다. 다시 시도해주세요.');
    }
  };
   if (loading) return <div className="p-20 text-white">로딩 중…</div>;
  if (error) return <div className="p-20 text-red-400">{error}</div>;

    return (
  <div className='p-20 w-[80%]'>
     <div className="flex justify-end items-center gap-3 text-white text-lg">
    <h1 className="text-5xl mr-auto">{title} </h1>
    {authorName && (
      <p className="text-white text-2xl flex justify-end mt-10">작성자: {authorName}</p>
    )}
 
    </div>
      <div className="border-t-5 border-dashed border-white my-6"></div>
    {imageData && (
      <div className="mb-6">
        <img
          src={imageData}
          alt={`${title} 대표 이미지`}
          className="max-w-full rounded-xl shadow-lg"
        />
      </div>
    )}
   {/* 카드 본문 */}
    <p className="text-white text-xl min-h-[12rem] ">
    {content}
    </p>

      <div className="flex justify-end">
      <button
        type="button"
        onClick={handleToggleLike}
        className={`px-4 py-2 rounded-md shadow-md transition text-xl ${
          hasLiked
            ? 'bg-red-400 hover:bg-red-500'
            : 'bg-sky-400 hover:bg-sky-500'
        }`}
      >
        {hasLiked ? '좋아요 취소 ❤️ ' : '좋아요 ❤️ '}
              <span>{likesCount}</span>
      </button>

    </div>

        {/* 버튼 영역 */}
    <div className="flex justify-end mt-10">
        <button
    type="button"
     onClick={() => navigate(-1)}
     className="bg-sky-400 text-white px-5 py-2 rounded-md shadow-md hover:bg-sky-500 transition text-xl mr-3">뒤로가기</button>
    {isAuthor && (
      <>
        <button
          type="button"
          onClick={() => navigate(`/updatepage/${id}`)}
          className="bg-sky-400 text-white px-5 py-2 rounded-md shadow-md hover:bg-sky-500 transition mr-3 text-xl"
        >
          수정
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-400 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-500 transition text-xl"
        >
          삭제
        </button>
      </>
    )}
    </div>

</div>
);

}
