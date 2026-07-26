'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import QuantityAddToCart from './QuantityAddToCart';

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

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          (item.description && item.description.toLowerCase().includes(term))
      );
    }

    if (filterCategory) {
      result = result.filter((item) => item.category === filterCategory);
    }

    if (filterServes) {
      result = result.filter((item) => item.serves === filterServes);
    }

    if (filterSize) {
      result = result.filter((item) => item.size === filterSize);
    }

    setFilteredItems(result);
  }, [searchTerm, filterCategory, filterServes, filterSize, items]);

  const categories = [...new Set(items.map((item) => item.category).filter(Boolean))].sort();
  const servesOptions = [...new Set(items.map((item) => item.serves).filter(Boolean))].sort();
  const sizeOptions = [...new Set(items.map((item) => item.size).filter(Boolean))].sort();

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
    setFilterServes('');
    setFilterSize('');
  };

  const handleAddToCart = (item, quantity) => {
    console.log(`Added ${quantity} of ${item.name} to cart!`);
    // Add your cart storage/state logic here later
  };

  if (loading) return <div className="text-white p-4">Loading menu...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none mb-3"
        />

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
          {filteredItems.map((item) => {
            // Check if price is missing, zero, or empty
            const isUnpriced = !item.price || item.price === 0 || item.price === "0.00" || item.price === "";

            return (
              <div 
                key={item.id} 
                className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
              >
                {/* Clickable Card Body linking to detail page */}
                <Link href={`/menu/${item.id}`} className="cursor-pointer flex-1">
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
                    
                    {/* Safe Pricing Display */}
                    <p className="text-xl font-bold mt-2">
                      {isUnpriced ? (
                        <span className="text-orange-600 italic text-base">Price Pending</span>
                      ) : (
                        `$${Number(item.price).toFixed(2)}`
                      )}
                    </p>
                  </div>
                </Link>

                {/* Quantity & Add to Cart Controls (Wrapped with stopPropagation so clicking buttons doesn't trigger the Link) */}
                <div 
                  className="p-4 pt-0 bg-white" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <QuantityAddToCart 
                    item={item} 
                    disabled={isUnpriced}
                    onAddToCart={handleAddToCart} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}