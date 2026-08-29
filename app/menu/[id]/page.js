'use client';

import { useState, useEffect, use } from 'react';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FOOD_MENU_ITEMS } from '../../menuData';

export default function ItemDetailPage({ params }) {
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const itemId = resolvedParams.id;
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let found = FOOD_MENU_ITEMS.find(item => item.id === itemId);
    
    if (found) {
      setItem(found);
      if (found.subMenu && found.subMenu.length > 0) {
        setSelectedSubItem(found.subMenu[0]);
      }
    } else {
      setError('Item not found');
    }
    setLoading(false);
  }, [itemId]);

  const handleContinue = () => {
    if (!item || !selectedSubItem) return;

    const cartItem = {
      ...item,
      'Item Name': selectedSubItem.name || item.name,
      'Selected Option': selectedSubItem.name || 'Standard',
      'Item ID': item.id,
      'Sub Item ID': selectedSubItem.id,
    };

    addToCart(cartItem);
    router.push('/cart');
  };

  if (loading) return <div className="min-h-screen bg-zinc-950 text-white p-8 flex justify-center pt-24 text-xl font-medium">Thank goodness for goodness... 🤤</div>;
  if (error || !item) return <div className="min-h-screen bg-black text-white p-8 text-red-500">{error || 'Item not found'}</div>;

  return (
    <div className="min-h-screen bg-black text-white pb-32 md:pb-4">
      <div className="max-w-4xl mx-auto md:p-4">
        <Link href="/" className="text-red-400 hover:text-red-300 mb-4 inline-block p-4 md:p-0">↩️ Back To Menu</Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-0">
          
          {/* LEFT COLUMN: IMAGE + DETAILS */}
          <div className="flex flex-col gap-3">
            {selectedSubItem?.image && selectedSubItem.image !== 'PLACEHOLDER_IMAGE_URL' ? (
              <img src={selectedSubItem.image} alt={selectedSubItem.name} className="w-full rounded-lg object-cover aspect-square transition-opacity duration-300" />
            ) : (
              <img src={item.image} alt={item.name} className="w-full rounded-lg object-cover aspect-square transition-opacity duration-300" />
            )}
            
            <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-sm space-y-1">
              <p className="text-zinc-300">{selectedSubItem?.description || item.description}</p>
            </div>
          </div>

          {/* RIGHT COLUMN: NAME, OPTIONS, BUTTON */}
          <div>
            <h1 className="text-3xl font-bold text-red-600">{item.name}</h1>
            <p className="text-zinc-400 mt-1">{item.category}</p>

            <div className="mt-4">
              <label className="block text-sm font-bold text-zinc-300 mb-2">Select Your Option:</label>
              <div className="flex flex-wrap gap-3">
                {item.subMenu && item.subMenu.length > 0 ? (
                  item.subMenu.map((subItem) => {
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
                        {subItem.name}
                      </button>
                    );
                  })
                ) : (
                  <p className="text-zinc-500">No options available.</p>
                )}
              </div>
            </div>

            {/* REMOVED PRICE AND QUANTITY COUNTER */}
            <div className="mt-8">
              <button
                onClick={handleContinue}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg transition-colors"
              >
                Continue to Customize
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}