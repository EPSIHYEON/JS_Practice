import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostsApi } from '../api/posts'; 



export default function UpdatePage(){
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent ] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [ submitting, setSubmitting] = useState(false);
    const [imageData, setImageData] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const { fetchPost, updatePost } = usePostsApi();

    const handleImageChange = async (file: File | null) => {
      if (!file) {
        setImageData(null);
        setImageName(null);
        return;
      }
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImageData(typeof reader.result === 'string' ? reader.result : null);
          setImageName(file.name);
        };
        reader.onerror = () => {
          console.error(reader.error);
          setImageData(null);
          setImageName(null);
        };
      } catch (err) {
        console.error(err);
        setImageData(null);
        setImageName(null);
      }
    };

    useEffect(() => {
    if (!id) {
      setError('잘못된 id 접근입니다.');
      return;
    }


 const loadPost = async () =>{
    try{
        const data = await fetchPost(id);
        setTitle(data.title ?? '');
        setContent(data.content ?? '');
        setImageData(data.imageData ?? null);
        setImageName(data.imageData ? '현재 등록된 이미지' : null);
    } catch (err){
        console.error(err);
        setError('게시글을 불러오지 못했습니다.');
    } 
 };

 loadPost();
}, [fetchPost, id]);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await updatePost(id, { title, content, imageData: imageData ?? undefined });
    alert('수정이 완료되었습니다');
      navigate(-1);
    } catch (err) {
      console.error(err);
      setError('게시글 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

    return(
        <div className='ml-6 p-6 w-[90vw] h-[70vh]'>
              {error && (
          <p className="text-red-500 mt-3" role="alert">
            {error}
          </p>
        )}
                  <form onSubmit={handleSubmit} className="h-full flex flex-col">
{/* 제목 입력 영역 */}
<div className="bg-white rounded-xl p-6  mb-4 shadow-lg">
 <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            className="w-full text-gray-700 text-3xl font-semibold bg-transparent border-none outline-none"
           
          />
</div>


{/* 이미지 업로드 */}
<div className="mt-4 mb-4 flex justify-end">
  
  <input
    id="update-post-image"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
  />
  <div className="flex flex-wrap items-center gap-3">
    {imageData ? (
      <button
        type="button"
        onClick={() => {
          setImageData(null);
          setImageName(null);
        }}
        className="inline-flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors"
      >
        이미지 제거
      </button>
    ) : (
      <label
        htmlFor="update-post-image"
        className="inline-flex items-center px-4 py-2 bg-sky-400 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-sky-500 transition-colors"
      >
        이미지 선택
      </label>
    )}
    <span className="text-sm text-gray-500">
      {imageName ?? '선택한 파일 없음'}
    </span>
  </div>
  {imageData && (
    <div className="mt-4 flex flex-col gap-3">
      <img
        src={imageData}
        alt="선택한 이미지 미리보기"
        className="max-h-64 rounded-lg shadow-md"
      />
    </div>
  )}
</div>

{/* 내용 입력 영역 */}
<div className="bg-white rounded-xl p-6  h-[80%] shadow-lg">
 <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (error) setError(null);
            }}
            className="w-full h-full text-lg text-gray-700 bg-transparent border-none outline-none resize-none"
            placeholder="내용을 입력하세요"
          />
</div>


{/* 버튼 영역 */}
<div className="flex justify-end gap-3 ml-auto mt-6 mr-35">
<button
    type="button"
   onClick={() => navigate(-1)}
 className="bg-sky-400 text-white px-5 py-2 rounded-md shadow-md hover:bg-sky-500 transition">
뒤로 가기
</button>
<button
  type="submit"
disabled={submitting}
 className="bg-green-400 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-500 transition">
적용
</button>
</div>
</form>

</div>

);

}
