'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for saved user on page load (persist login)
  useEffect(() => {
    const savedUser = localStorage.getItem('culinary_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // TODO: Replace this with your real backend API fetch call
    // e.g., const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // MOCK SUCCESS: Accept any non-empty password for now
        if (email && password) {
          const userData = { id: '1', email, name: email.split('@')[0] || 'User' };
          localStorage.setItem('culinary_user', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500); // Simulate network delay
    });
  };

  const logout = () => {
    localStorage.removeItem('culinary_user');
    setUser(null);
    router.push('/login');
  };

  const value = {
    user,
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