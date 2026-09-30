// app/customize/burger/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';

const PATTY_OPTIONS = [
  { name: 'Fried Steak', price: 16.00 },
  { name: 'Steak', price: 14.00 },
  { name: '1/3 lb Beef Patty', price: 5.00 },
  { name: '1/3 lb Turkey Patty', price: 3.75 },
  { name: 'Grilled Chicken Breast', price: 7.00 },
  { name: 'Grilled Chicken', price: 2.50 },
  { name: 'Fried Chicken Breast', price: 8.50 },
  { name: 'Fried Chicken', price: 4.00 },
  { name: 'Egg', price: 1.50 },
  { name: 'Mushroom', price: 4.00 },
];

const SEASONINGS = [
  { name: 'Sea Salt', price: 0.00 },
  { name: 'Black Pepper', price: 0.00 },
  { name: 'Garlic', price: 0.25 },
  { name: 'Onion', price: 0.25 },
  { name: 'Mesquite', price: 0.50 },
  { name: 'Smoked Paprika', price: 0.50 },
  { name: 'Cajun Seasoning', price: 0.50 },
  { name: 'Steak Seasoning', price: 0.50 },
  { name: 'Cayenne', price: 0.25 },
  { name: 'Red Pepper Flakes', price: 0.25 },
];

const BASE_OPTIONS = [
  { name: 'Artisan Bun', price: 3.25 },
  { name: 'Ciabatta Bun', price: 3.00 },
  { name: 'Lettuce Wrapped', price: 2.00 },
];

const BUN_PREP = [
  { name: 'Standard', price: 0.00 },
  { name: 'Grilled', price: 0.00 },
  { name: 'Toasted', price: 0.00 },
];

const GARLIC_PRICES = {
  'Artisan Bun': 0.75,
  'Ciabatta Bun': 1.00,
};

const BUTTER_PRICES = {
  'Artisan Bun': 0.25,
  'Ciabatta Bun': 0.50,
};

const FRESH_TOPPINGS = [
  { name: 'Avocado', price: 1.00 },
  { name: 'Living Lettuce', price: 0.50 },
  { name: 'Pickles', price: 0.50 },
  { name: 'Red Onions', price: 0.25 },
  { name: 'Beefsteak Tomato', price: 0.75 },
];

const COOKED_TOPPINGS = [
  { name: 'Bacon', price: 2.00 },
  { name: 'Jalapeños', price: 0.50 },
  { name: 'Onions', price: 1.00 },
  { name: 'Fries', price: 2.00 },
];

const ENHANCEMENTS = [
  { name: 'Medium Cheddar Cheese', price: 0.50 },
  { name: 'Sharp Cheddar Cheese', price: 0.50 },
  { name: 'Colby Jack Cheese', price: 0.50 },
  { name: 'Pepper Jack Cheese', price: 0.50 },
  { name: 'Provolone Cheese', price: 0.50 },
  { name: 'Swiss Cheese', price: 0.50 },
  { name: 'Ghost Pepper Cheese', price: 1.00 },
  { name: 'Lactose-Free Cheddar Cheese', price: 1.50 },
  { name: '🌿 Cheddar', price: 0.00 },
  { name: '🌿 Smoked Provolone', price: 1.25 },
];

const CONDIMENTS = [
  { name: 'Garlic Aïoli', price: 1.00 },
  { name: '🌿 Truffle Aïoli', price: 0.75 },
  { name: 'Ketchup', price: 0.25 },
  { name: 'Mustard', price: 0.25 },
  { name: 'BBQ Sauce', price: 1.00 },
  { name: 'Hickory BBQ Sauce', price: 1.00 },
  { name: 'Habanero Honey', price: 3.00 },
  { name: 'Hot Sauce', price: 0.50 },
];

export default function BurgerCustomize() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [primaryPatty, setPrimaryPatty] = useState('');
  const [additionalPatties, setAdditionalPatties] = useState({});
  const [seasonings, setSeasonings] = useState([]);
  const [base, setBase] = useState('');
  const [bunPrep, setBunPrep] = useState('Standard');
  const [garlicButter, setGarlicButter] = useState(false);
  const [butter, setButter] = useState(false);
  const [freshToppings, setFreshToppings] = useState([]);
  const [cookedToppings, setCookedToppings] = useState([]);
  const [enhancementQty, setEnhancementQty] = useState({});
  const [condiments, setCondiments] = useState([]);
  const [liteCondiments, setLiteCondiments] = useState([]);

  const isLocked = !primaryPatty;

  const updatePatty = (name, delta) => {
    setAdditionalPatties((prev) => {
      const newQty = Math.max(0, (prev[name] || 0) + delta);
      return { ...prev, [name]: newQty };
    });
  };

  const updateEnhancement = (name, delta) => {
    setEnhancementQty((prev) => {
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

  const handleBaseSelect = (baseName) => {
    setBase(baseName);
    if (baseName === 'Lettuce Wrapped') {
      setBunPrep('');
      setGarlicButter(false);
      setButter(false);
    } else {
      setBunPrep('Standard');
      setGarlicButter(false);
      setButter(false);
    }
  };

  const handleBunPrepSelect = (prepName) => {
    setBunPrep(prepName);
    if (prepName !== 'Grilled' && prepName !== 'Toasted') {
      setGarlicButter(false);
    }
    if (prepName !== 'Toasted') {
      setButter(false);
    }
  };

  const handleButterToggle = () => {
    if (butter) {
      setButter(false);
    } else {
      setButter(true);
      setGarlicButter(false);
    }
  };

  const handleGarlicToggle = () => {
    if (garlicButter) {
      setGarlicButter(false);
    } else {
      setGarlicButter(true);
      setButter(false);
    }
  };

  const calculateTotal = () => {
    let total = 0;

    if (primaryPatty) {
      const primary = PATTY_OPTIONS.find((m) => m.name === primaryPatty);
      if (primary) total += primary.price;
    }

    PATTY_OPTIONS.forEach((m) => {
      total += (additionalPatties[m.name] || 0) * m.price;
    });

    seasonings.forEach((s) => {
      total += SEASONINGS.find((x) => x.name === s).price;
    });

    if (base) total += BASE_OPTIONS.find((b) => b.name === base).price;
    if (bunPrep && base !== 'Lettuce Wrapped') {
      const prep = BUN_PREP.find((p) => p.name === bunPrep);
      if (prep) total += prep.price;
    }
    if (garlicButter && GARLIC_PRICES[base]) {
      total += GARLIC_PRICES[base];
    }
    if (butter && BUTTER_PRICES[base]) {
      total += BUTTER_PRICES[base];
    }

    freshToppings.forEach((t) => {
      total += FRESH_TOPPINGS.find((f) => f.name === t).price;
    });
    cookedToppings.forEach((t) => {
      total += COOKED_TOPPINGS.find((c) => c.name === t).price;
    });

    ENHANCEMENTS.forEach((e) => {
      total += (enhancementQty[e.name] || 0) * e.price;
    });

    condiments.forEach((t) => {
      total += CONDIMENTS.find((c) => c.name === t).price;
    });

    return total;
  };

  const handleAddToCart = () => {
    if (!primaryPatty) {
      alert('Please select a primary patty.');
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
        primaryPatty,
        additionalPatties,
        seasonings,
        base,
        bunPrep: base === 'Lettuce Wrapped' ? 'N/A' : bunPrep,
        garlicButter: garlicButter && base !== 'Lettuce Wrapped' ? true : false,
        butter: butter && base !== 'Lettuce Wrapped' ? true : false,
        freshToppings,
        cookedToppings,
        enhancementQty,
        condiments,
        liteCondiments,
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
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">🍔 BURGER</h1>
            <p className="text-zinc-400 text-sm mt-1">Build your burger from the bun up.</p>
          </div>
          <Link href="/menu" className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-700 transition-colors">
            ↩️ Back To Menu
          </Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
          <h3 className="font-bold text-lg text-white mb-4">Patties</h3>

          <label className="block text-xs font-semibold text-zinc-300 mb-2">
            Primary Patty *
          </label>
          <select
            value={primaryPatty}
            onChange={(e) => setPrimaryPatty(e.target.value)}
            className="w-full p-2.5 mb-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none"
          >
            <option value="">Select Primary Patty...</option>
            {PATTY_OPTIONS.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name} (${m.price.toFixed(2)})
              </option>
            ))}
          </select>

          {primaryPatty && (
            <p className="text-xs text-red-400 font-semibold mb-4">
              Selected: {primaryPatty} — ${PATTY_OPTIONS.find((m) => m.name === primaryPatty).price.toFixed(2)}
            </p>
          )}

          <label className="block text-xs font-semibold text-zinc-300 mb-2 mt-4">
            Additional Patties
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PATTY_OPTIONS.map((m) => (
              <div key={m.name} className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg border border-zinc-700">
                <span className="text-sm font-medium">{m.name} (${m.price.toFixed(2)})</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => updatePatty(m.name, -1)} className="w-8 h-8 rounded bg-zinc-700 hover:bg-zinc-600 font-bold">-</button>
                  <span className="w-6 text-center">{additionalPatties[m.name] || 0}</span>
                  <button onClick={() => updatePatty(m.name, 1)} className="w-8 h-8 rounded bg-zinc-700 hover:bg-zinc-600 font-bold">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isLocked && (
          <div className="bg-zinc-900 border border-dashed border-zinc-700 rounded-xl p-6 mb-6 text-center">
            <p className="text-zinc-400 text-sm font-semibold">
              🔒 Select a primary patty to unlock the rest of the customization
            </p>
          </div>
        )}

        <div className={isLocked ? 'opacity-40 pointer-events-none select-none' : ''}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
            <h3 className="font-bold text-lg text-white mb-4">Seasonings</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SEASONINGS.map((s) => (
                <button key={s.name} onClick={() => toggleItem(seasonings, setSeasonings, s.name)} className={`p-3 rounded-lg text-sm font-medium border ${seasonings.includes(s.name) ? 'bg-red-600 border-red-500' : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'}`}>
                  {s.name} (${s.price.toFixed(2)})
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
            <h3 className="font-bold text-lg text-white mb-4">Base</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BASE_OPTIONS.map((b) => (
                <button key={b.name} onClick={() => handleBaseSelect(b.name)} className={`p-3 rounded-lg text-sm font-medium border ${base === b.name ? 'bg-red-600 border-red-500' : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'}`}>
                  {b.name} (${b.price.toFixed(2)})
                </button>
              ))}
            </div>

            {base && base !== 'Lettuce Wrapped' && (
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  Bun Preparation
                </label>
                <div className="flex flex-wrap gap-3">
                  {BUN_PREP.map((prep) => (
                    <button
                      key={prep.name}
                      onClick={() => handleBunPrepSelect(prep.name)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        bunPrep === prep.name
                          ? 'bg-red-600 border-red-500 text-white'
                          : 'bg-zinc-800 border-zinc-700 text-white hover:border-zinc-500'
                      }`}
                    >
                      {prep.name}
                    </button>
                  ))}
                </div>

                {bunPrep === 'Grilled' && GARLIC_PRICES[base] && (
                  <label className="flex items-center gap-3 mt-4 text-sm cursor-pointer bg-zinc-800 p-3 rounded-lg border border-zinc-700 hover:border-zinc-500">
                    <input
                      type="checkbox"
                      checked={garlicButter}
                      onChange={handleGarlicToggle}
                      className="accent-red-600 w-4 h-4"
                    />
                    <span className="font-medium">
                      Garlic Butter (${GARLIC_PRICES[base].toFixed(2)})
                    </span>
                  </label>
                )}

                {bunPrep === 'Toasted' && GARLIC_PRICES[base] && BUTTER_PRICES[base] && (
                  <div className="mt-4 space-y-2">
                    <label className="flex items-center gap-3 text-sm cursor-pointer bg-zinc-800 p-3 rounded-lg border border-zinc-700 hover:border-zinc-500">
                      <input
                        type="radio"
                        name="toast-finish"
                        checked={butter}
                        onChange={handleButterToggle}
                        className="accent-red-600 w-4 h-4"
                      />
                      <span className="font-medium">
                        Butter (${BUTTER_PRICES[base].toFixed(2)})
                      </span>
                    </label>
                    <label className="flex items-center gap-3 text-sm cursor-pointer bg-zinc-800 p-3 rounded-lg border border-zinc-700 hover:border-zinc-500">
                      <input
                        type="radio"
                        name="toast-finish"
                        checked={garlicButter}
                        onChange={handleGarlicToggle}
                        className="accent-red-600 w-4 h-4"
                      />
                      <span className="font-medium">
                        Garlic Butter (${GARLIC_PRICES[base].toFixed(2)})
                      </span>
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>

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

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6">
            <h3 className="font-bold text-lg text-white mb-4">Enhancements</h3>
            <div className="space-y-3">
              {ENHANCEMENTS.map((e) => (
                <div key={e.name} className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg border border-zinc-700">
                  <span className="text-sm font-medium">{e.name} (${e.price.toFixed(2)})</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateEnhancement(e.name, -1)} className="w-8 h-8 rounded bg-zinc-700 hover:bg-zinc-600 font-bold">-</button>
                    <span className="w-6 text-center">{enhancementQty[e.name] || 0}</span>
                    <button onClick={() => updateEnhancement(e.name, 1)} className="w-8 h-8 rounded bg-zinc-700 hover:bg-zinc-600 font-bold">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-12">
            <h3 className="font-bold text-lg text-white mb-4">Condiments</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CONDIMENTS.map((t) => (
                <div
                  key={t.name}
                  className={`p-3 rounded-lg border flex flex-col justify-between transition-colors ${
                    condiments.includes(t.name)
                      ? 'bg-red-600 border-red-500'
                      : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(condiments, setCondiments, t.name)}
                    className="w-full text-left text-sm font-medium"
                  >
                    {t.name} (${t.price.toFixed(2)})
                  </button>

                  {condiments.includes(t.name) && (
                    <label className="flex items-center gap-2 mt-2 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={liteCondiments.includes(t.name)}
                        onChange={() => toggleItem(liteCondiments, setLiteCondiments, t.name)}
                        className="accent-white w-3 h-3"
                      />
                      Lite
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 p-4 z-50 shadow-2xl">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Total: ${calculateTotal().toFixed(2)}</p>
              <p className="text-xs text-zinc-400">
                {!primaryPatty
                  ? 'Select a primary patty'
                  : !base
                  ? 'Select a base'
                  : 'Ready to add to cart'}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!primaryPatty || !base}
              className={`font-bold px-8 py-3 rounded-xl transition-all shadow-lg ${
                !primaryPatty || !base
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