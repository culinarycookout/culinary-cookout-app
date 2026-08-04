'use client';

import Link from 'next/link';

const tacoDealItems = [
  {
    id: 'taco-trio',
    'Item Name': 'TACO TRIO',
    'CATEGORY': 'LATIN AMERICA',
    'DESCRIPTION': 'Customize these 3 amigos.',
    'Price': 1.00,
    'Image URL': 'https://iili.io/CSpjz5N.png',
  },
  {
    id: 'taco-pack',
    'Item Name': 'TACO PACK',
    'CATEGORY': 'LATIN AMERICA',
    'DESCRIPTION': 'Add 3 groups to customize.',
    'Price': 3.50,
    'Image URL': 'https://www.skinnytaste.com/wp-content/uploads/2023/05/shrimp-tacos-1.jpg',
  },
  {
    id: 'taco-party',
    'Item Name': 'TACO PARTY',
    'CATEGORY': 'LATIN AMERICA',
    'DESCRIPTION': 'Add 4 groups to customize.',
    'Price': 6.00,
    'Image URL': 'https://basilandbubbly.com/wp-content/uploads/2021/09/buffalo-shrimp-tacos-3.jpg',
  },
  {
    id: 'taco-party-fiesta-grande',
    'Item Name': 'TACO PARTY: FIESTA GRANDE',
    'CATEGORY': 'LATIN AMERICA',
    'DESCRIPTION': 'Add 5 groups to customize.',
    'Price': 12.00,
    'Image URL': 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_653,q_75,w_850/v1/clients/kansascityks/74667395_2409182199314846_5916633053026844672_o_99fd6cee-584a-47de-bec5-ff74fccf8695.jpg',
  },
];

export default function TacoDealsMenu() {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">🌮 Taco Packages</h1>
          <p className="text-zinc-400 text-sm mt-1">Select a package size to customize your taco breakdown</p>
        </div>
        <Link
          href="/menu"
          className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-700 transition-colors"
        >
          ← Back 
          to Menu
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {tacoDealItems.map((item) => (
          <Link
            key={item.id}
            // ✅ CORRECT PATH: /taco-deals/[id]
            href={`/taco-deals/${item.id}`}
            className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full"
          >
            {item['Image URL'] ? (
              <img
                src={item['Image URL']}
                alt={item['Item Name']}
                className="w-full h-36 md:h-48 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const parent = e.target.parentElement;
                  parent.innerHTML = '<span class="text-3xl">🌮</span>';
                }}
              />
            ) : (
              <div className="w-full h-36 md:h-48 bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs">
                <span className="text-3xl">🌮</span>
              </div>
            )}
            <div className="p-3 md:p-4 flex flex-col flex-1">
              <h3 className="font-bold text-sm md:text-lg leading-tight break-words flex-1">{item['Item Name']}</h3>
              <span className="inline-block bg-gradient-to-r from-[#CE1126] via-white to-[#006847] text-black text-xs font-bold px-2 py-1 rounded-full mt-1 mb-2 w-max">
                {item['CATEGORY']}
              </span>
              <p className="text-xs md:text-sm text-gray-700 mt-1 md:mt-2 flex-1">
                {item['DESCRIPTION']}
              </p>
              <p className="text-base md:text-xl font-bold mt-1 text-red-600">
                ${(item['Price'] || 0).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}