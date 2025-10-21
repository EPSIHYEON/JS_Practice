import { useAuth } from '../contexts/AuthContext';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const [error, setError] = useState<string | null>(null);
const { setToken } = useAuth();
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
      if (!username.trim() || !password.trim()) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    setError(null);
  try {
    const { accessToken } = await login({ username, password });
    setToken(accessToken);
    navigate('/home');
  } catch (err) {
     console.error(err);
    setError('로그인에 실패했습니다.');
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* 로고 */}
      <h1 className="text-8xl font-extrabold text-sky-300 mb-2 tracking-wide">GURUM</h1>
      <p className="text-sky-200 text-xl mb-6">
        구름에서 글을 시작해보세요
      </p>

      {error && (
  <p className="text-red-500 text-md p-3" role="alert">
    {error}
  </p>)}

      {/* 로그인 폼 */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[320px] gap-4"
      >
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />

        <button
          type="submit"
          className="w-full bg-sky-300 text-white py-3 rounded-md hover:bg-blue-300 transition-all text-2xl"
        >
          로그인
        </button>
      </form>

      {/* 하단 링크 */}
      <div className="mt-4 flex gap-4 text-sm text-gray-400 ">
        <Link to="/signuppage" className="hover:text-blue-400">
          회원가입
        </Link>
        <Link to="/findpassword" className="hover:text-blue-400">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
