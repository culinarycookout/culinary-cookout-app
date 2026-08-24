'use client';

import { useState, useEffect, use } from 'react';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FOOD_MENU_ITEMS } from '../../menuData';

export default function ItemDetailPage({ params }) {
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const itemId = resolvedParams.id; // 🔥 This is now a string ID, not a number
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // ✅ Find the item by STRING ID
    let found = FOOD_MENU_ITEMS.find(item => item.id === itemId);
    
    if (found) {
      setItem(found);
      // ✅ Auto-select the first sub-item if there is one
      if (found.subMenu && found.subMenu.length > 0) {
        setSelectedSubItem(found.subMenu[0]);
      }
    } else {
      setError('Item not found');
    }
    setLoading(false);
  }, [itemId]);

  const handleAddToCart = () => {
    if (!item || !selectedSubItem) return;

    const cartItem = {
      ...item,
      'Price': selectedSubItem.price || item.price || 0,
      'Item Name': selectedSubItem.name || item.name,
      'Description': selectedSubItem.description || item.description,
      'selectedSize': selectedSubItem.name,
      'selectedPrice': selectedSubItem.price || item.price || 0,
      quantity: quantity
    };

    addToCart(cartItem);
    setQuantity(1);
    router.push('/cart');
  };

  if (loading) return <div className="min-h-screen bg-zinc-950 text-white p-8 flex justify-center pt-24 text-xl font-medium">Thank goodness for goodness... 🤤</div>;
  if (error || !item) return <div className="min-h-screen bg-black text-white p-8 text-red-500">{error || 'Item not found'}</div>;

  const currentPrice = selectedSubItem?.price || item.price || 0;
  const finalPrice = currentPrice * quantity;

  return (
    <div className="min-h-screen bg-black text-white pb-32 md:pb-4">
      <div className="max-w-4xl mx-auto md:p-4">
        <Link href="/" className="text-red-400 hover:text-red-300 mb-4 inline-block p-4 md:p-0">↩️ Back To Menu</Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-0">
          
          {/* LEFT COLUMN: IMAGE + DETAILS */}
          <div className="flex flex-col gap-3">
            {/* 🔥 SWAPS PICTURE WHEN SUB-MENU OPTION IS CLICKED */}
            {selectedSubItem?.image && selectedSubItem.image !== 'PLACEHOLDER_IMAGE_URL' ? (
              <img src={selectedSubItem.image} alt={selectedSubItem.name} className="w-full rounded-lg object-cover aspect-square transition-opacity duration-300" />
            ) : (
              <img src={item.image} alt={item.name} className="w-full rounded-lg object-cover aspect-square transition-opacity duration-300" />
            )}
            
            <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-sm space-y-1">
              <p className="text-zinc-300">{selectedSubItem?.description || item.description}</p>
            </div>
          </div>

          {/* RIGHT COLUMN: NAME, PRICE, OPTIONS, CONTROLS */}
          <div>
            <h1 className="text-3xl font-bold text-red-600">{item.name}</h1>
            <p className="text-zinc-400 mt-1">{item.category}</p>

            <div className="mt-4">
              <p className="text-2xl font-bold text-red-500">${currentPrice.toFixed(2)}</p>
            </div>

            {/* SUB-MENU OPTIONS (Only shows if item has subMenu) */}
            {item.subMenu && item.subMenu.length > 0 && (
              <div className="mt-4">
                <label className="block text-sm font-bold text-zinc-300 mb-2">Choose Your Option:</label>
                <div className="flex flex-wrap gap-3">
                  {item.subMenu.map((subItem) => {
                    const isSelected = selectedSubItem?.id === subItem.id;
                    const baseClass = "px-4 py-2 rounded-lg font-bold text-sm transition-colors border";
                    const selectedClass = "bg-red-600 text-white border-red-700 hover:bg-red-500";
                    const unselectedClass = "bg-zinc-800 text-white border-zinc-700 hover:border-zinc-500";

                    return (
                      <button
                        key={subItem.id}
                        onClick={() => setSelectedSubItem(subItem)}
                        className={`${baseClass} ${isSelected ? selectedClass : unselectedClass}`}
                      >
                        {subItem.name} (${Number(subItem.price || 0).toFixed(2)})
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
          </div>
        </div>

        {/* MOBILE STICKY BOTTOM BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 p-4 pb-safe z-50 shadow-2xl md:hidden">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <p className="text-sm text-zinc-400">Total</p>
              <p className="text-2xl font-bold text-red-500">${finalPrice.toFixed(2)}</p>
            </div>
            <button onClick={handleAddToCart} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg transition-colors">
              Gimme This! 😋
            </button>
          </div>
        </div>

        {/* DESKTOP TOTAL BOX */}
        <div className="hidden md:block mt-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800 md:w-1/2 ml-auto">
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
  );
}