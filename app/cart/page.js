'use client';

import { useState, useEffect, Suspense } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

function CartContent() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
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
        <Link href="/" className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold transition-colors">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-red-400 hover:text-red-300">← Back to Menu</Link>
          <h1 className="text-2xl font-bold text-red-600">Your Cart</h1>
          <span className="text-sm text-zinc-400">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
        </div>

        <div className="space-y-4 mb-6">
          {cart.map((item) => {
            const qty = Number(item.quantity) || 1;
            const price = Number(item['Price'] || item.price || 0);
            const total = price * qty;

            return (
              <div key={item.cartInstanceId || item.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">{item['Item Name'] || item.name}</h3>
                    {item['SIZE'] && <p className="text-sm text-red-400 font-medium">Size: {item['SIZE']}</p>}
                    
                    {item.breakdown && typeof item.breakdown === 'object' && (
                      <div className="mt-3 text-xs text-zinc-400 space-y-3 bg-black/40 p-3 rounded-lg border border-zinc-800">
                        
                        {Array.isArray(item.breakdown) ? (
                          item.breakdown.map((taco, index) => {
                            // Logic to handle Taco Trio vs other packs
                            const isTrio = item['Item Name']?.toUpperCase().includes('TACO TRIO');
                            const displayName = isTrio 
                              ? `Taco ${index + 1}` 
                              : (taco.groupLabel || `Taco ${index + 1}`);

                            return (
                              <div key={index} className="border-b border-zinc-700/40 last:border-0 pb-2 last:pb-0">
                                <p className="text-white/90 font-medium text-[13px] mb-1">
                                  {displayName}
                                </p>
                                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-zinc-400">
                                  <span>Tortilla: <span className="text-zinc-200">{taco.tortilla}</span></span>
                                  <span>Meat: <span className="text-zinc-200">{taco.meat1}</span></span>
                                  {taco.meat2 && taco.meat2 !== 'None' && (
                                    <span>Add: <span className="text-zinc-200">{taco.meat2}</span></span>
                                  )}
                                  {taco.toppings && Array.isArray(taco.toppings) && taco.toppings.length > 0 && (
                                    <span>Toppings: <span className="text-zinc-200">{taco.toppings.join(', ')}</span></span>
                                  )}
                                  {taco.extras && Array.isArray(taco.extras) && taco.extras.length > 0 && (
                                    <span>Extras: <span className="text-zinc-200">{taco.extras.join(', ')}</span></span>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          // Fallback for single object
                          Object.entries(item.breakdown).map(([key, val]) => {
                            let displayVal = val;
                            if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                              displayVal = Object.entries(val).map(([subKey, subVal]) => 
                                `${subKey}: ${Array.isArray(subVal) ? subVal.join(', ') : subVal}`
                              ).join(' | ');
                            }
                            return (
                              <div key={key} className="flex gap-1">
                                <span className="text-zinc-300 font-medium capitalize">{key}:</span> 
                                <span>{displayVal}</span>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xl font-bold text-red-400">${total.toFixed(2)}</p>
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

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Subtotal</span>
            <span className="text-red-400">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
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