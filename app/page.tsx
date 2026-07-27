'use client';

import Image from 'next/image';
import Link from 'next/link';
import Menu from '../components/Menu';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { cartCount } = useCart();

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logo and Cart Icon */}
        <div className="flex justify-between items-center mb-6">
          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/logo.png"
              alt="Culinary Cookout Logo"
              width={200}
              height={80}
              className="h-24 md:h-32 w-auto object-contain"
              priority
            />
          </div>
          
          {/* Cart Icon - Links to /cart */}
          <Link
            href="/cart"
            className="relative bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full transition ml-2 flex-shrink-0"
            aria-label="View cart"
          >
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Menu */}
        <Menu />
      </div>
    </main>
  );
}