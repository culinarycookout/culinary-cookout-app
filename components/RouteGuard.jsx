'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

// ✅ Added '/contact-us' so people can contact you without logging in
const PUBLIC_ROUTES = ['/login', '/contact-us', '/signup'];

export default function RouteGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user && !PUBLIC_ROUTES.includes(pathname)) {
      router.push('/login');
    }
  }, [user, loading, pathname, router]);

  if (loading && !PUBLIC_ROUTES.includes(pathname)) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        Checking credentials...
      </div>
    );
  }

  return children;
}