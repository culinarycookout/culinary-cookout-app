'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FOOD_MENU_ITEMS } from '@/app/menuData';

const CATEGORY_ORDER = [
  'BREAKFAST',
  'SANDWICHES',
  'JR. DISHES',
  'BUNS',
  'BIRDS',
  'SEAFOOD',
  'FRIED SIDES',
  'BEEF',
  'LATIN AMERICA',
  'ASIAN',
  'BEVERAGES',
  'SIDES',
  'SOUPS & STEWS',
  'VEGGIES',
  'TREATS',
  'FLAMED',
  'BRAISED',
  'ROTISSERIE',
  'SMOKED',
];

const categoryColors = {
  'ASIAN': 'bg-red-600 text-white',
  'BEEF': 'bg-amber-800 text-white',
  'BIRDS': 'bg-yellow-600 text-white',
  'BREAKFAST': 'bg-yellow-500 text-black',
  'BUNS': 'bg-[#A67C52] text-white',
  'FRIED SIDES': 'bg-[#C04C00] text-white',
  'FLAMED': 'bg-[#FF4500] text-black',
  'JR. DISHES': 'bg-gradient-to-r from-blue-500 to-pink-500 text-white', 
  'LATIN AMERICA': 'bg-gradient-to-r from-[#CE1126] via-white to-[#006847] text-black',
  'ROTISSERIE': 'bg-black text-white',
  'SANDWICHES': 'bg-pink-600 text-white',
  'SEAFOOD': 'bg-cyan-300 text-black',
  'SIDES': 'bg-[#0047AB] text-white',
  'SMOKED': 'bg-[#D1D5DB] text-black',
  'SOUPS & STEWS': 'bg-[#5E1A18] text-white',
  'BEVERAGES': 'bg-sky-600 text-white',
  'VEGGIES': 'bg-[#2D6A4F] text-white',
  'TREATS': 'bg-pink-300 text-black',
  'BRAISED': 'bg-amber-700 text-white',
};

export default function Menu() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTacoTuesday, setIsTacoTuesday] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    setItems(FOOD_MENU_ITEMS);
    setFilteredItems(FOOD_MENU_ITEMS);
    setLoading(false);

    const now = new Date();
    const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    const day = pacificTime.getDay();
    const hours = pacificTime.getHours();
    setIsTacoTuesday((day === 2 && hours >= 0) || (day === 3 && hours < 1));
  }, []);

  useEffect(() => {
    let result = [...items];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          (item.name || '').toLowerCase().includes(term) ||
          (item.description || '').toLowerCase().includes(term)
      );
    }

    if (filterCategory) {
      result = result.filter((item) => item.category === filterCategory);
    }

    setFilteredItems(result);
  }, [searchTerm, filterCategory, items]);

  const categories = [...new Set(items.map((item) => item.category).filter(Boolean))].sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);
    
    const safeIndexA = indexA === -1 ? CATEGORY_ORDER.length : indexA;
    const safeIndexB = indexB === -1 ? CATEGORY_ORDER.length : indexB;
    
    return safeIndexA - safeIndexB;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8 flex justify-center pt-24 text-xl font-medium">
        Thank goodness for goodness... 🤤
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
        <input
          type="text"
          placeholder="What We Cookin'⁉️"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none mb-3"
        />
        <div className="grid grid-cols-1 gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-sm truncate"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {(searchTerm || filterCategory) && (
          <button onClick={() => { setSearchTerm(''); setFilterCategory(''); }} className="mt-3 text-sm text-red-400 hover:text-red-300">
            Clear all filters ✕
          </button>
        )}
        <p className="text-xs text-zinc-500 mt-2">Showing {filteredItems.length} of {items.length} items</p>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900 rounded-xl border border-zinc-800">
          <p className="text-zinc-400">No items match your filters.</p>
          <button onClick={() => { setSearchTerm(''); setFilterCategory(''); }} className="mt-2 text-red-400 hover:text-red-300 text-sm">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-40 md:pb-0">
          {filteredItems.map((item) => {
            const colorClass = categoryColors[item.category] || 'bg-gray-600 text-white';
            const isTaco = item.category === 'LATIN AMERICA' && item.name.includes('TACO');
            const hasDiscount = isTacoTuesday && isTaco;

            let destinationHref;
            if (item.name === 'TACOS') {
              destinationHref = '/taco-deals';
            } else {
              destinationHref = `/menu/${item.id}`;
            }

            return (
              <Link
                key={item.id}
                href={destinationHref}
                className={`bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full ${hasDiscount ? 'border-2 border-red-500' : ''}`}
              >
                {item.image && item.image !== 'PLACEHOLDER_IMAGE_URL' ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 md:h-48 object-cover"
                    onError={(e) => { e.target.src = '/placeholder.png'; }}
                  />
                ) : (
                  <div className="w-full h-36 md:h-48 bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs">
                    No image
                  </div>
                )}
                <div className="p-3 md:p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-sm md:text-lg leading-tight break-words mb-2">{item.name}</h3>
                  <div className="flex flex-col items-start gap-2">
                    {hasDiscount && <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">🌮🪅50% OFF‼️🎉</span>}
                    {item.category && (
                      <span className={`inline-block ${colorClass} text-xs font-bold px-2 py-1 rounded-full`}>
                        {item.category}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs md:text-sm text-gray-700 mt-1 md:mt-2 flex-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}