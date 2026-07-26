'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Menu() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterServes, setFilterServes] = useState('');
  const [filterSize, setFilterSize] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('Failed to fetch menu');
        const data = await res.json();
        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Filter items whenever search or filters change
  useEffect(() => {
    let result = items;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          (item.description && item.description.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (filterCategory) {
      result = result.filter((item) => item.category === filterCategory);
    }

    // Serves filter
    if (filterServes) {
      result = result.filter((item) => item.serves === filterServes);
    }

    // Size filter
    if (filterSize) {
      result = result.filter((item) => item.size === filterSize);
    }

    setFilteredItems(result);
  }, [searchTerm, filterCategory, filterServes, filterSize, items]);

  // Get unique values for filters
  const categories = [...new Set(items.map((item) => item.category).filter(Boolean))].sort();
  const servesOptions = [...new Set(items.map((item) => item.serves).filter(Boolean))].sort();
  const sizeOptions = [...new Set(items.map((item) => item.size).filter(Boolean))].sort();

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
    setFilterServes('');
    setFilterSize('');
  };

  if (loading) return <div className="text-white p-4">Loading menu...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none mb-3"
        />

        {/* Filter Row */}
        <div className="grid grid-cols-3 gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-sm"
          >
            <option value="">Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filterServes}
            onChange={(e) => setFilterServes(e.target.value)}
            className="p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-sm"
          >
            <option value="">Serves</option>
            {servesOptions.map((serve) => (
              <option key={serve} value={serve}>{serve}</option>
            ))}
          </select>

          <select
            value={filterSize}
            onChange={(e) => setFilterSize(e.target.value)}
            className="p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-sm"
          >
            <option value="">Sizes</option>
            {sizeOptions.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {(searchTerm || filterCategory || filterServes || filterSize) && (
          <button
            onClick={clearFilters}
            className="mt-3 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Clear all filters ✕
          </button>
        )}

        {/* Results Count */}
        <p className="text-xs text-zinc-500 mt-2">
          Showing {filteredItems.length} of {items.length} items
        </p>
      </div>

      {/* Menu Items Grid */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Link key={item.id} href={`/menu/${item.id}`}>
              <div className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                  <p className="text-sm text-gray-600">{item.size}</p>
                  <p className="text-sm text-gray-600">Serves: {item.serves}</p>
                  {item.description && (
                    <p className="text-sm text-gray-700 mt-2">{item.description}</p>
                  )}
                  <p className="text-xl font-bold mt-2">${(Number(item.price) || 0).toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}