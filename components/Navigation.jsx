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

  useEffect(() => setMounted(true), []);

  // ✅ Calculate total items in cart (handles varying price/quantity field names)
  const totalItems = mounted
    ? cart.reduce((sum, item) => {
        const qty = Number(item?.quantity) || Number(item?.Quantity) || 1;
        return sum + qty;
      }, 0)
    : 0;

  return (
    <>
      {/* MOBILE NAV (Bottom) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 py-4 px-4 z-50 shadow-2xl md:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          
          {/* 🍔 Menu */}
          <Link href="/" className="flex flex-col items-center transition text-zinc-400 hover:text-white">
            <span className="text-3xl">🍔</span>
          </Link>

          {/* 📬 Contact */}
          <Link href="/contact-us" className="flex flex-col items-center transition text-zinc-400 hover:text-white">
            <span className="text-3xl">📬</span>
          </Link>

          {/* 🛒 Cart */}
          <Link href="/cart" className="relative flex flex-col items-center transition text-zinc-400 hover:text-white">
            <span className="text-3xl">🛒</span>
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950">
                {totalItems}
              </span>
            )}
          </Link>

          {/* 🚪 EXIT Button - Now bridges to Canva */}
          <button 
            onClick={() => {
              logout();
              window.location.replace('https://canva.link/0yirht7zq90xjdi');
            }} 
            className="flex flex-col items-center transition text-zinc-400 hover:text-white"
          >
            <img src="/Logout.png" alt="Exit" className="w-8 h-8 object-contain" />
          </button>

        </div>
      </nav>

      {/* DESKTOP NAV (Left Side) */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-24 bg-zinc-950 border-r border-zinc-800 flex-col items-center py-8 gap-8 z-50 shadow-2xl">
        
        {/* 🍔 Menu */}
        <Link href="/" className="flex items-center justify-center transition opacity-60 hover:opacity-100">
          <img src="/menu.png" alt="Menu" className="w-12 h-12 object-contain" />
        </Link>

        {/* 📬 Contact */}
        <Link href="/contact-us" className="flex flex-col items-center transition text-zinc-400 hover:text-white">
          <span className="text-5xl">📬</span>
        </Link>

        {/* 🛒 Cart */}
        <Link href="/cart" className="flex flex-col items-center transition text-zinc-400 hover:text-white">
          <span className="text-5xl">🛒</span>
        </Link>

        {/* 🚪 EXIT Button - Now bridges to Canva */}
        <button 
          onClick={() => {
            logout();
            window.location.replace('https://canva.link/0yirht7zq90xjdi');
          }} 
          className="flex flex-col items-center transition text-zinc-400 hover:text-white"
        >
          <img src="/Logout.png" alt="Exit" className="w-10 h-10 object-contain" />
        </button>

      </nav>
    </>
  );
}