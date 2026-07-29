'use client';

import { useState, useEffect, use } from 'react';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';

export default function ItemDetailPage({ params }) {
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const itemId = resolvedParams.id;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState({});

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        const found = data.find(item => item.id === itemId);
        if (found) {
          // ✅ ADD-ONS are already fetched from Notion relation in the API
          // The API returns them as an array of IDs in found['ADD-ONS']
          // We need to fetch the actual add-on data from the Add-ons database

          const addOnIds = found['ADD-ONS'] || [];
          const fetchedAddOns = [];

          for (const id of addOnIds) {
            try {
              const addOnResponse = await fetch(`https://api.notion.com/v1/pages/${id}`, {
                headers: {
                  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTION_TOKEN || ''}`,
                  'Notion-Version': '2022-06-28',
                  'Content-Type': 'application/json',
                },
              });
              if (addOnResponse.ok) {
                const addOnData = await addOnResponse.json();
                const props = addOnData.properties;
                fetchedAddOns.push({
                  id: addOnData.id,
                  name: props['Add-On']?.title?.[0]?.plain_text || 'Add-on',
                  price: props['Price']?.number || 0,
                  description: props['Description']?.rich_text?.[0]?.plain_text || '',
                  heatLevel: props['Heat Level']?.select?.name || '',
                  countable: props['Countable']?.checkbox || false,
                });
              }
            } catch (err) {
              console.error('Error fetching add-on:', err);
            }
          }

          found['ADD-ONS'] = fetchedAddOns;

          setItem(found);
          if (found.Sizes && found.Sizes.length > 0) {
            setSelectedSize(found.Sizes[0]);
          }
        } else {
          setError('Item not found');
        }
      } catch (err) {
        setError('Failed to load item');
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [itemId]);

  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [addOnId]: !prev[addOnId],
    }));
  };

  const handleAddToCart = () => {
    if (!item) return;

    const price = selectedSize?.price ?? item['Price'] ?? 0;
    const size = selectedSize?.size || 'Standard';
    const serves = selectedSize?.serves || '';
    const amount = selectedSize?.amount || '';
    const isDiscounted = selectedSize?.isDiscounted || item?.isDiscounted || false;
    const originalPrice = selectedSize?.originalPrice || item?.originalPrice || price;

    const cartItem = {
      ...item,
      'Price': price,
      'SIZE': size,
      'SERVES:': serves,
      'AMOUNT': amount,
      'selectedSize': size,
      'selectedPrice': price,
      'originalPrice': originalPrice,
      'isDiscounted': isDiscounted,
    };

    const selectedAddOnsList = (item['ADD-ONS'] || []).filter(
      addOn => selectedAddOns[addOn.id]
    );

    addToCart(cartItem, quantity, selectedAddOnsList);
    setQuantity(1);
    setSelectedAddOns({});
    window.location.href = '/cart';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl text-red-500">{error || 'Item not found'}</p>
      </div>
    );
  }

  const showSizeSelector = item.Sizes && item.Sizes.length > 1;
  const basePrice = selectedSize?.price ?? item['Price'] ?? 0;
  const isDiscounted = selectedSize?.isDiscounted || item?.isDiscounted || false;
  const originalPrice = selectedSize?.originalPrice || item?.originalPrice || basePrice;

  const addOnsTotal = (item['ADD-ONS'] || []).reduce((sum, addOn) => {
    return selectedAddOns[addOn.id] ? sum + (addOn.price || 0) : sum;
  }, 0) * quantity;
  const finalPrice = (basePrice * quantity) + addOnsTotal;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-red-400 hover:text-red-300 mb-4 inline-block">
          ← Back to Menu
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {item['Image URL'] ? (
              <img
                src={item['Image URL']}
                alt={item['Item Name']}
                className="w-full rounded-lg object-cover aspect-square"
              />
            ) : (
              <div className="w-full aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-zinc-500">No image</span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-red-600">{item['Item Name']}</h1>
            <p className="text-zinc-400 mt-1">{item['CATEGORY']}</p>

            {item['DESCRIPTION'] && (
              <p className="text-zinc-300 mt-2">{item['DESCRIPTION']}</p>
            )}

            {item.Sizes && item.Sizes.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-bold text-zinc-300 mb-2">
                  {showSizeSelector ? 'Select Size:' : 'Size:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.Sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                        selectedSize?.id === size.id
                          ? 'bg-red-600 text-white'
                          : 'bg-zinc-800 text-white hover:bg-zinc-700'
                      }`}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {basePrice > 0 && (
              <div className="mt-4">
                {isDiscounted ? (
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold text-red-500">
                      ${basePrice.toFixed(2)}
                    </p>
                    <p className="text-lg text-gray-400 line-through">
                      ${(originalPrice || 0).toFixed(2)}
                    </p>
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      50% OFF 🎉
                    </span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-red-500">
                    ${basePrice.toFixed(2)}
                  </p>
                )}
              </div>
            )}

            {selectedSize && (
              <div className="mt-2">
                {selectedSize.serves && (
                  <p className="text-sm text-zinc-300">
                    <span className="text-zinc-400">Serves:</span> {selectedSize.serves}
                  </p>
                )}
                {selectedSize.amount && (
                  <p className="text-sm text-zinc-300">
                    <span className="text-zinc-400">Included:</span> {selectedSize.amount} per order
                  </p>
                )}
                {selectedSize.description && (
                  <p className="text-zinc-300 mt-2">{selectedSize.description}</p>
                )}
              </div>
            )}

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

            {item['ADD-ONS'] && item['ADD-ONS'].length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-3">Add-ons</h2>
                <div className="space-y-2">
                  {item['ADD-ONS'].map((addOn) => (
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