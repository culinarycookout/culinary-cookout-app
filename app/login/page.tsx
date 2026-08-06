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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* 
      MOBILE:
      - pt-0 removes the outer gap (card touches the top)
      - justify-start keeps it anchored to the top
      
      DESKTOP:
      - md:justify-center md:pt-0 keeps it perfect
    */
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-0 px-4 pb-32 md:justify-center md:pt-0">
      
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl px-4 pt-4 pb-8 shadow-2xl md:p-8">
        
        <div className="flex flex-col items-center pt-0 md:pt-0">
          <img
            src="/logo.png"
            alt="Culinary Cookout"
            className="h-60 w-auto object-contain md:h-80"
          />
          <h1 className="text-2xl font-bold text-red-600 mt-1 md:mt-2">WE OUTSIDE COOKIN'</h1>
          <p className="text-zinc-400 text-sm mt-1">Enter the kitchen...</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mt-4 mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 md:mt-6">
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

        <div className="mt-6 text-center text-xs text-zinc-500">
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