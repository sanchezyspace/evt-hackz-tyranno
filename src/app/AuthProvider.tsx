'use client'
import { auth } from '@/app/_utils/firebase_authentication';
import { createContext, useContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { User } from 'firebase/auth';

const AuthContext = createContext<User | null | 'loading'>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null | 'loading'>('loading');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext)
}
