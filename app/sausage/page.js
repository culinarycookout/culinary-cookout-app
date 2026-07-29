'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SausageSelection() {
  const [sausages, setSausages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSausages() {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        // ✅ Include HOT DOG, SAUSAGE, and SUBMARINE
        const filtered = data.filter(item => 
          (item['CATEGORY'] === 'SAUSAGE' || 
           item['CATEGORY'] === 'BURGERS & SAUSAGES') && 
          (item['Item Type']?.toLowerCase().includes('sausage') ||
           item['Item Type']?.toLowerCase().includes('hot dog') ||
           item['Item Type']?.toLowerCase().includes('submarine'))
        );
        setSausages(filtered);
      } catch (error) {
        console.error('Error fetching sausages:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSausages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading sausages...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-red-400 hover:text-red-300 mb-4 inline-block">
          ← Back to Menu
        </Link>
        <h1 className="text-3xl font-bold text-red-600 mb-6">Choose Your Sausage</h1>
        {sausages.length === 0 ? (
          <p className="text-zinc-400">No items found. Make sure they have CATEGORY: "SAUSAGE" or "BURGERS & SAUSAGES" in Notion.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sausages.map((item) => (
              <Link key={item.id} href={`/sausage/${item.id}`}>
                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 hover:border-red-500 transition-all cursor-pointer">
                  {item['Image URL'] && (
                    <img
                      src={item['Image URL']}
                      alt={item['Item Name']}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h2 className="text-xl font-bold text-white">{item['Item Name']}</h2>
                  <p className="text-zinc-400 text-sm">{item['DESCRIPTION']}</p>
                  <p className="text-red-400 font-bold text-lg mt-2">
                    ${(item['Price'] || 0).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}