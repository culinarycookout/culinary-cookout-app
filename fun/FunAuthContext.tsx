'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface FunAuthContextType {
  funUser: any | null;
  funLogin: (email: string, phone: string) => Promise<any>;
  funLogout: () => Promise<void>;
  funLoading: boolean;
}

const FunAuthContext = createContext<FunAuthContextType | undefined>(undefined);

export function FunAuthProvider({ children }: { children: React.ReactNode }) {
  const [funUser, setFunUser] = useState<any | null>(null);
  const [funLoading, setFunLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setFunUser(session?.user || null);
      setFunLoading(false);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setFunUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const funLogin = async (email: string, phone: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: phone,
    });
    if (error) throw new Error(error.message);
    return data;
  };

  const funLogout = async () => {
    await supabase.auth.signOut();
    router.push('/fun/login');
  };

  return (
    <FunAuthContext.Provider value={{ funUser, funLogin, funLogout, funLoading }}>
      {children}
    </FunAuthContext.Provider>
  );
}

export function useFunAuth() {
  const context = useContext(FunAuthContext);
  if (!context) {
    throw new Error('useFunAuth must be used within a FunAuthProvider');
  }
  return context;
}