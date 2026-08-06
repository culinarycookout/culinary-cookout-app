'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ UPDATED: justify-start pushes it up, pb-32 keeps it above the nav bar
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-8 px-4 pb-32">
      
      {/* ✅ UPDATED: Reduced padding to p-6 to pull elements closer */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
        
        {/* Logo or Brand Header */}
        {/* ✅ UPDATED: Reduced margins to pull logo + title closer */}
        <div className="flex flex-col items-center mb-4">
          <img
            src="/logo.png"
            alt="Culinary Cookout"
            className="h-72 w-auto object-contain mb-2"
          />
          <h1 className="text-2xl font-bold text-red-600">WE OUTSIDE COOKIN'</h1>
          <p className="text-zinc-400 text-sm mt-1">Enter the kitchen...</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Email Address</label>
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
            <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
              loading
                ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'
            }`}
          >
            {loading ? 'Signing in...' : 'Log In'}
          </button>
        </form>

        {/* ✅ UPDATED: Reduced top margin here to pull contact link closer */}
        <div className="mt-4 text-center text-xs text-zinc-500">
          <p>Protected by Culinary Cookout™️</p>
          <p className="mt-1">
            <Link href="/contact-us" className="text-red-400 hover:text-red-300">
              CONTACT US‼️
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}