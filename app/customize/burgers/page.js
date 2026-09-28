// app/customize/burger/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';

const MEAT_OPTIONS = [
  { name: '1/3 lb Beef Patty', price: 4.50 },
  { name: '1/3 lb Turkey Patty', price: 2.25 },
  { name: 'Grilled Chicken Breast', price: 5.00 },
  { name: 'Fried Chicken Breast', price: 5.50 },
];

const BASE_OPTIONS = [
  { name: 'Artisan Bun', price: 3.25 },
  { name: 'Ciabatta Bun', price: 3.00 },
];

const FRESH_TOPPINGS = [
  { name: 'Avocado', price: 1.00 },
  { name: 'Butter Lettuce', price: 0.75 },
  { name: 'Pickles', price: 0.50 },
  { name: 'Red Onion', price: 0.25 },
  { name: 'Tomato', price: 0.75 },
];

const COOKED_TOPPINGS = [
  { name: 'Bacon', price: 2.00 },
  { name: 'Egg', price: 0.50 },
  { name: 'Jalapeño', price: 0.50 },
  { name: 'Mushroom Patty', price: 4.00 },
  { name: 'Onion', price: 1.00 },
];

const ENHANCEMENTS = [
  { name: 'Medium Cheddar Cheese', price: 0.75 },
  { name: 'Sharp Cheddar Cheese', price: 0.75 },
  { name: 'Colby Jack Cheese', price: 0.75 },
  { name: 'Pepper Jack Cheese', price: 0.75 },
  { name: 'Mexican Cheese', price: 0.75 },
  { name: 'Mozzarella Cheese', price: 0.75 },
  { name: 'Provolone Cheese', price: 0.75 },
  { name: 'Swiss Cheese', price: 0.75 },
  { name: 'Lactose-Free Cheddar Cheese', price: 1.50 },
  { name: 'Non-Dairy Cheddar', price: 0.00 },
  { name: 'Non-Dairy Swiss', price: 0.00 },
  { name: 'Fries', price: 1.00 },
];

const CONDIMENTS = [
  { name: 'Garlic Aïoli', price: 2.00 },
  { name: 'BBQ Sauce', price: 1.00 },
  { name: 'Hickory BBQ Sauce', price: 1.00 },
  { name: 'Mesquite BBQ Sauce', price: 1.00 },
  { name: 'Spicy BBQ Sauce', price: 1.00 },
  { name: 'Habanero Honey', price: 3.00 },
  { name: 'Hot Sauce', price: 0.50 },
  { name: 'Garlic Hot Sauce', price: 0.75 },
  { name: 'Ketchup', price: 0.25 },
  { name: 'Mayo (Truffle)', price: 0.50 },
  { name: 'Mustard', price: 0.25 },
];

export default function BurgerCustomize() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [primaryMeat, setPrimaryMeat] = useState('');
  const [additionalMeats, setAdditionalMeats] = useState({});
  const [base, setBase] = useState('');
  const [freshToppings, setFreshToppings] = useState([]);
  const [cookedToppings, setCookedToppings] = useState([]);
  const [enhancements, setEnhancements] = useState([]);
  const [condiments, setCondiments] = useState([]);

  const updateAdditionalMeat = (name, delta) => {
    setAdditionalMeats((prev) => {
      const newQty = Math.max(0, (prev[name] || 0) + delta);
      return { ...prev, [name]: newQty };
    });
  };

  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const calculateTotal = () => {
    let total = 0;

    if (primaryMeat) {
      const primary = MEAT_OPTIONS.find((m) => m.name === primaryMeat);
      if (primary) total += primary.price;
    }

    MEAT_OPTIONS.forEach((m) => {
      total += (additionalMeats[m.name] || 0) * m.price;
    });

    if (base) total += BASE_OPTIONS.find((b) => b.name === base).price;

    freshToppings.forEach((t) => {
      total += FRESH_TOPPINGS.find((f) => f.name === t).price;
    });
    cookedToppings.forEach((t) => {
      total += COOKED_TOPPINGS.find((c) => c.name === t).price;
    });
    enhancements.forEach((t) => {
      total += ENHANCEMENTS.find((e) => e.name === t).price;
    });
    condiments.forEach((t) => {
      total += CONDIMENTS.find((c) => c.name === t).price;
    });

    return total;
  };

  const handleAddToCart = () => {
    if (!primaryMeat) {
      alert('Please select a primary meat.');
      return;
    }
    if (!base) {
      alert('Please select a base.');
      return;
    }

    const cartItem = {
      id: `burger-${Date.now()}`,
      'Item Name': 'BURGER',
      'Price': calculateTotal(),
      quantity: 1,
      customizations: {
        primaryMeat,
        additionalMeats,
        base,
        freshToppings,
        cookedToppings,
        enhancements,
        condiments,
      },
    };

    addToCart(cartItem);
    router.push('/cart');
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-8 pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">🍔 BURGER</h1>
            <p className="text-zinc-400 text-sm mt-1">Build your burger from the bun up.</p>
          </div>
          <Link href="/menu" className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-700 transition-colors">
            ↩️ Back To Menu
          </Link>
        </div>

        {/* Meats */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
          <h3 className="font-bold text-lg text-white mb-4">Meats</h3>

          {/* Primary Meat Dropdown */}
          <label className="block text-xs font-semibold text-zinc-300 mb-2">
            Primary Meat *
          </label>
          <select
            value={primaryMeat}
            onChange={(e) => setPrimaryMeat(e.target.value)}
            className="w-full p-2.5 mb-6 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none"
          >
            <option value="">Select Primary Meat...</option>
            {MEAT_OPTIONS.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name} (${m.price.toFixed(2)})
              </option>
            ))}
          </select>

          {/* Additional Meats Counters */}
          <label className="block text-xs font-semibold text-zinc-300 mb-2">
            Additional Meats
          </label>
          <div className="space-y-3">
            {MEAT_OPTIONS.map((m) => (
              <div key={m.name} className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg border border-zinc-700">
                <span className="text-sm font-medium">{m.name} (${m.price.toFixed(2)})</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateAdditionalMeat(m.name, -1)} className="w-8 h-8 rounded bg-zinc-700 hover:bg-zinc-600 font-bold">-</button>
                  <span className="w-6 text-center">{additionalMeats[m.name] || 0}</span>
                  <button onClick={() => updateAdditionalMeat(m.name, 1)} className="w-8 h-8 rounded bg-zinc-700 hover:bg-zinc-600 font-bold">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Base */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
          <h3 className="font-bold text-lg text-white mb-4">Base</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BASE_OPTIONS.map((b) => (
              <button key={b.name} onClick={() => setBase(b.name)} className={`p-3 rounded-lg text-sm font-medium border ${base === b.name ? 'bg-red-600 border-red-500' : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'}`}>
                {b.name} (${b.price.toFixed(2)})
              </button>
            ))}
          </div>
        </div>

        {/* Fresh Toppings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
          <h3 className="font-bold text-lg text-white mb-4">Fresh Toppings</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FRESH_TOPPINGS.map((t) => (
              <button key={t.name} onClick={() => toggleItem(freshToppings, setFreshToppings, t.name)} className={`p-3 rounded-lg text-sm font-medium border ${freshToppings.includes(t.name) ? 'bg-red-600 border-red-500' : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'}`}>
                {t.name} (${t.price.toFixed(2)})
              </button>
            ))}
          </div>
        </div>

        {/* Cooked Toppings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
          <h3 className="font-bold text-lg text-white mb-4">Cooked Toppings</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {COOKED_TOPPINGS.map((t) => (
              <button key={t.name} onClick={() => toggleItem(cookedToppings, setCookedToppings, t.name)} className={`p-3 rounded-lg text-sm font-medium border ${cookedToppings.includes(t.name) ? 'bg-red-600 border-red-500' : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'}`}>
                {t.name} (${t.price.toFixed(2)})
              </button>
            ))}
          </div>
        </div>

        {/* Enhancements */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
          <h3 className="font-bold text-lg text-white mb-4">Enhancements</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ENHANCEMENTS.map((t) => (
              <button key={t.name} onClick={() => toggleItem(enhancements, setEnhancements, t.name)} className={`p-3 rounded-lg text-sm font-medium border ${enhancements.includes(t.name) ? 'bg-red-600 border-red-500' : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'}`}>
                {t.name} (${t.price.toFixed(2)})
              </button>
            ))}
          </div>
        </div>

        {/* Condiments */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
          <h3 className="font-bold text-lg text-white mb-4">Condiments</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CONDIMENTS.map((t) => (
              <button key={t.name} onClick={() => toggleItem(condiments, setCondiments, t.name)} className={`p-3 rounded-lg text-sm font-medium border ${condiments.includes(t.name) ? 'bg-red-600 border-red-500' : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'}`}>
                {t.name} (${t.price.toFixed(2)})
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 p-4 z-50 shadow-2xl">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Total: ${calculateTotal().toFixed(2)}</p>
              <p className="text-xs text-zinc-400">Ready to add to cart</p>
            </div>
            <button onClick={handleAddToCart} className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg">
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}