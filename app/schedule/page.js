// app/schedule/page.js
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COOK_TIMES, DEFAULT_COOK_MINUTES } from '../cookTimes';

// --- Shop & Setup times by day and hour ---
const WEEKDAY_SHOP_TIMES = [
  { start: 0, end: 6.99, hours: 0.5, label: '12am–6:59am' },
  { start: 7, end: 10.99, hours: 1.0, label: '7am–10:59am' },
  { start: 11, end: 14.99, hours: 0.75, label: '11am–2:59pm' },
  { start: 15, end: 19.99, hours: 1.0, label: '3pm–7:59pm' },
  { start: 20, end: 23.99, hours: 0.5, label: '8pm–11:59pm' },
];

const WEEKEND_SHOP_TIMES = [
  { start: 0, end: 6.99, hours: 0.5, label: '12am–6:59am' },
  { start: 7, end: 10.99, hours: 0.75, label: '7am–10:59am' },
  { start: 11, end: 14.99, hours: 0.5, label: '11am–2:59pm' },
  { start: 15, end: 19.99, hours: 0.75, label: '3pm–7:59pm' },
  { start: 20, end: 23.99, hours: 0.5, label: '8pm–11:59pm' },
];

function getCookMinutes(itemId) {
  // Strip any timestamp suffix (e.g. "eggs-boiled-1730000000" -> "eggs-boiled")
  const clean = (itemId || '').replace(/-\d{10,}$/, '');
  return COOK_TIMES[clean] ?? DEFAULT_COOK_MINUTES;
}

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  if (Number.isInteger(hours)) return `${hours} hr${hours !== 1 ? 's' : ''}`;
  return `${hours.toFixed(1)} hrs`;
}

function getShopAndTravelTime(serveDate, serveTime) {
  if (!serveDate || !serveTime) return null;
  const date = new Date(`${serveDate}T${serveTime}`);
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const [hours, minutes] = serveTime.split(':').map(Number);
  const decimalHour = hours + minutes / 60;
  const table = isWeekend ? WEEKEND_SHOP_TIMES : WEEKDAY_SHOP_TIMES;
  for (const slot of table) {
    if (decimalHour >= slot.start && decimalHour <= slot.end) {
      return { hours: slot.hours, label: slot.label, isWeekend };
    }
  }
  return { hours: 0.5, label: 'default', isWeekend };
}

function ScheduleContent() {
  const router = useRouter();
  const { cart } = useCart();

  const [serveDate, setServeDate] = useState('');
  const [serveTime, setServeTime] = useState('');
  const [error, setError] = useState('');

  // Find the longest cook time in the cart (in minutes)
  const longestCookMinutes = (() => {
    let max = 0;
    cart.forEach((item) => {
      const mins = getCookMinutes(item.id);
      if (mins > max) max = mins;
    });
    return max;
  })();

  const longestCookHours = longestCookMinutes / 60;

  const shopInfo = getShopAndTravelTime(serveDate, serveTime);
  const shopHours = shopInfo ? shopInfo.hours : 0;
  const shopMinutes = shopHours * 60;
  const totalLeadMinutes = shopMinutes + longestCookMinutes;

  useEffect(() => {
    setError('');
    if (!serveDate || !serveTime || !shopInfo) return;

    const selected = new Date(`${serveDate}T${serveTime}`);
    const now = new Date();
    const earliestPossible = new Date(now.getTime() + totalLeadMinutes * 60 * 1000);

    if (selected < earliestPossible) {
      setError(
        `Your selected time is too soon. This order needs approximately ${formatDuration(totalLeadMinutes)} of lead time. Earliest available: ${earliestPossible.toLocaleString()}`
      );
    }
  }, [serveDate, serveTime, totalLeadMinutes, shopInfo]);

  const cookStartDisplay = (() => {
    if (!serveDate || !serveTime) return null;
    const selected = new Date(`${serveDate}T${serveTime}`);
    const cookStart = new Date(selected.getTime() - longestCookMinutes * 60 * 1000);
    return cookStart.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  })();

  const handleContinue = () => {
    if (!serveDate || !serveTime) {
      setError('Please choose a serving date and time.');
      return;
    }
    if (error) return;

    const schedule = {
      serveDate,
      serveTime,
      cookStartDisplay,
      totalLeadMinutes,
      shopMinutes,
      shopLabel: shopInfo?.label,
      cookMinutes: longestCookMinutes,
    };
    localStorage.setItem('culinary_schedule', JSON.stringify(schedule));
    router.push('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link
          href="/menu"
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold transition-colors"
        >
          Browse Menu 🍽️
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-32">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/cart" className="text-red-400 hover:text-red-300 text-sm">
            ← Back to Cart
          </Link>
          <h1 className="text-xl font-bold text-red-600">🗓️ Cooking Window</h1>
          <span className="text-xs text-zinc-400">Step 1 of 2</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            When would you like your meal served?
          </label>
          <input
            type="date"
            value={serveDate}
            onChange={(e) => setServeDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none mb-3"
          />

          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            Serving time
          </label>
          <select
            value={serveTime}
            onChange={(e) => setServeTime(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 text-sm focus:border-red-500 focus:outline-none"
          >
            <option value="">Select a time...</option>
            {Array.from({ length: 48 }, (_, i) => {
              const hour = Math.floor(i / 2);
              const minutes = i % 2 === 0 ? '00' : '30';
              const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
              const ampm = hour < 12 ? 'AM' : 'PM';
              const value = `${String(hour).padStart(2, '0')}:${minutes}`;
              const display = `${hour12}:${minutes} ${ampm}`;
              return (
                <option key={value} value={value}>
                  {display}
                </option>
              );
            })}
          </select>
        </div>

        {shopInfo && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
            <h2 className="text-lg font-bold text-white mb-3">Your Window</h2>
            <div className="text-sm text-zinc-400 space-y-1">
              <p>
                <span className="text-zinc-300 font-medium">Day:</span>{' '}
                {shopInfo.isWeekend ? 'Weekend' : 'Weekday'}
              </p>
              <p>
                <span className="text-zinc-300 font-medium">Shopping & Setup:</span>{' '}
                up to {shopHours} hours ({shopInfo.label})
              </p>
              <p className="text-xs text-zinc-500 pl-1">
                Includes store traffic, checkout, travel, and setup at your location
              </p>
              <p>
                <span className="text-zinc-300 font-medium">Cook Time:</span> up to{' '}
                {formatDuration(longestCookMinutes)}
              </p>
              <p className="pt-2 border-t border-zinc-800 mt-2">
                <span className="text-red-400 font-bold">Total Lead Time:</span>{' '}
                <span className="text-white font-bold">
                  up to {formatDuration(totalLeadMinutes)}
                </span>
              </p>
              <p className="text-xs text-zinc-500 pt-1">
                Actual cook times vary based on cut, size, and quantity.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {cookStartDisplay && !error && (
          <div className="bg-green-900/20 border border-green-700 rounded-xl p-5 mb-6">
            <p className="text-green-300 text-sm mb-1">
              <span className="font-bold">👨🏾‍🍳 Chef will begin cooking at approximately:</span>
            </p>
            <p className="text-white text-lg font-bold">{cookStartDisplay}</p>
            <p className="text-xs text-green-400 mt-2">
              Based on an estimated cook time of up to {formatDuration(longestCookMinutes)}.
            </p>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 p-4 z-50 shadow-2xl">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-400">Step 1 of 2</p>
              <p className="text-sm font-bold text-white">Choose your window</p>
            </div>
            <button
              onClick={handleContinue}
              disabled={!serveDate || !serveTime || !!error}
              className={`font-bold px-6 py-3 rounded-xl transition-all shadow-lg ${
                !serveDate || !serveTime || !!error
                  ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
            >
              Continue to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading scheduling...
        </div>
      }
    >
      <ScheduleContent />
    </Suspense>
  );
}