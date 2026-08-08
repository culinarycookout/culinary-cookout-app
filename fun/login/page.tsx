'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFunAuth } from '../FunAuthContext';

export default function FunLoginPage() {
  const router = useRouter();
  const { funLogin } = useFunAuth();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (phone.length !== 10) {
      setError('Please enter exactly 10 digits');
      setLoading(false);
      return;
    }
    try {
      await funLogin(email, phone);
      router.push('/fun/menu');
    } catch (err: any) {
      setError(err.message || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-0 px-4 pb-32 md:justify-center md:pt-0">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl px-4 pt-4 pb-8 shadow-2xl md:p-8">
        <div className="flex flex-col items-center pt-0 md:pt-0">
          <span className="text-6xl mb-4">🍸</span>
          <h1 className="text-2xl font-bold text-red-600">FUN</h1>
          <p className="text-zinc-400 text-sm mt-1">Enter the back door...</p>
        </div>
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mt-4 mb-4 text-sm text-center">{error}</div>}
        {step === 1 ? (
          <form onSubmit={handleContinue} className="space-y-4 mt-4 md:mt-6">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none" />
            <button type="submit" className="w-full py-3 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all">Continue</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4 md:mt-6">
            <input type="text" inputMode="numeric" pattern="[0-9]*" required maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} placeholder="0000000000" className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-center text-2xl tracking-widest" />
            <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${loading ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'}`}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        )}
        <div className="mt-6 text-center text-xs text-zinc-500">
          <p>Don't have an account?</p>
          <Link href="/fun/signup" className="text-red-400 hover:text-red-300 font-bold">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}