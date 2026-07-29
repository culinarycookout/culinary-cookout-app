'use client';

import { useState, useEffect, use } from 'react';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';

export default function SausageDetailPage({ params }) {
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const sausageId = resolvedParams.id;

  const [sausage, setSausage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState({});

  useEffect(() => {
    async function fetchSausage() {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        const found = data.find(item => item.id === sausageId);
        if (found) {
          setSausage(found);
        } else {
          setError('Item not found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load item');
      } finally {
        setLoading(false);
      }
    }
    fetchSausage();
  }, [sausageId]);

  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [addOnId]: !prev[addOnId],
    }));
  };

  const handleAddToCart = () => {
    if (!sausage) {
      console.error('No sausage object!');
      return;
    }
    const selectedAddOnsList = (sausage.addOns || []).filter(
      addOn => selectedAddOns[addOn.id]
    );
    addToCart(sausage, quantity, selectedAddOnsList);
    setQuantity(1);
    setSelectedAddOns({});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error || !sausage) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl text-red-500">{error || 'Item not found'}</p>
      </div>
    );
  }

  const totalPrice = (sausage['Price'] || 0) * quantity;
  const addOnsTotal = (sausage.addOns || []).reduce((sum, addOn) => {
    return selectedAddOns[addOn.id] ? sum + (addOn.price || 0) : sum;
  }, 0) * quantity;
  const finalPrice = totalPrice + addOnsTotal;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/sausage" className="text-red-400 hover:text-red-300 mb-4 inline-block">
          ← Choose Sausage
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            {sausage['Image URL'] ? (
              <img
                src={sausage['Image URL']}
                alt={sausage['Item Name']}
                className="w-full rounded-lg object-cover aspect-square"
              />
            ) : (
              <div className="w-full aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-zinc-500">No image</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold text-red-600">{sausage['Item Name']}</h1>
            <p className="text-zinc-400 mt-1">{sausage['CATEGORY']}</p>
            {sausage['SIZE'] && (
              <p className="text-zinc-400">Size: {sausage['SIZE']}</p>
            )}
            {sausage['DESCRIPTION'] && (
              <p className="text-zinc-300 mt-2">{sausage['DESCRIPTION']}</p>
            )}
            <p className="text-2xl font-bold text-red-500 mt-4">
              ${(sausage['Price'] || 0).toFixed(2)}
            </p>

            {/* Quantity */}
            <div className="flex items-center space-x-4 mt-4">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-10 h-10 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center text-xl"
              >
                -
              </button>
              <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center text-xl"
              >
                +
              </button>
            </div>

            {/* Add-ons */}
            {sausage.addOns && sausage.addOns.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-3">Add-ons</h2>
                <div className="space-y-2">
                  {sausage.addOns.map((addOn) => (
                    <div
                      key={addOn.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        selectedAddOns[addOn.id]
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-zinc-700'
                      }`}
                    >
                      <div>
                        <span className="font-medium">{addOn.name}</span>
                        {addOn.description && (
                          <p className="text-sm text-zinc-400">{addOn.description}</p>
                        )}
                        {addOn.heatLevel && (
                          <p className="text-xs text-orange-400">Heat: {addOn.heatLevel}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold">
                          +${(addOn.price || 0).toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleAddOnToggle(addOn.id)}
                          className={`px-4 py-1 rounded-lg text-sm font-bold transition-colors ${
                            selectedAddOns[addOn.id]
                              ? 'bg-red-600 text-white'
                              : 'bg-zinc-700 text-white hover:bg-zinc-600'
                          }`}
                        >
                          {selectedAddOns[addOn.id] ? 'Remove' : 'Add'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="mt-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-red-500">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                className="mt-3 w-full py-3 bg-[#0BDA51] hover:bg-[#09C448] text-white rounded-lg font-bold text-lg transition-colors"
              >
                Gimme This! 😋
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}