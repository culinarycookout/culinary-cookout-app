'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

// ✅ CATEGORY COLORS
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
  const { addToCart } = useCart();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTacoTuesday, setIsTacoTuesday] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterServes, setFilterServes] = useState('');
  const [filterSize, setFilterSize] = useState('');

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('Failed to fetch menu');
        const data = await res.json();
        setItems(data);
        setFilteredItems(data);

        const initialQtys = {};
        data.forEach(item => {
          initialQtys[item.id] = 0;
        });
        setQuantities(initialQtys);

        const now = new Date();
        const estOffset = -5 * 60;
        const estTime = new Date(now.getTime() + (estOffset - now.getTimezoneOffset()) * 60000);
        const dayOfWeek = estTime.getDay();
        const hours = estTime.getHours();

        const isTuesday = dayOfWeek === 2 && hours >= 0;
        const isWednesdayEarly = dayOfWeek === 3 && hours < 1;
        const isTacoTue = isTuesday || isWednesdayEarly;
        setIsTacoTuesday(isTacoTue);

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

    if (filterServes) {
      result = result.filter((item) => item['SERVES:'] === filterServes);
    }

    if (filterSize) {
      result = result.filter((item) => item['SIZE'] === filterSize);
    }

    setFilteredItems(result);
  }, [searchTerm, filterCategory, filterServes, filterSize, items]);

  const categories = [...new Set(items.map((item) => item['CATEGORY']).filter(Boolean))].sort();
  const servesOptions = [...new Set(items.map((item) => item['SERVES:']).filter(Boolean))].sort();
  const sizeOptions = [...new Set(items.map((item) => item['SIZE']).filter(Boolean))].sort();

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
    setFilterServes('');
    setFilterSize('');
  };

  const handleDecrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1)
    }));
  };

  const handleIncrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleAddToCart = (item, qty) => {
    if (qty === 0) {
      alert('Please select a quantity first');
      return;
    }
    addToCart(item, [], qty);
    setQuantities(prev => ({
      ...prev,
      [item.id]: 0
    }));
  };

  if (loading) return <div className="text-white p-4">Loading menu...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="w-full">
      {/* TACO TUESDAY BANNER */}
      {isTacoTuesday && (
        <div className="bg-gradient-to-r from-[#CE1126] via-[#FFFFFF] to-[#006847] rounded-xl p-4 mb-6 text-center shadow-lg border-2 border-red-500">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-3xl">🌮🪅</span>
            <span className="text-2xl md:text-3xl font-black text-red-700">50% OFF‼️</span>
            <span className="text-2xl md:text-3xl font-black text-black">ALL TACOS!</span>
            <span className="text-3xl">🎉</span>
          </div>
          <p className="text-sm text-black/70 mt-1">Every Tuesday from midnight to Wednesday 1 AM</p>
        </div>
      )}

      {/* FILTERS – Mobile: Category fills rest, Serves 0.6fr, Sizes 0.5fr */}
      <div className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none mb-3"
        />

        <div className="grid grid-cols-[1fr_0.6fr_0.5fr] sm:grid-cols-3 gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-sm truncate"
          >
            <option value="">Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filterServes}
            onChange={(e) => setFilterServes(e.target.value)}
            className="p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-sm truncate"
          >
            <option value="">Serves</option>
            {servesOptions.map((serve) => (
              <option key={serve} value={serve}>{serve}</option>
            ))}
          </select>

          <select
            value={filterSize}
            onChange={(e) => setFilterSize(e.target.value)}
            className="p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-sm truncate"
          >
            <option value="">Sizes</option>
            {sizeOptions.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {(searchTerm || filterCategory || filterServes || filterSize) && (
          <button
            onClick={clearFilters}
            className="mt-3 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Clear all filters ✕
          </button>
        )}

        <p className="text-xs text-zinc-500 mt-2">
          Showing {filteredItems.length} of {items.length} items
        </p>
      </div>

      {/* MENU GRID */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900 rounded-xl border border-zinc-800">
          <p className="text-zinc-400">No items match your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-2 text-red-400 hover:text-red-300 text-sm"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredItems.map((item) => {
            const isUnpriced = !item['Price'] || item['Price'] === 0 || item['Price'] === "0.00";
            const currentQty = quantities[item.id] || 0;
            const colorClass = categoryColors[item['CATEGORY']] || 'bg-gray-600 text-white';
            const isTaco = item['CATEGORY'] === 'LATIN AMERICA' && item['Item Type'] === 'Taco';
            const hasDiscount = isTacoTuesday && isTaco && item.isDiscounted;

            return (
              <div
                key={item.id}
                className={`bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full ${hasDiscount ? 'border-2 border-red-500' : ''}`}
              >
                <Link href={`/menu/${item.id}`} className="cursor-pointer flex-1">
                  {item['Image URL'] && (
                    <img
                      src={item['Image URL']}
                      alt={item['Item Name']}
                      className="w-full h-36 md:h-48 object-cover"
                    />
                  )}
                  <div className="p-3 md:p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm md:text-lg leading-tight break-words flex-1">{item['Item Name']}</h3>
                      {hasDiscount && (
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap mt-0.5">
                          🌮🪅50% OFF‼️🎉
                        </span>
                      )}
                    </div>

                    {item['CATEGORY'] && (
                      <span className={`inline-block ${colorClass} text-xs font-bold px-2 py-1 rounded-full mt-1 mb-2`}>
                        {item['CATEGORY']}
                      </span>
                    )}

                    {item['SIZE'] && (
                      <p className="text-xs md:text-sm text-gray-600">Size: {item['SIZE']}</p>
                    )}
                    {item['SERVES:'] && (
                      <p className="text-xs md:text-sm text-gray-600">Serves: {item['SERVES:']}</p>
                    )}
                    {item['DESCRIPTION'] && (
                      <p className="text-xs md:text-sm text-gray-700 mt-1 md:mt-2 line-clamp-2 hidden sm:block">{item['DESCRIPTION']}</p>
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
                      ) : (
                        `$${Number(item['Price']).toFixed(2)}`
                      )}
                    </p>
                  </div>
                </Link>

                {/* ✅ Quantity & Add to Cart – Button UNDER the arrows */}
                <div
                  className="p-3 md:p-4 pt-0 bg-white mt-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Quantity controls row */}
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      disabled={isUnpriced}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg shadow"
                      type="button"
                    >
                      −
                    </button>
                    <span className="text-lg md:text-xl font-bold text-gray-900 w-5 md:w-6 text-center">{currentQty}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      disabled={isUnpriced}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg shadow"
                      type="button"
                    >
                      +
                    </button>
                  </div>

                  {/* "Gimme This!" button – full width, below arrows */}
                  <button
                    onClick={() => !isUnpriced && handleAddToCart(item, currentQty)}
                    disabled={isUnpriced || currentQty === 0}
                    className={`w-full px-4 py-2.5 font-semibold rounded-lg transition shadow-md text-sm md:text-base text-white ${
                      isUnpriced || currentQty === 0
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-[#0BDA51] hover:bg-[#09C448]'
                    }`}
                    type="button"
                  >
                    {isUnpriced ? 'Coming Soon' : 'Gimme This!😋'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}