'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart(); // ✅ Use totalItems (not cartCount)

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Culinary Cookout"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className={`text-sm font-medium transition-colors ${
                isActive('/menu') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Menu
            </Link>
            <Link
              href="/contact-us"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact-us') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="relative text-sm font-medium transition-colors text-zinc-400 hover:text-white"
            >
              🛒 Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative text-zinc-400 hover:text-white"
            >
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                  mobileMenu.classList.toggle('hidden');
                }
              }}
              className="text-zinc-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <div id="mobile-menu" className="hidden md:hidden pb-4 border-t border-zinc-800">
          <div className="flex flex-col space-y-3 pt-4">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
              }`}
              onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className={`text-sm font-medium transition-colors ${
                isActive('/menu') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
              }`}
              onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
            >
              Menu
            </Link>
            <Link
              href="/contact-us"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact-us') ? 'text-red-500' : 'text-zinc-400 hover:text-white'
              }`}
              onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}