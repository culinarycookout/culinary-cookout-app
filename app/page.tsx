'use client';

import Image from 'next/image';
import Link from 'next/link';
import Menu from '../components/Menu';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { totalItems } = useCart();

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 flex justify-center">
            <Image
              src="/logo.png"
              alt="Culinary Cookout Logo"
              width={400}
              height={160}
              className="h-32 md:h-48 w-auto object-contain"
              priority
            />
          </div>
          <Link
            href="/cart"
            className="relative bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full transition ml-2 flex-shrink-0"
            aria-label="View cart"
          >
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
        <Menu />
      </div>
    </main>
  );
}