'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTrubbleAuth } from '../../context/TrubbleAuthContext';
import { useTrubbleCart } from '../../TrubbleCartContext';

const getCurrentPrice = (single: number, double: number) => {
  return { single, double };
};

const TRUBBLE_MENU_ITEMS = [
  { id: 1, name: "D'ussé", type: "Cognac", size: "Trubble", price: getCurrentPrice(6.75, 10.25) },
  { id: 2, name: "D'ussé", type: "Cognac", size: "Double Trubble", price: getCurrentPrice(12.75, 19.25) },
  { id: 3, name: "Hennessy Black", type: "Cognac", size: "Trubble", price: getCurrentPrice(7.75, 11.75) },
  { id: 4, name: "Hennessy Black", type: "Cognac", size: "Double Trubble", price: getCurrentPrice(14.50, 21.75) },
  { id: 5, name: "Hennessy VSOP (Privilege)", type: "Cognac", size: "Trubble", price: getCurrentPrice(9.00, 13.50) },
  { id: 6, name: "Hennessy VSOP (Privilege)", type: "Cognac", size: "Double Trubble", price: getCurrentPrice(17.00, 25.50) },
  { id: 7, name: "Rémy Martin", type: "Cognac", size: "Trubble", price: getCurrentPrice(7.75, 11.75) },
  { id: 8, name: "Rémy Martin", type: "Cognac", size: "Double Trubble", price: getCurrentPrice(14.50, 21.75) },
  { id: 9, name: "Bombay Sapphire", type: "Gin", size: "Trubble", price: getCurrentPrice(3.75, 5.75) },
  { id: 10, name: "Bombay Sapphire", type: "Gin", size: "Double Trubble", price: getCurrentPrice(7.25, 10.75) },
  { id: 11, name: "Casamigos Blanco", type: "Tequila (Clear)", size: "Trubble", price: getCurrentPrice(4.50, 6.50) },
  { id: 12, name: "Casamigos Blanco", type: "Tequila (Clear)", size: "Double Trubble", price: getCurrentPrice(8.50, 12.75) },
  { id: 13, name: "Patron Sherry Anejo", type: "Tequila (Clear)", size: "Trubble", price: getCurrentPrice(6.25, 11.25) },
  { id: 14, name: "Patron Sherry Anejo", type: "Tequila (Clear)", size: "Double Trubble", price: getCurrentPrice(12.25, 21.00) },
  { id: 15, name: "Tito's", type: "Tequila (Clear)", size: "Trubble", price: getCurrentPrice(5.00, 7.75) },
  { id: 16, name: "Tito's", type: "Tequila (Clear)", size: "Double Trubble", price: getCurrentPrice(9.75, 15.50) },
  { id: 17, name: "Casamigos Reposado", type: "Tequila (Dark)", size: "Trubble", price: getCurrentPrice(4.75, 6.75) },
  { id: 18, name: "Casamigos Reposado", type: "Tequila (Dark)", size: "Double Trubble", price: getCurrentPrice(9.25, 13.25) },
  { id: 19, name: "Don Julio Reposado", type: "Tequila (Dark)", size: "Trubble", price: getCurrentPrice(6.75, 11.00) },
  { id: 20, name: "Don Julio Reposado", type: "Tequila (Dark)", size: "Double Trubble", price: getCurrentPrice(12.75, 21.00) },
  { id: 21, name: "Grey Goose", type: "Vodka", size: "Trubble", price: getCurrentPrice(6.00, 8.25) },
  { id: 22, name: "Grey Goose", type: "Vodka", size: "Double Trubble", price: getCurrentPrice(11.00, 16.50) },
  { id: 23, name: "Jack Daniel's", type: "Whiskey", size: "Trubble", price: getCurrentPrice(5.75, 7.25) },
  { id: 24, name: "Jack Daniel's", type: "Whiskey", size: "Double Trubble", price: getCurrentPrice(10.75, 15.75) },
  { id: 25, name: "Jack Daniel's Honey", type: "Whiskey", size: "Trubble", price: getCurrentPrice(5.25, 6.25) },
  { id: 26, name: "Jack Daniel's Honey", type: "Whiskey", size: "Double Trubble", price: getCurrentPrice(10.25, 12.25) },
];

export default function TrubbleMenuPage() {
  const router = useRouter();
  const { trubbleUser, trubbleLoading } = useTrubbleAuth();
  const { trubbleAddToCart } = useTrubbleCart();

  useEffect(() => {
    if (!trubbleLoading && !trubbleUser) {
      router.push('/login');
    }
  }, [trubbleUser, trubbleLoading, router]);

  if (trubbleLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading the hidden menu...
      </div>
    );
  }

  if (!trubbleUser) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 pb-32">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600 tracking-wider uppercase">⚠️ TRUBBLE ⚠️</h1>
        <p className="text-zinc-400 mt-2 text-sm">Welcome back, {trubbleUser.email || 'Guest'}.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {TRUBBLE_MENU_ITEMS.map((item) => (
          <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-red-600 transition-colors relative">
            
            {/* 📸 THIS IS THE ADDED PICTURE FOR EVERY DRINK */}
            <div className="w-full flex justify-center mb-4">
              <img src="/bottle.png" alt={item.name} className="h-32 w-auto object-contain" />
            </div>

            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                <span className="text-xs font-semibold text-zinc-400 bg-zinc-800 px-2 py-1 rounded border border-zinc-700 uppercase tracking-wider">
                  {item.size}
                </span>
              </div>
              <p className="text-zinc-400 text-xs mt-1 uppercase tracking-wide">{item.type}</p>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800">
              <span className="text-xl font-bold text-red-500">${item.price.single}</span>
              <button
                onClick={() => trubbleAddToCart({ id: item.id.toString(), name: `${item.name} (${item.size})`, price: item.price.single })}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg shadow-md transition-all text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/cart">
          <button className="w-full max-w-xs bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold border border-zinc-700 shadow-lg transition-all">
            View Secret Cart
          </button>
        </Link>
      </div>
    </div>
  );
}