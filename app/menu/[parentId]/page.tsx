'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FOOD_MENU_ITEMS } from '../../menuData';

export default function ParentMenuPage() {
  const params = useParams();
  const parentId = params.parentId;

  const parentItem = FOOD_MENU_ITEMS.find((item) => item.id === parentId);

  if (!parentItem) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Item not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-red-600 tracking-wider uppercase">{parentItem.name}</h1>
            <p className="text-zinc-400 mt-2">{parentItem.description}</p>
          </div>
          <Link href="/" className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-bold transition-colors">
            ↩️ Back To Menu
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {parentItem.subMenu.map((subItem) => (
            <Link
              key={subItem.id}
              href={`/menu/${subItem.id}`}
              className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full"
            >
              <img
                src={subItem.image}
                alt={subItem.name}
                className="w-full h-36 md:h-48 object-cover"
                onError={(e) => { e.currentTarget.src = '/placeholder.png'; }}
              />
              <div className="p-3 md:p-4 flex flex-col flex-1">
                <h3 className="font-bold text-sm md:text-lg leading-tight break-words mb-2">{subItem.name}</h3>
                <p className="text-xs md:text-sm text-gray-700 mt-1 md:mt-2 flex-1">
                  {subItem.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}