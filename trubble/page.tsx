'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TrubbleRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect anyone who lands on the root to the login page
    router.replace('/login');
  }, [router]);

  return null;
}