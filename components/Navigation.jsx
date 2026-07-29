'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function Navigation() {
  const pathname = usePathname();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity ?? item.qty ?? 1), 0);

  const isActive = (path) => pathname === path;

  // ✅ FIXED: Use a static version number — no hydration mismatch
  const menuImageSrc = `/menu.png?v=1.0.0`;

  return (
    <>
      {/* MOBILE – Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 py-3 px-4 z-50 shadow-2xl md:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Cart */}
          <Link
            href="/cart"
            className={`flex flex-col items-center transition ${
              isActive('/cart') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <span className="text-3xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>

          {/* Menu PNG – NO TEXT */}
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

      {/* DESKTOP – Left Sidebar – NO TEXT */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-24 bg-zinc-950 border-r border-zinc-800 flex-col items-center py-8 gap-8 z-50 shadow-2xl">
        {/* Menu PNG – NO TEXT */}
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
          <div className="relative">
            <span className="text-5xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950">
                {totalItems}
              </span>
            )}
          </div>
        </Link>
      </nav>
    </>
  );
}