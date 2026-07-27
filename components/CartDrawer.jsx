'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartDrawer({ isOpen, onClose }) {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    cartCount,
    clearCart 
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-zinc-900 z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">
            🛒 Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-zinc-500 text-center mt-8">Your cart is empty</p>
          ) : (
            cart.map((cartItem) => {
              const addOnsTotal = cartItem.selectedAddOns?.reduce((sum, ao) => sum + ao.price, 0) || 0;

              return (
                <div key={cartItem.cartItemKey} className="bg-zinc-800 rounded-lg p-3 flex gap-3">
                  {/* Image */}
                  {cartItem.imageUrl && (
                    <img
                      src={cartItem.imageUrl}
                      alt={cartItem.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white truncate">{cartItem.name}</h4>
                      {cartItem.isDiscounted && (
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                          🌮 50% OFF!
                        </span>
                      )}
                    </div>
                    
                    {cartItem.size && (
                      <p className="text-xs text-zinc-400">Size: {cartItem.size}</p>
                    )}
                    {cartItem.serves && (
                      <p className="text-xs text-zinc-400">Serves: {cartItem.serves}</p>
                    )}
                    
                    {/* Add-ons */}
                    {cartItem.selectedAddOns && cartItem.selectedAddOns.length > 0 && (
                      <div className="mt-1">
                        <p className="text-xs text-zinc-400 font-semibold">Add-ons:</p>
                        {cartItem.selectedAddOns.map((addOn) => (
                          <p key={addOn.id} className="text-xs text-zinc-400">
                            + {addOn.name} (${addOn.price.toFixed(2)})
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Price with discount */}
                    <div className="mt-1">
                      {cartItem.isDiscounted ? (
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-bold text-sm">
                            ${(cartItem.price + addOnsTotal).toFixed(2)}
                          </span>
                          <span className="text-gray-400 text-xs line-through">
                            ${(cartItem.originalPrice + addOnsTotal).toFixed(2)}
                          </span>
                          <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            50% OFF
                          </span>
                        </div>
                      ) : (
                        <span className="text-white font-bold text-sm">
                          ${(cartItem.price + addOnsTotal).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(cartItem.cartItemKey, cartItem.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center text-sm"
                      >
                        −
                      </button>
                      <span className="text-white font-bold w-5 text-center">{cartItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(cartItem.cartItemKey, cartItem.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(cartItem.cartItemKey)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div className="flex justify-between text-white">
            <span className="font-semibold">Subtotal</span>
            <span className="font-bold text-lg text-red-500">${subtotal.toFixed(2)}</span>
          </div>
          
          {cart.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                onClick={() => onClose()}
                className="flex-1 px-4 py-2 bg-[#0BDA51] hover:bg-[#09C448] text-white rounded-lg text-sm font-medium transition text-center"
              >
                Checkout →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}