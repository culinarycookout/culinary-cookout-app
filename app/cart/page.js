'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Link href="/menu" className="text-red-500 hover:underline">
          ← Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <Link href="/menu" className="text-red-500 hover:underline">
          ← Back to Menu
        </Link>
        <h1 className="text-3xl font-bold text-red-600">Your Cart</h1>
      </div>

      <div className="space-y-4">
        {cart.map((cartItem) => (
          <div
            key={cartItem.cartId}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg"
          >
            <div className="flex-1">
              <h3 className="text-lg font-bold">{cartItem['Item Name']}</h3>
              
              {cartItem['SIZE'] && (
                <p className="text-sm text-red-400">Size: {cartItem['SIZE']}</p>
              )}

              {/* ✅ AMOUNT / QUANTITY INCLUDED RENDERED HERE */}
              {cartItem['AMOUNT'] > 0 && (
                <p className="text-sm text-zinc-400 font-medium">
                  Included: {cartItem['AMOUNT']} items per order
                </p>
              )}

              {cartItem['SERVES:'] && (
                <p className="text-sm text-zinc-400">Serves: {cartItem['SERVES:']}</p>
              )}

              {/* Display Customizations / Add-ons if any */}
              {cartItem.selectedAddOns && cartItem.selectedAddOns.length > 0 && (
                <div className="mt-2 text-xs text-zinc-300">
                  <p className="font-semibold text-zinc-400">Add-ons:</p>
                  <ul className="list-disc list-inside">
                    {cartItem.selectedAddOns.map((addon, idx) => (
                      <li key={idx}>
                        {addon.name} (+${addon.price.toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing Display */}
              <div className="mt-2">
                {cartItem.isDiscounted ? (
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 line-through text-sm">
                      ${(cartItem.originalPrice * cartItem.quantity).toFixed(2)}
                    </span>
                    <span className="text-red-500 font-bold">
                      ${(cartItem.Price * cartItem.quantity).toFixed(2)}
                    </span>
                    <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                      🎉 Discounted
                    </span>
                  </div>
                ) : (
                  <span className="font-bold text-lg">
                    ${(cartItem.Price * cartItem.quantity).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Controls & Remove */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center transition"
                >
                  −
                </button>
                <span className="text-lg font-bold w-6 text-center">{cartItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(cartItem.cartId)}
                className="text-red-500 hover:text-red-400 text-sm font-semibold transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg text-center sm:text-right">
        <h2 className="text-2xl font-bold mb-2">
          Subtotal: <span className="text-red-500">${subtotal.toFixed(2)}</span>
        </h2>
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
          <button
            onClick={clearCart}
            className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-lg transition"
          >
            Clear Cart
          </button>
          <button
            onClick={() => alert('Proceeding to checkout...')}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition shadow-md"
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}