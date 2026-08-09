'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useTrubbleAuth } from '../../context/TrubbleAuthContext';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TrubbleLoginPage() {
  const router = useRouter();
  const { trubbleLogin, trubbleLoading } = useTrubbleAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [error, setError] = useState('');

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    let value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
    setter(value);
  };

  const calculateAge = (dob: string): number | null => {
    if (dob.length !== 8) return null;
    const month = parseInt(dob.slice(0, 2));
    const day = parseInt(dob.slice(3, 5));
    const year = 2000 + parseInt(dob.slice(6, 8));
    const today = new Date();
    const birth = new Date(year, month - 1, day);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. ADMIN BACKDOOR: 99/99/99 bypasses everything
    if (inputDate === '99/99/99') {
      try {
        await trubbleLogin(email, '999999');
        router.push('/menu');
        return;
      } catch (err: any) {
        setError(err.message || 'Admin credentials invalid');
        return;
      }
    }

    if (inputDate.length !== 8 || !inputDate.includes('/')) {
      setError('Please enter a valid birth date (MM/DD/YY)');
      return;
    }

    try {
      // 2. Fetch the user's stored birthdate from the database
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('User not found. Please sign up first.');
        return;
      }

      const { data: profile, error: dbError } = await supabase
        .from('profiles')
        .select('birth_date')
        .eq('id', user.id)
        .single();

      if (dbError || !profile) {
        setError('Account error: Profile not found.');
        return;
      }

      const storedBirthDate = profile.birth_date;
      const age = calculateAge(storedBirthDate);

      // 3. THE TRUE LOCKOUT CHECK
      if (age === null || age < 21) {
        setError('Come back when you are 21.');
        return;
      }

      // 4. If they pass, log them in
      const password = storedBirthDate.replace(/\//g, '');
      await trubbleLogin(email, password);
      router.push('/menu');

    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  // Step 1 (Email)
  if (step === 1) {
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

          <form onSubmit={handleContinue} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all">Continue</button>
          </form>

          <div className="mt-6 text-center text-xs text-zinc-500">
            <p>Don&apos;t have access?</p>
            <p className="mt-1"><Link href="/signup" className="text-red-400 hover:text-red-300 font-bold">Sign Up</Link></p>
          </div>
        </div>
      </div>
    );
  }

  // Step 2 (Birthdate Verification)
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-2 tracking-wider">⚠️ POISON‼️ ⚠️</h1>
        <p className="text-zinc-400 text-center mb-6 text-sm">Verify your age (MM/DD/YY)</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Enter Birth Date to Verify</label>
            <input type="text" inputMode="numeric" required maxLength={8} value={inputDate} onChange={(e) => handleBirthDateChange(e, setInputDate)} placeholder="MM/DD/YY" className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-center text-2xl tracking-widest" />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => { setStep(1); setError(''); setInputDate(''); }} className="flex-1 py-3 rounded-xl font-bold text-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-all">Back</button>
            <button type="submit" disabled={trubbleLoading} className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${trubbleLoading ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'}`}>
              {trubbleLoading ? 'Verifying...' : 'Confirm & Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}