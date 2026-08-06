'use client';

import Link from 'next/link';

const soupDealItems = [
  {
    id: 'soup-small',
    'Item Name': 'SMALL',
    'CATEGORY': 'SOUPS & STEWS',
    'DESCRIPTION': 'Individual portion, perfect for one.',
    'Image URL': 'https://iili.io/Cg4Ah7e.png',
  },
  {
    id: 'soup-medium',
    'Item Name': 'MEDIUM',
    'CATEGORY': 'SOUPS & STEWS',
    'DESCRIPTION': 'For two to share, or one hungry soul.',
    'Image URL': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-WlE5TwJzJuwnaq-R3L4IfiAf1IQTHo8X-Rthwau0nmtbqv0s55yIJlo&s=10',
  },
  {
    id: 'soup-large',
    'Item Name': 'LARGE',
    'CATEGORY': 'SOUPS & STEWS',
    'DESCRIPTION': 'Family sized comfort in a pot.',
    'Image URL': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdJS4OAMtJBsgtbfblNruZj7YQh5E-cVY658lNVA7qgtKyS7bcJlyw1_M&s=10',
  },
  {
    id: 'soup-group',
    'Item Name': 'GROUP',
    'CATEGORY': 'SOUPS & STEWS',
    'DESCRIPTION': 'Bring the whole crew. Giant party size.',
    'Image URL': 'https://iili.io/Cg4pkGV.png',
  },
];

export default function SoupStewMenu() {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">🍲 Soup & Stew</h1>
          <p className="text-zinc-400 text-sm mt-1">Choose your size, build your perfect pot.</p>
        </div>
        <Link
          href="/menu"
          className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-700 transition-colors"
        >
          ← Back To Menu
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {soupDealItems.map((item) => (
          <Link
            key={item.id}
            href={`/soup-stew/${item.id}`}
            className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full"
          >
            {item['Image URL'] ? (
              <img
                src={item['Image URL']}
                alt={item['Item Name']}
                className="w-full h-36 md:h-48 object-cover"
                onError={(e) => {
                  // ✅ FIX: Hide the broken image, then add a styled fallback div next to it
                  const parent = e.target.parentElement;
                  e.target.style.display = 'none';
                  
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-36 md:h-48 bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs';
                  fallback.innerHTML = '<span class="text-3xl">🍲</span>';
                  parent.appendChild(fallback);
                }}
              />
            ) : (
              <div className="w-full h-36 md:h-48 bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs">
                <span className="text-3xl">🍲</span>
              </div>
            )}
            <div className="p-3 md:p-4 flex flex-col flex-1">
              <h3 className="font-bold text-sm md:text-lg leading-tight break-words flex-1">{item['Item Name']}</h3>
              <span className="inline-block bg-[#3B82F6] text-white text-xs font-bold px-2 py-1 rounded-full mt-1 mb-2 w-max">
                {item['CATEGORY']}
              </span>
              <p className="text-xs md:text-sm text-gray-700 mt-1 md:mt-2 flex-1">
                {item['DESCRIPTION']}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}