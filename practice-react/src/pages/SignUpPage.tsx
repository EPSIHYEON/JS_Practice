import React, { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { checkUsername } from '../api/auth';
export default function SignupPage() {
  const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [usernameMessage, setUsernameMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !username.trim() || !password.trim()) {
      setError('이메일, 아이디, 비밀번호를 모두 입력해주세요.');
      return;
    }
    if (password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setError(null);
    try {
      await signup({ email, username, password });
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/loginpage');
    } catch (err) {
      console.error('회원가입 실패:', err);
      setError(
        err instanceof Error ? err.message : '회원가입에 실패했습니다. 다시 시도해주세요.',
      );
    } 
  };
const handleDuplicateCheck = async () => {
  if (!username.trim()) {
    setUsernameMessage('아이디를 먼저 입력하세요.');
    return;
  }
  try {
    const { available } = await checkUsername(username);
    setUsernameMessage(available ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.');
  } catch (err) {
    console.error('중복 확인에 실패했습니다:', err);
    setUsernameMessage('중복 확인에 실패했습니다. 다시 시도해주세요.');
  }
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
      
      {error && (
  <p className="text-red-500 text-md p-3" role="alert">
    {error}
  </p>)}
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            {usernameMessage && (
  <p className={`mt-2 text-sm ${usernameMessage.includes('사용 가능한') ? 'text-green-500' : 'text-red-500'}`}>
    {usernameMessage}
  </p>)}
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