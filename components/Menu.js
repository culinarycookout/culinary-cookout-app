'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const categoryColors = {
  'ASIAN': 'bg-red-600 text-white',
  'BEEF': 'bg-amber-800 text-white',
  'BIRDS': 'bg-amber-400 text-white',
  'BREAKFAST': 'bg-yellow-500 text-black',
  'FRIED SIDES': 'bg-orange-600 text-white',
  'GRILLED': 'bg-orange-500 text-black',
  'LATIN AMERICA': 'bg-gradient-to-r from-[#CE1126] via-white to-[#006847] text-black',
  'SANDWICHES': 'bg-pink-600 text-white',
  'SEAFOOD': 'bg-cyan-300 text-black',
  'SMOKED': 'bg-gray-600 text-white',
  'SOUPS & STEWS': 'bg-lime-600 text-white',
  'BEVERAGES': 'bg-sky-600 text-white',
  'BURGERS': 'bg-amber-600 text-white',
};

export default function Menu() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTacoTuesday, setIsTacoTuesday] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('Failed to fetch menu');
        const data = await res.json();
        setItems(data);
        setFilteredItems(data);

        const now = new Date();
        const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
        const day = pacificTime.getDay();
        const hours = pacificTime.getHours();
        setIsTacoTuesday((day === 2 && hours >= 0) || (day === 3 && hours < 1));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    let result = items;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          (item['Item Name'] || '').toLowerCase().includes(term) ||
          (item['DESCRIPTION'] || '').toLowerCase().includes(term)
      );
    }
    if (filterCategory) {
      result = result.filter((item) => item['CATEGORY'] === filterCategory);
    }
    setFilteredItems(result);
  }, [searchTerm, filterCategory, items]);

  const categories = [...new Set(items.map((item) => item['CATEGORY']).filter(Boolean))].sort();

  if (loading) return <div className="text-white p-4">Loading menu...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="w-full">
      {isTacoTuesday && (
        <div className="bg-gradient-to-r from-[#CE1126] via-[#FFFFFF] to-[#006847] rounded-xl p-4 mb-6 text-center shadow-lg border-2 border-red-500">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-3xl">🌮🌮🪅</span>
            <span className="text-2xl md:text-3xl font-black text-red-700">50% OFF‼️</span>
            <span className="text-2xl md:text-3xl font-black text-black">ALL TACOS!</span>
            <span className="text-3xl">🎉🌮🌮</span>
          </div>
          <p className="text-sm text-black/70 mt-1">Every Tuesday from midnight to Wednesday 1 AM</p>
        </div>
      )}

      <div className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
        <input
          type="text"
          placeholder="Search by name or description..."
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredItems.map((item) => {
            const itemPrice = Number(item['Price']) || (item.Sizes && item.Sizes.length > 0 ? item.Sizes[0].price : 0);
            const isUnpriced = !itemPrice || itemPrice === 0;
            const colorClass = categoryColors[item['CATEGORY']] || 'bg-gray-600 text-white';
            const isTaco = item['CATEGORY'] === 'LATIN AMERICA' && item['Item Type'] === 'Taco';
            const hasDiscount = isTacoTuesday && isTaco && item.isDiscounted;
            const hasMultipleSizes = item.Sizes && item.Sizes.length > 1;

            return (
              <Link
                key={item.id}
                href={`/menu/${item.id}`}
                className={`bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full ${hasDiscount ? 'border-2 border-red-500' : ''}`}
              >
                {item['Image URL'] && (
                  <img src={item['Image URL']} alt={item['Item Name']} className="w-full h-36 md:h-48 object-cover" />
                )}
                <div className="p-3 md:p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm md:text-lg leading-tight break-words flex-1">{item['Item Name']}</h3>
                    {hasDiscount && <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap mt-0.5">🌮🪅50% OFF‼️🎉</span>}
                  </div>
                  {item['CATEGORY'] && (
                    <span className={`inline-block ${colorClass} text-xs font-bold px-2 py-1 rounded-full mt-1 mb-2`}>
                      {item['CATEGORY']}
                    </span>
                  )}
                  {item['DESCRIPTION'] && (
                    <p className="text-xs md:text-sm text-gray-700 mt-1 md:mt-2 line-clamp-2 hidden sm:block flex-1">
                      {item['DESCRIPTION']}
                    </p>
                  )}
                  <p className="text-base md:text-xl font-bold mt-1 md:mt-2">
                    {hasDiscount ? (
                      <>
                        <span className="text-red-600">${(Number(item['Price']) || 0).toFixed(2)}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">
                          ${(Number(item.originalPrice) || 0).toFixed(2)}
                        </span>
                      </>
                    ) : isUnpriced ? (
                      <span className="text-orange-600 italic text-xs md:text-base">Price Pending</span>
                    ) : hasMultipleSizes ? (
                      `$${Number(itemPrice).toFixed(2)} +`
                    ) : (
                      `$${Number(itemPrice).toFixed(2)}`
                    )}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}