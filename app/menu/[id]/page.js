'use client';

import { useState, useEffect, use } from 'react';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ✅ Added import

export default function ItemDetailPage({ params }) {
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const itemId = resolvedParams.id;
  const router = useRouter(); // ✅ Initialize router

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('Failed to fetch menu');
        const data = await res.json();

        const found = data.find(item => item.id === itemId);
        if (found) {
          setItem(found);
          if (found.Sizes && found.Sizes.length > 0) {
            setSelectedSize(found.Sizes[0]);
          } else {
            setSelectedSize({
              id: 'default',
              size: 'Standard',
              price: found.Price || 0,
              amount: '',
              serves: '',
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
    if (!item || !selectedSize) return;

    // ✅ Safe price fallback: checks for selectedSize.Price or selectedSize.price
    const price = selectedSize.Price ?? selectedSize.price ?? 0;

    const cartItem = {
      ...item,
      'Price': price,
      'SIZE': selectedSize.size,
      'SERVES:': selectedSize.serves,
      'AMOUNT': selectedSize.amount,
      'selectedSize': selectedSize.size,
      'selectedPrice': price,
      quantity: quantity
    };

    addToCart(cartItem);
    setQuantity(1);
    router.push('/cart'); // ✅ Replaced window.location.href
  };

  if (loading) return <div className="min-h-screen bg-zinc-950 text-white p-8 flex justify-center pt-24 text-xl font-medium">Loading...</div>;
  if (error || !item) return <div className="min-h-screen bg-black text-white p-8 text-red-500">{error || 'Item not found'}</div>;

  const currentPrice = selectedSize?.price || 0;
  const finalPrice = currentPrice * quantity;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-red-400 hover:text-red-300 mb-4 inline-block">← Back to Menu</Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: IMAGE + SIZE-SPECIFIC DETAILS */}
          <div className="flex flex-col gap-3">
            {item['Image URL'] ? (
              <img src={item['Image URL']} alt={item['Item Name']} className="w-full rounded-lg object-cover aspect-square" />
            ) : (
              <div className="w-full aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-zinc-500">No image</span>
              </div>
            )}
            
            {selectedSize && (
              <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-sm space-y-1">
                {selectedSize.description && <p className="text-zinc-300">{selectedSize.description}</p>}
                {selectedSize.serves && <p className="text-zinc-300 mt-1"><span className="text-zinc-400">Serves:</span> {selectedSize.serves}</p>}
                {selectedSize.amount && <p className="text-zinc-300 mt-1"><span className="text-zinc-400">Included:</span> {selectedSize.amount}</p>}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: NAME, PRICE, SIZES, CONTROLS */}
          <div>
            <h1 className="text-3xl font-bold text-red-600">{item['Item Name']}</h1>
            <p className="text-zinc-400 mt-1">{item['CATEGORY']}</p>
            {item['DESCRIPTION'] && <p className="text-zinc-300 mt-2">{item['DESCRIPTION']}</p>}

            <div className="mt-4">
              <p className="text-2xl font-bold text-red-500">${currentPrice.toFixed(2)}</p>
            </div>

            {item.Sizes && item.Sizes.length > 0 && (
              <div className="mt-4">
                <label className="block text-sm font-bold text-zinc-300 mb-2">Size Options:</label>
                <div className="flex flex-wrap gap-3">
                  {item.Sizes.map((size) => {
                    const isSelected = selectedSize?.id === size.id;
                    const baseClass = "px-4 py-2 rounded-lg font-bold text-sm transition-colors border";
                    const selectedClass = "bg-red-600 text-white border-red-700 hover:bg-red-500";
                    const unselectedClass = "bg-zinc-800 text-white border-zinc-700 hover:border-zinc-500";

                    return (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size)}
                        className={`${baseClass} ${isSelected ? selectedClass : unselectedClass}`}
                      >
                        {size.size} (${Number(size.price || 0).toFixed(2)})
                      </button>
                    );
                  })}
                </div>
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