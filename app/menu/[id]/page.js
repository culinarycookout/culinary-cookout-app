'use client';

import { useState, useEffect, use } from 'react';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';

const CACHE_KEY = 'culinary_menu_cache';

export default function ItemDetailPage({ params }) {
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const itemId = resolvedParams.id;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        let data = null;
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            data = parsed.data;
          } catch (e) {}
        }
        if (!data) {
          const res = await fetch('/api/menu');
          data = await res.json();
        }
        const found = data.find(item => item.id === itemId);
        if (found) {
          setItem(found);
          if (found.Sizes && found.Sizes.length > 0) {
            setSelectedSize(found.Sizes[0]);
          } else {
            // ✅ No sizes — create a default "Standard" size from the item's price
            setSelectedSize({
              id: 'default',
              size: 'Standard',
              price: found.Price || 0,
              serves: '',
              amount: '',
              description: '',
            });
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

  const handleAddToCart = () => {
    if (!item) return;

    // Use selectedSize price, or fallback to item's Price
    const price = selectedSize?.price ?? item.Price ?? 0;
    const size = selectedSize?.size || 'Standard';
    const serves = selectedSize?.serves || '';
    const amount = selectedSize?.amount || '';
    const isDiscounted = selectedSize?.isDiscounted || false;
    const originalPrice = selectedSize?.originalPrice || price;

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

    addToCart(cartItem, quantity, []);
    setQuantity(1);
    window.location.href = '/cart';
  };

  if (loading) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 flex justify-center pt-24 text-xl font-medium">
      Thank goodness for goodness... 🤤
    </div>
  );
}

  if (error || !item) {
    return <div className="min-h-screen bg-black text-white p-8 text-red-500">{error || 'Item not found'}</div>;
  }

  const currentPrice = selectedSize?.price ?? item.Price ?? 0;
  const isDiscounted = selectedSize?.isDiscounted ?? false;
  const originalPrice = selectedSize?.originalPrice ?? currentPrice;
  const finalPrice = currentPrice * quantity;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-red-400 hover:text-red-300 mb-4 inline-block">← Back to Menu</Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {item['Image URL'] ? (
              <img src={item['Image URL']} alt={item['Item Name']} className="w-full rounded-lg object-cover aspect-square" />
            ) : (
              <div className="w-full aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-zinc-500">No image</span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-red-600">{item['Item Name']}</h1>
            <p className="text-zinc-400 mt-1">{item['CATEGORY']}</p>
            {item['DESCRIPTION'] && <p className="text-zinc-300 mt-2">{item['DESCRIPTION']}</p>}

            <div className="mt-4">
              {isDiscounted ? (
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-red-500">${currentPrice.toFixed(2)}</p>
                  <p className="text-lg text-gray-400 line-through">${(originalPrice || 0).toFixed(2)}</p>
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">50% OFF 🎉</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-red-500">${currentPrice.toFixed(2)}</p>
              )}
            </div>

            {item.Sizes && item.Sizes.length > 0 && (
              <div className="mt-4">
                <label className="block text-sm font-bold text-zinc-300 mb-2">Size Options:</label>
                <div className="flex flex-wrap gap-3">
                  {item.Sizes.map((size) => {
                    const isSelected = selectedSize?.id === size.id;
                    const isHalf = size.size.toLowerCase().includes('half');
                    const baseClass = "px-4 py-2 rounded-lg font-bold text-sm transition-colors border";
                    const selectedClass = isHalf
                      ? "bg-red-300 text-black border-red-400 hover:bg-red-200"
                      : "bg-red-600 text-white border-red-700 hover:bg-red-500";
                    const unselectedClass = "bg-zinc-800 text-white border-zinc-700 hover:border-zinc-500";

                    return (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size)}
                        className={`${baseClass} ${isSelected ? selectedClass : unselectedClass}`}
                      >
                        {size.size} (${Number(size.price).toFixed(2)})
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedSize && (
              <div className="mt-3 space-y-1">
                {selectedSize.description && (
                  <p className="text-sm text-zinc-300">{selectedSize.description}</p>
                )}
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
              </div>
            )}

            <div className="flex items-center space-x-4 mt-4">
              <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="w-10 h-10 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center text-xl">-</button>
              <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)} className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center text-xl">+</button>
            </div>

            <div className="mt-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-red-500">${finalPrice.toFixed(2)}</span>
              </div>
              <button onClick={handleAddToCart} className="mt-3 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg transition-colors">
                Gimme This! 😋
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}