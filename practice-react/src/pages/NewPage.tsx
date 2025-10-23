import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { usePostsApi } from '../api/posts';

// useNavigate는 API 연동할 때 다시 쓸 거라 일단 주석 처리
// import { useNavigate } from 'react-router-dom';

function NewPage(){
  // 제목 입력값 관리
  const [title, setTitle] = useState('');
  // 본문 입력값 관리
  const [content, setContent] = useState('');
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  // 서버 에러 메시지 표시용
  const [error, setError] = useState<string | null>(null);
  // 저장 성공 시 목록 화면으로 이동
  const navigate = useNavigate();
  const { createPost } = usePostsApi();

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

  // 폼 제출 시 새 글 생성 API 호출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 새로고침 막기
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }

   
    setError(null);
    try {
      await createPost({ title, content, imageData: imageData ?? undefined }); // Nest POST /posts 호출
      alert('글이 올라갔습니다')
      navigate('/home'); // 목록으로 이동
    } catch (err) {
      console.error(err);
      setError('게시글 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    // max-w-4xl: 내용물이 너무 넓어지지 않게 최대 너비 설정
    // mx-auto: 위에서 설정한 너비를 중앙 정렬
    <div className="max-w-4xl mx-auto">
      
      {/* 1. 페이지 제목 */}
      <h1 className="text-5xl  text-white mb-10">
        새 글 작성
      </h1>

      {/* 2. 폼 (handleSubmit 함수 연결) */}
      <form onSubmit={handleSubmit}>

         {error && (
          <p className="text-red-500 mb-4" role="alert">
          {error}
        </p>
  )}
        
        {/* 3. 제목 입력창 */}
        <input
          type="text"
          value={title} // state와 연결
          onChange={(e) => {setTitle(e.target.value);
                            if (error) setError(null);
          }} // 타이핑할 때마다 state 변경
          
          
          
          // ★ 요청한 기능: 'placeholder'를 쓰면 됨
          placeholder="제목을 입력하세요" 
          
          className="w-full p-4 rounded-lg shadow-md border-none 
                     
                     placeholder:text-gray-500 mb-6 text-2xl text-black
                     bg-white"
        />

        
        {/* 4-1. 이미지 업로드 */}
        <div className="mb-6">
          <input
            id="new-post-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
          />
          <div className="flex justify-end items-center gap-3">
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
                htmlFor="new-post-image"
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
            <div className="mt-4">
              <img
                src={imageData}
                alt="선택한 이미지 미리보기"
                className="max-h-64 rounded-lg shadow-md"
              />
            </div>
          )}
        </div>


        {/* 4. 내용 입력창 (textarea) */}
        <textarea
          value={content} // state와 연결
          onChange={(e) => {setContent(e.target.value); if (error) setError(null);} }// 타이핑할 때마다 state 변경
          
          // ★ 요청한 기능: 'placeholder'
          placeholder="내용을 입력하세요" 
          
          rows={15} // 기본 높이를 15줄로 설정
          className="w-full p-4 rounded-lg shadow-md border-none 
                     
                     
                     placeholder:text-gray-500 mb-6 text-2xl text-black
                     bg-white"
        />

        {/* 5. '새 글 추가' 버튼 (오른쪽 정렬) */}
        <div className="flex justify-end">
          <button
            type="submit" // 이 버튼을 누르면 <form>의 onSubmit이 실행됨
            className="bg-sky-500 text-white px-6 py-2 rounded-lg 
                        shadow-md hover:bg-sky-600 transition-colors"
          >
            새 글 추가
          </button>
        </div>
      </form>
    </div>
  );
}
export default NewPage
