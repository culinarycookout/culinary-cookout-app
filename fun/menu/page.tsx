'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { useFunAuth } from '../FunAuthContext';
import { funData, defaultFunImage } from '../../../constants/funData';

export default function FunMenuPage() {
  const router = useRouter();
  const { funUser, funLoading } = useFunAuth();
  const { addToCart } = useCart();

  // Store a local quantity map for each drink
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  
  const [items, setItems] = useState(funData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (funLoading) return;

    if (!funUser) {
      router.push('/fun/login');
      return;
    }
  }, [funUser, funLoading, router]);

  const handleQuantityChange = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (item: any) => {
    const qty = quantities[item.id] || 1;
    for (let i = 0; i < qty; i++) {
      const cartItem = {
        ...item,
        'Item Name': `${item.name} (${item.size})`,
        'Price': item.price,
        cartInstanceId: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + i,
        quantity: 1,
      };
      addToCart(cartItem);
    }
    // Reset quantity to 1 after adding
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  if (funLoading || !funUser) return null;

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-red-500">🥃 Let's Get Trubblesum</h1>
        </div>

        {loading ? (
          <div className="text-center py-12 text-zinc-400">Loading the fun menu...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => {
              const qty = quantities[item.id] || 1;
              const totalPrice = item.price * qty;

              return (
                <div
                  key={item.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:border-zinc-600 transition-all flex flex-col h-full"
                >
                  <img src={defaultFunImage} alt={item.name} className="w-full h-40 object-cover flex-shrink-0" />
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-lg text-white leading-tight">{item.name}</h3>
                      <p className="text-sm text-zinc-400 mt-0.5">{item.type} • {item.size}</p>
                    </div>

                    {/* ✅ Reimagined: Price + Quantity Stepper */}
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-xl font-bold text-red-400">${totalPrice.toFixed(2)}</p>
                      <div className="flex items-center space-x-2 bg-zinc-800 rounded-full px-2 py-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center transition-colors"
                        >
                          −
                        </button>
                        <span className="text-base font-bold w-6 text-center">{qty}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* ✅ Add button nested cleanly below the stepper */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}