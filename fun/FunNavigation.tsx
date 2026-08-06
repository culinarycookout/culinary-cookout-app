'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useFunAuth } from './FunAuthContext';
import { useState, useEffect } from 'react';

export default function FunNavigation() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { funLogout } = useFunAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted
    ? cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
    : 0;

  const isActive = (path: string) => pathname === path;

  const handleExit = async () => {
    await funLogout(); // ✅ This should already redirect to Canva
  };

  return (
    <>
      {/* MOBILE - Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 py-4 px-4 z-50 shadow-2xl md:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          
          {/* Cart */}
          <Link
            href="/cart"
            className={`flex flex-col items-center transition ${
              isActive('/cart') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <div className="relative flex items-center justify-center w-10 h-10">
              <span className="text-3xl">🛒</span>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>

          {/* ✅ Hidden Menu Logo (Takes you to the hidden menu, NOT the main menu) */}
          <Link
            href="/fun/menu"
            className={`flex items-center justify-center transition ${
              isActive('/fun/menu') ? 'opacity-100' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <div className="text-3xl">🍸</div>
          </Link>

          {/* ✅ Exit Button (Severs all ties and sends them to Canva) */}
          <button
            onClick={handleExit}
            className="flex flex-col items-center transition text-zinc-400 hover:text-white"
          >
            <img src="/Logout.png" alt="Exit" className="w-8 h-8 object-contain" />
          </button>

        </div>
      </nav>

      {/* DESKTOP - Left Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-24 bg-zinc-950 border-r border-zinc-800 flex-col items-center py-8 gap-8 z-50 shadow-2xl">
        
        {/* Hidden Menu Logo */}
        <Link
          href="/fun/menu"
          className={`flex items-center justify-center transition ${
            isActive('/fun/menu') ? 'opacity-100' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <div className="text-5xl">🍸</div>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className={`flex flex-col items-center transition relative ${
            isActive('/cart') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <div className="relative flex items-center justify-center w-12 h-12">
            <span className="text-5xl">🛒</span>
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950">
                {totalItems}
              </span>
            )}
          </div>
        </Link>

        {/* ✅ Exit Button */}
        <button
          onClick={handleExit}
          className="flex flex-col items-center transition text-zinc-400 hover:text-white"
        >
          <img src="/Logout.png" alt="Exit" className="w-10 h-10 object-contain" />
        </button>

      </nav>
    </>
  );
}