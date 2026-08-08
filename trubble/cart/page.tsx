'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTrubbleAuth } from '../context/TrubbleAuthContext';
import { useTrubbleCart } from '../TrubbleCartContext';

export default function TrubbleCartPage() {
  const router = useRouter();
  const { trubbleUser, trubbleLoading } = useTrubbleAuth();
  const { trubbleCartItems, trubbleRemoveFromCart, trubbleClearCart, trubbleCartTotal } = useTrubbleCart();

  useEffect(() => {
    if (!trubbleLoading && !trubbleUser) {
      router.push('/trubble/login');
    }
  }, [trubbleUser, trubbleLoading, router]);

  if (trubbleLoading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading cart...</div>;
  }

  if (!trubbleUser) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 pb-32">
      <h1 className="text-3xl font-bold text-red-600 tracking-wider uppercase mb-6 text-center">Your Secret Cart</h1>

      {trubbleCartItems.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center shadow-lg">
          <p className="text-zinc-400 text-lg">Your cart is empty.</p>
          <Link href="/trubble/menu">
            <button className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition-all">
              Browse the Menu
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {trubbleCartItems.map((item) => (
            <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold">{item.name}</h3>
                <p className="text-zinc-400 text-sm">Qty: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-red-500 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => trubbleRemoveFromCart(item.id)}
                  className="text-red-600 hover:text-red-400 text-sm font-bold underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 shadow-lg mt-6">
            <div className="flex justify-between items-center text-xl font-bold text-white border-b border-zinc-700 pb-4 mb-4">
              <span>Total</span>
              <span className="text-red-500">${trubbleCartTotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={trubbleClearCart}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-xl font-bold transition-all"
              >
                Clear Cart
              </button>
              <button
                onClick={() => alert('Order placed! (Standalone Hidden Menu Checkout)')}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
              >
                Checkout
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link href="/trubble/menu" className="text-zinc-500 hover:text-zinc-300 text-sm underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}