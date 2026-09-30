// app/customize/eggs-boiled/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';

const STYLE_OPTIONS = [
  { name: 'Shelled (in the shell)', price: 0.75 },
  { name: 'Peeled (ready to eat)', price: 1.00 },
];

const SEASONINGS = [
  { name: 'Cayenne', price: 0.25 },
  { name: 'Garlic & Onion', price: 0.25 },
  { name: 'Deviled (mayo, mustard, paprika)', price: 1.00 },
];0. 

const FRESH_INGREDIENTS = [
  { name: 'Garlic', price: 0.25 },
  { name: 'Onion', price: 0.25 },
  { name: 'Pepper (Bell)', price: 0.25 },
  { name: 'Scallions', price: 0.25 },
];

const COOKED_INGREDIENTS = [
  { name: 'Bacon', price: 0.50 },
  { name: 'Onions', price: 0.25 },
  { name: 'Salad (mayo)', price: 1.50 },
];

export default function EggsBoiledCustomize() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [style, setStyle] = useState('');
  const [seasonings, setSeasonings] = useState([]);
  const [freshIngredients, setFreshIngredients] = useState([]);
  const [cookedIngredients, setCookedIngredients] = useState([]);

  const isLocked = !style;

  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const calculateTotal = () => {
    let total = 0;

    if (style) {
      const selected = STYLE_OPTIONS.find((s) => s.name === style);
      if (selected) total += selected.price;
    }

    seasonings.forEach((s) => {
      total += SEASONINGS.find((x) => x.name === s).price;
    });
    freshIngredients.forEach((f) => {
      total += FRESH_INGREDIENTS.find((x) => x.name === f).price;
    });
    cookedIngredients.forEach((c) => {
      total += COOKED_INGREDIENTS.find((x) => x.name === c).price;
    });

    return total;
  };

  const handleAddToCart = () => {
    if (!style) {
      alert('Please select a style.');
      return;
    }

    const cartItem = {
      id: `eggs-boiled-${Date.now()}`,
      'Item Name': 'BOILED EGGS',
      'Price': calculateTotal(),
      quantity: 1,
      customizations: {
        style,
        seasonings,
        freshIngredients,
        cookedIngredients,
      },
    };

    addToCart(cartItem);
    router.push('/cart');
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-8 pb-64">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">🥚 BOILED EGGS</h1>
            <p className="text-zinc-400 text-sm mt-1">The quickest meal of the day…</p>
          </div>
          <Link href="/menu" className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-700 transition-colors">
            ↩️ Back To Menu
          </Link>
        </div>

        {/* Style - Always Active */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
          <h3 className="font-bold text-lg text-white mb-4">Style (Includes)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STYLE_OPTIONS.map((s) => (
              <button
                key={s.name}
                onClick={() => setStyle(s.name)}
                className={`p-3 rounded-lg text-sm font-medium border transition-colors ${
                  style === s.name
                    ? 'bg-red-600 border-red-500 text-white'
                    : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'
                }`}
              >
                {s.name} (${s.price.toFixed(2)})
              </button>
            ))}
          </div>
        </div>

        {isLocked && (
          <div className="bg-zinc-900 border border-dashed border-zinc-700 rounded-xl p-6 mb-6 text-center">
            <p className="text-zinc-400 text-sm font-semibold">
              🔒 Select a style to unlock the rest of the customization
            </p>
          </div>
        )}

        <div className={isLocked ? 'opacity-40 pointer-events-none select-none' : ''}>
          {/* Seasonings */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
            <h3 className="font-bold text-lg text-white mb-4">Seasonings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SEASONINGS.map((s) => (
                <button
                  key={s.name}
                  onClick={() => toggleItem(seasonings, setSeasonings, s.name)}
                  className={`p-3 rounded-lg text-sm font-medium border transition-colors ${
                    seasonings.includes(s.name)
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  {s.name} (${s.price.toFixed(2)})
                </button>
              ))}
            </div>
          </div>

          {/* Fresh Ingredients */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
            <h3 className="font-bold text-lg text-white mb-4">Fresh Ingredients</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FRESH_INGREDIENTS.map((f) => (
                <button
                  key={f.name}
                  onClick={() => toggleItem(freshIngredients, setFreshIngredients, f.name)}
                  className={`p-3 rounded-lg text-sm font-medium border transition-colors ${
                    freshIngredients.includes(f.name)
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  {f.name} (${f.price.toFixed(2)})
                </button>
              ))}
            </div>
          </div>

          {/* Cooked Ingredients */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-12">
            <h3 className="font-bold text-lg text-white mb-4">Cooked Ingredients</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COOKED_INGREDIENTS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => toggleItem(cookedIngredients, setCookedIngredients, c.name)}
                  className={`p-3 rounded-lg text-sm font-medium border transition-colors ${
                    cookedIngredients.includes(c.name)
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  {c.name} (${c.price.toFixed(2)})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add to Cart */}
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 p-4 z-50 shadow-2xl">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Total: ${calculateTotal().toFixed(2)}</p>
              <p className="text-xs text-zinc-400">
                {!style ? 'Select a style' : 'Ready to add to cart'}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!style}
              className={`font-bold px-8 py-3 rounded-xl transition-all shadow-lg ${
                !style
                  ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}