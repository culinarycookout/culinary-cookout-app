'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const { cart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Only calculate after mounting (prevents hydration error)
  const totalItems = mounted
    ? cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
    : 0;

  const isActive = (path) => pathname === path;
  const menuImageSrc = `/menu.png?v=1.0.0`;

  return (
    <>
      {/* MOBILE – Bottom Navigation (icons only) */}
      {/* ✅ FIXED: Added more padding (py-4), increased icon container size, and centered icons to prevent clipping. */}
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

          {/* Menu Logo */}
          <Link
            href="/"
            className={`flex items-center justify-center transition ${
              isActive('/') ? 'opacity-100' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={menuImageSrc}
              alt="Menu"
              className="h-16 w-16 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                const parent = e.target.parentElement;
                parent.innerHTML = '<span class="text-3xl">📝</span>';
              }}
            />
          </Link>

          {/* Contact */}
          <Link
            href="/contact-us"
            className={`flex flex-col items-center transition ${
              isActive('/contact-us') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span className="text-3xl">📬</span>
          </Link>
        </div>
      </nav>

      {/* DESKTOP – Left Sidebar (UNTOUCHED) */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-24 bg-zinc-950 border-r border-zinc-800 flex-col items-center py-8 gap-8 z-50 shadow-2xl">
        {/* Menu Logo */}
        <Link
          href="/"
          className={`flex items-center justify-center transition ${
            isActive('/') ? 'opacity-100' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <img
            src={menuImageSrc}
            alt="Menu"
            className="h-20 w-20 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              const parent = e.target.parentElement;
              parent.innerHTML = '<span class="text-5xl">📝</span>';
            }}
          />
        </Link>

        {/* Contact */}
        <Link
          href="/contact-us"
          className={`flex flex-col items-center transition ${
            isActive('/contact-us') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span className="text-5xl">📬</span>
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
      </nav>
    </>
  );
}