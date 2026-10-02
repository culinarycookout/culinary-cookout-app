// app/schedule/page.js
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Cook time rules based on item ID prefix ---
// All times are "up to" values — actual cook time depends on the specific cut and quantity
const BASE_COOK_HOURS = 1.5; // Standard items (fries, sandwiches, sides, etc.)

const COOK_TIME_RULES = [
  { prefix: 'smoked-', hours: 12, label: 'Smoked' },
  { prefix: 'braised-', hours: 4, label: 'Braised' },
  { prefix: 'rotisserie-', hours: 3, label: 'Rotisserie' },
  { prefix: 'flamed-', hours: 2, label: 'Flamed' },
];

const SHOP_AND_TRAVEL_HOURS = 2;

function getCookTimeForItem(itemId) {
  for (const rule of COOK_TIME_RULES) {
    if (itemId.startsWith(rule.prefix)) {
      return { hours: rule.hours, label: rule.label };
    }
  }
  return { hours: BASE_COOK_HOURS, label: 'Standard' };
}

function ScheduleContent() {
  const router = useRouter();
  const { cart } = useCart();

  const [serveDate, setServeDate] = useState('');
  const [serveTime, setServeTime] = useState('');
  const [error, setError] = useState('');

  // Calculate the longest cook time required by anything in the cart
  const { longestCookHours, longestCookLabel } = (() => {
    let maxHours = BASE_COOK_HOURS;
    let label = 'Standard';
    cart.forEach((item) => {
      const baseId = (item.id || '').replace(/-\d+$/, '');
      const { hours, label: itemLabel } = getCookTimeForItem(baseId);
      if (hours > maxHours) {
        maxHours = hours;
        label = itemLabel;
      }
    });
    return { longestCookHours: maxHours, longestCookLabel: label };
  })();

  const totalLeadHours = SHOP_AND_TRAVEL_HOURS + longestCookHours;

  // Validate the selected date/time
  useEffect(() => {
    setError('');
    if (!serveDate || !serveTime) return;

    const selected = new Date(`${serveDate}T${serveTime}`);
    const now = new Date();
    const earliestPossible = new Date(now.getTime() + totalLeadHours * 60 * 60 * 1000);

    if (selected < earliestPossible) {
      setError(
        `Your selected time is too soon. Orders requiring ${longestCookLabel} cooking need approximately ${totalLeadHours} hours of lead time (up to ${totalLeadHours} hours). Earliest available: ${earliestPossible.toLocaleString()}`
      );
    }
  }, [serveDate, serveTime, totalLeadHours, longestCookLabel]);

  // Calculate the estimated chef cook start time
  const cookStartDisplay = (() => {
    if (!serveDate || !serveTime) return null;
    const selected = new Date(`${serveDate}T${serveTime}`);
    const cookStart = new Date(selected.getTime() - longestCookHours * 60 * 60 * 1000);
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
      totalLeadHours,
      cookType: longestCookLabel,
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

        {/* Lead time summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-3">Your Order</h2>
          <div className="text-sm text-zinc-400 space-y-1">
            <p>
              <span className="text-zinc-300 font-medium">Shopping & travel:</span> up to{' '}
              {SHOP_AND_TRAVEL_HOURS} hours
            </p>
            <p>
              <span className="text-zinc-300 font-medium">Approximate cook time:</span> up to{' '}
              {longestCookHours} hours ({longestCookLabel})
            </p>
            <p className="pt-2 border-t border-zinc-800 mt-2">
              <span className="text-red-400 font-bold">Total lead time required:</span>{' '}
              <span className="text-white font-bold">up to {totalLeadHours} hours</span>
            </p>
            <p className="text-xs text-zinc-500 pt-1">
              Actual cook times vary based on cut, size, and quantity.
            </p>
          </div>
        </div>

        {/* Date picker */}
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

        {/* Validation error */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Cook start estimate */}
        {cookStartDisplay && !error && (
          <div className="bg-green-900/20 border border-green-700 rounded-xl p-5 mb-6">
            <p className="text-green-300 text-sm mb-1">
              <span className="font-bold">👨🏾‍🍳 Chef will begin cooking at approximately:</span>
            </p>
            <p className="text-white text-lg font-bold">{cookStartDisplay}</p>
            {longestCookHours > BASE_COOK_HOURS && (
              <p className="text-xs text-green-400 mt-2">
                This dish requires up to {longestCookHours} hours of {longestCookLabel.toLowerCase()} cooking. Time may vary based on cut and quantity.
              </p>
            )}
            {longestCookHours === BASE_COOK_HOURS && (
              <p className="text-xs text-green-400 mt-2">
                Standard cook time — approximately {BASE_COOK_HOURS} hours.
              </p>
            )}
          </div>
        )}

        {/* Continue button */}
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