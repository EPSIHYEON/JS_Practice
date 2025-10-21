import { useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export function useApi() {
  const { token } = useAuth();

  const request = useCallback(
    async <T>(path: string, init?: RequestInit): Promise<T> => {
      const headers = new Headers(init?.headers);
      if (init?.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      if (token) headers.set('Authorization', `Bearer ${token}`);

      const res = await fetch(`${API_URL}${path}`, { ...init, headers });
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || 'Request failed');
      }

      if (res.status === 204) {
        return undefined as T;
      }

      return (await res.json()) as T;
    },
    [token],
  );

  return { request };
}
