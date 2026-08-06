'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FunPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFun() {
      try {
        const res = await fetch('/api/fun');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error('Failed to load fun menu');
      } finally {
        setLoading(false);
      }
    }
    fetchFun();
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-red-500">🍸 Fun</h1>
          <Link href="/" className="text-zinc-400 hover:text-zinc-200 text-sm">← Back to Menu</Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-zinc-400">Loading the fun stuff...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item: any) => (
              <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-600 transition-colors">
                {item['Image URL'] ? (
                  <img src={item['Image URL']} alt={item['Item Name']} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-zinc-800 flex items-center justify-center text-4xl">🍸</div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-white">{item['Item Name']}</h3>
                  <p className="text-sm text-zinc-400">{item['CATEGORY']}</p>
                  <p className="text-red-400 font-bold mt-2 text-lg">
                    ${(item['Price'] || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}