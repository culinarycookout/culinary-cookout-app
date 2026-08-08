'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, User } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface TrubbleAuthContextType {
  trubbleUser: User | null;
  trubbleLogin: (email: string, password: string) => Promise<any>;
  trubbleLogout: () => Promise<void>;
  trubbleLoading: boolean;
}

const TrubbleAuthContext = createContext<TrubbleAuthContextType | undefined>(undefined);

export function TrubbleAuthProvider({ children }: { children: ReactNode }) {
  const [trubbleUser, setTrubbleUser] = useState<User | null>(null);
  const [trubbleLoading, setTrubbleLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setTrubbleUser(session?.user || null);
      setTrubbleLoading(false);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setTrubbleUser(session?.user || null);
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const trubbleLogin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return data;
  };

  const trubbleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/trubble/login');
  };

  return (
    <TrubbleAuthContext.Provider value={{ trubbleUser, trubbleLogin, trubbleLogout, trubbleLoading }}>
      {children}
    </TrubbleAuthContext.Provider>
  );
}

export function useTrubbleAuth() {
  const context = useContext(TrubbleAuthContext);
  if (!context) throw new Error('useTrubbleAuth must be used within a TrubbleAuthProvider');
  return context;
}