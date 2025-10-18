import React, { useState } from 'react';
// useNavigate는 API 연동할 때 다시 쓸 거라 일단 주석 처리
// import { useNavigate } from 'react-router-dom';

function NewPage(){
  // 1. input과 textarea의 값을 저장하기 위한 state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // const navigate = useNavigate(); // 페이지 이동 hook

  // 2. '새 글 추가' 버튼 눌렀을 때 실행될 함수
  const handleSubmit = (e: React.FormEvent) => {
    // 폼(form)의 기본 동작(새로고침)을 막음
    e.preventDefault(); 
    
    // API 로직은 뺐어!
    // 나중에 여기에 API(fetch/axios) 전송 코드가 들어감
    console.log('전송할 데이터:', { title, content });
    
    // (나중에) 전송 성공 시 메인 페이지로 이동
    // navigate('/');
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
        
        {/* 3. 제목 입력창 */}
        <input
          type="text"
          value={title} // state와 연결
          onChange={(e) => setTitle(e.target.value)} // 타이핑할 때마다 state 변경
          
          
          // ★ 요청한 기능: 'placeholder'를 쓰면 됨
          placeholder="제목을 입력하세요" 
          
          className="w-full p-4 rounded-lg shadow-md border-none 
                     
                     placeholder:text-gray-500 mb-6 text-2xl text-black
                     bg-white"
        />

        {/* 4. 내용 입력창 (textarea) */}
        <textarea
          value={content} // state와 연결
          onChange={(e) => setContent(e.target.value)} // 타이핑할 때마다 state 변경
          
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
            className="bg-cyan-500 text-white px-6 py-2 rounded-lg 
                       font-semibold shadow-md hover:bg-cyan-600 transition-colors"
          >
            새 글 추가
          </button>
        </div>
      </form>
    </div>
  );
}
export default NewPage
