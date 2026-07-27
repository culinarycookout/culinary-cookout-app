'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DeliveryDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orderData, setOrderData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    deliveryLocation: '',
    deliveryLocation2: '',
    instagram: '',
    email: '',
    specialInstructions: '',
  });

  useEffect(() => {
    const itemsParam = searchParams.get('items');
    const totalParam = searchParams.get('total');
    if (itemsParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(itemsParam));
        setOrderData(parsed);
        setTotal(parseFloat(totalParam) || 0);
      } catch (e) {
        setError('Failed to load order data.');
      }
    } else {
      setError('No order data found.');
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !formData.deliveryLocation) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        customerName: formData.name,
        whatsappNumber: formData.whatsapp,
        instagramHandle: formData.instagram || '',
        deliveryLocation: formData.deliveryLocation,
        deliveryLocation2: formData.deliveryLocation2 || '',
        specialInstructions: formData.specialInstructions || '',
        userEmail: formData.email || '',
        items: orderData,
        subtotal: total,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order failed');

      const orderSummary = orderData.map((item) => ({
        ...item,
        total: (item.price || 0) * (item.quantity || 1),
      }));
      
      router.push(
        `/thank-you?items=${encodeURIComponent(JSON.stringify(orderSummary))}&total=${total.toFixed(2)}`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!orderData.length && !error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">Loading order...</p>
      </div>
    );
  }

  if (error && !orderData.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="bg-zinc-900 p-6 rounded-xl max-w-md w-full text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link href="/cart" className="text-blue-400 hover:underline">
            ← Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="text-red-400 hover:text-red-300 text-lg"
          >
            ← Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-red-600">
            📋 Delivery Details
          </h1>
          <div className="w-20" />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">
              Order Summary
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {orderData.map((item, idx) => {
                const itemTotal = (item.price || 0) * (item.quantity || 1);
                return (
                  <div
                    key={idx}
                    className="flex justify-between items-start border-b border-zinc-800 pb-3"
                  >
                    <div>
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="text-sm text-zinc-400">
                        Quantity: {item.quantity || 1}
                      </p>
                      {item.addOns && item.addOns.length > 0 && (
                        <p className="text-xs text-zinc-500">
                          Add-ons:{' '}
                          {item.addOns
                            .map((a) => `${a.Name} x${a.Quantity}`)
                            .join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-red-400">
                      ${itemTotal.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-red-400">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
              <h2 className="text-xl font-bold">Client Details</h2>
              <img
                src="/logo.png"
                alt="Logo"
                className="h-14 w-auto object-contain"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="First Name & Last Initial"
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="(012) 345-6789"
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Instagram Handle <span className="text-zinc-500 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="@yourhandle"
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Email <span className="text-zinc-500 text-xs">(optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Delivery Location <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="deliveryLocation"
                  required
                  rows={2}
                  value={formData.deliveryLocation}
                  onChange={handleChange}
                  placeholder="Address, landmarks, building name, apartment number, etc."
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none resize-y min-h-[60px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Second Delivery Location <span className="text-zinc-500 text-xs">(optional)</span>
                </label>
                <textarea
                  name="deliveryLocation2"
                  rows={2}
                  value={formData.deliveryLocation2}
                  onChange={handleChange}
                  placeholder="Address, landmarks, building name, apartment number, etc."
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none resize-y min-h-[60px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Special Notes & Instructions <span className="text-zinc-500 text-xs">(optional)</span>
                </label>
                <textarea
                  name="specialInstructions"
                  rows={3}
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  placeholder="Additional notes, instructions for delivery, special requests, etc."
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none resize-y min-h-[80px]"
                />
              </div>

              <p className="text-xs italic text-white/60">
                *No pending delivery is required to wait longer than five minutes.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0BDA51] hover:bg-[#09C448] disabled:bg-zinc-700 text-white font-bold py-3.5 px-6 rounded-lg transition-colors mt-4 shadow-lg text-lg"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}