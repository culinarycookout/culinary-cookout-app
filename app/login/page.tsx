'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
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
      await login(email, phone);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setError('');
    setPhone('');
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(cleaned);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-0 px-4 pb-32 md:justify-center md:pt-0">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl px-4 pt-4 pb-8 shadow-2xl md:p-8">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center pt-0 md:pt-0">
          <img
            src="/logo.png"
            alt="Culinary Cookout"
            className="h-60 w-auto object-contain md:h-80"
          />
          <h1 className="text-2xl font-bold text-red-600 mt-1 md:mt-2">
            {step === 1 ? 'WE OUTSIDE COOKIN\'' : 'ENTER PHONE NUMBER'}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {step === 1 ? 'Enter the kitchen...' : 'Enter your phone number'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mt-4 mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleContinue} className="space-y-4 mt-4 md:mt-6">
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
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all"
            >
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4 md:mt-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">10-Digit Phone PIN</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                maxLength={10}
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="0000000000"
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-center text-2xl tracking-widest"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 rounded-xl font-bold text-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${
                  loading
                    ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'
                }`}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-zinc-500">
          <p>Don&apos;t have an account?</p>
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