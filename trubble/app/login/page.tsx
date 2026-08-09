'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTrubbleAuth } from '../../context/TrubbleAuthContext';

export default function TrubbleLoginPage() {
  const router = useRouter();
  const { trubbleLogin, trubbleLoading } = useTrubbleAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Ensure only numbers are entered, and limit to 10 digits
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation for exactly 10 digits
    if (password.length !== 10) {
      setError('PIN must be exactly 10 digits');
      return;
    }

    try {
      await trubbleLogin(email, password);
      router.push('/menu');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-2 tracking-wider">⚠️ POISON‼️ ⚠️</h1>
        <p className="text-zinc-400 text-center mb-6 text-sm">Trubble for the 21+...</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">10-Digit PhonePIN</label>
            <input
              type="text" // Using text so we don't get mobile password hiding
              inputMode="numeric"
              pattern="[0-9]*"
              required
              maxLength={10}
              value={password}
              onChange={handlePasswordChange}
              placeholder="0000000000"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-center text-2xl tracking-widest"
            />
          </div>
          <button
            type="submit"
            disabled={trubbleLoading}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
              trubbleLoading
                ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'
            }`}
          >
            {trubbleLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500">
          <p>Don&apos;t have access?</p>
          <p className="mt-1">
            <Link href="/signup" className="text-red-400 hover:text-red-300 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}