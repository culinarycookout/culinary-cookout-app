'use client';

import { useState, useEffect, Suspense } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

function CartContent() {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item['Price'] || item.price || 0);
    return sum + (price * (Number(item.quantity) || 0));
  }, 0);

  if (!isMounted) {
    return <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">Loading cart...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h1>
        <Link href="/menu" className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold transition-colors">
          Browse Menu 🍽️
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/menu" className="text-red-400 hover:text-red-300">← Back to Menu</Link>
          <h1 className="text-2xl font-bold text-red-600">Your Cart</h1>
          <span className="text-sm text-zinc-400">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
        </div>

        <div className="space-y-4 mb-6">
          {cart.map((item) => {
            const qty = Number(item.quantity) || 1;
            const price = Number(item['Price'] || item.price || 0);
            const total = price * qty;

            // Check if this item has customizations (meaning it's a Taco Package)
            const isTacoPackage = !!item.customizations && !!item.dealId;

            return (
              <div key={item.cartInstanceId || item.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-white">{item['Item Name']}</h3>
                      <p className="text-xl font-bold text-red-400">${total.toFixed(2)}</p>
                    </div>

                    {/* RECAP SECTION */}
                    {item.breakdown && (
                      <div className="mt-3 text-xs text-zinc-400 space-y-1.5 bg-black/40 p-3 rounded-lg border border-zinc-800">
                        {item.breakdown.split(' | ').map((groupString, idx) => (
                          <div key={idx} className="border-b border-zinc-700/50 last:border-0 pb-1.5 last:pb-0">
                            {groupString}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* BOTTOM ROW: QUANTITY, REMOVE, AND NEW BUTTONS */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.cartInstanceId || item.id, Math.max(1, qty - 1))}
                      className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center text-lg"
                    >
                      −
                    </button>
                    <span className="text-lg font-bold text-white w-6 text-center">{qty}</span>
                    <button
                      onClick={() => updateQuantity(item.cartInstanceId || item.id, qty + 1)}
                      className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartInstanceId || item.id)}
                    className="text-red-400 hover:text-red-300 text-sm font-medium ml-auto"
                  >
                    Remove
                  </button>

                  {/* ✅ CUSTOMIZE & BUILD ANOTHER BUTTONS FOR TACO PACKAGES ONLY */}
                  {isTacoPackage && (
                    <div className="w-full flex gap-2 mt-2 sm:mt-0 sm:w-auto">
                      {/* Customize Button - Edits existing item */}
                      <Link
                        href={`/taco-deals/${item.dealId}?editId=${item.cartInstanceId}`}
                        className="flex-1 sm:flex-none text-center text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-400/50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        Customize ✏️
                      </Link>
                      {/* Build Another Button - Duplicates and starts fresh */}
                      <Link
                        href={`/taco-deals/${item.dealId}?prefill=${encodeURIComponent(JSON.stringify(item.customizations))}`}
                        className="flex-1 sm:flex-none text-center text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        Build Another 📋
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mb-4">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Subtotal</span>
            <span className="text-red-400">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={clearCart}
              className="flex-1 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert('Checkout coming soon!')}
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm transition"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading cart...</div>}>
      <CartContent />
    </Suspense>
  );
}