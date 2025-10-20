import { useAuth } from '../contexts/AuthContext';

export function useApi() {
  const { token } = useAuth();

  const request = async (input: RequestInfo, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    const res = await fetch(input, { ...init, headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  return { request };
}