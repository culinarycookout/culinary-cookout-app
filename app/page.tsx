'use client';

import Menu from '../components/Menu';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { totalItems } = useCart();

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Header: Logo centered, Cart button below – logo is #1 priority */}
        <header className="w-full flex flex-col items-center py-4 bg-black space-y-4">
          {/* ✅ Logo - Perfectly centered, no distractions */}
          <div className="flex justify-center w-full">
            <img
              src="https://iili.io/CeCmPWJ.png"
              alt="Cook For Hire"
              className="h-20 md:h-24 w-auto object-contain"
            />
          </div>

          {/* ✅ Cart Button - Below the logo, doesn't touch or crowd it */}
          <div className="flex justify-center w-full px-4">
            <button
              onClick={() => window.location.href = "/cart"}
              className="relative bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3 flex items-center space-x-3 shadow-lg hover:bg-zinc-800 transition-all text-white font-medium"
            >
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>View Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </header>

        <Menu />
      </div>
    </main>
  );
}