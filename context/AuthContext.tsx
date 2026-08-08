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

  // ✅ UPDATED: One-click replace to the new Canva link
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.replace('https://canva.link/0yirht7zq90xjdi');
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