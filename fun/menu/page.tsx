'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function FunMenuPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!funUser) {
    router.push('/fun/login');
    return;
  }

    async function fetchFunMenu() {
      try {
        const res = await fetch('/api/fun-api');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error('Failed to load menu');
      } finally {
        setLoading(false);
      }
    }
    fetchFunMenu();
  }, [user, router]);

  const handleAddToCart = (item: any) => {
    const cartItem = {
      ...item,
      cartInstanceId: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      quantity: 1,
    };
    addToCart(cartItem);
  };

  if (!user) return null;

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-red-500">🍸 Fun Menu</h1>
        </div>

        {loading ? (
          <div className="text-center py-12 text-zinc-400">Loading the fun menu...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item: any) => (
              <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-600 transition-colors flex flex-col h-full">
                {item['Image URL'] ? (
                  <img src={item['Image URL']} alt={item['Item Name']} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-zinc-800 flex items-center justify-center text-4xl">🍸</div>
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-white">{item['Item Name']}</h3>
                  <p className="text-sm text-zinc-400">{item['DESCRIPTION']}</p>
                  <p className="text-red-400 font-bold mt-2 text-lg">
                    ${(item['Price'] || 0).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-4 w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}