import React, { createContext, useContext, useState, useMemo } from 'react';

type AuthContextValue = {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const value = useMemo(
    () => ({
      token,
      setToken: (newToken: string | null) => {
        if (newToken) localStorage.setItem('token', newToken);
        else localStorage.removeItem('token');
        setToken(newToken);
      },
      isAuthenticated: Boolean(token),
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth는 AuthProvider 안에서만 사용하세요.');
  return ctx;
};