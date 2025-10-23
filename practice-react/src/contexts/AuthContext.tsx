import React, { createContext, useContext, useState, useMemo } from 'react';

type AuthUser = {
  id: string;
  username: string;
};

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const decodeToken = (token: string): AuthUser | null => {
  try {
    const base64 = token.split('.')[1];
    if (!base64) return null;
    if (typeof window === 'undefined' || typeof window.atob !== 'function') {
      return null;
    }
    const decoded = window.atob(base64);
    const payload = JSON.parse(decoded) as {
      sub?: string;
      username?: string;
    };
    if (!payload?.sub || !payload?.username) return null;
    return { id: String(payload.sub), username: String(payload.username) };
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('token'));

  const value = useMemo(() => {
    const user = token ? decodeToken(token) : null;
    return {
      token,
      setToken: (newToken: string | null) => {
        if (newToken) localStorage.setItem('token', newToken);
        else localStorage.removeItem('token');
        setTokenState(newToken);
      },
      user,
      isAuthenticated: Boolean(user),
    };
  }, [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth는 AuthProvider 안에서만 사용하세요.');
  return ctx;
};
