import React, { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, id, password, confirm });
  };

  const handleDuplicateCheck = () => {
    console.log('아이디 중복 확인:', id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* 왼쪽 로고 영역 */}
      <div className="flex flex-col items-center justify-center w-1/2">
        <h1 className="text-8xl font-extrabold text-sky-300 mb-2 tracking-wide">GURUM</h1>
        <p className="text-sky-300 text-lg">구름에서 글을 시작해보세요</p>
      </div>

      {/* 오른쪽 폼 영역 */}
      <div className="w-1/2 flex flex-col items-start justify-center">
        <form onSubmit={handleSubmit} className="w-[30rem] flex flex-col gap-4">
          {/* 이메일 */}
          <div>
            <label className="block text-md  text-gray-700 mb-1">이메일</label>
            <input
            
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black text-lg w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* 아이디 + 중복확인 */}
          <div>
            <label className="block text-md text-gray-700 mb-1">아이디</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="아이디를 입력하세요"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="text-black text-lg  flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <button
                type="button"
                onClick={handleDuplicateCheck}
                className="px-3 py-2 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors"
              >
                중복 확인
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-md text-gray-700 mb-1">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black text-lg w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="text-black text-lg w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="mt-4 w-full bg-sky-300 text-white text-xl  py-3 rounded-md hover:bg-sky-400 transition-all"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}