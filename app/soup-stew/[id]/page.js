'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

// Configuration for the 4 sizes (unchanged)
const soupStewConfig = {
  'soup-small': {
    name: 'SMALL',
    description: 'Individual portion, perfect for one.',
    groups: [{ id: 1, label: 'Small Soup', count: 1 }],
  },
  'soup-medium': {
    name: 'MEDIUM',
    description: 'For two to share, or one hungry soul.',
    groups: [{ id: 1, label: 'Medium Soup', count: 1 }],
  },
  'soup-large': {
    name: 'LARGE',
    description: 'Family sized comfort in a pot.',
    groups: [{ id: 1, label: 'Large Soup', count: 1 }],
  },
  'soup-group': {
    name: 'GROUP',
    description: 'Bring the whole crew. Giant party size.',
    groups: [{ id: 1, label: 'Group Soup', count: 1 }],
  },
};

// ==========================================
// 1. BROTH BASE
// ==========================================
const BROTH_OPTIONS = [
  { value: 'beef', label: 'Beef Broth', price: 0 },
  { value: 'chicken', label: 'Chicken Broth', price: 0 },
  { value: 'seafood', label: 'Seafood Broth', price: 0 },
  { value: 'veggie', label: 'Vegetable Broth', price: 0 },
  { value: 'gumbo', label: 'Gumbo Roux', price: 0 },
  { value: 'veggie_gumbo', label: 'Vegetarian Gumbo Roux', price: 0 },
  { value: 'seafood_boil', label: 'Seafood Boil', price: 0 },
  { value: 'asian', label: 'Asian Soup', price: 0 },
  { value: 'herb_butter', label: 'Herb Butter', price: 0 },
  { value: 'creamy_cheese', label: 'Creamy Cheese', price: 0 },
  { value: 'hearty_stew', label: 'Hearty Stew', price: 0 },
  { value: 'mediterranean', label: 'Mediterranean', price: 0 },
  { value: 'tomato', label: 'Tomato', price: 0 },
  { value: 'wellness', label: 'Wellness Base', price: 0 },
];

// ==========================================
// 2. BROTH AMOUNT
// ==========================================
const BROTH_AMOUNT_OPTIONS = [
  { value: 'low', label: 'Low', price: 0 },
  { value: 'standard', label: 'Standard', price: 0 },
  { value: 'high', label: 'High', price: 0 },
];

// ==========================================
// 3. BROTH HEAT
// ==========================================
const BROTH_HEAT_OPTIONS = [
  { value: 'none', label: 'None', price: 0 },
  { value: 'mild', label: 'Mild', price: 0 },
  { value: 'medium', label: 'Medium', price: 0 },
  { value: 'hot', label: 'Hot', price: 0 },
  { value: 'xtreme', label: 'Xtreme', price: 0 },
];

// ==========================================
// 4. NOODLE TYPE + Gluten-Free Checkbox
// ==========================================
const NOODLE_OPTIONS = [
  { value: 'egg_noodles', label: 'Egg Noodles', price: 0 },
  { value: 'large_elbows', label: 'Large Elbows', price: 0 },
  { value: 'small_elbows', label: 'Small Elbows', price: 0 },
  { value: 'penne', label: 'Penne', price: 0 },
  { value: 'ramen', label: 'Ramen', price: 0 },
  { value: 'crushed_ramen', label: 'Crushed Ramen', price: 0 },
  { value: 'rotini', label: 'Rotini', price: 0 },
  { value: 'cheese_tortellini', label: 'Cheese Tortellini', price: 0 },
  { value: 'spinach_tortellini', label: 'Spinach Tortellini', price: 0 },
  { value: 'mixed_tortellini', label: 'Mixed Tortellini', price: 0 },
  { value: 'chickpea_rotini', label: 'Chickpea Rotini', price: 0 },
  { value: 'chickpea_penne', label: 'Chickpea Penne', price: 0 },
];

// ==========================================
// 5. RICE TYPE
// ==========================================
const RICE_OPTIONS = [
  { value: 'long_grain', label: 'Long Grain Rice', price: 0 },
  { value: 'jasmine', label: 'Jasmine Rice', price: 0 },
  { value: 'brown_basmati', label: 'Brown Basmati Rice', price: 0 },
  { value: 'quinoa', label: 'Quinoa', price: 0 },
  { value: 'couscous', label: 'Couscous', price: 0 },
  { value: 'broccoli_rice', label: 'Broccoli Rice', price: 0 },
  { value: 'cauliflower_rice', label: 'Cauliflower Rice', price: 0 },
  { value: 'broc_cauli_rice', label: 'Broc-Cauli Rice', price: 0 },
];

// ==========================================
// 6. HARD LEGUME TYPE
// ==========================================
const LEGUME_OPTIONS = [
  { value: 'black_beans', label: 'Black Beans', price: 0 },
  { value: 'bred_beans', label: 'Bred Beans', price: 0 },
  { value: 'kidney_beans', label: 'Kidney Beans', price: 0 },
  { value: 'pinto_beans', label: 'Pinto Beans', price: 0 },
  { value: 'chickpeas', label: 'Chickpeas', price: 0 },
  { value: 'edamame', label: 'Edamame', price: 0 },
  { value: 'lentils', label: 'Lentils', price: 0 },
  { value: 'black_eye_peas', label: 'Black-Eye Peas', price: 0 },
];

// ==========================================
// 7. MEAT TYPES
// ==========================================
const MEAT_OPTIONS = [
  { value: 'steak', label: 'Steak', price: 0 },
  { value: 'thin_beef', label: 'Thin Beef', price: 0 },
  { value: 'chicken', label: 'Chicken', price: 0 },
  { value: 'chicken_breast', label: 'Chicken Breast', price: 0 },
  { value: 'crawfish', label: 'Crawfish', price: 0 },
  { value: 'whole_lobster', label: 'Whole Lobster', price: 0 },
  { value: 'lobster_tails', label: 'Lobster Tails', price: 0 },
  { value: 'whole_crab', label: 'Whole Crab', price: 0 },
  { value: 'crab_clusters', label: 'Crab Clusters', price: 0 },
  { value: 'snapper', label: 'Snapper', price: 0 },
];

// ==========================================
// 8. VEGETATION TYPES
// ==========================================
const VEGGIE_OPTIONS = [
  { value: 'asparagus', label: 'Asparagus', price: 0 },
  { value: 'bean_sprouts', label: 'Bean Sprouts', price: 0 },
  { value: 'brussels_sprouts', label: 'Brussels Sprouts', price: 0 },
  { value: 'cabbage', label: 'Cabbage', price: 0 },
  { value: 'carrots', label: 'Carrots', price: 0 },
  { value: 'celery', label: 'Celery', price: 0 },
  { value: 'corn_cobettes', label: 'Corn Cobettes', price: 0 },
  { value: 'garlic', label: 'Garlic', price: 0 },
  { value: 'ginger', label: 'Ginger', price: 0 },
  { value: 'green_beans', label: 'Green Beans', price: 0 },
  { value: 'kale', label: 'Kale', price: 0 },
  { value: 'portabella', label: 'Portabella Mushrooms', price: 0 },
  { value: 'white_mushrooms', label: 'White Mushrooms', price: 0 },
  { value: 'olives', label: 'Olives', price: 0 },
  { value: 'red_onions', label: 'Red Onions', price: 0 },
  { value: 'onions_mix', label: 'Onions Mix', price: 0 },
  { value: 'peas', label: 'Peas', price: 0 },
  { value: 'snap_peas', label: 'Snap Peas', price: 0 },
  { value: 'bell_peppers', label: 'Bell Peppers', price: 0 },
  { value: 'peppers_medley', label: 'Peppers Medley', price: 0 },
  { value: 'red_potatoes', label: 'Red Potatoes', price: 0 },
  { value: 'russet_potatoes', label: 'Russet Potatoes', price: 0 },
  { value: 'gold_potatoes', label: 'Gold Potatoes', price: 0 },
  { value: 'potato_mix', label: 'Potato Mix', price: 0 },
  { value: 'radishes', label: 'Radishes', price: 0 },
  { value: 'scallions', label: 'Scallions', price: 0 },
  { value: 'spinach', label: 'Spinach', price: 0 },
  { value: 'baby_arugula', label: 'Baby Arugula', price: 0 },
  { value: 'squash', label: 'Squash', price: 0 },
  { value: 'tomatoes', label: 'Tomatoes', price: 0 },
  { value: 'turnips', label: 'Turnips', price: 0 },
];

export default function SoupStewCustomize() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const dealId = params.id;
  const config = soupStewConfig[dealId];

  const [loading, setLoading] = useState(true);
  const [selections, setSelections] = useState({
    broth: '', 
    brothAmount: 'standard', // ✅ Defaulted to standard
    brothHeat: 'none',       // ✅ Defaulted to none
    noodle: '', 
    rice: '', 
    glutenFree: false,
    legumes: [],
    meats: [],
    veggies: [],
  });

  useEffect(() => {
    if (config) setLoading(false);
  }, [config]);

  // Handle Dropdown Selections
  const handleSelection = (key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  // Handle Checkbox
  const handleCheckbox = (key) => {
    setSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle Toggle Buttons (Multi-select)
  const handleToggle = (key, value) => {
    setSelections((prev) => {
      const current = prev[key] || [];
      let newArray;
      if (current.includes(value)) {
        newArray = current.filter((v) => v !== value);
      } else {
        newArray = [...current, value];
      }
      return { ...prev, [key]: newArray };
    });
  };

  // Calculate Total Price
  const totalPrice = config?.groups.reduce((sum, group) => {
    const brothPrice = BROTH_OPTIONS.find((b) => b.value === selections.broth)?.price || 0;
    const brothAmountPrice = BROTH_AMOUNT_OPTIONS.find((a) => a.value === selections.brothAmount)?.price || 0;
    const brothHeatPrice = BROTH_HEAT_OPTIONS.find((h) => h.value === selections.brothHeat)?.price || 0;
    const noodlePrice = NOODLE_OPTIONS.find((n) => n.value === selections.noodle)?.price || 0;
    const ricePrice = RICE_OPTIONS.find((r) => r.value === selections.rice)?.price || 0;
    
    let legumeSum = 0;
    (selections.legumes || []).forEach((v) => {
      legumeSum += LEGUME_OPTIONS.find((opt) => opt.value === v)?.price || 0;
    });

    let meatSum = 0;
    (selections.meats || []).forEach((v) => {
      meatSum += MEAT_OPTIONS.find((opt) => opt.value === v)?.price || 0;
    });

    let veggieSum = 0;
    (selections.veggies || []).forEach((v) => {
      veggieSum += VEGGIE_OPTIONS.find((opt) => opt.value === v)?.price || 0;
    });

    return sum + brothPrice + brothAmountPrice + brothHeatPrice + noodlePrice + ricePrice + legumeSum + meatSum + veggieSum;
  }, 0) || 0;

  // ✅ Broth must be selected to be complete
  const isComplete = selections.broth !== ''; 

  const handleAddToCart = () => {
    if (!isComplete) return;

    const breakdown = `Broth: ${BROTH_OPTIONS.find(b => b.value === selections.broth)?.label}`;

    const cartItem = {
      id: `${dealId}-${Date.now()}`,
      'Item Name': config.name,
      'Price': totalPrice,
      quantity: 1,
      breakdown: breakdown,
      dealId: dealId,
      customizations: JSON.parse(JSON.stringify(selections)),
    };

    addToCart(cartItem);
    router.push('/cart');
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        <h1 className="text-xl font-bold">Size not found</h1>
        <Link href="/soup-stew" className="text-red-400 mt-4 inline-block">
          ← Back to Sizes
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 text-white p-8 flex justify-center pt-24 text-xl font-medium">Loading your soup options... 🍲</div>;
  }

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-8 pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">🍲 {config.name}</h1>
            <p className="text-zinc-400 text-sm mt-1">{config.description}</p>
          </div>
          <Link href="/soup-stew" className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-700 transition-colors">
            ← Back to Sizes
          </Link>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-zinc-400 mb-1">
            <span>Total: ${totalPrice.toFixed(2)}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div className="bg-red-600 h-2 rounded-full transition-all duration-300" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Customizer Groups */}
        <div className="space-y-6">
          
          {/* 1. Broth Base, Amount & Heat (Responsive Grid) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 space-y-4">
            <h3 className="font-bold text-lg text-white mb-4">Broth Options *</h3>
            
            {/* ✅ Grid layout: 1 col on mobile, 3 cols on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Base</label>
                <select
                  value={selections.broth}
                  onChange={(e) => handleSelection('broth', e.target.value)}
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select Broth...</option>
                  {BROTH_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Amount</label>
                <select
                  value={selections.brothAmount}
                  onChange={(e) => handleSelection('brothAmount', e.target.value)}
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none"
                >
                  {BROTH_AMOUNT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Heat</label>
                <select
                  value={selections.brothHeat}
                  onChange={(e) => handleSelection('brothHeat', e.target.value)}
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none"
                >
                  {BROTH_HEAT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 2. Noodle Type & Gluten-Free Checkbox */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 space-y-4">
            <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
              <h3 className="font-bold text-lg text-white">Noodle Type</h3>
              <label className="flex items-center space-x-2 cursor-pointer text-sm text-zinc-400">
                <input
                  type="checkbox"
                  checked={selections.glutenFree}
                  onChange={() => handleCheckbox('glutenFree')}
                  className="accent-red-600 w-4 h-4 cursor-pointer"
                />
                <span>Gluten-Free</span>
              </label>
            </div>
            <select
              value={selections.noodle}
              onChange={(e) => handleSelection('noodle', e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none"
            >
              <option value="">Select Noodle Type...</option>
              {NOODLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Rice Type */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 space-y-4">
            <h3 className="font-bold text-lg text-white">Rice Type</h3>
            <select
              value={selections.rice}
              onChange={(e) => handleSelection('rice', e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none"
            >
              <option value="">Select Rice Type...</option>
              {RICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Hard Legume Type */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 space-y-4">
            <h3 className="font-bold text-lg text-white">Hard Legume Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {LEGUME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleToggle('legumes', opt.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    selections.legumes.includes(opt.value)
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-zinc-800 border-zinc-700 text-white hover:border-zinc-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Meat Types */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 space-y-4">
            <h3 className="font-bold text-lg text-white">Meat Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {MEAT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleToggle('meats', opt.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    selections.meats.includes(opt.value)
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-zinc-800 border-zinc-700 text-white hover:border-zinc-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Vegetation Types */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 space-y-4">
            <h3 className="font-bold text-lg text-white">Vegetation Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {VEGGIE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleToggle('veggies', opt.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    selections.veggies.includes(opt.value)
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-zinc-800 border-zinc-700 text-white hover:border-zinc-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 p-4 z-50 shadow-2xl">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">
                {isComplete ? '✨ Ready to go!' : `⚠️ Select your Broth Base`}
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