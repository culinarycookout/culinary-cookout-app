'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FunAuthContextType {
  user: any;
  funLogin: (email: string, birthday: string) => Promise<void>;
  funLogout: () => void;
  isLockedOut: boolean;
}

const FunAuthContext = createContext<FunAuthContextType | undefined>(undefined);

export function FunAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLockedOut, setIsLockedOut] = useState(false);

  useEffect(() => {
    const locked = localStorage.getItem('fun_locked_out');
    if (locked === 'true') {
      setIsLockedOut(true);
    }
  }, []);

  const funLogin = async (email: string, birthday: string) => {
    const mm = parseInt(birthday.substring(0, 2), 10);
    const dd = parseInt(birthday.substring(2, 4), 10);
    const yy = parseInt(birthday.substring(4, 6), 10);

    if (mm < 1 || mm > 12 || dd < 1 || dd > 31) {
      throw new Error('Invalid date format. Use MMDDYY.');
    }

    const birthYear = 2000 + yy;
    const today = new Date();
    let age = today.getFullYear() - birthYear;
    const monthDiff = today.getMonth() - (mm - 1);
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dd)) {
      age--;
    }

    if (age < 21) {
      localStorage.setItem('fun_locked_out', 'true');
      setIsLockedOut(true);
      throw new Error('☠️ CONTACT YOUR LOCAL POISON PROVIDER ☠️');
    }

    const userData = { email, birthday, age };
    setUser(userData);
    localStorage.setItem('fun_user', JSON.stringify(userData));
  };

  const funLogout = () => {
    setUser(null);
    localStorage.removeItem('fun_user');
  };

  return (
    <FunAuthContext.Provider value={{ user, funLogin, funLogout, isLockedOut }}>
      {children}
    </FunAuthContext.Provider>
  );
}

export function useFunAuth() {
  const context = useContext(FunAuthContext);
  if (context === undefined) {
    throw new Error('useFunAuth must be used within a FunAuthProvider');
  }
  return context;
}