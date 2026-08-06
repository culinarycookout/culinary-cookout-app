'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted
    ? cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
    : 0;

  const isActive = (path) => pathname === path;
  const menuImageSrc = `/menu.png?v=1.0.0`;

  return (
    <>
      {/* MOBILE */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 py-4 px-4 z-50 shadow-2xl md:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link href="/cart" className={`flex flex-col items-center transition ${isActive('/cart') ? 'text-red-500' : 'text-zinc-400 hover:text-white'}`}>
            <div className="relative flex items-center justify-center w-10 h-10">
              <span className="text-3xl">🛒</span>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>

          <Link href="/" className={`flex items-center justify-center transition ${isActive('/') ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
            <img src={menuImageSrc} alt="Menu" className="h-16 w-16 object-contain" />
          </Link>

          <div className="flex flex-row gap-2 items-center">
             {/* ✅ Hidden Button now takes them to login with redirect flag */}
             <Link
               href="/login?redirect=fun"
               className={`text-xs font-bold tracking-widest uppercase transition ${isActive('/fun') ? 'text-red-500' : 'text-zinc-500 hover:text-white'}`}
             >
                🍸 Fun
             </Link>
             <Link href="/contact-us" className={`flex flex-col items-center transition ${isActive('/contact-us') ? 'text-red-500' : 'text-zinc-400 hover:text-white'}`}>
                <span className="text-3xl">📬</span>
             </Link>
          </div>

          <button onClick={() => logout()} className="flex flex-col items-center transition text-zinc-400 hover:text-white">
            <img src="/Logout.png" alt="Logout" className="w-8 h-8 object-contain" />
          </button>
        </div>
      </nav>

      {/* DESKTOP */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-24 bg-zinc-950 border-r border-zinc-800 flex-col items-center py-8 gap-8 z-50 shadow-2xl">
        <Link href="/" className={`flex items-center justify-center transition ${isActive('/') ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
          <img src={menuImageSrc} alt="Menu" className="h-20 w-20 object-contain" />
        </Link>
        
        <Link href="/contact-us" className={`flex flex-col items-center transition ${isActive('/contact-us') ? 'text-red-500' : 'text-zinc-400 hover:text-white'}`}>
          <span className="text-5xl">📬</span>
        </Link>

        <Link href="/cart" className={`flex flex-col items-center transition relative ${isActive('/cart') ? 'text-red-500' : 'text-zinc-400 hover:text-white'}`}>
          <div className="relative flex items-center justify-center w-12 h-12">
            <span className="text-5xl">🛒</span>
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950">
                {totalItems}
              </span>
            )}
          </div>
        </Link>

        {/* ✅ Desktop Hidden Link to Login with redirect */}
        <Link
          href="/login?redirect=fun"
          className={`flex flex-col items-center transition ${isActive('/fun') ? 'text-red-500' : 'text-zinc-500 hover:text-white'}`}
        >
          <span className="text-3xl">🍸</span>
          <span className="text-[8px] uppercase tracking-widest mt-1">Fun</span>
        </Link>

        <button onClick={() => logout()} className="flex flex-col items-center transition text-zinc-400 hover:text-white">
          <img src="/Logout.png" alt="Logout" className="w-10 h-10 object-contain" />
        </button>
      </nav>
    </>
  );
}