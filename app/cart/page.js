'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal,
    cartCount 
  } = useCart();

  // Track which item is being customized (expanded add-ons)
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (cartItemKey) => {
    setExpandedItem(expandedItem === cartItemKey ? null : cartItemKey);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-red-400 hover:text-red-300 mb-6 inline-block text-lg">
            ← Back to Menu
          </Link>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-zinc-400 mb-6">Start adding some delicious items from our menu!</p>
            <Link
              href="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-red-400 hover:text-red-300 text-lg">
            ← Back to Menu
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-red-600">
            🛒 Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
          <div className="w-20"></div> {/* Spacer for alignment */}
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((cartItem) => {
            const addOnsTotal = (cartItem.selectedAddOns || []).reduce((sum, ao) => sum + ao.price, 0);
            const itemTotal = (cartItem.price + addOnsTotal) * cartItem.quantity;
            const isExpanded = expandedItem === cartItem.cartItemKey;

            return (
              <div 
                key={cartItem.cartItemKey} 
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6"
              >
                {/* Item Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Image */}
                    {cartItem.imageUrl && (
                      <img
                        src={cartItem.imageUrl}
                        alt={cartItem.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg text-white">{cartItem.name}</h3>
                        {cartItem.isDiscounted && (
                          <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            🌮 50% OFF!
                          </span>
                        )}
                      </div>
                      {cartItem.category && (
                        <p className="text-sm text-zinc-400">{cartItem.category}</p>
                      )}
                      {cartItem.size && (
                        <p className="text-sm text-zinc-400">Size: {cartItem.size}</p>
                      )}
                      {cartItem.serves && (
                        <p className="text-sm text-zinc-400">Serves: {cartItem.serves}</p>
                      )}
                      
                      {/* Selected Add-ons (summary) */}
                      {cartItem.selectedAddOns && cartItem.selectedAddOns.length > 0 && (
                        <div className="mt-1">
                          <p className="text-xs text-zinc-400">
                            Add-ons: {cartItem.selectedAddOns.map(ao => ao.name).join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price and Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(cartItem.cartItemKey, cartItem.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center text-lg"
                        >
                          −
                        </button>
                        <span className="text-lg font-bold w-6 text-center">{cartItem.quantity}</span>
                        <button
                          onClick={() => updateQuantity(cartItem.cartItemKey, cartItem.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center text-lg"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Item Total */}
                      <span className="text-xl font-bold text-red-500 min-w-[80px] text-right">
                        ${itemTotal.toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      {/* Customize Button */}
                      <button
                        onClick={() => toggleExpand(cartItem.cartItemKey)}
                        className="text-sm text-blue-400 hover:text-blue-300 transition"
                      >
                        {isExpanded ? 'Hide Add-ons' : 'Customize Add-ons'}
                      </button>
                      <button
                        onClick={() => removeFromCart(cartItem.cartItemKey)}
                        className="text-sm text-red-400 hover:text-red-300 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Add-ons Section */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-zinc-800">
                    <h4 className="text-sm font-semibold text-zinc-300 mb-3">Customize Add-ons</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Note: This is a placeholder - you'd need to fetch available add-ons for this item */}
                      {/* We'll need to store available add-ons in the cart item or fetch them */}
                      <p className="text-sm text-zinc-500 col-span-2">
                        ⚡ Add-on management coming soon! You can add/remove add-ons from the detail page.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={clearCart}
                className="text-sm text-red-400 hover:text-red-300 transition"
              >
                Clear Cart
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-right">
                <span className="text-zinc-400 text-sm">Subtotal</span>
                <span className="text-2xl font-bold text-red-500 block">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <Link
                href="/checkout"
                className="bg-[#0BDA51] hover:bg-[#09C448] text-white font-bold py-3 px-8 rounded-lg text-lg transition text-center min-w-[200px]"
              >
                Proceed to Checkout →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}