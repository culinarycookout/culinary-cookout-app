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

  // Track quantities for each item locally
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('Failed to fetch menu');
        const data = await res.json();
        setItems(data);
        setFilteredItems(data);
        
        // Initialize quantities to 1 for all items
        const initialQtys = {};
        data.forEach(item => {
          initialQtys[item.id] = 1;
        });
        setQuantities(initialQtys);
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

  const handleDecrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1)
    }));
  };

  const handleIncrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  const handleAddToCart = (item, qty) => {
    console.log(`Added ${qty} of ${item.name} to cart!`);
  };

  if (loading) return <div className="text-white p-4">Loading menu...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div>
      {/* Logo at the Top - Massively Increased Size */}
      <div className="flex justify-center mb-8">
        <img
          src="/logo.png"
          alt="Culinary Cookout Logo"
          className="h-48 md:h-72 w-auto object-contain"
        />
      </div>

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
            const isUnpriced = !item.price || item.price === 0 || item.price === "0.00" || item.price === "";
            const currentQty = quantities[item.id] || 1;

            return (
              <div 
                key={item.id} 
                className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
              >
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
                    
                    <p className="text-xl font-bold mt-2">
                      {isUnpriced ? (
                        <span className="text-orange-600 italic text-base">Price Pending</span>
                      ) : (
                        `$${Number(item.price).toFixed(2)}`
                      )}
                    </p>
                  </div>
                </Link>

                {/* Quantity & Add to Cart Controls */}
                <div 
                  className="p-4 pt-0 bg-white" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-3 mt-4">
                    {/* Circular Quantity Buttons */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        disabled={isUnpriced}
                        className="w-10 h-10 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow"
                        type="button"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold text-gray-900 w-6 text-center">{currentQty}</span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        disabled={isUnpriced}
                        className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow"
                        type="button"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => !isUnpriced && handleAddToCart(item, currentQty)}
                      disabled={isUnpriced}
                      className={`px-4 py-2.5 font-semibold rounded-lg transition shadow-md text-sm md:text-base whitespace-nowrap ${
                        isUnpriced 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-orange-600 hover:bg-orange-700 text-white'
                      }`}
                      type="button"
                    >
                      {isUnpriced ? 'Coming Soon' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}