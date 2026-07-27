'use client';

import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [deliveryLocation1, setDeliveryLocation1] = useState('');
  const [deliveryLocation2, setDeliveryLocation2] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }
    if (!customerName || !whatsappNumber || !deliveryLocation1) {
      setError('Please fill in all required fields: Name, WhatsApp Number, and Delivery Location.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName,
          whatsappNumber,
          instagramHandle,
          deliveryLocation1,
          deliveryLocation2,
          specialInstructions,
          items: cart,
          subtotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit order');
      }

      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-red-500 mb-2">Order Submitted Successfully!</h1>
          <p className="text-zinc-300 mb-6">
            Thank you, <span className="font-semibold text-white">{customerName}</span>! Your order has been placed and sent to the kitchen. We'll deliver to your specified location(s).
          </p>
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-red-400 hover:text-red-300 mb-6 inline-block text-lg">
          ← Back to Menu
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-red-600">Checkout</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {cart.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <p className="text-zinc-400 mb-4">Your cart is currently empty.</p>
            <Link
              href="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-lg transition"
            >
              Return to Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cart Summary */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Order Summary</h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {cart.map((item) => {
                  const addOnsTotal = (item.selectedAddOns || []).reduce((sum, ao) => sum + ao.price, 0);
                  const itemTotalPrice = (item.price + addOnsTotal) * item.quantity;

                  return (
                    <div key={item.cartItemKey} className="flex justify-between items-start border-b border-zinc-800 pb-4">
                      <div>
                        <h3 className="font-bold text-white">{item.name}</h3>
                        {item.size && <p className="text-xs text-zinc-400">Size: {item.size}</p>}
                        {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                          <p className="text-xs text-orange-400 mt-1">
                            Add-ons: {item.selectedAddOns.map(ao => ao.name).join(', ')}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemKey, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center text-xs"
                            >
                              -
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemKey, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center text-xs"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartItemKey)}
                            className="text-xs text-red-400 hover:text-red-300 ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <span className="font-bold text-red-500">${itemTotalPrice.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center text-xl font-bold">
                <span>Total Subtotal</span>
                <span className="text-red-500">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Client Information Form */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Client Details</h2>
              
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                {/* Name - Required */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="First Name & Last Initial"
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
                  />
                </div>

                {/* WhatsApp Number - Required */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="(012) 345-6789"
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
                  />
                </div>

                {/* Instagram Handle - Optional */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Instagram Handle <span className="text-zinc-500 text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    placeholder="@yourhandle"
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
                  />
                </div>

                {/* Delivery Location 1 - Required */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Delivery Location <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={deliveryLocation1}
                    onChange={(e) => setDeliveryLocation1(e.target.value)}
                    placeholder="Address, landmarks, building name, apartment number, etc."
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none resize-y min-h-[60px]"
                  />
                </div>

                {/* Delivery Location 2 - Optional */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Second Delivery Location <span className="text-zinc-500 text-xs">(optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryLocation2}
                    onChange={(e) => setDeliveryLocation2(e.target.value)}
                    placeholder="Address, landmarks, building name, apartment number, etc."
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none resize-y min-h-[60px]"
                  />
                </div>

                {/* Special Instructions - Optional */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Special Notes & Instructions <span className="text-zinc-500 text-xs">(optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Additional notes, instructions for delivery, special requests, etc."
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none resize-y min-h-[100px]"
                  />
                </div>

                {/* Asterisk Note */}
                <p className="text-xs italic text-white/60">
                  *No pending delivery is required to wait longer than five minutes.
                </p>

                {/* ✅ PLACE ORDER - MALACHITE GREEN */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0BDA51] hover:bg-[#09C448] disabled:bg-zinc-700 text-white font-bold py-3.5 px-6 rounded-lg transition-colors mt-4 shadow-lg text-lg"
                >
                  {submitting ? 'Submitting Order...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}