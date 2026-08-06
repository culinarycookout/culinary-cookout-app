'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useFunAuth } from '../FunAuthContext';

export default function FunCartPage() {
  const router = useRouter();
  const { funUser } = useFunAuth();
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // If somehow they aren't logged in, bounce them to the hidden login
    if (!funUser) {
      router.push('/fun/login');
    }
  }, [funUser, router]);

  if (!isMounted || !funUser) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h1>
        <Link href="/fun/menu" className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold transition-colors">
          ← Back to Fun Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/fun/menu" className="text-red-400 hover:text-red-300">← Back to Fun Menu</Link>
          <h1 className="text-2xl font-bold text-red-600">Your Cart</h1>
          <span className="text-sm text-zinc-400">({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
        </div>

        <div className="space-y-4 mb-6">
          {cart.map((item) => {
            const qty = Number(item.quantity) || 1;
            const price = Number(item['Price'] || item.price || 0);
            const total = price * qty;

            return (
              <div key={item.cartInstanceId || item.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-white">{item['Item Name']}</h3>
                      <p className="text-xl font-bold text-red-400">${total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 flex-wrap">
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
              onClick={() => alert('Fun menu checkout coming soon!')}
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