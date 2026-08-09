'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTrubbleCart } from './TrubbleCartContext';
import { useTrubbleAuth } from './context/TrubbleAuthContext';
import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  cartInstanceId?: string;
  quantity: number;
  'Price'?: number;
  price?: number;
  'Item Name'?: string;
  name?: string;
}

export default function TrubbleNavigation() {
  const pathname = usePathname();
  const { trubbleCartItems } = useTrubbleCart();
  const { trubbleLogout } = useTrubbleAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const totalItems = mounted 
    ? trubbleCartItems.reduce((sum: number, item: CartItem) => sum + (Number(item.quantity) || 1), 0) 
    : 0;

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 py-4 px-4 z-50 shadow-2xl md:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Cart Link */}
          <Link href="/cart" className="relative flex flex-col items-center transition text-zinc-400 hover:text-white">
            <span className="text-3xl">🛒</span>
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Menu Link - Replaced with 🥃 */}
          <Link href="/menu" className="flex items-center justify-center transition opacity-60 hover:opacity-100">
            <span className="text-3xl">🥃</span>
          </Link>

          {/* Logout Button */}
          <button onClick={trubbleLogout} className="flex flex-col items-center transition text-zinc-400 hover:text-white">
            <img src="/Logout.png" alt="Exit" className="w-8 h-8 object-contain" />
          </button>
        </div>
      </nav>

      {/* Desktop Left Side Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-24 bg-zinc-950 border-r border-zinc-800 flex-col items-center py-8 gap-8 z-50 shadow-2xl">
        {/* Menu Link - Replaced with 🥃 */}
        <Link href="/menu" className="flex items-center justify-center transition opacity-60 hover:opacity-100">
          <span className="text-5xl">🥃</span>
        </Link>

        {/* Cart Link */}
        <Link href="/cart" className="flex flex-col items-center transition text-zinc-400 hover:text-white">
          <span className="text-5xl">🛒</span>
        </Link>

        {/* Logout Button */}
        <button onClick={trubbleLogout} className="flex flex-col items-center transition text-zinc-400 hover:text-white">
          <img src="/Logout.png" alt="Exit" className="w-10 h-10 object-contain" />
        </button>
      </nav>
    </>
  );
}