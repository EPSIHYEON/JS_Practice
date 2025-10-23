const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function signup(payload: { email: string; password: string; username: string }) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('회원가입에 실패했습니다.');
  return res.json();
}

export async function login(payload: { username: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('로그인에 실패했습니다.');
  return res.json() as Promise<{ accessToken: string }>;
}


export async function checkUsername(username: string) {
  const res = await fetch(`${API_URL}/auth/check-username?username=${encodeURIComponent(username)}`);
  if (!res.ok) throw new Error('아이디 중복 확인에 실패했습니다.');
  return res.json() as Promise<{ available: boolean }>;
}