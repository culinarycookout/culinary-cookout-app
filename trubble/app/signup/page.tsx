'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTrubbleAuth } from '../../context/TrubbleAuthContext';

export default function TrubbleSignupPage() {
  const router = useRouter();
  const { trubbleLogin, trubbleLoading } = useTrubbleAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [confirmBirthDate, setConfirmBirthDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    let value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
    setter(value);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setStep(2);
  };

  const handleBirthDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const rawDigits = birthDate.replace(/\//g, '');
    if (rawDigits.length !== 6) {
      setError('Please enter exactly 6 digits (MMDDYY)');
      return;
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (birthDate !== confirmBirthDate) {
      setError('Birth dates do not match.');
      setLoading(false);
      return;
    }

    let password = birthDate.replace(/\//g, '');
    while (password.length < 10) {
      password = '0' + password;
    }

    try {
      // 1. Create the account and log in immediately
      await trubbleLogin(email, password);
      router.push('/menu');
      
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  // Step 1 View (Email)
  if (step === 1) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-red-600 text-center mb-2 tracking-wider">☠️ SNEAK IN... ☠️</h1>
          <p className="text-zinc-400 text-center mb-6 text-sm">Enter your email to begin...</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleContinue} className="space-y-4">
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
            <button type="submit" className="w-full py-3 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all">
              Continue
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-zinc-500">
            <p>Already have access?</p>
            <p className="mt-1">
              <Link href="/login" className="text-red-400 hover:text-red-300 font-bold">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step 2 View (Enter Birth Date)
  if (step === 2) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-red-600 text-center mb-2 tracking-wider">☠️ SNEAK IN... ☠️</h1>
          <p className="text-zinc-400 text-center mb-6 text-sm">Enter your birth date</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleBirthDateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Birth Date (MM/DD/YY)</label>
              <input
                type="text"
                inputMode="numeric"
                required
                maxLength={8}
                value={birthDate}
                onChange={(e) => handleBirthDateChange(e, setBirthDate)}
                placeholder="MM/DD/YY"
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-center text-2xl tracking-widest"
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => { setStep(1); setError(''); setBirthDate(''); }} className="flex-1 py-3 rounded-xl font-bold text-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-all">Back</button>
              <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all">Continue</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Step 3 View (Confirm Birth Date)
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-2 tracking-wider">☠️ WELCOME ☠️</h1>
        <p className="text-zinc-400 text-center mb-6 text-sm">Confirm your birth date</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Re-enter Birth Date (MM/DD/YY)</label>
            <input
              type="text"
              inputMode="numeric"
              required
              maxLength={8}
              value={confirmBirthDate}
              onChange={(e) => handleBirthDateChange(e, setConfirmBirthDate)}
              placeholder="MM/DD/YY"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-center text-2xl tracking-widest"
            />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => { setStep(2); setError(''); setConfirmBirthDate(''); }} className="flex-1 py-3 rounded-xl font-bold text-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-all">Back</button>
            <button type="submit" disabled={loading || trubbleLoading} className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${loading || trubbleLoading ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'}`}>
              {loading || trubbleLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}