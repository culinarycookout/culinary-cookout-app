'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

// ✅ Package configurations - basePrice completely removed
const packageConfig = {
  'taco-trio': {
    name: 'TACO TRIO',
    description: '3 tacos, fully customized.',
    groups: [
      { id: 1, label: 'Taco Group 1', count: 1 },
      { id: 2, label: 'Taco Group 2', count: 1 },
      { id: 3, label: 'Taco Group 3', count: 1 },
    ],
  },
  'taco-pack': {
    name: 'TACO PACK',
    description: '3 groups of 4 tacos (12 total)',
    groups: [
      { id: 1, label: 'Taco Group 1', count: 4 },
      { id: 2, label: 'Taco Group 2', count: 4 },
      { id: 3, label: 'Taco Group 3', count: 4 },
    ],
  },
  'taco-party': {
    name: 'TACO PARTY',
    description: '4 groups of 6 tacos (24 total)',
    groups: [
      { id: 1, label: 'Taco Group 1', count: 6 },
      { id: 2, label: 'Taco Group 2', count: 6 },
      { id: 3, label: 'Taco Group 3', count: 6 },
      { id: 4, label: 'Taco Group 4', count: 6 },
    ],
  },
  'taco-party-fiesta-grande': {
    name: 'TACO PARTY: FIESTA GRANDE',
    description: '5 groups of 10 tacos (50 total)',
    groups: [
      { id: 1, label: 'Taco Group 1', count: 10 },
      { id: 2, label: 'Taco Group 2', count: 10 },
      { id: 3, label: 'Taco Group 3', count: 10 },
      { id: 4, label: 'Taco Group 4', count: 10 },
      { id: 5, label: 'Taco Group 5', count: 10 },
    ],
  },
};

const TORTILLA_OPTIONS = [
  { value: 'corn', label: 'Corn Tortilla', price: 1.00 },
  { value: 'soft', label: 'Soft Flour Tortilla', price: 1.50 },
];

const MEAT_OPTIONS = [
  'Beef',
  'Steak',
  'Chicken',
  'Fried Chicken',
  'Shrimp',
  'Fried Shrimp',
  'Fish',
  'Fried Fish',
  'Veggie Only',
];

const TOPPING_OPTIONS = [
  'Avocado',
  'Habaneros',
  'Jalapeños',
  'Lettuce',
  'Onions',
  'Radishes',
  'Scallions',
  'Tomatoes',
];

const EXTRAS_OPTIONS = [
  '4 Cheese Blend',
  'Mild Nacho Cheese',
  'Hot Nacho Cheese',
  'Pico de Gallo',
  'Guacamole',
  'Sour Cream',
  'Lemon',
  'Lime',
  'Creamy Taco Sauce',
  'Xtreme Sauce',
  'Non-Dairy Cheese',
  'Non-Dairy Sour Cream',
];

export default function TacoDealCustomize() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const dealId = params.id;
  const config = packageConfig[dealId];

  const [loading, setLoading] = useState(true);
  const [groupSelections, setGroupSelections] = useState({});

  useEffect(() => {
    if (!config) return;
    const initial = {};
    config.groups.forEach((group) => {
      initial[group.id] = {
        tortilla: '',
        meat1: '',
        meat2: '',
        toppings: [],
        extras: [],
      };
    });
    setGroupSelections(initial);
    setLoading(false);
  }, [config]);

  const handleTortillaChange = (groupId, value) => {
    setGroupSelections((prev) => {
      const updated = { ...prev };
      updated[groupId] = { ...updated[groupId], tortilla: value };
      return updated;
    });
  };

  const handleMeatChange = (groupId, meatType, value) => {
    setGroupSelections((prev) => {
      const updated = { ...prev };
      updated[groupId] = { ...updated[groupId], [meatType]: value };
      if (meatType === 'meat1' && value === 'Veggie Only') {
        updated[groupId].meat2 = '';
      }
      return updated;
    });
  };

  const handleToppingToggle = (groupId, topping) => {
    setGroupSelections((prev) => {
      const group = prev[groupId];
      const currentToppings = group.toppings || [];
      let newToppings;
      if (currentToppings.includes(topping)) {
        newToppings = currentToppings.filter((t) => t !== topping);
      } else {
        if (currentToppings.length >= 5) return prev;
        newToppings = [...currentToppings, topping];
      }
      const updated = { ...prev };
      updated[groupId] = { ...group, toppings: newToppings };
      return updated;
    });
  };

  const handleExtraToggle = (groupId, extra) => {
    setGroupSelections((prev) => {
      const group = prev[groupId];
      const currentExtras = group.extras || [];
      let newExtras;
      if (currentExtras.includes(extra)) {
        newExtras = currentExtras.filter((e) => e !== extra);
      } else {
        newExtras = [...currentExtras, extra];
      }
      const updated = { ...prev };
      updated[groupId] = { ...group, extras: newExtras };
      return updated;
    });
  };

  const isComplete = config?.groups.every((group) => {
    const sel = groupSelections[group.id];
    return sel && sel.tortilla !== '' && sel.meat1 !== '';
  });

  // ✅ Starts at 0. Only calculates price when options are chosen.
  const totalPrice = config?.groups.reduce((sum, group) => {
    const sel = groupSelections[group.id] || { tortilla: '', meat1: '', meat2: '', toppings: [], extras: [] };
    
    let price = 0;

    // Only calculate additional costs if they've made a tortilla selection
    if (sel.tortilla) {
      const tortillaPrice = TORTILLA_OPTIONS.find((t) => t.value === sel.tortilla)?.price || 1.00;
      price += tortillaPrice * group.count;

      if (sel.meat1 && sel.meat1 !== '') {
        if (sel.meat1 !== 'Veggie Only') price += 2.00 * group.count;
        if (['Steak', 'Shrimp', 'Fish'].includes(sel.meat1)) price += 1.00 * group.count;
        if (sel.meat2 && sel.meat2 !== 'None') price += 1.50 * group.count;
        price += (sel.extras || []).length * 0.50 * group.count;
      }
    }
    return sum + price;
  }, 0); // ✅ Starts exactly at ZERO

  const configuredCount = config?.groups.filter((group) => {
    const sel = groupSelections[group.id];
    return sel && sel.tortilla !== '' && sel.meat1 !== '';
  }).length || 0;

  const handleAddToCart = () => {
    if (!isComplete) return;

    const breakdown = config.groups.map((group) => {
      const sel = groupSelections[group.id];
      const tortillaLabel = TORTILLA_OPTIONS.find((t) => t.value === sel.tortilla)?.label || 'Corn';
      return `${group.label}: ${group.count} x ${sel.meat1}${sel.meat2 && sel.meat2 !== 'None' ? ` + ${sel.meat2}` : ''} (${tortillaLabel})`;
    }).join(' | ');

    const cartItem = {
      id: `${dealId}-${Date.now()}`,
      'Item Name': config.name,
      'Price': totalPrice,
      quantity: 1,
      breakdown: breakdown,
    };

    addToCart(cartItem);
    router.push('/cart');
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        <h1 className="text-xl font-bold">Package not found</h1>
        <Link href="/taco-deals" className="text-red-400 mt-4 inline-block">
          ← Back To Packages
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8 flex justify-center pt-24 text-xl font-medium">
        Loading package options... 🌮
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-8 pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">🌮 {config.name}</h1>
            <p className="text-zinc-400 text-sm mt-1">{config.description}</p>
          </div>
          <Link
            href="/taco-deals"
            className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-700 transition-colors"
          >
            ← Back To Packages
          </Link>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-zinc-400 mb-1">
            <span>
              Progress: {configuredCount} / {config.groups.length} groups configured
            </span>
            <span>Total: ${totalPrice.toFixed(2)}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(configuredCount / config.groups.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {config.groups.map((group) => {
            const sel = groupSelections[group.id] || {
              tortilla: '',
              meat1: '',
              meat2: '',
              toppings: [],
              extras: [],
            };
            const isTrio = config.name === 'TACO TRIO';
            const displayLabel = isTrio ? `Taco ${group.id}` : group.label;

            return (
              <div
                key={group.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 space-y-4"
              >
                <div className="border-b border-zinc-800 pb-2">
                  <h3 className="font-bold text-lg text-white">
                    {displayLabel} ({group.count} taco{group.count > 1 ? 's' : ''})
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Customize once for all {group.count} tacos in this group
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Tortilla Type *
                  </label>
                  <select
                    value={sel.tortilla}
                    onChange={(e) => handleTortillaChange(group.id, e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none"
                  >
                    <option value="">Select Tortilla...</option>
                    {TORTILLA_OPTIONS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label} (${t.price.toFixed(2)} each)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Meat Choice 1 *
                    </label>
                    <select
                      value={sel.meat1}
                      onChange={(e) => handleMeatChange(group.id, 'meat1', e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none"
                    >
                      <option value="">Select Meat...</option>
                      {MEAT_OPTIONS.map((meat) => (
                        <option key={meat} value={meat}>
                          {meat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Meat Choice 2 (Optional)
                    </label>
                    <select
                      value={sel.meat2}
                      onChange={(e) => handleMeatChange(group.id, 'meat2', e.target.value)}
                      disabled={sel.meat1 === 'Veggie Only'}
                      className={`w-full p-2.5 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none ${
                        sel.meat1 === 'Veggie Only' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="">None</option>
                      {MEAT_OPTIONS.filter(
                        (m) => m !== 'Veggie Only' && m !== sel.meat1
                      ).map((meat) => (
                        <option key={meat} value={meat}>
                          {meat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-zinc-300">
                      Toppings (select up to 5)
                    </label>
                    <span className="text-xs text-zinc-500">
                      {sel.toppings.length} / 5 selected
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TOPPING_OPTIONS.map((topping) => (
                      <button
                        key={topping}
                        onClick={() => handleToppingToggle(group.id, topping)}
                        disabled={!sel.meat1}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                          sel.toppings.includes(topping)
                            ? 'bg-red-600 border-red-500 text-white'
                            : !sel.meat1
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed'
                            : 'bg-zinc-800 border-zinc-700 text-white hover:border-zinc-500'
                        }`}
                      >
                        {topping}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 mb-2 block">
                    Extras (select any)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {EXTRAS_OPTIONS.map((extra) => (
                      <button
                        key={extra}
                        onClick={() => handleExtraToggle(group.id, extra)}
                        disabled={!sel.meat1}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                          sel.extras.includes(extra)
                            ? 'bg-red-600 border-red-500 text-white'
                            : !sel.meat1
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed'
                            : 'bg-zinc-800 border-zinc-700 text-white hover:border-zinc-500'
                        }`}
                      >
                        {extra}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 p-4 z-50 shadow-2xl">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">
                {isComplete
                  ? '✨ All groups configured!'
                  : `⚠️ Configure ${config.groups.length - configuredCount} more group(s)`}
              </p>
              <p className="text-xs text-zinc-400">Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <button
              disabled={!isComplete}
              onClick={handleAddToCart}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                isComplete
                  ? 'bg-red-600 hover:bg-red-500 text-white cursor-pointer shadow-lg'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
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