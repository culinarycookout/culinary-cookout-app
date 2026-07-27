'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import Image from 'next/image';

export default function Navigation() {
  const pathname = usePathname();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity ?? item.qty ?? 1), 0);
  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item?.['Price'] ?? item?.price ?? 0;
    const qty = item?.quantity ?? item?.qty ?? 1;
    return sum + (price * qty);
  }, 0);

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* ✅ MOBILE – Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 py-3 px-4 z-50 shadow-2xl md:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Cart */}
          <Link
            href="/cart"
            className={`flex flex-col items-center space-y-0.5 transition ${
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
            <span className="text-xs font-medium">
              {totalItems > 0 ? `$${cartSubtotal.toFixed(2)}` : 'Cart'}
            </span>
          </Link>

          {/* ✅ Menu – Using your custom image */}
          <Link
            href="/"
            className={`flex flex-col items-center space-y-0.5 transition ${
              isActive('/') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <img
                src="/menu.png"
                alt="Menu"
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="text-xs font-medium">Menu</span>
          </Link>

          {/* Contact */}
          <Link
            href="/contact-us"
            className={`flex flex-col items-center space-y-0.5 transition ${
              isActive('/contact-us') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span className="text-3xl">📬</span>
            <span className="text-xs font-medium">Contact</span>
          </Link>
        </div>
      </nav>

      {/* ✅ DESKTOP – Left Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-24 bg-zinc-950 border-r border-zinc-800 flex-col items-center py-8 gap-6 z-50 shadow-2xl">
        {/* ✅ Menu – Using your custom image */}
        <Link
          href="/"
          className={`flex flex-col items-center space-y-1 transition ${
            isActive('/') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <img
            src="/menu.png"
            alt="Menu"
            className="h-10 w-10 object-contain"
          />
          <span className="text-sm font-medium">Menu</span>
        </Link>

        <Link
          href="/contact-us"
          className={`flex flex-col items-center space-y-1 transition ${
            isActive('/contact-us') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span className="text-5xl">📬</span>
          <span className="text-sm font-medium">Contact</span>
        </Link>

        <Link
          href="/cart"
          className={`flex flex-col items-center space-y-1 transition relative ${
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
          <span className="text-sm font-medium">
            {totalItems > 0 ? `$${cartSubtotal.toFixed(2)}` : 'Cart'}
          </span>
        </Link>
      </nav>
    </>
  );
}