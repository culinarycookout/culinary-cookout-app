'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext'; // Adjust if you have @/ alias

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch('/api/menu');
        const items = await res.json();
        const found = items.find((i) => i.id === params.id);
        if (found) {
          setItem(found);
          if (found.Sizes && found.Sizes.length > 0) {
            setSelectedSize(found.Sizes[0]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch item details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 text-white p-8">Loading...</div>;
  }

  if (!item) {
    return <div className="min-h-screen bg-zinc-950 text-white p-8">Item not found.</div>;
  }

  const currentPrice = selectedSize ? selectedSize.price : (item.Price || 0);

  const handleAddToCart = () => {
    addToCart({
      cartInstanceId: `${item.id}-${selectedSize?.id || 'standard'}`,
      id: item.id,
      name: item['Item Name'],
      price: currentPrice,
      sizeName: selectedSize?.size || 'Standard',
      quantity: quantity,
    });
    router.push('/cart');
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 max-w-4xl mx-auto">
      <Link href="/" className="text-red-500 hover:text-red-400 text-sm font-medium mb-6 inline-block">
        ← Back to Menu
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* Item Image */}
        <div>
          <img
            src={item['Image URL'] || '/placeholder.png'}
            alt={item['Item Name']}
            className="w-full h-80 object-cover rounded-2xl border border-zinc-800"
            onError={(e) => { e.target.src = '/placeholder.png'; }}
          />
        </div>

        {/* Item Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-red-500 tracking-wide">{item['Item Name']}</h1>
            <p className="text-xs uppercase tracking-wider text-zinc-400 mt-1">{item['CATEGORY']}</p>
            <p className="text-zinc-300 text-sm mt-3 leading-relaxed">{item['DESCRIPTION']}</p>
            <p className="text-2xl font-bold text-red-500 mt-4">${Number(currentPrice).toFixed(2)}</p>
          </div>

          {/* Size Selector */}
          {item.Sizes && item.Sizes.length > 0 && (
            <div className="mt-6">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Size Options</label>
              <div className="grid grid-cols-2 gap-2">
                {item.Sizes.map((sizeObj) => (
                  <button
                    key={sizeObj.id}
                    onClick={() => setSelectedSize(sizeObj)}
                    className={`py-2 px-4 rounded-xl text-sm font-semibold border transition ${
                      selectedSize?.id === sizeObj.id
                        ? 'bg-red-600 border-red-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {sizeObj.size} (${Number(sizeObj.price).toFixed(2)})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Add to Cart */}
          <div className="mt-8 flex items-center space-x-4">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 font-bold"
              >
                -
              </button>
              <span className="text-lg font-bold text-white w-10 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center hover:bg-red-500 font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#0BDA51] hover:bg-[#09C448] text-white font-bold py-3 px-6 rounded-xl transition shadow-lg text-lg"
            >
              Gimme This! 😋
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}