'use client';

import Link from 'next/link';
import Menu from '../components/Menu';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { cartCount } = useCart();

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          {/* Logo - FORCED BIG with inline style */}
          <div className="flex-1 flex justify-center">
            <img
              src="/logo.png"
              alt="Culinary Cookout Logo"
              style={{
                height: '120px',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
              className="sm:h-48 md:h-56 lg:h-64"
            />
          </div>
          <Link
            href="/cart"
            className="relative bg-zinc-800 hover:bg-zinc-700 p-4 rounded-full transition ml-2 flex-shrink-0"
            aria-label="View cart"
          >
            <span className="text-3xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
        <Menu />
      </div>
    </main>
  );
}