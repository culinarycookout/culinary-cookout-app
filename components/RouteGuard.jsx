'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const PUBLIC_ROUTES = ['/login', '/signup', '/contact-us'];

export default function RouteGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // 1. Wait until we KNOW if they are logged in
    if (loading) return;

    // 2. If they are logged OUT and not on a public page, HARD REDIRECT them
    if (!user && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace('/login');
    }
  }, [user, loading, pathname, router]);

  // 3. If the user check is still loading, DO NOT show the menu. Show a loading screen.
  if (loading && !PUBLIC_ROUTES.includes(pathname)) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        Checking credentials...
      </div>
    );
  }

  // 4. Only show the menu if they are logged in OR on a public page.
  if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    return null;
  }

  return children;
}