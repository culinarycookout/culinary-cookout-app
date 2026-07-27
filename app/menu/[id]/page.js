'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function ItemDetailPage({ params }) {
  // Unwrap params using React.use() for Next.js 15+ compatibility
  const resolvedParams = use(params);
  const itemId = resolvedParams.id;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState({});

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        // Fetch ALL menu items from the existing API
        const res = await fetch(`/api/menu`);
        const data = await res.json();
        
        if (res.ok) {
          // Find the specific item by ID
          const foundItem = data.find((menuItem) => menuItem.id === itemId);
          
          if (foundItem) {
            setItem(foundItem);
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

  // Toggle add-on selection state
  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [addOnId]: !prev[addOnId],
    }));
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

  // --- FILTER ADD-ONS BY SIZE ---
  // Only show add-ons that match the item's size OR have no size specified
  const availableAddOns = (item.addOns || []).filter((addOn) => {
    // If the add-on has a size, only show it if it matches the item's size
    if (addOn.size && addOn.size.trim() !== '') {
      return addOn.size === item.size;
    }
    // If no size specified on the add-on, show it for all sizes
    return true;
  });

  // Calculate total price including selected add-ons
  const basePrice = item.price || 0;
  const addOnsTotal = availableAddOns.reduce((sum, addOn) => {
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
            <h1 className="text-3xl font-bold text-red-600">{item.name}</h1>
            <p className="text-zinc-400 mt-1">{item.category}</p>
            <p className="text-zinc-400">{item.size}</p>
            <p className="text-zinc-400">Serves: {item.serves}</p>
            {item.description && (
              <p className="text-zinc-300 mt-2">{item.description}</p>
            )}

            <div className="mt-4">
              <p className="text-2xl font-bold text-red-500">
                Base: ${basePrice.toFixed(2)}
              </p>
            </div>

            {/* Add-ons Section - Now Filtered by Size */}
            {availableAddOns.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-3">Add-ons</h2>
                <div className="space-y-2">
                  {availableAddOns.map((addOn) => (
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
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-lg transition-colors"
                onClick={() => {
                  // Add to cart logic will go here
                  const selectedAddOnNames = availableAddOns
                    .filter((addOn) => selectedAddOns[addOn.id])
                    .map((addOn) => addOn.name)
                    .join(', ');
                  
                  alert(`Added ${item.name}${selectedAddOnNames ? ` with ${selectedAddOnNames}` : ''} to cart!`);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}