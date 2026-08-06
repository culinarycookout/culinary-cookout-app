'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, User } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface AuthContextType {
  user: User | null;
  signup: (email: string, phone: string) => Promise<any>;
  login: (email: string, phone: string) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (email: string, phone: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: phone,
    });
    if (error) throw new Error(error.message);
    return data;
  };

  const login = async (email: string, phone: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: phone,
    });
    if (error) throw new Error(error.message);
    return data;
  };

  // ✅ LOGOUT: Redirects to your exact Canva splash screen
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = 'https://www.canva.com/design/DAHMa6CWluc/K6y1Hzp4I7Pckgkj7J1Fxw/view?utm_content=DAHMa6CWluc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0935d25285';
  };

  const value = {
    user,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}