'use client';

import { useState, useEffect, Suspense } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function CartContent() {
  const router = useRouter();
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [isTacoTuesday, setIsTacoTuesday] = useState(false);
  
  // 🛑 State for the Remove Confirmation Modal
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // 🟢 CALCULATE TACO TUESDAY STATUS (Pacific Time)
    const now = new Date();
    const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    const day = pacificTime.getDay();
    const hours = pacificTime.getHours();
    setIsTacoTuesday((day === 2 && hours >= 0) || (day === 3 && hours < 1));
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item['Price'] || item.price || 0);
    return sum + (price * (Number(item.quantity) || 0));
  }, 0);

  // 🛑 Handle removal click
  const handleRemoveClick = (cartInstanceId) => {
    setItemToRemove(cartInstanceId);
    setShowModal(true);
  };

  // 🛑 Confirm removal
  const confirmRemoval = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
      setItemToRemove(null);
      setShowModal(false);
    }
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">Loading cart...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">🛒Empty Cart🛒</h1>
        <Link href="/menu" className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold transition-colors">
          Browse Menu 🍽️
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-32 relative">
      {/* 🛑 REMOVE CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Are you sure?</h3>
            <p className="text-zinc-400 text-center mb-6">This item will be removed from your cart.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemoval}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/menu" className="text-red-400 hover:text-red-300 text-sm">← Back to Menu</Link>
          <h1 className="text-xl font-bold text-red-600">🛒Your Cart🛒</h1>
          <span className="text-xs text-zinc-400">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
        </div>

        <div className="space-y-4 mb-6">
          {cart.map((item) => {
            const qty = Number(item.quantity) || 1;
            const price = Number(item['Price'] || item.price || 0);
            const total = price * qty;

            // ✅ TACO TUESDAY LOGIC
            let displayPrice = total;
            let originalPrice = null;
            let isDiscounted = false;
            let isTaco = false;

            if (isTacoTuesday) {
              // Check if it's a Taco or Taco Package
              const itemName = (item['Item Name'] || '').toUpperCase();
              isTaco = itemName.includes('TACO');
              
              if (isTaco) {
                isDiscounted = true;
                originalPrice = total; // Store original before discount
                displayPrice = total * 0.5; // Apply 50% discount
              }
            }

            // ✅ Logic: Only show Customize if the item doesn't have hardcoded customizations
            const isHardcoded = !!item.customizations && !!item.dealId;

            return (
              <div key={item.cartInstanceId || item.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-lg text-white">{item['Item Name']}</h3>
                        
                        {/* ✅ TACO TUESDAY BANNER RESTORED */}
                        {isTacoTuesday && isTaco && (
                          <div className="inline-flex items-center gap-1.5 bg-red-600/20 border border-red-500/30 rounded-full px-2.5 py-0.5 w-fit mb-0.5">
                            <span className="text-[10px] text-red-400 font-bold tracking-wide">🎉🌮 TACO TUESDAY 🌮🎉</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        {isDiscounted ? (
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                              <p className="text-xl font-bold text-green-400">${displayPrice.toFixed(2)}</p>
                              <p className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</p>
                            </div>
                            <span className="text-[10px] text-red-400 font-bold mt-0.5">50% OFF</span>
                          </div>
                        ) : (
                          <p className="text-xl font-bold text-red-400">${displayPrice.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
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
                <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                  
                  {/* LEFT SIDE: Qty + Action Buttons */}
                  <div className="flex items-center flex-wrap gap-2">
                    
                    {/* Quantity Counter */}
                    <div className="flex items-center space-x-2 bg-zinc-800 rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.cartInstanceId || item.id, Math.max(1, qty - 1))}
                        className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center text-lg transition-colors"
                      >
                        −
                      </button>
                      <span className="text-lg font-bold text-white w-8 text-center">{qty}</span>
                      <button
                        onClick={() => updateQuantity(item.cartInstanceId || item.id, qty + 1)}
                        className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center text-lg transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* ✅ Customize - WHITE BACKGROUND, RED TEXT */}
                    {!isHardcoded && (
                      <Link
                        href={`/menu/${item.id}?editId=${item.cartInstanceId}`}
                        className="px-4 py-2 bg-white hover:bg-zinc-200 border border-zinc-700 rounded-lg text-red-600 font-bold text-base md:text-lg transition-colors shadow-sm"
                      >
                        Customize 📝
                      </Link>
                    )}

                    {/* ✅ Add Another (Universal) - Big, Bold, Friendly */}
                    <Link
                      href={isHardcoded ? `/taco-deals/${item.dealId}?prefill=${encodeURIComponent(JSON.stringify(item.customizations))}` : `/menu/${item.id}?prefill=${encodeURIComponent(JSON.stringify(item.customizations))}`}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-emerald-400 font-bold text-base md:text-lg transition-colors shadow-sm"
                    >
                      +Add Another 👨🏾‍🍳
                    </Link>

                  </div>

                  {/* RIGHT SIDE: Remove - Completely isolated on the far right */}
                  <button
                    onClick={() => handleRemoveClick(item.cartInstanceId || item.id)}
                    className="flex-1 sm:flex-none text-center text-red-400 hover:text-red-300 text-sm font-medium ml-0 sm:ml-2"
                  >
                    ❌Remove
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
              Confirm & Checkout →
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