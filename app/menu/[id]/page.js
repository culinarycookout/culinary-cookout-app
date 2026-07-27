'use client';

import { useState, useEffect, use } from 'react';
import { useCart } from '../../context/CartContext';

export default function ItemDetailPage({ params }) {
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const itemId = resolvedParams.id;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const res = await fetch(`/api/menu`);
        const data = await res.json();
        
        if (res.ok) {
          const foundItem = data.find((menuItem) => menuItem.id === itemId);
          
          if (foundItem) {
            setItem(foundItem);
            setQuantity(foundItem.quantity || 0);
          } else {
            setError('Item not found');
          }
        } else {
          setError(data.error || 'Failed to load menu');
        }
      } catch (err) {
        setError('Failed to load item detail');
      } finally {
        setLoading(false);
      }
    }

    fetchItemDetails();
  }, [itemId]);

  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [addOnId]: !prev[addOnId],
    }));
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCartClick = () => {
    if (quantity === 0) {
      alert('Please select a quantity first');
      return;
    }

    const selectedAddOnsList = (item.addOns || []).filter(
      (addOn) => selectedAddOns[addOn.id]
    );

    addToCart(item, quantity, selectedAddOnsList);
    
    setQuantity(0);
    setSelectedAddOns({});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl text-red-500">Item not found</div>
      </div>
    );
  }

  const isUnpriced = !item.price || item.price === 0 || item.price === "0.00" || item.price === "";
  const basePrice = item.price || 0;
  const addOnsTotal = (item.addOns || []).reduce((sum, addOn) => {
    return selectedAddOns[addOn.id] ? sum + (addOn.price || 0) : sum;
  }, 0);
  const totalPrice = basePrice + addOnsTotal;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="text-red-400 hover:text-red-300 mb-4 text-lg"
        >
          ← Back to Menu
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Item Image */}
          <div>
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full rounded-lg object-cover aspect-square"
              />
            ) : (
              <div className="w-full aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-zinc-500">No image</span>
              </div>
            )}
          </div>

          {/* Item Details */}
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold text-red-600">{item.name}</h1>
              {item.isDiscounted && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  🌮🪅50% OFF‼️🎉
                </span>
              )}
            </div>
            <p className="text-zinc-400 mt-1">{item.category}</p>
            {item.size && <p className="text-zinc-400">Size: {item.size}</p>}
            {item.serves && <p className="text-zinc-400">Serves: {item.serves}</p>}
            
            {item.quantity > 0 && (
              <p className="text-zinc-400">Quantity: {item.quantity}</p>
            )}
            
            {item.description && (
              <p className="text-zinc-300 mt-2">{item.description}</p>
            )}

            {/* Price Display */}
            <div className="mt-4">
              {item.isDiscounted ? (
                <div className="flex items-center gap-3">
                  <p className="text-3xl font-bold text-red-500">
                    ${(Number(item.price) || 0).toFixed(2)}
                  </p>
                  <p className="text-lg text-gray-400 line-through">
                    ${(Number(item.originalPrice) || 0).toFixed(2)}
                  </p>
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    50% OFF!
                  </span>
                </div>
              ) : isUnpriced ? (
                <p className="text-2xl font-bold text-orange-500">Price Pending</p>
              ) : (
                <p className="text-2xl font-bold text-red-500">
                  ${basePrice.toFixed(2)}
                </p>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-4 mt-4">
              <button
                onClick={handleDecrement}
                className="w-10 h-10 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center text-xl"
              >
                -
              </button>
              <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center text-xl"
              >
                +
              </button>
            </div>

            {/* Add-ons Section */}
            {item.addOns && item.addOns.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-3">Add-ons</h2>
                <div className="space-y-2">
                  {item.addOns.map((addOn) => (
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

            {/* Total and Add to Cart */}
            <div className="mt-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-red-500">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                className={`mt-3 w-full py-3 rounded-lg font-bold text-lg transition-colors ${
                  isUnpriced || quantity === 0
                    ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    : 'bg-[#0BDA51] hover:bg-[#09C448] text-white'
                }`}
                onClick={handleAddToCartClick}
                disabled={isUnpriced || quantity === 0}
              >
                {isUnpriced ? 'Coming Soon' : 'Gimme This!😋'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}